"use client";

import React from "react";
import { motion } from "framer-motion";
import { auditNumbers } from "@/data/aiSystemsV2";
import ValidationField from "@/components/services/ai-systems/canvas/ValidationField";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AIS_NumberStatement() {
  const isReduced = useReducedMotion();

  return (
    <section className="relative w-full bg-[var(--bg)] px-6 py-[clamp(100px,14vh,180px)] border-t border-[var(--line)] flex flex-col items-center justify-center text-center select-none overflow-hidden">
      <div className="max-w-[1100px] mx-auto w-full flex flex-col items-center justify-center">
        {/* Number Block 1: 847 signals found */}
        <motion.div
          initial={isReduced ? false : { opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <span className="font-serif text-[clamp(7rem,18vw,16rem)] font-bold text-[var(--fg)] leading-[0.85] tracking-tight">
            {auditNumbers.raw}
          </span>
          <span className="font-sans text-[clamp(14px,2vw,18px)] text-[var(--fg-dim)] uppercase tracking-[0.12em] mt-3">
            {auditNumbers.rawLabel}
          </span>
        </motion.div>

        {/* Down Arrow Separator */}
        <motion.div
          initial={isReduced ? false : { opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-[var(--fg-dimmer)] my-6 md:my-10"
        >
          ↓
        </motion.div>

        {/* Number Block 2: 12 real threats */}
        <motion.div
          initial={isReduced ? false : { opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <span className="font-serif text-[clamp(7rem,18vw,16rem)] font-bold text-[var(--fg)] leading-[0.85] tracking-tight">
            {auditNumbers.validated}
          </span>
          <span className="font-sans text-[clamp(14px,2vw,18px)] text-[var(--fg-dim)] uppercase tracking-[0.12em] mt-3">
            {auditNumbers.validatedLabel}
          </span>
        </motion.div>

        {/* Interactive Signal Validation Particle Field */}
        <div className="w-full mt-10">
          <ValidationField />
        </div>

        {/* Sub Statement Quote */}
        <motion.p
          initial={isReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-serif italic text-[clamp(1.2rem,2.5vw,2rem)] text-[var(--fg-dim)] max-w-[650px] leading-relaxed mt-12 md:mt-16"
        >
          &ldquo;The other 835 were noise. We filtered them before you saw them.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
