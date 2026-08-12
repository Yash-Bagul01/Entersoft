"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Key, Shield, Sparkles } from "lucide-react";

export default function Secrets_FooterCTA() {
  return (
    <section className="relative w-full bg-[#07090E] text-white py-28 md:py-36 border-t border-white/10 overflow-hidden select-none">
      {/* Matrix Coordinate Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.16) 1px, transparent 0),
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px, 120px 120px, 120px 120px"
          }}
        />
      </div>

      {/* Electric Blue Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#3B82F6]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Cybernetic ASCII Boxes (Corner Decors matching builderstable) */}
      <div className="absolute top-10 right-6 sm:right-16 w-48 sm:w-64 bg-[#0C101A]/80 border border-[#3B82F6]/30 rounded-lg p-3 hidden md:block font-mono text-[9px] text-[#60A5FA]/80 shadow-2xl backdrop-blur-sm pointer-events-none">
        <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-2 text-slate-400">
          <span>GRID.SYS</span>
          <span className="text-emerald-400">LIVE</span>
        </div>
        <pre className="tracking-widest leading-[11px]">
{`— — + + + + + +
— — — + + + + +
+ + + + + + + +
+ + + + + + + +`}
        </pre>
      </div>

      <div className="absolute bottom-10 left-6 sm:left-16 w-48 sm:w-56 bg-[#0E1322]/80 border border-white/15 rounded-lg p-3 hidden md:block font-mono text-[10px] text-slate-300 shadow-2xl backdrop-blur-sm pointer-events-none">
        <div className="flex items-center justify-between text-[#60A5FA] font-bold border-b border-white/10 pb-1 mb-1.5">
          <span>TOKEN.ROTATED</span>
          <span>✓ 100%</span>
        </div>
        <div className="text-[9px] text-slate-400">AWS_KEY: AKIA...99B</div>
        <div className="text-[9px] text-emerald-400">↳ Auto-revoked & synced</div>
      </div>

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center gap-8">
        
        {/* Category Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#60A5FA]"
        >
          <Key className="w-3.5 h-3.5" />
          <span>// DEPLOY ENPROBE SECRETS SCANNER</span>
        </motion.div>

        {/* Massive Editorial Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold uppercase tracking-tight text-white font-sans leading-[0.95] max-w-[1000px]"
        >
          ELIMINATE LEAKS <br />
          <span className="font-serif italic font-normal tracking-normal text-white">AT THE</span> SOURCE.
        </motion.h2>

        {/* Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-[620px]"
        >
          Protect your credentials across every repository, branch, and developer workstation. Deploy sub-second pre-commit hooks and continuous repository auditing today.
        </motion.p>

        {/* Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-md bg-[#3B82F6] hover:bg-[#60A5FA] text-slate-950 font-sans font-bold text-base tracking-tight transition-all duration-300 shadow-[0_0_35px_rgba(59,130,246,0.5)] hover:scale-[1.03] cursor-pointer"
            data-cursor="button"
          >
            <span>Request Secrets Demo</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </motion.div>

        {/* Quick Link Navigation Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 font-mono text-xs text-slate-400"
        >
          <Link href="/#contact" className="hover:text-[#60A5FA] transition-colors" data-cursor="link">
            [01] Live Platform Demo
          </Link>
          <Link href="/platform/sast" className="hover:text-[#60A5FA] transition-colors" data-cursor="link">
            [02] SAST Integration Specs
          </Link>
          <Link href="/platform/sca" className="hover:text-[#60A5FA] transition-colors" data-cursor="link">
            [03] SCA & Supply Chain
          </Link>
          <Link href="/platform/sbom-license-risk" className="hover:text-[#60A5FA] transition-colors" data-cursor="link">
            [04] SBOM & License Risk
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
