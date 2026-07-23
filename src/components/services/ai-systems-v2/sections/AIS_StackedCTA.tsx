"use client";

import React from "react";
import { motion } from "framer-motion";
import { stackedCTA } from "@/data/aiSystemsV2";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AIS_StackedCTA() {
  const isReduced = useReducedMotion();

  return (
    <section className="relative w-full bg-[var(--bg)] px-6 py-28 md:py-40 border-t border-[var(--line)] flex flex-col items-center justify-center text-center select-none">
      <div className="max-w-[1000px] mx-auto flex flex-col items-center justify-center">
        {/* Stacked Display Headline */}
        <div className="flex flex-col items-center justify-center leading-[0.95] tracking-tight uppercase">
          {/* Line 1: Assess */}
          <motion.div
            initial={isReduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(3rem,8vw,7.5rem)] font-semibold text-[var(--fg-dimmer)]"
          >
            {stackedCTA.lines[0]}
          </motion.div>

          {/* Line 2: Your AI. */}
          <motion.div
            initial={isReduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(4rem,10vw,9.5rem)] font-bold text-[var(--fg)] tracking-[-0.02em]"
          >
            {stackedCTA.lines[1]}
          </motion.div>

          {/* Line 3: Before */}
          <motion.div
            initial={isReduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(3rem,8vw,7.5rem)] font-semibold text-[var(--fg-dimmer)]"
          >
            {stackedCTA.lines[2]}
          </motion.div>

          {/* Arrow Separator */}
          <motion.div
            initial={isReduced ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-serif text-[clamp(3rem,8vw,7.5rem)] text-[var(--fg-dim)] my-1"
          >
            →
          </motion.div>

          {/* Line 4: It Ships. */}
          <motion.div
            initial={isReduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(4rem,10vw,9.5rem)] font-bold text-[var(--fg)] tracking-[-0.02em]"
          >
            {stackedCTA.lines[3]}
          </motion.div>
        </div>

        {/* CTA Link Button */}
        <motion.div
          initial={isReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 md:mt-16"
        >
          <a
            href={stackedCTA.href}
            className="group relative inline-flex items-center gap-3 font-sans text-[clamp(15px,1.8vw,18px)] font-medium text-[var(--fg)] tracking-[0.06em] no-underline pb-1 transition-colors"
            data-cursor="link"
          >
            <span>{stackedCTA.button}</span>
            <span className="inline-block transition-transform duration-250 ease-out group-hover:translate-x-1.5">
              →
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--fg)] transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
