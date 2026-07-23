"use client";

import React, { useEffect } from "react";
import AIS_Hero from "./sections/AIS_Hero";
import AIS_NumberStatement from "./sections/AIS_NumberStatement";
import AI1_AttackSurface from "../ai-systems/sections/AI1_AttackSurface";
import AI2_InjectionDemo from "../ai-systems/sections/AI2_InjectionDemo";
import AIS_Marquee from "./sections/AIS_Marquee";
import AIS_CasePanels from "./sections/AIS_CasePanels";
import AI3_AuditSweep from "../ai-systems/sections/AI3_AuditSweep";
import AIS_ProcessSteps from "./sections/AIS_ProcessSteps";
import AIS_AuditStatement from "./sections/AIS_AuditStatement";
import AIS_StackedCTA from "./sections/AIS_StackedCTA";
import InterServiceNav from "../ai-systems/InterServiceNav";

export default function AISPageRoot() {
  useEffect(() => {
    document.documentElement.setAttribute("data-page", "ai-systems");

    return () => {
      document.documentElement.removeAttribute("data-page");
    };
  }, []);

  return (
    <div
      data-page="ai-systems"
      id="ai-systems-container"
      className="w-full bg-[#080808] text-[#F5F5F5] flex flex-col relative select-none"
    >
      {/* 0. Hero with TokenStream canvas & bymonolog split statement */}
      <AIS_Hero />

      {/* 1. Number Statement with 847->12 particle filter canvas */}
      <AIS_NumberStatement />

      {/* 2. Attack Surface with 8-node vertical flow diagram */}
      <AI1_AttackSurface />

      {/* 3. Adversarial Prompt Injection typewriter terminal & 12x12 attention heatmap */}
      <AI2_InjectionDemo />

      {/* 4. Wolverine dual text marquee */}
      <AIS_Marquee />

      {/* 5. 8 Threat Case Files with expand accordion */}
      <AIS_CasePanels />

      {/* 6. Audit Methodology with GSAP scrubbed scan beam */}
      <AI3_AuditSweep />

      {/* 7. Process Steps (SCAN. VALIDATE. SECURE.) */}
      <AIS_ProcessSteps />

      {/* 8. Audit Statement Poem */}
      <AIS_AuditStatement />

      {/* 9. Stacked Display CTA */}
      <AIS_StackedCTA />

      {/* Hairline Divider & InterServiceNav */}
      <div className="w-full h-[1px] bg-[var(--line)]" />
      <InterServiceNav />
    </div>
  );
}
