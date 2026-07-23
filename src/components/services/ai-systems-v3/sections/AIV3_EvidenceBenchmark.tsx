"use client";

import React from "react";
import AnimeTelemetryVisual from "@/components/services/ai-systems-v3/canvas/AnimeTelemetryVisual";

export default function AIV3_EvidenceBenchmark() {
  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 py-28 border-b border-white/10 overflow-hidden text-center select-none">
      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto flex flex-col items-center gap-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-3">
          <div className="font-mono text-xs font-semibold text-[#00A3FF] tracking-[0.25em] uppercase">
            [ 06 — TELEMETRY & NOISE ELIMINATION ]
          </div>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-bold text-[#F6F5F0] leading-[1.12] tracking-tight">
            847 Signals Analyzed. 12 Threats Confirmed.{" "}
            <em className="italic text-[#00A3FF] font-serif font-normal">
              Zero Noise.
            </em>
          </h2>
          <p className="font-sans text-sm md:text-base text-white/70 max-w-[640px] leading-relaxed mt-1">
            Our hybrid triage pipeline filters raw inference telemetry so developers only receive actionable, human-validated findings without false alerts.
          </p>
        </div>

        {/* Anime.js Interactive Telemetry Matrix */}
        <AnimeTelemetryVisual />
      </div>
    </section>
  );
}
