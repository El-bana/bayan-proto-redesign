'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Pencil, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function IcpCreationModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState<'select' | 'ai' | 'manual'>('select');
  const router = useRouter();
  const { addIcp } = useAppStore();

  const handleClose = () => {
    setStep('select');
    onClose();
  };

  const handleAiSearch = () => {
    // Mock save/redirect
    addIcp({ name: 'AI Generated ICP', industry: 'SaaS', size: '10-50', region: 'Global', titles: ['VP Sales'] });
    handleClose();
    router.push('/lead-locator');
  };

  const handleManualSave = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    addIcp({
      name: (fd.get('name') as string) || 'Custom ICP',
      industry: (fd.get('industry') as string) || 'Tech',
      size: (fd.get('size') as string) || '1-10',
      region: (fd.get('region') as string) || 'USA',
      titles: [(fd.get('titles') as string) || 'CEO'],
    });
    handleClose();
    router.push('/lead-locator');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#10201C]">
                  {step === 'select' && 'Create New ICP'}
                  {step === 'ai' && 'AI ICP Creator'}
                  {step === 'manual' && 'Manual ICP Setup'}
                </h2>
                <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {step === 'select' && (
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setStep('ai')}
                      className="flex flex-col items-start p-6 border-2 border-transparent hover:border-[#0D8C7C] bg-gradient-to-br from-[#ECF6F5] to-white rounded-xl text-left transition-all group"
                    >
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                        <Sparkles className="w-6 h-6 text-[#0D8C7C]" />
                      </div>
                      <h3 className="text-lg font-bold text-[#10201C] mb-2">Describe it in words</h3>
                      <p className="text-sm text-[#7C8C87] mb-4">Let AI build your Ideal Customer Profile from a simple prompt.</p>
                      <div className="mt-auto flex items-center text-[#0D8C7C] font-medium text-sm">
                        Use AI Search <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </button>

                    <button 
                      onClick={() => setStep('manual')}
                      className="flex flex-col items-start p-6 border-2 border-gray-100 hover:border-[#0D8C7C] bg-white rounded-xl text-left transition-all group"
                    >
                      <div className="w-12 h-12 bg-[#F6F8F7] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Pencil className="w-6 h-6 text-[#445751]" />
                      </div>
                      <h3 className="text-lg font-bold text-[#10201C] mb-2">Build it yourself</h3>
                      <p className="text-sm text-[#7C8C87] mb-4">Manually configure all filters, sizes, and job titles.</p>
                      <div className="mt-auto flex items-center text-[#445751] font-medium text-sm">
                        Manual Setup <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </button>
                  </div>
                )}

                {step === 'ai' && (
                  <div className="flex flex-col gap-4">
                    <textarea 
                      placeholder="e.g. I am looking for VP of Sales in SaaS companies with 50-200 employees in Europe..."
                      className="w-full h-32 p-4 border border-gray-200 rounded-lg outline-none focus:border-[#0D8C7C] focus:ring-1 focus:ring-[#0D8C7C] resize-none"
                    ></textarea>
                    <div className="flex justify-end gap-3 mt-4">
                      <button onClick={() => setStep('select')} className="px-4 py-2 text-[#445751] hover:bg-gray-100 rounded-lg font-medium">Back</button>
                      <button onClick={handleAiSearch} className="flex items-center gap-2 px-6 py-2 bg-[#0D8C7C] text-white rounded-lg font-medium hover:bg-[#14B39F] shadow-sm">
                        <Sparkles className="w-4 h-4" /> AI Search
                      </button>
                    </div>
                  </div>
                )}

                {step === 'manual' && (
                  <form onSubmit={handleManualSave} className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#10201C] mb-1">ICP Name</label>
                        <input name="name" required className="w-full p-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#0D8C7C]" placeholder="e.g. Enterprise Q4" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#10201C] mb-1">Industry</label>
                        <select name="industry" className="w-full p-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#0D8C7C] bg-white">
                          <option>Software / SaaS</option>
                          <option>Fintech</option>
                          <option>Healthcare</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#10201C] mb-1">Company Size</label>
                        <select name="size" className="w-full p-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#0D8C7C] bg-white">
                          <option>1-10</option>
                          <option>11-50</option>
                          <option>51-200</option>
                          <option>201-500</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#10201C] mb-1">Region</label>
                        <select name="region" className="w-full p-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#0D8C7C] bg-white">
                          <option>North America</option>
                          <option>EMEA</option>
                          <option>APAC</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#10201C] mb-1">Job Titles (comma separated)</label>
                      <input name="titles" required className="w-full p-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#0D8C7C]" placeholder="e.g. CEO, Founder, VP Sales" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#10201C] mb-1">Pains & Value Prop</label>
                      <textarea className="w-full h-20 p-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#0D8C7C] resize-none" placeholder="What are they struggling with?"></textarea>
                    </div>

                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                      <button type="button" onClick={() => setStep('select')} className="px-4 py-2 text-[#445751] hover:bg-gray-100 rounded-lg font-medium">Back</button>
                      <button type="submit" className="px-6 py-2 bg-[#0D8C7C] text-white rounded-lg font-medium hover:bg-[#14B39F] shadow-sm">
                        Save ICP
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
