"use client";

import React, { useState } from "react";
import { X, Search, Eye, EyeOff } from "lucide-react";

export interface ColumnConfig {
  key: string;
  label: string;
  isVisible: boolean;
}

interface ColumnVisibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: ColumnConfig[];
  onToggleColumn: (key: string) => void;
  onShowAll: () => void;
  onHideAll: () => void;
}

export default function ColumnVisibilityModal({
  isOpen,
  onClose,
  columns,
  onToggleColumn,
  onShowAll,
  onHideAll,
}: ColumnVisibilityModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredColumns = columns.filter((col) =>
    col.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xs border border-[#D3DEDB] p-4 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3">
          <h3 className="text-base font-bold text-[#10201C]">Add column</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-3">
          <Search className="w-4 h-4 text-[#7C8C87] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search with client mail, full name, Title. etc.."
            className="w-full bg-white border border-[#D3DEDB] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#10201C] placeholder:text-[#7C8C87] focus:outline-none focus:border-[#0D8C7C]"
          />
        </div>

        {/* Bulk Toggles */}
        <div className="flex items-center justify-end gap-3 py-2 text-xs font-semibold text-[#10201C] border-b border-[#D3DEDB] mb-1">
          <button
            type="button"
            onClick={onShowAll}
            className="flex items-center gap-1 hover:text-[#0D8C7C] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" /> Show All
          </button>
          <button
            type="button"
            onClick={onHideAll}
            className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer"
          >
            <EyeOff className="w-3.5 h-3.5" /> Hide All
          </button>
        </div>

        {/* Column Item List */}
        <div className="max-h-60 overflow-y-auto divide-y divide-[#E9F3F0]">
          {filteredColumns.map((col) => (
            <div
              key={col.key}
              onClick={() => onToggleColumn(col.key)}
              className="flex items-center justify-between py-2 px-1 hover:bg-[#F6F8F7] rounded cursor-pointer transition-colors"
            >
              <span className="text-xs font-medium text-[#10201C]">
                {col.label}
              </span>
              <button type="button" className="text-[#10201C]">
                {col.isVisible ? (
                  <Eye className="w-4 h-4 text-[#10201C]" />
                ) : (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
