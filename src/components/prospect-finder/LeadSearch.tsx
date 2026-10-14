"use client";

import { useAppStore, Lead } from "@/lib/store";
import { useState, useCallback, useEffect } from "react";
import { LeadTable } from "./LeadTable";
import {
  Building,
  MapPin,
  User2,
  BriefcaseBusiness,
  Users2,
  Factory,
  ChevronDown,
  Sparkles,
  History,
  UserSearch,
  X,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

const CUSTOM_ICP_VALUE = "custom-icp";
const CUSTOM_ICP_LABEL = "Localization Managers at SaaS and";

const PROMPT_PILLS = [
  "VPs of sales in SaaS",
  "Fintech founders, Series A+",
  "CMOs in e-commerce",
];

// Save Search Modal
function SaveSearchModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}) {
  const [searchName, setSearchName] = useState("Teachers in USA");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl w-[360px] p-5 relative border border-[#D3DEDB]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-xs font-semibold text-gray-700 mb-2">
          Search Name
        </h3>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full border border-[#D3DEDB] rounded-md p-2.5 text-xs text-[#10201C] outline-none focus:border-brand-primary mb-5 font-mono"
        />

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-red-300 text-red-500 rounded-md text-xs font-medium hover:bg-red-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(searchName);
              onClose();
            }}
            className="px-4 py-1.5 bg-[#0D8C7C] text-white rounded-md text-xs font-medium hover:bg-[#14B39F] transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export function LeadSearch() {
  const { setLeads, icps } = useAppStore();
  const searchParams = useSearchParams();
  const isRun = searchParams.get("run") === "true";
  const icpIdParam = searchParams.get("icpId");

  const [selectedIcp, setSelectedIcp] = useState(() => icpIdParam || "no-icp");
  const [prevIcpId, setPrevIcpId] = useState(icpIdParam);
  if (icpIdParam !== prevIcpId) {
    setPrevIcpId(icpIdParam);
    setSelectedIcp(icpIdParam || "no-icp");
  }
  const [hasSearched, setHasSearched] = useState(false);
  const [maxSearch, setMaxSearch] = useState("2000");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const handleAiSearch = useCallback(() => {
    const mockLeads: Lead[] = [
      {
        id: "1",
        firstName: "Hager",
        lastName: "Torky",
        jobTitle: "UI Designer",
        company: "BayanTech",
        companyDescription:
          "AI-driven translation and localization technology provider.",
        email: "hagertorky@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 91,
      },
      {
        id: "3",
        firstName: "Toka",
        lastName: "Ali",
        jobTitle: "UX Designer",
        company: "PWC Etic",
        companyDescription:
          "Professional services and enterprise technology consulting.",
        email: "tokaali@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 50,
      },
      {
        id: "5",
        firstName: "Farah",
        lastName: "Elsayed",
        jobTitle: "Product Designer",
        company: "Synapse",
        companyDescription:
          "Brain-computer interface and neural technology research.",
        email: "farahsayed@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 85,
      },
      {
        id: "7",
        firstName: "Abeer",
        lastName: "Helmy",
        jobTitle: "Head of Design",
        company: "SI-Vision",
        companyDescription:
          "Semiconductor IP and embedded vision solutions.",
        email: "abeer56@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 99,
      },
      {
        id: "2",
        firstName: "Salma",
        lastName: "Abdelmageed",
        jobTitle: "UI/UX Designer",
        company: "AsgaTech",
        companyDescription:
          "Software development and digital transformation agency.",
        email: "salmaali@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 65,
      },
      {
        id: "4",
        firstName: "Sara",
        lastName: "Samy",
        jobTitle: "Senior UI designer",
        company: "700 Apps",
        companyDescription:
          "Mobile app and web application development studio.",
        email: "sarsamy@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 35,
      },
      {
        id: "6",
        firstName: "Amany",
        lastName: "Shafik",
        jobTitle: "Junior UX Designer",
        company: "AsgaTech",
        companyDescription:
          "Software development and digital transformation agency.",
        email: "amany@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 99,
      },
      {
        id: "8",
        firstName: "Samy",
        lastName: "Sultan",
        jobTitle: "Head of Design",
        company: "BayanTech",
        companyDescription:
          "AI-driven translation and localization technology provider.",
        email: "s.sultan@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 99,
      },
    ];
    setLeads(mockLeads);
    setHasSearched(true);
    setSelectedIcp((prev) => (prev === "no-icp" ? CUSTOM_ICP_VALUE : prev));
  }, [setLeads]);

  useEffect(() => {
    if (isRun) {
      handleAiSearch();
    }
  }, [isRun, handleAiSearch]);

  const handleClear = () => {
    setSelectedIcp("no-icp");
    setLeads([]);
    setHasSearched(false);
  };

  const hasIcpSelected = selectedIcp !== "no-icp";
  const showLeadsTable = hasSearched && hasIcpSelected;

  return (
    <main className="min-h-screen bg-[#F6F8F7] p-8 flex flex-col font-sans text-[#10201C]">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <span className="text-brand-primary">
          <UserSearch className="w-8 h-8" />
        </span>
        <h1 className="text-2xl font-bold text-[#10201C]">Prospect Finder</h1>
      </div>

      <div className="flex-1 w-full flex overflow-hidden">
        {/* Left Sidebar (Filters) */}
        <div className="w-[280px] bg-bg-mint border border-[#D3DEDB] p-4 flex flex-col gap-2 overflow-y-auto shrink-0 rounded-lg">
          <div className="flex items-center gap-2 px-1 mb-2 pt-1">
            <User2 className="w-5 h-5 text-[#10201C]" aria-hidden="true" />
            <h3 className="font-semibold text-lg text-[#10201C]">
              Customer Profile
            </h3>
          </div>

          {/* ICP Select */}
          <div>
            <div className="relative">
              <select
                id="icp-select"
                className="w-full bg-white border border-[#D6D7D7] rounded-md h-10 px-3 appearance-none outline-none text-xs text-[#10201C] font-mono truncate pr-8 cursor-pointer"
                value={selectedIcp}
                onChange={(e) => {
                  setSelectedIcp(e.target.value);
                  setHasSearched(false);
                }}
              >
                <option value="no-icp">Choose ICP</option>
                {icps.map((icp) => (
                  <option key={icp.id} value={icp.id}>
                    {icp.name}
                  </option>
                ))}
                <option value={CUSTOM_ICP_VALUE}>{CUSTOM_ICP_LABEL}</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-3 w-4 h-4 text-[#7C8C87] pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Dynamic Insights / Cost Badges */}
          {hasIcpSelected && (
            <div className="flex flex-col gap-2 my-1">
              <div className="bg-[#8FE39E] p-2.5 rounded-md border-l-4 border-[#22C55E]">
                <p className="text-[11px] font-mono text-[#10201C]">
                  Result size looks workable for one run. (1,200)
                </p>
              </div>
              <div className="bg-[#8FE39E] p-2.5 rounded-md border-l-4 border-[#22C55E]">
                <p className="text-[11px] font-mono text-[#10201C]">
                  Decision-maker coverage looks good (3 titles).
                </p>
              </div>
              <div className="bg-[#CDB4FF] p-2.5 rounded-md border-l-4 border-[#8B5CF6]">
                <p className="text-[11px] font-mono text-[#10201C]">
                  Estimated cost for this run: 180 credits (sourcing +
                  enrichment).
                </p>
              </div>
            </div>
          )}

          {/* Maximum Search Limit */}
          <div className="mt-1">
            <div className="relative">
              <select
                className="w-full bg-white border border-[#D6D7D7] rounded-md h-10 px-3 appearance-none outline-none text-xs text-[#7C8C87] font-mono truncate pr-8 cursor-pointer"
                value={maxSearch}
                onChange={(e) => setMaxSearch(e.target.value)}
              >
                <option value="" disabled>
                  Maximum Search
                </option>
                <option value="1">1</option>
                <option value="10">10</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
                <option value="2000">2000</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-3 w-4 h-4 text-[#7C8C87] pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Dynamic Filters depending on whether results are shown */}
          <div>
            <FilterDropdown
              icon={BriefcaseBusiness}
              label="Job Titles"
              badge={hasIcpSelected ? "2" : undefined}
            />
            <FilterDropdown icon={Users2} label="People Lookalikes" />
            <FilterDropdown
              icon={Building}
              label="Company"
              badge={hasIcpSelected ? "3" : undefined}
            />
            <FilterDropdown
              icon={MapPin}
              label="Location"
              badge={hasIcpSelected ? "1" : undefined}
            />
            <FilterDropdown
              icon={Factory}
              label="Industry"
              badge={hasIcpSelected ? "1" : undefined}
            />
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-auto pt-4 border-t border-[#D3DEDB]">
            {hasIcpSelected ? (
              /* --- STATE 2 FOOTER: When Table is visible --- */
              <div className="flex justify-between">
                <button
                  onClick={() => setIsSaveModalOpen(true)}
                  className="text-brand-primary px-3 border rounded-lg border-brand-primary py-1.5 text-xs font-semibold cursor-pointer"
                >
                  Save Search
                </button>
                <div className="flex items-center justify-end gap-2 text-xs font-mono">
                  <button
                    onClick={handleClear}
                    className="text-brand-primary hover:text-[#10201C] transition-colors cursor-pointer"
                  >
                    Clear All{" "}
                    <span className="text-[10px] text-text-gray">(18)</span>
                  </button>
                  <button
                    onClick={handleAiSearch}
                    className="px-5 py-1.5 bg-[#0D8C7C] text-white font-medium text-xs rounded-lg hover:bg-[#14B39F] shadow-sm transition-colors cursor-pointer"
                  >
                    Search
                  </button>
                </div>
              </div>
            ) : (
              /* --- STATE 1 FOOTER: Initial search view --- */
              <div className="flex items-center justify-end gap-2 text-xs font-mono">
                <button
                  onClick={handleClear}
                  className="px-3 py-1.5 text-brand-primary font-medium text-sm hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  onClick={handleAiSearch}
                  className="px-5 py-1.5 bg-[#0D8C7C] text-white font-medium text-sm rounded-lg hover:bg-[#14B39F] shadow-sm transition-colors cursor-pointer"
                >
                  Search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 ml-4 flex flex-col">
          {!showLeadsTable ? (
            /* --- STATE 1: INITIAL AI SEARCH SCREEN --- */
            <div className="flex-1 bg-white rounded-xl border border-[#D3DEDB] flex flex-col items-center justify-center p-8 text-center">
              <h2 className="text-5xl font-bold text-[#10201C] mb-1">
                Hey Hager!
              </h2>
              <h3 className="bg-[linear-gradient(180deg,#0D8C7C_0%,#14B39F_25%,#6D5BD0_100%)] bg-clip-text text-transparent text-5xl font-bold leading-[120%] mb-3">
                I&apos;m Smart Prospect Finder
              </h3>
              <p className="text-lg font-semibold text-[#10201C] mb-8">
                Describe your ideal customer, or start with filters
              </p>

              {/* AI Search Box Container */}
              <div className="w-full max-w-2xl rounded-lg p-[1px] bg-linear-to-b from-[#0D8C7C] via-[#14B39F] to-[#6D5BD0] shadow-[0_2px_4px_rgba(124,140,135,0.4)] mb-6">
                <div className="bg-[#F8FCFB] rounded-lg p-4 relative text-left">
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Ask AI to find your specific leads..."
                    className="w-full h-14 bg-transparent outline-none text-xs text-[#10201C] placeholder:text-[#A0B0AC] font-mono resize-none"
                  />
                  <div className="flex items-center justify-between pt-2">
                    <button className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#D3DEDB] rounded-full text-xs text-[#7C8C87] font-mono hover:border-brand-primary transition-colors cursor-pointer">
                      <History className="w-3.5 h-3.5" />
                      Chat History
                    </button>
                    <button
                      onClick={handleAiSearch}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-brand-primary text-black rounded-full text-xs font-bold hover:bg-[#0D8C7C]/5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                      AI Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Prompt Suggestion Pills */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {PROMPT_PILLS.map((pill) => (
                  <button
                    key={pill}
                    onClick={() => {
                      setAiPrompt(pill);
                      handleAiSearch();
                    }}
                    className="px-4 py-1.5 bg-white border border-[#D3DEDB] rounded-full text-xs text-[#7C8C87] font-mono shadow-[0_2px_4px_rgba(124,140,135,0.4)] hover:border-brand-primary hover:text-brand-primary transition-all cursor-pointer"
                  >
                    Q {pill}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* --- STATE 2: LEADS TABLE VIEW --- */
            <div className="flex-1 flex flex-col relative overflow-hidden bg-transparent">
              <LeadTable showIcpScores={true} />
            </div>
          )}
        </div>
      </div>

      <SaveSearchModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={() => setIsSaveModalOpen(false)}
      />
    </main>
  );
}

function FilterDropdown({
  icon: Icon,
  label,
  badge,
}: {
  icon: LucideIcon;
  label: string;
  badge?: string;
}) {
  return (
    <div className="border-b border-[#D6D7D7]">
      <button className="flex items-center justify-between w-full px-2 py-3 text-left hover:bg-black/5 rounded-md transition-colors group cursor-pointer">
        <div className="flex items-center gap-3">
          <Icon
            className="w-5 h-5 text-[#445751] opacity-70 group-hover:opacity-100"
            aria-hidden="true"
          />
          <span className="font-medium text-[15px] text-[#10201C]">
            {label}
          </span>
          {badge && (
            <span className="bg-[#E2E8F0] text-[#475569] text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full">
              +{badge}
            </span>
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-[#445751]" aria-hidden="true" />
      </button>
    </div>
  );
}
