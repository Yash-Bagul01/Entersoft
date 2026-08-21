"use client";

import React from "react";
import { motion } from "framer-motion";
import CDGlowCard from "../ui/CDGlowCard";
import CDGradientText from "../ui/CDGradientText";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TRADITIONAL_ISSUES = [
  { title: "ALERT NOISE & FATIGUE", desc: "Thousands of unverified log alerts forwarded to your team weekly without context or triage." },
  { title: "FRAGMENTED TOOL SILOS", desc: "Separate EDR, SIEM, WAF, and Cloud monitoring dashboards with zero unified correlation." },
  { title: "SLOW SLA & TICKET BOUNCING", desc: "Tier-1 analysts bounce tickets back and forth for hours before incident scoping begins." },
  { title: "PASSIVE NOTIFICATION ONLY", desc: "Alerts sent via email while active attacks continue lateral movement unchecked." },
];

export const ENTERSOFT_ADVANTAGES = [
  { title: "SENIOR-LED TRIAGE & INVESTIGATION", desc: "Alerts evaluated and verified by senior security analysts before escalation to your engineering team." },
  { title: "UNIFIED CORRELATION MODEL", desc: "Cross-surface signal ingestion across AWS/Azure, EDR, IAM, WAF, and network NDR." },
  { title: "ACTIVE CONTAINMENT GUIDANCE", desc: "Immediate containment guidance to isolate compromised credentials, host nodes, and attacker C2 channels." },
  { title: "CONTINUOUS DETECTION TUNING", desc: "Custom detection rules continuously engineered for your specific environment to reduce recurring noise." },
];

export default function CD_ComparisonBlock() {
  const isReduced = useReducedMotion();

  return (
    <section className="w-full bg-[#080C14] py-16 px-6 md:px-12 relative z-10 border-b border-[var(--cd-border)]">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col items-start max-w-2xl">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#60A5FA] mb-3">
            // OPERATIONAL COMPARISON
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FFFFFF] leading-tight">
            Traditional MSSPs vs. <CDGradientText>Entersoft Model</CDGradientText>.
          </h2>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Traditional MSSPs */}
          <motion.div
            initial={isReduced ? {} : { opacity: 0, x: -20 }}
            whileInView={isReduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <CDGlowCard className="h-full flex flex-col justify-between p-8 bg-[#0F172A] border border-white/10 opacity-75">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-widest">
                    TRADITIONAL MSSPS & SILOS
                  </span>
                  <span className="font-mono text-[10px] text-[#64748B] uppercase px-2.5 py-1 rounded bg-white/5">
                    FRAGMENTED
                  </span>
                </div>

                <div className="space-y-6">
                  {TRADITIONAL_ISSUES.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <span className="font-mono text-xs font-bold text-red-400/80 mt-0.5 shrink-0">✕</span>
                      <div>
                        <h4 className="font-sans text-sm font-bold text-[#FFFFFF] mb-1">
                          {item.title}
                        </h4>
                        <p className="font-sans text-xs text-[#94A3B8] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <span className="font-mono text-[11px] text-red-400/80 uppercase tracking-wider block">
                  RESULT: HIGH MTTR & UNRESOLVED NOISE
                </span>
              </div>
            </CDGlowCard>
          </motion.div>

          {/* Column 2: Entersoft Cyber Defense Model */}
          <motion.div
            initial={isReduced ? {} : { opacity: 0, x: 20 }}
            whileInView={isReduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <CDGlowCard className="h-full flex flex-col justify-between p-8 bg-[#0F172A] border border-[#60A5FA]/40 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="font-mono text-[10px] font-bold text-[#FFFFFF] bg-[#3B82F6] px-3 py-1 rounded-full shadow-[0_0_15px_#3B82F6]">
                  RECOMMENDED
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between border-b border-[var(--cd-border)] pb-4 mb-6">
                  <span className="font-mono text-xs font-bold text-[#60A5FA] uppercase tracking-widest">
                    THE ENTERSOFT MODEL
                  </span>
                  <span className="font-mono text-[10px] text-[#60A5FA] uppercase px-2.5 py-1 rounded bg-[rgba(59,130,246,0.12)] border border-[rgba(96,165,250,0.25)]">
                    CONTINUOUS MDR
                  </span>
                </div>

                <div className="space-y-6">
                  {ENTERSOFT_ADVANTAGES.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <span className="font-mono text-xs font-bold text-[#60A5FA] mt-0.5 shrink-0">✓</span>
                      <div>
                        <h4 className="font-sans text-sm font-bold text-[#FFFFFF] mb-1">
                          {item.title}
                        </h4>
                        <p className="font-sans text-xs text-[#94A3B8] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--cd-border)]">
                <span className="font-mono text-[11px] text-[#60A5FA] uppercase tracking-wider block">
                  RESULT: SENIOR ANALYST TRIAGE & CONTINUOUS RULE TUNING
                </span>
              </div>
            </CDGlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
