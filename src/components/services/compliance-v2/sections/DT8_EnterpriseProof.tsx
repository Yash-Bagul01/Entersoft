"use client";

import React from "react";
import { motion } from "framer-motion";
import { digitalTrustData } from "@/data/digitalTrust";
import SectionLabel from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Award, CheckCircle, ShieldCheck, FileText, Layers, TrendingUp } from "lucide-react";

export default function DT8_EnterpriseProof() {
  const { proof } = digitalTrustData;
  const isReduced = useReducedMotion();

  const qualitativeIcons = [
    <FileText key="0" className="w-5 h-5 text-sky-400" />,
    <Award key="1" className="w-5 h-5 text-cyan-400" />,
    <Layers key="2" className="w-5 h-5 text-blue-400" />,
    <TrendingUp key="3" className="w-5 h-5 text-sky-300" />,
  ];

  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 lg:px-16 py-24 md:py-32 overflow-hidden border-b border-white/[0.08] text-[#F5F5F5]">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-14 md:gap-18">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left max-w-[850px] gap-3">
          <SectionLabel color="secondary">{proof.eyebrow}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
            {proof.headline}
          </h2>
        </div>

        {/* Featured Verifiable Case Study Card */}
        <motion.div
          initial={{ opacity: 0, y: isReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#0d1424] via-[#0a101d] to-[#070b14] border border-white/[0.12] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 text-left shadow-2xl"
        >
          <div className="flex flex-col gap-4 max-w-[800px]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded bg-[var(--accent)]/15 border border-[var(--accent)]/30 font-mono text-[9px] font-bold text-[var(--accent)] uppercase tracking-widest">
                {proof.caseStudy.badge}
              </span>
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                {proof.caseStudy.sector}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              {proof.caseStudy.title}
            </h3>

            <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed">
              {proof.caseStudy.summary}
            </p>
          </div>

          {/* Metric Highlight Badge */}
          <div className="shrink-0 p-6 sm:p-8 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col items-start lg:items-end gap-1.5 min-w-[280px]">
            <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
              VERIFIED OUTCOME
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-sky-400 tracking-tight leading-tight">
              {proof.caseStudy.metric}
            </span>
            <span className="font-sans text-[11px] text-zinc-400 mt-1">
              Zero regulatory non-conformities
            </span>
          </div>
        </motion.div>

        {/* 4 Qualitative Proof Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {proof.qualitativePillars.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: isReduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: isReduced ? 0 : idx * 0.08 }}
              className="flex flex-col justify-between p-6 rounded-xl bg-[#0a0d14]/70 border border-white/[0.06] text-left gap-6 hover:border-white/[0.14] transition-colors"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06]">
                    {qualitativeIcons[idx]}
                  </div>
                  <span className="font-mono text-[9px] text-zinc-500 font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <span className="font-mono text-[8px] font-bold text-[var(--accent)] uppercase tracking-wider">
                  {item.subtitle}
                </span>

                <h4 className="font-serif text-base font-bold text-white tracking-tight">
                  {item.title}
                </h4>

                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.04] flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
                <CheckCircle className="w-3 h-3 text-[var(--accent)]" />
                <span>AUDITABLE PROOF</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
