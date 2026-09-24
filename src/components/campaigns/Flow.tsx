'use client';
import { useParams } from 'next/navigation';
import { Header } from './Header';
import { Wizard } from './Wizard';
import { Details } from './Details';
import { Sequence } from './Sequence';
import { Schedule } from './Schedule';
import { Launch } from './Launch';
import ProgressBar from '@/components/lists/ProgressBar';

export type FlowStep = 'details' | 'sequence' | 'schedule' | 'launch';

const DEFAULT_CAMPAIGN = 'europe-campaign-2026';

export function Flow({ step }: { step: FlowStep }) {
  const params = useParams();
  const campaign = (params?.id as string) ?? DEFAULT_CAMPAIGN;

  return (
    <div className="flex flex-col min-h-full w-full px-6 py-6">
      <Header />
      <Wizard active={step} campaign={campaign} />
      <div className="mt-4">
        {step === 'details' && <Details campaign={campaign} />}
        {step === 'sequence' && <Sequence />}
        {step === 'schedule' && <Schedule campaign={campaign} />}
        {step === 'launch' && <Launch campaign={campaign} />}
      </div>
      <div className="mt-6">
        <ProgressBar />
      </div>
    </div>
  );
}