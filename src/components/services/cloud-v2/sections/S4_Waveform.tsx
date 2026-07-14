"use client";

import React from "react";
import ThreatWaveform from "../canvas/ThreatWaveform";

interface SectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  stickyRef: React.RefObject<HTMLDivElement | null>;
}

export default function S4_Waveform({ sectionRef, stickyRef }: SectionProps) {
  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen lg:h-[100dvh] bg-[#080808] text-[#F5F5F5] overflow-hidden select-none z-10"
    >
      <div
        ref={stickyRef}
        className="w-full h-full flex flex-col relative overflow-hidden"
      >
        {/* Top visual waveform container */}
        <div className="w-full h-[320px] sm:h-[400px] lg:h-[55%] flex items-center justify-center relative border-b border-zinc-950">
          <ThreatWaveform />
        </div>

        {/* Bottom typographic statement */}
        <div className="w-full h-auto py-12 lg:h-[45%] lg:py-0 flex flex-col justify-center items-center text-center px-6 relative z-20 bg-black/25 backdrop-blur-sm">
          <span 
            className="font-serif font-bold text-5xl sm:text-8xl lg:text-[10rem] tracking-tight leading-none text-[#F5F5F5]"
            style={{ 
              letterSpacing: "-0.025em",
              textShadow: "0 0 50px rgba(245,245,245,0.22)" 
            }}
          >
            &lt;15 min
          </span>
          <span className="font-mono text-[9px] sm:text-xs tracking-[0.2em] text-[rgba(245,245,245,0.45)] uppercase mt-4 text-center block max-w-full px-4 leading-loose">
            mean triage time · confirmed cloud threat · senior analyst reviewed
          </span>
        </div>
      </div>
    </section>
  );
}
