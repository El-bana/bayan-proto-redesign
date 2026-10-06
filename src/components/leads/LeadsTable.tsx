"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Columns3,
  RotateCw,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useAppStore, Lead } from "@/lib/store";
import { MOCK_LEADS, MOCK_LISTS, MockCampaign } from "./leads.mock";
import { cn } from "@/lib/utils";
import { useColumnVisibility } from "@/lib/useColumnVisibility";
import ColumnVisibilityModal from "@/components/layout/ColumnVisibilityModal";
// Same components used in Lists (adjust the paths if they live elsewhere)
import { ReassignModal } from "@/components/lists/ReassignModal";
import ProgressBar from "@/components/lists/ProgressBar";

/* ------------------------------------------------------------------ */
/* Types & helpers                                                     */
/* ------------------------------------------------------------------ */

type EmailStatus = "Verified" | "Risky" | "Not Verified" | "Invalid";
type CampaignStatus = MockCampaign["status"];
type CampaignFilter = CampaignStatus | "None";

const EMAIL_STATUSES: EmailStatus[] = [
  "Verified",
  "Risky",
  "Not Verified",
  "Invalid",
];
const CAMPAIGN_FILTERS: CampaignFilter[] = [
  "Active",
  "Paused",
  "Draft",
  "Done",
  "None",
];
const NOT_IN_LIST = "__none__";
const PAGE_SIZE = 10;

/**
 * Mock data lives in ./leads.mock.ts. When the real Canonical Lead model is
 * ready, read owner / emailStatus / campaign from it (one campaign per lead, or none).
 */
const MOCK_OWNERS = ["Hager Torky", "Ibrahim Aly", "Esraa Mahmoud"];
function getLeadMeta(lead: Lead) {
  const n = Number(lead.id) || 0;
  const l = lead as Lead & {
    owner?: string;
    emailStatus?: EmailStatus;
    campaign?: MockCampaign;
  };

  return {
    emailStatus: (l.emailStatus ?? "Not Verified") as EmailStatus,
    campaign: l.campaign,
    owner: l.owner ?? MOCK_OWNERS[n % MOCK_OWNERS.length],
  };
}

type Filters = {
  list: string; // "" = all, NOT_IN_LIST, or a list id
  emailStatus: string;
  owner: string;
  company: string;
  campaign: string;
};
const EMPTY_FILTERS: Filters = {
  list: "",
  emailStatus: "",
  owner: "",
  company: "",
  campaign: "",
};

const statusStyle: Record<EmailStatus, string> = {
  Verified: "bg-[#00C11A]/20 text-[#00B218]",
  Risky: "bg-[#FF823A]/20 text-[#FF823A]",
  "Not Verified": "bg-gray-200 text-gray-600",
  Invalid: "bg-[#E20000]/20 text-[#E20000]",
};

const campaignStyle: Record<CampaignStatus, string> = {
  Done: "bg-[#79D488] text-white",
  Paused: "bg-[#FFC099] text-white",
  Active: "bg-[#8B88FF] text-white",
  Draft: "bg-[#C4C4C4] text-white",
};

