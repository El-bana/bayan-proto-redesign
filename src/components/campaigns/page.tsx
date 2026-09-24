"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import ProgressBar from "../lists/ProgressBar";

type Status = "Done" | "Paused" | "Active" | "Draft";

type Campaign = {
  id: number;
  name: string;
  totalLeads: number | null;
  sent: number | null;
  openRate: number | null;
  replyRate: number | null;
  deliveryRate: number | null;
  status: Status;
};

const initialCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Euro campaign",
    totalLeads: 300,
    sent: 241,
    openRate: 31,
    replyRate: 14,
    deliveryRate: 2.1,
    status: "Done",
  },
  {
    id: 2,
    name: "KSA Campaign",
    totalLeads: 150,
    sent: 98,
    openRate: 27,
    replyRate: 9,
    deliveryRate: 1.0,
    status: "Paused",
  },
  {
    id: 3,
    name: "UK Campaign",
    totalLeads: 80,
    sent: 45,
    openRate: 22,
    replyRate: 6,
    deliveryRate: 3.5,
    status: "Active",
  },
  {
    id: 4,
    name: "UK Campaign",
    totalLeads: null,
    sent: null,
    openRate: null,
    replyRate: null,
    deliveryRate: null,
    status: "Draft",
  },
  {
    id: 5,
    name: "Euro campaign",
    totalLeads: 300,
    sent: 241,
    openRate: 31,
    replyRate: 14,
    deliveryRate: 2.1,
    status: "Done",
  },
  {
    id: 6,
    name: "KSA Campaign",
    totalLeads: 150,
    sent: 98,
    openRate: 27,
    replyRate: 9,
    deliveryRate: 1.0,
    status: "Paused",
  },
  {
    id: 7,
    name: "UK Campaign",
    totalLeads: 80,
    sent: 45,
    openRate: 22,
    replyRate: 6,
    deliveryRate: 3.5,
    status: "Active",
  },
  {
    id: 8,
    name: "UK Campaign",
    totalLeads: null,
    sent: null,
    openRate: null,
    replyRate: null,
    deliveryRate: null,
    status: "Draft",
  },
];

