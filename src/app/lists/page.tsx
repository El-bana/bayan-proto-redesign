'use client';
import { useAppStore } from '@/lib/store';
import { List as ListIcon, Users } from 'lucide-react';

export default function ListsPage() {
  const lists = useAppStore((state) => state.lists);

  return (
    <div className="p-8 max-w-[1200px] mx-auto w-full flex flex-col gap-6">
      <div className="flex items-center gap-4 text-[#10201C]">
        <h1 className="text-[25px] font-bold">Lists</h1>
      </div>

      {lists.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-[#ECF6F5] border border-[#D3DEDB] rounded-xl p-16 text-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#0D8C7C] to-[#6D5BD0] mb-6" aria-hidden="true" />
          <h2 className="text-xl font-bold text-[#10201C] mb-2">No lists yet</h2>
          <p className="text-sm text-[#7C8C87] max-w-md">
            Search leads in the Lead Locator and save them to a list to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map((list) => (
            <div
              key={list.id}
              className="bg-[#ECF6F5] border border-[#D3DEDB] rounded-xl p-6 flex flex-col gap-4 hover:border-[#0D8C7C]/40 transition-colors"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <ListIcon className="w-5 h-5 text-[#0D8C7C]" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#10201C] mb-1">{list.name}</h2>
                <p className="text-sm text-[#7C8C87] font-mono flex items-center gap-1.5">
                  <Users className="w-4 h-4" aria-hidden="true" />
                  {list.leadIds.length} leads
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}