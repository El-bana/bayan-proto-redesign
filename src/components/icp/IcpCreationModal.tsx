"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Pencil, ChevronDown, Check } from "lucide-react";
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

const INDUSTRY_OPTIONS = [
  "Education",
  "Gaming",
  "Beauty",
  "Marketing",
  "Life Sciences",
];

const REGION_OPTIONS = ["United states of america", "GCC", "Middle east", "UK"];

const SIZE_OPTIONS = [
  "1 - 10",
  "11 - 50",
  "51 - 200",
  "201 - 500",
  "500 - 1000",
  "1000+",
];

const REVENUE_OPTIONS = [
  "Under 1M$",
  "1M$- 10M$",
  "10M$- 50M$",
  "50M$- 100M$",
  "100M$+",
];

const SENIORITY_OPTIONS = ["Entry", "Manager", "Director", "VP", "C-Level"];

const JOB_TITLE_OPTIONS = [
  "Special Education Director/Teacher",
  "Director of Education",
  "VP of Education",
  "Chief Academic Officer",
  "Head of Curriculum",
];

const MIN_TITLES = 2;
const MAX_TITLES = 4;

const fieldBase =
  "w-full px-3 py-2.5 bg-white border border-[#D3DEDB] rounded-md outline-none focus:border-[#0D8C7C] text-xs font-mono text-[#10201C]";
const labelBase = "block text-sm text-[#10201C] mb-1.5 font-medium";
const hintBase = "text-[11px] font-mono text-gray-400";

// --- Custom Styled Multi-Select Dropdown Component ---
function MultiSelectDropdown({
  label,
  options,
  selected,
  onChange,
  placeholder,
  error,
  hint,
  allowCustom = false,
  required = false,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
  error?: string;
  hint?: string;
  allowCustom?: boolean;
  required?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((item) => item !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  const handleAddCustom = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && customInput.trim()) {
      e.preventDefault();
      const trimmed = customInput.trim();
      if (!selected.includes(trimmed)) {
        onChange([...selected, trimmed]);
      }
      setCustomInput("");
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <label className={labelBase}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${fieldBase} flex items-center justify-between cursor-pointer ${
          error ? "border-red-400 focus:border-red-500" : ""
        }`}
      >
        <span className="truncate">
          {selected.length > 0 ? (
            <span className="text-[#10201C]">{selected.join(", ")}</span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>
        <div className="flex items-center gap-1">
          {selected.length > 0 && (
            <span className="bg-[#ECF8F6] text-[#0D8C7C] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {selected.length}
            </span>
          )}
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-30 w-full mt-1 bg-white border border-[#D3DEDB] rounded-md shadow-lg max-h-48 overflow-y-auto p-1 font-mono text-xs">
          {allowCustom && (
            <div className="p-1 border-b border-[#D3DEDB] mb-1">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={handleAddCustom}
                placeholder="Type and press Enter to add..."
                className="w-full px-2 py-1 bg-[#F4F9F8] border border-[#D3DEDB] rounded text-xs outline-none focus:border-[#0D8C7C]"
              />
            </div>
          )}
          {options.map((opt) => {
            const isSelected = selected.includes(opt);
            return (
              <div
                key={opt}
                onClick={() => toggleOption(opt)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-[#ECF8F6] text-[#0D8C7C] font-semibold"
                    : "hover:bg-gray-50 text-[#10201C]"
                }`}
              >
                <span>{opt}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#0D8C7C]" />}
              </div>
            );
          })}
        </div>
      )}
      {error ? (
        <p className="mt-1 text-[11px] font-mono text-red-500">{error}</p>
      ) : hint ? (
        <p className={`mt-1 ${hintBase}`}>{hint}</p>
      ) : null}
    </div>
  );
}

