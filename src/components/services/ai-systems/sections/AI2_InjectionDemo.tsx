"use client";

import React from "react";
import InjectionVisual from "../canvas/InjectionVisual";
import ScanLineSweep from "./ScanLineSweep";

export default function AI2_InjectionDemo() {
  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 py-24 md:py-32 border-b border-[var(--border-subtle)] overflow-hidden z-10">
      <ScanLineSweep />

      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-12 items-start justify-between">
        {/* Left Text Block */}
        <div className="lg:w-[35%] flex flex-col gap-4 text-left pt-2">
          <div className="font-mono text-xs font-bold text-[#00A3FF] tracking-[0.2em] uppercase">
            02 — ADVERSARIAL PROMPT
          </div>

          <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-bold text-[#F6F5F0] leading-[1.1] tracking-tight">
            It looks like a normal request.
          </h2>

          <p className="font-sans text-sm md:text-base text-[var(--text-secondary)] max-w-[340px] leading-relaxed mt-1">
            Prompt injection hides in plain text. Standard AST tools parse syntax — they don&apos;t model intent.
          </p>
        </div>

        {/* Right Visual Panel */}
        <div className="lg:w-[65%] w-full">
          <InjectionVisual />
        </div>
      </div>
    </section>
  );
}
