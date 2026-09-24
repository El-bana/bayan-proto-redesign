'use client';
import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronDown,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const emailTabs = ['Email 1', 'Email 2', 'Email 3'] as const;

const emailBody = `Hi {{first_name}} {{last_name}},

[ai: one line on the specific pain or challenge this team faces]

We map where the delay actually sits before quoting, so you see the sequencing rather than a price list.

Happy to send the one-page version instead of {{offer}}.

— {{sender_name}}`;

const variableGroups: {
  label: string;
  tone: 'purple' | 'green';
  chips: string[];
}[] = [
  {
    label: 'Lead',
    tone: 'purple',
    chips: ['{{first_name}}', '{{last_name}}', '{{Title}}', '{{Seniority}}'],
  },
  {
    label: 'Company',
    tone: 'purple',
    chips: ['{{Company}}', '{{domain}}', '{{industry}}', '{{country}}'],
  },
  {
    label: 'Scoring',
    tone: 'purple',
    chips: ['{{fit_score}}', '{{fit_reason}}'],
  },
  { label: 'Profile', tone: 'purple', chips: ['{{pain}}', '{{value_prop}}'] },
  {
    label: 'Sender',
    tone: 'purple',
    chips: ['{{Sender_name}}', '{{Sender_title}}', '{{offer}}'],
  },
  {
    label: 'AI',
    tone: 'green',
    chips: [
      '{{ai:recent signal}}',
      '{{ai:their pain}}',
      '{{ai:what they do}}',
      '{{ai:their market}}',
      '{{ai:their role}}',
      '{{ai:custom}}',
    ],
  },
];

/* ---------- local primitives (styled to match the design) ---------- */

const fieldBox =
  'w-full bg-white border border-[#D3DEDB] rounded-md px-3 py-2.5 text-[10px] text-[#10201C] font-mono outline-none focus:border-[#0D8C7C] transition-colors';

function Label({ children }: { children: React.ReactNode }) {
  const isRequired = typeof children === 'string' && children.endsWith('*');
  return (
    <label className="block mb-1 text-[9px] font-mono font-semibold text-[#10201C]">
      {isRequired ? (
        <>
          {(children as string).slice(0, -1)}
          <span className="text-red-500">*</span>
        </>
      ) : (
        children
      )}
    </label>
  );
}

function Select({ value }: { value: string }) {
  return (
    <div
      className={cn(
        fieldBox,
        'flex items-center justify-between cursor-pointer',
      )}
    >
      <span>{value}</span>
      <ChevronDown className="w-3 h-3 text-[#7B3FF2]" aria-hidden="true" />
    </div>
  );
}

function OutlineButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#0D8C7C] bg-white text-[#0D8C7C] text-[10px] font-mono hover:bg-[#0D8C7C]/5 transition-colors"
    >
      {children}
    </button>
  );
}

function SolidButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-md bg-[#0D8C7C] text-white text-[10px] font-mono font-medium hover:bg-[#0B7A6C] transition-colors"
    >
      {children}
    </button>
  );
}

function ToolbarButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className="flex items-center justify-center w-6 h-6 rounded text-[#10201C] hover:bg-black/5 transition-colors"
    >
      {children}
    </button>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-block w-10 h-5 rounded-full transition-colors',
        checked ? 'bg-[#0D8C7C]' : 'bg-[#C5D0CD]',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all',
          checked ? 'left-[22px]' : 'left-0.5',
        )}
      />
    </button>
  );
}

/* ---------- main component ---------- */

