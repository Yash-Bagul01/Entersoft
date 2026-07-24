"use client";

import React, { useEffect } from "react";
import CDambientGlow from "./CDambientGlow";
import CD0_Hero from "./sections/CD0_Hero";
import CD1_AlertStream from "./sections/CD1_AlertStream";
import CD2_MetricsStrip from "./sections/CD2_MetricsStrip";
import CD_PinnedNarrative from "./sections/CD_PinnedNarrative";
import CD3_DetectionEngine from "./sections/CD3_DetectionEngine";
import CD4_CoverageGrid from "./sections/CD4_CoverageGrid";
import CD5_ResponseTimeline from "./sections/CD5_ResponseTimeline";
import CD_ComparisonBlock from "./sections/CD_ComparisonBlock";
import CD6_TechMarquee from "./sections/CD6_TechMarquee";
import CD7_ProofNumbers from "./sections/CD7_ProofNumbers";
import CD8_GlowCTA from "./sections/CD8_GlowCTA";

export default function CDPageRoot() {
  useEffect(() => {
    const prevTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.setAttribute("data-page", "cyber-defense");
    document.documentElement.setAttribute("data-grain-heavy", "true");

    return () => {
      if (prevTheme) {
        document.documentElement.setAttribute("data-theme", prevTheme);
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      document.documentElement.removeAttribute("data-page");
      document.documentElement.removeAttribute("data-grain-heavy");
    };
  }, []);

  return (
    <div
      id="cyber-defense-root"
      data-page="cyber-defense"
      data-grain-heavy="true"
      className="w-full min-h-screen bg-[#060606] text-[#f6f5f0] relative flex flex-col overflow-x-hidden"
    >
      {/* Subtle Ambient Glow */}
      <CDambientGlow />

      {/* Direct Seamless Section Flow */}
      <CD0_Hero />
      <CD1_AlertStream />
      <CD2_MetricsStrip />
      <CD_PinnedNarrative />
      <CD3_DetectionEngine />
      <CD4_CoverageGrid />
      <CD5_ResponseTimeline />
      <CD_ComparisonBlock />
      <CD6_TechMarquee />
      <CD7_ProofNumbers />
      <CD8_GlowCTA />
    </div>
  );
}
