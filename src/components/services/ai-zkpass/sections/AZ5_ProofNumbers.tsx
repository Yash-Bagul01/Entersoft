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
        <div className="font-mono text-xs font-bold text-[#CCFF33] tracking-[0.25em] uppercase mb-8">
          // SIGNAL PRIORITISATION & HUMAN VALIDATION
        </div>

        {/* Validation Flow Display */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12">
          {/* Signal Triage Stage 1 */}
          <div className="flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-bold text-[#F0F4FF] leading-none tracking-tight"
            >
              AUTOMATED
            </motion.span>
            <span className="font-mono text-xs text-[rgba(240,244,255,0.4)] tracking-[0.2em] uppercase mt-3">
              THREAT TELEMETRY
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

          {/* Signal Triage Stage 2 */}
          <div className="flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-bold text-[#CCFF33] leading-none tracking-tight shadow-[0_0_50px_rgba(204,255,51,0.2)]"
            >
              HUMAN
            </motion.span>
            <span className="font-mono text-xs text-[rgba(240,244,255,0.4)] tracking-[0.2em] uppercase mt-3">
              VALIDATED FINDINGS
            </span>
          </div>
        </div>

        {/* 3-Item Divider Stat Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-[rgba(204,255,51,0.12)] flex flex-wrap items-center justify-center gap-6 md:gap-10 font-mono text-xs text-[rgba(240,244,255,0.5)] tracking-wider uppercase"
        >
          <span>RULE-TUNED SIGNAL PRIORITISATION</span>
          <span className="text-[#CCFF33]">|</span>
          <span>HUMAN-VALIDATED FINDINGS</span>
          <span className="text-[#CCFF33]">|</span>
          <span>14 YEARS OFFENSIVE-SECURITY EXPERTISE</span>
        </motion.div>
      </div>
    </section>
  );
}
