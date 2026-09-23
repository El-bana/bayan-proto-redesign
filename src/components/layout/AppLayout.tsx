'use client';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-bg-light font-inter overflow-hidden p-4">
      <div className="flex flex-col w-full h-full bg-bg-light border border-border-gray rounded-lg shadow-sm overflow-hidden">
        <Topbar />
        <div className="flex flex-1 overflow-hidden relative">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-bg-light">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}