"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitBranch, Search, ShieldCheck, GitMerge, CheckCircle2 } from "lucide-react";

interface WorkflowStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

const STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "Manifest Ingestion",
    subtitle: "Git Push & Webhook Trigger",
    description:
      "Connect seamlessly to GitHub, GitLab, Bitbucket, and Azure DevOps to ingest HCL, YAML, and JSON infrastructure declarations on every commit.",
    icon: <GitBranch className="w-6 h-6 text-[#93C5FD]" />,
    details: ["Native Git Webhooks", "Zero Agent Footprint", "Multi-Repo Batching"],
  },
  {
    step: "02",
    title: "AST Policy Evaluation",
    subtitle: "Deterministic OPA Engine",
    description:
      "Parse deep Abstract Syntax Trees to evaluate resource dependencies, IAM policies, network bindings, and encryption parameters against CIS & NIST baselines.",
    icon: <Search className="w-6 h-6 text-[#C4B5FD]" />,
    details: ["350+ Pre-Built Rego Rules", "Sub-2s Scan Latency", "Custom Corporate Guardrails"],
  },
  {
    step: "03",
    title: "Deployment Gatekeeping",
    subtitle: "CI/CD Pull Request Blocker",
    description:
      "Automatically gate staging and production deployments. Fail builds containing critical misconfigurations and post inline remediation comments to PRs.",
    icon: <ShieldCheck className="w-6 h-6 text-[#6EE7B7]" />,
    details: ["Inline PR Reviews", "Granular Security Gates", "Zero False Positive Proof"],
  },
  {
    step: "04",
    title: "Automated Remediation",
    subtitle: "One-Click Non-Breaking PRs",
    description:
      "Dispatch cryptographically signed pull requests with exact HCL/YAML fixes to resolve vulnerabilities without breaking production dependencies.",
    icon: <GitMerge className="w-6 h-6 text-[#FDE68A]" />,
    details: ["Instant Auto-Fix Snippets", "Drift Reconciliation", "Audit-Ready Trail"],
  },
];

export default function Iac_WorkflowTimeline() {
  return (
    <section
      id="workflow"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#060609] text-[#FFFFFF] border-t border-white/[0.08] overflow-hidden isolate"
    >
      {/* Background Lighting Elements */}
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[350px] bg-gradient-to-r from-[#8B5CF6]/15 to-[#3B82F6]/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C4B5FD] block mb-3 font-semibold">
              // HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal tracking-tight leading-[1.1] text-[#FFFFFF]">
              The 4-Stage Pre-Deployment Defense Pipeline
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#A1A1AA] font-normal max-w-md leading-relaxed">
            From local developer commit to multi-cloud production release, EnProbe IaC acts as an automated security sentinel.
          </p>
        </div>

        {/* 4 Steps Horizontal Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((st, idx) => (
            <motion.div
              key={st.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="group relative p-7 sm:p-8 rounded-2xl border border-white/[0.14] bg-[#0C0C12]/90 backdrop-blur-xl hover:border-white/35 hover:bg-[#12121B] transition-all duration-500 flex flex-col justify-between shadow-lg"
            >
              {/* Step Number & Icon */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                  {st.step}
                </span>
                <div className="w-12 h-12 rounded-xl border border-white/20 bg-white/[0.05] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  {st.icon}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl font-sans font-medium text-[#FFFFFF] mb-1.5 group-hover:text-white transition-colors">
                  {st.title}
                </h3>
                <span className="text-xs font-mono text-[#93C5FD] block mb-3 font-medium">
                  {st.subtitle}
                </span>
                <p className="text-sm text-[#D4D4D8] font-normal leading-relaxed mb-6">
                  {st.description}
                </p>
              </div>

              {/* Details Bullet List */}
              <div className="pt-6 border-t border-white/[0.1] space-y-2">
                {st.details.map((d) => (
                  <div key={d} className="flex items-center gap-2 text-xs font-mono text-[#E4E4E7]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
