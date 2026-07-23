"use client";

import React from "react";
import { motion } from "framer-motion";
import ValidationField from "../canvas/ValidationField";
import ScanLineSweep from "./ScanLineSweep";

export default function AI4_ValidationField() {
  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 py-24 md:py-32 border-b border-[var(--border-subtle)] overflow-hidden z-10 text-center flex flex-col items-center justify-center">
      <ScanLineSweep />

      <div className="max-w-[1100px] mx-auto w-full flex flex-col items-center">
        {/* Large Typographic Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="font-serif text-[clamp(3rem,7vw,6.5rem)] font-bold text-[#F6F5F0] leading-none tracking-tight"
        >
          847 signals.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-serif text-[clamp(3rem,7vw,6.5rem)] font-bold text-[#00A3FF] leading-none tracking-tight mt-2"
        >
          12 real threats.
        </motion.div>

        {/* 2D Canvas Particle Field */}
        <ValidationField />

        {/* Evidence Counters Below */}
        <div className="w-full max-w-[900px] grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 pt-8 border-t border-[rgba(245,241,232,0.08)] items-center">
          {/* Stat 1: 847 -> 12 */}
          <div className="flex flex-col items-center gap-1">
            <div className="font-serif text-3xl md:text-4xl font-bold text-[#F6F5F0]">
              847 <span className="text-[#00A3FF] font-sans">→</span> 12
            </div>
            <div className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
              SIGNALS TO THREATS
            </div>
          </div>

          {/* Stat 2: 98.6% */}
          <div className="flex flex-col items-center gap-1">
            <div className="font-serif text-3xl md:text-4xl font-bold text-[#F6F5F0]">
              98.6%
            </div>
            <div className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
              NOISE ELIMINATED
            </div>
          </div>

          {/* Stat 3: 0 */}
          <div className="flex flex-col items-center gap-1">
            <div className="font-serif text-3xl md:text-4xl font-bold text-[#F6F5F0]">
              0
            </div>
            <div className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
              FALSE POSITIVES
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
