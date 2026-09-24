'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import {
  FieldLabel,
  TextInput,
  SelectField,
  TealButton,
} from './Primitives';

export function Schedule({ campaign }: { campaign: string }) {
  const router = useRouter();

  return (
    <div className="w-full space-y-6">
      {/* Row 1: Start Date = half, Send from = quarter, Send until = quarter */}
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-2 min-w-0">
          <FieldLabel>Start Date</FieldLabel>
          <div className="relative">
            <TextInput placeholder="dd-mm-yyyy" />
            <Calendar
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B3FF2] pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="min-w-0">
          <FieldLabel>Send from</FieldLabel>
          <TextInput defaultValue="08:00 AM" disabled />
        </div>
        <div className="min-w-0">
          <FieldLabel>Send until</FieldLabel>
          <TextInput defaultValue="05:00 PM" disabled />
        </div>
      </div>

      {/* Row 2: two equal halves, aligned with the columns above */}
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-2 min-w-0">
          <FieldLabel>Week end pattern</FieldLabel>
          <SelectField value="Saturday-Sunday(Western)" />
        </div>
        <div className="col-span-2 min-w-0">
          <FieldLabel>Timezone basis</FieldLabel>
          <SelectField value="Each lead's local time" />
        </div>
      </div>

      {/* Buttons: Previous far left, Next far right */}
      <div className="flex items-center justify-between pt-2">
        <TealButton onClick={() => router.push('/campaigns/new')}>
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          Previous
        </TealButton>
        <TealButton
          onClick={() => router.push(`/campaigns/${campaign}/launch`)}
        >
          Next
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </TealButton>
      </div>
    </div>
  );
}