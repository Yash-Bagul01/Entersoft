"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { processSteps } from "@/data/aiZkpass";
import GlowCard from "@/components/services/ai-zkpass/ui/GlowCard";
import GradientText from "@/components/services/ai-zkpass/ui/GradientText";

export default function AZ3_AssessProcess() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="az-section relative w-full py-28 px-6 md:px-12 select-none border-t border-[rgba(204,255,51,0.12)]">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-3 text-left max-w-[650px]">
          <div className="font-mono text-xs font-bold text-[#CCFF33] tracking-[0.2em] uppercase">
            // HOW WE ASSESS
          </div>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-bold text-[#F0F4FF] leading-[1.12] tracking-tight">
            From first signal to{" "}
            <GradientText>verified finding.</GradientText>
          </h2>
          <p className="font-sans text-sm md:text-base text-[rgba(240,244,255,0.6)] leading-relaxed mt-1">
            Senior analyst-led methodology guaranteeing zero false positives and actionable remediation playbooks.
          </p>
        </div>

        {/* 4 Process Steps in Row with Traveling Dot Connections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Horizontal Connecting Dash Line + Traveling Dot (Desktop) */}
          <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] pointer-events-none z-0">
            <svg className="w-full h-full overflow-visible">
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke="rgba(204,255,51,0.25)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Traveling Dots */}
              <circle r="3" fill="#CCFF33" className="animate-travel-dot-1">
                <animate
                  attributeName="cx"
                  from="0%"
                  to="100%"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" fill="#CCFF33" className="animate-travel-dot-2">
                <animate
                  attributeName="cx"
                  from="0%"
                  to="100%"
                  dur="4s"
                  begin="1.3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" fill="#CCFF33" className="animate-travel-dot-3">
                <animate
                  attributeName="cx"
                  from="0%"
                  to="100%"
                  dur="4s"
                  begin="2.6s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          {processSteps.map((step, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={step.index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative z-10"
              >
                <GlowCard className="p-7 h-full flex flex-col justify-between group min-h-[260px]">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-[#CCFF33] tracking-widest">
                        {step.index}
                      </span>
                      <span className="font-mono text-[10px] text-[rgba(240,244,255,0.35)] tracking-wider uppercase">
                        {step.sub}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#F0F4FF] group-hover:text-[#CCFF33] transition-colors mt-2">
                      {step.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[rgba(204,255,51,0.12)]">
                    <p className="font-sans text-xs md:text-sm text-[rgba(240,244,255,0.6)] leading-relaxed">
                      {step.detail}
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
