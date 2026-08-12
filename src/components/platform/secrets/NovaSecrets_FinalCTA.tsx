"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Key, Sparkles } from "lucide-react";

export default function NovaSecrets_FinalCTA() {
  return (
    <section className="relative w-full bg-[#030303] text-white py-32 md:py-44 overflow-hidden border-t border-[#27272A]/80 select-none">
      
      {/* Radiant Shiny Blue Horizon Arc Glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-[#3B82F6]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/60 to-transparent" />

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181B] border border-white/10 text-xs font-mono text-[#60A5FA] uppercase tracking-wider mb-8 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
          <span>ZERO CREDENTIAL EXPOSURE</span>
        </motion.div>

        {/* Master Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white font-sans leading-[1.02] mb-6"
        >
          Zero Leaks. <br />
          <span className="bg-gradient-to-r from-[#93C5FD] via-[#60A5FA] to-[#38BDF8] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]">
            Absolute Credential Trust.
          </span>
        </motion.h2>

        {/* Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#A1A1AA] font-sans max-w-[680px] leading-relaxed mb-10"
        >
          Deploy sub-second pre-commit hooks, historical git repository auditing, and automated cloud IAM key rotation across your engineering fleets today.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#030303] font-sans font-semibold text-sm tracking-tight transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.35)] hover:scale-[1.03] cursor-pointer"
            data-cursor="button"
          >
            <span>Request Secrets Demo</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>

          <Link
            href="/platform/sast"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-transparent hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white font-sans font-medium text-sm transition-all duration-200 cursor-pointer"
            data-cursor="button"
          >
            <span>Explore SAST Platform →</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
