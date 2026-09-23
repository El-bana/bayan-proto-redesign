'use client';
import { useAppStore, Lead } from '@/lib/store';
import { useEffect, useRef, useState } from 'react';
import { SaveToListModal } from './SaveToListModal';
import { Plus, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LeadDetailModal } from './LeadDetailModal';

export function LeadTable() {
  const { leads } = useAppStore();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [detailModalLead, setDetailModalLead] = useState<Lead | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const toggleAll = () => {
    if (selectedIds.size === leads.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(leads.map(l => l.id)));
  };

  const toggleOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleSaveSuccess = () => {
    setSelectedIds(new Set());
    setShowToast(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-[#D3DEDB] overflow-hidden"
    >
      <div className="p-4 border-b border-[#D3DEDB] flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-medium text-[#10201C]">{leads.length} Results</span>
          {selectedIds.size > 0 && (
            <span className="text-[14px] font-medium text-[#0D8C7C] bg-[#ECF6F5] px-3 py-1 rounded-md">
              {selectedIds.size} selected
            </span>
          )}
        </div>
        
        <button 
          onClick={() => setIsSaveModalOpen(true)}
          disabled={selectedIds.size === 0}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm",
            selectedIds.size > 0 
              ? "bg-[#0D8C7C] text-white hover:bg-[#14B39F]" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
        >
          <Plus className="w-4 h-4" /> Add to list
        </button>
      </div>

      <div className="overflow-y-auto flex-1">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-12 text-center">
            <p className="text-[#10201C] font-medium mb-1">No leads found</p>
            <p className="text-sm text-[#7C8C87]">Try a different search prompt or adjust your filters.</p>
          </div>
        ) : (
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-[#F6F8F7] shadow-[0_1px_0_#D3DEDB] z-10">
            <tr>
              <th className="py-3 px-6 w-12">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-[#0D8C7C] focus:ring-[#0D8C7C]"
                  aria-label="Select all leads"
                  checked={selectedIds.size === leads.length && leads.length > 0}
                  onChange={toggleAll}
                />
              </th>
              <th className="py-3 px-4 text-[14px] font-bold text-[#0E0E0E]">Name</th>
              <th className="py-3 px-4 text-[14px] font-bold text-[#0E0E0E]">Job Title</th>
              <th className="py-3 px-4 text-[14px] font-bold text-[#0E0E0E]">Company</th>
              <th className="py-3 px-4 text-[14px] font-bold text-[#0E0E0E]">Email</th>
              <th className="py-3 px-4 text-[14px] font-bold text-[#0E0E0E]">Location</th>
              <th className="py-3 px-6 text-[14px] font-bold text-[#0E0E0E] text-right">Score Fit</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-gray-100 last:border-none hover:bg-black/5 transition-colors">
                <td className="py-3 px-6">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-[#0D8C7C] focus:ring-[#0D8C7C]"
                    aria-label={`Select ${lead.name}`}
                    checked={selectedIds.has(lead.id)}
                    onChange={() => toggleOne(lead.id)}
                  />
                </td>
                <td className="py-3 px-4 text-[14px] font-bold text-[#10201C]">
                  <button 
                    type="button"
                    onClick={() => setDetailModalLead(lead)}
                    className="hover:underline hover:text-[#0D8C7C] transition-colors"
                  >
                    {lead.name}
                  </button>
                </td>
                <td className="py-3 px-4 text-[14px] text-[#445751]">{lead.jobTitle}</td>
                <td className="py-3 px-4 text-[14px] text-[#445751]">{lead.company}</td>
                <td className="py-3 px-4 text-[14px] text-[#0D8C7C]">{lead.email}</td>
                <td className="py-3 px-4 text-[14px] text-[#445751]">{lead.location}</td>
                <td className="py-3 px-6 text-right">
                  <span className={cn(
                    "inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold",
                    lead.fitScore >= 80 ? "bg-[#ECF6F5] text-[#0D8C7C]" : 
                    lead.fitScore >= 50 ? "bg-yellow-50 text-yellow-600" : 
                    "bg-red-50 text-red-600"
                  )}>
                    {lead.fitScore}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>

      <SaveToListModal 
        isOpen={isSaveModalOpen} 
        onClose={() => setIsSaveModalOpen(false)} 
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
            <span className="font-medium text-sm">Successfully saved leads to list!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
