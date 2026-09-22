'use client';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[#F6F8F7] font-inter overflow-hidden p-4">
      <div className="flex flex-col w-full h-full bg-[#F6F8F7] border border-[#D3DEDB] rounded-lg shadow-sm overflow-hidden">
        <Topbar />
        <div className="flex flex-1 overflow-hidden relative">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-[#F6F8F7]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
