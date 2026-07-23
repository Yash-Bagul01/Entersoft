"use client";

import React from "react";
import { motion } from "framer-motion";
import { hero } from "@/data/aiSystems";
import TokenStream from "../canvas/TokenStream";
import MagneticButton from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";

export default function AI0_Hero() {
  return (
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#060606] px-6 select-none">
      {/* Background 2D Token Stream Canvas */}
      <TokenStream />

      {/* Hero Content Overlay (z-10 above stream) */}
      <div className="relative z-10 max-w-[840px] mx-auto text-center flex flex-col items-center justify-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="font-mono text-[11px] font-bold text-[#00A3FF] tracking-[0.2em] uppercase mb-4"
        >
          {hero.eyebrow}
        </motion.div>

        {/* Headline Line 1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="font-serif text-[clamp(3.2rem,7vw,6.5rem)] font-bold text-[#F6F5F0] leading-[1.05] tracking-tight"
        >
          {hero.line1}
        </motion.h1>

        {/* Headline Line 2 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="font-serif text-[clamp(3.2rem,7vw,6.5rem)] font-bold text-[#F6F5F0]/45 leading-[1.05] tracking-tight mt-1"
        >
          {hero.line2}
        </motion.h1>

        {/* Thin Rule */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="w-full max-w-[320px] h-[1px] bg-[#F6F5F0]/12 my-6 mx-auto"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.88 }}
          className="font-sans text-[clamp(15px,1.8vw,18px)] text-[var(--text-secondary)] max-w-[480px] leading-relaxed"
        >
          {hero.sub}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.96 }}
          className="mt-8"
        >
          <MagneticButton>
            <Button
              variant="primary"
              size="lg"
              asLink
              href="/#contact"
              className="bg-[#00A3FF] text-[#060606] border-[#00A3FF] hover:bg-[#33b5ff]"
            >
              {hero.cta} →
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Descriptor Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.1 }}
          className="font-mono text-[11px] text-[var(--text-tertiary)] tracking-[0.1em] mt-5 uppercase"
        >
          {hero.descriptor}
        </motion.div>
      </div>
    </section>
  );
}
