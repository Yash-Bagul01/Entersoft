"use client";

import React from "react";
import { motion } from "framer-motion";
import { digitalTrustData } from "@/data/digitalTrust";
import SectionLabel from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AlertCircle, FileSpreadsheet, RefreshCw, ShieldAlert } from "lucide-react";

export default function DT1_ExecutiveThesis() {
  const { thesis } = digitalTrustData;
  const isReduced = useReducedMotion();

  const problemIcons = [
    <FileSpreadsheet key="0" className="w-5 h-5 text-sky-400" />,
    <RefreshCw key="1" className="w-5 h-5 text-cyan-400" />,
    <ShieldAlert key="2" className="w-5 h-5 text-blue-400" />,
  ];

  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 lg:px-16 py-20 md:py-28 overflow-hidden border-b border-white/[0.08] text-[#F5F5F5]">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-14 md:gap-18">
        
        {/* Header Section */}
        <div className="flex flex-col items-start text-left max-w-[850px] gap-3">
          <SectionLabel color="secondary">{thesis.eyebrow}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
            {thesis.headline}
          </h2>
          <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed mt-2">
            {thesis.subline}
          </p>
        </div>

        {/* Problem Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {thesis.problemPoints.map((point, index) => (
            <motion.div
              key={point.index}
              initial={{ opacity: 0, y: isReduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: isReduced ? 0 : index * 0.1 }}
              className="flex flex-col justify-between p-7 md:p-8 rounded-lg bg-[#0a0d14]/70 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 group"
            >
              <div className="flex flex-col gap-5 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-zinc-500 tracking-widest uppercase">
                    DEFICIENCY // {point.index}
                  </span>
                  <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06]">
                    {problemIcons[index]}
                  </div>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[var(--accent)] transition-colors">
                  {point.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {point.desc}
                </p>
              </div>

              {/* Bottom Impact Indicator */}
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-start gap-2 text-left">
                <AlertCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                <span className="font-mono text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                  Impact: {point.impact}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Entersoft Solution Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: isReduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full p-8 md:p-10 rounded-xl bg-gradient-to-r from-[#0d1527] via-[#091120] to-[#0a1324] border border-[var(--accent)]/30 text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="flex flex-col gap-2 max-w-[900px]">
            <span className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-[0.2em] uppercase">
              THE ENTERSOFT DIFFERENCE
            </span>
            <p className="font-serif text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed">
              {thesis.solutionStatement}
            </p>
          </div>
          <div className="shrink-0">
            <span className="inline-block px-4 py-2 rounded bg-[var(--accent)]/10 border border-[var(--accent)]/30 font-mono text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider">
              CONTINUOUS ASSURANCE
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
