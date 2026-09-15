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
    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, [isLanding]);

  if (!isLanding) return children;

  return (
    <div data-page="solution-landing" className="min-h-screen bg-[#f6f5f0] text-[#12141a]">
      {children}
    </div>
  );
}
