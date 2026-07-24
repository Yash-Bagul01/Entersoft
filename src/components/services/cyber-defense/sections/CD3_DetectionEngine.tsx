"use client";

import React from "react";
import { motion } from "framer-motion";
import { detectionSources, responseSteps } from "@/data/cyberDefense";
import CDGradientText from "../ui/CDGradientText";
import CDGlowCard from "../ui/CDGlowCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CD3_DetectionEngine() {
  const isReduced = useReducedMotion();

  return (
    <section className="w-full bg-[#080C14] py-16 px-6 md:px-12 relative z-10 border-b border-[var(--cd-border)]">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#60A5FA] mb-3">
            // DETECTION ENGINE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FFFFFF] leading-tight">
            Signal to <CDGradientText>response</CDGradientText>. Continuously.
          </h2>
        </div>

        {/* 3 Tier Architecture Flow Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          {/* TIER 1 — Signal Sources (Left Column - 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
              INPUT TELEMETRY (8 SOURCES)
            </span>
            <div className="grid grid-cols-2 gap-3">
              {detectionSources.map((source, idx) => (
                <motion.div
                  key={source.name}
                  initial={isReduced ? {} : { opacity: 0, x: -12 }}
                  whileInView={isReduced ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                >
                  <CDGlowCard className="p-3.5 flex flex-col justify-center h-full bg-[#0F172A] border border-[var(--cd-border)] hover:border-[#60A5FA] transition-colors">
                    <span className="font-mono text-[11px] font-bold text-[#60A5FA] tracking-wider">
                      {source.name}
                    </span>
                    <span className="font-sans text-[10px] text-[#94A3B8] truncate mt-0.5">
                      {source.sub}
                    </span>
                  </CDGlowCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* TIER 2 — Detection Engine (Center Column - 4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center my-2 lg:my-0">
            <motion.div
              initial={isReduced ? {} : { scale: 0.95, opacity: 0 }}
              whileInView={isReduced ? {} : { scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="relative p-8 rounded-xl bg-[#0F172A] border border-[#60A5FA]/30 text-center shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden group">
                <div className="absolute inset-0 rounded-xl border border-[#60A5FA] opacity-20 animate-pulse" />

                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#60A5FA] bg-[rgba(59,130,246,0.12)] border border-[rgba(96,165,250,0.25)] px-3 py-1 rounded-full inline-block mb-4">
                  CORE ENGINE
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFFFF] mb-3">
                  ENTERSOFT DETECTION ENGINE
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Correlation rules + ML anomaly detection + expert triage, running 24/7/365.
                </p>
              </div>
            </motion.div>
          </div>

          {/* TIER 3 — Response Lifecycle (Right Column - 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
              OUTPUT RESPONSE (5 ACTIONS)
            </span>
            <div className="flex flex-col gap-2.5">
              {responseSteps.map((step, idx) => (
                <motion.div
                  key={step.index}
                  initial={isReduced ? {} : { opacity: 0, x: 12 }}
                  whileInView={isReduced ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <div className="p-3 bg-[#0F172A] border border-[var(--cd-border)] hover:border-[#60A5FA] rounded-lg flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#60A5FA]">
                        {step.index}
                      </span>
                      <span className="font-serif text-sm font-bold text-[#FFFFFF]">
                        {step.verb}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#60A5FA] bg-[rgba(59,130,246,0.12)] px-2 py-0.5 rounded">
                      {step.ms}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
