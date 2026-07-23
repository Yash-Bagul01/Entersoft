"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const OTHER_SERVICES = [
  { name: "APPLICATION ASSURANCE", href: "/services/appsec" },
  { name: "ADVERSARIAL VALIDATION", href: "/services/vapt" },
  { name: "CLOUD RESILIENCE", href: "/services/managed-cloud-security" },
  { name: "DIGITAL TRUST", href: "/services/compliance-management" },
  { name: "CYBER DEFENSE OPERATIONS", href: "/services/siem" },
  { name: "PROTOCOL ASSURANCE", href: "/services/smart-contract-audits" },
  { name: "AI SYSTEMS ASSURANCE", href: "/services/ai-ast" },
];

export default function InterServiceNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-[#060606] border-b border-[var(--border-subtle)] py-12 px-6 md:px-12 select-none">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-6">
        <div className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-[0.2em]">
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
                    ? "text-[#00A3FF] border-b border-[#00A3FF] pb-1"
                    : "text-[var(--text-secondary)] hover:text-[#F6F5F0]"
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
