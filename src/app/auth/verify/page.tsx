"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-advance to next input field
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#EDF6F5] rounded-lg text-center shadow-sm border border-border-gray">
      {/* Magnet / Email Vector Illustration */}
      <div className="relative w-48 h-36 mb-4">
        <Image
          src="/cuate.svg"
          alt="Check Email Illustration"
          fill
          priority
          className="object-contain"
        />
      </div>

      <h1 className="text-4xl font-semibold text-text-dark mb-2">
        Check Your Email
      </h1>
      <p className="text-sm text-gray-400 font-medium mb-8">
        We&apos;ve sent a verification code to your email inbox
      </p>

      {/* 5-Digit OTP Code Inputs */}
      <div className="flex gap-2 mb-8">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-16 h-24 md:w-30 md:h-40 border border-brand-primary rounded-lg text-center text-2xl md:text-4xl font-semibold text-text-dark focus:outline-none focus:ring-2 focus:ring-[#0D8C7C]"
          />
        ))}
      </div>

      <p className="font-semibold text-text-dark text-sm">
        Didn&apos;t Receive code?{" "}
        <button className="text-blue-700 font-bold underline">
          Resend Verification code
        </button>
      </p>
    </div>
  );
}
