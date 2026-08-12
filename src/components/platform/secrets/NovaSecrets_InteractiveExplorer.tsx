"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Key, RefreshCw, CheckCircle2, Lock, Zap, ArrowRight, ShieldAlert, Cpu } from "lucide-react";
import Link from "next/link";

interface ExplorerStage {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  lead: string;
  description: string;
  telemetry: {
    target: string;
    location: string;
    entropy: string;
    issuer: string;
    validity: string;
    remediationAction: string;
  };
  metrics: { label: string; value: string }[];
}

const stages: ExplorerStage[] = [
  {
    id: "pre-commit",
    tabLabel: "01 / Pre-Commit Shield",
    badge: "WORKSTATION INTERCEPTION",
    title: "Sub-Second Pre-Commit Hook Gatekeeper",
    lead: "Block compromised credentials before they leave the developer machine.",
    description: "EnProbe hooks seamlessly into local git commits and pull request checks. High-entropy strings and recognized API signatures are intercepted in memory within 240ms, providing developers with clear inline remediation guidance.",
    telemetry: {
      target: "Stripe Production Restricted Key",
      location: "src/services/billing.ts:42",
      entropy: "7.94 / 8.0 [Critical]",
      issuer: "Stripe API v1",
      validity: "Active Live Key (Charges Enabled)",
      remediationAction: "Pre-receive Git hook rejected commit. Secret isolated."
    },
    metrics: [
      { label: "Scan Latency", value: "< 240ms" },
      { label: "Commit Impact", value: "0% Overhead" },
      { label: "Supported VCS", value: "GitHub, GitLab, Bitbucket" }
    ]
  },
  {
    id: "git-forensics",
    tabLabel: "02 / Git Graph Forensics",
    badge: "HISTORICAL RECURSION",
    title: "Deep Commit Tree & Reflog Forensics",
    lead: "Uncover legacy credentials buried in historical merge commits and orphan tags.",
    description: "Over 60% of leaked credentials exist in old commits and forgotten test branches. EnProbe recursively traverses your entire commit history to identify legacy exposed keys and generates automated BFG scripts to clean repositories.",
    telemetry: {
      target: "AWS IAM Secret Access Key",
      location: "deploy/legacy-deploy.sh (Commit: 4b9f1a8)",
      entropy: "7.82 / 8.0 [High]",
      issuer: "AWS IAM Identity Center",
      validity: "Active Root Admin Scope",
      remediationAction: "Generated automated Git Filter-Repo BFG cleanup script."
    },
    metrics: [
      { label: "Audit Speed", value: "10k Commits / Sec" },
      { label: "Branch Depth", value: "All Branches & Tags" },
      { label: "Cleanup", value: "Automated BFG Scripts" }
    ]
  },
  {
    id: "active-sandbox",
    tabLabel: "03 / Active Issuer Sandbox",
    badge: "100% TRUE POSITIVES",
    title: "Sandboxed Upstream Issuer Proof",
    lead: "Direct live API verification to eliminate false alarms and confirm actual exploitability.",
    description: "Never waste engineering time triaging harmless dummy test strings. EnProbe safely verifies detected tokens in an isolated ephemeral sandbox against third-party issuers to confirm whether the credential is valid.",
    telemetry: {
      target: "OpenAI Enterprise API Token",
      location: "internal/ai-agents/config.json:18",
      entropy: "7.91 / 8.0 [Critical]",
      issuer: "OpenAI API Endpoint",
      validity: "HTTP 200 OK — Live Organization Key",
      remediationAction: "Dispatched immediate SOC alert & automated key rotation."
    },
    metrics: [
      { label: "Accuracy", value: "100% True Positive" },
      { label: "Supported Issuers", value: "40+ Cloud & SaaS APIs" },
      { label: "Storage", value: "Zero Credential Retention" }
    ]
  },
  {
    id: "autonomous-rotation",
    tabLabel: "04 / Autonomous Rotation",
    badge: "ZERO SERVICE DOWNTIME",
    title: "Instant Blast-Radius Remediation & Rotation",
    lead: "Automated revocation playbooks via cloud IAM connectors and secret vaults.",
    description: "When an active credential leak is confirmed, EnProbe triggers policy-driven rotation playbooks via AWS IAM, GCP Service Accounts, HashiCorp Vault, and AWS Secrets Manager to rotate the key and sync production services.",
    telemetry: {
      target: "GCP Service Account Private Key",
      location: "k8s/production-secret.yaml:9",
      entropy: "8.00 / 8.0 [Maximum]",
      issuer: "Google Cloud Platform IAM",
      validity: "Revocation in Progress",
      remediationAction: "New Key Provisioned & Vault Synced in 2.1 seconds."
    },
    metrics: [
      { label: "Mean Time to Revoke", value: "< 5 Seconds" },
      { label: "Vault Sync", value: "AWS, Vault, Azure" },
      { label: "Audit Compliance", value: "SOC 2 & ISO 27001 Ready" }
    ]
  }
];

