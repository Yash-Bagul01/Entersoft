"use client";

import React from "react";
import { motion } from "framer-motion";
import CDGradientText from "../ui/CDGradientText";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CD8_GlowCTA() {
  const isReduced = useReducedMotion();

  return (
    <section className="w-full bg-[#080C14] py-20 px-6 md:px-12 relative z-10 overflow-hidden text-center flex flex-col items-center justify-center">
      {/* Sapphire Cobalt Subtle Radial Glow Bloom */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[60vh] bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.14)_0%,transparent_70%)] blur-[80px]" />
      </div>

      <div className="max-w-[900px] mx-auto relative z-10 flex flex-col items-center">
        {/* Eyebrow */}
        <motion.span
          initial={isReduced ? {} : { opacity: 0, y: 10 }}
          whileInView={isReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#60A5FA] mb-4"
        >
          // READY TO SECURE YOUR OPERATIONS?
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={isReduced ? {} : { opacity: 0, y: 15 }}
          whileInView={isReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] leading-[1.1] mb-4 select-none"
        >
          MDR & Detection Engineering, <br />
          <CDGradientText>delivered for your stack.</CDGradientText>
        </motion.h2>

        {/* Positioning Subtext */}
        <motion.p
          initial={isReduced ? {} : { opacity: 0, y: 10 }}
          whileInView={isReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="font-sans text-sm sm:text-base text-[#94A3B8] max-w-[640px] mb-8 leading-relaxed"
        >
          Delivered through your existing security stack or an Entersoft-managed architecture.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={isReduced ? {} : { opacity: 0, y: 12 }}
          whileInView={isReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8 w-full sm:w-auto"
        >
          <a
            href="/#contact"
            className="inline-block w-full sm:w-auto font-sans font-semibold text-base sm:text-lg px-9 py-4 rounded-[8px] bg-[#3B82F6] text-[#FFFFFF] shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:bg-[#2563EB] transition-all duration-300 transform hover:-translate-y-0.5"
            data-cursor="button"
          >
            Discuss Your Monitoring Environment
          </a>
        </motion.div>

        {/* Reassurance line */}
        <motion.span
          initial={isReduced ? {} : { opacity: 0 }}
          whileInView={isReduced ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-mono text-[10px] sm:text-xs font-semibold text-[#60A5FA] tracking-[0.18em] uppercase"
        >
          Ongoing Managed Service · 24/7 Detection Operations
        </motion.span>
      </div>
    </section>
  );
}
