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
} from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { LeadDetailModal } from "@/components/lead-locator/LeadDetailModal";
import { ReassignModal } from "./ReassignModal";
import { PushCampaignModal } from "./PushCampaignModal";
import ProgressBar from "./ProgressBar";

export function ListDetail() {
  const params = useParams();
  const router = useRouter();
  const { lists, leads } = useAppStore();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [detailModalLead, setDetailModalLead] = useState<Lead | null>(null);

  const [isReassignOpen, setIsReassignOpen] = useState(false);
  const [isPushOpen, setIsPushOpen] = useState(false);

  const list = lists.find((l) => l.id === params.id);

  // If list not found, maybe show a 404 or redirect
  if (!list) {
    return <div className="p-8">List not found</div>;
  }

  // Get leads for this list
  const listLeads = useMemo(() => {
    return leads.filter((l) => list.leadIds.includes(l.id));
  }, [leads, list.leadIds]);

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

  return (
    <div className="flex-1 p-8 bg-[#F6F8F7] flex flex-col min-h-0 overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <BriefcaseBusiness className="w-8 h-8 text-[#10201C]" />
        <h1 className="text-2xl font-bold text-[#10201C]">
          Leads List <span className="font-medium">/ {list.name}</span>
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
              <span className="font-bold text-[#10201C] text-sm">71%</span>
            </div>
            <div className="w-full bg-[#E5E7EB] h-[3px] rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#0D8C7C] to-[#8000FF] h-full rounded-full"
                style={{ width: "71%" }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Score Fit */}
        <div className="flex bg-white border border-[#D3DEDB] rounded-xl overflow-hidden shadow-sm h-20">
          <div className="w-18 bg-[#0D8C7C] flex items-center justify-center shrink-0">
            <Check className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <div className="flex-1 p-3 flex flex-col justify-between">
            <div>
              <span className="font-bold text-[#10201C] text-sm block">
                Score Fit
              </span>
              <span className="font-bold text-[#10201C] text-sm">71</span>
            </div>
            <p className="text-[11px] font-mono text-[#7C8C87]">Strong Fit</p>
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
                <div className="bg-[#00C11A] h-full" style={{ width: "57%" }} />
                <div className="bg-[#FF823A] h-full" style={{ width: "29%" }} />
                <div className="bg-[#E20000] h-full" style={{ width: "14%" }} />
              </div>
              <div className="flex gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00C11A]" />
                  <span className="text-[10px] text-[#A0AEC0] font-mono">
                    57%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF823A]" />
                  <span className="text-[10px] text-[#A0AEC0] font-mono">
                    29%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E20000]" />
                  <span className="text-[10px] text-[#A0AEC0] font-mono">
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
            <p className="text-[11px] font-mono text-[#7C8C87]">Fresh</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative w-[280px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#7C8C87]" />
            <input
              type="text"
              placeholder="Search for lead list...."
              className="w-full pl-9 pr-4 py-2 border border-[#D3DEDB] rounded-lg bg-white text-sm outline-none focus:border-[#0D8C7C] placeholder-[#7C8C87]"
            />
          </div>

          {/* Columns Button */}
          <button className="py-2 px-4 border border-[#0D8C7C] rounded-lg bg-white text-[#0D8C7C] hover:bg-[#0D8C7C]/5 transition-colors">
            <Columns3 className="w-5 h-5" />
          </button>

          {/* Selected Actions - Only Visible When Items Selected */}
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-3 ml-1">
              <span className="text-[#10201C] text-sm font-medium">
                {selectedIds.size} selected
              </span>

              {/* Re-assign Owner */}
              <button
                onClick={() => setIsReassignOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#10201C] rounded-lg text-xs font-semibold text-[#10201C] shadow-sm hover:bg-gray-50 transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" /> Re-assign Owner
              </button>

              {/* Push to new campaign */}
              <button
                onClick={() => setIsPushOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D8C7C] text-white rounded-lg text-xs font-semibold shadow-sm hover:bg-[#14B39F] transition-colors"
              >
                <SendHorizontal className="w-3.5 h-3.5" /> Push to new campaign
                <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
              </button>

              {/* Delete */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E20000] text-white rounded-lg text-xs font-semibold shadow-sm hover:bg-[#C90000] transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          )}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="py-2 px-4 border border-[#0D8C7C] rounded-lg bg-white text-[#0D8C7C] hover:bg-[#0D8C7C]/5 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0D8C7C] text-white text-sm font-medium rounded-lg shadow-sm hover:bg-[#14B39F] transition-colors">
            <Plus className="w-4 h-4" /> New Leads
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#ECF6F5] border border-[#D3DEDB] rounded-xl flex-1 flex flex-col overflow-hidden">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left">
            <thead className="bg-[#ECF6F5] sticky top-0 z-10 border-b border-[#D3DEDB]">
              <tr>
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.size === listLeads.length &&
                      listLeads.length > 0
                    }
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-300 accent-blue-600"
                  />
                </th>
                <th className="p-4 font-bold text-[#0E0E0E]">Lead Name</th>
                <th className="p-4 font-bold text-[#0E0E0E]">Job Title</th>
                <th className="p-4 font-bold text-[#0E0E0E]">Company</th>
                <th className="p-4 font-bold text-[#0E0E0E]">Email</th>
                <th className="p-4 font-bold text-[#0E0E0E]">Health</th>
                <th className="p-4 font-bold text-[#0E0E0E]">Location</th>
                <th className="p-4 font-bold text-[#0E0E0E]">Score Fit</th>
                <th className="p-4 font-bold text-[#0E0E0E]">Action</th>
              </tr>
            </thead>
            <tbody>
              {listLeads.map((lead) => {
                const isSelected = selectedIds.has(lead.id);
                // Mock health based on index for variety
                const healthType =
                  Number(lead.id) % 3 === 0
                    ? "Risky"
                    : Number(lead.id) % 5 === 0
                      ? "Invalid"
                      : "Verified";

                return (
                  <tr
                    key={lead.id}
                    className={`border-b border-[#D3DEDB] transition-colors ${isSelected ? "bg-[#0D8C7C]/5" : "hover:bg-black/5"}`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(lead.id)}
                        className="w-4 h-4 rounded border-gray-300 accent-blue-600"
                      />
                    </td>
                    <td
                      className="p-4 font-medium text-[#10201C] underline cursor-pointer hover:text-[#0D8C7C]"
                      onClick={() => setDetailModalLead(lead)}
                    >
                      {lead.name}
                    </td>
                    <td className="p-4 text-[#10201C]">{lead.jobTitle}</td>
                    <td className="p-4 text-[#10201C]">{lead.company}</td>
                    <td className="p-4 text-[#10201C]">{lead.email}</td>
                    <td className="p-4">
                      <span
                        className={cn(
                          "px-2 py-1 rounded-md text-[13px] font-mono",
                          healthType === "Verified"
                            ? "bg-[#00C11A]/10 text-[#00B218]"
                            : healthType === "Risky"
                              ? "bg-[#FF823A]/10 text-[#FF823A]"
                              : "bg-[#E20000]/10 text-[#E20000]",
                        )}
                      >
                        {healthType}
                      </span>
                    </td>
                    <td className="p-4 text-[#10201C]">{lead.location}</td>
                    <td className="p-4 font-bold text-[#0D8C7C]">
                      {lead.fitScore}%
                    </td>
                    <td className="p-4">
                      <div className="flex gap-4 items-center">
                        <Play className="w-5 h-5 text-[#10201C] cursor-pointer hover:opacity-70" />
                        <Paperclip className="w-5 h-5 text-[#10201C] cursor-pointer hover:opacity-70" />
                        <MoreVertical className="w-5 h-5 text-[#10201C] cursor-pointer hover:opacity-70" />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {listLeads.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-[#7C8C87]">
                    No leads found in this list.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <LeadDetailModal
        isOpen={!!detailModalLead}
        onClose={() => setDetailModalLead(null)}
        lead={detailModalLead}
      />

      <ReassignModal
        isOpen={isReassignOpen}
        onClose={() => setIsReassignOpen(false)}
        leads={listLeads.filter((l) => selectedIds.has(l.id))}
      />

      <PushCampaignModal
        isOpen={isPushOpen}
        onClose={() => setIsPushOpen(false)}
        leads={listLeads.filter((l) => selectedIds.has(l.id))}
      />
      <ProgressBar />
    </div>
  );
}
