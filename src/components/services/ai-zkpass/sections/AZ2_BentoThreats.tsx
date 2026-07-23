"use client";

import React from "react";
import { motion } from "framer-motion";
import { threats } from "@/data/aiZkpass";
import GlowCard from "@/components/services/ai-zkpass/ui/GlowCard";
import GradientText from "@/components/services/ai-zkpass/ui/GradientText";

export default function AZ2_BentoThreats() {
  return (
    <section id="threats" className="az-section relative w-full py-28 px-6 md:px-12 select-none">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-3 text-left max-w-[720px]">
          <div className="font-mono text-xs font-bold text-[#CCFF33] tracking-[0.2em] uppercase">
            // ATTACK SURFACE
          </div>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-bold text-[#F0F4FF] leading-[1.12] tracking-tight">
            Every layer of your AI stack is a{" "}
            <GradientText>potential entry point.</GradientText>
          </h2>
          <p className="font-sans text-sm md:text-base text-[rgba(240,244,255,0.6)] leading-relaxed mt-1">
            Full-spectrum adversarial testing across prompt, vector store, agent, memory, and API execution boundaries.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {threats.map((threat, idx) => {
            const isWide = threat.size === "wide";
            const colSpan = isWide ? "md:col-span-7" : "md:col-span-5";

            return (
              <motion.div
                key={threat.index}
                className={colSpan}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <GlowCard className="p-8 h-full flex flex-col justify-between group min-h-[220px]">
                  {/* Decorative background dot pattern for wide cards */}
                  {isWide && (
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />
                  )}

                  {/* Header Row */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="font-mono text-xs text-[rgba(240,244,255,0.3)] group-hover:text-[#CCFF33] transition-colors">
                      {threat.index}
                    </span>

                    {/* Neon Indicator Dot */}
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF33] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CCFF33] shadow-[0_0_8px_#CCFF33] group-hover:shadow-[0_0_18px_#CCFF33] transition-all" />
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 mt-6 relative z-10">
                    <h3 className="font-serif text-[clamp(1.2rem,2vw,1.7rem)] font-bold text-[#F0F4FF] group-hover:text-[#CCFF33] transition-colors">
                      {threat.name}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-[rgba(240,244,255,0.55)] leading-relaxed">
                      {threat.body}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
