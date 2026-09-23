"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building,
  Clock,
  ChevronDown,
  Edit,
  Trash,
  SendHorizonal,
  BriefcaseBusiness,
  RotateCw,
  Earth,
} from "lucide-react";
import { Lead } from "@/lib/store";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

export function LeadDetailModal({ isOpen, onClose, lead }: Props) {
  const [activeTab, setActiveTab] = useState<
    "Sequence" | "Activity" | "Validation"
  >("Sequence");

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!lead) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-[#ECF6F5] shadow-2xl z-50 flex flex-col rounded-l-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 pb-4 relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-700 hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00C11A] flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {lead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#10201C]">
                      {lead.name}
                    </h2>
                    <p className="text-[#10201C] font-medium mt-1">
                      {lead.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#10201C]" />
                    <span className="font-semibold text-sm text-[#10201C] underline">
                      {lead.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Earth className="w-4 h-4 text-[#10201C]" />
                    <span className="font-semibold text-sm text-[#10201C]">
                      GCC
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="w-4 h-4 text-[#10201C]" />
                    <span className="font-semibold text-sm text-[#10201C]">
                      {lead.jobTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#10201C]" />
                    <span className="font-semibold text-sm text-[#10201C]">
                      Games
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#D9D9D9] mt-8 gap-8">
                {(["Sequence", "Activity", "Validation"] as const).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 px-2 text-base font-medium relative transition-colors ${activeTab === tab ? "text-[#10201C]" : "text-[#D9D9D9] hover:text-gray-500"}`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="tab-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10201C]"
                        />
                      )}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-white mx-8 mb-8 rounded-xl border border-[#D3DEDB] p-6 shadow-sm relative">
              {activeTab === "Sequence" && (
                <div className="flex flex-col">
                  {/* Campaign Header */}
                  <div className="flex justify-between items-center mb-8 px-2">
                    <div className="w-72">
                      <label className="text-sm font-bold text-[#10201C] mb-2 block">
                        Campaign
                      </label>
                      <div className="relative">
                        <select className="w-full appearance-none bg-white border border-[#D6D7D7] text-gray-400 text-base rounded-lg p-3 outline-none focus:border-[#0D8C7C]">
                          <option>choose campaign</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 mt-4">
                      <div className="flex items-center gap-2">
                        <SendHorizonal className="w-5 h-5 text-[#10201C]" />
                        <span className="text-base font-semibold text-[#10201C]">
                          3 Campaigns
                        </span>
                      </div>
                      <span className="bg-[#00C11A]/50 text-[#00B218] text-xs font-semibold px-8 py-1.5 rounded w-full text-center">
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Email Box 1 */}
                  <div className="bg-[#F6F8F7] border border-[#D3DEDB] rounded-lg p-6 relative">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[#7C8C87] text-base font-medium">
                        Opener Email
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="bg-[#00C11A]/50 text-[#00B218] text-sm font-medium px-4 py-1.5 rounded">
                          Delivered
                        </span>
                        <Edit className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                        <Trash className="w-5 h-5 text-red-400 cursor-pointer hover:text-red-600" />
                      </div>
                    </div>
                    <hr className="border-[#D3DEDB] mb-4" />
                    <h4 className="text-[#0E0E0E] text-base font-medium mb-3">
                      Laoret-elevate your global
                    </h4>
                    <p className="text-[#445751] text-sm font-mono leading-relaxed">
                      Dear Mohamed, I hope this message finds you well. This is
                      Omar from the Laoret team, and I am excited to introduce
                      our company, a trusted provider of ISO-certified
                      translation and localization services.
                    </p>
                  </div>

                  {/* Dashed Arrow Down */}
                  <div className="flex flex-col items-center justify-center h-8">
                    <div className="w-px h-full border-l-2 border-dashed border-[#10201C] relative">
                      <div className="absolute -bottom-1 -left-1.5 w-3 h-3 border-b-2 border-r-2 border-[#10201C] transform rotate-45" />
                    </div>
                  </div>

                  {/* Delay Node */}
                  <div className="flex justify-center z-10 relative">
                    <div className="bg-[#F6F8F7] border border-dashed border-[#10201C] rounded-2xl px-6 py-3 flex items-center gap-4">
                      <Clock className="w-6 h-6 text-[#10201C]" />
                      <span className="font-bold text-[#10201C] text-lg">
                        Wait for
                      </span>
                      <div className="bg-white border border-[#D6D7D7] rounded-md w-12 h-8 flex items-center justify-center font-bold text-[#10201C]">
                        2
                      </div>
                      <span className="font-bold text-[#10201C] text-lg">
                        Days
                      </span>
                    </div>
                  </div>

                  {/* Dashed Arrow Down */}
                  <div className="flex flex-col items-center justify-center h-8">
                    <div className="w-px h-full border-l-2 border-dashed border-[#10201C] relative">
                      <div className="absolute -bottom-1 -left-1.5 w-3 h-3 border-b-2 border-r-2 border-[#10201C] transform rotate-45" />
                    </div>
                  </div>

                  {/* Email Box 2 */}
                  <div className="bg-[#F6F8F7] border border-[#D3DEDB] rounded-lg p-6 relative">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[#7C8C87] text-base font-medium">
                        Social proof
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="bg-[#8000FF]/50 text-[#1814F3] text-sm font-medium px-4 py-1.5 rounded">
                          Pending
                        </span>
                        <Edit className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                        <Trash className="w-5 h-5 text-red-400 cursor-pointer hover:text-red-600" />
                      </div>
                    </div>
                    <hr className="border-[#D3DEDB] mb-4" />
                    <h4 className="text-[#0E0E0E] text-base font-medium mb-3">
                      Laoret-elevate your global
                    </h4>
                    <p className="text-[#445751] text-sm font-mono leading-relaxed">
                      Dear Mohamed, I hope this message finds you well. This is
                      Omar from the Laoret team, and I am excited to introduce
                      our company, a trusted provider of ISO-certified
                      translation and localization services.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "Activity" && (
                <div className="flex flex-col gap-0 py-4 px-4">
                  {/* Activity 1 */}
                  <div className="flex items-start gap-8">
                    <div className="w-24 shrink-0 flex flex-col items-center">
                      <div className="text-sm font-mono text-[#10201C] text-left w-full">
                        30-05-2026
                        <br />
                        3:00 PM
                      </div>
                      <div className="flex flex-col items-center mt-3 h-16">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#10201C]" />
                        <div className="w-px h-full bg-[#10201C]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#10201C]" />
                      </div>
                    </div>
                    <div className="pt-0 pb-16">
                      <p className="text-[#10201C] text-base font-medium">
                        Lead Replied: "Not interested right now"
                      </p>
                      <p className="text-[#10201C] text-base font-medium">
                        From Campaign: "Q1 Mass Outreach" (Step 3)
                      </p>
                    </div>
                  </div>

                  {/* Activity 2 */}
                  <div className="flex items-start gap-8">
                    <div className="w-24 shrink-0 flex flex-col items-center">
                      <div className="text-sm font-mono text-[#10201C] text-left w-full">
                        25-01-2026
                        <br />
                        11:00 AM
                      </div>
                      <div className="flex flex-col items-center mt-3 h-16">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#10201C]" />
                        <div className="w-px h-full bg-[#10201C]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#10201C]" />
                      </div>
                    </div>
                    <div className="pt-0 pb-16">
                      <p className="text-[#10201C] text-base font-medium">
                        Email Sent via sender_1@company.com
                      </p>
                      <p className="text-[#10201C] text-base font-medium">
                        From Campaign: "AI Personalization Pitch" (Step 1)
                      </p>
                    </div>
                  </div>

                  {/* Activity 3 */}
                  <div className="flex items-start gap-8">
                    <div className="w-24 shrink-0 flex flex-col items-center">
                      <div className="text-sm font-mono text-[#10201C] text-left w-full">
                        20-01-2026
                        <br />
                        2:30 PM
                      </div>
                    </div>
                    <div className="pt-0">
                      <p className="text-[#10201C] text-base font-medium">
                        Email Opened (Open #2)
                      </p>
                      <p className="text-[#10201C] text-base font-medium">
                        From Campaign: "AI Personalization Pitch" (Step 1)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Validation" && (
                <div className="flex flex-col gap-4">
                  {/* Green Reasoning Box */}
                  <div className="bg-[#71DD80] rounded-xl p-5 text-[#10201C] border-l-6 border-green-600">
                    <h3 className="font-semibold text-base mb-2">Reasoning</h3>
                    <p className="text-sm leading-relaxed opacity-90">
                      Head of Regulatory Affairs at Corvina Medica International
                      matches the DACH Life Sciences profile on sub-vertical
                      Pharmaceuticals, role, company size, location. Timing
                      signal: market expansion. Revenue is unconfirmed.
                    </p>
                  </div>

                  {/* Score Breakdown Table Card */}
                  <div className="bg-[#F8FAF9] border border-[#D3DEDB] rounded-xl p-5">
                    <div className="flex items-center pb-4 border-b border-[#D3DEDB]">
                      <span className="font-bold text-base w-44 text-[#10201C]">
                        Score Breakdown
                      </span>
                      <span className="font-bold text-lg text-[#0D8C7C]">
                        91%
                      </span>
                    </div>

                    <div className="divide-y divide-[#D3DEDB]">
                      {/* Row 1 */}
                      <div className="flex items-center py-3 text-sm">
                        <span className="font-semibold text-[#10201C] w-44">
                          Industry fit
                        </span>
                        <span className="font-mono text-[#7C8C87] w-16">
                          25/25
                        </span>
                        <span className="font-mono text-[#7C8C87]">
                          Pharmaceutical
                        </span>
                      </div>

                      {/* Row 2 */}
                      <div className="flex items-center py-3 text-sm">
                        <span className="font-semibold text-[#10201C] w-44">
                          Role fit
                        </span>
                        <span className="font-mono text-[#7C8C87] w-16">
                          25/25
                        </span>
                        <span className="font-mono text-[#7C8C87]">
                          Head of Regulatory Affairs
                        </span>
                      </div>

                      {/* Row 3 */}
                      <div className="flex items-center py-3 text-sm">
                        <span className="font-semibold text-[#10201C] w-44">
                          Company size
                        </span>
                        <span className="font-mono text-[#7C8C87] w-16">
                          15/15
                        </span>
                        <span className="font-mono text-[#7C8C87]">
                          201-1000 vs target 201-1000
                        </span>
                      </div>

                      {/* Row 4 */}
                      <div className="flex items-center py-3 text-sm">
                        <span className="font-semibold text-[#10201C] w-44">
                          Geography
                        </span>
                        <span className="font-mono text-[#7C8C87] w-16">
                          15/15
                        </span>
                        <span className="font-mono text-[#7C8C87]">
                          Germany
                        </span>
                      </div>

                      {/* Row 5 */}
                      <div className="flex items-center py-3 text-sm">
                        <span className="font-semibold text-[#10201C] w-44">
                          Buying signals
                        </span>
                        <span className="font-mono text-[#7C8C87] w-16">
                          5/20
                        </span>
                        <span className="font-mono text-[#7C8C87]">
                          Market expansion
                        </span>
                      </div>

                      {/* Row 6 */}
                      <div className="flex items-center py-3 text-sm">
                        <span className="font-semibold text-[#10201C] w-44">
                          Account depth
                        </span>
                        <span className="font-mono text-[#7C8C87] w-16">
                          0/5
                        </span>
                        <span className="font-mono text-[#7C8C87]">
                          0 other decision-makers at this company
                        </span>
                      </div>

                      {/* Row 7 */}
                      <div className="flex items-center pt-3 text-sm">
                        <span className="font-semibold text-[#10201C] w-44">
                          Technology match
                        </span>
                        <span className="font-mono text-[#7C8C87] w-16">
                          0/5
                        </span>
                        <span className="font-mono text-[#7C8C87]">
                          none recorded
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Email Validation Status Bar */}
                  <div className="bg-[#F8FAF9] border border-[#D3DEDB] rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-base text-[#10201C]">
                        Email Validation
                      </span>
                      <span className="bg-[#FFB088] text-[#802200] text-xs font-bold px-3 py-1 rounded">
                        Risky
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#7C8C87]">
                      Last Validation 10-03-2026
                    </span>
                  </div>

                  {/* Validate Email Action Button */}
                  <button className="w-full py-3 border-2 border-[#0D8C7C] bg-white rounded-xl text-[#0D8C7C] font-bold flex items-center justify-center gap-2 hover:bg-[#0D8C7C]/5 transition-colors">
                    <RotateCw className="w-4 h-4" />
                    <span>Validate Email</span>
                    <span className="font-normal text-xs opacity-75">
                      (1 Credit)
                    </span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
