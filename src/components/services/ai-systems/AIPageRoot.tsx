"use client";

import React, { useEffect } from "react";
import TokenStreamAmbient from "./canvas/TokenStreamAmbient";
import AI0_Hero from "./sections/AI0_Hero";
import WordStackTransition from "./sections/WordStackTransition";
import AI1_AttackSurface from "./sections/AI1_AttackSurface";
import AI2_InjectionDemo from "./sections/AI2_InjectionDemo";
import AI3_AuditSweep from "./sections/AI3_AuditSweep";
import AI4_ValidationField from "./sections/AI4_ValidationField";
import AI5_ThreatAccordion from "./sections/AI5_ThreatAccordion";
import AI6_Evidence from "./sections/AI6_Evidence";
import AI7_Close from "./sections/AI7_Close";

export default function AIPageRoot() {
  useEffect(() => {
    document.documentElement.setAttribute("data-page", "ai-ast");

    return () => {
      document.documentElement.removeAttribute("data-page");
    };
  }, []);

  return (
    <div
      id="ai-ast-container"
      className="w-full bg-[#060606] flex flex-col relative text-[#F6F5F0]"
    >
      {/* Persistent Ambient Token Stream Canvas (Section 1 onward) */}
      <TokenStreamAmbient />

      {/* Sections */}
      <AI0_Hero />
      <WordStackTransition />
      <AI1_AttackSurface />
      <AI2_InjectionDemo />
      <AI3_AuditSweep />
      <AI4_ValidationField />
      <AI5_ThreatAccordion />
      <AI6_Evidence />
      <AI7_Close />
    </div>
  );
}
