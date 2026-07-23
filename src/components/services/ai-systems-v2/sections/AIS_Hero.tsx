"use client";

import React from "react";
import { hero } from "@/data/aiSystemsV2";
import WordReveal from "../ui/WordReveal";
import TokenStream from "@/components/services/ai-systems/canvas/TokenStream";

export default function AIS_Hero() {
  return (
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[var(--bg)] px-6 select-none">
      {/* 2D Canvas Token Stream Background */}
      <TokenStream />

      {/* Hero Content (z-10 above canvas) */}
      <div className="relative z-10 max-w-[900px] w-full mx-auto text-center flex flex-col items-center justify-center">
        {/* Eyebrow */}
        <div className="font-mono text-[11px] font-medium text-[var(--fg-dim)] tracking-[0.2em] uppercase mb-6 md:mb-8">
          {hero.eyebrow}
        </div>

        {/* Headline — 3-line split statement */}
        <div className="flex flex-col items-center justify-center leading-[1.05] tracking-tight">
          {/* Line 1 (dim) */}
          <div className="font-serif text-[clamp(2rem,5vw,4.5rem)] font-semibold text-[var(--fg-dim)]">
            <WordReveal text={hero.lines[0].text} delay={0.2} />
          </div>

          {/* Line 2 (bright - dominant) */}
          <div className="font-serif text-[clamp(3rem,7vw,6.5rem)] font-bold text-[var(--fg)] tracking-[-0.02em] my-1 md:my-2">
            <WordReveal text={hero.lines[1].text} delay={0.5} />
          </div>

          {/* Line 3 (dim) */}
          <div className="font-serif text-[clamp(2rem,5vw,4.5rem)] font-semibold text-[var(--fg-dim)]">
            <WordReveal text={hero.lines[2].text} delay={0.8} />
          </div>
        </div>

        {/* CTA Text Link with sweeping underline */}
        <div className="mt-8 md:mt-10">
          <a
            href="/#contact"
            className="group relative inline-flex items-center gap-2.5 font-sans text-base md:text-lg font-medium text-[var(--fg)] tracking-[0.06em] no-underline pb-1 transition-colors"
            data-cursor="link"
          >
            <span>{hero.cta}</span>
            <span className="inline-block transition-transform duration-250 ease-out group-hover:translate-x-1.5">
              →
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--fg)] transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
          </a>
        </div>
      </div>

      {/* Threat Ticker Marquee at Absolute Bottom */}
      <div className="absolute bottom-8 left-0 right-0 overflow-hidden pointer-events-none select-none mask-fade-edges z-10">
        <div className="flex w-max whitespace-nowrap gap-12 animate-ticker">
          <span className="font-mono text-[11px] text-[var(--fg-dimmer)] tracking-[0.12em] uppercase">
            {hero.ticker} — {hero.ticker}
          </span>
          <span className="font-mono text-[11px] text-[var(--fg-dimmer)] tracking-[0.12em] uppercase">
            {hero.ticker} — {hero.ticker}
          </span>
        </div>
      </div>
    </section>
  );
}
