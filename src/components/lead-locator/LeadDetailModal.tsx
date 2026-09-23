'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Building, Mail, Briefcase, User } from 'lucide-react';
import type { Lead } from '@/lib/store';
import { cn } from '@/lib/utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

function DetailRow({ icon: Icon, label, value }: { icon: typeof Building; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-[#ECF6F5] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-[#0D8C7C]" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-[#7C8C87] uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium text-[#10201C] break-words">{value}</p>
      </div>
    </div>
  );
}

export function LeadDetailModal({ isOpen, onClose, lead }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && lead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-detail-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md relative overflow-hidden z-10 flex flex-col"
          >
            <div className="flex items-start justify-between p-6 border-b border-gray-100">
              <div>
                <p className="text-xs font-medium text-[#0D8C7C] mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" aria-hidden="true" /> Lead details
                </p>
                <h2 id="lead-detail-title" className="text-xl font-bold text-[#10201C]">
                  {lead.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close lead details"
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              <DetailRow icon={Briefcase} label="Job Title" value={lead.jobTitle} />
              <DetailRow icon={Building} label="Company" value={lead.company} />
              <DetailRow icon={Mail} label="Email" value={lead.email} />
              <DetailRow icon={MapPin} label="Location" value={lead.location} />

              <div className="flex items-center justify-between bg-[#ECF6F5] rounded-xl px-4 py-3">
                <span className="text-sm font-medium text-[#445751]">Fit Score</span>
                <span
                  className={cn(
                    "inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold",
                    lead.fitScore >= 80 ? "bg-[#0D8C7C]/10 text-[#0D8C7C]" :
                    lead.fitScore >= 50 ? "bg-yellow-50 text-yellow-600" :
                    "bg-red-50 text-red-600"
                  )}
                >
                  {lead.fitScore}%
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}