"use client";

import React, { useEffect } from "react";
import AmbientGlow from "./AmbientGlow";
import AZ0_Hero from "./sections/AZ0_Hero";
import AZ1_MetricsStrip from "./sections/AZ1_MetricsStrip";
import AZ2_BentoThreats from "./sections/AZ2_BentoThreats";
import AZ3_AssessProcess from "./sections/AZ3_AssessProcess";
import AZ4_StackCoverage from "./sections/AZ4_StackCoverage";
import AZ5_ProofNumbers from "./sections/AZ5_ProofNumbers";
import AZ6_TechMarquee from "./sections/AZ6_TechMarquee";
import AZ7_GlowCTA from "./sections/AZ7_GlowCTA";
import InterServiceNav from "@/components/services/ai-systems/InterServiceNav";

export default function AZPageRoot() {
  useEffect(() => {
    document.documentElement.setAttribute("data-page", "ai-zkpass");

    return () => {
      document.documentElement.removeAttribute("data-page");
    };
  }, []);

  return (
    <div
      data-page="ai-zkpass"
      id="ai-zkpass-root"
      className="w-full relative text-[#F0F4FF] overflow-x-hidden select-none bg-[#05070F]"
      style={{
        // CSS variables extracted directly from zkpass.org design system
        // @ts-ignore
        "--zk-bg": "#05070F",
        "--zk-surface": "#0B0E1A",
        "--zk-surface-2": "#111525",
        "--zk-border": "rgba(204, 255, 51, 0.12)",
        "--zk-border-glow": "rgba(204, 255, 51, 0.45)",
        "--zk-text": "#F0F4FF",
        "--zk-text-dim": "rgba(240, 244, 255, 0.50)",
        "--zk-text-dimmer": "rgba(240, 244, 255, 0.28)",
        "--zk-neon": "#CCFF33",
        "--zk-glow": "rgba(204, 255, 51, 0.22)",
        "--zk-glow-strong": "rgba(204, 255, 51, 0.45)",
        "--zk-gradient-text": "linear-gradient(90deg, #CCFF33 0%, #F0F4FF 60%)",
      }}
    >
      {/* Fixed Drifting Ambient Background Glow Blobs */}
      <AmbientGlow />

      {/* Page Sections (positioned relative z-10 above fixed ambient glow) */}
      <div className="relative z-10 flex flex-col">
        <AZ0_Hero />
        <AZ1_MetricsStrip />
        <AZ2_BentoThreats />
        <AZ3_AssessProcess />
        <AZ4_StackCoverage />
        <AZ5_ProofNumbers />
        <AZ6_TechMarquee />
        <AZ7_GlowCTA />
        <InterServiceNav />
      </div>
    </div>
  );
}
