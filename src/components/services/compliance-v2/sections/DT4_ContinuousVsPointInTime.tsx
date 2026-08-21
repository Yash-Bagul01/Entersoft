"use client";

import React from "react";
import { motion } from "framer-motion";
import { digitalTrustData } from "@/data/digitalTrust";
import SectionLabel from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { XCircle, CheckCircle2, ArrowDown } from "lucide-react";

export default function DT4_ContinuousVsPointInTime() {
  const { continuousVsPointInTime } = digitalTrustData;
  const isReduced = useReducedMotion();

  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 lg:px-16 py-24 md:py-32 overflow-hidden border-b border-white/[0.08] text-[#F5F5F5]">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-14 md:gap-18">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left max-w-[850px] gap-3">
          <SectionLabel color="secondary">{continuousVsPointInTime.eyebrow}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
            {continuousVsPointInTime.headline}
          </h2>
          <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed mt-2">
            {continuousVsPointInTime.description}
          </p>
        </div>

        {/* Comparison Grid (Side by Side) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Traditional Point-in-Time Model Card */}
          <div className="flex flex-col justify-between p-8 sm:p-10 rounded-xl bg-[#0c0d12] border border-rose-950/40 relative text-left">
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] font-bold text-rose-400 tracking-[0.2em] uppercase">
                    THE LEGACY PARADIGM
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                    Point-in-Time Compliance
                  </h3>
                </div>
                <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
              </div>

              {/* Steps Flow */}
              <div className="flex flex-col gap-4">
                {continuousVsPointInTime.traditionalSteps.map((item, idx) => (
                  <div key={item.step} className="flex flex-col gap-2">
                    <div className="flex items-start gap-3.5 p-3.5 rounded bg-white/[0.02] border border-white/[0.04]">
                      <span className="font-mono text-xs font-bold text-rose-400 shrink-0 mt-0.5">
                        {item.step}
                      </span>
                      <span className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {item.text}
                      </span>
                    </div>
                    {idx < continuousVsPointInTime.traditionalSteps.length - 1 && (
                      <div className="flex justify-center">
                        <ArrowDown className="w-3.5 h-3.5 text-zinc-700" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Outcome Tag */}
            <div className="mt-8 pt-4 border-t border-rose-950/40 flex items-center justify-between font-mono text-[9px] text-rose-400">
              <span>RESULT: STALE EVIDENCE & SILOED DRIFT</span>
              <span className="font-bold">HIGH AUDIT FRICTION</span>
            </div>
          </div>

          {/* Entersoft Digital Trust Model Card */}
          <div className="flex flex-col justify-between p-8 sm:p-10 rounded-xl bg-gradient-to-b from-[#0e1626] to-[#0a101d] border border-[var(--accent)]/40 relative text-left shadow-[0_0_40px_rgba(0,163,255,0.08)]">
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] font-bold text-[var(--accent)] tracking-[0.2em] uppercase">
                    ENTERSOFT DIGITAL TRUST
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                    Continuous Telemetry Assurance
                  </h3>
                </div>
                <CheckCircle2 className="w-6 h-6 text-sky-400 shrink-0" />
              </div>

              {/* Steps Flow */}
              <div className="flex flex-col gap-4">
                {continuousVsPointInTime.continuousSteps.map((item, idx) => (
                  <div key={item.step} className="flex flex-col gap-2">
                    <div className="flex items-start gap-3.5 p-3.5 rounded bg-white/[0.04] border border-[var(--accent)]/20 shadow-sm">
                      <span className="font-mono text-xs font-bold text-[var(--accent)] shrink-0 mt-0.5">
                        {item.step}
                      </span>
                      <span className="font-sans text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
                        {item.text}
                      </span>
                    </div>
                    {idx < continuousVsPointInTime.continuousSteps.length - 1 && (
                      <div className="flex justify-center">
                        <ArrowDown className="w-3.5 h-3.5 text-[var(--accent)]/60" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Outcome Tag */}
            <div className="mt-8 pt-4 border-t border-[var(--accent)]/30 flex items-center justify-between font-mono text-[9px] text-[var(--accent)]">
              <span>RESULT: PERMANENT AUDIT READINESS</span>
              <span className="font-bold text-sky-400">ZERO SURPRISES</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
