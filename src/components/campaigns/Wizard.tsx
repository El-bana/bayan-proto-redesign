'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { FlowStep } from './Flow';

const steps: { key: FlowStep; label: string }[] = [
  { key: 'details', label: 'Details' },
  { key: 'sequence', label: 'Sequence' },
  { key: 'schedule', label: 'Schedule' },
  { key: 'launch', label: 'Launch' },
];

export function Wizard({
  active,
  campaign,
}: {
  active: FlowStep;
  campaign: string;
}) {
  const hrefFor = (key: FlowStep) =>
    key === 'details'
      ? '/campaigns/new'
      : `/campaigns/${campaign}/${key}`;

  return (
    <div>
      <nav className="flex items-center gap-6" aria-label="Campaign steps">
        {steps.map((step) => {
          const isActive = step.key === active;
          return (
            <Link
              key={step.key}
              href={hrefFor(step.key)}
              title={step.label}
              className={cn(
                'text-[11px] pb-1.5 border-b-2 transition-colors',
                isActive
                  ? 'border-[#0D8C7C] text-[#10201C] font-semibold'
                  : 'border-transparent text-[#A7B3B0] hover:text-[#7C8C87]',
              )}
            >
              {step.label}
            </Link>
          );
        })}
      </nav>
      <div className="h-px bg-[#D3DEDB] w-full" />
    </div>
  );
}