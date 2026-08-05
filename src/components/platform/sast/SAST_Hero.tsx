"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Code, Cpu, ShieldAlert, Sparkles, CheckCircle } from "lucide-react";

export default function SAST_Hero() {
  return (
    <section className="relative w-full pt-28 pb-12 md:pt-32 md:pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-[#030712] text-white border-b border-white/10 font-sans">
      
      {/* Background Dot Matrix Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          RIGHT SIDE: VOXAURA ANIMATED NEON AURORA GRADIENT + 4 GLASS PRISM COLUMNS
          Spans from top: 0px (behind navbar) down to bottom of section
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute top-0 right-0 w-full lg:w-[50%] h-full pointer-events-none overflow-hidden z-0">
        
        {/* Soft Left Fade Blend */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-36 lg:w-44 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent z-20 pointer-events-none" />

        {/* Floating Animated Aurora Gradient Blobs (VoxAura Neon Cyan/Indigo/Violet Palette) */}
        <div className="absolute inset-0 z-0 opacity-95">
          
          {/* Blob 1: Sapphire & Electric Cyan (Top Left of Color Section) */}
          <motion.div
            animate={{
              x: [-25, 35, -15],
              y: [-20, 30, -25],
              scale: [1, 1.18, 0.92],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute -top-16 left-0 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#0284C7] via-[#38BDF8] to-[#06B6D4] blur-[55px] opacity-90"
          />

          {/* Blob 2: Royal Indigo & Neon Violet (Top Right of Color Section) */}
          <motion.div
            animate={{
              x: [25, -35, 20],
              y: [-25, 25, -20],
              scale: [1, 1.12, 0.92],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#4F46E5] via-[#6366F1] to-[#818CF8] blur-[60px] opacity-90"
          />

          {/* Blob 3: Deep Purple & Electric Indigo (Center Right) */}
          <motion.div
            animate={{
              x: [35, -30, 25],
              y: [25, -25, 30],
              scale: [0.92, 1.22, 0.98],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute top-1/3 left-1/4 w-[440px] h-[440px] rounded-full bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#3B82F6] blur-[70px] opacity-85"
          />

          {/* Blob 4: Neon Cyan & Deep Navy (Bottom Right) */}
          <motion.div
            animate={{
              x: [-35, 25, -25],
              y: [35, -20, 25],
              scale: [1, 1.15, 0.92],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute bottom-0 right-[-30px] w-[460px] h-[480px] rounded-full bg-gradient-to-tl from-[#06B6D4] via-[#0284C7] to-[#1E1B4B] blur-[65px] opacity-85"
          />
        </div>

        {/* 4 Vertical Translucent Glass Prism Columns (Fast dynamic light beam animation) */}
        <div className="absolute inset-0 z-10 grid grid-cols-4 w-full h-full">
          
          {/* Column 1 */}
          <div className="relative h-full border-l border-white/10 backdrop-blur-[6px] bg-gradient-to-b from-white/10 via-white/5 to-transparent overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <motion.div
              animate={{ y: ["-100%", "250%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear", delay: 0.2 }}
              className="absolute inset-x-0 h-48 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent opacity-80 pointer-events-none"
            />
          </div>

          {/* Column 2 */}
          <div className="relative h-full border-l border-white/15 backdrop-blur-[8px] bg-gradient-to-b from-white/12 via-white/5 to-transparent overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
            <motion.div
              animate={{ y: ["-100%", "250%"] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "linear", delay: 1.1 }}
              className="absolute inset-x-0 h-56 bg-gradient-to-b from-transparent via-indigo-400/60 to-transparent opacity-85 pointer-events-none"
            />
          </div>

          {/* Column 3 */}
          <div className="relative h-full border-l border-white/10 backdrop-blur-[10px] bg-gradient-to-b from-white/10 via-white/5 to-transparent overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <motion.div
              animate={{ y: ["-100%", "250%"] }}
              transition={{ duration: 3.0, repeat: Infinity, ease: "linear", delay: 1.9 }}
              className="absolute inset-x-0 h-48 bg-gradient-to-b from-transparent via-purple-400/50 to-transparent opacity-80 pointer-events-none"
            />
          </div>

          {/* Column 4 */}
          <div className="relative h-full border-l border-white/15 backdrop-blur-[12px] bg-gradient-to-b from-white/15 via-white/5 to-transparent overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-52 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
            <motion.div
              animate={{ y: ["-100%", "250%"] }}
              transition={{ duration: 4.1, repeat: Infinity, ease: "linear", delay: 0.5 }}
              className="absolute inset-x-0 h-56 bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent opacity-85 pointer-events-none"
            />
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          CONTENT CONTAINER
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: HERO TYPOGRAPHY, BUTTONS & HIGHLIGHTS */}
        <div className="lg:col-span-7 flex flex-col items-start">
          
          {/* Eyebrow Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-cyan-950/80 border border-cyan-500/40 px-3.5 py-1 rounded-full text-cyan-400 font-semibold text-[11.5px] mb-5 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:border-cyan-400 transition-colors font-mono"
          >
            <Code className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>VOXAURA NEURAL SAST ENGINE</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px] xl:text-[48px] leading-[1.12] font-medium uppercase tracking-tight text-white mb-5 font-sans"
          >
            <span className="block text-white font-medium">Analyze Codebase.</span>
            <span className="block text-white font-medium">Beyond Vulnerabilities.</span>
            <span className="block bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC] bg-clip-text text-transparent font-medium">
              Infinite Precision.
            </span>
          </motion.h1>

          {/* Subtitle Body Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 font-normal text-sm md:text-base leading-[1.65] max-w-[480px] mb-7"
          >
            Scan source code statically, surface zero-day vulnerabilities with striking accuracy. Integrate smoothly into IDEs, build systems, and enterprise pipelines. Swift. Deep. Audit-ready.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3.5 mb-10 z-30 relative"
          >
            <Link
              href="/#contact"
              className="!bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 !text-slate-950 px-6.5 py-3 rounded-full font-bold shadow-[0_0_24px_rgba(6,182,212,0.4)] flex items-center gap-2 text-xs tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer relative z-30"
            >
              <span className="!text-slate-950 font-bold">Begin building today</span>
              <ArrowUpRight className="w-4 h-4 !text-slate-950 shrink-0" />
            </Link>

            <Link
              href="/#contact"
              className="!bg-slate-900/80 hover:!bg-slate-800 !text-slate-200 border border-slate-700/80 px-6.5 py-3 rounded-full font-semibold text-xs shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer relative z-30"
            >
              Talk to Sales
            </Link>
          </motion.div>

          {/* Bottom Features Highlights Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-10 pt-6 border-t border-white/10 w-full max-w-[620px]"
          >
            {/* Feature 1 */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-white tracking-tight leading-tight">AST Engine Parsing</span>
                <span className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">Real-time processing</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-white tracking-tight leading-tight">Taint Flow Graph</span>
                <span className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">Pixel-perfect accuracy</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-white tracking-tight leading-tight">Zero False Positives</span>
                <span className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">Commercial stability</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: FLOATING VOXAURA GLASS ENGINE CARD */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end z-20 mt-4 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="w-full max-w-[370px] bg-[#090F1E]/80 backdrop-blur-2xl border border-white/15 rounded-2xl p-6 shadow-2xl shadow-cyan-950/60 text-white relative overflow-hidden"
          >
            {/* Top Glow Tracer */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

            <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                </span>
                <span className="font-mono text-xs font-bold tracking-wider text-white uppercase">SAST SEMANTIC ENGINE</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-cyan-950/90 border border-cyan-500/50 px-2 py-0.5 rounded-full text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                LIVE AUDIT
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between bg-slate-900/60 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-inner">
                <span className="text-slate-300 font-sans">Control Flow Graph</span>
                <span className="font-bold text-cyan-400">3,840 AST Nodes</span>
              </div>
              <div className="flex items-center justify-between bg-slate-900/60 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-inner">
                <span className="text-slate-300 font-sans">Taint Analysis</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> 100% Verified
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-900/60 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-inner">
                <span className="text-slate-300 font-sans">False Positive Rate</span>
                <span className="font-bold text-indigo-300">&lt; 0.1% Zero Noise</span>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300 font-sans">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Continuous Pre-Commit Defense
              </span>
              <span className="font-mono text-[10px] font-bold text-slate-400">v4.2-PRO</span>
            </div>
          </motion.div>
        </div>

      </div>

    </section>
  );
}
