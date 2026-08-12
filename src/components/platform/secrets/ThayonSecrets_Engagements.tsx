"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitPullRequest, Database, ShieldCheck, Cpu, ArrowRight, Layers, FileCode, CheckCircle, Terminal } from "lucide-react";
import Link from "next/link";

export default function ThayonSecrets_Engagements() {
  return (
    <section className="relative w-full bg-[#FAFCFF] text-slate-900 py-24 md:py-32 border-b border-slate-200/80 overflow-hidden">
      {/* Top 5-Point Crosshair Guide Bar */}
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

      <div className="relative max-w-[1240px] mx-auto px-6 text-center">
        {/* Section Kicker */}
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500 mb-4">
          <span>[ 02 // ARCHITECTURAL DEPLOYMENT ]</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-950 max-w-4xl mx-auto leading-tight mb-6">
          Two integrated defense layers, backed by 850+ cryptographic detectors and verified validity checks
        </h2>

        <p className="text-slate-600 font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-12 font-normal">
          From developer IDEs and pre-commit hooks to deep multi-year git history audits and cloud storage buckets.
        </p>

        {/* SVG Tree Connector Branch (Thayon Signature Visual) */}
        <div className="hidden md:flex justify-center items-center mb-8" aria-hidden="true">
          <svg width="520" height="75" viewBox="0 0 520 75" fill="none" className="text-slate-300">
            {/* Top vertical connector */}
            <path d="M260 0 V32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Horizontal branch */}
            <path d="M130 32 H390" stroke="currentColor" strokeWidth="1.5" />
            {/* Left and right down connectors */}
            <path d="M130 32 V75" stroke="currentColor" strokeWidth="1.5" />
            <path d="M390 32 V75" stroke="currentColor" strokeWidth="1.5" />
            {/* Crosshair markers on joints */}
            <circle cx="260" cy="32" r="3.5" fill="#475569" />
            <circle cx="130" cy="75" r="3.5" fill="#475569" />
            <circle cx="390" cy="75" r="3.5" fill="#475569" />
          </svg>
        </div>

        {/* 2-Card Grid (Embedded vs Deep Audit) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto mb-14">
          {/* Card 1: Embedded Pre-Commit Guard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-xl hover:border-slate-300 transition-all group relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-8 text-blue-600 group-hover:scale-105 transition-transform">
              <GitPullRequest className="w-7 h-7" />
            </div>

            <div className="text-xs font-mono text-blue-600 font-semibold uppercase tracking-widest mb-2">
              Layer 01 // Shift-Left
            </div>
            <h3 className="text-2xl font-serif text-slate-950 mb-4">
              Embedded Pre-Commit Guard
            </h3>
            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed mb-6">
              A lightweight binary embedded into git hooks, IDE extensions (VS Code, JetBrains), and CI/CD pipelines. Intercepts exposed secrets in memory before code ever leaves the developer workstation.
            </p>

            <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs font-mono text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>&lt; 0.4s local execution time (zero CI slowdown)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Local SHA-256 pattern cache (no cloud exfiltration)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Automated secret masking with vault variable substitution</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Deep Git History & Perimeter Auditing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-xl hover:border-slate-300 transition-all group relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-8 text-indigo-600 group-hover:scale-105 transition-transform">
              <Database className="w-7 h-7" />
            </div>

            <div className="text-xs font-mono text-indigo-600 font-semibold uppercase tracking-widest mb-2">
              Layer 02 // Deep Audit
            </div>
            <h3 className="text-2xl font-serif text-slate-950 mb-4">
              Historical Git Traversal
            </h3>
            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed mb-6">
              Traverses billions of historical commits, merged PRs, orphan branches, Terraform state files, and container layers to uncover zombie credentials pushed months or years ago.
            </p>

            <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs font-mono text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Multi-million commit tree indexing in minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Active API validity probing in isolated sandboxes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Automated git history sanitization & key revocation</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-950 text-white font-sans text-sm font-medium hover:bg-slate-800 transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Brief our AppSec Architect</span>
          </Link>
        </div>
      </div>

      {/* Bottom 5-Point Crosshair Guide Bar */}
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
