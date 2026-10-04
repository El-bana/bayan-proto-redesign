"use client";

import { useState } from "react";
import {
  X,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

type AddTemplateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    language: string;
    subject: string;
    body: string;
  }) => void;
  existingNames: string[];
};

export default function AddTemplateModal({
  isOpen,
  onClose,
  onSave,
  existingNames,
}: AddTemplateModalProps) {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("English (Default)");
  const [subject, setSubject] = useState("Laoret - Elevate Your Global");
  const [body, setBody] = useState(
    "Dear {{First Name}}, I hope this message finds you well. This is Omar from the {{Company Name}} team, and I am excited to introduce our company, a trusted provider of ISO-certified translation and localization services. We understand the importance of effective communication in today's global market, especially within the dynamic tech landscape that teqneyat group operates in. At Laoret, we specialize in delivering high-quality multilingual content that resonates with diverse audiences, ensuring that your innovative solutions are communicated clearly across borders. Our services can address several key challenges that your organization may face: • Streamlined multilingual communication to foste",
  );

  const isDuplicate = existingNames.includes(name.trim().toLowerCase());

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim() || isDuplicate) return;
    onSave({ name, language, subject, body });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#10201C]">Add Template</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-4">
          {/* Template Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Template Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Template 1"
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none font-mono ${
                isDuplicate
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#D3DEDB] focus:border-[#0D8C7C]"
              }`}
            />
            {isDuplicate && (
              <p className="text-[11px] font-semibold text-red-500 mt-1">
                * Template name already exists, please use a unique name.
              </p>
            )}
          </div>

          {/* Language Select */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Language
            </label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-lg border border-[#D3DEDB] px-3 py-2 text-sm outline-none focus:border-[#0D8C7C] appearance-none bg-white font-mono text-gray-800"
              >
                <option>English (Default)</option>
                <option>French</option>
                <option>Spanish</option>
                <option>Arabic</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Subject Line */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border border-[#D3DEDB] px-3 py-2 text-sm outline-none focus:border-[#0D8C7C] font-mono text-gray-800"
            />
          </div>

          {/* Email Body */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Email Body
            </label>
            <textarea
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full rounded-lg border border-[#D3DEDB] p-3 text-xs font-mono outline-none focus:border-[#0D8C7C] text-gray-800 leading-relaxed resize-none"
            />

            {/* WYSIWYG Toolbar */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-100">
              <button className="p-1 border border-gray-300 rounded text-xs font-bold font-mono hover:bg-gray-50">
                {`{x}`}
              </button>
              <select className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-600 bg-white">
                <option>Nunito(Body)</option>
                <option>Sans-serif</option>
              </select>
              <select className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-600 bg-white">
                <option>20</option>
                <option>16</option>
                <option>14</option>
              </select>
              <div className="h-4 w-px bg-gray-300 mx-1" />
              <button className="p-1 text-gray-700 hover:bg-gray-100 rounded">
                <Bold className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-700 hover:bg-gray-100 rounded">
                <Italic className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-700 hover:bg-gray-100 rounded">
                <Underline className="w-4 h-4" />
              </button>
              <div className="h-4 w-px bg-gray-300 mx-1" />
              <button className="p-1 text-gray-700 hover:bg-gray-100 rounded">
                <AlignLeft className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-700 hover:bg-gray-100 rounded">
                <AlignCenter className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-700 hover:bg-gray-100 rounded">
                <AlignRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-red-500 text-red-500 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isDuplicate || !name.trim()}
            className="px-4 py-1.5 bg-[#0D8C7C] text-white text-sm font-semibold rounded-lg hover:bg-[#14B39F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
