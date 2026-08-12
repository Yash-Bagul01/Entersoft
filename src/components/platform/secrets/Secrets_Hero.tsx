"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Key, Shield, Terminal, ArrowRight, Zap, Check, Lock, Sparkles, Copy, X } from "lucide-react";

export default function Secrets_Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyCmd = () => {
    navigator.clipboard.writeText("npx enprobe-secrets scan --all");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full min-h-[92vh] bg-[#07090E] text-white overflow-hidden pt-28 md:pt-36 pb-20 border-b border-white/10 select-none">
      {/* ─────────────────────────────────────────────────────────────
          1. BACKGROUND MATRIX GRID & COORDINATE CROSSES
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.18) 1px, transparent 0),
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px, 120px 120px, 120px 120px"
          }}
        />
      </div>

      {/* Subtle Electric Blue Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] bg-[#3B82F6]/12 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
        {/* ─────────────────────────────────────────────────────────────
            2. TOP METADATA BAR (Builderstable layout)
            ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-12 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#3B82F6] rounded-xs animate-pulse shadow-[0_0_10px_#3B82F6]" />
            <span className="text-white font-bold tracking-wider uppercase">
              Continuous Credential & Key Detection
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <span className="hidden md:inline-block">
              Zero Hardcoded Secrets Across SDLC, CI/CD & Cloud
            </span>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#3B82F6] hover:bg-[#60A5FA] text-slate-950 font-sans font-bold text-xs tracking-tight transition-all duration-200 shadow-[0_0_18px_rgba(59,130,246,0.4)] hover:scale-[1.02] cursor-pointer"
              data-cursor="button"
            >
              <span>Deploy Pre-Commit Hook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. MAIN HERO GRID (Typography Left + Cybernetic Collage Right)
            ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start pt-12 md:pt-16">
          
          {/* Left Column: Massive Editorial Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#60A5FA]"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>// ENPROBE SECRETS SCANNER</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-bold uppercase tracking-tight text-white font-sans leading-[0.94]"
              >
                ELIMINATE <br />
                <span className="font-serif italic font-normal tracking-normal text-white">SECRET</span> LEAKS <br />
                IN REAL TIME.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-[580px]"
            >
              Real-time credential interception built for developers, AppSec leads, and cloud teams. Catch API keys, OAuth tokens, AWS credentials, and SSH keys in pre-commit hooks, git histories, and pull requests with 100% active validity verification.
            </motion.p>

            {/* CTAs & Micro-Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2"
            >
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md bg-[#3B82F6] hover:bg-[#60A5FA] text-slate-950 font-sans font-bold text-base tracking-tight transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.45)] hover:scale-[1.02] cursor-pointer"
                data-cursor="button"
              >
                <span>Scan Your Repositories</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <button
                onClick={handleCopyCmd}
                className="inline-flex items-center gap-2 px-5 py-4 rounded-md bg-[#121620] hover:bg-[#182030] border border-white/15 text-slate-300 font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer group"
                data-cursor="button"
              >
                <Terminal className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>npx enprobe-secrets scan</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                )}
              </button>
            </motion.div>

            {/* Micro Note Subtext */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 text-xs text-slate-400 font-mono"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Pre-commit hooks intercept leaks in &lt; 250ms with zero commit delay.</span>
            </motion.div>
          </div>

          {/* Right Column: Interactive Cybernetic Matrix Collage */}
          <div className="lg:col-span-5 relative w-full h-[460px] sm:h-[520px] flex items-center justify-center">
            
            {/* Box 1: GRID.SYS (ASCII Matrix Wave Card) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute top-0 right-0 sm:right-4 w-[260px] sm:w-[300px] bg-[#0C101A]/95 border border-[#3B82F6]/40 rounded-lg p-3 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.15)] z-20 backdrop-blur-md"
            >
              {/* Box Top Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 font-mono text-[10px] text-slate-300">
                <span className="bg-[#3B82F6]/20 text-[#60A5FA] px-1.5 py-0.5 rounded font-bold">
                  GRID.SYS
                </span>
                <span className="text-slate-500">LIVE FEED</span>
              </div>

              {/* ASCII Pattern Stream */}
              <div className="font-mono text-[10px] leading-[13px] text-[#60A5FA]/80 overflow-hidden select-none">
                <pre className="tracking-widest">
{`—  —  +  +  +  +  +  +  +  +
—  —  —  +  +  +  +  +  +  +
—  —  —  —  +  +  +  +  +  +
+  +  +  +  +  +  +  +  +  +
+  +  +  +  +  +  +  +  +  +
+  +  +  +  +  +  +  +  +  +
—  —  +  +  +  +  +  +  —  —
—  —  —  +  +  +  +  —  —  —`}
                </pre>
              </div>

              {/* Bottom Telemetry */}
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-slate-400">
                <span className="text-[#60A5FA]">PATTERNS: 1,280</span>
                <span className="text-emerald-400 font-bold">ACTIVE</span>
              </div>
            </motion.div>

            {/* Box 2: ENTROPY.RAW & LIVE TOKEN INTERCEPTION */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute bottom-4 left-0 sm:left-2 w-[280px] sm:w-[320px] bg-[#0E1322]/95 border border-white/15 rounded-lg p-4 shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_24px_rgba(59,130,246,0.18)] z-30 backdrop-blur-lg"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 font-mono text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="bg-[#3B82F6] text-slate-950 font-bold px-1.5 py-0.5 rounded text-[9px]">
                    ENTROPY.RAW
                  </span>
                  <span className="text-slate-300 font-bold">SHANNON: 7.94</span>
                </div>
                <span className="text-rose-400 font-mono text-[10px] font-bold bg-rose-500/15 border border-rose-500/30 px-1.5 py-0.5 rounded">
                  LEAK BLOCKED
                </span>
              </div>

              {/* Intercepted Code Snippet */}
              <div className="bg-[#06080F] border border-white/10 rounded p-2.5 font-mono text-[11px] text-slate-300 space-y-1">
                <div className="text-slate-500 text-[10px]">// AWS Production Credential</div>
                <div className="text-rose-400 font-semibold truncate">
                  - AWS_KEY: AKIA_SAMPLE_PROD_EXPOSURE_01
                </div>
                <div className="text-[#60A5FA] text-[10px]">
                  ✓ Verified: Active IAM Admin Token
                </div>
                <div className="text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                  <span>↳ Pre-receive Git hook rejected commit</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Latency: 184ms</span>
                <span className="text-[#60A5FA]">Rotation: Dispatched</span>
              </div>
            </motion.div>

            {/* Box 3: SPECTRA.WAVE / CYBERNETIC FIELD GLOW */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-[260px] h-[200px] bg-gradient-to-br from-[#1E293B]/80 via-[#0F172A]/90 to-[#0284C7]/20 border border-[#3B82F6]/30 rounded-xl p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
            >
              {/* Corner Handles */}
              <span className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#3B82F6]" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#3B82F6]" />
              <span className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#3B82F6]" />
              <span className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#3B82F6]" />

              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span className="text-[#60A5FA] font-bold">FIELD.GLSL</span>
                <span>SHA-256 MATCH</span>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#3B82F6]/60 flex items-center justify-center text-[#60A5FA] animate-spin-slow">
                  <Key className="w-7 h-7" />
                </div>
              </div>

              <div className="font-mono text-[10px] text-slate-400 text-center">
                Zero Commit Latency Engine
              </div>
            </motion.div>

            {/* Floating Electric Blue Coordinate Squares */}
            <div className="absolute top-16 left-8 w-3 h-3 bg-[#3B82F6] shadow-[0_0_12px_#3B82F6] animate-bounce" />
            <div className="absolute bottom-28 right-12 w-2 h-2 bg-[#60A5FA] shadow-[0_0_8px_#60A5FA]" />
          </div>
        </div>
      </div>
    </section>
  );
}
