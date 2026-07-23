"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { processSteps } from "@/data/aiSystemsV2";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AIS_ProcessSteps() {
  const [activeHover, setActiveHover] = useState<number | null>(null);
  const isReduced = useReducedMotion();

  return (
    <section className="relative w-full bg-[var(--bg)] px-6 py-24 md:py-32 border-t border-[var(--line)] overflow-hidden">
      <div className="max-w-[1100px] mx-auto flex flex-col gap-12">
        {/* Eyebrow */}
        <div className="font-mono text-xs font-medium text-[var(--fg-dim)] tracking-[0.2em] uppercase">
          // HOW WE WORK
        </div>

        {/* Process Step Rows */}
        <div className="w-full border-t border-[var(--line)] flex flex-col">
          {processSteps.map((step, idx) => {
            const isExpanded = activeHover === idx;

            return (
              <motion.div
                key={step.index}
                initial={isReduced ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setActiveHover(idx)}
                onMouseLeave={() => setActiveHover(null)}
                onClick={() => setActiveHover(isExpanded ? null : idx)}
                className="w-full border-b border-[var(--line)] py-6 md:py-8 cursor-pointer group transition-colors duration-200"
              >
                {/* Main Headline Row */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 md:gap-12">
                  <span className="font-mono text-xs md:text-sm text-[var(--fg-dimmer)] fixed-width-index">
                    {step.index}
                  </span>

                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-serif text-[clamp(2rem,5vw,4.5rem)] font-bold text-[var(--fg)] tracking-[-0.02em]">
                      {step.verb}
                    </span>
                    <span className="font-serif text-[clamp(2rem,5vw,4.5rem)] font-semibold text-[var(--fg-dim)]">
                      {step.noun}
                    </span>
                  </div>
                </div>

                {/* Detail Reveal */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={isReduced ? { opacity: 1, height: "auto" } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={isReduced ? { opacity: 0, height: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden pt-3 sm:pl-[48px]"
                    >
                      <p className="font-sans text-sm md:text-base text-[var(--fg-dim)] max-w-[600px] leading-relaxed">
                        {step.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
