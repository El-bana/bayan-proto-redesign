'use client';
import { HelpCircle, Bell, Coins, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Topbar() {
  return (
    <header className="h-[78px] bg-bg-light border-b border-border-gray flex items-center justify-between px-6 shrink-0 rounded-tl-lg rounded-tr-lg">
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-brand-primary" aria-hidden="true" />
        <Link href="/" className="text-[25px] font-bold text-brand-primary font-inter tracking-tight">
          Saigent
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 border border-brand-primary rounded-lg px-3 py-2 bg-white/50">
          <Coins className="w-5 h-5 text-text-gray" aria-hidden="true" />
          <span className="text-[13px] font-bold text-text-gray font-mono">200 Credits</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <HelpCircle className="w-6 h-6 text-[#900C89] opacity-70" aria-hidden="true" />
            <span className="text-[13px] font-bold text-text-gray font-mono">Help</span>
          </button>
          
          <button className="relative hover:opacity-80 transition-opacity" aria-label="Notifications">
            <Bell className="w-6 h-6 text-text-gray" aria-hidden="true" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#E20000] rounded-full border border-white" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Account menu"
            className="w-10 h-10 rounded-full bg-gradient-to-b from-[#0D8C7C] to-[#6D5BD0] p-[2px] ml-2 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className="block w-full h-full rounded-full bg-white overflow-hidden">
              <Image
                src="https://i.pravatar.cc/150?img=47"
                alt="User avatar"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}