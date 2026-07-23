"use client";

import React from "react";
import AuditSweepVisual from "@/components/services/ai-systems/canvas/AuditSweepVisual";
import { Eye, ShieldCheck } from "lucide-react";

export default function AIV3_ArchitectureScan() {
  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 py-28 border-b border-white/10 overflow-hidden text-center select-none">
      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto flex flex-col items-center gap-8 relative z-10">
        <div className="font-mono text-xs font-semibold text-[#00A3FF] tracking-[0.25em] uppercase">
          [ 04 — DEEP INTROSPECTION SCANNER ]
        </div>

        <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-bold text-[#F6F5F0] leading-[1.12] tracking-tight max-w-[850px]">
          Assessing what static scanners{" "}
          <em className="italic text-[#00A3FF] font-serif font-normal">
            cannot reach.
          </em>
        </h2>

        <p className="font-sans text-sm md:text-base text-white/70 max-w-[640px] leading-relaxed">
          Standard static scanners only look at traditional code syntaxes. Entersoft introspects system prompt logic, vector retrieval similarity scores, and agent chain-of-thought permissions.
        </p>

        {/* Audit Sweep Visual Component */}
        <div className="w-full mt-4">
          <AuditSweepVisual />
        </div>

        {/* Service Comparison Bento Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
          <div className="relative p-7 rounded-xl bg-[#0A0D14] border border-white/10 flex flex-col gap-3">
            <span className="absolute top-2 left-2 text-white/20 font-mono text-[9px]">+</span>
            <div className="flex items-center gap-3 text-red-400">
              <Eye className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold">Standard Vulnerability Scanners</h3>
            </div>
            <p className="font-sans text-xs text-white/70 leading-relaxed">
              Superficial pattern matching limited to known CVE databases. Completely blind to prompt injection, RAG vector poisoning, and agent privilege escalation.
            </p>
          </div>

          <div className="relative p-7 rounded-xl bg-[#0A0D14] border border-[#00A3FF]/40 shadow-[0_0_30px_rgba(0,163,255,0.1)] flex flex-col gap-3">
            <span className="absolute top-2 left-2 text-white/20 font-mono text-[9px]">+</span>
            <div className="flex items-center gap-3 text-[#00A3FF]">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold">Entersoft AI Deep Assurance</h3>
            </div>
            <p className="font-sans text-xs text-white/90 leading-relaxed">
              Full semantic analysis of system prompts, multi-tenant vector boundaries, and autonomous agent tool call permissions with 0% false positives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