export default function NovaSecrets_InteractiveExplorer() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const current = stages[activeIdx];

  return (
    <section className="w-full bg-[#030303] text-white py-28 md:py-36 border-b border-[#27272A]/80 relative z-10">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center max-w-[760px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181B] border border-white/10 text-xs font-mono text-[#60A5FA] uppercase tracking-wider mb-5">
            <span>// INTERACTIVE PLATFORM EXPLORER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-sans leading-[1.08] mb-5">
            How EnProbe Neutralizes Leaks.
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] font-sans leading-relaxed">
            Explore the four automated defense stages that protect your engineering teams from initial access breaches.
          </p>
        </div>

        {/* 4-Stage Pill Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {stages.map((stage, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveIdx(idx)}
                className={`px-5 py-2.5 rounded-full font-mono text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#60A5FA] text-[#030303] shadow-[0_0_25px_rgba(96,165,250,0.4)] font-bold scale-[1.02]"
                    : "bg-[#18181B] hover:bg-[#27272A] text-slate-300 border border-white/5 hover:border-white/15"
                }`}
                data-cursor="button"
              >
                {stage.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage Display Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="p-px rounded-[32px] bg-gradient-to-b from-[#60A5FA]/35 via-white/10 to-transparent shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
          >
            <div className="w-full bg-[#18181B]/95 rounded-[31px] p-8 sm:p-12 lg:p-14 backdrop-blur-2xl border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              
              {/* Left Column: Stage Prose & Metrics */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-8">
                <div className="flex flex-col gap-4">
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-[#60A5FA] uppercase tracking-wider font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
                    <span>{current.badge}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-sans tracking-tight leading-[1.12]">
                    {current.title}
                  </h3>

                  <p className="text-base text-white font-medium font-sans leading-relaxed">
                    {current.lead}
                  </p>

                  <p className="text-sm text-[#A1A1AA] font-sans leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* Metrics Pill Grid */}
                <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
                  {current.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] uppercase text-slate-400">
                        {m.label}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#60A5FA] font-sans">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Live Telemetry Inspection Card */}
              <div className="lg:col-span-6">
                <div className="bg-[#0D0E12] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-2xl relative overflow-hidden">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                      <span className="font-mono text-xs font-bold text-white uppercase">
                        INTERCEPT TELEMETRY
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      LIVE PROOF
                    </span>
                  </div>

                  {/* Telemetry Data Rows */}
                  <div className="flex flex-col gap-3 font-mono text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-white/5">
                      <span className="text-slate-400">Target Credential</span>
                      <span className="text-white font-semibold truncate">{current.telemetry.target}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-white/5">
                      <span className="text-slate-400">Location</span>
                      <span className="text-[#60A5FA]">{current.telemetry.location}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-white/5">
                      <span className="text-slate-400">Shannon Score</span>
                      <span className="text-amber-400 font-semibold">{current.telemetry.entropy}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-white/5">
                      <span className="text-slate-400">Upstream Issuer</span>
                      <span className="text-slate-200">{current.telemetry.issuer}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-white/5">
                      <span className="text-slate-400">Exploitability</span>
                      <span className="text-rose-400 font-semibold">{current.telemetry.validity}</span>
                    </div>
                  </div>

                  {/* Remediation Action Highlight Box */}
                  <div className="mt-2 bg-[#3B82F6]/10 border border-[#60A5FA]/30 rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5 text-xs font-sans">
                      <span className="font-bold text-white">Automated Defense Response</span>
                      <span className="text-[#93C5FD] leading-relaxed">
                        {current.telemetry.remediationAction}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
