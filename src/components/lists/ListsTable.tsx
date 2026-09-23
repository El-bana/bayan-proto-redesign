"use client";
import { useAppStore } from "@/lib/store";
import {
  Play,
  Filter,
  Search,
  MoreVertical,
  Paperclip,
  Plus,
  Trash2,
  Columns3,
  BriefcaseBusiness,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "./ProgressBar";

export function ListsTable() {
  const { lists } = useAppStore();
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleAll = () => {
    if (selectedIds.size === lists.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(lists.map((l) => l.id)));
  };

  const toggleOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  return (
    <div className="flex-1 p-8 bg-[#F6F8F7] flex flex-col min-h-0">
      <div className="flex items-center gap-3 mb-6">
        <BriefcaseBusiness className="w-8 h-8 text-[#10201C]" />
        <h1 className="text-2xl font-bold text-[#10201C]">Leads List</h1>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative w-[280px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#7C8C87]" />
            <input
              type="text"
              placeholder="Search for lead list...."
              className="w-full pl-9 pr-4 py-2 border border-[#D3DEDB] rounded-lg bg-white text-sm outline-none focus:border-[#0D8C7C] placeholder-[#7C8C87]"
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
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#E20000] rounded-lg hover:bg-[#C90000] transition-colors shadow-sm">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          )}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="py-2 px-4 border border-[#0D8C7C] rounded-lg bg-white text-[#0D8C7C] hover:bg-[#0D8C7C]/5 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0D8C7C] text-white text-sm font-medium rounded-lg shadow-sm hover:bg-[#14B39F] transition-colors">
            <Plus className="w-4 h-4" /> New List
          </button>
        </div>
      </div>
      {/* Tabs */}
      {/* <div className="flex bg-white rounded-lg shadow-sm mb-4 border border-[#D3DEDB] w-fit p-1">
        <button className="px-6 py-2 rounded text-sm font-medium bg-[#0D8C7C] text-white flex items-center gap-2">
          <Send className="w-4 h-4" /> Euro Campaign
        </button>
        <button className="px-6 py-2 rounded text-sm font-medium text-[#10201C] hover:bg-black/5 flex items-center gap-2">
          <Send className="w-4 h-4" /> KSA Campaign
        </button>
        <button className="px-6 py-2 rounded text-sm font-medium text-[#10201C] hover:bg-black/5 flex items-center gap-2">
          <Send className="w-4 h-4" /> USA Campaign
        </button>
      </div> */}
      <div className="bg-[#ECF6F5] border border-[#D3DEDB] rounded-xl flex-1 flex flex-col overflow-hidden">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left">
            <thead className="bg-[#ECF6F5] sticky top-0 z-10 border-b border-[#D3DEDB]">
              <tr>
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.size === lists.length && lists.length > 0
                    }
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-300 accent-blue-600"
                  />
                </th>
                <th className="p-4 font-bold text-[#0E0E0E]">List Name</th>
                <th className="p-4 font-bold text-[#0E0E0E]"># Records</th>
                <th className="p-4 font-bold text-[#0E0E0E]">Used ICP</th>
                <th className="p-4 font-bold text-[#0E0E0E]">Avg. Fit</th>
                <th className="p-4 font-bold text-[#0E0E0E]">Creator</th>
                <th className="p-4 font-bold text-[#0E0E0E]">Health</th>
                <th className="p-4 font-bold text-[#0E0E0E]">Data Age</th>
                <th className="p-4 font-bold text-[#0E0E0E]">Action</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((list) => {
                const isSelected = selectedIds.has(list.id);
                return (
                  <tr
                    key={list.id}
                    className={`border-b border-[#D3DEDB] transition-colors ${isSelected ? "bg-[#0D8C7C]/5" : "hover:bg-black/5"}`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(list.id)}
                        className="w-4 h-4 rounded border-gray-300 accent-blue-600"
                      />
                    </td>
                    <td
                      className="p-4 font-medium text-[#10201C] cursor-pointer hover:underline underline-offset-2"
                      onClick={() => router.push(`/lists/${list.id}`)}
                    >
                      {list.name}
                    </td>
                    <td className="p-4 text-[#10201C] font-medium">
                      {list.leadIds.length}
                    </td>
                    <td className="p-4 text-[#10201C] font-medium">
                      American ICP
                    </td>
                    <td className="p-4 font-bold text-[#0D8C7C]">91%</td>
                    <td className="p-4">
                      <div className="w-8 h-8 rounded-full bg-[#8000FF]/50 flex items-center justify-center text-white font-bold text-xs">
                        HT
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-[#00C11A]/20 text-[#00B218] px-2 py-1 rounded-md text-xs font-medium">
                        Fresh
                      </span>
                    </td>
                    <td className="p-4 text-[#10201C] font-medium">
                      3 Days ago
                    </td>
                    <td className="p-4">
                      <div className="flex gap-4 items-center">
                        <Play className="w-5 h-5 text-[#10201C] cursor-pointer hover:opacity-70" />
                        <MoreVertical className="w-5 h-5 text-[#10201C] cursor-pointer hover:opacity-70" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ProgressBar />
    </div>
  );
}
