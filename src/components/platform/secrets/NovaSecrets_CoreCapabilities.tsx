"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, GitBranch, ShieldCheck, RefreshCw, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Capability {
  title: string;
  tag: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

const capabilities: Capability[] = [
  {
    title: "Semantic AST & Entropy Fusion",
    tag: "ZERO-NOISE ANALYSIS",
    description: "Combines mathematical Shannon entropy scoring with deep Abstract Syntax Tree (AST) parsing to evaluate string randomness within full code context.",
    features: [
      "Differentiates live cryptokeys from mock strings",
      "Over 1,280+ verified API token patterns",
      "Context-aware variable & assignment mapping",
      "Sub-millisecond token evaluation"
    ],
    icon: <Cpu className="w-6 h-6 text-[#60A5FA]" />
  },
  {
    title: "Historical Git Graph Forensics",
    tag: "FULL COMMIT RECURSION",
    description: "Traverses recursive git object databases across all active branches, orphan commit hashes, merged PRs, stashes, and reflogs to find forgotten secrets.",
    features: [
      "Scans 10,000+ historical commits per second",
      "Surfaces legacy keys buried in old deployments",
      "Automated BFG / filter-repo purge scripts",
      "Continuous repository drift tracking"
    ],
    icon: <GitBranch className="w-6 h-6 text-[#60A5FA]" />
  },
  {
    title: "Live Sandboxed Issuer Proof",
    tag: "100% EXPLOITABILITY PROOF",
    description: "Safely executes non-destructive verification against third-party provider endpoints to verify if detected credentials remain active in production.",
    features: [
      "Zero private credential storage or retention",
      "Direct API probing (AWS STS, Stripe, OpenAI)",
      "Zero false-positive alarms for security teams",
      "Granular privilege & permission assessment"
    ],
    icon: <ShieldCheck className="w-6 h-6 text-[#60A5FA]" />
  },
  {
    title: "Autonomous IAM Rotation",
    tag: "INSTANT BLAST MITIGATION",
    description: "Triggers automated revocation and rotation playbooks via cloud provider IAM APIs, HashiCorp Vault, and AWS Secrets Manager with zero service downtime.",
    features: [
      "< 5-second Mean Time to Revoke (MTTR)",
      "Automated cloud provider key lifecycle sync",
      "Cryptographically signed audit trail logs",
      "Inline developer pull request patch generation"
    ],
    icon: <RefreshCw className="w-6 h-6 text-[#60A5FA]" />
  }
];

export default function NovaSecrets_CoreCapabilities() {
  return (
    <section id="capabilities" className="w-full bg-[#030303] text-white py-28 md:py-36 border-b border-[#27272A]/80 relative z-10">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181B] border border-white/10 text-xs font-mono text-[#60A5FA] uppercase tracking-wider mb-5"
          >
            <span>// CAPABILITY MATRIX</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans leading-[1.08] mb-6"
          >
            Engineered for Complete Credential Dominance.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#A1A1AA] font-sans leading-relaxed"
          >
            Four architectural layers operating continuously to discover, validate, and neutralize exposed credentials across your entire engineering ecosystem.
          </motion.p>
        </div>

        {/* 4 Nova Gradient-Border Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-px rounded-[32px] bg-gradient-to-b from-[#60A5FA]/25 via-white/5 to-transparent hover:from-[#60A5FA]/50 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.6)] group"
            >
              <div className="w-full h-full bg-[#18181B]/95 rounded-[31px] p-8 sm:p-10 flex flex-col justify-between gap-8 backdrop-blur-xl border border-white/5">
                
                <div className="flex flex-col gap-6">
                  {/* Top Bar: Icon + Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/15 border border-[#60A5FA]/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                      {cap.icon}
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#60A5FA] bg-[#3B82F6]/10 px-3 py-1 rounded-full border border-[#60A5FA]/20">
                      {cap.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-bold text-white font-sans tracking-tight group-hover:text-[#93C5FD] transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-base text-[#A1A1AA] leading-relaxed font-sans">
                      {cap.description}
                    </p>
                  </div>

                  {/* Features Bullet List */}
                  <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cap.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500">
                    STAGE {idx + 1} ARCHITECTURE
                  </span>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#60A5FA] hover:text-[#93C5FD] transition-colors group/link"
                    data-cursor="link"
                  >
                    <span>Request Technical Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