function SelectField({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: string[];
  defaultValue: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelBase}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={`${fieldBase} cursor-pointer`}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function IcpCreationModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState<"select" | "ai" | "ai-preview" | "manual">(
    "select",
  );
  const [aiPrompt, setAiPrompt] = useState("");

  // Multi-select state
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([
    "Education",
  ]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([
    "United states of america",
  ]);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([
    "Special Education Director/Teacher",
    "Director of Education",
  ]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>(["Veeva Vault"]);
  const [selectedSignals, setSelectedSignals] = useState<string[]>([
    "Regulatory_filing",
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();
  const { addIcp } = useAppStore();

  const handleClose = useCallback(() => {
    setStep("select");
    setAiPrompt("");
    setErrors({});
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
    router.push("/prospect-finder");
  };

  const handleManualSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};

    const name = (fd.get("name") as string).trim();
    if (!name) newErrors.name = "ICP Name is required.";
    if (selectedIndustries.length === 0)
      newErrors.industry = "Select at least one Industry.";
    if (selectedRegions.length === 0)
      newErrors.region = "Select at least one Region/Country.";

    if (
      selectedTitles.length < MIN_TITLES ||
      selectedTitles.length > MAX_TITLES
    ) {
      newErrors.titles = `Select between ${MIN_TITLES} and ${MAX_TITLES} titles (currently selected: ${selectedTitles.length}).`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addIcp({
      name,
      industry: selectedIndustries.join(", "),
      size: fd.get("size") as string,
      region: selectedRegions.join(", "),
      titles: selectedTitles,
    });
    handleClose();
    router.push("/prospect-finder");
  };

  const toggleChipSelection = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
  ) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );
  };

  const chipClass = (isSelected: boolean) =>
    `px-2.5 py-1 rounded border text-[11px] font-mono transition-colors cursor-pointer ${
      isSelected
        ? "bg-[#ECF8F6] border-[#0D8C7C] text-[#0D8C7C]"
        : "bg-white border-[#D3DEDB] text-[#7C8C87] hover:border-[#0D8C7C]/50"
    }`;

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
                  className="space-y-4 max-h-[70vh] overflow-y-auto pr-1"
                >
                  <div>
                    <label htmlFor="name" className={labelBase}>
                      ICP Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      placeholder="Teachers in USA"
                      className={`${fieldBase} ${errors.name ? "border-red-400" : ""}`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[11px] font-mono text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <MultiSelectDropdown
                      label="Industry"
                      required
                      options={INDUSTRY_OPTIONS}
                      selected={selectedIndustries}
                      onChange={setSelectedIndustries}
                      placeholder="Select industries..."
                      error={errors.industry}
                    />
                    <MultiSelectDropdown
                      label="Region"
                      required
                      options={REGION_OPTIONS}
                      selected={selectedRegions}
                      onChange={setSelectedRegions}
                      placeholder="Select regions..."
                      error={errors.region}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <SelectField
                      name="size"
                      label="Company Size"
                      options={SIZE_OPTIONS}
                      defaultValue="500 - 1000"
                    />
                    <SelectField
                      name="revenue"
                      label="Revenue"
                      options={REVENUE_OPTIONS}
                      defaultValue="50M$- 100M$"
                    />
                    <SelectField
                      name="seniority"
                      label="Maximum Seniority"
                      options={SENIORITY_OPTIONS}
                      defaultValue="Manager"
                    />
                  </div>

                  {/* Decision-maker titles (Multi-select dropdown with custom input & min 2, max 4 validation) */}
                  <MultiSelectDropdown
                    label="Decision-maker titles"
                    required
                    allowCustom
                    options={JOB_TITLE_OPTIONS}
                    selected={selectedTitles}
                    onChange={setSelectedTitles}
                    placeholder="Select or type titles..."
                    error={errors.titles}
                    hint="Minimum 2, maximum 4 job titles required."
                  />

                  {/* Buying Signals (Chips) */}
                  <div>
                    <span className={labelBase}>Buying Signals</span>
                    <div className="flex flex-wrap gap-2">
                      {BUYING_SIGNALS_OPTIONS.map((sig) => (
                        <button
                          type="button"
                          key={sig}
                          aria-pressed={selectedSignals.includes(sig)}
                          onClick={() =>
                            toggleChipSelection(
                              selectedSignals,
                              setSelectedSignals,
                              sig,
                            )
                          }
                          className={chipClass(selectedSignals.includes(sig))}
                        >
                          {sig}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Technologies (Chips) */}
                  <div>
                    <span className={labelBase}>Technologies</span>
                    <div className="flex flex-wrap gap-2">
                      {TECHNOLOGIES_OPTIONS.map((tech) => (
                        <button
                          type="button"
                          key={tech}
                          aria-pressed={selectedTechs.includes(tech)}
                          onClick={() =>
                            toggleChipSelection(
                              selectedTechs,
                              setSelectedTechs,
                              tech,
                            )
                          }
                          className={chipClass(selectedTechs.includes(tech))}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="problems" className={labelBase}>
                        Problems -{" "}
                        <span className={hintBase}>
                          Used when writing email
                        </span>
                      </label>
                      <textarea
                        id="problems"
                        name="problems"
                        placeholder="Write problems"
                        className={`${fieldBase} h-20 resize-none`}
                      />
                    </div>
                    <div>
                      <label htmlFor="whyWeWin" className={labelBase}>
                        Why We Win
                      </label>
                      <textarea
                        id="whyWeWin"
                        name="whyWeWin"
                        placeholder="Write why we win"
                        className={`${fieldBase} h-20 resize-none`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="disqualifiers" className={labelBase}>
                      Disqualifiers -{" "}
                      <span className={hintBase}>
                        a hit caps the score at 25
                      </span>
                    </label>
                    <textarea
                      id="disqualifiers"
                      name="disqualifiers"
                      placeholder="Write disqualifiers"
                      className={`${fieldBase} h-20 resize-none`}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-1.5 bg-white border border-[#FF9B9B] text-[#FF5C5C] hover:bg-red-50 rounded text-xs font-semibold"
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
