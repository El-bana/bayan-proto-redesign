"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import Image from "next/image";

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
  { id: 1, name: "Euro campaign", totalLeads: 300, sent: 241, openRate: 31, replyRate: 14, deliveryRate: 2.1, status: "Done" },
  { id: 2, name: "KSA Campaign", totalLeads: 150, sent: 98, openRate: 27, replyRate: 9, deliveryRate: 1.0, status: "Paused" },
  { id: 3, name: "UK Campaign", totalLeads: 80, sent: 45, openRate: 22, replyRate: 6, deliveryRate: 3.5, status: "Active" },
  { id: 4, name: "UK Campaign", totalLeads: null, sent: null, openRate: null, replyRate: null, deliveryRate: null, status: "Draft" },
  { id: 5, name: "Euro campaign", totalLeads: 300, sent: 241, openRate: 31, replyRate: 14, deliveryRate: 2.1, status: "Done" },
  { id: 6, name: "KSA Campaign", totalLeads: 150, sent: 98, openRate: 27, replyRate: 9, deliveryRate: 1.0, status: "Paused" },
  { id: 7, name: "UK Campaign", totalLeads: 80, sent: 45, openRate: 22, replyRate: 6, deliveryRate: 3.5, status: "Active" },
  { id: 8, name: "UK Campaign", totalLeads: null, sent: null, openRate: null, replyRate: null, deliveryRate: null, status: "Draft" },
];

const statusStyles: Record<Status, string> = {
  Done: "bg-emerald-100 text-emerald-600",
  Paused: "bg-orange-100 text-orange-500",
  Active: "bg-indigo-100 text-indigo-500",
  Draft: "bg-gray-100 text-gray-400",
};

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </span>
  );
}

export default function CampaignsPage() {
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
    setRows((prev) => prev.map((c) => (selected.has(c.id) ? { ...c, status } : c)));
    setSelected(new Set());
  };

  const removeSelected = () => {
    setRows((prev) => prev.filter((c) => !selected.has(c.id)));
    setSelected(new Set());
  };

  return (
    <main className="min-h-screen bg-[#f6f7f9] p-6">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <span className="text-teal-600">
            <Send className="w-7 h-7" />
          </span>
          <h1 className="text-[25px] font-bold text-slate-800">Campaigns</h1>
        </div>

        {/* Toolbar */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-400">
            <SearchIcon />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for campaign..."
              className="w-40 bg-transparent text-gray-600 placeholder:text-gray-400 focus:outline-none sm:w-56"
            />
          </div>

          {selectedCount > 0 && (
            <>
              <span className="flex items-center gap-1.5 text-sm text-gray-400">
                <Image src="/Icon Left.png" alt="" width={20} height={20} className="w-5 h-5" />
                {selectedCount} selected
              </span>

              <button onClick={() => applyStatus("Paused")} className="flex items-center gap-1.5 rounded-full bg-orange-400 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-orange-500">
                <Image src="/pause-icon.png" alt="" width={14} height={14} className="w-3.5 h-3.5" /> Pause
              </button>
              <button onClick={() => applyStatus("Active")} className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-emerald-600">
                <Image src="/resume-icon.png" alt="" width={14} height={14} className="w-3.5 h-3.5" /> Resume
              </button>
              <button onClick={removeSelected} className="flex items-center gap-1.5 rounded-full bg-slate-700 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-slate-800">
                <Image src="/archive-icon.png" alt="" width={14} height={14} className="w-3.5 h-3.5" /> Archive
              </button>
              <button onClick={removeSelected} className="flex items-center gap-1.5 rounded-full bg-red-500 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-red-600">
                <Image src="/delete-icon.png" alt="" width={14} height={14} className="w-3.5 h-3.5" /> Delete
              </button>
            </>
          )}

          <div className="ml-auto flex items-center gap-3">
            <button className="flex items-center justify-center rounded-lg border border-[#0D8C7C] p-2 text-[#0D8C7C] hover:bg-[#0D8C7C]/5">
              <FilterIcon />
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800">
              <PlusIcon />
              New Campaign
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="max-h-[500px] overflow-x-auto overflow-y-auto rounded-xl border border-gray-100">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="sticky top-0 z-10 border-b border-gray-100 bg-white text-left text-xs font-medium text-gray-400">
                <th className="w-10 px-4 py-3">
                  <button onClick={toggleAll} aria-label="Select all campaigns">
                    <Checkbox checked={allChecked} />
                  </button>
                </th>
                <th className="px-3 py-3 font-medium text-slate-500">Campaign Name</th>
                <th className="px-3 py-3 font-medium text-slate-500">Total Leads</th>
                <th className="px-3 py-3 font-medium text-slate-500">Sent</th>
                <th className="px-3 py-3 font-medium text-slate-500">Open Rate</th>
                <th className="px-3 py-3 font-medium text-slate-500">Reply Rate</th>
                <th className="px-3 py-3 font-medium text-slate-500">Delivery Rate</th>
                <th className="px-3 py-3 font-medium text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((c) => {
                const isChecked = selected.has(c.id);
                return (
                  <tr
                    key={c.id}
                    className={`${
                      c.id !== visible[visible.length - 1].id ? "border-b border-gray-50" : ""
                    } hover:bg-gray-50/60`}
                  >
                    <td className="px-4 py-3.5">
                      <button onClick={() => toggleRow(c.id)} aria-label={`Select ${c.name}`} className="flex">
                        <Checkbox checked={isChecked} />
                      </button>
                    </td>
                    <td className="px-3 py-3.5 font-medium text-slate-700">{c.name}</td>
                    <td className="px-3 py-3.5 text-slate-600">{c.totalLeads ?? ""}</td>
                    <td className="px-3 py-3.5 text-slate-600">{c.sent ?? ""}</td>
                    <td className="px-3 py-3.5 font-medium text-blue-500">
                      {c.openRate !== null ? `${c.openRate}%` : ""}
                    </td>
                    <td className="px-3 py-3.5 font-medium text-emerald-500">
                      {c.replyRate !== null ? `${c.replyRate}%` : ""}
                    </td>
                    <td className="px-3 py-3.5 font-medium text-red-400">
                      {c.deliveryRate !== null ? `${c.deliveryRate}%` : ""}
                    </td>
                    <td className="px-3 py-3.5">
                      <span
                        className={`inline-flex min-w-[76px] items-center justify-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[c.status]}`}
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
            <div className="p-6 text-center text-sm text-gray-400">No campaigns match your search.</div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap items-center gap-6 border-t border-gray-100 pt-4 text-xs text-slate-500">
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
        </div>
      </div>
    </main>
  );
}