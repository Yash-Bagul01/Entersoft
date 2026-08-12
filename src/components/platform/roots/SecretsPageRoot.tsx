"use client";

import React from "react";
import ThayonSecrets_Hero from "@/components/platform/secrets/ThayonSecrets_Hero";
import ThayonSecrets_Marquee from "@/components/platform/secrets/ThayonSecrets_Marquee";
import ThayonSecrets_Thesis from "@/components/platform/secrets/ThayonSecrets_Thesis";
import ThayonSecrets_Engagements from "@/components/platform/secrets/ThayonSecrets_Engagements";
import ThayonSecrets_TrackRecord from "@/components/platform/secrets/ThayonSecrets_TrackRecord";
import ThayonSecrets_LiveSimulator from "@/components/platform/secrets/ThayonSecrets_LiveSimulator";
import ThayonSecrets_IntelligenceLead from "@/components/platform/secrets/ThayonSecrets_IntelligenceLead";
import ThayonSecrets_FAQ from "@/components/platform/secrets/ThayonSecrets_FAQ";
import ThayonSecrets_BottomCTA from "@/components/platform/secrets/ThayonSecrets_BottomCTA";
import LightFooter from "@/components/layout/LightFooter";

export default function SecretsPageRoot() {
  return (
    <div className="w-full bg-[#FAFCFF] text-slate-900 selection:bg-blue-600 selection:text-white font-sans min-h-screen">
      {/* 1. HERO SECTION (Atmospheric Luminous Halo + Crosshair Guides + Terminal Preview) */}
      <ThayonSecrets_Hero />

      {/* 2. INFINITE PROVIDER TICKER (850+ Secret Ecosystems) */}
      <ThayonSecrets_Marquee />

      {/* 3. OUR THESIS (Dark Seamless Panel with Crosshairs & 3 Problem Columns) */}
      <ThayonSecrets_Thesis />

      {/* 4. ARCHITECTURAL DEPLOYMENT (Tree Connector Branches + Dual Layer Cards) */}
      <ThayonSecrets_Engagements />

      {/* 5. TRACK RECORD (Interactive Case Studies & Real Incident Learnings) */}
      <ThayonSecrets_TrackRecord />

      {/* 6. LIVE SCANNER & VALIDITY SIMULATOR (Interactive Sandbox & Redaction) */}
      <ThayonSecrets_LiveSimulator />

      {/* 7. INTELLIGENCE LEAD & TESTIMONIAL (Framed Dark Box Manifesto) */}
      <ThayonSecrets_IntelligenceLead />

      {/* 8. MINIMALIST FAQ ACCORDION */}
      <ThayonSecrets_FAQ />

      {/* 9. BOLD EDITORIAL CLOSING STATEMENT & ACTION PILLARS */}
      <ThayonSecrets_BottomCTA />

      {/* 10. BRIGHT THEME LIGHT FOOTER */}
      <LightFooter />
    </div>
  );
}
