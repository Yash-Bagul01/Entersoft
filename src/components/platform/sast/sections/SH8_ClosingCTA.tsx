"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { closingCta } from "@/data/sast";

export default function SH8_ClosingCTA() {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section className="relative bg-[#0C0C0C] py-28 px-6 md:px-12 overflow-hidden text-white border-t border-white/10">
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#5F8CFF]/20 to-[#D8A85F]/10 rounded-full blur-[120px] pointer-events-none opacity-60" />

      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-[800px] mx-auto text-center flex flex-col items-center">
        {/* White Logo Mark / Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-12 h-12 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center mb-8 shadow-inner"
        >
          <span className="font-mono text-lg font-bold text-[#5F8CFF]">E</span>
        </motion.div>

        {/* Large Serif Headlines */}
        <h2 className="text-[clamp(2.4rem,6vw,4.8rem)] font-display font-medium tracking-tight leading-[1.04] mb-4">
          <motion.span
            {...fadeUp}
            className="block text-white"
          >
            {closingCta.heading1}
          </motion.span>
          <motion.span
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="block text-[#D8A85F]"
          >
            {closingCta.heading2}
          </motion.span>
        </h2>

        {/* Subtitle */}
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="text-[17px] md:text-[20px] font-sans text-white/60 leading-relaxed max-w-[540px] mb-10 font-normal"
        >
          {closingCta.sub}
        </motion.p>

        {/* CTA Button (Inverted) */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.45 }}
          className="mb-8"
        >
          <Link 
            href={closingCta.cta.href} 
            className="font-sans text-sm font-semibold bg-white text-[#0C0C0C] hover:bg-white/90 px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 inline-block"
          >
            {closingCta.cta.label}
          </Link>
        </motion.div>

        {/* Reassurance text */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.6 }}
          className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase"
        >
          {closingCta.reassurance.split(" • ").join(" · ")}
        </motion.div>
      </div>
    </section>
  );
}
