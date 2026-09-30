"use client";

import Image from "next/image";

export default function AuthBanner() {
  return (
    <div className="relative w-full md:w-1/2 h-36 md:h-auto min-h-[140px] md:min-h-[600px] rounded-lg overflow-hidden bg-[#0C6B5E] shrink-0">
      <Image
        src="/Frame 413.svg"
        alt="Background Layer"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}
