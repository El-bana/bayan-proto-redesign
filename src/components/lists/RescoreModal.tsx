"use client";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

export function RescoreModal({
  isOpen,
  onClose,
  onRescore,
}: {
  isOpen: boolean;
  onClose: () => void;
  onRescore: (icp: string) => void;
}) {
  const [selectedIcp, setSelectedIcp] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-[400px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-semibold text-[#10201C] mb-4">
          Rescore this list
        </h3>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rescore against
          </label>
          <div className="relative">
            <select
              value={selectedIcp}
              onChange={(e) => setSelectedIcp(e.target.value)}
              className="w-full px-3 py-2 border border-[#D3DEDB] rounded-lg bg-white text-sm text-gray-700 outline-none focus:border-[#0D8C7C] appearance-none pr-8 cursor-pointer"
            >
              <option value="" disabled>
                Choose ICP
              </option>
              <option value="icp-1">Enterprise Software ICP</option>
              <option value="icp-2">SMB Marketing ICP</option>
              <option value="icp-3">Healthcare Leaders ICP</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#E20000] text-[#E20000] text-sm font-medium rounded-lg hover:bg-[#E20000]/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onRescore(selectedIcp);
              onClose();
            }}
            className="px-4 py-2 bg-[#0D8C7C] text-white text-sm font-medium rounded-lg hover:bg-[#0B786A] transition-colors"
          >
            Re-score
          </button>
        </div>
      </div>
    </div>
  );
}
