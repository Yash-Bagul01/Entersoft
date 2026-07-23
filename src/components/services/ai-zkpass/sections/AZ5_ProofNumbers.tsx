"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AZ5_ProofNumbers() {
  return (
    <section className="az-section relative w-full py-32 px-6 md:px-12 select-none overflow-hidden border-t border-[rgba(204,255,51,0.12)]">
      {/* Central Radial Glow Bloom Backdrop */}
      <div
        className="proof-glow-bloom pointer-events-none"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(204,255,51,0.15) 0%, transparent 65%)",
          filter: "blur(70px)",
          zIndex: 0,
        }}
      />

      <div className="max-w-[1000px] mx-auto flex flex-col items-center justify-center text-center relative z-10">
        {/* Main 847 -> 12 Numbers Display */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12">
          {/* 847 */}
          <div className="flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-[clamp(5rem,14vw,12rem)] font-bold text-[#F0F4FF] leading-none tracking-tight"
            >
              847
            </motion.span>
            <span className="font-mono text-xs text-[rgba(240,244,255,0.4)] tracking-[0.2em] uppercase mt-2">
              SIGNALS FOUND
            </span>
          </div>

          {/* Arrow */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-bold text-[#CCFF33] leading-none my-2 sm:my-0"
          >
            →
          </motion.span>

          {/* 12 */}
          <div className="flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-serif text-[clamp(5rem,14vw,12rem)] font-bold text-[#CCFF33] leading-none tracking-tight shadow-[0_0_50px_rgba(204,255,51,0.2)]"
            >
              12
            </motion.span>
            <span className="font-mono text-xs text-[rgba(240,244,255,0.4)] tracking-[0.2em] uppercase mt-2">
              VALIDATED THREATS
            </span>
          </div>
        </div>

        {/* 3-Item Divider Stat Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-[rgba(204,255,51,0.12)] flex flex-wrap items-center justify-center gap-6 md:gap-10 font-mono text-xs text-[rgba(240,244,255,0.5)] tracking-wider"
        >
          <span>98.6% NOISE ELIMINATED</span>
          <span className="text-[#CCFF33]">|</span>
          <span>0 FALSE POSITIVES</span>
          <span className="text-[#CCFF33]">|</span>
          <span>14 YEARS EXPERIENCE</span>
        </motion.div>
      </div>
    </section>
  );
}
