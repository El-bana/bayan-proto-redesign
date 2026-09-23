"use client";
import { useAppStore } from "@/lib/store";
import {
  Archive,
  Filter,
  MoreVertical,
  Play,
  Search,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
        <Users className="w-8 h-8 text-[#10201C]" />
        <h1 className="text-2xl font-bold text-[#10201C]">Leads List</h1>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for lead list...."
            className="w-full pl-10 pr-4 py-2 border border-[#D3DEDB] rounded-lg bg-white outline-none focus:border-[#0D8C7C]"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#10201C] font-medium mr-2">
            {selectedIds.size} selected
          </span>
          <button className="flex items-center gap-2 px-4 py-2 text-[#E20000] bg-white border border-[#D3DEDB] rounded-lg shadow-sm hover:bg-gray-50">
            <Archive className="w-4 h-4" /> Delete
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-[#445751] bg-white border border-[#D3DEDB] rounded-lg shadow-sm hover:bg-gray-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0D8C7C] text-white rounded-lg shadow-sm hover:bg-[#14B39F]">
            <span className="text-lg leading-none mb-0.5">+</span> New List
          </button>
        </div>
      </div>

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
                    className="w-4 h-4 rounded border-gray-300 accent-[#0D8C7C]"
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
                        className="w-4 h-4 rounded border-gray-300 accent-[#0D8C7C]"
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
    </div>
  );
}
