"use client";

import { useState } from "react";
import Link from "next/link";
import AuthBanner from "@/components/auth/AuthBanner";

export default function LoginPage() {
  return (
    <div className="w-full max-w-6xl mx-auto h-full bg-[#EDF6F5] flex flex-col md:flex-row gap-6 rounded-lg text-center shadow-sm border border-border-gray">
      {/* Left Banner */}
      <AuthBanner />

      {/* Right Form Container */}
      <div className="flex-1 flex flex-col justify-center px-4 md:px-8 py-4">
        {/* Top Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#E2ECE9] p-1 rounded-lg flex gap-1 border border-[#D0DDD9]">
            <Link
              href="/auth/signup"
              className="text-[#64748B] text-xs font-semibold px-12 py-2 rounded-lg hover:text-text-dark transition-colors flex items-center"
            >
              Sign Up
            </Link>
            <button className="bg-brand-primary text-white text-xs font-semibold px-12 py-2 rounded-lg shadow-sm">
              Log In
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-text-dark mb-6">
          Login
        </h2>

        {/* Google Login Button */}
        <button className="w-full flex items-center justify-center gap-2 border border-border-dark rounded-lg py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-4">
          <span>Login with google</span>
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "/icp-library";
          }}
          className="space-y-4"
        >
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold text-[#212225]">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-brand-primary"
              required
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold text-[#212225]">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-brand-primary"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-primary hover:bg-[#0a7366] text-white text-xs font-bold py-2.5 rounded-lg transition-colors mt-2"
          >
            Log In
          </button>

          <div className="text-center">
            <Link
              href="#"
              className="text-xs text-text-dark font-medium hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="text-center font-semibold text-text-dark text-sm pt-2">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-700 font-bold underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
