"use client";

import React from "react";
import { motion } from "framer-motion";
import { digitalTrustData } from "@/data/digitalTrust";
import SectionLabel from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CheckCircle2, ShieldCheck, Lock, Activity, Users } from "lucide-react";

export default function DT2_PillarsGrid() {
  const { pillars } = digitalTrustData;
  const isReduced = useReducedMotion();

  const pillarIcons = [
    <ShieldCheck key="0" className="w-6 h-6 text-sky-400" />,
    <Lock key="1" className="w-6 h-6 text-blue-400" />,
    <Activity key="2" className="w-6 h-6 text-cyan-400" />,
    <Users key="3" className="w-6 h-6 text-sky-300" />,
  ];

  return (
    <section 
      id="pillars" 
      className="scroll-mt-24 relative w-full bg-[#080808] px-6 md:px-12 lg:px-16 py-24 md:py-32 overflow-hidden border-b border-white/[0.08] text-[#F5F5F5]"
    >
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-14 md:gap-18">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left max-w-[850px] gap-3">
          <SectionLabel color="secondary">ARCHITECTURE</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
            Four Pillars of Enterprise Digital Trust
          </h2>
          <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed mt-2">
            A comprehensive, defensible governance model spanning regulatory certification readiness, cross-border privacy controls, automated cloud evidence ingestion, and supply chain vendor oversight.
          </p>
        </div>

        {/* 2x2 Responsive Grid of 4 Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: isReduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: isReduced ? 0 : index * 0.1 }}
              className="flex flex-col justify-between p-8 sm:p-10 rounded-xl bg-[#0d1017]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 relative group"
            >
              <div className="flex flex-col gap-6 text-left">
                {/* Top index and icon */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
                      [{pillar.index}]
                    </span>
                    <span className="font-mono text-[9px] font-bold text-[var(--accent)] tracking-[0.2em] uppercase">
                      PILLAR
                    </span>
                  </div>
                  <div className="p-2.5 rounded-md bg-white/[0.03] border border-white/[0.06]">
                    {pillarIcons[index]}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[9px] font-bold text-zinc-400 tracking-[0.16em] uppercase">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight group-hover:text-[var(--accent)] transition-colors">
                    {pillar.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Key Outcomes Checklist */}
                <div className="flex flex-col gap-2.5 pt-4 border-t border-white/[0.06]">
                  <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    KEY GOVERNANCE OUTCOMES:
                  </span>
                  <ul className="flex flex-col gap-2">
                    {pillar.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Supported Standards Chips */}
              <div className="mt-8 pt-5 border-t border-white/[0.06] flex flex-wrap items-center gap-2 text-left">
                <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-wider mr-1">
                  APPLICABLE:
                </span>
                {pillar.supportedStandards.map((std, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-[2px] bg-white/[0.03] border border-white/[0.06] font-mono text-[9px] text-zinc-300 font-medium"
                  >
                    {std}
                  </span>
                ))}
              </div>

              {/* Hairline subtle corner accent */}
              <div className="absolute top-0 right-0 w-12 h-[1px] bg-white/20" />
              <div className="absolute top-0 right-0 w-[1px] h-12 bg-white/20" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