/* ------------------------------------------------------------------ */
/* Filter panel                                                        */
/* ------------------------------------------------------------------ */

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[#10201C] mb-1">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#D3DEDB] rounded-lg bg-white px-3 py-2 text-sm text-[#10201C] outline-none focus:border-[#0D8C7C]"
      >
        {children}
      </select>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Lists cell with hover tooltip (shows every list)                    */
/* ------------------------------------------------------------------ */

function ListsCell({ lists }: { lists: { id: string; name: string }[] }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  if (lists.length === 0)
    return <span className="text-[#7C8C87]">Not in any list</span>;

  const show = (e: React.SyntheticEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: r.left + 16, y: r.bottom - 8 });
  };

  return (
    // negative margins make the whole cell the hover target
    <div
      tabIndex={0}
      onMouseEnter={show}
      onFocus={show}
      onMouseLeave={() => setPos(null)}
      onBlur={() => setPos(null)}
      className="-my-3 -mx-4 py-3 px-4 outline-none"
    >
      <div className="flex flex-wrap gap-1.5">
        {lists.slice(0, 2).map((li) => (
          <span
            key={li.id}
            className="px-2 py-0.5 rounded-md bg-[#ECF6F5] border border-[#E1ECE9] text-xs"
          >
            {li.name}
          </span>
        ))}
        {lists.length > 2 && (
          <span className="px-2 py-0.5 rounded-md bg-gray-200 text-xs text-gray-600">
            +{lists.length - 2}
          </span>
        )}
      </div>

      {pos && (
        <div
          role="tooltip"
          style={{ position: "fixed", left: pos.x, top: pos.y }}
          className="z-50 min-w-40 max-w-64 rounded-lg border border-[#D3DEDB] bg-white p-3 shadow-xl pointer-events-none"
        >
          <p className="text-xs font-bold text-[#10201C] mb-1.5">
            In {lists.length} {lists.length === 1 ? "list" : "lists"}
          </p>
          <ul className="space-y-1">
            {lists.map((li) => (
              <li
                key={li.id}
                className="flex items-center gap-2 text-xs text-[#10201C]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D8C7C] shrink-0" />
                {li.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function LeadsTable() {
  const store = useAppStore();
  // TODO: switch to false once the store has the extra lead fields
  const USE_MOCK = true;
  const lists = USE_MOCK ? MOCK_LISTS : store.lists;
  const leads = USE_MOCK ? MOCK_LEADS : store.leads;

  // TODO: read from your auth/user store. Reassign is Admin-only.
  const isAdmin = true;
  // TODO: replace with real loading/error state from your data layer.
  const isLoading = false;
  const error: string | null = null;

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isReassignOpen, setIsReassignOpen] = useState(false);

  const columnManager = useColumnVisibility([
    { key: "name", label: "Name", isVisible: true },
    { key: "company", label: "Company", isVisible: true },
    { key: "emailStatus", label: "Email Status", isVisible: true },
    { key: "lists", label: "Lists", isVisible: true },
    { key: "campaigns", label: "Campaign", isVisible: true },
    { key: "owner", label: "Owner", isVisible: true },
  ]);

  // lead id -> lists it belongs to (a lead appears once, with all its lists)
  const listsByLead = useMemo(() => {
    const map = new Map<string, { id: string; name: string }[]>();
    lists.forEach((li) =>
      li.leadIds.forEach((leadId) => {
        const arr = map.get(leadId) ?? [];
        arr.push({ id: li.id, name: li.name });
        map.set(leadId, arr);
      }),
    );
    return map;
  }, [lists]);

  const companies = useMemo(
    () => Array.from(new Set(leads.map((l) => l.company))).sort(),
    [leads],
  );
  const owners = useMemo(
    () => Array.from(new Set(leads.map((l) => getLeadMeta(l).owner))).sort(),
    [leads],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const meta = getLeadMeta(lead);
      const leadLists = listsByLead.get(lead.id) ?? [];

      if (
        q &&
        !`${lead.name} ${lead.email} ${lead.company}`.toLowerCase().includes(q)
      )
        return false;

      if (filters.list === NOT_IN_LIST && leadLists.length > 0) return false;
      if (
        filters.list &&
        filters.list !== NOT_IN_LIST &&
        !leadLists.some((li) => li.id === filters.list)
      )
        return false;

      if (filters.emailStatus && meta.emailStatus !== filters.emailStatus)
        return false;
      if (filters.owner && meta.owner !== filters.owner) return false;
      if (filters.company && lead.company !== filters.company) return false;
      if (
        filters.campaign &&
        (meta.campaign?.status ?? "None") !== filters.campaign
      )
        return false;
      return true;
    });
  }, [leads, listsByLead, search, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageLeads = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const allOnPageSelected =
    pageLeads.length > 0 && pageLeads.every((l) => selectedIds.has(l.id));

  const setFilter = (key: keyof Filters, value: string) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(1);
  };

  const toggleAllOnPage = () => {
    const next = new Set(selectedIds);
    if (allOnPageSelected) pageLeads.forEach((l) => next.delete(l.id));
    else pageLeads.forEach((l) => next.add(l.id));
    setSelectedIds(next);
  };

  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedIds(next);
  };

  // IDs are a Set so duplicates are already removed before reassigning
  const selectedLeads = leads.filter((l) => selectedIds.has(l.id));

  const shownColumns = columnManager.columns.filter((c) =>
    columnManager.isVisible(c.key),
  );

  const renderCell = (key: string, lead: Lead) => {
    const meta = getLeadMeta(lead);
    const leadLists = listsByLead.get(lead.id) ?? [];

    switch (key) {
      case "name":
        return <span className="font-semibold">{lead.name}</span>;
      case "company":
        return <span className="font-medium">{lead.company}</span>;
      case "emailStatus":
        return (
          <span
            className={cn(
              "px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap",
              statusStyle[meta.emailStatus],
            )}
          >
            {meta.emailStatus}
          </span>
        );
      case "lists":
        return <ListsCell lists={leadLists} />;
      case "campaigns":
        if (!meta.campaign) return <span className="text-[#7C8C87]">None</span>;
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium whitespace-nowrap">
              {meta.campaign.name}
            </span>
            <span
              className={cn(
                "inline-flex min-w-[76px] items-center justify-center rounded px-3 py-1 text-xs font-medium",
                campaignStyle[meta.campaign.status],
              )}
            >
              {meta.campaign.status}
            </span>
          </div>
        );
      case "owner":
        return <span className="font-medium">{meta.owner}</span>;
      default:
        return null;
    }
  };

  const visibleColCount = shownColumns.length + (isAdmin ? 1 : 0);

  return (
    <div className="flex-1 p-8 bg-[#F6F8F7] flex flex-col min-h-0">
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="w-8 h-8 text-[#0D8C7C]" />
        <h1 className="text-2xl font-bold text-[#10201C]">Leads</h1>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="relative w-[280px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#7C8C87]" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, email or company..."
              aria-label="Search leads"
              className="w-full pl-9 pr-4 py-2 border border-[#D3DEDB] rounded-lg bg-white text-sm outline-none focus:border-[#0D8C7C] placeholder-[#7C8C87]"
            />
          </div>

          <button
            type="button"
            onClick={columnManager.openModal}
            aria-label="Manage columns"
            className="py-2 px-4 border border-[#0D8C7C] rounded-lg bg-white text-[#0D8C7C] hover:bg-[#0D8C7C]/5 transition-colors"
          >
            <Columns3 className="w-5 h-5" />
          </button>

          {/* Only action: Reassign Owner (Admin only) */}
          {isAdmin && selectedIds.size > 0 && (
            <div className="flex items-center gap-3 ml-1">
              <span className="text-[#10201C] text-sm font-medium">
                {selectedIds.size} selected
              </span>
              <button
                type="button"
                onClick={() => setIsReassignOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#10201C] rounded-lg text-xs font-semibold text-[#10201C] shadow-sm hover:bg-gray-50 transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" /> Re-assign Owner
              </button>
            </div>
          )}
        </div>

        {/* Filter button + panel */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsFilterOpen((o) => !o)}
            aria-expanded={isFilterOpen}
            aria-label="Filters"
            className={cn(
              "relative py-2 px-4 border border-[#0D8C7C] rounded-lg transition-colors",
              isFilterOpen || activeFilterCount > 0
                ? "bg-[#0D8C7C] text-white"
                : "bg-white text-[#0D8C7C] hover:bg-[#0D8C7C]/5",
            )}
          >
            <Filter className="w-5 h-5" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#10201C] text-white text-[11px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {isFilterOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setIsFilterOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 z-30 w-80 bg-white border border-[#D3DEDB] rounded-lg shadow-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-[#10201C]">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(false)}
                    aria-label="Close filters"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <FilterSelect
                  label="List"
                  value={filters.list}
                  onChange={(v) => setFilter("list", v)}
                >
                  <option value="">All lists</option>
                  <option value={NOT_IN_LIST}>Not in any list</option>
                  {lists.map((li) => (
                    <option key={li.id} value={li.id}>
                      {li.name}
                    </option>
                  ))}
                </FilterSelect>

                <FilterSelect
                  label="Email Status"
                  value={filters.emailStatus}
                  onChange={(v) => setFilter("emailStatus", v)}
                >
                  <option value="">All statuses</option>
                  {EMAIL_STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </FilterSelect>

                <FilterSelect
                  label="Owner"
                  value={filters.owner}
                  onChange={(v) => setFilter("owner", v)}
                >
                  <option value="">All owners</option>
                  {owners.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </FilterSelect>

                <FilterSelect
                  label="Company"
                  value={filters.company}
                  onChange={(v) => setFilter("company", v)}
                >
                  <option value="">All companies</option>
                  {companies.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </FilterSelect>

                <FilterSelect
                  label="Campaign"
                  value={filters.campaign}
                  onChange={(v) => setFilter("campaign", v)}
                >
                  <option value="">All campaigns</option>
                  {CAMPAIGN_FILTERS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </FilterSelect>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    disabled={activeFilterCount === 0}
                    onClick={() => {
                      setFilters(EMPTY_FILTERS);
                      setPage(1);
                    }}
                    className="bg-white border border-red-400 text-red-500 hover:bg-red-50 disabled:opacity-50 text-xs font-semibold px-4 py-1.5 rounded-md transition-colors"
                  >
                    Clear all
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(false)}
                    className="bg-[#0D8C7C] hover:bg-[#0a7366] text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#ECF6F5] text-sm font-semibold text-[#10201C]">
              {isAdmin && (
                <th className="py-2 px-4 rounded-l-lg border-y border-l border-[#D3DEDB] w-12 align-middle">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={allOnPageSelected}
                      onChange={toggleAllOnPage}
                      aria-label="Select all leads on this page"
                      className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                    />
                  </div>
                </th>
              )}
              {shownColumns.map((col, i) => (
                <th
                  key={col.key}
                  className={cn(
                    "py-2 px-4 border-y border-[#D3DEDB]",
                    i === 0 && !isAdmin && "rounded-l-lg border-l",
                    i === shownColumns.length - 1 && "rounded-r-lg border-r",
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-sm text-[#10201C]">
            {isLoading && (
              <tr>
                <td
                  colSpan={visibleColCount}
                  className="py-8 px-4 text-center text-[#7C8C87] border-b border-[#D3DEDB]"
                >
                  Loading leads...
                </td>
              </tr>
            )}

            {!isLoading && error && (
              <tr>
                <td
                  colSpan={visibleColCount}
                  className="py-8 px-4 text-center text-[#E20000] border-b border-[#D3DEDB]"
                >
                  Could not load leads. Refresh the page to try again.
                </td>
              </tr>
            )}

            {!isLoading &&
              !error &&
              pageLeads.map((lead) => {
                const isSelected = selectedIds.has(lead.id);
                return (
                  <tr
                    key={lead.id}
                    className={`transition-colors ${
                      isSelected ? "bg-[#0D8C7C]/5" : "hover:bg-black/5"
                    }`}
                  >
                    {isAdmin && (
                      <td className="py-3 px-4 border-b border-[#D3DEDB] align-middle">
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleOne(lead.id)}
                            aria-label={`Select ${lead.name}`}
                            className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                          />
                        </div>
                      </td>
                    )}
                    {shownColumns.map((col) => (
                      <td
                        key={col.key}
                        className="py-3 px-4 border-b border-[#D3DEDB] align-middle"
                      >
                        {renderCell(col.key, lead)}
                      </td>
                    ))}
                  </tr>
                );
              })}

            {!isLoading && !error && filtered.length === 0 && (
              <tr>
                <td
                  colSpan={visibleColCount}
                  className="py-8 px-4 text-center text-[#7C8C87] border-b border-[#D3DEDB]"
                >
                  No leads match your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between mt-4 text-sm text-[#10201C]">
          <span className="font-mono text-xs text-[#7C8C87]">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}-
            {Math.min(currentPage * PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length} leads
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
              aria-label="Previous page"
              className="p-1.5 border border-[#D3DEDB] rounded-lg bg-white hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
              )
              .map((p, i, arr) => (
                <span key={p} className="flex items-center gap-1">
                  {i > 0 && p - arr[i - 1] > 1 && (
                    <span className="px-1 text-[#7C8C87]">...</span>
                  )}
                  <button
                    type="button"
                    onClick={() => setPage(p)}
                    aria-current={p === currentPage ? "page" : undefined}
                    className={cn(
                      "min-w-8 px-2 py-1 rounded-lg border text-sm font-medium",
                      p === currentPage
                        ? "bg-[#0D8C7C] border-[#0D8C7C] text-white"
                        : "bg-white border-[#D3DEDB] hover:bg-gray-50",
                    )}
                  >
                    {p}
                  </button>
                </span>
              ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
              aria-label="Next page"
              className="p-1.5 border border-[#D3DEDB] rounded-lg bg-white hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <ReassignModal
        isOpen={isReassignOpen}
        onClose={() => setIsReassignOpen(false)}
        leads={selectedLeads}
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

export default LeadsTable;
