"use client";

import React from "react";
import WordReveal from "../ui/WordReveal";

export default function AIS_AuditStatement() {
  return (
    <section className="relative w-full bg-[var(--bg)] px-6 py-28 md:py-40 border-t border-[var(--line)] flex flex-col items-center justify-center text-center select-none">
      <div className="max-w-[900px] mx-auto flex flex-col items-center justify-center">
        {/* 3-line compositional poem */}
        <div className="flex flex-col items-center justify-center leading-[1.1] tracking-tight">
          {/* Line 1 (dim) */}
          <div className="font-serif text-[clamp(2rem,5vw,4.5rem)] font-semibold text-[var(--fg-dim)]">
            <WordReveal text="We found 847 signals." delay={0.2} />
          </div>

          {/* Line 2 (bright - dominant) */}
          <div className="font-serif text-[clamp(2.5rem,6.5vw,6rem)] font-bold text-[var(--fg)] tracking-[-0.02em] my-2 md:my-3">
            <WordReveal text="We reported 12." delay={0.5} />
          </div>

          {/* Line 3 (dim - italic) */}
          <div className="font-serif italic text-[clamp(2rem,5vw,4.5rem)] font-semibold text-[var(--fg-dim)]">
            <WordReveal text="The rest was noise." delay={0.8} />
          </div>
        </div>

        {/* Disclaimer below */}
        <div className="mt-16 md:mt-24 pt-6 border-t border-[var(--line)] w-full max-w-[400px] font-mono text-[11px] text-[var(--fg-dimmer)] tracking-[0.16em] uppercase">
          ILLUSTRATIVE · BASED ON TYPICAL ENGAGEMENT PROFILE
        </div>
      </div>
    </section>
  );
}
