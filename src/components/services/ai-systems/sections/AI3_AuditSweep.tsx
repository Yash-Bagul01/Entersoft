"use client";

import React from "react";
import AuditSweepVisual from "../canvas/AuditSweepVisual";

export default function AI3_AuditSweep() {
  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 py-24 md:py-32 border-b border-[var(--border-subtle)] overflow-hidden z-10 text-center">
      <div className="max-w-[1000px] mx-auto flex flex-col items-center gap-4">
        <div className="font-mono text-xs font-bold text-[#00A3FF] tracking-[0.2em] uppercase">
          03 — ENTERSOFT METHODOLOGY
        </div>

        <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold text-[#F6F5F0] leading-[1.15] tracking-tight max-w-[700px]">
          We assess what automated scanners can&apos;t reach.
        </h2>

        {/* Audit Sweep Visual */}
        <div className="w-full mt-8">
          <AuditSweepVisual />
        </div>
      </div>
    </section>
  );
}
