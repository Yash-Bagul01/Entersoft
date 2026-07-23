"use client";

import React from "react";
import { motion } from "framer-motion";
import { stackLayers } from "@/data/aiZkpass";
import GradientText from "@/components/services/ai-zkpass/ui/GradientText";

export default function AZ4_StackCoverage() {
  return (
    <section className="az-section relative w-full py-28 px-6 md:px-12 select-none border-t border-[rgba(204,255,51,0.12)]">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-3 text-left max-w-[650px]">
          <div className="font-mono text-xs font-bold text-[#CCFF33] tracking-[0.2em] uppercase">
            // FULL STACK COVERAGE
          </div>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-bold text-[#F0F4FF] leading-[1.12] tracking-tight">
            No layer left <GradientText>unassessed.</GradientText>
          </h2>
          <p className="font-sans text-sm md:text-base text-[rgba(240,244,255,0.6)] leading-relaxed mt-1">
            Complete security analysis across all 8 architectural boundaries of modern AI applications.
          </p>
        </div>

        {/* 8-Row Layer Stack Diagram */}
        <div className="flex flex-col border border-[rgba(204,255,51,0.18)] rounded-2xl overflow-hidden bg-[#0B0E1A]/60 backdrop-blur-md">
          {stackLayers.map((row, idx) => (
            <motion.div
              key={row.layer}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 border-b border-[rgba(204,255,51,0.12)] last:border-b-0 hover:bg-[rgba(204,255,51,0.03)] transition-colors cursor-pointer"
            >
              {/* Neon Left-Accent Bar */}
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#CCFF33] opacity-30 group-hover:opacity-100 transition-opacity" />

              {/* Layer Title */}
              <div className="md:w-[35%] pl-4">
                <span className="font-serif text-lg md:text-xl font-bold text-[#F0F4FF] group-hover:text-[#CCFF33] transition-colors">
                  {row.layer}
                </span>
              </div>

              {/* Coverage Description */}
              <div className="md:w-[65%] pl-4 md:pl-0 mt-2 md:mt-0">
                <span className="font-mono text-xs md:text-sm text-[rgba(240,244,255,0.45)] group-hover:text-[rgba(240,244,255,0.85)] transition-colors tracking-wide">
                  {row.coverage}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
