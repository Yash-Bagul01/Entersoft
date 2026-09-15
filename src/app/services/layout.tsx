"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { services } from "@/data/services";
import { getServiceKeyFromSlug, getServiceRoute } from "@/config/routes";
import { isServiceCasePath } from "@/data/serviceCases";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCase = pathname === "/services" || isServiceCasePath(pathname);

  useEffect(() => {
    if (!isCase) return;
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, [isCase]);

  if (isCase) {
    return (
      <div data-page="solution-case" className="min-h-screen bg-[#0b0b0d] text-white">
        {children}
      </div>
    );
  }

  const pathSegments = pathname.split("/").filter(Boolean);
  const currentSlug = pathSegments[pathSegments.length - 1] || "";
  const isCloud =
    pathname.startsWith("/services/cloud-resilience") ||
    pathname.startsWith("/services/cloud-security") ||
    currentSlug === "cloud-resilience" ||
    currentSlug === "cloud-security" ||
    currentSlug === "managed-cloud-security";
  const currentKey = isCloud ? "cloud-resilience" : getServiceKeyFromSlug(currentSlug);

  const noPadding =
    currentSlug === "vapt" ||
    currentSlug === "penetration-testing" ||
    currentSlug === "appsec" ||
    currentSlug === "application-security-testing" ||
    isCloud ||
    currentSlug === "compliance-management" ||
    currentSlug === "grc-compliance-privacy" ||
    currentSlug === "smart-contract-audits" ||
    currentSlug === "smart-contract-security" ||
    currentSlug === "siem" ||
    currentSlug === "managed-detection-response" ||
    currentSlug === "ai-ast" ||
    currentSlug === "ai-security-testing";
  const isAiAst = currentSlug === "ai-ast" || currentSlug === "ai-security-testing";

  const otherServices = services.filter(
    (item) => item.slug !== currentKey
  );

  return (
    <div className={`w-full ${isAiAst ? "bg-[#05070F] text-[#F0F4FF] service-page-container" : "bg-[var(--bg-primary)]"} min-h-[80vh] flex flex-col justify-between ${noPadding ? "" : "pt-16 md:pt-20"}`}>
      <div className={`flex-1 flex flex-col ${noPadding ? "" : "pt-12"}`}>
        {children}
      </div>

      {!isAiAst && (
        <nav className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 backdrop-blur-sm py-8 relative z-20 mt-16 md:mt-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-4">
            <span className="font-mono text-[9px] font-bold text-[var(--text-secondary)] tracking-widest uppercase">
              Explore Services
            </span>
            <div className="flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-3 font-mono text-[10px] font-bold uppercase tracking-wider">
              {otherServices.map((service, index) => (
                <React.Fragment key={service.slug}>
                  {index > 0 && <span className="hidden md:inline text-[var(--border-subtle)] select-none">·</span>}
                  <Link
                    href={getServiceRoute(service.slug)}
                    className="text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-300"
                  >
                    {service.displayName}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
