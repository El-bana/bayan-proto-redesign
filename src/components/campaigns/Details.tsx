'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import {
  FieldLabel,
  TextInput,
  SelectField,
  TealButton,
  CancelButton,
  ValidationMessage,
} from './Primitives';

export function Details({ campaign }: { campaign: string }) {
  const router = useRouter();

  return (
    <div className="w-full md:w-1/2">
      <div className="mb-4">
        <FieldLabel>Campaign Name*</FieldLabel>
        <TextInput defaultValue="Europe campaign 2026" />
        <ValidationMessage>
          • Campaign name already exists. Please choose a unique name.
        </ValidationMessage>
        <ValidationMessage>
          • Campaign name cannot exceed 100 characters.
        </ValidationMessage>
        <ValidationMessage>
          • Campaign name contains invalid characters. Only letters, numbers,
          hyphens, and underscores are allowed.
        </ValidationMessage>
      </div>

      <div className="mb-4 border border-dashed border-[#7B3FF2] rounded-md p-1.5">
        <FieldLabel>Campaign Type*</FieldLabel>
        <SelectField value="Manual Campaign" />
      </div>

      <div className="mb-4">
        <FieldLabel>Choose lead list</FieldLabel>
        <SelectField value="Teachers in USA 2026" />
      </div>

      <div className="flex items-center justify-between mt-8">
        <CancelButton onClick={() => router.push('/campaigns')}>
          Cancel
        </CancelButton>
        <TealButton
          onClick={() => router.push(`/campaigns/${campaign}/sequence`)}
        >
          Next
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </TealButton>
      </div>
    </div>
  );
}