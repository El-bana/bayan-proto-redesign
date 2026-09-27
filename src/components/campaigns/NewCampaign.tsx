"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SendHorizonal,
  ArrowRight,
  ArrowLeft,
  Plus,
  Clock,
  Mail,
  Sparkles,
  Bold,
  Italic,
  List,
  AlignLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Users,
  FileText,
  Briefcase,
  BriefcaseBusiness,
  MessageSquare,
  MessageSquareDashed,
  MessageSquareText,
  BookOpen,
  SendHorizontal,
} from "lucide-react";

type Step = "Details" | "Sequence" | "Schedule" | "Launch";
type CampaignType = "Manual Campaign" | "AI Campaign";

interface EmailStep {
  id: string;
  stepType: string;
  sendAfterDays: number;
  cc: string;
  bcc: string;
  subject: string;
  body: string;
  unsubscribeMessage: boolean;
}

export default function NewCampaign() {
  const [currentStep, setCurrentStep] = useState<Step>("Details");

  // Step 1: Details State
  const [campaignName, setCampaignName] = useState("");
  const [campaignType, setCampaignType] =
    useState<CampaignType>("Manual Campaign");
  const [leadList, setLeadList] = useState("Teachers in USA 2026");

  // Step 2: Sequence State (Manual)
  const [emailSteps, setEmailSteps] = useState<EmailStep[]>([
    {
      id: "1",
      stepType: "General",
      sendAfterDays: 3,
      cc: "Hagertorky@gmail.com, Esraamahmoud@gmail.com",
      bcc: "Marwaashraf@gmail.com, Wardtarak@gmail.com",
      subject: "Laoret - Elevate Your Global Communication Strategy",
      body: `Hi {{first_name}} {{last_name}},\n\nentering new markets without local content tends to be the bottleneck.\n\nWe map where the delay actually sits before quoting, so you see the sequencing rather than a price list.\n\nHappy to send the one-page version instead of a 20-minute call.\n\n- {{sender_name}}`,
      unsubscribeMessage: true,
    },
  ]);
  const [activeEmailIndex, setActiveEmailIndex] = useState<number>(0);

  // Step 2: Sequence State (AI)
  const [aiGoal, setAiGoal] = useState("Book a discovery call");
  const [aiTone, setAiTone] = useState("Formal");
  const [aiLanguage, setAiLanguage] = useState("English");
  const [aiUnsubscribe, setAiUnsubscribe] = useState(true);

  // Lead Navigation State
  const [currentLeadIndex, setCurrentLeadIndex] = useState(2); // 3 of 10 leads (0-indexed = 2)
  const totalLeads = 10;

  // Step 3: Schedule State
  const [startDate, setStartDate] = useState("");
  const [sendFrom, setSendFrom] = useState("08:00 AM");
  const [sendUntil, setSendUntil] = useState("05:00 PM");
  const [weekendPattern, setWeekendPattern] = useState(
    "Saturday-Sunday (Western)",
  );
  const [timezoneBasis, setTimezoneBasis] = useState("Each lead's local time");

  // Add new Email step to sequence
  const handleAddEmail = () => {
    const newStep: EmailStep = {
      id: String(Date.now()),
      stepType: "Follow-up",
      sendAfterDays: 2,
      cc: "",
      bcc: "",
      subject: `Follow-up ${emailSteps.length + 1}`,
      body: `Hi {{first_name}},\n\nFollowing up on my previous email. Let me know if you have time for a quick chat.`,
      unsubscribeMessage: true,
    };
    setEmailSteps([...emailSteps, newStep]);
    setActiveEmailIndex(emailSteps.length);
  };

  const activeEmail = emailSteps[activeEmailIndex] || emailSteps[0];

  const updateActiveEmail = (key: keyof EmailStep, value: any) => {
    setEmailSteps((prev) =>
      prev.map((step, idx) =>
        idx === activeEmailIndex ? { ...step, [key]: value } : step,
      ),
    );
  };

  return (
    <main className="min-h-screen relative bg-[#F6F8F7] p-8 flex flex-col">
      {/* Dynamic Header Breadcrumb */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-[#0D8C7C]">
          <SendHorizontal className="w-8 h-8" />
        </span>{" "}
        <h1 className="text-[28px] font-bold text-[#10201C]">
          Campaigns{" "}
          <span className="font-normal text-text-light">
            / {campaignName.trim() ? campaignName : "New Campaign"}
          </span>
        </h1>
      </div>

      {/* Multi-Step Tab Bar */}
      <div className="flex border-b border-[#D9D9D9] mt-8 gap-8">
        {(["Details", "Sequence", "Schedule", "Launch"] as Step[]).map(
          (step) => {
            const isActive = currentStep === step;
            return (
              <button
                key={step}
                onClick={() => setCurrentStep(step)}
                className={`pb-3 px-2 text-base font-medium relative transition-colors ${isActive ? "text-[#10201C]" : "text-[#D9D9D9] hover:text-gray-500"}`}
              >
                {step}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10201C]" />
                )}
              </button>
            );
          },
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 max-w-7xl w-full">
        {/* STEP 1: DETAILS */}
        {currentStep === "Details" && (
          <div className="max-w-2xl space-y-6">
            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">
                Campaign Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Enter campaign name..."
                className="w-full bg-white border border-border-gray rounded-lg px-4 py-2.5 text-sm text-text-dark focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">
                Campaign Type<span className="text-red-500">*</span>
              </label>
              <select
                value={campaignType}
                onChange={(e) =>
                  setCampaignType(e.target.value as CampaignType)
                }
                className="w-full bg-white border border-border-gray rounded-lg px-4 py-2.5 text-sm text-text-dark focus:outline-none focus:border-brand-primary"
              >
                <option value="Manual Campaign">Manual Campaign</option>
                <option value="AI Campaign">AI Campaign</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">
                Choose lead list
              </label>
              <select
                value={leadList}
                onChange={(e) => setLeadList(e.target.value)}
                className="w-full bg-white border border-border-gray rounded-lg px-4 py-2.5 text-sm text-text-dark focus:outline-none focus:border-brand-primary"
              >
                <option value="Teachers in USA 2026">
                  Teachers in USA 2026
                </option>
                <option value="Europe Tech Leaders">Europe Tech Leaders</option>
                <option value="KSA Enterprise Leads">
                  KSA Enterprise Leads
                </option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Link
                href="/campaigns"
                className="px-6 py-2 border border-[#E20000] text-[#E20000] rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                onClick={() => setCurrentStep("Sequence")}
                className="flex items-center gap-2 px-6 py-2 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SEQUENCE (MANUAL) */}
        {currentStep === "Sequence" && campaignType === "Manual Campaign" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column: Form Editor */}
            <div className="bg-bg-mint border border-border-gray rounded-lg p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 flex-wrap border-b border-border-gray pb-3">
                <span className="text-xs font-bold text-text-dark mr-2">
                  Email {activeEmailIndex + 1} of {emailSteps.length}
                </span>
                {emailSteps.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveEmailIndex(idx)}
                    className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                      activeEmailIndex === idx
                        ? "bg-brand-primary text-white"
                        : "bg-white border border-border-gray text-text-dark hover:bg-gray-50"
                    }`}
                  >
                    Email {idx + 1}
                  </button>
                ))}
                <button
                  onClick={handleAddEmail}
                  className="flex items-center gap-1 px-3 py-1 text-xs bg-white border border-brand-primary text-brand-primary rounded-md font-medium hover:bg-teal-50"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Email
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1">
                    Step type
                  </label>
                  <select
                    value={activeEmail.stepType}
                    onChange={(e) =>
                      updateActiveEmail("stepType", e.target.value)
                    }
                    className="w-full bg-white border border-border-gray rounded-lg px-3 py-2 text-xs text-text-dark focus:outline-none"
                  >
                    <option value="General">General</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Breakup">Breakup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-dark mb-1">
                    Send after
                  </label>
                  <div className="flex items-center bg-white border border-border-gray rounded-lg px-3 py-2">
                    <input
                      type="number"
                      value={activeEmail.sendAfterDays}
                      onChange={(e) =>
                        updateActiveEmail(
                          "sendAfterDays",
                          Number(e.target.value),
                        )
                      }
                      className="w-full text-xs text-text-dark outline-none"
                    />
                    <span className="text-xs text-text-light ml-2">Days</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1">
                  CC
                </label>
                <input
                  type="text"
                  value={activeEmail.cc}
                  onChange={(e) => updateActiveEmail("cc", e.target.value)}
                  className="w-full bg-white border border-border-gray rounded-lg px-3 py-2 text-xs text-text-dark focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1">
                  BCC
                </label>
                <input
                  type="text"
                  value={activeEmail.bcc}
                  onChange={(e) => updateActiveEmail("bcc", e.target.value)}
                  className="w-full bg-white border border-border-gray rounded-lg px-3 py-2 text-xs text-text-dark focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1">
                  Subject<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={activeEmail.subject}
                  onChange={(e) => updateActiveEmail("subject", e.target.value)}
                  className="w-full bg-white border border-border-gray rounded-lg px-3 py-2 text-xs text-text-dark focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1">
                  Email Body<span className="text-red-500">*</span>
                </label>
                <div className="bg-white border border-border-gray rounded-lg overflow-hidden">
                  <textarea
                    rows={8}
                    value={activeEmail.body}
                    onChange={(e) => updateActiveEmail("body", e.target.value)}
                    className="w-full p-3 text-xs text-text-dark font-mono focus:outline-none resize-none"
                  />
                  <div className="flex items-center gap-3 p-2 bg-bg-light border-t border-border-gray text-gray-500 text-xs">
                    <button className="hover:text-black">
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button className="hover:text-black">
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button className="hover:text-black">
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button className="hover:text-black">
                      <AlignLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="text-xs font-semibold text-text-dark">
                  Unsubscribe Message
                </label>
                <input
                  type="checkbox"
                  checked={activeEmail.unsubscribeMessage}
                  onChange={(e) =>
                    updateActiveEmail("unsubscribeMessage", e.target.checked)
                  }
                  className="w-4 h-4 accent-brand-primary cursor-pointer"
                />
              </div>
            </div>

            {/* Right Column: Exact Preview Card Matching Design image_3f43da.png */}
            <div className="space-y-6">
              <div className="bg-bg-mint border border-border-gray rounded-lg p-6 space-y-4">
                <h3 className="text-sm font-bold text-text-dark">
                  Preview as a real read
                </h3>

                {/* Lead Controls Bar matching image_3f43da.png */}
                <div className="flex items-center justify-between">
                  <button
                    disabled={currentLeadIndex === 0}
                    onClick={() =>
                      setCurrentLeadIndex((prev) => Math.max(0, prev - 1))
                    }
                    className="flex items-center gap-1 px-3 py-1.5 border border-brand-primary text-brand-primary rounded-lg text-xs font-medium bg-white hover:bg-teal-50 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous lead
                  </button>

                  <span className="text-xs text-text-light font-medium">
                    {currentLeadIndex + 1} of {totalLeads} leads
                  </span>

                  <button
                    disabled={currentLeadIndex === totalLeads - 1}
                    onClick={() =>
                      setCurrentLeadIndex((prev) =>
                        Math.min(totalLeads - 1, prev + 1),
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1.5 border border-brand-primary text-brand-primary rounded-lg text-xs font-medium bg-white hover:bg-teal-50 disabled:opacity-40"
                  >
                    Next lead <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Lead Metadata */}
                <p className="text-xs font-medium text-text-light">
                  Megan Delaney · VP Marketing · Lumenly Platform
                </p>

                {/* Mail Body Canvas */}
                <div className="bg-white border border-border-gray rounded-lg p-6 shadow-sm space-y-4">
                  <p className="text-[11px] text-text-light font-mono">
                    Email as Megan receives it
                  </p>
                  <p className="text-xs font-bold text-text-dark">
                    {activeEmail.subject || "Preview as a real read"}
                  </p>
                  <p className="text-xs text-text-dark whitespace-pre-line leading-relaxed font-mono">
                    {activeEmail.body
                      .replace("{{first_name}}", "Megan")
                      .replace("{{last_name}}", "Delaney")
                      .replace("{{sender_name}}", "Anna Reid")}
                  </p>
                </div>
              </div>

              {/* Navigation Action Buttons matching image_3f43da.png */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setCurrentStep("Details")}
                  className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  onClick={() => setCurrentStep("Schedule")}
                  className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SEQUENCE (AI CAMPAIGN) */}
        {currentStep === "Sequence" && campaignType === "AI Campaign" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-bg-mint border border-border-gray rounded-lg p-6 space-y-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-primary" />
                <h3 className="font-bold text-text-dark">AI campaign brief</h3>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1">
                  Goal
                </label>
                <select
                  value={aiGoal}
                  onChange={(e) => setAiGoal(e.target.value)}
                  className="w-full bg-white border border-border-gray rounded-lg px-3 py-2 text-xs text-text-dark focus:outline-none"
                >
                  <option value="Book a discovery call">
                    Book a discovery call
                  </option>
                  <option value="Promote Webinar">Promote Webinar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1">
                  Tone
                </label>
                <select
                  value={aiTone}
                  onChange={(e) => setAiTone(e.target.value)}
                  className="w-full bg-white border border-border-gray rounded-lg px-3 py-2 text-xs text-text-dark focus:outline-none"
                >
                  <option value="Formal">Formal</option>
                  <option value="Casual">Casual</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1">
                  Email Language
                </label>
                <select
                  value={aiLanguage}
                  onChange={(e) => setAiLanguage(e.target.value)}
                  className="w-full bg-white border border-border-gray rounded-lg px-3 py-2 text-xs text-text-dark focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-semibold text-text-dark">
                  Unsubscribe Message
                </span>
                <input
                  type="checkbox"
                  checked={aiUnsubscribe}
                  onChange={(e) => setAiUnsubscribe(e.target.checked)}
                  className="w-4 h-4 accent-brand-primary cursor-pointer"
                />
              </div>

              <button className="w-full py-2.5 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" /> Generate Sequence
              </button>
            </div>

            {/* Right Column Preview */}
            <div className="space-y-6">
              <div className="bg-bg-mint border border-border-gray rounded-lg p-6 space-y-4">
                <h3 className="text-sm font-bold text-text-dark">
                  Review & Approve Generated Email
                </h3>
                <p className="text-xs text-text-light">
                  Megan Delaney · VP Marketing · Lumenly Platform
                </p>
                <div className="bg-white border border-border-gray rounded-lg p-6 space-y-3">
                  <p className="text-xs font-bold text-text-dark">
                    Help entering new markets
                  </p>
                  <p className="text-xs text-text-dark leading-relaxed font-mono">
                    Hi Megan Delaney,
                    <br />
                    entering new markets without local content tends to be the
                    bottleneck. We map where the delay actually sits before
                    quoting.
                    <br />- Anna Reid
                  </p>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setCurrentStep("Details")}
                  className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  onClick={() => setCurrentStep("Schedule")}
                  className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SCHEDULE */}
        {currentStep === "Schedule" && (
          <div className="max-w-4xl space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-dark mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white border border-border-gray rounded-lg px-3 py-2 text-xs text-text-dark focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-dark mb-2">
                  Send from
                </label>
                <input
                  type="text"
                  value={sendFrom}
                  onChange={(e) => setSendFrom(e.target.value)}
                  className="w-full bg-white border border-border-gray rounded-lg px-3 py-2 text-xs text-text-dark focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-dark mb-2">
                  Send until
                </label>
                <input
                  type="text"
                  value={sendUntil}
                  onChange={(e) => setSendUntil(e.target.value)}
                  className="w-full bg-white border border-border-gray rounded-lg px-3 py-2 text-xs text-text-dark focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-dark mb-2">
                  Weekend pattern
                </label>
                <select
                  value={weekendPattern}
                  onChange={(e) => setWeekendPattern(e.target.value)}
                  className="w-full bg-white border border-border-gray rounded-lg px-3 py-2 text-xs text-text-dark focus:outline-none"
                >
                  <option value="Saturday-Sunday (Western)">
                    Saturday-Sunday (Western)
                  </option>
                  <option value="Friday-Saturday (Middle East)">
                    Friday-Saturday (Middle East)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-dark mb-2">
                  Timezone basis
                </label>
                <select
                  value={timezoneBasis}
                  onChange={(e) => setTimezoneBasis(e.target.value)}
                  className="w-full bg-white border border-border-gray rounded-lg px-3 py-2 text-xs text-text-dark focus:outline-none"
                >
                  <option value="Each lead's local time">
                    Each lead's local time
                  </option>
                  <option value="Sender local time">Sender local time</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep("Sequence")}
                className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg text-sm font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              <button
                onClick={() => setCurrentStep("Launch")}
                className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: LAUNCH */}
        {currentStep === "Launch" && (
          <div className="max-w-4xl space-y-6">
            {campaignType === "AI Campaign" ? (
              <div className="grid grid-cols-3 gap-4">
                <div className="flex bg-white border border-border-gray rounded-lg overflow-hidden shadow-sm h-20">
                  <div className="w-18 bg-brand-primary flex items-center justify-center shrink-0">
                    <BriefcaseBusiness className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 p-3 flex flex-col gap-1 items-center">
                    <p className="font-bold text-text-dark">Leads</p>
                    <p className="text-text-gray font-semibold">10</p>
                  </div>
                </div>
                <div className="flex bg-white border border-border-gray rounded-lg overflow-hidden shadow-sm h-20">
                  <div className="w-18 bg-brand-primary flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 p-3 flex flex-col gap-1 items-center">
                    <p className="font-bold text-text-dark">Emails/Day</p>
                    <p className="text-text-gray font-semibold">130</p>
                  </div>
                </div>
                <div className="flex bg-white border border-border-gray rounded-lg overflow-hidden shadow-sm h-20">
                  <div className="w-18 bg-brand-primary flex items-center justify-center shrink-0">
                    <MessageSquareText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 p-3 flex flex-col gap-1 items-center">
                    <p className="font-bold text-text-dark">Messages</p>
                    <p className="text-text-gray font-semibold">136</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                <div className="border border-border-gray p-4 rounded-lg flex items-center gap-6">
                  <div className="p-2 border border-brand-primary rounded-full">
                    <BriefcaseBusiness className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-text-dark text-lg">10</p>
                    <p className="text-text-gray">Leads</p>
                  </div>
                </div>
                <div className="border border-border-gray p-4 rounded-lg flex items-center gap-6">
                  <div className="p-2 border border-brand-primary rounded-full">
                    <Mail className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-text-dark text-lg">130</p>
                    <p className="text-text-gray">Emails/day</p>
                  </div>
                </div>
                <div className="border border-border-gray p-4 rounded-lg flex items-center gap-6">
                  <div className="p-2 border border-brand-primary rounded-full">
                    <MessageSquareText className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-text-dark text-lg">136</p>
                    <p className="text-text-gray">Messages</p>
                  </div>
                </div>
                <div className="border border-border-gray p-4 rounded-lg flex items-center gap-6">
                  <div className="p-2 border border-brand-primary rounded-full">
                    <BookOpen className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-text-dark text-lg">2</p>
                    <p className="text-text-gray">Templates</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-[#6F3FFF]/50 rounded-lg p-5 text-text-dark border-l-6 border-badge-purple-text">
              <h3 className="font-semibold text-base mb-2">Sending</h3>
              <p className="text-sm leading-relaxed opacity-90">
                Saigent sends this from 3 managed inboxes at about 130 emails a
                day, rising to 130 next week as newer inboxes finish warming.
                You do not need to connect or configure anything.
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-border-gray">
              <button
                onClick={() => setCurrentStep("Schedule")}
                className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg text-sm font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              <button
                onClick={() => (window.location.href = "/campaigns/1")}
                className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white rounded-lg text-sm font-bold shadow-md transition-colors"
              >
                Launch campaign <SendHorizonal className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
