"use client";

import React, { useState } from "react";
import {
  X,
  Clock,
  BookOpen,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  List,
  AlignJustify,
  ArrowDown,
} from "lucide-react";

interface AddStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStep?: (stepData: any) => void;
}

export default function AddStepModal({
  isOpen,
  onClose,
  onAddStep,
}: AddStepModalProps) {
  const [waitDays, setWaitDays] = useState(2);
  const [cc, setCc] = useState("Hagertorky@gmail.com , Esraamahmoud@gmail.com");
  const [bcc, setBcc] = useState("Marwaashraf@gmail.com , Wardtarek@gmail.com");
  const [subject, setSubject] = useState(
    "Laoret - Elevate Your Global Communication Strategy",
  );
  const [body, setBody] = useState(
    `-inds you well. This is Omar from the Laoret team, and I am excited to introduce our company, a trusted provider of ISO-certified translation and localization services. We understand the importance of effective communication in today's global market, especially within the dynamic tech landscape that teqneyat group operates in. At Laoret, we specialize in delivering high-quality multilingual content that resonates with diverse audiences, ensuring that your innovative solutions are communicated clearly across borders. Our services can address several key challenges that your organization may face: - Streamlined`,
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddStep) {
      onAddStep({ waitDays, cc, bcc, subject, body });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-gray-200 p-6 relative animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-lg font-bold text-gray-900">Add Step</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wait Delay Badge & Connector */}
        <div className="flex flex-col items-center justify-center my-2">
          <div className="flex items-center gap-2 border-2 border-dashed border-gray-400 rounded-2xl px-5 py-2 bg-white text-sm font-semibold text-gray-800">
            <Clock className="w-4 h-4 text-gray-600" />
            <span>Wait for</span>
            <input
              type="number"
              value={waitDays}
              onChange={(e) => setWaitDays(Number(e.target.value))}
              className="w-10 text-center font-bold border border-gray-300 rounded-md py-0.5 px-1 focus:outline-none focus:ring-1 focus:ring-[#0D8C7C]"
            />
            <span>Days</span>
          </div>
          {/* Connector Arrow */}
          <div className="flex flex-col items-center mt-1">
            <div className="w-[1px] h-3 border-l border-dashed border-gray-400" />
            <ArrowDown className="w-3.5 h-3.5 text-gray-500 -mt-1" />
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* CC Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              CC
            </label>
            <input
              type="text"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-mono text-gray-800 focus:outline-none focus:border-[#0D8C7C]"
            />
          </div>

          {/* BCC Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              BCC
            </label>
            <input
              type="text"
              value={bcc}
              onChange={(e) => setBcc(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-mono text-gray-800 focus:outline-none focus:border-[#0D8C7C]"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-mono text-gray-800 focus:outline-none focus:border-[#0D8C7C]"
            />
          </div>

          {/* Email Body Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Email Body
            </label>
            <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">
              <textarea
                rows={6}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-3 text-xs font-mono text-gray-800 focus:outline-none resize-none leading-relaxed"
              />

              {/* Rich Text Toolbar */}
              <div className="flex items-center gap-2 p-2 bg-gray-50 border-t border-gray-200 text-gray-600 text-xs overflow-x-auto">
                <button
                  type="button"
                  className="p-1 border border-teal-600 text-teal-700 rounded bg-teal-50"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center border border-gray-300 rounded px-2 py-0.5 bg-white text-gray-700 text-xs">
                  <span>Nunito(Body)</span>
                  <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
                </div>
                <div className="flex items-center border border-gray-300 rounded px-2 py-0.5 bg-white text-gray-700 text-xs">
                  <span>20</span>
                  <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
                </div>
                <button
                  type="button"
                  className="p-1 hover:text-black font-bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:text-black">
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:text-black">
                  <Underline className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:text-black">
                  <AlignLeft className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:text-black">
                  <List className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-1 hover:text-black">
                  <AlignJustify className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-1.5 border border-red-500 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-1.5 bg-[#0D8C7C] hover:bg-[#14B39F] text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
