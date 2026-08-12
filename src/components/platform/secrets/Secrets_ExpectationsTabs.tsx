"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Key, RefreshCw, CheckCircle2, AlertTriangle, Layers, GitBranch, Cpu, Lock } from "lucide-react";

interface TabItem {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  terminalSnippet: {
    command: string;
    outputLines: { text: string; type: "info" | "warn" | "success" | "error" }[];
  };
  metrics: { label: string; value: string }[];
}

const tabs: TabItem[] = [
  {
    id: "pre-commit",
    tabLabel: "01. PRE-COMMIT & PR INTERCEPTION",
    title: "PRE-COMMIT & PR INTERCEPTION",
    subtitle: "Stop plain-text credentials before they ever hit the remote repository.",
    description: "EnProbe hooks directly into local developer workstations (via lightweight git hooks) and pull request CI/CD gates. Every changed line of code is scanned for high-entropy tokens, private keys, and API credentials within 250ms, rejecting compromised commits instantly.",
    tag: "GATEKEEPER.SYS",
    terminalSnippet: {
      command: "git commit -m 'feat: connect payment gateway'",
      outputLines: [
        { text: "[EnProbe Secrets] Running pre-commit entropy verification...", type: "info" },
        { text: "✖ High Entropy Detected in src/config/stripe.ts:line 14", type: "error" },
        { text: "  Pattern Match: Stripe Restricted Key (rk_live_...)", type: "warn" },
        { text: "  Status: BLOCKED — Live key detected in source code.", type: "error" },
        { text: "↳ Remediation: Store secret in AWS Secrets Manager or .env.local", type: "success" }
      ]
    },
    metrics: [
      { label: "Execution Time", value: "< 240ms" },
      { label: "Developer Friction", value: "0% Overhead" },
      { label: "Supported VCS", value: "Git, GitHub, GitLab" }
    ]
  },
  {
    id: "historical-git",
    tabLabel: "02. HISTORICAL GIT FORENSICS",
    title: "HISTORICAL GIT REPOSITORY FORENSICS",
    subtitle: "Deep commit graph traversal across all branches, tags, and archived commits.",
    description: "Over 60% of leaked credentials remain hidden in legacy commit histories, forgotten merge branches, and orphaned commit hashes. EnProbe scans the entire git object database recursively to surface legacy secrets that require immediate rotation.",
    tag: "GIT_ARCHIVE.RAW",
    terminalSnippet: {
      command: "enprobe-secrets audit --history --all-branches",
      outputLines: [
        { text: "[EnProbe Forensics] Scanning 4,820 commits across 18 branches...", type: "info" },
        { text: "✓ Found legacy commit 7f3b89a (authored 14 months ago)", type: "warn" },
        { text: "  Detected: AWS_SECRET_ACCESS_KEY in old deploy script", type: "warn" },
        { text: "  Commit Author: dev-cohort-archive@org.com", type: "info" },
        { text: "↳ Generated Git Filter-Repo BFG cleanup script", type: "success" }
      ]
    },
    metrics: [
      { label: "Commits / Sec", value: "10,000+" },
      { label: "Depth", value: "Full Reflog & Stash" },
      { label: "Remediation", value: "Auto-BFG Scripts" }
    ]
  },
  {
    id: "active-validation",
    tabLabel: "03. LIVE ACTIVE TOKEN VERIFICATION",
    title: "LIVE ACTIVE TOKEN VERIFICATION",
    subtitle: "Zero false-positive active verification directly with credential issuers.",
    description: "Never waste engineering hours chasing harmless test mocks or revoked staging strings. EnProbe safely verifies detected tokens against third-party API providers (AWS STS, OpenAI, Slack auth.test, Stripe) in an isolated sandbox to confirm whether the credential is valid.",
    tag: "TOKEN_VERIFIER.OBJ",
    terminalSnippet: {
      command: "enprobe-secrets verify --token-id=SEC-9921",
      outputLines: [
        { text: "[Live Verifier] Probing token against issuer endpoint...", type: "info" },
        { text: "  Issuer: OpenAI API (api.openai.com/v1/models)", type: "info" },
        { text: "  Response: HTTP 200 OK — Active Admin Scope ($5,000 tier)", type: "error" },
        { text: "  Associated Org: Enterprise-Production-Cluster", type: "warn" },
        { text: "↳ Alert Level: CRITICAL PRIORITY (Immediate Rotation)", type: "error" }
      ]
    },
    metrics: [
      { label: "Accuracy", value: "100% True Positive" },
      { label: "Supported Providers", value: "40+ Major Issuers" },
      { label: "Sandboxing", value: "Zero Credential Storage" }
    ]
  },
  {
    id: "auto-rotation",
    tabLabel: "04. AUTOMATED ROTATION PLAYBOOKS",
    title: "AUTOMATED ROTATION PLAYBOOKS",
    subtitle: "Instant blast-radius mitigation with one-click IAM revocation.",
    description: "When an active secret is detected, seconds matter. EnProbe triggers automated revocation playbooks via AWS IAM, GitHub fine-grained PAT connectors, HashiCorp Vault, and Slack Webhooks to revoke the key and issue a replacement without downtime.",
    tag: "IAM_REVOKE.EXEC",
    terminalSnippet: {
      command: "enprobe-secrets rotate --playbook=aws-iam-rotate",
      outputLines: [
        { text: "[Rotation Playbook] Initiating key lifecycle update...", type: "info" },
        { text: "  IAM User: deployment-ci-service-account", type: "info" },
        { text: "  Action 1: Created new Access Key AKIA...99B", type: "success" },
        { text: "  Action 2: Updated AWS Secrets Manager ARN", type: "success" },
        { text: "  Action 3: Revoked compromised key AKIA...EXAMPLE", type: "warn" },
        { text: "↳ MTTR: 1.8 seconds (Zero Service Interruption)", type: "success" }
      ]
    },
    metrics: [
      { label: "Mean Time to Revoke", value: "< 5 Seconds" },
      { label: "Vault Integrations", value: "AWS, HashiCorp, Azure" },
      { label: "Audit Log", value: "Cryptographically Signed" }
    ]
  }
];

