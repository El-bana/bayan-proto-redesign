import { SendHorizontal } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <SendHorizontal
        className="w-5 h-5 text-[#0D8C7C]"
        aria-hidden="true"
      />
      <h1 className="text-[13px] text-[#10201C]">
        <span className="font-bold">Campaigns</span>
        <span className="font-normal text-[#445751]">
          {' '}
          / Europe campaign 2026
        </span>
      </h1>
    </div>
  );
}