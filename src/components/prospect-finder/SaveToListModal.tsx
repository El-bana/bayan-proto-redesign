'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

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
    router.push('/leads');
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

/* --- ADD TO LIST POPUP (EXISTING OR NEW) --- */
export interface AddToListModalProps extends ModalProps {
  initialMode?: 'existing' | 'new';
}

export function AddToListModal({
  isOpen,
  onClose,
  selectedIds,
  onSuccess,
  initialMode = 'existing',
}: AddToListModalProps) {
  const { lists, addToList, addList } = useAppStore();
  const [mode, setMode] = useState<'existing' | 'new'>(initialMode);
  const [selectedListId, setSelectedListId] = useState(() => lists[0]?.id || '');
  const [newListName, setNewListName] = useState('');
  const router = useRouter();

  const handleClose = useCallback(() => {
    setNewListName('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    setMode(initialMode);
    if (lists.length > 0) {
      setSelectedListId((prev) => prev || lists[0].id);
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose, initialMode, lists]);

  const handleSave = () => {
    if (mode === 'existing') {
      if (!selectedListId) return;
      addToList(selectedListId, selectedIds);
    } else {
      if (!newListName.trim()) return;
      addList(newListName.trim(), selectedIds);
    }
    onSuccess();
    handleClose();
    router.push('/leads');
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
              <h2 className="text-base font-bold text-[#10201C]">Add to List</h2>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs: Existing List vs New List */}
            <div className="grid grid-cols-2 p-1 bg-[#DCEAE7] rounded-lg mb-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode('existing')}
                className={cn(
                  "py-2 px-3 rounded-md transition-all text-center cursor-pointer",
                  mode === 'existing'
                    ? "bg-white text-[#0D8C7C] shadow-sm"
                    : "text-[#556963] hover:text-[#10201C]"
                )}
              >
                Existing List
              </button>
              <button
                type="button"
                onClick={() => setMode('new')}
                className={cn(
                  "py-2 px-3 rounded-md transition-all text-center cursor-pointer",
                  mode === 'new'
                    ? "bg-white text-[#0D8C7C] shadow-sm"
                    : "text-[#556963] hover:text-[#10201C]"
                )}
              >
                New List
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#10201C] font-semibold mb-1">
                  List Name<span className="text-red-500">*</span>
                </label>
                {mode === 'existing' ? (
                  <div className="relative">
                    <select
                      value={selectedListId}
                      onChange={(e) => setSelectedListId(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#D3DEDB] rounded-md outline-none focus:border-[#0D8C7C] text-xs text-[#10201C] appearance-none pr-8 cursor-pointer"
                    >
                      {lists.length === 0 ? (
                        <option value="">No lists available</option>
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
                ) : (
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Enter list name..."
                    className="w-full p-2.5 bg-white border border-[#D3DEDB] rounded-md outline-none focus:border-[#0D8C7C] text-xs text-[#10201C]"
                  />
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-1.5 border border-[#FF9B9B] text-[#FF5C5C] hover:bg-red-50 rounded text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-1.5 bg-[#0D8C7C] text-white hover:bg-[#14B39F] rounded text-xs font-semibold transition-colors cursor-pointer"
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

export function AddToExistingListModal(props: ModalProps) {
  return <AddToListModal {...props} initialMode="existing" />;
}