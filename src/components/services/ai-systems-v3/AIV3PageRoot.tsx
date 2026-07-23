"use client";

import React, { useEffect } from "react";
import AIV3_Hero from "./sections/AIV3_Hero";
import AIV3_MarqueeDivider from "./sections/AIV3_MarqueeDivider";
import AIV3_StackPillars from "./sections/AIV3_StackPillars";
import AIV3_LiveInjectionSandbox from "./sections/AIV3_LiveInjectionSandbox";
import AIV3_ThreatScopeGrid from "./sections/AIV3_ThreatScopeGrid";
import AIV3_ArchitectureScan from "./sections/AIV3_ArchitectureScan";
import AIV3_AuditWorkflow from "./sections/AIV3_AuditWorkflow";
import AIV3_EvidenceBenchmark from "./sections/AIV3_EvidenceBenchmark";
import AIV3_Close from "./sections/AIV3_Close";

export default function AIV3PageRoot() {
  useEffect(() => {
    document.documentElement.setAttribute("data-page", "ai-ast");

    return () => {
      document.documentElement.removeAttribute("data-page");
    };
  }, []);

  return (
    <div
      data-page="ai-ast"
      id="ai-ast-root"
      className="w-full bg-[#060606] text-[#F6F5F0] flex flex-col relative select-none"
    >
      <AIV3_Hero />
      <AIV3_MarqueeDivider />
      <AIV3_StackPillars />
      <AIV3_LiveInjectionSandbox />
      <AIV3_ThreatScopeGrid />
      <AIV3_ArchitectureScan />
      <AIV3_AuditWorkflow />
      <AIV3_EvidenceBenchmark />
      <AIV3_Close />
    </div>
  );
}
