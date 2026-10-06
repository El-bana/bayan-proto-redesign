"use client";
import {
  MailAlertBadge,
  MailPlusBadge,
  MailReply,
} from "@/components/layout/MailIcons";
import {
  Presentation,
  Mail,
  MailOpen,
  Calendar,
  ChevronDown,
  SendHorizontal,
  User2,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Mock data for the Email Activity chart
const activityChartData = [
  {
    date: "20",
    Bounced: 50,
    sent: 320,
    Opened: 200,
    Replied: -20,
    PositiveReply: 100,
  },
  {
    date: "21",
    Bounced: 80,
    sent: 380,
    Opened: 250,
    Replied: 30,
    PositiveReply: 150,
  },
  {
    date: "22",
    Bounced: 0,
    sent: 40,
    Opened: 10,
    Replied: 160,
    PositiveReply: 20,
  },
  {
    date: "23",
    Bounced: 30,
    sent: 300,
    Opened: 800,
    Replied: 0,
    PositiveReply: 80,
  },
  {
    date: "24",
    Bounced: 50,
    sent: 350,
    Opened: 830,
    Replied: -10,
    PositiveReply: 110,
  },
  {
    date: "25",
    Bounced: 340,
    sent: 820,
    Opened: 710,
    Replied: 270,
    PositiveReply: 380,
  },
  {
    date: "26",
    Bounced: 400,
    sent: 900,
    Opened: 310,
    Replied: 350,
    PositiveReply: 600,
  },
  {
    date: "27",
    Bounced: 460,
    sent: 960,
    Opened: 200,
    Replied: 400,
    PositiveReply: 960,
  },
  {
    date: "28",
    Bounced: 300,
    sent: 750,
    Opened: 380,
    Replied: 200,
    PositiveReply: 400,
  },
  {
    date: "29",
    Bounced: 220,
    sent: 720,
    Opened: 400,
    Replied: 160,
    PositiveReply: 280,
  },
  {
    date: "30",
    Bounced: 380,
    sent: 880,
    Opened: 740,
    Replied: 310,
    PositiveReply: 440,
  },
  {
    date: "31",
    Bounced: 300,
    sent: 800,
    Opened: 200,
    Replied: 240,
    PositiveReply: 820,
  },
  {
    date: "1",
    Bounced: 200,
    sent: 450,
    Opened: 250,
    Replied: 100,
    PositiveReply: 960,
  },
  {
    date: "2",
    Bounced: 480,
    sent: 1000,
    Opened: 850,
    Replied: 420,
    PositiveReply: 760,
  },
];

// Step performance breakdown
const sequenceSteps = [
  { step: "Step 1", sent: 98, replies: 3, percentage: 3.1, width: "35%" },
  { step: "Step 2", sent: 93, replies: 7, percentage: 7.5, width: "70%" },
  { step: "Step 3", sent: 59, replies: 7, percentage: 11.9, width: "70%" },
  { step: "Step 4", sent: 52, replies: 1, percentage: 1.9, width: "20%" },
];

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-bg-light p-6 md:p-10 space-y-6">
      {/* Page Title Header */}
      <div className="flex items-center gap-3">
        <Presentation className="w-8 h-8 text-brand-primary" />
        <h1 className="text-2xl font-bold text-text-dark">Reports</h1>
      </div>

      {/* Filter Toolbar & Section Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-medium text-text-dark tracking-tight">
          Performance metrics
        </h2>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 text-sm font-mono">
          {/* Date Picker Button */}
          <button className="flex items-center gap-1 border border-border-gray px-3 py-1 rounded-lg font-medium text-text-dark hover:border-gray-400 transition-colors shadow-sm">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span>11-03-2026 &rarr; 11-09-2026</span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>

          {/* Campaign Selector */}
          <button className="flex items-center gap-1 border border-border-gray px-3 py-1 rounded-lg font-medium text-text-dark hover:border-gray-400 transition-colors shadow-sm">
            <SendHorizontal className="w-5 h-5 text-gray-500" />
            <span>All Campaigns</span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>

          {/* Owner Selector */}
          <button className="flex items-center gap-1 border border-border-gray px-3 py-1 rounded-lg font-medium text-text-dark hover:border-gray-400 transition-colors shadow-sm">
            <User2 className="w-5 h-5 text-gray-500" />
            <span>All owners</span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Emails Sent */}
        <div className="rounded-lg border-l-6 border-badge-purple-text bg-[#6F3FFF]/50 p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <Mail className="w-10 h-10 text-badge-purple-text" />
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-badge-purple-text">
                Emails Sent
              </div>
              <div className="text-3xl font-bold text-badge-purple-text">
                100
              </div>
              <div className="text-sm font-mono text-badge-purple-text">
                100/150 leads
              </div>
            </div>
          </div>
        </div>

        {/* Opened */}
        <div className="rounded-lg border-l-6 border-[#1814F3] bg-[#1814F3]/50 p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <MailOpen className="w-10 h-10 text-[#1814F3]" />
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-[#1814F3]">Opened</div>
              <div className="text-3xl font-bold text-[#1814F3]">99</div>
              <div className="text-sm font-mono text-[#1814F3]">
                99% open rate
              </div>
            </div>
          </div>
        </div>

        {/* Replied */}
        <div className="rounded-lg border-l-6 border-[#FF823A] bg-[#FF823A]/50 p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <MailReply className="w-10 h-10 text-[#FF823A]" />
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-[#FF823A]">Replied</div>
              <div className="text-3xl font-bold text-[#FF823A]">85</div>
              <div className="text-sm font-mono text-[#FF823A]">
                85% reply rate
              </div>
            </div>
          </div>
        </div>

        {/* Positive Reply */}
        <div className="rounded-lg border-l-6 border-[#00B218] bg-[#00C11A]/50 p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <MailPlusBadge className="w-10 h-10 text-[#00B218]" />
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-[#00B218]">Positive Reply</div>
              <div className="text-3xl font-bold text-[#00B218]">85</div>
              <div className="text-sm font-mono text-[#00B218]">
                85%+ve reply rate
              </div>
            </div>
          </div>
        </div>

        {/* Bounced */}
        <div className="rounded-lg border-l-6 border-[#E20000] bg-[#E20000]/50 p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <MailAlertBadge className="w-10 h-10 text-[#E20000]" />
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-[#E20000]">Bounced</div>
              <div className="text-3xl font-bold text-[#E20000]">10</div>
              <div className="text-sm font-mono text-[#E20000]">
                10% bounce rate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Graph Card */}
      <div className="rounded-lg bg-bg-mint border border-border-gray p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-text-dark">Emails Activity</h2>
          <div className="flex items-center gap-1 text-xs font-mono text-gray-500">
            <span>20-10-2025 &rarr; 02-11-2025</span>
            <Calendar className="w-4 h-4 text-brand-primary ml-1" />
          </div>
        </div>

        {/* Custom Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono font-bold">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#E20000]" />
            <span>Bounced</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-badge-purple-text" />
            <span>sent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#1814F3]" />
            <span>Opened</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#FF823A]" />
            <span>Replied</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#00B218]" />
            <span>Positive reply</span>
          </div>
        </div>

        {/* Recharts Area Container */}
        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={activityChartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E1ECE9"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#6B7280",
                  fontSize: 12,
                  fontFamily: "monospace",
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#6B7280",
                  fontSize: 12,
                  fontFamily: "monospace",
                }}
                domain={[0, 1000]}
                ticks={[0, 200, 400, 600, 800, 1000]}
              />
              <Tooltip />
              <Area
                type="natural"
                dataKey="sent"
                stroke="#8000ff"
                fill="transparent"
                strokeWidth={2.5}
              />
              <Area
                type="natural"
                dataKey="PositiveReply"
                stroke="#00B218"
                fill="transparent"
                strokeWidth={2.5}
              />
              <Area
                type="natural"
                dataKey="Opened"
                stroke="#1814F3"
                fill="transparent"
                strokeWidth={2.5}
              />
              <Area
                type="natural"
                dataKey="Bounced"
                stroke="#E20000"
                fill="transparent"
                strokeWidth={2.5}
              />
              <Area
                type="natural"
                dataKey="Replied"
                stroke="#FF823A"
                fill="transparent"
                strokeWidth={2.5}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-between px-10 text-xs font-mono font-bold text-text-dark -mt-4">
            <span>October</span>
            <span>November</span>
          </div>
        </div>
      </div>

      {/* Sequence Step Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-lg bg-bg-mint border border-border-gray p-6 shadow-sm space-y-4">
          <h3 className="font-medium text-text-dark">
            Where replies come from
          </h3>

          <div className="space-y-4 pt-2">
            {sequenceSteps.map((step, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-text-dark">
                    {step.step} - {step.sent} Sent
                  </span>
                  <span className="font-mono text-sm text-text-dark">
                    {step.replies} Replies ({step.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200/80 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-brand-primary h-2 rounded-full"
                    style={{ width: step.width }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm font-mono text-text-gray pt-4">
            Most replies arrive at steps 2 and 3 — the argument for keeping the
            sequence longer than one email.
          </p>
        </div>
      </div>
    </main>
  );
}
