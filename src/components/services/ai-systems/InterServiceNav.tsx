"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getServiceRoute } from "@/config/routes";

const OTHER_SERVICES = [
  { name: "APPLICATION ASSURANCE", href: getServiceRoute("appsec") },
  { name: "ADVERSARIAL VALIDATION", href: getServiceRoute("vapt") },
  { name: "CLOUD RESILIENCE", href: getServiceRoute("cloud-resilience") },
  { name: "DIGITAL TRUST", href: getServiceRoute("compliance-management") },
  { name: "CYBER DEFENSE OPERATIONS", href: getServiceRoute("siem") },
  { name: "PROTOCOL ASSURANCE", href: getServiceRoute("smart-contract-audits") },
  { name: "AI SYSTEMS ASSURANCE", href: getServiceRoute("ai-ast") },
];

export default function InterServiceNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full inter-service-nav bg-[#05070F] border-b border-[rgba(255,255,255,0.1)] py-12 px-6 md:px-12 select-none relative z-10 text-[#F0F4FF]">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-6">
        <div className="font-mono text-[10px] text-[#9c9c97] uppercase tracking-[0.2em]">
          EXPLORE ENTERSOFT SERVICES
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4 items-center">
          {OTHER_SERVICES.map((s) => {
            const isActive = pathname === s.href;
            return (
              <Link
                key={s.href}
                href={s.href}
                data-cursor="link"
                className={`font-mono text-xs md:text-sm font-semibold tracking-wider transition-colors duration-200 ${
                  isActive
                    ? "text-[#CCFF33] border-b border-[#CCFF33] pb-1"
                    : "text-[#9c9c97] hover:text-[#F0F4FF]"
                }`}
              >
                {s.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
