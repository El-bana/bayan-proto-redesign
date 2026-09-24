'use client';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FieldLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        'block text-[10px] font-medium text-[#445751] mb-1',
        className,
      )}
    >
      {children}
    </label>
  );
}

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full h-8 px-2.5 text-[11px] text-[#10201C] bg-white border border-[#D3DEDB] rounded-md focus:outline-none focus:border-brand-primary placeholder:text-[#A7B3B0] disabled:bg-[#F0F0F0] disabled:text-[#7C8C87]',
        className,
      )}
    />
  );
}

export function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full bg-white px-2.5 py-2 text-[11px] text-[#10201C] leading-relaxed resize-none focus:outline-none placeholder:text-[#A7B3B0]',
        className,
      )}
    />
  );
}

export function SelectField({ value }: { value: string }) {
  return (
    <div className="relative">
      <div className="flex items-center h-8 px-2.5 border border-[#D3DEDB] rounded-md bg-white">
        <span className="truncate flex-1 text-[11px] text-[#10201C]">
          {value}
        </span>
      </div>
      <ChevronDown
        className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#7B3FF2] pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

export function ValidationMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-[9px] text-[#E20000] mt-1">{children}</p>;
}

export function TealButton({
  className,
  type = 'button',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      {...props}
      className={cn(
        'inline-flex items-center gap-1.5 h-8 px-4 rounded-md bg-[#0D8C7C] text-white text-[11px] font-medium hover:bg-[#14B39F] transition-colors',
        className,
      )}
    />
  );
}

export function CancelButton({
  className,
  type = 'button',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      {...props}
      className={cn(
        'inline-flex items-center h-8 px-4 rounded-md border border-[#E20000] bg-white text-[#E20000] text-[11px] font-medium hover:bg-red-50 transition-colors',
        className,
      )}
    />
  );
}