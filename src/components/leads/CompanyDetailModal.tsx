"use client";

import React, { useEffect } from "react";
import { X, Factory, Link as LinkIcon, Building } from "lucide-react";
import { COMPANY_DESCRIPTIONS } from "./leads.mock";

export interface CompanyInfo {
  name: string;
  description: string;
  industry: string;
  domain: string;
  linkedin: string;
}

export const MOCK_COMPANIES: Record<string, CompanyInfo> = {
  Transpalm: {
    name: "Transpalm",
    description:
      "Transpalm is a translation & localization company that focuses on asian languages by providing several types of translation bla bla bla",
    industry: "Translation & localization",
    domain: "Transpalm.com",
    linkedin: "linkedin/Transpalm",
  },
  "Nile Corp": {
    name: "Nile Corp",
    description: COMPANY_DESCRIPTIONS["Nile Corp"],
    industry: "Media & Marketing",
    domain: "nilecorp.com",
    linkedin: "linkedin/nilecorp",
  },
  Gulfline: {
    name: "Gulfline",
    description: COMPANY_DESCRIPTIONS["Gulfline"],
    industry: "Logistics & Supply Chain",
    domain: "gulfline.com",
    linkedin: "linkedin/gulfline",
  },
  "Brenner GmbH": {
    name: "Brenner GmbH",
    description: COMPANY_DESCRIPTIONS["Brenner GmbH"],
    industry: "Industrial Manufacturing",
    domain: "brenner-gmbh.de",
    linkedin: "linkedin/brenner-gmbh",
  },
  Brightpath: {
    name: "Brightpath",
    description: COMPANY_DESCRIPTIONS["Brightpath"],
    industry: "Education & EdTech",
    domain: "brightpath.io",
    linkedin: "linkedin/brightpath",
  },
  "Studio Rossi": {
    name: "Studio Rossi",
    description: COMPANY_DESCRIPTIONS["Studio Rossi"],
    industry: "Architecture & Design",
    domain: "studiorossi.it",
    linkedin: "linkedin/studiorossi",
  },
  "Atlas Logistics": {
    name: "Atlas Logistics",
    description: COMPANY_DESCRIPTIONS["Atlas Logistics"],
    industry: "Transportation & Freight",
    domain: "atlaslogistics.com",
    linkedin: "linkedin/atlaslogistics",
  },
  "Novak Labs": {
    name: "Novak Labs",
    description: COMPANY_DESCRIPTIONS["Novak Labs"],
    industry: "Software & AI Research",
    domain: "novaklabs.ai",
    linkedin: "linkedin/novaklabs",
  },
  "Falcon Retail": {
    name: "Falcon Retail",
    description: COMPANY_DESCRIPTIONS["Falcon Retail"],
    industry: "Retail & Consumer Goods",
    domain: "falconretail.ae",
    linkedin: "linkedin/falconretail",
  },
  "Lumiere SA": {
    name: "Lumiere SA",
    description: COMPANY_DESCRIPTIONS["Lumiere SA"],
    industry: "Events & Luxury Brands",
    domain: "lumiere.fr",
    linkedin: "linkedin/lumieresa",
  },
  "Cobalt Systems": {
    name: "Cobalt Systems",
    description: COMPANY_DESCRIPTIONS["Cobalt Systems"],
    industry: "Cloud & Cybersecurity",
    domain: "cobaltsystems.com",
    linkedin: "linkedin/cobaltsystems",
  },
  Nordlys: {
    name: "Nordlys",
    description: COMPANY_DESCRIPTIONS["Nordlys"],
    industry: "CleanTech & Renewables",
    domain: "nordlysenergy.se",
    linkedin: "linkedin/nordlys",
  },
  "Acme Technologies": {
    name: "Acme Technologies",
    description:
      "Acme Technologies delivers enterprise cloud solutions and developer tooling.",
    industry: "Cloud Computing",
    domain: "acmetech.com",
    linkedin: "linkedin/acmetech",
  },
  "TechFlow Inc.": {
    name: "TechFlow Inc.",
    description:
      "TechFlow Inc. provides intelligent workflow automation for modern business teams.",
    industry: "Workflow Software",
    domain: "techflow.com",
    linkedin: "linkedin/techflow",
  },
  CloudScale: {
    name: "CloudScale",
    description:
      "CloudScale specializes in scalable cloud infrastructure and DevOps consulting.",
    industry: "Infrastructure & DevOps",
    domain: "cloudscale.io",
    linkedin: "linkedin/cloudscale",
  },
  GrowthLabs: {
    name: "GrowthLabs",
    description:
      "GrowthLabs is a data-driven growth marketing agency for high-growth tech startups.",
    industry: "Growth Marketing",
    domain: "growthlabs.com",
    linkedin: "linkedin/growthlabs",
  },
  "SaaS Ventures": {
    name: "SaaS Ventures",
    description:
      "SaaS Ventures invests in and accelerates early-stage B2B software companies.",
    industry: "Venture Capital & SaaS",
    domain: "saasventures.com",
    linkedin: "linkedin/saasventures",
  },
  BayanTech: {
    name: "BayanTech",
    description:
      "BayanTech is a translation and localization service provider based in Egypt.",
    industry: "Translation & Localization",
    domain: "bayan-tech.com",
    linkedin: "linkedin/bayan-tech",
  },
  "PWC Etic": {
    name: "PWC Etic",
    description:
      "PWC Etic is a regional technology and innovation center providing consulting services.",
    industry: "Consulting & Tech",
    domain: "pwc.com",
    linkedin: "linkedin/pwc",
  },
  Synapse: {
    name: "Synapse",
    description:
      "Synapse builds innovative software platforms and digital experiences.",
    industry: "Product Design & Tech",
    domain: "synapse.com",
    linkedin: "linkedin/synapse",
  },
  "SI-Vision": {
    name: "SI-Vision",
    description:
      "SI-Vision develops semiconductor intellectual property and electronic design solutions.",
    industry: "Semiconductors",
    domain: "si-vision.com",
    linkedin: "linkedin/si-vision",
  },
  AsgaTech: {
    name: "AsgaTech",
    description:
      "AsgaTech delivers mobile app development and enterprise web software.",
    industry: "Software Development",
    domain: "asgatech.com",
    linkedin: "linkedin/asgatech",
  },
  "700 Apps": {
    name: "700 Apps",
    description:
      "700 Apps provides full-stack software and app development for digital products.",
    industry: "App Development",
    domain: "700apps.com",
    linkedin: "linkedin/700apps",
  },
};

