"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Layers, ChevronRight } from "lucide-react";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import { platformPillars } from "@/data/platform";
import SBOM_Hero from "@/components/platform/sbom/SBOM_Hero";
import PlatformFAQ from "@/components/platform/common/PlatformFAQ";

const sbomFaqs = [
  {
    question: "What Software Bill of Materials (SBOM) formats does EnProbe support?",
    answer: "EnProbe continuously generates and exports machine-readable SBOMs in both CycloneDX 1.5 (JSON/XML) and SPDX 2.3 formats, fully satisfying US Executive Order 14028, NTIA minimum elements, and SOC 2 Type II compliance standards."
  },
  {
    question: "How does EnProbe analyze transitive (nested) open-source dependencies?",
    answer: "EnProbe inspects lockfiles, manifest trees, binary signatures, and package managers recursively to map all direct and indirect dependencies, ensuring zero blind spots in multi-layer software supply chains."
  },
  {
    question: "Can our legal and security teams author custom license compliance policies?",
    answer: "Yes. EnProbe features automated license categorization (Permissive, Weak Copyleft, Strong Copyleft, Proprietary) and allows security teams to enforce custom policy rules that trigger build failures on forbidden licenses like AGPL-3.0."
  },
  {
    question: "How does EnProbe track newly disclosed CVEs against existing SBOM artifacts?",
    answer: "Our vulnerability intelligence engine continuously cross-references your generated SBOM inventory against real-time NVD, OSV, and GitHub Security Advisory feeds to alert you immediately if a legacy dependency receives a new CVE."
  }
];

export default function SbomLicenseRiskPageRoot() {
  const pillar = platformPillars["sbom-license-risk"];

  return (
    <div className="w-full bg-[#0A0A0A] text-white selection:bg-[#818CF8]/20 selection:text-[#C7D2FE] font-sans min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION (System Architecture Slide 1 Theme)
          ───────────────────────────────────────────────────────────── */}
      <SBOM_Hero />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: DELIVERABLES / VALUE (System Architecture Slide 1 Dark Cards)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#0A0A0A] py-24 md:py-28 border-b border-[#27272A] relative z-20">
        <div className="max-w-330 mx-auto px-6 md:px-12 flex flex-col gap-16">
          {/* Header Description block */}
          <div className="flex flex-col gap-3 max-w-180">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#818CF8]">
              // PLATFORM ASSURANCE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium uppercase tracking-tight text-white font-sans">
              What {pillar?.title || "SBOM & License Risk"} Delivers
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans">
              Generate continuous CycloneDX and SPDX SBOMs while tracking open-source license compliance risks with complete supply chain visibility.
            </p>
          </div>

          {/* 3-Column Dark Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillar?.whatItDoes.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#191C21]/80 border border-[#27272A] hover:border-[#818CF8]/50 rounded-xl p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-[#818CF8]/5 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#818CF8]/15 border border-[#818CF8]/40 flex items-center justify-center text-[#818CF8] shadow-[0_0_12px_rgba(129,140,248,0.25)]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-white font-sans group-hover:text-[#C7D2FE] transition-colors">
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
      <section className="w-full bg-[#121418] py-24 md:py-28 border-b border-[#27272A] relative">
        <div className="max-w-330 mx-auto px-6 md:px-12 flex flex-col gap-16">
          {/* Header block */}
          <div className="flex flex-col gap-3 max-w-180">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#818CF8]">
              // CORE ARCHITECTURE & DISCOVERY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium uppercase tracking-tight text-white font-sans">
              Supply Chain & License Audit Pipeline
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans">
              A 4-stage automated pipeline mapping open-source components from repository manifests to continuous SBOM publication.
            </p>
          </div>

          {/* Timeline Process Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillar?.howItWorks.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#191C21]/80 border border-[#27272A] hover:border-[#818CF8]/50 p-6 rounded-xl flex flex-col justify-between gap-6 transition-all duration-300 shadow-md relative group hover:-translate-y-1"
              >
                {/* Index / Label */}
                <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
                  <span className="font-mono text-xl font-bold text-[#818CF8]">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-[#818CF8]/15 border border-[#818CF8]/40 px-2.5 py-0.5 rounded-full text-[#C7D2FE] shadow-[0_0_8px_rgba(129,140,248,0.2)]">Verified</span>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white font-sans group-hover:text-[#C7D2FE] transition-colors">
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
      <section className="w-full bg-[#0A0A0A] py-24 md:py-28 border-b border-[#27272A]">
        <div className="max-w-330 mx-auto px-6 md:px-12 flex flex-col gap-16">
          {/* Header block */}
          <div className="flex flex-col gap-3 max-w-180">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#818CF8]">
              // DEVSEC OPS INTEGRATION
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium uppercase tracking-tight text-white font-sans">
              Practice Integration
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans">
              How EnProbe SBOM generation and license auditing feeds into certified compliance and secure engineering practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillar?.whereItFits.map((item, idx) => (
              <motion.div
                key={item.serviceName}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-[#191C21]/80 border border-[#27272A] hover:border-[#818CF8]/50 p-8 rounded-xl flex flex-col justify-between gap-6 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#818CF8]">
                    <Layers className="w-4 h-4 text-[#818CF8]" />
                    <span>POWERING OPERATIONS</span>
                  </div>
                  <h3 className="text-xl font-bold font-sans text-white uppercase tracking-tight group-hover:text-[#C7D2FE] transition-colors">
                    {item.serviceName}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={item.serviceHref}
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider text-[#818CF8] hover:text-[#C7D2FE] transition-colors group/btn"
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
          SECTION 5: FAQ ACCORDION SECTION (Dark Theme)
          ───────────────────────────────────────────────────────────── */}
      <PlatformFAQ 
        badgeText="// KNOWLEDGE BASE & FREQUENTLY ASKED QUESTIONS"
        title="SBOM & License Compliance FAQ"
        subtitle="Common questions about CycloneDX/SPDX generation, license risk policy enforcement, and supply chain security."
        faqs={sbomFaqs}
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
