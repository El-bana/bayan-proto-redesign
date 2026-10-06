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
import { useColumnVisibility } from "@/lib/useColumnVisibility";
import ColumnVisibilityModal from "../layout/ColumnVisibilityModal";

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

  const columnManager = useColumnVisibility([
    { key: "name", label: "full name", isVisible: true },
    { key: "jobTitle", label: "Job Title", isVisible: true },
    { key: "company", label: "Company", isVisible: true },
    { key: "email", label: "Email", isVisible: true },
    { key: "location", label: "Location", isVisible: true },
    { key: "fitScore", label: "Score Fit", isVisible: true },
  ]);

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
            <Columns3 onClick={columnManager.openModal} className="w-4 h-4" />
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
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-[#ECF6F5] text-sm font-semibold text-[#10201C]">
                  <th className="py-2 px-4 rounded-l-lg border-y border-l border-[#D3DEDB] w-12 align-middle">
                    <div className="flex items-center justify-center">
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
                    </div>
                  </th>
                  {columnManager.isVisible("name") && (
                    <th className="py-2 px-4 border-y border-[#D3DEDB]">
                      full name
                    </th>
                  )}
                  {columnManager.isVisible("jobTitle") && (
                    <th className="py-2 px-4 border-y border-[#D3DEDB]">
                      Job Title
                    </th>
                  )}
                  {columnManager.isVisible("company") && (
                    <th className="py-2 px-4 border-y border-[#D3DEDB]">
                      Company
                    </th>
                  )}
                  {columnManager.isVisible("email") && (
                    <th className="py-2 px-4 border-y border-[#D3DEDB]">
                      Email
                    </th>
                  )}
                  {columnManager.isVisible("location") && (
                    <th className="py-2 px-4 border-y border-[#D3DEDB]">
                      Location
                    </th>
                  )}
                  {columnManager.isVisible("fitScore") && (
                    <th className="py-2 px-4 rounded-r-lg border-y border-r border-[#D3DEDB] text-center">
                      Score Fit
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="text-sm text-[#10201C]">
                {leads.map((lead) => {
                  const isEnriched = enrichedIds.has(lead.id);
                  const isSelected = selectedIds.has(lead.id);
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
                            className="w-4 h-4 rounded border-[#D3DEDB] text-[#3476E3] bg-[#3476E3] focus:ring-[#3476E3] cursor-pointer"
                            aria-label={`Select ${lead.name}`}
                            checked={isSelected}
                            onChange={() => toggleOne(lead.id)}
                            style={{ accentColor: "#3476E3" }}
                          />
                        </div>
                      </td>
                      {columnManager.isVisible("name") && (
                        <td className="py-3 px-4 font-semibold border-b border-[#D3DEDB]">
                          {lead.name}
                        </td>
                      )}
                      {columnManager.isVisible("jobTitle") && (
                        <td className="py-3 px-4 border-b border-[#D3DEDB] text-gray-700">
                          {lead.jobTitle}
                        </td>
                      )}
                      {columnManager.isVisible("company") && (
                        <td className="py-3 px-4 border-b border-[#D3DEDB] text-gray-700">
                          {lead.company}
                        </td>
                      )}
                      {columnManager.isVisible("email") && (
                        <td className="py-3 px-4 border-b border-[#D3DEDB]">
                          {isEnriched ? (
                            <span className="text-[#0D8C7C] font-semibold font-mono text-xs">
                              {lead.email}
                            </span>
                          ) : (
                            <button
                              onClick={() => handleEnrichOne(lead.id)}
                              className="px-3 py-1 text-xs font-medium text-[#0D8C7C] border border-[#0D8C7C] rounded-md hover:bg-[#0D8C7C]/5 transition-colors"
                            >
                              Access Email
                            </button>
                          )}
                        </td>
                      )}
                      {columnManager.isVisible("location") && (
                        <td className="py-3 px-4 border-b border-[#D3DEDB] text-gray-700">
                          {lead.location}
                        </td>
                      )}
                      {columnManager.isVisible("fitScore") && (
                        <td className="py-3 px-4 border-b border-[#D3DEDB] text-center">
                          {showIcpScores ? (
                            <span className="text-[#0D8C7C] font-bold">
                              {lead.fitScore}%
                            </span>
                          ) : (
                            <span className="text-[#0D8C7C] font-bold">
                              N/A
                            </span>
                          )}
                        </td>
                      )}
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
      <ColumnVisibilityModal
        isOpen={columnManager.isOpen}
        onClose={columnManager.closeModal}
        columns={columnManager.columns}
        onToggleColumn={columnManager.toggleColumn}
        onShowAll={columnManager.showAll}
        onHideAll={columnManager.hideAll}
      />
    </motion.div>
  );
}
