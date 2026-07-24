"use client";

import React from "react";
import { motion } from "framer-motion";
import { hero } from "@/data/cyberDefense";
import CDGradientText from "../ui/CDGradientText";
import CDStatChip from "../ui/CDStatChip";
import CursorImageTrail from "../ui/CursorImageTrail";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const headlineContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const headlineItem: any = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function CD0_Hero() {
  const isReduced = useReducedMotion();

  return (
    <section className="w-full bg-[#080C14] pt-16 md:pt-18 pb-12 px-6 md:px-12 relative z-10 border-b border-[var(--cd-border)] overflow-hidden">
      {/* Cursor Signal Trail */}
      <CursorImageTrail />

      {/* Centered Content Container */}
      <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center relative z-20">
        {/* Eyebrow + Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#60A5FA]">
            {hero.eyebrow}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] opacity-60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#94A3B8] bg-white/[0.04] border border-[var(--cd-border)] px-3.5 py-1 rounded-full">
            {hero.descriptor}
          </span>
        </motion.div>

        {/* Kinetic Staggered Headline */}
        <motion.h1
          variants={isReduced ? {} : headlineContainer}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.06] text-[#FFFFFF] mb-6 select-none"
          style={{ letterSpacing: "-0.025em" }}
        >
          <motion.span variants={headlineItem} className="inline-block">
            {hero.headline.before}&nbsp;
          </motion.span>
          <motion.span variants={headlineItem} className="inline-block">
            <CDGradientText>{hero.headline.gradient}</CDGradientText>
          </motion.span>
        </motion.h1>

        {/* Subcopy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="font-sans text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-[640px] mb-8"
        >
          {hero.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto mb-10"
        >
          <a
            href={hero.ctaPrimary.href}
            className="w-full sm:w-auto text-center font-sans font-semibold text-sm sm:text-base px-8 py-3.5 rounded-[6px] bg-[#3B82F6] text-[#FFFFFF] shadow-[0_0_24px_rgba(59,130,246,0.4)] hover:bg-[#2563EB] transition-all duration-300 transform hover:-translate-y-0.5"
            data-cursor="button"
          >
            {hero.ctaPrimary.label}
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="w-full sm:w-auto text-center font-sans font-medium text-sm sm:text-base px-8 py-3.5 rounded-[6px] border border-[var(--cd-border)] text-[#FFFFFF] hover:border-[#60A5FA] hover:text-[#60A5FA] hover:bg-white/5 transition-all duration-300"
            data-cursor="link"
          >
            {hero.ctaSecondary.label}
          </a>
        </motion.div>

        {/* Quick Stat Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 border-t border-[var(--cd-border)] w-full max-w-[800px]">
          {hero.heroStats.map((st) => (
            <CDStatChip key={st.label} value={st.value} label={st.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
