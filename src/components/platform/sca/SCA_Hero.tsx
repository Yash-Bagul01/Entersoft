"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Shield, Layers, ShieldCheck, Lock, Sparkles } from "lucide-react";

export default function SCA_Hero() {
  return (
    <section className="relative w-full pt-28 pb-12 md:pt-32 md:pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-white text-slate-900 border-b border-slate-100 font-sans">
      
      {/* ─────────────────────────────────────────────────────────────
          RIGHT SIDE: ANIMATED AURORA GRADIENT + 5 GLASS PRISM COLUMNS
          Spans from top: 0px (behind navbar) down to bottom of section
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute top-0 right-0 w-full lg:w-[58%] h-full pointer-events-none overflow-hidden z-0">
        
        {/* Soft Left Fade Blend (Blends white left side into right color section) */}
        <div className="absolute inset-y-0 left-0 w-28 md:w-40 lg:w-48 bg-gradient-to-r from-white via-white/85 to-transparent z-20 pointer-events-none" />

        {/* Floating Animated Aurora Gradient Blobs (Left to Right Shade Flow) */}
        <div className="absolute inset-0 z-0 opacity-95">
          
          {/* Blob 1: Soft Ice Cyan & Sky Blue (Far Left of Color Section) */}
          <motion.div
            animate={{
              x: [-30, 30, -20],
              y: [-15, 25, -20],
              scale: [1, 1.15, 0.95],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute -top-12 -left-16 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#E0F2FE] via-[#BAE6FD] to-[#7DD3FC] blur-[55px] opacity-90"
          />

          {/* Blob 2: Sky Blue & Light Indigo */}
          <motion.div
            animate={{
              x: [-25, 35, -15],
              y: [-20, 30, -25],
              scale: [1, 1.18, 0.92],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute -top-16 left-[20%] w-[440px] h-[440px] rounded-full bg-gradient-to-tr from-[#BAE6FD] via-[#93C5FD] to-[#60A5FA] blur-[50px] opacity-95"
          />

          {/* Blob 3: Electric Sky Blue & Light Indigo (Top Right) */}
          <motion.div
            animate={{
              x: [25, -35, 20],
              y: [-25, 25, -20],
              scale: [1, 1.12, 0.92],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute -top-20 right-0 w-[480px] h-[480px] rounded-full bg-gradient-to-bl from-[#93C5FD] via-[#60A5FA] to-[#818CF8] blur-[60px] opacity-90"
          />

          {/* Blob 4: Rich Royal Blue & Indigo (Center Right) */}
          <motion.div
            animate={{
              x: [35, -30, 25],
              y: [25, -25, 30],
              scale: [0.92, 1.22, 0.98],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute top-1/3 left-1/3 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#3B82F6] via-[#4F46E5] to-[#6366F1] blur-[70px] opacity-85"
          />

          {/* Blob 5: Deep Violet & Purple (Bottom Right) */}
          <motion.div
            animate={{
              x: [-35, 25, -25],
              y: [35, -20, 25],
              scale: [1, 1.15, 0.92],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute bottom-0 right-[-30px] w-[440px] h-[460px] rounded-full bg-gradient-to-tl from-[#7C3AED] via-[#581C87] to-[#3B82F6] blur-[65px] opacity-85"
          />
        </div>

        {/* 5 Vertical Translucent Glass Prism Columns (Added 1 Column to the Left) */}
        <div className="absolute inset-0 z-10 grid grid-cols-5 w-full h-full">
          
          {/* Column 1 (NEW: Added to Left, continuing left-to-right shade flow) */}
          <div className="relative h-full border-l border-white/35 backdrop-blur-[4px] bg-gradient-to-b from-white/15 via-white/5 to-transparent overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
            <motion.div
              animate={{ y: ["-100%", "250%"] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "linear", delay: 1.8 }}
              className="absolute inset-x-0 h-44 bg-gradient-to-b from-transparent via-white/55 to-transparent opacity-75 pointer-events-none"
            />
          </div>

          {/* Column 2 */}
          <div className="relative h-full border-l border-white/40 backdrop-blur-[6px] bg-gradient-to-b from-white/20 via-white/5 to-transparent overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
            <motion.div
              animate={{ y: ["-100%", "250%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
              className="absolute inset-x-0 h-48 bg-gradient-to-b from-transparent via-white/60 to-transparent opacity-80 pointer-events-none"
            />
          </div>

          {/* Column 3 */}
          <div className="relative h-full border-l border-white/45 backdrop-blur-[8px] bg-gradient-to-b from-white/10 via-white/10 to-transparent overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
            <motion.div
              animate={{ y: ["-100%", "250%"] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "linear", delay: 1.2 }}
              className="absolute inset-x-0 h-56 bg-gradient-to-b from-transparent via-white/70 to-transparent opacity-85 pointer-events-none"
            />
          </div>

          {/* Column 4 */}
          <div className="relative h-full border-l border-white/40 backdrop-blur-[10px] bg-gradient-to-b from-white/20 via-white/5 to-transparent overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
            <motion.div
              animate={{ y: ["-100%", "250%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear", delay: 2.1 }}
              className="absolute inset-x-0 h-48 bg-gradient-to-b from-transparent via-white/65 to-transparent opacity-80 pointer-events-none"
            />
          </div>

          {/* Column 5 */}
          <div className="relative h-full border-l border-white/45 backdrop-blur-[12px] bg-gradient-to-b from-white/30 via-white/10 to-transparent overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-52 bg-gradient-to-b from-white/45 to-transparent pointer-events-none" />
            <motion.div
              animate={{ y: ["-100%", "250%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 0.6 }}
              className="absolute inset-x-0 h-56 bg-gradient-to-b from-transparent via-white/75 to-transparent opacity-85 pointer-events-none"
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
          
          {/* Eyebrow Pill Badge (Matching reference image) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-indigo-50/90 border border-indigo-200/80 px-3.5 py-1 rounded-full text-indigo-600 font-semibold text-[11.5px] mb-5 shadow-2xs hover:bg-indigo-100/80 transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-600" />
            <span>Next-Gen Open Source (SCA)</span>
          </motion.div>

          {/* Headline (Matching other section H1 titles styling & proportion) */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px] xl:text-[48px] leading-[1.12] font-medium uppercase tracking-tight text-[#111827] mb-5 font-sans"
          >
            <span className="block text-[#111827] font-medium">Secure Open Source.</span>
            <span className="block text-[#111827] font-medium">Across Dependencies.</span>
            <span className="block bg-gradient-to-r from-[#4F46E5] via-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent font-medium">
              Limitless Control.
            </span>
          </motion.h1>

          {/* Subtitle Body Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 font-normal text-sm md:text-base leading-[1.65] max-w-[480px] mb-7"
          >
            Identify vulnerable third-party libraries, clone dependency graphs with striking accuracy. Integrate smoothly into applications, pipelines, and cloud workflows. Swift. Secure. Audit-ready.
          </motion.p>

          {/* CTA Buttons (High Visibility Action Buttons) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3.5 mb-10 z-30 relative"
          >
            <Link
              href="/#contact"
              className="!bg-[#111827] hover:!bg-black !text-white px-6.5 py-3 rounded-full font-semibold shadow-md hover:shadow-lg flex items-center gap-2 text-xs tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer relative z-30"
            >
              <span className="!text-white font-semibold">Begin building today</span>
              <ArrowUpRight className="w-4 h-4 !text-white shrink-0" />
            </Link>

            <Link
              href="/#contact"
              className="!bg-white/90 hover:!bg-indigo-50/80 !text-indigo-600 border border-indigo-200/90 px-6.5 py-3 rounded-full font-semibold text-xs shadow-2xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer relative z-30"
            >
              Talk to Sales
            </Link>
          </motion.div>

          {/* Bottom Features Highlights Row (3 items matching bottom of reference image) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-10 pt-6 border-t border-slate-200/80 w-full max-w-[620px]"
          >
            {/* Feature 1 */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100/90 flex items-center justify-center text-indigo-600 shrink-0 shadow-2xs">
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-slate-900 tracking-tight leading-tight">Automated SBOM</span>
                <span className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">Real-time processing</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100/90 flex items-center justify-center text-indigo-600 shrink-0 shadow-2xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-slate-900 tracking-tight leading-tight">CVE Reachability</span>
                <span className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">Pixel-perfect accuracy</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100/90 flex items-center justify-center text-indigo-600 shrink-0 shadow-2xs">
                <Lock className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-slate-900 tracking-tight leading-tight">License Defense</span>
                <span className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">Commercial stability</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: FLOATING GLASS CARD OVERLAY ON COLOR SECTION */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end z-20 mt-4 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="w-full max-w-[360px] bg-white/30 backdrop-blur-xl border border-white/60 rounded-2xl p-5.5 shadow-2xl shadow-indigo-950/15 text-slate-900"
          >
            <div className="flex items-center justify-between border-b border-white/40 pb-3.5 mb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
                </span>
                <span className="font-mono text-xs font-bold tracking-wider text-slate-900 uppercase">SCA DEEPEND ENGINE</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-white/60 border border-white/80 px-2 py-0.5 rounded-full text-indigo-700 shadow-2xs">
                LIVE AUDIT
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between bg-white/40 backdrop-blur-md p-2.5 rounded-xl border border-white/50 shadow-2xs">
                <span className="text-slate-600 font-sans">Transitive Graph</span>
                <span className="font-bold text-indigo-700">1,420 Modules</span>
              </div>
              <div className="flex items-center justify-between bg-white/40 backdrop-blur-md p-2.5 rounded-xl border border-white/50 shadow-2xs">
                <span className="text-slate-600 font-sans">CVE Match Status</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Shielded
                </span>
              </div>
              <div className="flex items-center justify-between bg-white/40 backdrop-blur-md p-2.5 rounded-xl border border-white/50 shadow-2xs">
                <span className="text-slate-600 font-sans">License Risk</span>
                <span className="font-bold text-slate-800">Zero Conflict</span>
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-white/40 flex items-center justify-between text-[11px] text-slate-700 font-sans">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" /> Continuous SBOM Defense
              </span>
              <span className="font-mono text-[10px] font-bold text-slate-500">v3.4-PRO</span>
            </div>
          </motion.div>
        </div>

      </div>

    </section>
  );
}
