"use client";
import { ChevronDown, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export function RescoreModal({
  isOpen,
  onClose,
  onRescore,
}: {
  isOpen: boolean;
  onClose: () => void;
  onRescore: (icp: string) => void;
}) {
  const { icps } = useAppStore();
  const [selectedIcp, setSelectedIcp] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setSelectedIcp("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-[#F6F8F7] border border-[#D3DEDB] rounded-lg shadow-xl w-full max-w-[499px] p-6 relative z-10 text-[#10201C]"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-medium text-[#10201C]">
              Rescore this list
            </h3>
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-[#7C8C87] hover:text-[#10201C] p-1 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-base font-medium text-[#212225] mb-2">
              Rescore against
            </label>
            <div className="relative">
              <select
                value={selectedIcp}
                onChange={(e) => setSelectedIcp(e.target.value)}
                className="w-full h-12 px-4 border border-[#D6D7D7] rounded-lg bg-white text-sm text-[#10201C] outline-none focus:border-[#0D8C7C] appearance-none pr-10 cursor-pointer"
              >
                <option value="" disabled>
                  Choose ICP
                </option>
                {icps.map((icp) => (
                  <option key={icp.id} value={icp.id}>
                    {icp.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 text-[#7C8C87] absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 border border-[#E20000] text-[#E20000] text-sm font-medium rounded-lg hover:bg-[#E20000]/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onRescore(selectedIcp);
                onClose();
              }}
              className="h-9 px-4 bg-[#0D8C7C] text-white text-sm font-medium rounded-lg hover:bg-[#14B39F] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15),0px_2px_4px_0px_rgba(0,0,0,0.1)] transition-colors cursor-pointer"
            >
              Re-score
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
