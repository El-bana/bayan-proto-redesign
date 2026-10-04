"use client";

import { useState, useRef, useEffect } from "react";
import { HelpCircle, Bell, Coins, Sparkles, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NotificationItem {
  id: string;
  title: string;
  subtitle?: string;
  response?: string;
  time: string;
  actionType: "proceed" | "view";
}

interface NotificationGroup {
  timeframe: string;
  items: NotificationItem[];
}

const initialNotifications: NotificationGroup[] = [
  {
    timeframe: "1 Hour Ago",
    items: [
      {
        id: "1",
        title: "Hagertorky@gmail.com",
        subtitle: "Client Responded",
        response: "Elevate Your Global Communication Strategy",
        time: "3:40 PM",
        actionType: "proceed",
      },
      {
        id: "2",
        title: "Hagertorky@gmail.com",
        subtitle: "Follow Up Cancelled (settings changes)",
        time: "3:40 PM",
        actionType: "proceed",
      },
    ],
  },
  {
    timeframe: "Yesterday",
    items: [
      {
        id: "3",
        title: "Subscribed Lead",
        subtitle: "hagertorky@gmail.com",
        response: "You can add this lead to new sequence",
        time: "3:40 PM",
        actionType: "view",
      },
      {
        id: "4",
        title: "Out of office",
        subtitle: "Hagertorky (hagertorky@gmail.com)",
        response: "out of office for a week",
        time: "3:40 PM",
        actionType: "view",
      },
    ],
  },
  {
    timeframe: "Monday",
    items: [
      {
        id: "5",
        title: "Quota Warning!",
        subtitle: "you've used 70% of the quota",
        time: "3:40 PM",
        actionType: "view",
      },
      {
        id: "6",
        title: "New Leads Assigned",
        subtitle: "You've been assigned to 200 leads",
        time: "3:40 PM",
        actionType: "view",
      },
    ],
  },
];

export function Topbar() {
  const router = useRouter();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationGroup[]>(initialNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDismiss = (id: string) => {
    setNotifications((prevGroups) =>
      prevGroups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => item.id !== id),
        }))
        .filter((group) => group.items.length > 0),
    );
  };

  const hasUnread = notifications.some((group) => group.items.length > 0);

  return (
    <header className="h-[78px] bg-bg-light border-b border-border-gray flex items-center justify-between px-6 shrink-0 rounded-tl-lg rounded-tr-lg relative">
      {/* Brand Logo */}
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-brand-primary" aria-hidden="true" />
        <Link
          href="/"
          className="text-[25px] font-bold text-brand-primary font-inter tracking-tight"
        >
          Saigent
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {/* Credits Badge */}
        <div className="flex items-center gap-2 border border-brand-primary rounded-lg px-3 py-2 bg-white/50">
          <Coins className="w-5 h-5 text-text-gray" aria-hidden="true" />
          <span className="text-[13px] font-bold text-text-gray font-mono">
            200 Credits
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Help Button */}
          <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <HelpCircle
              className="w-6 h-6 text-[#900C89] opacity-70"
              aria-hidden="true"
            />
            <span className="text-[13px] font-bold text-text-gray font-mono">
              Help
            </span>
          </button>

          {/* Notifications Trigger & Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="relative hover:opacity-80 transition-opacity p-1 rounded-full focus:outline-none"
              aria-label="Notifications"
              onClick={() => setIsNotificationsOpen((prev) => !prev)}
            >
              <Bell className="w-6 h-6 text-text-gray" aria-hidden="true" />
              {hasUnread && (
                <span
                  className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-[#E20000] rounded-full border border-white"
                  aria-hidden="true"
                />
              )}
            </button>

            {/* Notification Center Popover */}
            {isNotificationsOpen && (
              <div className="absolute right-0 top-12 w-[420px] bg-[#F6F8F7] border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                  <h3 className="font-semibold text-[#10201C]">
                    Notification Center
                  </h3>
                  <button
                    onClick={() => setIsNotificationsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Body / List */}
                <div className="max-h-[500px] overflow-y-auto px-4 space-y-4">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8 text-xs text-gray-400">
                      No new notifications
                    </div>
                  ) : (
                    notifications.map((group) => (
                      <div key={group.timeframe} className="space-y-2">
                        <span className="block text-sm font-bold text-[#10201C] mb-2">
                          {group.timeframe}
                        </span>

                        {group.items.map((item) => (
                          <div
                            key={item.id}
                            className="bg-bg-mint border border-[#D3DEDB]/60 rounded-lg p-3.5 flex items-start justify-between gap-3 text-left"
                          >
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-[#10201C] truncate">
                                {item.title}
                              </h4>
                              {item.subtitle && (
                                <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                                  {item.subtitle}
                                </p>
                              )}
                              {item.response && (
                                <p className="text-[11px] text-gray-500 font-mono">
                                  <span className="font-semibold text-gray-700">
                                    Response:
                                  </span>{" "}
                                  {item.response}
                                </p>
                              )}
                            </div>

                            <div className="flex flex-col items-end gap-3 shrink-0">
                              <span className="text-[10px] font-semibold text-gray-700">
                                {item.time}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  className="bg-[#0D8C7C] hover:bg-[#0a7366] text-white text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors shadow-xs"
                                >
                                  {item.actionType === "proceed"
                                    ? "Proceed"
                                    : "View"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDismiss(item.id)}
                                  className="bg-white border border-red-300 text-red-500 hover:bg-red-50 text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors"
                                >
                                  {item.actionType === "proceed"
                                    ? "Cancel"
                                    : "Dismiss"}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <button
            type="button"
            aria-label="Account menu"
            className="w-10 h-10"
            onClick={() => router.push("/profile")}
          >
            <span className="block w-full h-full rounded-full bg-white overflow-hidden">
              <Image
                src="/Ellipse 2.svg"
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
