'use client';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Briefcase,
  Mail,
  MessageSquare,
  BookOpen,
  Send,
  type LucideIcon,
} from 'lucide-react';
import { TealButton } from './Primitives';

const stats: {
  icon: LucideIcon;
  number: string;
  label: string;
}[] = [
  { icon: Briefcase, number: '10', label: 'Leads' },
  { icon: Mail, number: '130', label: 'Emails/day' },
  { icon: MessageSquare, number: '136', label: 'Messages' },
  { icon: BookOpen, number: '2', label: 'Templates' },
];

export function Launch({ campaign }: { campaign: string }) {
  const router = useRouter();

  return (
    <div className="w-full space-y-5">
      {/* Stat cards: 4 equal columns across the full width */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="min-w-0 bg-white border border-[#D3DEDB] rounded-lg px-3 py-3 flex items-center"
            >
              <span
                className="w-9 h-9 rounded-full border border-[#0D8C7C] text-[#0D8C7C] flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <Icon className="w-4 h-4" />
              </span>
              {/* number + label centered in the remaining space */}
              <div className="flex-1 min-w-0 flex flex-col items-center">
                <span className="text-[15px] font-medium text-[#10201C] leading-none">
                  {stat.number}
                </span>
                <span className="text-[10px] text-[#445751] mt-1.5 truncate">
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sending notice: purple box with a darker left accent */}
      <div className="rounded-lg bg-[#B69CF7] border-l-[3px] border-[#7B3FF2] px-4 py-3.5">
        <h3 className="text-[11px] font-bold text-[#10201C]">Sending</h3>
        <p className="text-[10px] font-mono text-[#10201C] leading-relaxed mt-2">
          Saigent sends this from 3 managed inboxes at about 130 emails a day,
          rising to 130 next week as newer inboxes finish warming. You do not
          need to connect or configure anything.
        </p>
      </div>

      {/* Buttons: Previous far left, Launch far right */}
      <div className="flex items-center justify-between pt-1">
        <TealButton
          onClick={() => router.push(`/campaigns/${campaign}/schedule`)}
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          Previous
        </TealButton>
        <TealButton>
          Launch campaign
          <Send className="w-3.5 h-3.5" aria-hidden="true" />
        </TealButton>
      </div>
    </div>
  );
}