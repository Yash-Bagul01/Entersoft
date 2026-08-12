"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Code2, GitPullRequest, RefreshCw } from "lucide-react";

interface Capability {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  gradient: string;
  borderGlow: string;
}

const CAPABILITIES: Capability[] = [
  {
    id: "misconfig",
    number: "01",
    title: "IaC Misconfiguration Engine",
    subtitle: "Deep AST Parsing & Risk Detection",
    description:
      "Deep Abstract Syntax Tree parsing across Terraform, CloudFormation, Helm, and K8s manifests to detect over-permissioned IAM, open security groups, and unencrypted storage before provisioning.",
    icon: <ShieldAlert className="w-6 h-6 text-[#93C5FD]" />,
    tags: ["Terraform", "CloudFormation", "Kubernetes", "Helm"],
    gradient: "from-[#1E3A8A]/25 via-[#1E1B4B]/15 to-transparent",
    borderGlow: "group-hover:border-[#3B82F6]/60 group-hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]",
  },
  {
    id: "policy",
    number: "02",
    title: "Policy as Code (OPA)",
    subtitle: "Deterministic Rego Rule Execution",
    description:
      "Enforce deterministic Open Policy Agent (OPA) guardrails, CIS multi-cloud benchmarks, and custom corporate compliance policies directly inside developer pull requests.",
    icon: <Code2 className="w-6 h-6 text-[#C4B5FD]" />,
    tags: ["Rego Rules", "CIS Benchmarks", "NIST 800-53", "SOC 2"],
    gradient: "from-[#5B21B6]/25 via-[#1E1B4B]/15 to-transparent",
    borderGlow: "group-hover:border-[#8B5CF6]/60 group-hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]",
  },
  {
    id: "gatekeeping",
    number: "03",
    title: "Pre-Deployment CI/CD Gate",
    subtitle: "Zero-Trust Release Blocker",
    description:
      "Automated pull-request blockers and gatekeeping that stop non-compliant infrastructure declarations from ever reaching live cloud environments, with inline remediation diffs.",
    icon: <GitPullRequest className="w-6 h-6 text-[#6EE7B7]" />,
    tags: ["GitHub Actions", "GitLab CI", "Bitbucket", "Azure DevOps"],
    gradient: "from-[#065F46]/25 via-[#1E1B4B]/15 to-transparent",
    borderGlow: "group-hover:border-[#10B981]/60 group-hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]",
  },
  {
    id: "drift",
    number: "04",
    title: "Continuous Drift Prevention",
    subtitle: "Declared vs. Runtime Reconciliation",
    description:
      "Continuous delta reconciliation between declared Git state and live AWS/Azure/GCP runtime configurations, instantly catching manual console changes and shadow infrastructure.",
    icon: <RefreshCw className="w-6 h-6 text-[#FDE68A]" />,
    tags: ["AWS CSPM", "Azure RM", "GCP Config", "State Sync"],
    gradient: "from-[#92400E]/25 via-[#1E1B4B]/15 to-transparent",
    borderGlow: "group-hover:border-[#F59E0B]/60 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]",
  },
];

export default function Iac_CoreCapabilities() {
  return (
    <section
      id="capabilities"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#060609] text-[#FFFFFF] border-t border-white/[0.08] overflow-hidden isolate"
    >
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#3B82F6]/10 via-[#8B5CF6]/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-[1360px] mx-auto">
        {/* Section Header (Aura Minimalist Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C4B5FD] block mb-3 font-semibold">
              // CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal tracking-tight leading-[1.1] text-[#FFFFFF]">
              Deterministic Security for Modern Cloud Stacks
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#A1A1AA] font-normal max-w-md leading-relaxed">
            Eliminate misconfigurations at the source code layer before Terraform or Kubernetes manifests ever touch cloud APIs.
          </p>
        </div>

        {/* 4-Card Service Highlights Grid (Exact Aura Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((cap, idx) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              className={`group relative p-7 sm:p-8 rounded-2xl border border-white/[0.14] bg-[#0C0C12]/90 backdrop-blur-xl transition-all duration-500 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 shadow-lg ${cap.borderGlow}`}
            >
              {/* Card Ambient Gradient Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cap.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Top Row: Number & Icon Badge */}
              <div className="relative z-10 flex items-center justify-between mb-8">
                <span className="font-mono text-xs text-white/50 tracking-wider font-semibold">
                  [{cap.number}]
                </span>
                <div className="w-11 h-11 rounded-xl border border-white/[0.2] bg-white/[0.06] flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-sm">
                  {cap.icon}
                </div>
              </div>

              {/* Center Content: Title & Description */}
              <div className="relative z-10 my-auto">
                <h3 className="text-xl sm:text-2xl font-sans font-medium tracking-tight text-[#FFFFFF] mb-2 group-hover:text-white transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs font-mono text-[#C4B5FD] mb-4 font-medium">
                  {cap.subtitle}
                </p>
                <p className="text-sm text-[#D4D4D8] font-normal leading-relaxed">
                  {cap.description}
                </p>
              </div>

              {/* Bottom Tags Strip */}
              <div className="relative z-10 pt-6 mt-8 border-t border-white/[0.1] flex flex-wrap items-center gap-1.5">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md border border-white/[0.12] bg-white/[0.04] text-[11px] font-mono text-[#E4E4E7] group-hover:border-white/30 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
