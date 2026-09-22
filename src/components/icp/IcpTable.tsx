'use client';
import { useAppStore } from '@/lib/store';
import { Search, Plus, Archive, Filter, Edit, Play } from 'lucide-react';
import { useState } from 'react';
import { IcpCreationModal } from './IcpCreationModal';
import { useRouter } from 'next/navigation';

export function IcpTable() {
  const { icps } = useAppStore();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleRunClick = () => {
    router.push('/lead-locator?run=true');
  };

  const toggleAll = () => {
    if (selectedIds.size === icps.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(icps.map(i => i.id)));
  };

  const toggleOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto w-full flex flex-col gap-6">
      <div className="flex items-center gap-4 text-[#10201C]">
        <h1 className="text-[25px] font-bold">ICP Library</h1>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-[#D3DEDB] rounded-lg px-3 py-2 bg-white w-[242px]">
            <Search className="w-5 h-5 text-[#7C8C87] mr-2" />
            <input 
              type="text" 
              placeholder="Search for lead list...." 
              className="bg-transparent border-none outline-none text-[14px] text-[#10201C] w-full placeholder:text-[#7C8C87]"
            />
          </div>

          {selectedIds.size > 0 && (
            <div className="flex items-center gap-4 bg-white/50 px-4 py-1.5 rounded-lg border border-[#D3DEDB]">
              <span className="text-[14px] font-medium text-[#10201C]">{selectedIds.size} selected</span>
              <button className="flex items-center gap-1.5 text-sm text-[#445751] px-3 py-1.5 rounded-md hover:bg-black/5 transition-colors">
                <Archive className="w-4 h-4" /> Archive
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#0D8C7C] text-[#0D8C7C] rounded-lg text-sm font-medium hover:bg-black/5 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0D8C7C] text-white rounded-lg text-sm font-medium hover:bg-[#14B39F] transition-colors"
          >
            <Plus className="w-4 h-4" /> New ICP
          </button>
        </div>
      </div>

      <div className="bg-[#ECF6F5] border border-[#D3DEDB] rounded-lg overflow-hidden mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#D3DEDB]">
              <th className="py-4 px-6 w-12">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-gray-300 text-[#0D8C7C] focus:ring-[#0D8C7C]"
                  checked={selectedIds.size === icps.length && icps.length > 0}
                  onChange={toggleAll}
                />
              </th>
              <th className="py-4 px-4 text-[16px] font-bold text-[#0E0E0E]">ICP Name</th>
              <th className="py-4 px-4 text-[16px] font-bold text-[#0E0E0E]">Industry</th>
              <th className="py-4 px-4 text-[16px] font-bold text-[#0E0E0E]">Size</th>
              <th className="py-4 px-4 text-[16px] font-bold text-[#0E0E0E]">Region</th>
              <th className="py-4 px-4 text-[16px] font-bold text-[#0E0E0E]">Decision Maker Title</th>
              <th className="py-4 px-6 text-[16px] font-bold text-[#0E0E0E] text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {icps.map((icp, idx) => (
              <tr key={icp.id} className="border-b border-[#D3DEDB] last:border-none hover:bg-black/5 transition-colors group">
                <td className="py-4 px-6">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-gray-300 text-[#0D8C7C] focus:ring-[#0D8C7C]"
                    checked={selectedIds.has(icp.id)}
                    onChange={() => toggleOne(icp.id)}
                  />
                </td>
                <td className="py-4 px-4 text-[16px] font-medium text-[#10201C]">{icp.name}</td>
                <td className="py-4 px-4 text-[16px] font-medium text-[#10201C]">{icp.industry}</td>
                <td className="py-4 px-4 text-[16px] font-medium text-[#10201C]">{icp.size}</td>
                <td className="py-4 px-4 text-[16px] font-medium text-[#10201C]">{icp.region}</td>
                <td className="py-4 px-4">
                  <div className="flex flex-wrap gap-2">
                    {icp.titles.map((title, tIdx) => (
                      <span key={tIdx} className="px-2 py-1 bg-[#6F3FFF]/10 text-[#8000FF] rounded font-mono text-[13px]">
                        {title}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-black/10 rounded-md text-[#445751]">
                      <Archive className="w-5 h-5" />
                    </button>
                    <button className="p-1.5 hover:bg-black/10 rounded-md text-[#445751]">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleRunClick}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D8C7C] text-white rounded shadow-sm hover:bg-[#14B39F] transition-colors font-medium text-sm"
                    >
                      <Play className="w-4 h-4" /> Run
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {icps.length === 0 && (
          <div className="p-8 text-center text-[#7C8C87]">No ICPs found. Create one!</div>
        )}
      </div>

      <IcpCreationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
