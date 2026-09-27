"use client";

import { useAppStore, Lead } from "@/lib/store";
import { useEffect, useRef, useState } from "react";
import { AddNewListModal, AddToExistingListModal } from "./SaveToListModal";
import {
  Plus,
  Check,
  Search,
  Sparkles,
  Columns3,
  Filter,
  ChevronDown,
  Sliders,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LeadDetailModal } from "./LeadDetailModal";

interface LeadTableProps {
  showIcpScores: boolean;
}

export function LeadTable({ showIcpScores }: LeadTableProps) {
  const { leads } = useAppStore();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [enrichedIds, setEnrichedIds] = useState<Set<string>>(new Set());
  const [showToast, setShowToast] = useState(false);
  const [detailModalLead, setDetailModalLead] = useState<Lead | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isNewListOpen, setIsNewListOpen] = useState(false);
  const [isExistingListOpen, setIsExistingListOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const toggleAll = () => {
    if (selectedIds.size === leads.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(leads.map((l) => l.id)));
  };

  const toggleOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleEnrichAll = () => {
    setEnrichedIds(new Set(leads.map((l) => l.id)));
  };

  const handleEnrichOne = (id: string) => {
    const newSet = new Set(enrichedIds);
    newSet.add(id);
    setEnrichedIds(newSet);
  };

  const handleSaveSuccess = () => {
    setSelectedIds(new Set());
    setShowToast(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setShowToast(false), 3000);
  };

  // Only enabled if selected leads exist AND at least one selected lead is enriched
  const canAddToList =
    selectedIds.size > 0 &&
    Array.from(selectedIds).every((id) => enrichedIds.has(id));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full shadow-sm overflow-hidden"
    >
      <div className="pb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-[#D3DEDB] px-3 h-9 bg-white">
            <Search className="w-4 h-4 text-[#7C8C87]" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for people...."
              className="outline-none text-sm text-[#10201C] placeholder:text-[#7C8C87] w-[200px]"
            />
          </div>
          <button className="flex items-center justify-center rounded-lg border border-[#0D8C7C] px-4 h-9 text-[#0D8C7C] bg-white hover:bg-[#0D8C7C]/5">
            <Columns3 className="w-4 h-4" />
          </button>

          <button
            onClick={handleEnrichAll}
            className="flex items-center gap-2 px-4 h-9 rounded-lg border border-[#0D8C7C] text-[#0D8C7C] font-medium bg-white hover:bg-[#0D8C7C]/5 transition-colors"
          >
            <Sparkles className="w-4 h-4" /> Enrich
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center rounded-lg border border-[#0D8C7C] px-4 h-9 text-[#0D8C7C] bg-white hover:bg-[#0D8C7C]/5">
            {canAddToList ? (
              <Filter className="w-4 h-4" />
            ) : (
              <Sliders className="w-4 h-4" />
            )}
          </button>

          {/* Split Dropdown Button */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => canAddToList && setIsDropdownOpen((prev) => !prev)}
              disabled={!canAddToList}
              className={`flex items-center gap-2 px-4 h-9 bg-[#0D8C7C] text-white rounded-md text-xs font-semibold transition-colors ${
                !canAddToList
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#14B39F] cursor-pointer"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Add to list</span>
              <ChevronDown className="w-3.5 h-3.5 ml-1" />
            </button>

            {isDropdownOpen && canAddToList && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-[#D3DEDB] rounded-md shadow-lg z-30 font-mono text-xs overflow-hidden">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsNewListOpen(true);
                  }}
                  className="w-full text-left px-4 py-2.5 text-[#10201C] hover:bg-[#ECF8F6] hover:text-[#0D8C7C] transition-colors border-b border-[#D3DEDB]"
                >
                  Add new list
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsExistingListOpen(true);
                  }}
                  className="w-full text-left px-4 py-2.5 text-[#10201C] hover:bg-[#ECF8F6] hover:text-[#0D8C7C] transition-colors"
                >
                  Add to existing list
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-12 text-center">
            <p className="text-[#10201C] font-medium mb-1">No leads found</p>
            <p className="text-sm text-[#7C8C87]">
              Try a different search prompt or adjust your filters.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-[#D3DEDB] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#ECF6F5] z-10">
                <tr>
                  <th className="py-3 px-6 w-12 border-b border-[#D3DEDB]">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#D3DEDB] text-[#3476E3] bg-[#3476E3] focus:ring-[#3476E3] cursor-pointer"
                      aria-label="Select all leads"
                      checked={
                        selectedIds.size === leads.length && leads.length > 0
                      }
                      onChange={toggleAll}
                      style={{ accentColor: "#3476E3" }}
                    />
                  </th>
                  <th className="py-4 px-4 text-[14px] font-bold text-[#0E0E0E] border-b border-[#D3DEDB]">
                    full name
                  </th>
                  <th className="py-4 px-4 text-[14px] font-bold text-[#0E0E0E] border-b border-[#D3DEDB]">
                    Job Title
                  </th>
                  <th className="py-4 px-4 text-[14px] font-bold text-[#0E0E0E] border-b border-[#D3DEDB]">
                    Company
                  </th>
                  <th className="py-4 px-4 text-[14px] font-bold text-[#0E0E0E] border-b border-[#D3DEDB]">
                    Email
                  </th>
                  <th className="py-4 px-4 text-[14px] font-bold text-[#0E0E0E] border-b border-[#D3DEDB]">
                    Location
                  </th>
                  <th className="py-4 px-6 text-[14px] font-bold text-[#0E0E0E] text-center border-b border-[#D3DEDB]">
                    Score Fit
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const isEnriched = enrichedIds.has(lead.id);
                  return (
                    <tr
                      key={lead.id}
                      className="border-b border-[#D3DEDB] hover:bg-black/5 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-[#D3DEDB] text-[#3476E3] bg-[#3476E3] focus:ring-[#3476E3] cursor-pointer"
                          aria-label={`Select ${lead.name}`}
                          checked={selectedIds.has(lead.id)}
                          onChange={() => toggleOne(lead.id)}
                          style={{ accentColor: "#3476E3" }}
                        />
                      </td>
                      <td className="py-4 px-4 text-[14px] font-medium text-[#10201C]">
                        {lead.name}
                      </td>
                      <td className="py-4 px-4 text-[14px] font-medium text-[#10201C]">
                        {lead.jobTitle}
                      </td>
                      <td className="py-4 px-4 text-[14px] font-medium text-[#10201C]">
                        {lead.company}
                      </td>
                      <td className="py-4 px-4 text-[14px] font-medium">
                        {isEnriched ? (
                          <span className="text-[#0D8C7C] font-medium">
                            {lead.email}
                          </span>
                        ) : (
                          <button
                            onClick={() => handleEnrichOne(lead.id)}
                            className="px-3 py-1.5 text-xs font-medium text-[#0D8C7C] border border-[#0D8C7C] rounded-md hover:bg-[#0D8C7C]/5 transition-colors"
                          >
                            Access Email
                          </button>
                        )}
                      </td>
                      <td className="py-4 px-4 text-[14px] font-medium text-[#10201C]">
                        {lead.location}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {showIcpScores ? (
                          <span className="text-[#0D8C7C] font-bold">
                            {lead.fitScore}%
                          </span>
                        ) : (
                          <span className="text-[#0D8C7C] font-bold text-center">
                            N/A
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddNewListModal
        isOpen={isNewListOpen}
        onClose={() => setIsNewListOpen(false)}
        selectedIds={Array.from(selectedIds)}
        onSuccess={handleSaveSuccess}
      />

      <AddToExistingListModal
        isOpen={isExistingListOpen}
        onClose={() => setIsExistingListOpen(false)}
        selectedIds={Array.from(selectedIds)}
        onSuccess={handleSaveSuccess}
      />

      <LeadDetailModal
        isOpen={!!detailModalLead}
        onClose={() => setDetailModalLead(null)}
        lead={detailModalLead}
      />

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-[#10201C] text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3 z-50"
          >
            <div className="w-6 h-6 bg-[#0D8C7C] rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="font-medium text-sm">
              Successfully saved leads to list!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
