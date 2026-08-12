"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Terminal, GitBranch, Key } from "lucide-react";
import Link from "next/link";

export default function ThayonSecrets_BottomCTA() {
  return (
    <section className="relative w-full bg-[#08090D] text-white py-24 md:py-32 overflow-hidden border-b border-neutral-800 dark-panel">
      {/* Ambient Halo Glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-500/15 via-indigo-500/8 to-transparent blur-[120px] rounded-full" 
      />

      {/* Top 5-Point Crosshair Guide Bar */}
      <div className="relative max-w-[1320px] mx-auto px-6 mb-16">
        <div className="flex items-center justify-between text-neutral-600 text-sm font-mono select-none">
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
        </div>
      </div>

      <div className="relative max-w-[1000px] mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>[ CONTINUOUS CREDENTIAL RESILIENCE ]</span>
        </div>

        {/* Large Editorial Statement */}
        <h2 
          className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-tight mb-6 text-white" 
          style={{ color: '#ffffff' }}
        >
          Zero Leakage. Zero False Positives. Total Credential Defense.
        </h2>

        <p 
          className="font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-12 font-light text-neutral-300" 
          style={{ color: '#d4d4d8' }}
        >
          Deploy pre-commit prevention across developer machines in under 5 minutes, or initiate an exhaustive historical audit of all git repositories with Entersoft EnProbe.
        </p>

        {/* 3 Action Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left mb-12">
          <Link
            href="/contact"
            className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all group flex flex-col justify-between"
          >
            <div>
              <GitBranch className="w-6 h-6 text-blue-400 mb-3" />
              <div className="text-sm font-semibold text-white font-sans" style={{ color: '#ffffff' }}>
                Install GitHub App
              </div>
              <div className="text-xs text-neutral-300 mt-1 font-sans" style={{ color: '#a1a1aa' }}>
                Automated PR security gates across all organization repositories.
              </div>
            </div>
            <div className="pt-4 text-xs font-mono text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Connect Repos →</span>
            </div>
          </Link>

          <Link
            href="/contact"
            className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all group flex flex-col justify-between"
          >
            <div>
              <Terminal className="w-6 h-6 text-emerald-400 mb-3" />
              <div className="text-sm font-semibold text-white font-sans" style={{ color: '#ffffff' }}>
                Install Secrets CLI
              </div>
              <div className="text-xs text-neutral-300 mt-1 font-sans" style={{ color: '#a1a1aa' }}>
                brew install entersoft/tap/secrets-guard
              </div>
            </div>
            <div className="pt-4 text-xs font-mono text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>View CLI Docs →</span>
            </div>
          </Link>

          <Link
            href="/contact"
            className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all group flex flex-col justify-between"
          >
            <div>
              <Key className="w-6 h-6 text-amber-400 mb-3" />
              <div className="text-sm font-semibold text-white font-sans" style={{ color: '#ffffff' }}>
                AppSec Consultation
              </div>
              <div className="text-xs text-neutral-300 mt-1 font-sans" style={{ color: '#a1a1aa' }}>
                Speak with our lead cryptographic security architect.
              </div>
            </div>
            <div className="pt-4 text-xs font-mono text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Book Briefing →</span>
            </div>
          </Link>
        </div>

        {/* Center Pill Button */}
        <div className="flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-950 font-sans text-sm font-semibold hover:bg-neutral-200 transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            <span>Start Free 14-Day Secrets Protection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bottom 5-Point Crosshair Guide Bar */}
      <div className="relative max-w-[1320px] mx-auto px-6 mt-16">
        <div className="flex items-center justify-between text-neutral-600 text-sm font-mono select-none">
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
          <div className="h-[1px] flex-1 bg-neutral-800 mx-4" />
          <span className="text-neutral-500 font-light">+</span>
        </div>
      </div>
    </section>
  );
}
