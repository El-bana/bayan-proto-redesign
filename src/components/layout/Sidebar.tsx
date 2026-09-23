'use client';
import { useState } from 'react';
import { LayoutDashboard, Briefcase, Send, Mail, Settings, PieChart, ChevronsRight, UserSearch, GraduationCap, Book, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: LucideIcon;
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, href: '/dashboard', label: 'Dashboard' },
  { icon: GraduationCap, href: '/icp-library', label: 'ICP Library' },
  { icon: UserSearch, href: '/lead-locator', label: 'Lead Locator' },
  { icon: Briefcase, href: '/lists', label: 'Leads List' },
  { icon: Send, href: '/campaigns', label: 'Campaigns' },
  { icon: Mail, href: '/mail', label: 'Mail' },
  { icon: Book, href: '/book', label: 'Book' },
  { icon: PieChart, href: '/analytics', label: 'Analytics' },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ItemLink({ item, pathname, collapsed }: { item: NavItem; pathname: string; collapsed: boolean }) {
  const active = isActivePath(pathname, item.href);
  return (
    <Link
      key={item.href}
      href={item.href}
      title={collapsed ? item.label : undefined}
      aria-label={item.label}
      aria-current={active ? 'page' : undefined}
      className={cn(
        "p-2 rounded-lg transition-colors duration-200",
        active ? "bg-brand-primary/10 text-brand-primary" : "text-text-gray hover:bg-black/5"
      )}
    >
      <item.icon className="w-6 h-6" strokeWidth={active ? 2.5 : 2} aria-hidden="true" />
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-full shrink-0 relative z-10">
      <nav
        aria-label="Main navigation"
        className={cn(
          "h-full flex flex-col items-center bg-bg-mint border-r border-border-gray rounded-bl-lg rounded-br-lg md:rounded-br-lg overflow-hidden transition-[width] duration-300 ease-in-out",
          collapsed ? "w-0 border-r-0 invisible" : "w-[72px]"
        )}
      >
        <div className="flex flex-col gap-2 mt-6 w-full items-center flex-1">
          {navItems.map((item) => (
            <ItemLink key={item.href} item={item} pathname={pathname} collapsed={collapsed} />
          ))}
        </div>

        <div className="mt-auto pb-[53px]">
          <ItemLink item={{ icon: Settings, href: '/settings', label: 'Settings' }} pathname={pathname} collapsed={collapsed} />
        </div>
      </nav>

      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
        aria-controls="main-navigation"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={cn(
          "absolute top-4 w-8 h-8 flex items-center justify-center bg-white text-brand-primary rounded-[9px] hover:bg-bg-mint transition-colors border border-brand-primary z-20",
          collapsed ? "left-0" : "left-[56px]"
        )}
      >
        <ChevronsRight className={cn("w-5 h-5 transition-transform duration-300", !collapsed && "rotate-180")} aria-hidden="true" />
      </button>
    </div>
  );
}