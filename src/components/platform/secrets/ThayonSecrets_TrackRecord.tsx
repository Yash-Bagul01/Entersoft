"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function ThayonSecrets_TrackRecord() {
  const [selectedCase, setSelectedCase] = useState(0);

  const cases = [
    {
      id: "fintech",
      sector: "Global NeoBank Core",
      role: "AWS IAM & STS Admin Token",
      mandate: "From Git Commit to Active Revoke in 24s",
      summary: "A live AWS STS Admin token was committed during a multi-service refactor. Entersoft EnProbe intercepted the push and neutralized the credential in 24 seconds before merge.",
      leftImage: "/images/secrets/prism_1.png",
      rightImage: "/images/secrets/prism_2.png",
      stats: [
        { label: "Detection Latency", value: "< 240ms" },
        { label: "Blast Radius Contained", value: "100%" },
        { label: "Service Downtime", value: "0 sec" }
      ],
      intelligence: [
        "Active sandbox probe validated read-only STS GetCallerIdentity without tripping rate limits",
        "Targeted token had full administrative write access to S3 production data lake",
        "Automated AWS Secrets Manager rotation triggered via webhook in 24 seconds",
        "Full cryptographic hash audit trail logged to Splunk & EnProbe ASPM"
      ]
    },
    {
      id: "healthtech",
      sector: "Healthcare Cloud SaaS",
      role: "Payment & DB Credentials",
      mandate: "12.4M Historical Commits Audited",
      summary: "Deep traversal of 140+ legacy repositories unearthed 18 active zombie tokens including Stripe payment keys and PostgreSQL connection strings pushed years prior.",
      leftImage: "/images/secrets/prism_2.png",
      rightImage: "/images/secrets/prism_1.png",
      stats: [
        { label: "Commits Analyzed", value: "12.4M" },
        { label: "Zombie Keys Cleaned", value: "18" },
        { label: "Full Remediation", value: "48 hrs" }
      ],
      intelligence: [
        "Identified live Stripe live-mode secret key buried inside 4-year-old orphan branch",
        "Automated commit tree rewrite stripped sensitive history across all mirrored clones",
        "Cross-referenced payment gateway access logs to verify zero unauthorized invocations",
        "Continuous git history scanning enabled on all existing and future repositories"
      ]
    },
    {
      id: "ailab",
      sector: "AI Foundation Research Lab",
      role: "OpenAI & Anthropic Master Keys",
      mandate: "Model Training Pipeline Defense",
      summary: "Researcher pushed Jupyter notebook containing Master Tier OpenAI keys and Anthropic tokens for an internal LLM benchmark. Intercepted on local workstation.",
      leftImage: "/images/secrets/prism_1.png",
      rightImage: "/images/secrets/prism_2.png",
      stats: [
        { label: "Spend Exposure Saved", value: "$350k/mo" },
        { label: "Commit Blocked", value: "1st Attempt" },
        { label: "Enforcement", value: "Instant" }
      ],
      intelligence: [
        "Jupyter notebook cell metadata & execution output inspected in real-time",
        "Discovered raw API secret embedded inside training checkpoint config JSON",
        "Injected dynamic ephemeral vault token via Entersoft Secrets CLI",
        "Zero developer friction — training pipeline resumed without manual reconfiguration"
      ]
    }
  ];

  const current = cases[selectedCase];

  return (
    <section className="relative w-full bg-[#FAFCFF] text-slate-900 py-24 md:py-32 border-b border-slate-200/80 overflow-hidden">
      {/* Top 5-Point Crosshair Guide Bar */}
      <div className="relative max-w-[1320px] mx-auto px-6 mb-12">
        <div className="flex items-center justify-between text-slate-400 text-sm font-mono select-none">
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
        </div>
      </div>

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500 mb-3">
              <span>[ 03 // FIELD VALIDATION ]</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-950 tracking-tight">
              What we learned in the field
            </h2>
          </div>

          {/* Interactive Case Switcher */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm self-start md:self-auto">
            {cases.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setSelectedCase(idx)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                  selectedCase === idx
                    ? "bg-slate-950 text-white shadow-md font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {c.sector}
              </button>
            ))}
          </div>
        </div>

        {/* 3-COLUMN TRACK RECORD SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Vertical 3D Iridescent Prism Card */}
          <div className="hidden lg:block lg:col-span-3 relative rounded-2xl border border-slate-200/80 bg-slate-950 overflow-hidden shadow-lg min-h-[460px]">
            <Image
              src={current.leftImage}
              alt="Holographic Security Prism"
              fill
              className="object-cover object-center opacity-85 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
            
            {/* Target Crosshairs on Left Card */}
            <div className="absolute inset-0 p-5 flex flex-col justify-between select-none pointer-events-none font-mono text-white/60">
              <div className="flex justify-between text-xs">
                <span>┌</span>
                <span>SIG_0{selectedCase + 1}</span>
                <span>┐</span>
              </div>
              <div className="flex justify-center text-emerald-400 text-lg">
                <span>+</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>└</span>
                <span className="text-[10px] tracking-wider">ENTROPY_OK</span>
                <span>┘</span>
              </div>
            </div>
          </div>

          {/* Center Case Study Card */}
          <div className="lg:col-span-6 relative rounded-2xl border border-slate-200 bg-white shadow-xl p-6 sm:p-10 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* Card Sub-Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold">
                      0{selectedCase + 1}
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                        {current.role}
                      </div>
                      <div className="text-base font-serif font-bold text-slate-950">
                        {current.sector}
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-medium border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Neutralized
                  </span>
                </div>

                {/* Mandate Headline & Summary */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-slate-950 mb-2">
                    {current.mandate}
                  </h3>
                  <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed font-normal">
                    {current.summary}
                  </p>
                </div>

                {/* 3-Column Numeric Stats */}
                <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-slate-100">
                  {current.stats.map((st, i) => (
                    <div key={i} className="space-y-1">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-slate-950 tracking-tight">
                        {st.value}
                      </div>
                      <div className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Intelligence Protocol Checklist */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                    Entersoft Execution Protocol:
                  </div>
                  <div className="space-y-2">
                    {current.intelligence.slice(0, 2).map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 text-xs text-slate-700 font-sans"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Vertical 3D Iridescent Prism Card */}
          <div className="hidden lg:block lg:col-span-3 relative rounded-2xl border border-slate-200/80 bg-slate-950 overflow-hidden shadow-lg min-h-[460px]">
            <Image
              src={current.rightImage}
              alt="Holographic Security Prism Refraction"
              fill
              className="object-cover object-center opacity-85 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />

            {/* Target Crosshairs on Right Card */}
            <div className="absolute inset-0 p-5 flex flex-col justify-between select-none pointer-events-none font-mono text-white/60">
              <div className="flex justify-between text-xs">
                <span>┌</span>
                <span>VAULT_0{selectedCase + 1}</span>
                <span>┐</span>
              </div>
              <div className="flex justify-center text-blue-400 text-lg">
                <span>+</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>└</span>
                <span className="text-[10px] tracking-wider">ROTATED</span>
                <span>┘</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 5-Point Crosshair Guide Bar */}
      <div className="relative max-w-[1320px] mx-auto px-6 mt-16">
        <div className="flex items-center justify-between text-slate-400 text-sm font-mono select-none">
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
        </div>
      </div>
    </section>
  );
}
