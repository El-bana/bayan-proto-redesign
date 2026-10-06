"use client";

import { useState } from "react";
import Link from "next/link";
import AuthBanner from "@/components/auth/AuthBanner";
import { X, ArrowRight, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

export default function LoginPage() {
  // Modal Visibility State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  // Forgot/Reset Password Flow State (3 Steps)
  const [resetStep, setResetStep] = useState<1 | 2 | 3>(1);
  const [resetEmail, setResetEmail] = useState("");
  const [otpCode, setOtpCode] = useState(["", "", "", "", ""]);
  const [resetNewPw, setResetNewPw] = useState("");
  const [resetConfirmPw, setResetConfirmPw] = useState("");
  const [resetError, setResetError] = useState("");

  // Validation rules for Reset Password Flow
  const resetHasUpper = /[A-Z]/.test(resetNewPw);
  const resetHasNumber = /[0-9]/.test(resetNewPw);
  const resetHasMinLength = resetNewPw.length >= 8;
  const isResetValid = resetHasUpper && resetHasNumber && resetHasMinLength;

  const resetStrengthScore = [
    resetHasUpper,
    resetHasNumber,
    resetHasMinLength,
  ].filter(Boolean).length;

  const getResetStrengthBarColor = (barIndex: number) => {
    if (resetStrengthScore === 0) return "bg-gray-200";
    if (resetStrengthScore === 1)
      return barIndex === 0 ? "bg-red-500" : "bg-gray-200";
    if (resetStrengthScore === 2)
      return barIndex <= 1 ? "bg-[#0D8C7C]" : "bg-gray-200";
    return "bg-[#0D8C7C]";
  };

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const updated = [...otpCode];
    updated[index] = value;
    setOtpCode(updated);

    if (value && index < 4) {
      const nextInput = document.getElementById(`login-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");

    if (!isResetValid) {
      setResetError("Password does not meet all security requirements.");
      return;
    }

    if (resetNewPw !== resetConfirmPw) {
      setResetError("Passwords do not match.");
      return;
    }

    alert("Password successfully reset!");
    closeForgotModal();
  };

  const closeForgotModal = () => {
    setIsForgotModalOpen(false);
    setResetStep(1);
    setOtpCode(["", "", "", "", ""]);
    setResetEmail("");
    setResetNewPw("");
    setResetConfirmPw("");
    setResetError("");
  };

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
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="text-xs text-text-dark font-medium hover:underline"
            >
              Forgot Password?
            </button>
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

      {/* ========================================================================= */}
      {/* FORGOT / RESET PASSWORD MODAL (3 STEPS) */}
      {/* ========================================================================= */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4">
          <div className="bg-[#F8FAFA] border border-gray-200 rounded-xl shadow-xl w-full max-w-md p-6 relative text-left animate-in fade-in zoom-in duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#10201C]">
                Forgot/Reset Password
              </h3>
              <button
                onClick={closeForgotModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Stepper Bar */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div
                className={`h-1 rounded-full transition-colors ${
                  resetStep >= 1 ? "bg-[#0D8C7C]" : "bg-gray-200"
                }`}
              />
              <div
                className={`h-1 rounded-full transition-colors ${
                  resetStep >= 2 ? "bg-[#0D8C7C]" : "bg-gray-200"
                }`}
              />
              <div
                className={`h-1 rounded-full transition-colors ${
                  resetStep >= 3 ? "bg-[#0D8C7C]" : "bg-gray-200"
                }`}
              />
            </div>

            {/* STEP 1: Email */}
            {resetStep === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setResetStep(2);
                }}
                className="space-y-4"
              >
                <p className="text-xs text-gray-500">
                  Enter the email associated with this account and we will send
                  you a verification code
                </p>

                <div>
                  <label className="text-xs font-bold text-[#10201C] block mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#0D8C7C]"
                    required
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 bg-[#0D8C7C] hover:bg-[#0a7366] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: OTP Code */}
            {resetStep === 2 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setResetStep(3);
                }}
                className="space-y-5"
              >
                <p className="text-xs text-gray-500">
                  Check your email we&apos;ve sent a code to your inbox
                </p>

                <div className="flex justify-between items-center gap-2 max-w-xs mx-auto py-2">
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`login-otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, idx)}
                      className="w-12 h-14 text-center bg-white border border-[#0D8C7C] rounded-xl text-lg font-bold text-[#10201C] focus:outline-none focus:ring-2 focus:ring-[#0D8C7C]/20"
                      required
                    />
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => setResetStep(1)}
                    className="flex items-center gap-1.5 bg-[#0D8C7C] hover:bg-[#0a7366] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 bg-[#0D8C7C] hover:bg-[#0a7366] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Reset Password */}
            {resetStep === 3 && (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-3">
                <p className="text-xs text-gray-500 mb-2">
                  Enter Your new password
                </p>

                {resetError && (
                  <p className="text-xs text-red-500 font-medium">
                    {resetError}
                  </p>
                )}

                <div>
                  <label className="text-xs font-bold text-[#10201C] block mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={resetNewPw}
                    onChange={(e) => setResetNewPw(e.target.value)}
                    placeholder="Enter your new password"
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#0D8C7C]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#10201C] block mb-1">
                    Re-Enter Password
                  </label>
                  <input
                    type="password"
                    value={resetConfirmPw}
                    onChange={(e) => setResetConfirmPw(e.target.value)}
                    placeholder="Re-Enter your new password"
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#0D8C7C]"
                    required
                  />
                </div>

                {/* Reset Password Strength Bars */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div
                    className={`h-1 rounded-full ${getResetStrengthBarColor(0)}`}
                  />
                  <div
                    className={`h-1 rounded-full ${getResetStrengthBarColor(1)}`}
                  />
                  <div
                    className={`h-1 rounded-full ${getResetStrengthBarColor(2)}`}
                  />
                </div>

                {/* Reset Password Rules Checklist */}
                <div className="space-y-1.5 pt-1 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5">
                    {resetHasUpper ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    )}
                    <span
                      className={
                        resetHasUpper ? "text-[#10201C]" : "text-gray-600"
                      }
                    >
                      At least 1 Upper Case
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {resetHasNumber ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    )}
                    <span
                      className={
                        resetHasNumber ? "text-[#10201C]" : "text-gray-600"
                      }
                    >
                      At least 1 Number
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {resetHasMinLength ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    )}
                    <span
                      className={
                        resetHasMinLength ? "text-[#10201C]" : "text-gray-600"
                      }
                    >
                      At least 8 Characters
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setResetStep(2)}
                    className="flex items-center gap-1.5 bg-[#0D8C7C] hover:bg-[#0a7366] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </button>
                  <button
                    type="submit"
                    disabled={!isResetValid || resetNewPw !== resetConfirmPw}
                    className="bg-[#0D8C7C] hover:bg-[#0a7366] disabled:opacity-50 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-colors"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