const statusStyles: Record<Status, string> = {
  Done: "bg-[#79D488] text-white",
  Paused: "bg-[#FFC099] text-white",
  Active: "bg-[#8B88FF] text-white",
  Draft: "bg-[#C4C4C4] text-white",
};

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex h-4 w-4 items-center justify-center rounded border ${
        checked ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white"
      }`}
    >
      {checked && (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </span>
  );
}

export default function CampaignsPage() {
  const router = useRouter();
  const [rows, setRows] = useState<Campaign[]>(initialCampaigns);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");

  const trimmedQuery = search.trim().toLowerCase();
  const visible = trimmedQuery
    ? rows.filter((c) => c.name.toLowerCase().includes(trimmedQuery))
    : rows;

  const toggleRow = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allChecked = visible.length > 0 && selected.size === visible.length;
  const toggleAll = () => {
    setSelected(allChecked ? new Set() : new Set(visible.map((c) => c.id)));
  };

  const selectedCount = selected.size;

  const applyStatus = (status: Status) => {
    setRows((prev) =>
      prev.map((c) => (selected.has(c.id) ? { ...c, status } : c)),
    );
    setSelected(new Set());
  };

  const removeSelected = () => {
    setRows((prev) => prev.filter((c) => !selected.has(c.id)));
    setSelected(new Set());
  };

  return (
    <main className="min-h-screen relative bg-[#F6F8F7] p-8 flex flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-[#0D8C7C]">
          <SendHorizontal className="w-8 h-8" />
        </span>
        <h1 className="text-[28px] font-bold text-[#10201C]">Campaigns</h1>
      </div>
      <div className="flex-1 w-full rounded-xl bg-white p-6 border border-[#D3DEDB] shadow-sm">
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-[#D3DEDB] px-3 py-2 text-sm text-[#7C8C87] bg-white h-[42px]">
            <SearchIcon />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for campaign...."
              className="w-48 bg-transparent text-[#10201C] placeholder:text-[#7C8C87] focus:outline-none"
            />
          </div>

          <button className="flex items-center justify-center rounded-lg border border-[#0D8C7C] w-[42px] h-[42px] text-[#0D8C7C] hover:bg-teal-50 shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>

          {selectedCount > 0 && (
            <div className="flex items-center gap-3 ml-2">
              <span className="text-base font-medium text-[#10201C] mr-2">
                {selectedCount} selected
              </span>

              <button
                onClick={() => applyStatus("Paused")}
                className="flex items-center gap-2 rounded-lg bg-[#FF9559] px-4 py-2 text-sm font-medium text-white hover:bg-orange-500 h-[42px]"
              >
                <Image
                  src="/pause-icon.png"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />{" "}
                Pause
              </button>
              <button
                onClick={() => applyStatus("Active")}
                className="flex items-center gap-2 rounded-lg bg-[#00C11A] px-4 py-2 text-sm font-medium text-white hover:bg-green-600 h-[42px]"
              >
                <Image
                  src="/resume-icon.png"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />{" "}
                Resume
              </button>
              <button
                onClick={removeSelected}
                className="flex items-center gap-2 rounded-lg bg-[#2D2D2D] px-4 py-2 text-sm font-medium text-white hover:bg-black h-[42px]"
              >
                <Image
                  src="/archive-icon.png"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />{" "}
                Archive
              </button>
              <button
                onClick={removeSelected}
                className="flex items-center gap-2 rounded-lg bg-[#E20000] px-4 py-2 text-sm font-medium text-white hover:bg-red-700 h-[42px]"
              >
                <Image
                  src="/delete-icon.png"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />{" "}
                Delete
              </button>
            </div>
          )}

          <div className="ml-auto flex items-center gap-3">
            <button className="flex items-center justify-center rounded-lg border border-[#0D8C7C] w-[42px] h-[42px] text-[#0D8C7C] hover:bg-teal-50">
              <FilterIcon />
            </button>
            <button
              onClick={() => router.push("/campaigns/new")}
              className="flex items-center gap-2 rounded-lg bg-[#0D8C7C] px-5 py-2 text-sm font-medium text-white hover:bg-[#14B39F] h-[42px]"
            >
              <PlusIcon />
              New Campaign
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-[#D3DEDB] overflow-hidden bg-[#F6F8F7]">
          <table className="w-full text-sm text-left">
            <thead className="border-b border-[#D3DEDB] text-[#10201C] font-bold">
              <tr>
                <th className="w-12 px-6 py-4">
                  <button onClick={toggleAll} aria-label="Select all campaigns">
                    <Checkbox checked={allChecked} />
                  </button>
                </th>
                <th className="px-4 py-4">Campaign Name</th>
                <th className="px-4 py-4">Total Leads</th>
                <th className="px-4 py-4">Sent</th>
                <th className="px-4 py-4">Open Rate</th>
                <th className="px-4 py-4">Reply Rate</th>
                <th className="px-4 py-4">Delivery Rate</th>
                <th className="px-4 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {visible.map((c) => {
                const isChecked = selected.has(c.id);
                return (
                  <tr
                    key={c.id}
                    className={`border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors`}
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleRow(c.id)}
                        aria-label={`Select ${c.name}`}
                        className="flex"
                      >
                        <Checkbox checked={isChecked} />
                      </button>
                    </td>
                    <td
                      className="px-4 py-4 font-medium text-slate-700 hover:text-[#0D8C7C] cursor-pointer"
                      onClick={() => router.push(`/campaigns/${c.id}`)}
                    >
                      {c.name}
                    </td>
                    <td className="px-4 py-4 text-[#10201C]">
                      {c.totalLeads ?? ""}
                    </td>
                    <td className="px-4 py-4 text-[#10201C]">{c.sent ?? ""}</td>
                    <td className="px-4 py-4 font-medium text-[#1814F3]">
                      {c.openRate !== null ? `${c.openRate}%` : ""}
                    </td>
                    <td className="px-4 py-4 font-medium text-[#00B218]">
                      {c.replyRate !== null ? `${c.replyRate}%` : ""}
                    </td>
                    <td className="px-4 py-4 font-medium text-[#E20000]">
                      {c.deliveryRate !== null ? `${c.deliveryRate}%` : ""}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex min-w-[76px] items-center justify-center rounded px-3 py-1 text-xs font-medium ${statusStyles[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {visible.length === 0 && (
            <div className="p-6 text-center text-sm text-gray-400">
              No campaigns match your search.
            </div>
          )}
        </div>

        {/* Legend */}
        {/* <div className="mt-5 flex flex-wrap items-center gap-6 border-t border-gray-100 pt-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Send className="w-3 h-3 text-blue-500" />
            <span>Euro Campaign</span>
            <span className="h-px w-8 bg-blue-400" />
          </div>
          <div className="flex items-center gap-2">
            <Send className="w-3 h-3 text-orange-500" />
            <span>KSA Campaign</span>
            <span className="h-px w-8 bg-orange-400" />
          </div>
          <div className="flex items-center gap-2">
            <Send className="w-3 h-3 text-emerald-500" />
            <span>USA Campaign</span>
            <span className="h-px w-8 bg-emerald-500" />
          </div>
        </div> */}
      </div>
      <div className="w-full mt-auto">
        <ProgressBar />
      </div>
    </main>
  );
}
