"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Pencil } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BUYING_SIGNALS_OPTIONS = [
  "Regulatory_filing",
  "Market_expansion",
  "Hiring_multilingual",
  "Product_launch",
];

const TECHNOLOGIES_OPTIONS = [
  "Veeva Vault",
  "Sales force",
  "Hubspot",
  "Contentful",
  "Workday",
  "SAP",
];

export function IcpCreationModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState<"select" | "ai" | "ai-preview" | "manual">(
    "select",
  );
  const [aiPrompt, setAiPrompt] = useState("");
  const [selectedSignals, setSelectedSignals] = useState<string[]>([
    "Regulatory_filing",
  ]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>(["Veeva Vault"]);
  const router = useRouter();
  const { addIcp } = useAppStore();

  const handleClose = useCallback(() => {
    setStep("select");
    setAiPrompt("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  const handleAiSearch = () => {
    if (!aiPrompt.trim()) return;
    setStep("ai-preview");
  };

  const handleSaveAiIcp = () => {
    addIcp({
      name: "American ICP",
      industry: "Education",
      size: "200-1000",
      region: "USA",
      titles: ["Special Education Director/Teacher", "Director of Education"],
    });
    handleClose();
    router.push("/lead-locator");
  };

  const handleManualSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    addIcp({
      name: (fd.get("name") as string) || "Custom ICP",
      industry: (fd.get("industry") as string) || "Education",
      size: (fd.get("size") as string) || "500 - 1000",
      region: (fd.get("region") as string) || "United states of america",
      titles: ((fd.get("titles") as string) || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
    handleClose();
    router.push("/lead-locator");
  };

  const toggleSignal = (signal: string) => {
    setSelectedSignals((prev) =>
      prev.includes(signal)
        ? prev.filter((s) => s !== signal)
        : [...prev, signal],
    );
  };

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            onClick={handleClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#F4F9F8] rounded-xl shadow-2xl w-full max-w-xl overflow-hidden text-[#10201C] z-10 my-8"
          >
            {/* Header */}
            <div className="p-6 pb-0 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#10201C]">
                  Add New ICP
                </h2>
                {step === "select" && (
                  <p className="text-xs text-[#6B7C77] mt-1 font-mono">
                    Describe your customer in plain language, or build it field
                    by field.
                  </p>
                )}
              </div>
              <button
                onClick={handleClose}
                aria-label="Close"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 pt-3">
              {/* --- STEP 1: SELECT OPTION --- */}
              {step === "select" && (
                <div className="grid grid-cols-2 gap-4 my-2">
                  <button
                    onClick={() => setStep("ai")}
                    className="flex flex-col items-center text-center p-6 bg-white border border-[#D3DEDB] rounded-lg hover:border-[#0D8C7C] transition-all group"
                  >
                    <div className="mb-3 text-[#0D8C7C]">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-[#10201C] mb-1">
                      Describe it in words
                    </h3>
                    <p className="text-[11px] text-[#7C8C87] leading-relaxed font-mono">
                      Write a sentence or two, the profile is drafted for you,
                      then you edit it.
                    </p>
                  </button>

                  <button
                    onClick={() => setStep("manual")}
                    className="flex flex-col items-center text-center p-6 bg-white border border-[#D3DEDB] rounded-lg hover:border-[#0D8C7C] transition-all group"
                  >
                    <div className="mb-3 text-[#50635D]">
                      <Pencil className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-[#10201C] mb-1">
                      Build it yourself
                    </h3>
                    <p className="text-[11px] text-[#7C8C87] leading-relaxed font-mono">
                      Fill the fields directly, with live match estimates.
                    </p>
                  </button>
                </div>
              )}

              {/* --- STEP 2: AI PROMPT INPUT --- */}
              {step === "ai" && (
                <div className="mt-2">
                  <div className="relative border border-[#0D8C7C] rounded-lg bg-white p-3 min-h-[120px] flex flex-col justify-between">
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Ask AI to find your specific leads..."
                      className="w-full h-20 bg-transparent outline-none text-xs text-[#10201C] placeholder:text-[#A0B0AC] font-mono resize-none"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={handleAiSearch}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#0D8C7C]/30 text-[#0D8C7C] rounded-full text-xs font-semibold hover:bg-[#0D8C7C]/5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Search
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* --- STEP 3: MANUAL BUILD FORM --- */}
              {step === "manual" && (
                <form
                  onSubmit={handleManualSave}
                  className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 text-xs font-mono"
                >
                  <div>
                    <label className="block text-[#10201C] font-semibold mb-1">
                      ICP Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      required
                      defaultValue="American ICP"
                      className="w-full p-2.5 bg-white border border-[#D3DEDB] rounded-md outline-none focus:border-[#0D8C7C] text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#50635D] mb-1">
                        Industry
                      </label>
                      <select
                        name="industry"
                        defaultValue="Education"
                        className="w-full p-2.5 bg-white border border-[#D3DEDB] rounded-md outline-none focus:border-[#0D8C7C] text-xs"
                      >
                        <option value="Education">Education</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Life Sciences">Life Sciences</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#50635D] mb-1">
                        Region
                      </label>
                      <select
                        name="region"
                        defaultValue="United states of america"
                        className="w-full p-2.5 bg-white border border-[#D3DEDB] rounded-md outline-none focus:border-[#0D8C7C] text-xs"
                      >
                        <option value="United states of america">
                          United states of america
                        </option>
                        <option value="GCC">GCC</option>
                        <option value="Middle east">Middle east</option>
                        <option value="UK">UK</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[#50635D] mb-1">
                        Company Size
                      </label>
                      <input
                        name="size"
                        defaultValue="500 - 1000"
                        className="w-full p-2.5 bg-white border border-[#D3DEDB] rounded-md outline-none focus:border-[#0D8C7C] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[#50635D] mb-1">
                        Revenue
                      </label>
                      <input
                        name="revenue"
                        defaultValue="50M$- 100M$"
                        className="w-full p-2.5 bg-white border border-[#D3DEDB] rounded-md outline-none focus:border-[#0D8C7C] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[#50635D] mb-1">
                        Maximum Seniority
                      </label>
                      <input
                        name="seniority"
                        defaultValue="Manager"
                        className="w-full p-2.5 bg-white border border-[#D3DEDB] rounded-md outline-none focus:border-[#0D8C7C] text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#50635D] mb-1">
                      Decision-maker titles (comma separated)
                    </label>
                    <input
                      name="titles"
                      defaultValue="Special Education Director/Teacher ,Director of Education and Lead Teac"
                      className="w-full p-2.5 bg-white border border-[#D3DEDB] rounded-md outline-none focus:border-[#0D8C7C] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[#50635D] mb-1.5">
                      Buying Signals
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {BUYING_SIGNALS_OPTIONS.map((sig) => {
                        const isSelected = selectedSignals.includes(sig);
                        return (
                          <button
                            type="button"
                            key={sig}
                            onClick={() => toggleSignal(sig)}
                            className={`px-2.5 py-1 rounded border text-[11px] transition-colors ${
                              isSelected
                                ? "bg-[#ECF8F6] border-[#0D8C7C] text-[#0D8C7C]"
                                : "bg-white border-[#D3DEDB] text-[#7C8C87]"
                            }`}
                          >
                            {sig}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#50635D] mb-1.5">
                      Technologies
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TECHNOLOGIES_OPTIONS.map((tech) => {
                        const isSelected = selectedTechs.includes(tech);
                        return (
                          <button
                            type="button"
                            key={tech}
                            onClick={() => toggleTech(tech)}
                            className={`px-2.5 py-1 rounded border text-[11px] transition-colors ${
                              isSelected
                                ? "bg-[#ECF8F6] border-[#0D8C7C] text-[#0D8C7C]"
                                : "bg-white border-[#D3DEDB] text-[#7C8C87]"
                            }`}
                          >
                            {tech}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#50635D] mb-1">
                        Pains -{" "}
                        <span className="text-gray-400 font-normal">
                          Used when writing email
                        </span>
                      </label>
                      <textarea
                        placeholder="Write pains"
                        className="w-full h-16 p-2 bg-white border border-[#D3DEDB] rounded-md outline-none focus:border-[#0D8C7C] text-xs resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#50635D] mb-1">
                        Value propositions
                      </label>
                      <textarea
                        placeholder="write value propositions"
                        className="w-full h-16 p-2 bg-white border border-[#D3DEDB] rounded-md outline-none focus:border-[#0D8C7C] text-xs resize-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#50635D] mb-1">
                      Disqualifiers -{" "}
                      <span className="text-gray-400 font-normal">
                        a hit caps the score at 25
                      </span>
                    </label>
                    <textarea
                      placeholder="Write pains"
                      className="w-full h-16 p-2 bg-white border border-[#D3DEDB] rounded-md outline-none focus:border-[#0D8C7C] text-xs resize-none"
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
                      type="submit"
                      className="px-4 py-1.5 bg-[#0D8C7C] text-white hover:bg-[#14B39F] rounded text-xs font-semibold transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}

              {/* --- STEP 4: AI RESULT PREVIEW --- */}
              {step === "ai-preview" && (
                <div className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-[#10201C] font-semibold mb-1">
                      ICP Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      readOnly
                      value="American ICP"
                      className="w-full p-2 bg-white border border-[#D3DEDB] rounded-md outline-none text-xs"
                    />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="block text-[#50635D] mb-1">
                        Industry
                      </span>
                      <span className="px-3 py-1 bg-[#6F3FFF]/50 text-[#8000FF] rounded-full text-xs font-semibold inline-block">
                        Education
                      </span>
                    </div>

                    <div>
                      <span className="block text-[#50635D] mb-1">
                        Company Size
                      </span>
                      <span className="px-3 py-1 bg-[#6F3FFF]/50 text-[#8000FF] rounded-full text-xs font-semibold inline-block">
                        200-1000
                      </span>
                    </div>

                    <div>
                      <span className="block text-[#50635D] mb-1">Region</span>
                      <span className="px-3 py-1 bg-[#6F3FFF]/50 text-[#8000FF] rounded-full text-xs font-semibold inline-block">
                        USA
                      </span>
                    </div>

                    <div>
                      <span className="block text-[#50635D] mb-1">
                        Decision-maker titles
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-[#6F3FFF]/50 text-[#8000FF] rounded-full text-xs font-semibold">
                          Special Education Director/Teacher
                        </span>
                        <span className="px-3 py-1 bg-[#6F3FFF]/50 text-[#8000FF] rounded-full text-xs font-semibold">
                          Director of Education
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-1.5 border border-[#FF9B9B] text-[#FF5C5C] hover:bg-red-50 rounded text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveAiIcp}
                      className="px-4 py-1.5 bg-[#0D8C7C] text-white hover:bg-[#14B39F] rounded text-xs font-semibold transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
