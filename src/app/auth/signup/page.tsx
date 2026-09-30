"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthBanner from "@/components/auth/AuthBanner";
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";

export default function SignUpPage() {
  const [accountType, setAccountType] = useState("Company");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasMinLength = password.length >= 8;

  // Strength calculation: 0, 1, 2, or 3
  const strengthScore = [hasUpper, hasNumber, hasMinLength].filter(
    Boolean,
  ).length;

  const getStrengthBarColor = (barIndex: number) => {
    if (strengthScore === 0) return "bg-gray-200";
    if (strengthScore === 1)
      return barIndex === 0 ? "bg-red-600" : "bg-gray-200";
    if (strengthScore === 2)
      return barIndex <= 1 ? "bg-orange-400" : "bg-gray-200";
    return "bg-green-600";
  };

  return (
    <div className="w-full max-w-6xl mx-auto h-full bg-[#EDF6F5] flex flex-col md:flex-row gap-6 rounded-lg text-center shadow-sm border border-border-gray">
      {/* Left Banner */}
      <AuthBanner />

      {/* Right Form Container */}
      <div className="flex-1 flex flex-col justify-center px-4 md:px-8 py-4">
        {/* Top Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#E2ECE9] p-1 rounded-lg flex gap-1 border border-[#D0DDD9]">
            <button className="bg-brand-primary text-white text-xs font-semibold px-12 py-2 rounded-lg shadow-sm">
              Sign Up
            </button>
            <Link
              href="/auth/login"
              className="text-[#64748B] text-xs font-semibold px-12 py-2 rounded-lg hover:text-text-dark transition-colors flex items-center"
            >
              Log In
            </Link>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-text-dark mb-4">
          Create new account
        </h2>

        {/* Google Sign Up Button */}
        <button className="w-full flex items-center justify-center gap-2 border border-border-dark rounded-lg py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-4">
          <span>Sign up with google</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-4">
          <div className="border-t border-border-dark w-full" />
          <span className="bg-bg-mint px-2 text-xs text-text-dark absolute">
            or
          </span>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (accountType == "Company") {
              window.location.href = "/auth/signup/company";
            } else {
              window.location.href = "/auth/verify";
            }
          }}
          className="space-y-3"
        >
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold text-[#212225]">
              Account type
            </label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-brand-primary"
            >
              <option value="Company">Company</option>
              <option value="Individual">Individual</option>
            </select>
          </div>

          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold text-[#212225]">
              Full name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-brand-primary"
              required
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold text-[#212225]">
              Work Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-brand-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm self-start font-semibold text-[#212225]">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-brand-primary pr-9"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            {/* Password Strength Indicator Bars */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div
                className={`h-1.5 rounded-full transition-colors ${getStrengthBarColor(0)}`}
              />
              <div
                className={`h-1.5 rounded-full transition-colors ${getStrengthBarColor(1)}`}
              />
              <div
                className={`h-1.5 rounded-full transition-colors ${getStrengthBarColor(2)}`}
              />
            </div>

            {/* Validation Checklist */}
            <div className="space-y-1 mt-2">
              <div className="flex items-center gap-1.5 text-[11px]">
                {hasUpper ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-red-600" />
                )}
                <span
                  className={`
                    font-medium ${hasUpper ? "text-green-600" : "text-gray-600"}
                    `}
                >
                  At least 1 Upper Case
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                {hasNumber ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-red-600" />
                )}
                <span
                  className={`
                    font-medium ${hasNumber ? "text-green-600" : "text-gray-600"}
                    `}
                >
                  At least 1 Number
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                {hasMinLength ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-red-600" />
                )}
                <span
                  className={`
                    font-medium ${hasMinLength ? "text-green-600" : "text-gray-600"}
                    `}
                >
                  At least 8 Characters
                </span>
              </div>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              className="w-3.5 h-3.5 rounded border-gray-300 text-brand-primary focus:ring-[#0D8C7C]"
              required
            />
            <label htmlFor="terms" className="text-xs font-medium">
              I agree to Saigent{" "}
              <Link href="#" className="text-blue-700 underline font-bold">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-blue-700 underline font-bold">
                Privacy policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-primary hover:bg-[#0a7366] text-white text-xs font-bold py-2.5 rounded-lg transition-colors mt-2"
          >
            Join Now
          </button>
        </form>
      </div>
    </div>
  );
}
