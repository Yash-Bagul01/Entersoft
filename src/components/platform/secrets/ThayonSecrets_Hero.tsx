"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, CheckCircle2, Shield, Lock, Eye, Key } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ThayonSecrets_Hero() {
  const [activeTab, setActiveTab] = useState<"redaction" | "validity" | "rotation">("redaction");

  return (
    <section className="relative w-full bg-[#FAFCFF] pt-32 pb-0 md:pt-40 md:pb-0 text-slate-900 overflow-hidden">
      {/* 1. Atmospheric Ambient Glow (Top & Bottom subtle violet/blue halo) */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-blue-500/20 via-indigo-500/12 to-transparent blur-[120px] rounded-full" 
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:28px_28px] opacity-25" 
      />

      {/* Top 5-Point Crosshair Horizontal Guide Bar */}
      <div className="relative max-w-[1320px] mx-auto px-6 mb-12">
        <div className="flex items-center justify-between text-slate-400 text-sm font-mono select-none">
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
        </div>
      </div>

      <div className="relative max-w-[1240px] mx-auto px-6 flex flex-col items-center text-center">
        {/* Monospaced Kicker Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white/90 backdrop-blur-md shadow-sm mb-6 text-xs font-mono uppercase tracking-widest text-slate-600"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>[ ENPROBE PLATFORM // SECRETS & CREDENTIAL DEFENSE ]</span>
        </motion.div>

        {/* Main Hero Headline - Editorial Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-slate-950 max-w-5xl leading-[1.12] mb-6"
        >
          We eliminate hardcoded credentials and exposed secrets across your engineering lifecycle
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed font-sans mb-10 font-normal"
        >
          Entersoft EnProbe unifies developer workstation pre-commit interception, recursive git graph forensics, and active sandboxed validity verification to eradicate secret leaks with zero developer friction.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-slate-950 text-white font-sans text-sm font-medium tracking-wide shadow-xl shadow-slate-950/20 hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span>Schedule EnProbe Secrets Audit</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>

          <a
            href="#interactive-demo"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-slate-300 text-slate-800 font-sans text-sm font-medium hover:bg-slate-50 hover:border-slate-400 active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            <Terminal className="w-4 h-4 text-slate-500" />
            <span>Try Live Simulator</span>
          </a>
        </motion.div>
      </div>

      {/* 2. PANORAMIC IRIDESCENT HERO IMAGE & SCANNER CANVAS */}
      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="relative w-full h-[380px] sm:h-[480px] md:h-[580px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl bg-slate-950"
        >
          {/* Luminous Image Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/secrets/hero_hologram.png"
              alt="Entersoft EnProbe Holographic Secrets Scanner"
              fill
              className="object-cover object-center scale-105 transition-transform duration-1000 hover:scale-100 opacity-90"
              priority
            />
            {/* Iridescent Gradient Blend Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-violet-900/30 mix-blend-color-dodge" />
          </div>

          {/* Precision Target Overlay Matrix */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-10 pointer-events-none select-none font-mono">
            {/* Top corner brackets & crosshairs */}
            <div className="flex justify-between items-start text-white/70">
              <div className="flex items-center gap-2">
                <span className="text-xl leading-none">┌</span>
                <span className="text-xs text-white/60 uppercase tracking-widest hidden sm:inline">
                  ENPROBE_SECRETS // SCAN_MATRIX
                </span>
              </div>
              <div className="flex items-center gap-6 text-white/50 text-xs">
                <span>LATITUDE: 51.5074° N</span>
                <span>ENTROPY: 4.92 BITS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60 uppercase tracking-widest hidden sm:inline">
                  SIG: 1,280+ RULES
                </span>
                <span className="text-xl leading-none">┐</span>
              </div>
            </div>

            {/* Center target crosshair array */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="grid grid-cols-5 gap-8 sm:gap-16 text-white/60 text-base sm:text-xl font-light">
                <span>+</span>
                <span>+</span>
                <span className="text-emerald-400 scale-125">+</span>
                <span>+</span>
                <span>+</span>
              </div>
              <div className="h-[1px] w-48 sm:w-96 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="h-[1px] w-32 sm:w-64 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
            </div>

            {/* Bottom corner brackets & status line */}
            <div className="flex justify-between items-end text-white/70">
              <div className="flex items-center gap-2">
                <span className="text-xl leading-none">└</span>
                <span className="text-xs text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                  ● 0 SEC EXFILTRATION WINDOW
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-white/60">
                <span>AUTO_ROTATION: ENABLED</span>
                <span>VAULT_SYNC: LIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60 uppercase tracking-widest hidden sm:inline">
                  SHA: 7e2f1a9
                </span>
                <span className="text-xl leading-none">┘</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Micro Metric Badges */}
      <div className="relative max-w-[1240px] mx-auto px-6 mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">1,280+</div>
            <div className="text-xs text-slate-500 mt-0.5">Verified Rule Signatures</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">&lt; 240ms</div>
            <div className="text-xs text-slate-500 mt-0.5">Pre-Commit Scan Latency</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">99.8%</div>
            <div className="text-xs text-slate-500 mt-0.5">False Positive Reduction</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">0 sec</div>
            <div className="text-xs text-slate-500 mt-0.5">Exfiltration Window Allowed</div>
          </div>
        </div>
      </div>

      {/* Bottom 5-Point Crosshair Divider */}
      <div className="relative max-w-[1320px] mx-auto px-6 mt-16">
        <div className="flex items-center justify-between text-slate-400 text-sm font-mono select-none">
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
          <div className="h-[1px] flex-1 bg-slate-200/90 mx-4" />
          <span className="font-light text-slate-400">+</span>
        </div>
      </div>
    </section>
  );
}
