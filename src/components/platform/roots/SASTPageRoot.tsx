"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Layers, ChevronRight } from "lucide-react";
import FinalCTA from "@/components/sections/FinalCTA";
import LightFooter from "@/components/layout/LightFooter";
import { platformPillars } from "@/data/platform";
import SAST_Hero from "@/components/platform/sast/SAST_Hero";
import PlatformFAQ from "@/components/platform/common/PlatformFAQ";

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
    <div className="w-full bg-white text-[#111827] selection:bg-amber-500/20 selection:text-amber-700 font-sans">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION (Sunset Amber/Coral Theme)
          ───────────────────────────────────────────────────────────── */}
      <SAST_Hero />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: DELIVERABLES / VALUE
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-white py-24 md:py-28 border-b border-[#E5E7EB] relative z-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          {/* Header Description block */}
          <div className="flex flex-col gap-3 max-w-[700px]">
            <span className="auralis-label-md text-amber-600">
              // PLATFORM ASSURANCE
            </span>
            <h2 className="auralis-display-lg text-[#111827] uppercase leading-tight font-medium text-[clamp(1.8rem,3.5vw,2.5rem)]">
              What {pillar.title} Delivers
            </h2>
            <p className="auralis-body-md text-zinc-500">
              Catch vulnerabilities early in source code before runtime with deep, multi-language static analysis and zero noise correlation.
            </p>
          </div>

          {/* 3-Column Light Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillar.whatItDoes.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="auralis-card-light flex flex-col gap-4 hover:border-amber-400/40"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-[#111827] font-display">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed font-sans">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: ARCHITECTURE & DISCOVERY
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-zinc-50 py-24 md:py-28 border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          {/* Header block */}
          <div className="flex flex-col gap-3 max-w-[700px]">
            <span className="auralis-label-md text-orange-600">
              // CORE ARCHITECTURE & DISCOVERY
            </span>
            <h2 className="auralis-display-lg text-[#111827] uppercase leading-tight font-medium text-[clamp(1.8rem,3.5vw,2.5rem)]">
              Static Code Audit Pipeline
            </h2>
            <p className="auralis-body-md text-zinc-500">
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
                className="bg-white border border-[#E5E7EB] hover:border-amber-500/40 p-6 rounded-lg flex flex-col justify-between gap-6 transition-all duration-300 shadow-sm relative group"
              >
                {/* Index / Label */}
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <span className="font-mono text-xl font-bold text-amber-600">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-amber-700">Verified</span>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#111827] font-display">
                    {step.title}
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: INTEGRATION
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-white py-24 md:py-28 border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          {/* Header block */}
          <div className="flex flex-col gap-3 max-w-[700px]">
            <span className="auralis-label-md text-amber-600">
              // DEVSEC OPS INTEGRATION
            </span>
            <h2 className="auralis-display-lg text-[#111827] uppercase leading-tight font-medium text-[clamp(1.8rem,3.5vw,2.5rem)]">
              Practice Integration
            </h2>
            <p className="auralis-body-md text-zinc-500">
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
                className="auralis-card-light flex flex-col justify-between gap-6 hover:border-amber-400/40"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 auralis-label-md text-amber-600">
                    <Layers className="w-4 h-4" />
                    <span>POWERING OPERATIONS</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-[#111827] uppercase tracking-tight group-hover:text-amber-600 transition-colors">
                    {item.serviceName}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={item.serviceHref}
                    className="inline-flex items-center gap-1 auralis-label-md text-amber-600 hover:text-amber-700 transition-colors group/btn"
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
          SECTION 5: FAQ ACCORDION SECTION
          ───────────────────────────────────────────────────────────── */}
      <PlatformFAQ 
        badgeText="// KNOWLEDGE BASE & FREQUENTLY ASKED QUESTIONS"
        title="Static Application Security Testing FAQ"
        subtitle="Common questions about AST parsing, taint analysis, zero false positive verification, and IDE integration."
        faqs={sastFaqs}
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: FINAL CTA & LIGHT FOOTER
          ───────────────────────────────────────────────────────────── */}
      <FinalCTA theme="light" />
      <LightFooter />
    </div>
  );
}
