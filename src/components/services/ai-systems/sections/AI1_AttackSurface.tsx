"use client";

import React from "react";
import AIArchitectureGraph from "../canvas/AIArchitectureGraph";
import ScanLineSweep from "./ScanLineSweep";

export default function AI1_AttackSurface() {
  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 py-24 md:py-32 border-b border-[var(--border-subtle)] overflow-hidden z-10">
      <ScanLineSweep />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr] gap-12 lg:gap-16 items-center">
        {/* Left Column Text */}
        <div className="flex flex-col gap-4 text-left">
          <div className="font-mono text-xs font-bold text-[#00A3FF] tracking-[0.2em] uppercase">
            01 — ATTACK SURFACE
          </div>

          <h2 className="font-serif text-[clamp(2rem,3.8vw,3.4rem)] font-bold text-[#F6F5F0] leading-[1.1] tracking-tight">
            Every layer is a potential entry point.
          </h2>

          <p className="font-sans text-sm md:text-base text-[var(--text-secondary)] max-w-[380px] leading-relaxed mt-2">
            From the first user token to the final API output, each transition in your AI system is an exploitable boundary.
          </p>
        </div>

        {/* Right Column Visual */}
        <div className="w-full flex justify-center items-center">
          <AIArchitectureGraph />
        </div>
      </div>
    </section>
  );
}
