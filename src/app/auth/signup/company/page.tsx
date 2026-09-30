"use client";

import Link from "next/link";
import AuthBanner from "@/components/auth/AuthBanner";

export default function CompanyInfoPage() {
  return (
    <div className="w-full max-w-6xl mx-auto h-full bg-[#EDF6F5] flex flex-col md:flex-row gap-6 rounded-lg text-center shadow-sm border border-border-gray">
      {/* Left Banner */}
      <AuthBanner />

      {/* Right Form Container */}
      <div className="flex-1 flex flex-col justify-center px-4 md:px-8 py-4">
        {/* Top Toggle */}
        <div className="flex justify-center mb-8">
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

        <h2 className="text-xl font-bold text-center text-text-dark mb-6">
          Company Information
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "/auth/verify";
          }}
          className="space-y-4"
        >
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold text-[#212225]">
              Company Name/Domain
            </label>
            <input
              type="text"
              placeholder="Enter your Company Name or domain"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold text-[#212225]">
              Company Size
            </label>
            <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-brand-primary">
              <option value="10-20">10-20</option>
              <option value="1-9">1-9</option>
              <option value="21-50">21-50</option>
              <option value="51-200">51-200</option>
              <option value="201+">201+</option>
            </select>
          </div>

          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold text-[#212225]">
              Industry
            </label>
            <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-brand-primary">
              <option value="" disabled selected>
                Choose Industry
              </option>
              <option value="tech">Software & Technology</option>
              <option value="finance">Finance & Banking</option>
              <option value="marketing">Marketing & Sales</option>
              <option value="healthcare">Healthcare</option>
            </select>
          </div>

          <div className="flex justify-between pt-4">
            <Link
              href="/auth/login"
              className="w-25 text-center border border-brand-primary text-brand-primary hover:bg-teal-50 text-xs font-semibold py-2.5 rounded-lg transition-colors"
            >
              Skip
            </Link>
            <button
              type="submit"
              className="w-25 bg-brand-primary hover:bg-[#0a7366] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
