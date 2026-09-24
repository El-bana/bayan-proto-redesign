'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIds: string[];
  onSuccess: () => void;
}

/* --- ADD NEW LIST POPUP --- */
export function AddNewListModal({ isOpen, onClose, selectedIds, onSuccess }: ModalProps) {
  const [listName, setListName] = useState('Teachers in USA');
  const { addList } = useAppStore();
  const router = useRouter();

  const handleClose = useCallback(() => {
    setListName('Teachers in USA');
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
    if (!listName.trim()) return;
    addList(listName, selectedIds);
    onSuccess();
    handleClose();
    router.push('/lists');
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
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-[#EFF6F5] rounded-xl shadow-xl w-full max-w-sm relative overflow-hidden z-10 p-5 text-[#10201C]"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#10201C]">Add new list</h2>
              <button onClick={handleClose} aria-label="Close" className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#10201C] font-semibold mb-1">
                  List Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#D3DEDB] rounded-md outline-none focus:border-[#0D8C7C] text-xs text-[#10201C]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-1.5 border border-[#FF9B9B] text-[#FF5C5C] hover:bg-red-50 rounded text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-1.5 bg-[#0D8C7C] text-white hover:bg-[#14B39F] rounded text-xs font-semibold transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* --- ADD TO EXISTING LIST POPUP --- */
export function AddToExistingListModal({ isOpen, onClose, selectedIds, onSuccess }: ModalProps) {
  const { lists, addToList } = useAppStore();
  const [selectedListId, setSelectedListId] = useState(lists[0]?.id || '');
  const router = useRouter();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    if (lists.length > 0 && !selectedListId) {
      setSelectedListId(lists[0].id);
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose, lists, selectedListId]);

  const handleSave = () => {
    if (!selectedListId) return;
    addToList(selectedListId, selectedIds);
    onSuccess();
    handleClose();
    router.push('/lists');
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
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-[#EFF6F5] rounded-xl shadow-xl w-full max-w-sm relative overflow-hidden z-10 p-5 text-[#10201C]"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#10201C]">Add to existing list</h2>
              <button onClick={handleClose} aria-label="Close" className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#10201C] font-semibold mb-1">
                  List Name<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedListId}
                    onChange={(e) => setSelectedListId(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D3DEDB] rounded-md outline-none focus:border-[#0D8C7C] text-xs text-[#10201C] appearance-none pr-8"
                  >
                    {lists.length === 0 ? (
                      <option value="">Teachers in USA</option>
                    ) : (
                      lists.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))
                    )}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-[#7C8C87] pointer-events-none" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-1.5 border border-[#FF9B9B] text-[#FF5C5C] hover:bg-red-50 rounded text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-1.5 bg-[#0D8C7C] text-white hover:bg-[#14B39F] rounded text-xs font-semibold transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}