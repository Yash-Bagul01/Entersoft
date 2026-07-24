"use client";

import React from "react";
import { motion } from "framer-motion";
import { coverageGrid } from "@/data/cyberDefense";
import CDGradientText from "../ui/CDGradientText";
import CDGlowCard from "../ui/CDGlowCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CD4_CoverageGrid() {
  const isReduced = useReducedMotion();

  return (
    <section id="coverage" className="w-full bg-[#080C14] py-16 px-6 md:px-12 relative z-10 border-b border-[var(--cd-border)]">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#60A5FA] mb-3">
            // MONITORED SURFACES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FFFFFF] leading-tight">
            We watch what attackers{" "}
            <CDGradientText>actually target.</CDGradientText>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {coverageGrid.map((item, idx) => {
            const isWide = item.size === "wide";
            const colSpanClass = isWide ? "md:col-span-7" : "md:col-span-5";

            return (
              <motion.div
                key={item.index}
                initial={isReduced ? {} : { opacity: 0, y: 16 }}
                whileInView={isReduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={colSpanClass}
              >
                <CDGlowCard className="h-full flex flex-col justify-between p-7 bg-[#0F172A] border border-[var(--cd-border)] group hover:border-[#60A5FA] transition-colors">
                  <div>
                    {/* Top row: Index & Cobalt indicator dot */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-xs font-bold text-[#60A5FA]">
                        {item.index}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" />
                    </div>

                    {/* Area Title */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFFFFF] mb-2 group-hover:text-[#60A5FA] transition-colors">
                      {item.area}
                    </h3>

                    {/* Body */}
                    <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">
                      {item.body}
                    </p>
                  </div>

                  {/* Bottom Accent hair-line */}
                  <div className="w-full h-[1px] bg-[var(--cd-border)] mt-6 group-hover:bg-[#60A5FA] transition-colors" />
                </CDGlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
