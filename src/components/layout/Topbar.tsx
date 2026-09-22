'use client';
import { HelpCircle, Bell, Coins, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function Topbar() {
  return (
    <header className="h-[78px] bg-[#F6F8F7] border-b border-[#D3DEDB] flex items-center justify-between px-6 shrink-0 rounded-tr-lg">
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-[#0D8C7C]" />
        <Link href="/" className="text-[25px] font-bold text-[#0D8C7C] font-inter tracking-tight">
          Saigent
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 border border-[#0D8C7C] rounded-lg px-3 py-2 bg-white/50">
          <Coins className="w-5 h-5 text-[#445751]" />
          <span className="text-[13px] font-bold text-[#445751] font-mono">200 Credits</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <HelpCircle className="w-6 h-6 text-[#900C89] opacity-70" />
            <span className="text-[13px] font-bold text-[#445751] font-mono">Help</span>
          </button>
          
          <button className="relative hover:opacity-80 transition-opacity">
            <Bell className="w-6 h-6 text-[#445751]" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#E20000] rounded-full border border-white" />
          </button>

          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#0D8C7C] to-[#6D5BD0] p-[2px] ml-2 cursor-pointer hover:opacity-90 transition-opacity">
            <div className="w-full h-full rounded-full bg-white overflow-hidden">
              <img src="https://i.pravatar.cc/150?img=47" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
