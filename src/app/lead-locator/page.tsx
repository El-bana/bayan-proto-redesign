import { LeadSearch } from '@/components/lead-locator/LeadSearch';
import { Suspense } from 'react';

export default function LeadLocatorPage() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<div className="flex h-full items-center justify-center text-[#7C8C87]">Loading...</div>}>
        <LeadSearch />
      </Suspense>
    </div>
  );
}
