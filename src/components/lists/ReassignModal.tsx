'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw } from 'lucide-react';
import { Lead } from '@/lib/store';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
}

export function ReassignModal({ isOpen, onClose, leads }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedUser, setSelectedUser] = useState('Esraa Mahmoud');

  const handleProceed = () => {
    // In a real app, do API call here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#F6F8F7] rounded-xl shadow-xl w-full max-w-[500px] relative z-10 flex flex-col max-h-[90vh]"
        >
          {step === 1 ? (
            <>
              <div className="flex items-center justify-between p-6 pb-2">
                <h2 className="text-xl font-bold text-[#10201C]">Re-assign Owner</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <h3 className="text-lg font-bold text-[#10201C] mb-4">Leads List</h3>
                <div className="bg-white border border-[#D3DEDB] rounded-lg p-2 mb-6 max-h-60 overflow-y-auto">
                  {leads.map((lead, i) => {
                    const colors = ['bg-[#8000FF]', 'bg-[#FF823A]', 'bg-[#5B8DEF]', 'bg-[#E20000]', 'bg-[#0D8C7C]', 'bg-[#F2C94C]'];
                    const color = colors[i % colors.length];
                    const initials = lead.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
                    return (
                      <div key={lead.id} className="flex items-center gap-4 p-3 border-b border-gray-100 last:border-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${color}`}>
                          {initials}
                        </div>
                        <div className="flex-1 min-w-0 flex items-center justify-between">
                          <span className="font-bold text-[#10201C] truncate mr-4">{lead.name}</span>
                          <span className="text-[#10201C] truncate text-sm">{lead.email}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-[#10201C] mb-2">Re-assign From</label>
                  <input 
                    type="text" 
                    value="Hager Torky (Deactivated)"
                    readOnly
                    className="w-full p-3 border border-[#D3DEDB] rounded-lg bg-white outline-none text-[#10201C]"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-bold text-[#10201C] mb-2">Re-assign To</label>
                  <select 
                    value={selectedUser}
                    onChange={e => setSelectedUser(e.target.value)}
                    className="w-full p-3 border border-[#D3DEDB] rounded-lg bg-white outline-none focus:border-[#0D8C7C] text-[#10201C]"
                  >
                    <option>Esraa Mahmoud</option>
                    <option>Ahmed Hafez</option>
                  </select>
                </div>

                <div className="flex justify-between items-center">
                  <button onClick={onClose} className="px-6 py-2.5 text-[#E20000] border border-[#E20000] rounded-lg font-medium hover:bg-red-50 transition-colors">
                    Cancel
                  </button>
                  <button 
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 bg-[#0D8C7C] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#14B39F] transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" /> Re-assign
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl p-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-[#FF823A] rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-5xl font-bold">?</span>
              </div>
              <h2 className="text-3xl font-bold text-[#10201C] mb-10 leading-snug">
                Are you sure you want to<br/>Re-assign leads to {selectedUser}?
              </h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleProceed}
                  className="px-8 py-3 bg-[#0E0E0E] text-white rounded-lg font-medium hover:bg-black/80 transition-colors"
                >
                  Yes,Proceed
                </button>
                <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-[#E20000] text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
