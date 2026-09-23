
'use client';
import { useAppStore, Lead } from '@/lib/store';
import { useEffect, useRef, useState } from 'react';
import { SaveToListModal } from './SaveToListModal';
import { Plus, Check, Search, Sparkles, SlidersHorizontal, LayoutTemplate } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LeadDetailModal } from './LeadDetailModal';

interface LeadTableProps {
  showIcpScores: boolean;
}

export function LeadTable({ showIcpScores }: LeadTableProps) {
  const { leads } = useAppStore();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [enrichedIds, setEnrichedIds] = useState<Set<string>>(new Set());
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [detailModalLead, setDetailModalLead] = useState<Lead | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleEnrichAll = () => {
    setEnrichedIds(new Set(leads.map(l => l.id)));
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

  // Only selected leads that are enriched can be added to list. Wait, "the user can't add to list without either enrich or access email"
  // So if enrichedIds is empty, button is disabled. Or if no selected lead is enriched?
  // Let's say: if selectedIds.size > 0 AND at least one selected is enriched. 
  // Actually simpler: Can only add to list if selectedIds.size > 0 && enrichedIds.size > 0
  const canAddToList = selectedIds.size > 0 && enrichedIds.size > 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-[#D3DEDB] overflow-hidden"
    >
      <div className="p-4 border-b border-[#D3DEDB] flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-[#D3DEDB] px-3 h-[42px] bg-white">
            <Search className="w-4 h-4 text-[#7C8C87]" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for people...." 
              className="outline-none text-sm text-[#10201C] placeholder:text-[#7C8C87] w-[200px]" 
            />
          </div>
          <button className="flex items-center justify-center rounded-lg border border-[#0D8C7C] w-[42px] h-[42px] text-[#0D8C7C] bg-white hover:bg-[#0D8C7C]/5">
            <LayoutTemplate className="w-5 h-5 rotate-90" />
          </button>
          <button onClick={handleEnrichAll} className="flex items-center gap-2 px-4 h-[42px] rounded-lg border border-[#0D8C7C] text-[#0D8C7C] font-medium bg-white hover:bg-[#0D8C7C]/5">
            <Sparkles className="w-4 h-4" /> Enrich
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center rounded-lg border border-[#0D8C7C] w-[42px] h-[42px] text-[#0D8C7C] bg-white hover:bg-[#0D8C7C]/5">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsSaveModalOpen(true)}
            disabled={!canAddToList}
            className={cn(
              "flex items-center gap-2 px-4 h-[42px] rounded-lg text-sm font-medium transition-colors shadow-sm",
              canAddToList
                ? "bg-[#0D8C7C] text-white hover:bg-[#14B39F]" 
                : "bg-[#0D8C7C]/50 text-white/80 cursor-not-allowed"
            )}
          >
            <Plus className="w-4 h-4" /> Add to list
          </button>
        </div>
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
                  className="w-4 h-4 rounded border-[#D3DEDB] text-[#3476E3] bg-[#3476E3] focus:ring-[#3476E3] cursor-pointer"
                  aria-label="Select all leads"
                  checked={selectedIds.size === leads.length && leads.length > 0}
                  onChange={toggleAll}
                  style={{ accentColor: "#3476E3" }}
                />
              </th>
              <th className="py-4 px-4 text-[14px] font-bold text-[#0E0E0E]">full name</th>
              <th className="py-4 px-4 text-[14px] font-bold text-[#0E0E0E]">Job Title</th>
              <th className="py-4 px-4 text-[14px] font-bold text-[#0E0E0E]">Company</th>
              <th className="py-4 px-4 text-[14px] font-bold text-[#0E0E0E]">Email</th>
              <th className="py-4 px-4 text-[14px] font-bold text-[#0E0E0E]">Location</th>
              <th className="py-4 px-6 text-[14px] font-bold text-[#0E0E0E] text-center">Score Fit</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const isEnriched = enrichedIds.has(lead.id);
              return (
                <tr key={lead.id} className="border-b border-gray-100 last:border-none hover:bg-black/5 transition-colors">
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
                  <td className="py-4 px-4 text-[14px] text-[#10201C]">{lead.jobTitle}</td>
                  <td className="py-4 px-4 text-[14px] text-[#10201C]">{lead.company}</td>
                  <td className="py-4 px-4 text-[14px]">
                    {isEnriched ? (
                      <span className="text-[#0D8C7C] font-medium">{lead.email}</span>
                    ) : (
                      <button 
                        onClick={() => handleEnrichOne(lead.id)}
                        className="px-3 py-1.5 text-xs font-medium text-[#0D8C7C] border border-[#0D8C7C] rounded-md hover:bg-[#0D8C7C]/5 transition-colors"
                      >
                        Access Email
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-4 text-[14px] text-[#10201C]">{lead.location}</td>
                  <td className="py-4 px-6 text-center">
                    {showIcpScores ? (
                      <span className="text-[#0D8C7C] font-bold">
                        {lead.fitScore}%
                      </span>
                    ) : (
                      <span className="text-[#0D8C7C] font-bold text-center">N/A</span>
                    )}
                  </td>
                </tr>
              );
            })}
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
