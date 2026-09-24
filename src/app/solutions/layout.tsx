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
    return () => {
      document.documentElement.removeAttribute("data-theme");
      if (
        pathname === "/solutions/api-discovery" ||
        pathname === "/solutions/ai-bom" ||
        pathname === "/solutions/manage-vulnerabilities"
      ) {
        document.documentElement.removeAttribute("data-page");
      }
    };
  }, [isLanding, pathname]);

  if (!isLanding) return children;

  const isApiDiscovery = pathname === "/solutions/api-discovery";
  const isAiBom = pathname === "/solutions/ai-bom";
  const isManageVuln = pathname === "/solutions/manage-vulnerabilities";

  return (
    <div
      data-page={
        isApiDiscovery
          ? "api-discovery"
          : isAiBom
            ? "ai-bom"
            : isManageVuln
              ? "manage-vuln"
              : "solution-landing"
      }
      className={
        isApiDiscovery
          ? "min-h-screen bg-[#ffffff] text-[#121212]"
          : isAiBom || isManageVuln
            ? "min-h-screen bg-[#ffffff] text-[#111111]"
            : "min-h-screen bg-[#f6f5f0] text-[#12141a]"
      }
    >
      {children}
    </div>
  );
}
