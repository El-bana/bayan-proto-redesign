"use client";
import { useAppStore, Lead } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";
import {
  Search,
  Play,
  Filter,
  Briefcase,
  Paperclip,
  MoreVertical,
  Clock,
  Check,
  BadgeCheck,
  ChartNoAxesColumnIncreasing,
  Plus,
  Trash2,
  ChevronDown,
  RotateCw,
  Columns3,
  SendHorizontal,
  BriefcaseBusiness,
  RefreshCcw,
} from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { LeadDetailModal } from "@/components/prospect-finder/LeadDetailModal";
import { PushCampaignModal } from "./PushCampaignModal";
import ProgressBar from "./ProgressBar";
import { useColumnVisibility } from "@/lib/useColumnVisibility";
import ColumnVisibilityModal from "../layout/ColumnVisibilityModal";
import { TablePagination, usePagination } from "../layout/TablePagination";
import { RescoreModal } from "./RescoreModal";
import { CompanyDetailModal } from "@/components/leads/CompanyDetailModal";
import { MOCK_LEADS, MOCK_LISTS } from "@/components/leads/leads.mock";

const MOCK_OWNERS = ["Hager Torky", "Ibrahim Aly", "Esraa Mahmoud"];
function getLeadMeta(lead: Lead) {
  const n = Number(lead.id) || 0;
  const l = lead as Lead & {
    owner?: string;
    emailStatus?: "Verified" | "Risky" | "Not Verified" | "Invalid";
  };
  return {
    emailStatus: (l.emailStatus ?? "Not Verified") as "Verified" | "Risky" | "Not Verified" | "Invalid",
    owner: l.owner ?? MOCK_OWNERS[n % MOCK_OWNERS.length],
  };
}

function getInitials(name: string) {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .toUpperCase();
}

const statusStyle: Record<string, string> = {
  Verified: "bg-[#00C11A]/20 text-[#00B218]",
  Risky: "bg-[#FF823A]/20 text-[#FF823A]",
  "Not Verified": "bg-gray-200 text-gray-600",
  Invalid: "bg-[#E20000]/20 text-[#E20000]",
};

