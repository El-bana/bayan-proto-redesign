"use client";

import { useState } from "react";
import {
  X,
  KeyRound,
  LogOut,
  Pencil,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"general" | "mfa">("general");

  // Profile data state
  const [profileData, setProfileData] = useState({
    fullName: "Mohamed Tarek",
    email: "mohamedtarek@bayan-tech.com",
    brand: "BayanTech",
    title: "Junior Business Developer",
    avatarUrl: "/Ellipse 2.svg",
  });

  // Modal Visibility State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Change Password Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeError, setChangeError] = useState("");

  // Validation rules for Change Password
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasMinLength = newPassword.length >= 8;
  const isChangeValid = hasUpper && hasNumber && hasMinLength;

  const strengthScore = [hasUpper, hasNumber, hasMinLength].filter(
    Boolean,
  ).length;

  const getStrengthBarColor = (barIndex: number) => {
    if (strengthScore === 0) return "bg-gray-200";
    if (strengthScore === 1)
      return barIndex === 0 ? "bg-red-500" : "bg-gray-200";
    if (strengthScore === 2)
      return barIndex <= 1 ? "bg-[#0D8C7C]" : "bg-gray-200";
    return "bg-[#0D8C7C]";
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChangeError("");

    if (!isChangeValid) {
      setChangeError("Password does not meet all security requirements.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangeError("Passwords do not match.");
      return;
    }

    alert("Password updated successfully!");
    setIsChangePasswordOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="max-w-6xl mx-auto p-8 text-[#10201C] font-sans">
      <div>
        {/* Page Heading */}
        <h1 className="text-2xl font-bold text-[#10201C] mb-6">Your Profile</h1>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("general")}
            className={`pb-2 px-1 mr-6 font-semibold transition-colors border-b-2 ${
              activeTab === "general"
                ? "border-[#10201C] text-[#10201C]"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab("mfa")}
            className={`pb-2 px-1 font-semibold transition-colors border-b-2 ${
              activeTab === "mfa"
                ? "border-[#10201C] text-[#10201C]"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Multi-factor Authentication
          </button>
        </div>

        {/* Tab Content: General */}
        {activeTab === "general" && (
          <div className="flex flex-col max-w-4xl mx-auto md:flex-row items-center justify-center gap-20 pt-8">
            {/* Left Section: Avatar & Picture Controls */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24">
                <img
                  src={profileData.avatarUrl}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button
                  type="button"
                  className="bg-[#0D8C7C] hover:bg-[#0a7366] text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  Upload Picture
                </button>
                <button
                  type="button"
                  className="bg-white border border-red-400 text-red-500 hover:bg-red-50 text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Right Section: Personal Info Card */}
            <div className="flex-1 max-w-md">
              <div className="bg-bg-mint border border-[#D3DEDB]/60 rounded-lg p-6 relative shadow-xs">
                {/* Header with Edit Icon */}
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold text-[#10201C]">
                    Personal info
                  </h2>
                  <button className="text-gray-500 hover:text-[#0D8C7C] p-1 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>

                {/* Details List */}
                <div className="space-y-4">
                  <div>
                    <span className="block font-semibold text-gray-700 mb-0.5">
                      Full Name
                    </span>
                    <span className="text-gray-400">
                      {profileData.fullName}
                    </span>
                  </div>

                  <div>
                    <span className="block font-semibold text-gray-700 mb-0.5">
                      Email
                    </span>
                    <span className="text-gray-400">{profileData.email}</span>
                  </div>

                  <div>
                    <span className="block font-semibold text-gray-700 mb-0.5">
                      Brand
                    </span>
                    <span className="text-gray-400">{profileData.brand}</span>
                  </div>

                  <div>
                    <span className="block font-semibold text-gray-700 mb-0.5">
                      Title
                    </span>
                    <span className="text-gray-400">{profileData.title}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Security & Logout Actions */}
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(true)}
                  className="flex items-center gap-1.5 border border-[#0D8C7C] text-[#0D8C7C] hover:bg-[#0D8C7C]/5 text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-md"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  Change Password
                </button>

                <Link
                  href="/auth/login"
                  className="flex items-center gap-1.5 border border-red-400 text-red-500 hover:bg-red-50 text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-md"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: MFA */}
        {activeTab === "mfa" && (
          <div className="bg-bg-mint border border-[#D3DEDB] rounded-lg p-8 text-center max-w-md mx-auto my-8">
            <h3 className="text-base font-bold text-[#10201C] mb-2">
              Multi-factor Authentication
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Configure secondary authentication methods to keep your account
              safe.
            </p>
            <span className="inline-block bg-emerald-100 text-[#0D8C7C] text-xs font-medium px-3 py-1 rounded-full">
              Feature coming soon
            </span>
          </div>
        )}
      </div>

      {/* CHANGE PASSWORD MODAL */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4">
          <div className="bg-[#F8FAFA] border border-gray-200 rounded-lg shadow-xl w-full max-w-sm p-6 relative animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#10201C]">
                Change Password
              </h3>
              <button
                onClick={() => setIsChangePasswordOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleChangePasswordSubmit} className="space-y-3">
              {changeError && (
                <p className="text-xs text-red-500 font-medium">
                  {changeError}
                </p>
              )}

              <div>
                <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Write Your Current Password"
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#0D8C7C]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Write Your New Password"
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#0D8C7C]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Your New Password"
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-600 placeholder:text-gray-300 focus:outline-none focus:border-[#0D8C7C]"
                />
              </div>

              {/* Password Strength Bars */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className={`h-1 rounded-full ${getStrengthBarColor(0)}`} />
                <div className={`h-1 rounded-full ${getStrengthBarColor(1)}`} />
                <div className={`h-1 rounded-full ${getStrengthBarColor(2)}`} />
              </div>

              {/* Rules Validation Checklist */}
              <div className="space-y-1.5 pt-1 text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  {hasUpper ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  )}
                  <span
                    className={hasUpper ? "text-[#10201C]" : "text-gray-600"}
                  >
                    At least 1 Upper Case
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {hasNumber ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  )}
                  <span
                    className={hasNumber ? "text-[#10201C]" : "text-gray-600"}
                  >
                    At least 1 Number
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {hasMinLength ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  )}
                  <span
                    className={
                      hasMinLength ? "text-[#10201C]" : "text-gray-600"
                    }
                  >
                    At least 8 Characters
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="submit"
                  disabled={!isChangeValid || newPassword !== confirmPassword}
                  className="bg-[#0D8C7C] hover:bg-[#0a7366] disabled:opacity-50 text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="bg-white border border-red-400 text-red-500 hover:bg-red-50 text-xs font-semibold px-4 py-1.5 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
