"use client";

import Link from "next/link";
import {
  MailPlus,
  DollarSign,
  LayoutGrid,
  BriefcaseBusiness,
  SendHorizonal,
} from "lucide-react";
import { MailPlusBadge } from "@/components/layout/MailIcons";

type Campaign = {
  id: number;
  name: string;
  owner: string;
  totalLeads: number;
  sent: number;
  rate: number;
  status: "Active" | "Paused";
};

const recentCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Euro Campaign",
    owner: "HT",
    totalLeads: 50,
    sent: 25,
    rate: 35,
    status: "Active",
  },
  {
    id: 2,
    name: "GCC Campaign",
    owner: "HT",
    totalLeads: 50,
    sent: 5,
    rate: 10,
    status: "Paused",
  },
  {
    id: 3,
    name: "USA Campaign",
    owner: "HT",
    totalLeads: 50,
    sent: 50,
    rate: 85,
    status: "Active",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-bg-light p-6 md:p-10 space-y-6">
      {/* Page Title Header */}
      <div className="flex items-center gap-3 mb-6">
        <LayoutGrid className="w-8 h-8 text-brand-primary" />
        <h1 className="text-2xl font-bold text-text-dark">Dashboard</h1>
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold text-text-dark tracking-tight">
        Good Morning, Hager!
      </h2>

      {/* Top 4 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Stat 1: Leads */}
        <div className="rounded-lg border border-border-gray flex overflow-hidden shadow-sm">
          <div className="bg-brand-primary w-30 flex items-center justify-center shrink-0">
            <BriefcaseBusiness className="w-8 h-8 text-white" />
          </div>
          <div className="p-4 flex flex-col justify-center">
            <div className="text-2xl font-bold text-text-dark">145</div>
            <div className="text-gray-500 font-medium">Leads in Lead List</div>
            <div className="font-bold text-brand-primary mt-1">
              292 Contacted
            </div>
          </div>
        </div>

        {/* Stat 2: Live Campaigns */}
        <div className="rounded-lg border border-border-gray flex overflow-hidden shadow-sm">
          <div className="bg-brand-primary w-30 flex items-center justify-center shrink-0">
            <SendHorizonal className="w-7 h-7 text-white" />
          </div>
          <div className="p-4 flex flex-col justify-center">
            <div className="text-2xl font-bold text-text-dark">15</div>
            <div className="text-gray-500 font-medium">Live campaigns</div>
            <div className="font-bold text-brand-primary mt-1">20 Total</div>
          </div>
        </div>

        {/* Stat 3: Positive Replies */}
        <div className="rounded-lg border border-border-gray flex overflow-hidden shadow-sm">
          <div className="bg-brand-primary w-30 flex items-center justify-center shrink-0">
            <MailPlusBadge className="w-8 h-8 text-white" />
          </div>
          <div className="p-4 flex flex-col justify-center">
            <div className="text-2xl font-bold text-text-dark">9</div>
            <div className="text-gray-500 font-medium">Positive Replies</div>
            <div className="font-bold text-brand-primary mt-1">
              3.1% Delivered
            </div>
          </div>
        </div>

        {/* Stat 4: Credits Left */}
        <div className="rounded-lg border border-border-gray flex overflow-hidden shadow-sm">
          <div className="bg-brand-primary w-30 flex items-center justify-center shrink-0">
            <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="p-4 flex flex-col justify-center">
            <div className="text-2xl font-bold text-text-dark">1,857</div>
            <div className="text-gray-500 font-medium">Credits left</div>
            <div className="font-bold text-brand-primary mt-1">of 2000</div>
          </div>
        </div>
      </div>

      {/* Middle Section: Attention Box & Sending Capacity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Needs Your Attention Banner Card */}
        <div className="lg:col-span-6 rounded-lg border border-border-gray p-6 shadow-sm flex flex-col justify-between">
          <h2 className="text-base font-bold text-text-dark mb-4">
            Needs your attention
          </h2>

          <div className="space-y-4">
            {/* Green Alert Banner */}
            <div className="bg-[#00C11A]/50 rounded-lg p-4 text-text-dark border-l-6 border-[#00B218] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <MailPlus className="w-6 h-6 text-[#00B218]" />
                <div>
                  <h3 className="font-bold text-sm">
                    6 positive replies waiting for your attention
                  </h3>
                  <p className="text-[11px] text-text-gray font-mono mt-0.5">
                    Reply speed is the strongest predictor of a booked meeting.
                  </p>
                </div>
              </div>
              <Link
                href="/mail"
                className="bg-brand-primary hover:bg-[#0A7366] text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ml-2"
              >
                Open Inbox
              </Link>
            </div>

            {/* Orange Alert Banner */}
            <div className="bg-[#FF823A]/50 rounded-lg p-4 text-text-dark border-l-6 border-[#FF823A] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <MailPlus className="w-6 h-6 text-[#FF823A]" />
                <div>
                  <h3 className="font-bold text-sm">
                    Bounce rates getting higher and needs attention
                  </h3>
                  <p className="text-[11px] text-text-gray font-mono mt-0.5">
                    Bounce rate could ruin your reputation start warm up
                  </p>
                </div>
              </div>
              <Link
                href="/mail"
                className="bg-brand-primary hover:bg-[#0A7366] text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ml-2"
              >
                Open warm up
              </Link>
            </div>
          </div>
        </div>

        {/* Sending Capacity Card */}
        <div className="lg:col-span-6 rounded-lg border border-border-gray p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-text-dark">
              Sending capacity
            </h2>
            <p className="text-xs font-mono text-text-light mt-1 mb-5">
              Managed by Saigent — nothing to configure
            </p>

            {/* Capacity Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-bg-mint border border-[#E1ECE9] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-text-dark mb-1">25</div>
                <div className="text-xs font-mono text-text-light">
                  Emails/day now
                </div>
              </div>
              <div className="bg-bg-mint border border-[#E1ECE9] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-text-dark mb-1">35</div>
                <div className="text-xs font-mono text-text-light">
                  Next Week
                </div>
              </div>
              <div className="bg-bg-mint border border-[#E1ECE9] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-text-dark mb-1">5</div>
                <div className="text-xs font-mono text-text-light">
                  Active Inboxes
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs font-mono text-text-light">
            Capacity rises as inboxes finish warming. You never pick or connect
            a sending tool.
          </p>
        </div>
      </div>

      {/* Campaigns Table Card */}
      <div className="rounded-lg border border-border-gray p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-dark">Campaigns</h2>
          <Link
            href="/campaigns"
            className="border border-brand-primary text-brand-primary hover:bg-teal-50 text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
          >
            All campaigns
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-bg-mint text-sm font-mono text-gray-700">
                <th className="py-3 px-4 rounded-l-lg border-y border-l border-border-gray font-bold">
                  Campaign Name
                </th>
                <th className="py-3 px-4 border-y border-border-gray font-bold">
                  Owner
                </th>
                <th className="py-3 px-4 border-y border-border-gray font-bold">
                  Total Leads
                </th>
                <th className="py-3 px-4 border-y border-border-gray font-bold">
                  Sent
                </th>
                <th className="py-3 px-4 border-y border-border-gray font-bold">
                  Rate
                </th>
                <th className="py-3 px-4 border-y border-border-gray font-bold">
                  Status
                </th>
                <th className="py-3 px-4 rounded-r-lg border-y border-r border-border-gray font-bold text-right"></th>
              </tr>
            </thead>
            <tbody className="text-sm text-text-dark">
              {recentCampaigns.map((c) => (
                <tr key={c.id} className="hover:bg-gray-200 transition-colors">
                  <td className="py-4 px-4 border-b border-border-gray">
                    {c.name}
                  </td>
                  <td className="py-4 px-4 border-b border-border-gray">
                    <span className="w-7 h-7 rounded-full bg-[#B8A4FF] text-white flex items-center justify-center font-bold text-[11px]">
                      {c.owner}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono border-b border-border-gray">
                    {c.totalLeads}
                  </td>
                  <td className="py-4 px-4 font-mono border-b border-border-gray">
                    {c.sent}
                  </td>
                  <td className="py-4 px-4 border-b border-border-gray">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-brand-primary h-1.5 rounded-full"
                          style={{ width: `${c.rate}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-gray-400 font-mono">
                        {c.rate}% Reply
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 border-b border-border-gray">
                    <span
                      className={`px-4 py-1 rounded text-sm font-semibold ${
                        c.status === "Active"
                          ? "bg-[#00C11A]/50 text-[#00B218]"
                          : "bg-[#FF823A]/50 text-[#FF823A]"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right border-b border-border-gray">
                    <Link
                      href={`/campaigns/${c.id}`}
                      className="border border-brand-primary text-brand-primary hover:bg-teal-50 px-3 py-1 rounded text-sm font-semibold transition-colors inline-block"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
