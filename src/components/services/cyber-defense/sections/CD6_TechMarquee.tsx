"use client";

import React from "react";
import { techStack } from "@/data/cyberDefense";

export default function CD6_TechMarquee() {
  const marqueeItems = [...techStack, ...techStack];

  return (
    <section className="w-full bg-[#080C14] py-12 border-b border-[var(--cd-border)] overflow-hidden relative z-10 select-none">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-6 text-center sm:text-left">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#64748B]">
          // SIEM · MDR · EDR INTEGRATIONS
        </span>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full flex overflow-hidden mask-fade-edges">
        <div className="flex shrink-0 items-center gap-4 animate-marquee-left hover:pause-marquee">
          {marqueeItems.map((tech, idx) => (
            <div
              key={`${tech}-${idx}`}
              className="px-5 py-2.5 rounded-full bg-[#0F172A] border border-[var(--cd-border)] text-[#94A3B8] font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:border-[#60A5FA] hover:text-[#60A5FA] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] shrink-0"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
