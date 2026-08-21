"use client";

import React from "react";
import { motion } from "framer-motion";
import { digitalTrustData } from "@/data/digitalTrust";
import SectionLabel from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Clock, Info } from "lucide-react";

export default function DT7_CertificationRoadmap() {
  const { roadmap } = digitalTrustData;
  const isReduced = useReducedMotion();

  return (
    <section 
      id="roadmap" 
      className="scroll-mt-24 relative w-full bg-[#080808] px-6 md:px-12 lg:px-16 py-24 md:py-32 overflow-hidden border-b border-white/[0.08] text-[#F5F5F5]"
    >
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-14 md:gap-18">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left max-w-[850px] gap-3">
          <SectionLabel color="secondary">{roadmap.eyebrow}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
            {roadmap.headline}
          </h2>
        </div>

        {/* Velocity & Scope Disclaimer Banner */}
        <div className="w-full p-5 sm:p-6 rounded-lg bg-white/[0.02] border border-white/[0.08] flex items-start gap-3.5 text-left">
          <Info className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
          <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
            <strong className="text-white font-semibold">Illustrative Roadmap: </strong>
            {roadmap.disclaimer}
          </p>
        </div>

        {/* 7-Phase Timeline Track */}
        <div className="flex flex-col gap-4 relative">
          {roadmap.stages.map((stage, index) => (
            <motion.div
              key={stage.phase}
              initial={{ opacity: 0, x: isReduced ? 0 : -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: isReduced ? 0 : index * 0.08 }}
              className="w-full p-6 sm:p-8 rounded-xl bg-[#0c0f17]/90 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 text-left group"
            >
              {/* Left Stage identifier */}
              <div className="flex items-center gap-4 lg:w-[260px] shrink-0">
                <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded border border-sky-500/30">
                  {stage.phase}
                </span>
                <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  {stage.focus}
                </span>
              </div>

              {/* Middle Title & Description */}
              <div className="flex flex-col gap-1.5 flex-1 max-w-[650px]">
                <span className="font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-wider">
                  {stage.subtitle}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-sky-400 transition-colors">
                  {stage.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {/* Right Deliverable Chip */}
              <div className="lg:w-[320px] shrink-0 flex flex-col items-start lg:items-end gap-1 border-t lg:border-t-0 border-white/[0.06] pt-4 lg:pt-0 w-full">
                <span className="font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-widest">
                  KEY DELIVERABLE:
                </span>
                <span className="font-mono text-[11px] font-semibold text-zinc-200 bg-white/[0.03] px-3 py-1.5 rounded border border-white/[0.06] text-left lg:text-right">
                  {stage.keyDeliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
