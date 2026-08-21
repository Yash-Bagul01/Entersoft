"use client";

import React from "react";
import { motion } from "framer-motion";
import { digitalTrustData } from "@/data/digitalTrust";
import SectionLabel from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Compass, Cpu, FileCheck, Info } from "lucide-react";

export default function DT3_OperatingModel() {
  const { operatingModel } = digitalTrustData;
  const isReduced = useReducedMotion();

  const roleIcons = [
    <Compass key="0" className="w-6 h-6 text-sky-400" />,
    <Cpu key="1" className="w-6 h-6 text-cyan-400" />,
    <FileCheck key="2" className="w-6 h-6 text-blue-400" />,
  ];

  return (
    <section 
      id="operating-model" 
      className="scroll-mt-24 relative w-full bg-[#060606] px-6 md:px-12 lg:px-16 py-24 md:py-32 overflow-hidden border-b border-white/[0.08] text-[#F5F5F5]"
    >
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-14 md:gap-18">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left max-w-[850px] gap-3">
          <SectionLabel color="secondary">{operatingModel.eyebrow}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
            {operatingModel.title}
          </h2>
          <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed mt-2">
            {operatingModel.subtitle}
          </p>
        </div>

        {/* Independence & Advisory Boundary Disclaimer */}
        <div className="w-full p-5 sm:p-6 rounded-lg bg-white/[0.02] border border-white/[0.08] flex items-start gap-3.5 text-left">
          <Info className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
          <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
            <strong className="text-white font-semibold">Regulatory Independence Clarification: </strong>
            {operatingModel.disclaimer}
          </p>
        </div>

        {/* 3-Layer Operating Model Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {operatingModel.roles.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: isReduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: isReduced ? 0 : index * 0.12 }}
              className="flex flex-col justify-between p-8 rounded-xl bg-[#090c13]/80 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 relative group text-left"
            >
              <div className="flex flex-col gap-5">
                {/* Top Step & Badge */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <span className="font-mono text-2xl font-bold text-white tracking-tight">
                    {item.step}
                  </span>
                  <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06]">
                    {roleIcons[index]}
                  </div>
                </div>

                <span className="font-mono text-[9px] font-bold text-[var(--accent)] tracking-widest uppercase">
                  {item.badge}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-[var(--accent)] transition-colors">
                  {item.role}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Key Activities */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-2">
                  <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                    DELIVERY ACTIVITIES:
                  </span>
                  <ul className="flex flex-col gap-1.5">
                    {item.activities.map((act, i) => (
                      <li key={i} className="font-sans text-xs text-zinc-400 flex items-start gap-2">
                        <span className="text-[var(--accent)] font-bold">›</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Decorative bottom progress bar */}
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[9px] text-zinc-500">
                <span>OPERATING LAYER</span>
                <span className="text-zinc-400 font-bold">LAYER 0{index + 1} OF 03</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