export function ListDetail({
  listId,
  onSelectList,
}: {
  listId?: string;
  onSelectList?: (id: string) => void;
} = {}) {
  const params = useParams();
  const router = useRouter();
  const { lists, leads, icps } = useAppStore();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [detailModalLead, setDetailModalLead] = useState<Lead | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const [isPushOpen, setIsPushOpen] = useState(false);
  const [isPushDropdownOpen, setIsPushDropdownOpen] = useState(false);
  const [isRescoreOpen, setIsRescoreOpen] = useState(false);
  const [currentIcpId, setCurrentIcpId] = useState<string | undefined>(undefined);

  const effectiveListId = listId ?? (params?.id as string);
  const list =
    lists.find((l) => l.id === effectiveListId) ??
    MOCK_LISTS.find((l) => l.id === effectiveListId);
  const leadIds = list?.leadIds ?? [];

  const defaultIcpId =
    list?.icpId ??
    (effectiveListId === "1" || effectiveListId === "l1"
      ? icps[0]?.id
      : undefined);
  const activeIcpId = currentIcpId !== undefined ? currentIcpId : defaultIcpId;
  const listIcp = icps.find((i) => i.id === activeIcpId);

  // Get leads for this list
  const listLeads = useMemo(() => {
    const allLeadsMap = new Map<string, Lead>();
    MOCK_LEADS.forEach((l) => allLeadsMap.set(l.id, l));
    leads.forEach((l) => allLeadsMap.set(l.id, l));
    return leadIds
      .map((id) => allLeadsMap.get(id))
      .filter((l): l is Lead => Boolean(l));
  }, [leads, leadIds]);
  const pg = usePagination(listLeads);

  const toggleAll = () => {
    if (selectedIds.size === listLeads.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(listLeads.map((l) => l.id)));
  };

  const toggleOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const columnManager = useColumnVisibility([
    { key: "firstName", label: "First Name", isVisible: true },
    { key: "lastName", label: "Last Name", isVisible: true },
    { key: "email", label: "Email", isVisible: true },
    { key: "jobTitle", label: "Job Title", isVisible: true },
    { key: "company", label: "Company", isVisible: true },
    { key: "location", label: "Location", isVisible: true },
    { key: "owner", label: "Owner", isVisible: true },
    { key: "icp", label: "ICP", isVisible: true },
    { key: "fitScore", label: "Score Fit", isVisible: true },
    { key: "emailStatus", label: "Validation Status", isVisible: true },
  ]);

  // If list not found, maybe show a 404 or redirect
  if (!list) {
    return <div className="p-8">List not found</div>;
  }

  return (
    <div className="flex-1 p-8 bg-[#F6F8F7] pb-0 flex flex-col min-h-0 overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="w-8 h-8 text-[#0D8C7C]" />
        <h1 className="text-2xl font-bold text-[#10201C]">
          Leads <span className="font-medium">/ {list.name}</span>
        </h1>
      </div>

      {/* 4 Cards at Top */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Card 1: Email Verified */}
        <div className="flex bg-white border border-[#D3DEDB] rounded-xl overflow-hidden shadow-sm h-20">
          <div className="w-18 bg-[#0D8C7C] flex items-center justify-center shrink-0">
            <BadgeCheck className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 p-3 flex flex-col justify-between">
            <div>
              <span className="font-bold text-[#10201C] text-sm block">
                Email Verified
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#10201C] text-sm">71%</span>
                <span className="text-[11px] font-mono font-medium text-[#7C8C87]">
                  · 4 Reachable
                </span>
              </div>
            </div>
            <div className="w-full bg-[#E5E7EB] h-[3px] rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#0D8C7C] to-[#8000FF] h-full rounded-full"
                style={{ width: "71%" }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Fit Score */}
        <div className="flex bg-white border border-[#D3DEDB] rounded-xl overflow-hidden shadow-sm h-20">
          <div className="w-18 bg-[#0D8C7C] flex items-center justify-center shrink-0">
            <Check className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <div className="flex-1 p-3 flex flex-col justify-between">
            <div>
              <span className="font-bold text-[#10201C] text-sm block">
                Fit Score
              </span>
              <span className="font-bold text-[#10201C] text-sm">
                {listIcp ? "71" : "Not Scored"}
              </span>
            </div>
            <p className="text-[11px] font-mono font-medium text-[#7C8C87]">
              {listIcp ? `Medium · ${listIcp.name}` : "Not Scored · N/A"}
            </p>
          </div>
        </div>

        {/* Card 3: Score Distribution */}
        <div className="flex bg-white border border-[#D3DEDB] rounded-xl overflow-hidden shadow-sm h-20">
          <div className="w-18 bg-[#0D8C7C] flex items-center justify-center shrink-0">
            <ChartNoAxesColumnIncreasing className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 p-3 flex flex-col justify-between">
            <span className="font-bold text-[#10201C] text-sm">
              Score Distribution
            </span>
            <div>
              <div className="w-full bg-[#E5E7EB] h-[3px] rounded-full flex overflow-hidden mb-1.5">
                <div className="bg-[#00C11A] h-full" style={{ width: "43%" }} />
                <div className="bg-[#FF823A] h-full" style={{ width: "29%" }} />
                <div className="bg-[#FFB800] h-full" style={{ width: "14%" }} />
                <div className="bg-[#E20000] h-full" style={{ width: "14%" }} />
              </div>
              <div className="flex gap-3">
                <div
                  className="flex items-center gap-1 cursor-default"
                  title="High"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00C11A]" />
                  <span className="text-[10px] text-[#A0AEC0] font-mono font-medium">
                    43%
                  </span>
                </div>
                <div
                  className="flex items-center gap-1 cursor-default"
                  title="Medium"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF823A]" />
                  <span className="text-[10px] text-[#A0AEC0] font-mono font-medium">
                    29%
                  </span>
                </div>
                <div
                  className="flex items-center gap-1 cursor-default"
                  title="Low"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                  <span className="text-[10px] text-[#A0AEC0] font-mono font-medium">
                    14%
                  </span>
                </div>
                <div
                  className="flex items-center gap-1 cursor-default"
                  title="Poor"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E20000]" />
                  <span className="text-[10px] text-[#A0AEC0] font-mono font-medium">
                    14%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Data Age */}
        <div className="flex bg-white border border-[#D3DEDB] rounded-xl overflow-hidden shadow-sm h-20">
          <div className="w-18 bg-[#0D8C7C] flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 p-3 flex flex-col justify-between">
            <div>
              <span className="font-bold text-[#10201C] text-sm block">
                Data Age
              </span>
              <span className="font-bold text-[#10201C] text-sm">6 Days</span>
            </div>
            <p className="text-[11px] font-mono font-medium text-[#7C8C87]">
              Fresh
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {/* Lead List dropdown */}
          <div className="relative">
            <select
              value={effectiveListId}
              onChange={(e) => {
                const val = e.target.value;
                if (onSelectList) {
                  onSelectList(val);
                } else {
                  if (val === "") router.push("/leads");
                  else if (val === "not-in-list") router.push("/leads?list=not-in-list");
                  else router.push(`/lists/${val}`);
                }
              }}
              aria-label="Filter by Lead List"
              className="h-9 px-3 pr-8 bg-white border border-[#D3DEDB] rounded-lg text-sm font-semibold text-[#0D8C7C] outline-none cursor-pointer appearance-none hover:bg-gray-50 focus:border-[#0D8C7C]"
            >
              <option value="">All Leads</option>
              {lists.map((li) => (
                <option key={li.id} value={li.id}>
                  {li.name}
                </option>
              ))}
              <option value="not-in-list">No List</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#0D8C7C] absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Search Input */}
          <div className="relative w-[280px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#7C8C87]" />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full pl-9 pr-4 py-2 border border-[#D3DEDB] rounded-lg bg-white text-sm outline-none focus:border-[#0D8C7C] placeholder-[#7C8C87]"
            />
          </div>

          {/* Columns Button */}
          <button className="py-2 px-4 border border-[#0D8C7C] rounded-lg bg-white text-[#0D8C7C] hover:bg-[#0D8C7C]/5 transition-colors">
            <Columns3 onClick={columnManager.openModal} className="w-5 h-5" />
          </button>

          {/* Selected Actions - Only Visible When Items Selected */}
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-3 ml-1">
              <span className="text-[#10201C] text-sm font-medium">
                {selectedIds.size} selected
              </span>

              {/* Push to campaign / Add to existing campaign */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsPushDropdownOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D8C7C] text-white rounded-lg text-xs font-semibold shadow-sm hover:bg-[#14B39F] transition-colors cursor-pointer"
                >
                  <SendHorizontal className="w-3.5 h-3.5" /> Push to campaign
                  <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                </button>

                {isPushDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-52 bg-white border border-[#D3DEDB] rounded-lg shadow-lg z-30 py-1 text-xs text-[#10201C]">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPushDropdownOpen(false);
                        setIsPushOpen(true);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-[#ECF8F6] hover:text-[#0D8C7C] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <SendHorizontal className="w-3.5 h-3.5" />
                      Add to existing campaign
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsPushDropdownOpen(false);
                        router.push("/campaigns/new");
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-[#ECF8F6] hover:text-[#0D8C7C] transition-colors flex items-center gap-2 border-t border-[#D3DEDB] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Push to new campaign
                    </button>
                  </div>
                )}
              </div>

              {/* Exclude Action */}
              <button
                type="button"
                onClick={() => setSelectedIds(new Set())}
                className="px-3 py-1.5 border border-[#D3DEDB] rounded-lg bg-gray-300 text-xs font-semibold text-gray-800 hover:bg-[#DFE5E5] transition-colors shadow-sm cursor-pointer"
              >
                Exclude
              </button>

              {/* Re-score */}
              <button
                type="button"
                onClick={() => setIsRescoreOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#0D8C7C] rounded-lg text-xs font-semibold text-[#0D8C7C] hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
              >
                <RefreshCcw className="w-3.5 h-3.5 text-[#0D8C7C]" /> Re-score
              </button>
            </div>
          )}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="py-2 px-4 border border-[#0D8C7C] rounded-lg bg-white text-[#0D8C7C] hover:bg-[#0D8C7C]/5 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0D8C7C] text-white text-sm font-medium rounded-lg shadow-sm hover:bg-[#14B39F] transition-colors cursor-pointer">
            <Plus className="w-4 h-4" /> Add Leads
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#ECF6F5] text-sm font-semibold text-[#10201C]">
              <th className="py-2 px-4 rounded-l-lg border-y border-l border-[#D3DEDB] w-12 align-middle">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.size === listLeads.length &&
                      listLeads.length > 0
                    }
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                  />
                </div>
              </th>
              {columnManager.isVisible("firstName") && (
                <th className="py-2 px-4 border-y border-[#D3DEDB]">
                  First Name
                </th>
              )}
              {columnManager.isVisible("lastName") && (
                <th className="py-2 px-4 border-y border-[#D3DEDB]">
                  Last Name
                </th>
              )}
              {columnManager.isVisible("email") && (
                <th className="py-2 px-4 border-y border-[#D3DEDB]">Email</th>
              )}
              {columnManager.isVisible("jobTitle") && (
                <th className="py-2 px-4 border-y border-[#D3DEDB]">
                  Job Title
                </th>
              )}
              {columnManager.isVisible("company") && (
                <th className="py-2 px-4 border-y border-[#D3DEDB]">Company</th>
              )}
              {columnManager.isVisible("location") && (
                <th className="py-2 px-4 border-y border-[#D3DEDB]">
                  Location
                </th>
              )}
              {columnManager.isVisible("owner") && (
                <th className="py-2 px-4 border-y border-[#D3DEDB]">
                  Owner
                </th>
              )}
              {columnManager.isVisible("icp") && (
                <th className="py-2 px-4 border-y border-[#D3DEDB]">
                  ICP
                </th>
              )}
              {columnManager.isVisible("fitScore") && (
                <th className="py-2 px-4 border-y border-[#D3DEDB]">
                  Score Fit
                </th>
              )}
              {columnManager.isVisible("emailStatus") && (
                <th className="py-2 px-4 border-y border-[#D3DEDB]">
                  Validation Status
                </th>
              )}
              <th className="py-2 px-4 rounded-r-lg border-y border-r border-[#D3DEDB] text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-[#10201C]">
            {pg.pageItems.map((lead) => {
              const isSelected = selectedIds.has(lead.id);
              const meta = getLeadMeta(lead);

              return (
                <tr
                  key={lead.id}
                  className={`transition-colors ${
                    isSelected ? "bg-[#0D8C7C]/5" : "hover:bg-black/5"
                  }`}
                >
                  <td className="py-3 px-4 border-b border-[#D3DEDB] align-middle">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(lead.id)}
                        className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                      />
                    </div>
                  </td>
                  {columnManager.isVisible("firstName") && (
                    <td
                      className="py-3 px-4 font-semibold border-b border-[#D3DEDB] underline cursor-pointer hover:text-[#0D8C7C]"
                      onClick={() => setDetailModalLead(lead)}
                    >
                      {lead.firstName}
                    </td>
                  )}
                  {columnManager.isVisible("lastName") && (
                    <td
                      className="py-3 px-4 font-semibold border-b border-[#D3DEDB] underline cursor-pointer hover:text-[#0D8C7C]"
                      onClick={() => setDetailModalLead(lead)}
                    >
                      {lead.lastName}
                    </td>
                  )}
                  {columnManager.isVisible("email") && (
                    <td className="py-3 px-4 border-b border-[#D3DEDB] text-[#10201C] text-sm">
                      {lead.email}
                    </td>
                  )}
                  {columnManager.isVisible("jobTitle") && (
                    <td className="py-3 px-4 border-b border-[#D3DEDB] text-[#10201C] text-sm">
                      {lead.jobTitle}
                    </td>
                  )}
                  {columnManager.isVisible("company") && (
                    <td className="py-3 px-4 border-b border-[#D3DEDB]">
                      <button
                        type="button"
                        onClick={() => setSelectedCompany(lead.company)}
                        className="font-semibold underline cursor-pointer hover:text-[#0D8C7C] text-left transition-colors"
                      >
                        {lead.company}
                      </button>
                    </td>
                  )}
                  {columnManager.isVisible("location") && (
                    <td className="py-3 px-4 border-b border-[#D3DEDB] text-[#10201C] text-sm">
                      {lead.location}
                    </td>
                  )}
                  {columnManager.isVisible("owner") && (
                    <td className="py-3 px-4 border-b border-[#D3DEDB]">
                      <div
                        className="w-7 h-7 rounded-full bg-[#6F3FFF]/20 text-[#6F3FFF] flex items-center justify-center text-xs font-bold shrink-0"
                        title={meta.owner}
                      >
                        {getInitials(meta.owner)}
                      </div>
                    </td>
                  )}
                  {columnManager.isVisible("icp") && (
                    <td className="py-3 px-4 border-b border-[#D3DEDB]">
                      {listIcp ? (
                        <span className="font-medium text-[#10201C] text-sm">
                          {listIcp.name}
                        </span>
                      ) : (
                        <span className="text-[#7C8C87] text-sm">N/A</span>
                      )}
                    </td>
                  )}
                  {columnManager.isVisible("fitScore") && (
                    <td className="py-3 px-4 border-b border-[#D3DEDB]">
                      {listIcp ? (
                        <span className="font-bold text-[#0D8C7C] text-sm">
                          {lead.fitScore}
                        </span>
                      ) : (
                        <span className="text-[#7C8C87] font-normal text-sm">
                          Not Scored
                        </span>
                      )}
                    </td>
                  )}
                  {columnManager.isVisible("emailStatus") && (
                    <td className="py-3 px-4 border-b border-[#D3DEDB]">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap",
                          statusStyle[meta.emailStatus] ?? statusStyle["Not Verified"],
                        )}
                      >
                        {meta.emailStatus === "Verified" ? "Valid" : meta.emailStatus}
                      </span>
                    </td>
                  )}
                  <td className="py-3 px-4 border-b border-[#D3DEDB]">
                    <div className="flex gap-4 items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedIds(new Set([lead.id]));
                          setIsPushOpen(true);
                        }}
                        title="Add or push to campaign"
                        className="cursor-pointer hover:opacity-70 p-0.5"
                      >
                        <SendHorizontal className="w-5 h-5 text-[#0D8C7C]" />
                      </button>
                      <MoreVertical className="w-5 h-5 text-[#10201C] cursor-pointer hover:opacity-70" />
                    </div>
                  </td>
                </tr>
              );
            })}
            {listLeads.length === 0 && (
              <tr>
                <td
                  colSpan={
                    columnManager.columns.filter((c) =>
                      columnManager.isVisible(c.key),
                    ).length + 2
                  }
                  className="py-8 text-center text-[#7C8C87]"
                >
                  No leads found in this list.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        page={pg.page}
        totalPages={pg.totalPages}
        onPageChange={pg.setPage}
      />

      <LeadDetailModal
        isOpen={!!detailModalLead}
        onClose={() => setDetailModalLead(null)}
        lead={detailModalLead}
      />

      <CompanyDetailModal
        companyName={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />

      <PushCampaignModal
        isOpen={isPushOpen}
        onClose={() => setIsPushOpen(false)}
        leads={listLeads.filter((l) => selectedIds.has(l.id))}
      />

      <RescoreModal
        isOpen={isRescoreOpen}
        onClose={() => setIsRescoreOpen(false)}
        onRescore={(icpId) => {
          if (icpId) setCurrentIcpId(icpId);
          setIsRescoreOpen(false);
        }}
      />

      <ColumnVisibilityModal
        isOpen={columnManager.isOpen}
        onClose={columnManager.closeModal}
        columns={columnManager.columns}
        onToggleColumn={columnManager.toggleColumn}
        onShowAll={columnManager.showAll}
        onHideAll={columnManager.hideAll}
      />

      <ProgressBar />
    </div>
  );
}
