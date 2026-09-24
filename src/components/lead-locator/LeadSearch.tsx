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
  Mail,
  UserSearch,
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

export function LeadSearch() {
  const { setLeads, icps } = useAppStore();
  const [selectedIcp, setSelectedIcp] = useState("no-icp");
  const [maxSearch, setMaxSearch] = useState("2000");
  const [aiPrompt, setAiPrompt] = useState("");
  const searchParams = useSearchParams();
  const isRun = searchParams.get("run") === "true";
  const icpIdParam = searchParams.get("icpId");

  // Automatically trigger results view if `run=true` is present
  useEffect(() => {
    if (isRun) {
      if (icpIdParam) {
        setSelectedIcp(icpIdParam);
      } else {
        setSelectedIcp(CUSTOM_ICP_VALUE);
      }
      handleAiSearch(); // Load/populate the table with the ICP leads automatically
    }
  }, [isRun, icpIdParam]);
  const handleAiSearch = useCallback(() => {
    const mockLeads: Lead[] = [
      {
        id: "1",
        name: "Hager Torky",
        jobTitle: "UI Designer",
        company: "BayanTech",
        email: "hagertorky@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 91,
      },
      {
        id: "3",
        name: "Toka Ali",
        jobTitle: "UX Designer",
        company: "PWC Etic",
        email: "tokaali@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 50,
      },
      {
        id: "5",
        name: "Farah Elsayed",
        jobTitle: "Product Designer",
        company: "Synapse",
        email: "farahsayed@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 85,
      },
      {
        id: "7",
        name: "Abeer Helmy",
        jobTitle: "Head of Design",
        company: "SI-Vision",
        email: "abeer56@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 99,
      },
      {
        id: "2",
        name: "Salma Abdelmageed",
        jobTitle: "UI/UX Designer",
        company: "AsgaTech",
        email: "salmaali@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 65,
      },
      {
        id: "4",
        name: "Sara Samy",
        jobTitle: "Senior UI designer",
        company: "700 Apps",
        email: "sarsamy@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 35,
      },
      {
        id: "6",
        name: "Amany Shafik",
        jobTitle: "Junior UX Designer",
        company: "AsgaTech",
        email: "amany@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 99,
      },
      {
        id: "8",
        name: "Samy Sultan",
        jobTitle: "Head of Design",
        company: "BayanTech",
        email: "s.sultan@gmail.com",
        location: "Cairo,Egypt",
        fitScore: 99,
      },
    ];
    setLeads(mockLeads);
    // Switch filter state so table view shows up
    setSelectedIcp(CUSTOM_ICP_VALUE);
  }, [setLeads]);

  const handleClear = () => {
    setSelectedIcp("no-icp");
    setLeads([]);
  };

  const showResults = selectedIcp !== "no-icp";

  return (
    <main className="min-h-screen bg-[#F6F8F7] p-8 flex flex-col font-sans text-[#10201C]">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <span className="text-[#0D8C7C]">
          <UserSearch className="w-6 h-6" />
        </span>
        <h1 className="text-xl font-bold text-[#10201C]">Lead Locator</h1>
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
                className="w-full bg-white border border-[#D6D7D7] rounded-md h-10 px-3 appearance-none outline-none text-xs text-[#10201C] font-mono truncate pr-8"
                value={selectedIcp}
                onChange={(e) => setSelectedIcp(e.target.value)}
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

          {/* Dynamic Insights / Cost Badges (Shown when ICP is selected) */}
          {showResults && (
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
                className="w-full bg-white border border-[#D6D7D7] rounded-md h-10 px-3 appearance-none outline-none text-xs text-[#7C8C87] font-mono truncate pr-8"
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

          {/* Filter Group Dropdowns */}
          <div>
            <FilterDropdown icon={BriefcaseBusiness} label="Job Titles" />
            <FilterDropdown icon={Users2} label="People Lookalikes" />
            <FilterDropdown icon={Building} label="Company" />
            <FilterDropdown icon={MapPin} label="Location" />
            <FilterDropdown icon={Factory} label="Industry" />
            <FilterDropdown icon={Mail} label="Email Status" />
          </div>

          <div className="mt-auto pt-4 flex border-t border-[#D3DEDB] items-center justify-between text-xs font-mono">
            {showResults ? (
              <span className="text-[#7C8C87]">25 Filters</span>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-3">
              <button
                onClick={handleClear}
                className="px-3 py-1.5 text-[#0D8C7C] font-medium text-sm hover:bg-black/5 rounded-lg transition-colors"
              >
                Clear All
              </button>

              <button className="px-5 py-1.5 bg-[#0D8C7C] text-white font-medium text-sm rounded-lg hover:bg-[#14B39F] shadow-sm transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 ml-4 flex flex-col">
          {!showResults ? (
            /* --- STATE 1: INITIAL AI SEARCH SCREEN --- */
            <div className="flex-1 bg-white rounded-xl border border-[#D3DEDB] flex flex-col items-center justify-center p-8 text-center">
              <h2 className="text-5xl font-bold text-[#10201C] mb-1">
                Hey Hager!
              </h2>
              <h3 className="bg-[linear-gradient(180deg,#0D8C7C_0%,#14B39F_25%,#6D5BD0_100%)] bg-clip-text text-transparent text-5xl font-bold leading-[120%] mb-3">
                I'm Smart LeadLocator
              </h3>
              <p className="text-lg font-semibold text-[#10201C] mb-8">
                Tell me about your perfect lead and i'll find it rightaway!
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
                    <button className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#D3DEDB] rounded-full text-xs text-[#7C8C87] font-mono hover:border-[#0D8C7C] transition-colors">
                      <History className="w-3.5 h-3.5" />
                      Chat History
                    </button>
                    <button
                      onClick={handleAiSearch}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-[#0D8C7C] text-black rounded-full text-xs font-bold hover:bg-[#0D8C7C]/5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#0D8C7C]" />
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
                    className="px-4 py-1.5 bg-white border border-[#D3DEDB] rounded-full text-xs text-[#7C8C87] font-mono shadow-[0_2px_4px_rgba(124,140,135,0.4)] hover:border-[#0D8C7C] hover:text-[#0D8C7C] transition-all"
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
    </main>
  );
}

function FilterDropdown({
  icon: Icon,
  label,
  hasValue,
  value,
}: {
  icon: LucideIcon;
  label: string;
  hasValue?: boolean;
  value?: string;
}) {
  return (
    <div className="border-b border-[#D6D7D7]">
      <button className="flex flex-col w-full px-2 py-3 text-left hover:bg-black/5 rounded-md transition-colors group">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Icon
              className="w-5 h-5 text-[#445751] opacity-70 group-hover:opacity-100"
              aria-hidden="true"
            />
            <span className="font-medium text-[16px] text-[#10201C]">
              {label}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-[#445751]" aria-hidden="true" />
        </div>
        {hasValue && value && (
          <span className="text-[12px] text-[#0D8C7C] font-mono mt-1 ml-8 bg-[#0D8C7C]/10 px-2 py-0.5 rounded-md inline-block w-fit">
            {value}
          </span>
        )}
      </button>
    </div>
  );
}