export function getCompanyInfo(name: string): CompanyInfo {
  if (MOCK_COMPANIES[name]) return MOCK_COMPANIES[name];
  const clean = name.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return {
    name,
    description: `${name} is an established organization providing innovative solutions and leading industry services.`,
    industry: "Technology & Professional Services",
    domain: `${clean}.com`,
    linkedin: `linkedin/${clean}`,
  };
}

interface CompanyDetailModalProps {
  companyName: string | null;
  onClose: () => void;
}

export function CompanyDetailModal({
  companyName,
  onClose,
}: CompanyDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (companyName) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [companyName, onClose]);

  if (!companyName) return null;

  const info = getCompanyInfo(companyName);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[380px] bg-[#F6F8F7] border border-[#D3DEDB] rounded-lg p-5 shadow-2xl relative text-[#10201C]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-[#10201C] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header: Avatar + Company Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white border border-[#D3DEDB] p-[1px] flex items-center justify-center shrink-0 shadow-xs">
            <div className="w-full h-full rounded-md bg-linear-to-b from-[#0D8C7C] via-[#14B39F] to-[#6D5BD0] flex items-center justify-center text-white text-xs font-bold font-mono">
              {info.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <h3 className="text-base font-medium text-[#10201C] tracking-tight">
            {info.name}
          </h3>
        </div>

        {/* Company Description */}
        <p className="text-xs text-[#10201C] font-mono leading-relaxed mt-4 mb-5">
          {info.description}
        </p>

        {/* Metadata Details */}
        <div className="space-y-3 pt-1 border-t border-[#D3DEDB]/60">
          {/* Industry */}
          <div className="flex items-center gap-3 text-xs font-mono text-black">
            <Factory className="w-4 h-4 text-[#10201C] shrink-0" />
            <span className="truncate">{info.industry}</span>
          </div>

          {/* Website Link */}
          <div className="flex items-center gap-3 text-xs font-mono text-black">
            <LinkIcon className="w-4 h-4 text-[#10201C] shrink-0" />
            <a
              href={`https://${info.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#0D8C7C] truncate"
            >
              {info.domain}
            </a>
          </div>

          {/* LinkedIn Link */}
          <div className="flex items-center gap-3 text-xs font-mono text-black">
            <svg
              className="w-4 h-4 text-[#10201C] shrink-0 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 1 0 0-3.38 1.69 1.69 0 0 0 0 3.38m1.39 9.74v-8.37H5.07v8.37h2.78z" />
            </svg>
            <span className="underline hover:text-[#0D8C7C] truncate cursor-pointer">
              {info.linkedin}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
