"use client";

import React from "react";
import { casePanels } from "@/data/aiSystemsV2";

export default function AIS_Marquee() {
  return (
    <section className="relative w-full bg-[var(--bg)] py-20 md:py-28 border-t border-[var(--line)] overflow-hidden select-none">
      {/* Header Eyebrows */}
      <div className="max-w-[1280px] mx-auto px-6 mb-8 flex items-center justify-between font-mono text-[11px] text-[var(--fg-dimmer)] tracking-[0.2em] uppercase">
        <span>WHAT WE ASSESS</span>
        <span>EVERY ENGAGEMENT</span>
      </div>

      {/* Row 1 — Moves Left */}
      <div className="w-full overflow-hidden mask-fade-edges py-3">
        <div className="flex w-max whitespace-nowrap gap-6 animate-marquee-left hover:pause-marquee">
          {Array.from({ length: 2 }).map((_, loopIdx) => (
            <React.Fragment key={loopIdx}>
              {casePanels.map((item, idx) => {
                const isSerif = idx % 2 === 0;
                return (
                  <div key={`${loopIdx}-${item.index || idx}`} className="inline-flex items-center gap-6">
                    <span
                      className={`text-[clamp(1.4rem,3vw,2.8rem)] text-[var(--fg)] tracking-tight ${
                        isSerif ? "font-serif font-bold" : "font-sans font-semibold"
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="font-mono text-base text-[var(--fg-dimmer)]">—</span>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Row 2 — Moves Right (Inverted font styles & opposite direction) */}
      <div className="w-full overflow-hidden mask-fade-edges py-3 mt-3">
        <div className="flex w-max whitespace-nowrap gap-6 animate-marquee-right hover:pause-marquee">
          {Array.from({ length: 2 }).map((_, loopIdx) => (
            <React.Fragment key={loopIdx}>
              {casePanels.map((item, idx) => {
                // Inverted from Row 1
                const isSerif = idx % 2 !== 0;
                return (
                  <div key={`${loopIdx}-${item.index || idx}`} className="inline-flex items-center gap-6">
                    <span
                      className={`text-[clamp(1.4rem,3vw,2.8rem)] text-[var(--fg)] tracking-tight ${
                        isSerif ? "font-serif font-bold" : "font-sans font-semibold"
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="font-mono text-base text-[var(--fg-dimmer)]">—</span>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom Footer Label */}
      <div className="max-w-[1280px] mx-auto px-6 mt-12 pt-6 border-t border-[var(--line-strong)] text-center font-mono text-[11px] text-[var(--fg-dimmer)] tracking-[0.16em] uppercase">
        8 ATTACK CLASSES · EVERY AI SYSTEM EXPOSES ALL OF THEM
      </div>
    </section>
  );
}
