import { LeadSearch } from '@/components/lead-locator/LeadSearch';
import { Suspense } from 'react';

export default function LeadLocatorPage() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <LeadSearch />
      </Suspense>
    </div>
  );
}
