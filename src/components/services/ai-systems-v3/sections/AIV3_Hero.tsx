"use client";

import React from "react";
import { motion } from "framer-motion";
import { heroV3 } from "@/data/aiSystemsV3";
import TokenStream from "@/components/services/ai-systems/canvas/TokenStream";
import MagneticButton from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";

export default function AIV3_Hero() {
  return (
    <section className="relative w-full min-h-[90dvh] flex flex-col items-center justify-center overflow-hidden bg-[#060606] px-6 py-20 select-none border-b border-white/10">
      {/* Background 2D Token Canvas */}
      <TokenStream />

      {/* Subtle Dot Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Glow Radial Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.08)_0%,transparent_65%)] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-[1150px] w-full mx-auto flex flex-col items-center text-center">
        {/* zkPass Monospace Bracket Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 font-mono text-xs text-[#00A3FF] tracking-[0.25em] uppercase mb-6 bg-[#00A3FF]/10 border border-[#00A3FF]/30 px-4 py-1.5 rounded-full"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
          <span>[ {heroV3.pill} ]</span>
        </motion.div>

        {/* Hero Title with zkPass Italic Accent */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-serif text-[clamp(2.5rem,5.5vw,4.8rem)] font-bold text-[#F6F5F0] leading-[1.08] tracking-tight max-w-[1000px]"
        >
          Security & Assurance Layer for the{" "}
          <em className="italic text-[#00A3FF] font-serif font-normal">
            Enterprise AI Stack.
          </em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-[clamp(15px,1.8vw,18px)] text-white/70 max-w-[700px] leading-relaxed mt-6"
        >
          {heroV3.sub}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-9"
        >
          <MagneticButton>
            <Button variant="primary" size="lg" asLink href="/#contact">
              {heroV3.ctaPrimary} <ArrowUpRight className="w-4 h-4 ml-1 inline" />
            </Button>
          </MagneticButton>

          <Button variant="secondary" size="lg" asLink href="/#contact">
            {heroV3.ctaSecondary}
          </Button>
        </motion.div>

        {/* zkPass Style Stats HUD Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="w-full max-w-[950px] mt-16 grid grid-cols-2 md:grid-cols-4 border border-white/10 bg-black/60 backdrop-blur-md relative rounded-xl overflow-hidden"
        >
          {heroV3.metrics.map((m, idx) => (
            <div
              key={idx}
              className="relative p-5 flex flex-col gap-1 text-left border-r border-b border-white/10 last:border-r-0 md:border-b-0 group hover:bg-white/[0.02] transition-colors"
            >
              {/* Corner crosshairs */}
              <span className="absolute top-2 left-2 text-white/20 font-mono text-[9px]">
                +
              </span>
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest pl-3">
                {m.label}
              </span>
              <span className="font-serif text-xl md:text-2xl font-bold text-[#F6F5F0] pl-3 mt-1 group-hover:text-[#00A3FF] transition-colors">
                {m.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
