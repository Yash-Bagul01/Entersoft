"use client";

import React from "react";
import AICore3DVisual from "@/components/services/ai-systems-v3/canvas/AICore3DVisual";
import { Shield, Lock, Eye, Cpu } from "lucide-react";

export default function AIV3_LiveInjectionSandbox() {
  return (
    <section
      id="simulator"
      className="relative w-full bg-[#060606] px-6 md:px-12 py-28 border-b border-white/10 overflow-hidden select-none"
    >
      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto flex flex-col gap-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="flex flex-col gap-3 max-w-[700px]">
            <div className="font-mono text-xs font-semibold text-[#00A3FF] tracking-[0.25em] uppercase">
              [ 02 — THREAT INTERCEPTION ENGINE ]
            </div>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-bold text-[#F6F5F0] leading-[1.12] tracking-tight">
              Enterprise AI protection in{" "}
              <em className="italic text-[#00A3FF] font-serif font-normal">
                realtime.
              </em>
            </h2>
            <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed mt-1">
              Dynamic monitoring, threat containment, and zero-latency prompt isolation built for enterprise compliance.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 border border-white/10 font-mono text-xs text-[#00A3FF]">
            <Cpu className="w-4 h-4 animate-spin" />
            <span>3D INTERACTIVE CORE</span>
          </div>
        </div>

        {/* 3D Visual Core Container with Crosshairs */}
        <div className="relative">
          <AICore3DVisual />
        </div>

        {/* 3 Value Pillars in Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative p-7 rounded-xl bg-[#0A0D14] border border-white/10 flex flex-col gap-3 group hover:border-[#00A3FF]/40 transition-colors">
            <span className="absolute top-2 left-2 text-white/20 font-mono text-[9px]">+</span>
            <div className="w-10 h-10 rounded-lg bg-[#00A3FF]/15 border border-[#00A3FF]/30 flex items-center justify-center text-[#00A3FF]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#F6F5F0]">
              Pre-Deployment Audit
            </h3>
            <p className="font-sans text-xs text-white/70 leading-relaxed">
              Rigorous stress-testing of all system prompt boundaries, vector indexing rules, and tool permissions prior to production release.
            </p>
          </div>

          <div className="relative p-7 rounded-xl bg-[#0A0D14] border border-white/10 flex flex-col gap-3 group hover:border-emerald-500/40 transition-colors">
            <span className="absolute top-2 left-2 text-white/20 font-mono text-[9px]">+</span>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#F6F5F0]">
              Continuous Context Isolation
            </h3>
            <p className="font-sans text-xs text-white/70 leading-relaxed">
              Real-time guardrail enforcement guaranteeing system instructions remain isolated and tamper-proof across multi-turn sessions.
            </p>
          </div>

          <div className="relative p-7 rounded-xl bg-[#0A0D14] border border-white/10 flex flex-col gap-3 group hover:border-amber-500/40 transition-colors">
            <span className="absolute top-2 left-2 text-white/20 font-mono text-[9px]">+</span>
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#F6F5F0]">
              Audit-Ready Evidence Trail
            </h3>
            <p className="font-sans text-xs text-white/70 leading-relaxed">
              Complete logging and executive risk metrics aligned with international standards: NIST AI RMF, ISO 42001, and OWASP Top 10.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
