"use client";

import { useState } from "react";
import { Columns3, SendHorizontal } from "lucide-react";
import Image from "next/image";
import ProgressBar from "../lists/ProgressBar";
import { useColumnVisibility } from "@/lib/useColumnVisibility";
import ColumnVisibilityModal from "../layout/ColumnVisibilityModal";

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

  const columnManager = useColumnVisibility([
    { key: "name", label: "Campaign Name", isVisible: true },
    { key: "totalLeads", label: "Total Leads", isVisible: true },
    { key: "sent", label: "Sent", isVisible: true },
    { key: "openRate", label: "Open Rate", isVisible: true },
    { key: "replyRate", label: "Reply Rate", isVisible: true },
    { key: "deliveryRate", label: "Delivery Rate", isVisible: true },
    { key: "status", label: "Status", isVisible: true },
  ]);

  return (
    <main className="min-h-screen relative bg-[#F6F8F7] p-8 flex flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-[#0D8C7C]">
          <SendHorizontal className="w-8 h-8" />
        </span>
        <h1 className="text-[28px] font-bold text-[#10201C]">Campaigns</h1>
      </div>
      <div className="flex-1 w-full rounded-xl">
        {/* Toolbar */}
        <div className="mb-2 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-border-gray px-4 h-9 text-sm text-[#7C8C87] bg-white">
            <SearchIcon />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for campaign...."
              className="w-48 bg-transparent text-[#10201C] placeholder:text-[#7C8C87] focus:outline-none"
            />
          </div>

          <button
            onClick={columnManager.openModal}
            className="flex items-center justify-center rounded-lg border border-[#0D8C7C] px-4 h-9 text-[#0D8C7C] hover:bg-teal-50 shrink-0"
          >
            <Columns3 />
          </button>

          {selectedCount > 0 && (
            <div className="flex items-center gap-3 ml-2">
              <span className="text-base font-medium text-[#10201C] mr-2">
                {selectedCount} selected
              </span>

              <button
                onClick={() => applyStatus("Paused")}
                className="flex items-center gap-2 rounded-lg bg-[#FF9559] text-sm font-medium text-white hover:bg-orange-500 px-4 h-9"
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
                className="flex items-center gap-2 rounded-lg bg-[#00C11A] text-sm font-medium text-white hover:bg-green-600 px-4 h-9"
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
                className="flex items-center gap-2 rounded-lg bg-[#2D2D2D] text-sm font-medium text-white hover:bg-black px-4 h-9"
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
                className="flex items-center gap-2 rounded-lg bg-[#E20000] text-sm font-medium text-white hover:bg-red-700 px-4 h-9"
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
            <button className="flex items-center justify-center rounded-lg border border-[#0D8C7C] px-4 h-9 text-[#0D8C7C] hover:bg-teal-50">
              <FilterIcon />
            </button>
            <button
              onClick={() => (window.location.href = "/campaigns/new")}
              className="flex items-center gap-2 rounded-lg bg-[#0D8C7C] text-sm font-medium text-white hover:bg-[#14B39F] px-4 h-9"
            >
              <PlusIcon />
              New Campaign
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="sticky top-0 bg-[#ECF6F5] z-10">
              <tr className="bg-[#ECF6F5] text-sm font-semibold text-[#10201C]">
                <th className="py-2 px-4 rounded-l-lg border-y border-l border-[#D3DEDB] w-12">
                  <div className="flex items-center">
                    <button
                      onClick={toggleAll}
                      aria-label="Select all campaigns"
                    >
                      <Checkbox checked={allChecked} />
                    </button>
                  </div>
                </th>
                {columnManager.isVisible("name") && (
                  <th className="py-2 px-4 border-y border-border-gray">
                    Campaign Name
                  </th>
                )}
                {columnManager.isVisible("totalLeads") && (
                  <th className="py-2 px-4 border-y border-border-gray">
                    Total Leads
                  </th>
                )}
                {columnManager.isVisible("sent") && (
                  <th className="py-2 px-4 border-y border-border-gray">
                    Sent
                  </th>
                )}
                {columnManager.isVisible("openRate") && (
                  <th className="py-2 px-4 border-y border-border-gray">
                    Open Rate
                  </th>
                )}
                {columnManager.isVisible("replyRate") && (
                  <th className="py-2 px-4 border-y border-border-gray">
                    Reply Rate
                  </th>
                )}
                {columnManager.isVisible("deliveryRate") && (
                  <th className="py-2 px-4 border-y border-border-gray">
                    Delivery Rate
                  </th>
                )}
                {columnManager.isVisible("status") && (
                  <th className="py-2 px-4 rounded-r-lg border-y border-r border-[#D3DEDB]">
                    Status
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {visible.map((c, idx) => {
                const isChecked = selected.has(c.id);
                return (
                  <tr
                    key={c.id}
                    className="border-b border-[#D3DEDB] hover:bg-black/5 transition-colors"
                  >
                    <td className="py-3 px-4 border-b border-[#D3DEDB]">
                      <button
                        onClick={() => toggleRow(c.id)}
                        aria-label={`Select ${c.name}`}
                        className="flex"
                      >
                        <Checkbox checked={isChecked} />
                      </button>
                    </td>
                    {columnManager.isVisible("name") && (
                      <td
                        className="py-3 px-4 font-semibold border-b border-[#D3DEDB] text-slate-700 hover:text-[#0D8C7C] cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/campaigns/${c.id}`)
                        }
                      >
                        {c.name}
                      </td>
                    )}
                    {columnManager.isVisible("totalLeads") && (
                      <td className="py-3 px-4 border-b border-border-gray text-[#10201C]">
                        {c.totalLeads ?? ""}
                      </td>
                    )}
                    {columnManager.isVisible("sent") && (
                      <td className="py-3 px-4 border-b border-border-gray text-[#10201C]">
                        {c.sent ?? ""}
                      </td>
                    )}
                    {columnManager.isVisible("openRate") && (
                      <td className="py-3 px-4 border-b border-border-gray font-medium text-[#1814F3]">
                        {c.openRate !== null ? `${c.openRate}%` : ""}
                      </td>
                    )}
                    {columnManager.isVisible("replyRate") && (
                      <td className="py-3 px-4 border-b border-border-gray font-medium text-[#00B218]">
                        {c.replyRate !== null ? `${c.replyRate}%` : ""}
                      </td>
                    )}
                    {columnManager.isVisible("deliveryRate") && (
                      <td className="py-3 px-4 border-b border-border-gray font-medium text-[#E20000]">
                        {c.deliveryRate !== null ? `${c.deliveryRate}%` : ""}
                      </td>
                    )}
                    {columnManager.isVisible("status") && (
                      <td className="py-3 px-4 border-b border-border-gray">
                        <span
                          className={`inline-flex min-w-[76px] items-center justify-center rounded px-3 py-1 text-xs font-medium ${statusStyles[c.status]}`}
                        >
                          {c.status}
                        </span>
                      </td>
                    )}
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
      <div className="sticky bottom-0 z-20 w-full">
        <ProgressBar />
      </div>
      <ColumnVisibilityModal
        isOpen={columnManager.isOpen}
        onClose={columnManager.closeModal}
        columns={columnManager.columns}
        onToggleColumn={columnManager.toggleColumn}
        onShowAll={columnManager.showAll}
        onHideAll={columnManager.hideAll}
      />
    </main>
  );
}