export function Sequence() {
  const [activeEmail, setActiveEmail] =
    useState<(typeof emailTabs)[number]>('Email 1');
  const [unsubscribe, setUnsubscribe] = useState(true);

  return (
    <div className="grid grid-cols-2 gap-4 items-stretch font-mono w-full">
      {/* LEFT — Email editor (exactly half) */}
      <div className="min-w-0 rounded-xl border border-[#D3DEDB] bg-[#F6F8F7] p-5 space-y-4">
        <div className="flex items-baseline gap-2">
          <h2 className="text-[11px] font-semibold text-[#10201C]">
            Email 1 of 3
          </h2>
          <p className="text-[8px] text-[#7C8C87]">
            Write once - it adapts to every lead
          </p>
        </div>

        <div className="flex items-center gap-4 text-[10px] border-b border-[#D3DEDB]">
          {emailTabs.map((tab) => {
            const isActive = tab === activeEmail;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveEmail(tab)}
                className={cn(
                  'pb-1.5 -mb-px border-b-2 transition-colors',
                  isActive
                    ? 'border-[#0D8C7C] text-[#0D8C7C] font-medium'
                    : 'border-transparent text-[#A7B3B0] hover:text-[#7C8C87]',
                )}
              >
                {tab}
              </button>
            );
          })}
          <button
            type="button"
            className="pb-1.5 inline-flex items-center gap-1 text-[#10201C] hover:text-[#0D8C7C] transition-colors"
          >
            <Plus className="w-3 h-3" aria-hidden="true" />
            Add Email
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Step type</Label>
            <Select value="Opener" />
          </div>
          <div>
            <Label>Send after</Label>
            <Select value="3 Days" />
          </div>
        </div>

        <div>
          <Label>CC</Label>
          <input
            className={fieldBox}
            defaultValue="Hagertorky@gmail.com , Esraammoud@gmail.com"
          />
        </div>

        <div>
          <Label>BCC</Label>
          <input
            className={fieldBox}
            defaultValue="Warmwashraf@gmail.com , Wardartek@gmail.com"
          />
        </div>

        <div>
          <Label>Subject*</Label>
          <input
            className={fieldBox}
            defaultValue="Looret - Elevate Your Global Communication Strategy"
          />
        </div>

        <div>
          <Label>Email Body*</Label>
          <textarea
            rows={9}
            defaultValue={emailBody}
            className={cn(fieldBox, 'resize-y leading-relaxed block')}
          />

          {/* toolbar sits under the textarea */}
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              title="Format"
              aria-label="Format"
              className="flex items-center justify-center w-16 h-7 rounded border border-[#10201C] bg-white text-[#10201C]"
            >
              <BookOpen className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between flex-1 max-w-[120px] h-7 px-2 rounded border border-[#D3DEDB] bg-white text-[9px] text-[#A7B3B0]">
              Nunito(Body)
              <span className="text-[#10201C] text-[8px]">▼</span>
            </div>

            <div className="flex items-center justify-between w-12 h-7 px-2 rounded border border-[#D3DEDB] bg-white text-[9px] text-[#10201C]">
              20
              <span className="text-[8px]">▼</span>
            </div>

            <div className="flex items-center gap-1 ml-1 text-[#10201C]">
              <ToolbarButton label="Bold">
                <Bold className="w-4 h-4" strokeWidth={3} />
              </ToolbarButton>
              <ToolbarButton label="Italic">
                <Italic className="w-3.5 h-3.5" />
              </ToolbarButton>
              <ToolbarButton label="Align left">
                <AlignLeft className="w-3.5 h-3.5" />
              </ToolbarButton>
              <ToolbarButton label="Align center">
                <AlignCenter className="w-3.5 h-3.5" />
              </ToolbarButton>
              <ToolbarButton label="Align right">
                <AlignRight className="w-3.5 h-3.5" />
              </ToolbarButton>
            </div>
          </div>
        </div>

        {/* Unsubscribe row */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] font-medium text-[#10201C]">
            Unsubscribe Message
          </span>
          <Toggle checked={unsubscribe} onChange={setUnsubscribe} />
        </div>

        {/* Nested variables panel — boxed like the body, inside the left card */}
        <div className="rounded-xl border border-[#C9D6D2] bg-white p-4 shadow-[0_1px_2px_rgba(16,32,28,0.04)]">
          <button
            type="button"
            className="mb-4 text-[11px] font-mono text-[#10201C] hover:text-[#7B3FF2] transition-colors"
          >
            Click to insert
          </button>

          <div className="space-y-3.5">
            {variableGroups.map((group) => (
              <div key={group.label} className="flex items-start gap-4">
                <div className="w-16 shrink-0 pt-1 text-[11px] font-mono text-[#10201C]">
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-2 min-w-0">
                  {group.chips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      className={cn(
                        'px-2 py-1 rounded-md border text-[9px] leading-none font-mono transition-colors',
                        group.tone === 'purple'
                          ? 'border-[#7B3FF2]/40 bg-[#7B3FF2]/5 text-[#7B3FF2] hover:bg-[#7B3FF2]/15'
                          : 'border-[#0D8C7C]/40 bg-[#0D8C7C]/5 text-[#0D8C7C] hover:bg-[#0D8C7C]/15',
                      )}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — Lead preview (exactly half, same height as left) */}
      <div className="min-w-0 rounded-xl border border-[#D3DEDB] bg-[#F6F8F7] p-4 flex flex-col">
        <h3 className="text-[12px] font-semibold text-[#10201C]">
          Preview as a real lead
        </h3>

        <div className="flex items-center justify-between mt-4">
          <OutlineButton>
            <ArrowLeft className="w-3 h-3" aria-hidden="true" />
            Previous lead
          </OutlineButton>
          <span className="text-[9px] text-[#7C8C87]">3 of 10 leads</span>
          <OutlineButton>
            Next lead
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </OutlineButton>
        </div>

        <div className="mt-4 text-[9px] text-[#7C8C87] truncate">
          Megan Delaney · VP Marketing · Lumenly Platform
        </div>

        <div className="mt-2 bg-white border border-[#D3DEDB] rounded-md p-3">
          <div className="text-[7px] text-[#A7B3B0]">
            Email as Megan receives it
          </div>
          <div className="mt-1 text-[10px] font-bold text-[#10201C]">
            Preview as a real read
          </div>
          <div className="mt-3 text-[10px] leading-relaxed text-[#10201C] space-y-3">
            <p>Hi Megan Delaney,</p>
            <p>
              entering new markets without local content tends to be the
              bottleneck.
            </p>
            <p>
              We map where the delay actually sits before quoting, so you see
              the sequencing rather than a price list.
            </p>
            <p>Happy to send the one-page version instead of a 20-minute call.</p>
            <p>— Anna Reid</p>
          </div>
        </div>

        {/* right under the preview box */}
        <div className="flex items-center justify-between mt-3">
          <SolidButton>
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Previous
          </SolidButton>
          <SolidButton>
            Next
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </SolidButton>
        </div>
      </div>
    </div>
  );
}