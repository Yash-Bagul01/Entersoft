"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Layers, ChevronRight } from "lucide-react";
import FinalCTA from "@/components/sections/FinalCTA";
import LightFooter from "@/components/layout/LightFooter";
import PlatformFAQ from "@/components/platform/common/PlatformFAQ";
import { platformPillars } from "@/data/platform";
import SCA_Hero from "@/components/platform/sca/SCA_Hero";

const scaFaqs = [
  {
    question: "How does Software Composition Analysis (SCA) differ from SAST?",
    answer: "SAST analyzes custom source code written by your engineering team for logic flaws, injection vulnerabilities, and memory safety issues. SCA inspects third-party open-source libraries, packages, and transitive dependencies for known CVEs, license compliance risks, and functional reachability."
  },
  {
    question: "What is Reachability Analysis and how does it eliminate alert fatigue?",
    answer: "Many open-source vulnerabilities reside in dead code or helper functions your application never invokes. EnProbe SCA performs AST-driven reachability analysis by tracing call graphs from your code to dependency entry points, prioritizing only CVEs that are actually executable in your environment."
  },
  {
    question: "Does EnProbe SCA generate Automated Software Bill of Materials (SBOM)?",
    answer: "Yes. EnProbe automatically generates continuous, machine-readable SBOMs in standard formats (CycloneDX and SPDX) for compliance with executive security orders, SOC 2 Type II, and regulatory audit mandates."
  },
  {
    question: "How frequently are open-source vulnerability intelligence databases updated?",
    answer: "Our vulnerability intelligence feed aggregates NVD database records, GitHub Security Advisories, OSV databases, and proprietary threat research in real time every hour to flag newly disclosed zero-days immediately."
  }
];

export default function SCAPageRoot() {
  const pillar = platformPillars["sca"];

  return (
    <div className="w-full bg-white text-[#111827] selection:bg-[#4F46E5]/20 selection:text-[#4F46E5] font-sans">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION
          ───────────────────────────────────────────────────────────── */}
      <SCA_Hero />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: DELIVERABLES / VALUE (Auralis clean grid layout)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-white py-24 md:py-28 border-b border-[#E5E7EB] relative z-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          {/* Header Description block */}
          <div className="flex flex-col gap-3 max-w-[700px]">
            <span className="auralis-label-md text-[#4F46E5]">
              // PLATFORM ASSURANCE
            </span>
            <h2 className="auralis-display-lg text-[#111827] uppercase leading-tight font-medium text-[clamp(1.8rem,3.5vw,2.5rem)]">
              What {pillar.title} Delivers
            </h2>
            <p className="auralis-body-md text-zinc-500">
              Enterprise supply chain security requires deep visibility. Explore how our core composition analysis maps and protects open source pipelines.
            </p>
          </div>

          {/* 3-Column Light Auralis Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillar.whatItDoes.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="auralis-card-light flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center text-[#4F46E5]">
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
          SECTION 3: ARCHITECTURE (Steps matching timeline flow)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-zinc-50 py-24 md:py-28 border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          {/* Header block */}
          <div className="flex flex-col gap-3 max-w-[700px]">
            <span className="auralis-label-md text-[#06B6D4]">
              // CORE ARCHITECTURE & DISCOVERY
            </span>
            <h2 className="auralis-display-lg text-[#111827] uppercase leading-tight font-medium text-[clamp(1.8rem,3.5vw,2.5rem)]">
              Dependency Audit Pipeline
            </h2>
            <p className="auralis-body-md text-zinc-500">
              A 4-stage automated compositions scan mapping libraries from repository to runtime call graphs.
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
                className="bg-white border border-[#E5E7EB] hover:border-[#4F46E5]/35 p-6 rounded-lg flex flex-col justify-between gap-6 transition-all duration-300 shadow-sm relative group"
              >
                {/* Index / Label */}
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <span className="font-mono text-xl font-bold text-[#4F46E5]">
                    {step.step}
                  </span>
                  <span className="auralis-badge-indigo">Verified</span>
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
          SECTION 4: INTEGRATION (Linking back to human service practices)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-white py-24 md:py-28 border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          {/* Header block */}
          <div className="flex flex-col gap-3 max-w-[700px]">
            <span className="auralis-label-md text-[#4F46E5]">
              // SUPPLY CHAIN ECOSYSTEM
            </span>
            <h2 className="auralis-display-lg text-[#111827] uppercase leading-tight font-medium text-[clamp(1.8rem,3.5vw,2.5rem)]">
              Practice Integration
            </h2>
            <p className="auralis-body-md text-zinc-500">
              How EnProbe composition scanning feeds into certified compliance and secure engineering practices.
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
                className="auralis-card-light flex flex-col justify-between gap-6"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 auralis-label-md text-[#4F46E5]">
                    <Layers className="w-4 h-4" />
                    <span>POWERING OPERATIONS</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-[#111827] uppercase tracking-tight group-hover:text-[#4F46E5] transition-colors">
                    {item.serviceName}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={item.serviceHref}
                    className="inline-flex items-center gap-1 auralis-label-md text-[#4F46E5] hover:text-[#4338CA] transition-colors group/btn"
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
        title="Open Source Security FAQ"
        subtitle="Common questions about dependency vulnerability mapping, license compliance, and reachability analysis."
        faqs={scaFaqs}
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: FINAL CTA & LIGHT FOOTER
          ───────────────────────────────────────────────────────────── */}
      <FinalCTA theme="light" />
      <LightFooter />
    </div>
  );
}
