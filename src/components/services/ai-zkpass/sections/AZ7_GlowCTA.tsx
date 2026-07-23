"use client";

import React from "react";
import { motion } from "framer-motion";
import GradientText from "@/components/services/ai-zkpass/ui/GradientText";
import { ArrowUpRight } from "lucide-react";

export default function AZ7_GlowCTA() {
  return (
    <section className="az-section relative w-full py-32 px-6 md:px-12 select-none bg-[#0B0E1A] overflow-hidden border-t border-[rgba(204,255,51,0.18)]">
      {/* Strongest Neon Radial Glow Bloom */}
      <div
        className="cta-glow-bloom pointer-events-none"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse at 50% 0%, rgba(204,255,51,0.22) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-[900px] mx-auto flex flex-col items-center justify-center text-center relative z-10">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs font-bold text-[#CCFF33] tracking-[0.25em] uppercase mb-4"
        >
          // ASSESS YOUR AI
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-serif text-[clamp(2.4rem,6vw,5.5rem)] font-bold text-[#F0F4FF] leading-[1.08] tracking-tight"
        >
          Assess your AI stack.{" "}
          <GradientText>Before production.</GradientText>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-base md:text-lg text-[rgba(240,244,255,0.65)] max-w-[480px] leading-relaxed mt-6"
        >
          No commitment. Findings in 48 hours. Senior analyst reviewed.
        </motion.p>

        {/* High Intensity Neon CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-9"
        >
          <a
            href="/contact"
            className="cta-primary-btn inline-flex items-center gap-2 px-10 py-4 bg-[#CCFF33] text-[#080808] font-sans font-bold text-base rounded-xl shadow-[0_0_35px_rgba(204,255,51,0.35)] hover:shadow-[0_0_55px_rgba(204,255,51,0.65),0_0_90px_rgba(204,255,51,0.3)] hover:-translate-y-1 transition-all duration-200"
          >
            <span>Get a Free Assessment</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