export default function Secrets_ExpectationsTabs() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const current = tabs[activeTab];

  return (
    <section className="w-full bg-[#07090E] text-white py-24 md:py-32 border-b border-white/10 relative overflow-hidden">
      {/* Subtle Matrix Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: "48px 48px"
          }}
        />
      </div>

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-16 text-xs font-mono">
          <span className="text-[#3B82F6] font-bold uppercase tracking-wider">
            // CAPABILITIES & WHAT TO EXPECT
          </span>
          <span className="text-slate-500 hidden sm:inline-block">
            04-STAGE AUTOMATED CREDENTIAL DEFENSE
          </span>
        </div>

        {/* Dynamic Display Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start min-h-[440px]">
          
          {/* Left Column: Heading, Subtitle & Deep Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-5"
              >
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#60A5FA]">
                  <span>STAGE {activeTab + 1} OF 4</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span>{current.tag}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-sans uppercase leading-[1.05]">
                  {current.title}
                </h3>

                <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
                  {current.description}
                </p>

                {/* Metrics Pill Row */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  {current.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                        {m.label}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#60A5FA] font-sans">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Live Terminal Cybernetic Preview Card */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-[#0C101A] border border-[#3B82F6]/30 rounded-xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(59,130,246,0.12)] relative overflow-hidden"
              >
                {/* Window Top Controls */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-slate-300 font-bold">{current.tag}</span>
                  </div>
                  <span className="text-[10px] text-[#60A5FA] font-bold">ACTIVE TELEMETRY</span>
                </div>

                {/* Command Line Prompt */}
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300 pb-3 border-b border-white/5">
                  <span className="text-[#3B82F6] font-bold">$</span>
                  <span className="text-white font-semibold">{current.terminalSnippet.command}</span>
                </div>

                {/* Terminal Output Lines */}
                <div className="pt-4 font-mono text-[12px] sm:text-[13px] leading-relaxed space-y-2.5">
                  {current.terminalSnippet.outputLines.map((line, idx) => (
                    <div
                      key={idx}
                      className={
                        line.type === "error"
                          ? "text-rose-400 font-semibold"
                          : line.type === "warn"
                          ? "text-amber-300"
                          : line.type === "success"
                          ? "text-emerald-400 font-semibold"
                          : "text-slate-400"
                      }
                    >
                      {line.text}
                    </div>
                  ))}
                </div>

                {/* Corner Decorative Dots */}
                <span className="absolute bottom-2 right-2 font-mono text-[9px] text-[#3B82F6]/60">
                  ENPROBE-SEC-ENGINE v4.2
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            HORIZONTAL STAGE SELECTOR TABS (Builderstable Bottom Strip)
            ───────────────────────────────────────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`text-left p-4 rounded-lg transition-all duration-200 cursor-pointer relative border ${
                    isActive
                      ? "bg-[#0E1526] border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                      : "bg-[#0A0D15]/60 border-white/10 hover:border-white/20 hover:bg-[#0E1320]"
                  }`}
                  data-cursor="button"
                >
                  {/* Active Indicator Top Line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute -top-px left-0 right-0 h-0.5 bg-[#3B82F6] shadow-[0_0_12px_#3B82F6]"
                    />
                  )}

                  <div className="font-mono text-xs font-bold tracking-wider mb-1 flex items-center justify-between">
                    <span className={isActive ? "text-[#60A5FA]" : "text-slate-400"}>
                      {tab.tabLabel}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                    )}
                  </div>
                  
                  <div className={`text-xs font-sans line-clamp-1 ${isActive ? "text-white font-semibold" : "text-slate-500"}`}>
                    {tab.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
