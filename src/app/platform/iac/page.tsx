import React from "react";
import type { Metadata } from "next";
import Iac_Hero from "@/components/platform/iac/Iac_Hero";
import Iac_CoreCapabilities from "@/components/platform/iac/Iac_CoreCapabilities";
import Iac_InteractiveTerminal from "@/components/platform/iac/Iac_InteractiveTerminal";
import Iac_WorkflowTimeline from "@/components/platform/iac/Iac_WorkflowTimeline";
import Iac_MetricsProof from "@/components/platform/iac/Iac_MetricsProof";
import Iac_FAQ from "@/components/platform/iac/Iac_FAQ";
import Iac_FinalCTA from "@/components/platform/iac/Iac_FinalCTA";

export const metadata: Metadata = {
  title: "Infrastructure as Code (IaC) Security — EnProbe Platform | Entersoft",
  description:
    "Deterministic Infrastructure as Code security scanning Terraform, CloudFormation, Helm, and Kubernetes manifests with OPA policy-as-code guardrails and automated drift prevention.",
  openGraph: {
    title: "Infrastructure as Code (IaC) Security | Entersoft EnProbe",
    description:
      "Deterministic Infrastructure as Code security scanning Terraform, CloudFormation, Helm, and Kubernetes manifests before cloud provisioning.",
    type: "website",
  },
};

export default function IacPage() {
  return (
    <main className="min-h-screen bg-[#060609] text-white selection:bg-[#8B5CF6]/30 selection:text-white">
      {/* 1. Hero with WebGL Iridescence Shader Background & Aura Typography */}
      <Iac_Hero />

      {/* 2. Core Capabilities (Aura Service Highlights 4-Card Grid) */}
      <Iac_CoreCapabilities />

      {/* 3. Interactive Code Inspector & Policy Simulator (AST Engine with Live Diff) */}
      <Iac_InteractiveTerminal />

      {/* 4. 4-Stage Pre-Deployment Defense Pipeline */}
      <Iac_WorkflowTimeline />

      {/* 5. Empirical Benchmarks & Multi-Cloud Coverage Proof */}
      <Iac_MetricsProof />

      {/* 6. Frequently Asked Questions */}
      <Iac_FAQ />

      {/* 7. Bottom High-Impact Conversion Launchpad */}
      <Iac_FinalCTA />
    </main>
  );
}
