"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Layers, ChevronRight } from "lucide-react";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import { platformPillars } from "@/data/platform";
import SAST_Hero from "@/components/platform/sast/SAST_Hero";
import PlatformFAQ from "@/components/platform/common/PlatformFAQ";
import HubArrivePhoto from "@/components/platform/HubArrivePhoto";

const sastFaqs = [
  {
    question: "How does EnProbe SAST achieve such a low false-positive rate?",
    answer: "Unlike legacy SAST tools that rely on simple regex pattern matching, EnProbe uses a semantic engine that builds a full Abstract Syntax Tree (AST) and Control Flow Graph (CFG). We apply advanced taint analysis to track data flow from sources to sinks, only flagging findings with executable paths."
  },
  {
    question: "Does EnProbe SAST store or retain my source code?",
    answer: "No. EnProbe SAST runs either locally in your build pipeline or inside a secure, ephemeral container that is destroyed immediately after scanning. Your source code is never cached, stored, or used for model training."
  },
  {
    question: "How long does a typical static code scan take?",
    answer: "Thanks to incremental scanning, EnProbe only inspects files changed in a pull request. PR scans complete in under 30 seconds, while a full 100,000 LOC repository scan completes in under 2 minutes."
  },
  {
    question: "Can our security team author custom SAST rules?",
    answer: "Yes. EnProbe supports custom rules written in a simple, declarative YAML format. You can define custom sources, sinks, and sanitizers to enforce organization-specific security policies and coding standards."
  }
];

export default function SASTPageRoot() {
  const pillar = platformPillars["sast"];

  return (
    <div className="w-full bg-[#030712] text-white selection:bg-cyan-500/20 selection:text-cyan-400 font-sans min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION (VoxAura Dark Neon Indigo/Cyan Theme)
          ───────────────────────────────────────────────────────────── */}
      <HubArrivePhoto id="sast" />
      <SAST_Hero />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: DELIVERABLES / VALUE (VoxAura Dark Glass Cards)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#030712] py-24 md:py-28 border-b border-white/10 relative z-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          {/* Header Description block */}
          <div className="flex flex-col gap-3 max-w-[700px]">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
              // PLATFORM ASSURANCE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium uppercase tracking-tight text-white font-sans">
              What {pillar.title} Delivers
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans">
              Catch vulnerabilities early in source code before runtime with deep, multi-language static analysis and zero noise correlation.
            </p>
          </div>

          {/* 3-Column VoxAura Dark Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillar.whatItDoes.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#0B132B]/70 border border-white/10 hover:border-cyan-500/40 rounded-xl p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-cyan-950/20 group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-white font-sans group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: ARCHITECTURE & DISCOVERY (Pipeline Timeline)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#050B18] py-24 md:py-28 border-b border-white/10 relative">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          {/* Header block */}
          <div className="flex flex-col gap-3 max-w-[700px]">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo-400">
              // CORE ARCHITECTURE & DISCOVERY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium uppercase tracking-tight text-white font-sans">
              Static Code Audit Pipeline
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans">
              A 4-stage automated static code scan mapping repositories from AST parsing to pull request feedback.
            </p>
          </div>

          {/* Timeline Process Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillar.howItWorks.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#0F172A]/70 border border-white/10 hover:border-indigo-500/40 p-6 rounded-xl flex flex-col justify-between gap-6 transition-all duration-300 shadow-md relative group hover:-translate-y-1"
              >
                {/* Index / Label */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xl font-bold text-cyan-400">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-full text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.2)]">Verified</span>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white font-sans group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: DEVSECOPS PRACTICE INTEGRATION
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#030712] py-24 md:py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          {/* Header block */}
          <div className="flex flex-col gap-3 max-w-[700px]">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
              // DEVSEC OPS INTEGRATION
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium uppercase tracking-tight text-white font-sans">
              Practice Integration
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans">
              How EnProbe static analysis feeds into continuous application assurance and penetration testing practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillar.whereItFits.map((item, idx) => (
              <motion.div
                key={item.serviceName}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-[#0B132B]/70 border border-white/10 hover:border-indigo-500/40 p-8 rounded-xl flex flex-col justify-between gap-6 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>POWERING OPERATIONS</span>
                  </div>
                  <h3 className="text-xl font-bold font-sans text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors">
                    {item.serviceName}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={item.serviceHref}
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors group/btn"
                  >
                    <span>View Service Practice</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: FAQ ACCORDION SECTION (VoxAura Dark Theme)
          ───────────────────────────────────────────────────────────── */}
      <PlatformFAQ 
        badgeText="// KNOWLEDGE BASE & FREQUENTLY ASKED QUESTIONS"
        title="Static Application Security Testing FAQ"
        subtitle="Common questions about AST parsing, taint analysis, zero false positive verification, and IDE integration."
        faqs={sastFaqs}
        theme="dark"
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: FINAL CTA & DARK FOOTER
          ───────────────────────────────────────────────────────────── */}
      <FinalCTA theme="dark" />
      <Footer />
    </div>
  );
}
