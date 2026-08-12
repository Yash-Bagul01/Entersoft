"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Terminal } from "lucide-react";

export default function Iac_FinalCTA() {
  return (
    <section className="relative w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#040407] text-[#FFFFFF] border-t border-white/[0.08] overflow-hidden isolate">
      {/* Central Iridescent Aura Light Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-r from-[#2563EB]/20 via-[#7C3AED]/25 to-[#06B6D4]/20 blur-[170px] pointer-events-none" />

      <div className="relative z-10 max-w-[1020px] mx-auto text-center flex flex-col items-center">
        {/* Status Pill Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.2] bg-white/[0.08] backdrop-blur-xl mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C4B5FD]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#E4E4E7]">
            // ZERO AGENT DEPLOYMENT IN UNDER 5 MINUTES
          </span>
        </motion.div>

        {/* Large Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-sans font-normal tracking-[-0.03em] leading-[1.08] text-[#FFFFFF] max-w-4xl"
        >
          Ready to harden your cloud infrastructure before deployment?
        </motion.h2>

        {/* Description Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#D4D4D8] font-normal leading-relaxed max-w-2xl mt-6 sm:mt-7 text-balance"
        >
          Eliminate infrastructure vulnerabilities, enforce Open Policy Agent guardrails, and achieve continuous multi-cloud compliance.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          {/* Primary Stark-White Button */}
          <Link
            href="/company/contact"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#FFFFFF] text-[#0A0A0F] font-sans font-semibold text-sm sm:text-base hover:bg-zinc-100 transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Request Technical Briefing</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
          </Link>

          {/* Secondary Frosted Glass Button */}
          <a
            href="#simulator"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-black/50 border border-white/25 text-[#FFFFFF] font-sans font-medium text-sm sm:text-base hover:bg-white/15 hover:border-white/40 transition-all duration-300 backdrop-blur-xl shadow-lg active:scale-[0.98]"
          >
            <Terminal className="w-4 h-4 text-[#93C5FD]" />
            <span>Launch Interactive Simulator</span>
          </a>
        </motion.div>

        {/* Enterprise Trust Assurance */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-white/50 font-mono text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[#E4E4E7]">SOC 2 Type II Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[#E4E4E7]">ISO 27001 Aligned</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[#E4E4E7]">CIS Benchmark Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
