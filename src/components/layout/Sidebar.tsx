'use client';
import { LayoutDashboard, Users, BookOpen, Briefcase, Send, Mail, Settings, PieChart, ChevronsRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutDashboard, href: '/dashboard' },
    { icon: Users, href: '/lead-locator' }, // Actually people search in figma
    { icon: BookOpen, href: '/courses' },
    { icon: Briefcase, href: '/icp-library' },
    { icon: Send, href: '/campaigns' },
    { icon: Mail, href: '/inbox' },
    { icon: PieChart, href: '/analytics' },
  ];

  return (
    <div className="w-[88px] h-full flex flex-col items-center py-4 bg-[#ECF6F5] border-r border-[#D3DEDB] shrink-0 rounded-bl-lg rounded-br-none md:rounded-br-lg z-10 relative">
      <button className="w-8 h-8 flex items-center justify-center bg-[#0D8C7C] text-white rounded-lg mb-8 hover:bg-[#14B39F] transition-colors absolute -right-4 top-4 border border-[#D3DEDB]">
        <ChevronsRight className="w-5 h-5" />
      </button>

      <div className="flex flex-col gap-6 mt-8 w-full items-center flex-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "p-2 rounded-lg transition-colors duration-200",
                isActive ? "bg-[#0D8C7C]/10 text-[#0D8C7C]" : "text-[#445751] hover:bg-black/5"
              )}
            >
              <item.icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pb-4">
        <Link href="/settings" className="p-2 rounded-lg text-[#445751] hover:bg-black/5 block">
          <Settings className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
