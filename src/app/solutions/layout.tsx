"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isSolutionLandingPath } from "@/data/solutionLandings";

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLanding = isSolutionLandingPath(pathname);

  useEffect(() => {
    if (!isLanding) return;
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    if (pathname === "/solutions/api-discovery") {
      document.documentElement.setAttribute("data-page", "api-discovery");
    }
    if (pathname === "/solutions/ai-bom") {
      document.documentElement.setAttribute("data-page", "ai-bom");
    }
    if (pathname === "/solutions/manage-vulnerabilities") {
      document.documentElement.setAttribute("data-page", "manage-vuln");
    }
    if (pathname === "/solutions/automate-security-workflows") {
      document.documentElement.setAttribute("data-page", "automate-flow");
    }
    if (pathname === "/solutions/track-appsec-kpis") {
      document.documentElement.setAttribute("data-page", "track-kpis");
    }
    if (pathname === "/solutions/manage-open-source-risk") {
      document.documentElement.setAttribute("data-page", "open-source");
    }
    return () => {
      document.documentElement.removeAttribute("data-theme");
      if (
        pathname === "/solutions/api-discovery" ||
        pathname === "/solutions/ai-bom" ||
        pathname === "/solutions/manage-vulnerabilities" ||
        pathname === "/solutions/automate-security-workflows" ||
        pathname === "/solutions/track-appsec-kpis" ||
        pathname === "/solutions/manage-open-source-risk"
      ) {
        document.documentElement.removeAttribute("data-page");
      }
    };
  }, [isLanding, pathname]);

  if (!isLanding) return children;

  const isApiDiscovery = pathname === "/solutions/api-discovery";
  const isAiBom = pathname === "/solutions/ai-bom";
  const isManageVuln = pathname === "/solutions/manage-vulnerabilities";
  const isAutomate = pathname === "/solutions/automate-security-workflows";
  const isTrackKpis = pathname === "/solutions/track-appsec-kpis";
  const isOpenSource = pathname === "/solutions/manage-open-source-risk";

  return (
    <div
      data-page={
        isApiDiscovery
          ? "api-discovery"
          : isAiBom
            ? "ai-bom"
            : isManageVuln
              ? "manage-vuln"
              : isAutomate
                ? "automate-flow"
                : isTrackKpis
                  ? "track-kpis"
                  : isOpenSource
                    ? "open-source"
                    : "solution-landing"
      }
      className={
        isTrackKpis
          ? "min-h-screen bg-[#f6f5f0] text-[#111111]"
          : isApiDiscovery || isOpenSource
            ? "min-h-screen bg-[#ffffff] text-[#121212]"
            : isAiBom || isManageVuln || isAutomate
              ? "min-h-screen bg-[#ffffff] text-[#111111]"
              : "min-h-screen bg-[#f6f5f0] text-[#12141a]"
      }
    >
      {children}
    </div>
  );
}
