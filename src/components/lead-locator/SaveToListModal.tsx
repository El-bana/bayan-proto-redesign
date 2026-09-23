'use client';
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FolderPlus, List as ListIcon } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedIds: string[];
  onSuccess: () => void;
}

export function SaveToListModal({ isOpen, onClose, selectedIds, onSuccess }: Props) {
  const [tab, setTab] = useState<'new' | 'existing'>('new');
  const [newListName, setNewListName] = useState('');
  const [selectedListId, setSelectedListId] = useState('');
  
  const { lists, addList, addToList } = useAppStore();
  const router = useRouter();

  const handleClose = useCallback(() => {
    setTab('new');
    setNewListName('');
    setSelectedListId('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose]);

  const handleSave = () => {
    if (tab === 'new' && newListName) {
      addList(newListName, selectedIds);
      onSuccess();
      handleClose();
      router.push('/lists');
    } else if (tab === 'existing' && selectedListId) {
      addToList(selectedListId, selectedIds);
      onSuccess();
      handleClose();
      router.push('/lists');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="save-list-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md relative overflow-hidden z-10 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 id="save-list-title" className="text-xl font-bold text-[#10201C]">Save to List</h2>
              <button onClick={handleClose} aria-label="Close" className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6">
              <div role="tablist" aria-label="List type" className="flex bg-gray-100 p-1 rounded-lg mb-6">
                <button 
                  role="tab"
                  aria-selected={tab === 'new'}
                  onClick={() => setTab('new')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${tab === 'new' ? 'bg-white text-[#10201C] shadow-sm' : 'text-[#7C8C87] hover:text-[#10201C]'}`}
                >
                  <FolderPlus className="w-4 h-4" aria-hidden="true" /> New List
                </button>
                <button 
                  role="tab"
                  aria-selected={tab === 'existing'}
                  onClick={() => setTab('existing')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${tab === 'existing' ? 'bg-white text-[#10201C] shadow-sm' : 'text-[#7C8C87] hover:text-[#10201C]'}`}
                >
                  <ListIcon className="w-4 h-4" aria-hidden="true" /> Existing List
                </button>
              </div>

              {tab === 'new' ? (
                <div>
                  <label htmlFor="new-list-name" className="block text-sm font-medium text-[#10201C] mb-2">List Name</label>
                  <input 
                    id="new-list-name"
                    type="text" 
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="e.g. Q4 Outreach"
                    className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-[#0D8C7C] focus:ring-1 focus:ring-[#0D8C7C]"
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="existing-list" className="block text-sm font-medium text-[#10201C] mb-2">Select List</label>
                  <select 
                    id="existing-list"
                    value={selectedListId}
                    onChange={(e) => setSelectedListId(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-[#0D8C7C] focus:ring-1 focus:ring-[#0D8C7C] bg-white"
                  >
                    <option value="" disabled>Choose a list...</option>
                    {lists.map(list => (
                      <option key={list.id} value={list.id}>{list.name} ({list.leadIds.length} leads)</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-8">
                <button onClick={handleClose} className="px-4 py-2 text-[#445751] hover:bg-gray-100 rounded-lg font-medium text-sm">Cancel</button>
                <button 
                  onClick={handleSave} 
                  disabled={(tab === 'new' && !newListName) || (tab === 'existing' && !selectedListId)}
                  className="px-6 py-2 bg-[#0D8C7C] text-white rounded-lg font-medium text-sm hover:bg-[#14B39F] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Save {selectedIds.length} Leads
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
