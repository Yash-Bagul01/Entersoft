"use client";

import React from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function CloudEvidenceBand() {
  return (
    <section className="w-full bg-[#000000] border-t border-b border-zinc-900 py-16 md:py-24 select-none relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-[8%]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 items-start text-left">
          
          {/* Card 1: 600+ */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-4xl sm:text-5xl lg:text-[4.5rem] font-bold text-zinc-100 tracking-tight leading-none">
              <AnimatedCounter value={600} />+
            </span>
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest leading-normal">
              Clients secured across cloud and on-prem
            </span>
          </div>

          {/* Card 2: 13 Yrs */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-4xl sm:text-5xl lg:text-[4.5rem] font-bold text-zinc-100 tracking-tight leading-none">
              <AnimatedCounter value={13} /> Yrs
            </span>
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest leading-normal">
              Same senior analysts, zero attrition
            </span>
          </div>

          {/* Card 3: 0 Breaches */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-4xl sm:text-5xl lg:text-[4.5rem] font-bold text-zinc-100 tracking-tight leading-none relative">
              0
              <span className="absolute bottom-1.5 left-0 right-0 h-[3px] bg-cyan-400 opacity-80" style={{ maxWidth: "45px" }} />
            </span>
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest leading-normal mt-1">
              On Entersoft&apos;s watch, 13 years running
            </span>
          </div>

          {/* Card 4: <15 Min */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-4xl sm:text-5xl lg:text-[4.5rem] font-bold text-zinc-100 tracking-tight leading-none">
              &lt;<AnimatedCounter value={15} /> Min
            </span>
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest leading-normal">
              Mean triage time on confirmed cloud alerts
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
