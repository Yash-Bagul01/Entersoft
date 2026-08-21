"use client";

import React from "react";
import { motion } from "framer-motion";
import { metrics } from "@/data/cyberDefense";
import CDGlowCard from "../ui/CDGlowCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CD2_MetricsStrip() {
  const isReduced = useReducedMotion();

  return (
    <section className="w-full bg-[#080C14] py-16 px-6 md:px-12 relative z-10 border-b border-[var(--cd-border)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={isReduced ? {} : { opacity: 0, y: 16 }}
              whileInView={isReduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <CDGlowCard className="h-full flex flex-col justify-between p-7 bg-[#0F172A] group border border-[var(--cd-border)]">
                <div>
                  {/* Accent Pill */}
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded inline-block mb-4 text-[#60A5FA] bg-[rgba(59,130,246,0.12)] border border-[rgba(96,165,250,0.25)]">
                    OPERATING MODEL
                  </span>

                  {/* Value */}
                  <div className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-2 text-[#FFFFFF] group-hover:text-[#60A5FA] transition-colors duration-300 origin-left">
                    {item.value}
                  </div>

                  {/* Label */}
                  <h3 className="font-sans text-base sm:text-lg font-semibold text-[#FFFFFF] mb-1">
                    {item.label}
                  </h3>
                </div>

                {/* Sub */}
                <p className="font-sans text-xs sm:text-sm text-[#94A3B8] mt-3 pt-3 border-t border-[var(--cd-border)]">
                  {item.sub}
                </p>
              </CDGlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
