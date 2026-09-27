"use client";
import { useAppStore } from "@/lib/store";
import {
  Archive,
  ArchiveRestore,
  Columns3,
  Edit,
  Filter,
  GraduationCap,
  Play,
  Plus,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IcpCreationModal } from "./IcpCreationModal";
import ProgressBar from "../lists/ProgressBar";

export function IcpTable() {
  const { icps, archiveIcp } = useAppStore();
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const trimmedQuery = query.trim().toLowerCase();
  const filteredIcps = trimmedQuery
    ? icps.filter((i) =>
        [i.name, i.industry, i.size, i.region].some((field) =>
          field.toLowerCase().includes(trimmedQuery),
        ),
      )
    : icps;

  const handleRunClick = () => {
    router.push("/lead-locator?run=true");
  };

  const handleBulkArchive = () => {
    selectedIds.forEach((id) => archiveIcp(id));
    setSelectedIds(new Set());
  };

  const handleArchiveOne = (id: string) => {
    archiveIcp(id);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredIcps.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredIcps.map((i) => i.id)));
  };

  const toggleOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  return (
    <div className="min-h-screen relative bg-[#F6F8F7] p-8 flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="w-8 h-8 text-[#0D8C7C]" />
        <h1 className="text-[25px] font-bold">ICP Library</h1>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-[#D3DEDB] rounded-lg px-3 py-2 bg-white w-[242px]">
            <Search
              className="w-5 h-5 text-[#7C8C87] mr-2"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for lead list...."
              className="bg-transparent border-none outline-none text-[14px] text-[#10201C] w-full placeholder:text-[#7C8C87]"
            />
          </div>

          {/* Columns Toggle Button */}
          <button className="py-2 px-4 border border-[#0D8C7C] rounded-lg bg-white text-[#0D8C7C] hover:bg-[#0D8C7C]/5 transition-colors">
            <Columns3 className="w-5 h-5" />
          </button>

          {/* Selected State & Delete Action */}
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-3 ml-1">
              <span className="text-[#10201C] text-sm font-medium">
                {selectedIds.size} selected
              </span>
              <button
                onClick={handleBulkArchive}
                className="flex items-center gap-1.5 text-sm bg-black/20 text-black/80 font-semibold px-3 py-1.5 rounded-md hover:bg-black/5 transition-colors"
              >
                <Archive className="w-4 h-4" aria-hidden="true" /> Archive
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button className="py-2 px-4 border border-[#0D8C7C] rounded-lg bg-white text-[#0D8C7C] hover:bg-[#0D8C7C]/5 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0D8C7C] text-white rounded-lg text-sm font-medium hover:bg-[#14B39F] transition-colors"
          >
            <Plus className="w-4 h-4" /> New ICP
          </button>
        </div>
      </div>
      <div className="bg-[#ECF6F5] border border-[#D3DEDB] rounded-lg overflow-hidden mt-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#D3DEDB]">
              <th className="py-4 px-6 w-12">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                  aria-label="Select all ICPs"
                  checked={
                    selectedIds.size === filteredIcps.length &&
                    filteredIcps.length > 0
                  }
                  onChange={toggleAll}
                />
              </th>
              <th className="py-4 px-4 text-[16px] font-bold text-[#0E0E0E]">
                ICP Name
              </th>
              <th className="py-4 px-4 text-[16px] font-bold text-[#0E0E0E]">
                Industry
              </th>
              <th className="py-4 px-4 text-[16px] font-bold text-[#0E0E0E]">
                Size
              </th>
              <th className="py-4 px-4 text-[16px] font-bold text-[#0E0E0E]">
                Region
              </th>
              <th className="py-4 px-4 text-[16px] font-bold text-[#0E0E0E]">
                Decision Maker Title
              </th>
              <th className="py-4 px-6 text-[16px] font-bold text-[#0E0E0E]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {[...filteredIcps]
              .sort((a, b) => {
                if (a.isArchived === b.isArchived) return 0;
                return a.isArchived ? 1 : -1;
              })
              .map((icp) => (
                <tr
                  key={icp.id}
                  className={`border-b border-[#D3DEDB] last:border-none hover:bg-black/5 transition-colors group ${icp.isArchived ? "opacity-50 grayscale bg-gray-50/50" : ""}`}
                >
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                      aria-label={`Select ${icp.name}`}
                      checked={selectedIds.has(icp.id)}
                      onChange={() => toggleOne(icp.id)}
                    />
                  </td>
                  <td className="py-4 px-4 text-[16px] font-medium text-[#10201C]">
                    {icp.name}
                  </td>
                  <td className="py-4 px-4 text-[16px] font-medium text-[#10201C]">
                    {icp.industry}
                  </td>
                  <td className="py-4 px-4 text-[16px] font-medium text-[#10201C]">
                    {icp.size}
                  </td>
                  <td className="py-4 px-4 text-[16px] font-medium text-[#10201C]">
                    {icp.region}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-2">
                      {icp.titles.map((title, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-4 py-1 bg-[#6F3FFF]/50 text-[#8000FF] rounded font-mono font-semibold text-[13px]"
                        >
                          {title}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleRunClick}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D8C7C] text-white rounded shadow-sm hover:bg-[#14B39F] transition-colors font-medium text-sm"
                      >
                        <Play className="w-4 h-4" aria-hidden="true" /> Run
                      </button>
                      <button
                        onClick={() => handleArchiveOne(icp.id)}
                        aria-label={`Archive ${icp.name}`}
                        className="p-1.5 hover:bg-black/10 rounded-md text-[#445751]"
                      >
                        {icp.isArchived ? (
                          <ArchiveRestore
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <Archive className="w-5 h-5" aria-hidden="true" />
                        )}
                      </button>
                      <button
                        aria-label={`Edit ${icp.name}`}
                        className="p-1.5 hover:bg-black/10 rounded-md text-[#445751]"
                      >
                        <Edit className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {filteredIcps.length === 0 && (
          <div className="p-8 text-center text-[#7C8C87]">
            No ICPs found. Create one!
          </div>
        )}
      </div>
      <IcpCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="sticky bottom-0 z-20 w-full">
        <ProgressBar />
      </div>
    </div>
  );
}
