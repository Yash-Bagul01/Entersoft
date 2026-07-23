"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { hero, heroStats } from "@/data/aiZkpass";
import GradientText from "@/components/services/ai-zkpass/ui/GradientText";
import StatChip from "@/components/services/ai-zkpass/ui/StatChip";
import { ArrowUpRight, ShieldAlert } from "lucide-react";

const AIGraphScene = dynamic(
  () => import("@/components/services/ai-zkpass/webgl/AIGraphScene"),
  { ssr: false }
);

export default function AZ0_Hero() {
  return (
    <section className="az-section relative w-full min-h-[80dvh] flex items-center justify-center pt-20 md:pt-24 pb-12 px-6 md:px-12 select-none overflow-hidden">
      <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[0.55fr_0.45fr] gap-12 items-center relative z-10">
        {/* Left Column Text & CTAs */}
        <div className="flex flex-col items-start text-left max-w-[620px]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-[11px] font-bold text-[#CCFF33] tracking-[0.2em] uppercase mb-4 inline-flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF33] animate-pulse" />
            <span>{hero.eyebrow}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif text-[clamp(2.4rem,5.2vw,4.8rem)] font-bold text-[#F0F4FF] leading-[1.08] tracking-tight"
          >
            {hero.headline.line1}
            <GradientText>{hero.headline.gradientWord}</GradientText>
            {hero.headline.line2}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-[clamp(15px,1.7vw,17px)] text-[rgba(240,244,255,0.65)] max-w-[480px] leading-relaxed mt-5"
          >
            {hero.sub}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <a
              href={hero.ctaPrimary.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#CCFF33] text-[#080808] font-sans font-bold text-sm rounded-lg shadow-[0_0_24px_rgba(204,255,51,0.35)] hover:shadow-[0_0_40px_rgba(204,255,51,0.6)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>{hero.ctaPrimary.label}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={hero.ctaSecondary.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[rgba(204,255,51,0.18)] text-[rgba(240,244,255,0.7)] hover:text-[#F0F4FF] hover:border-[rgba(204,255,51,0.45)] font-sans font-semibold text-sm rounded-lg transition-all duration-200"
            >
              <span>{hero.ctaSecondary.label}</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column Three.js Graph Scene + Stat Chips */}
        <div className="relative w-full h-[450px] lg:h-[550px] flex items-center justify-center">
          {/* Three.js Graph Scene */}
          <AIGraphScene className="w-full h-full" />

          {/* Stat Chips Pinned around graph (Desktop only) */}
          <div className="hidden lg:block">
            <StatChip
              value={heroStats[0].value}
              label={heroStats[0].label}
              style={{ top: "15%", right: "-2%" }}
            />

            <StatChip
              value={heroStats[1].value}
              label={heroStats[1].label}
              style={{ top: "48%", right: "-5%" }}
            />

            <StatChip
              value={heroStats[2].value}
              label={heroStats[2].label}
              style={{ bottom: "18%", right: "0%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
