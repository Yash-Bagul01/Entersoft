"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Layers, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import FinalCTA from "@/components/sections/FinalCTA";
import { PlatformPillar } from "@/data/platform";

interface PlatformSubpageTemplateProps {
  pillar: PlatformPillar;
}

export default function PlatformSubpageTemplate({ pillar }: PlatformSubpageTemplateProps) {
  return (
    <div className="w-full bg-[#060606] text-white selection:bg-[#08428C] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO (Black / Near-Black #060606)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#060606] border-b border-white/10">
        {/* Subtle Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#08428C]/30 to-[#0D518C]/20 rounded-full blur-[120px] pointer-events-none opacity-60" />
        
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-start gap-6">
          {/* Cluster & Descriptor Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C] dark:text-[#3882E0] bg-[#08428C]/10 border border-[#08428C]/30 px-3.5 py-1.5 rounded-full"
          >
            <span>ENPROBE PLATFORM</span>
            <span className="text-white/30">•</span>
            <span>{pillar.cluster}</span>
            <span className="text-white/30">•</span>
            <span className="text-white/80">{pillar.descriptor}</span>
          </motion.div>

          {/* Pillar Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-display font-bold uppercase tracking-tight leading-[1.05] text-white max-w-[950px]"
          >
            {pillar.title}
          </motion.h1>

          {/* Subtitle / Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[16px] md:text-[19px] text-[#A1A1AA] leading-relaxed max-w-[760px] font-sans font-normal"
          >
            {pillar.summary}
          </motion.p>

          {/* CTA Buttons & Capability Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <Button variant="primary" size="lg" asLink href="/#contact" className="gap-2 bg-[#08428C] hover:bg-[#0D518C] text-white border-none shadow-lg">
              Request Platform Briefing <ArrowRight className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2 text-[12px] font-mono text-white/60 bg-white/5 border border-white/10 px-4 py-3 rounded-[4px]">
              <Shield className="w-4 h-4 text-[#08428C]" />
              <span>Core Capability: {pillar.coreCapability}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: WHAT IT DOES (White Background #FFFFFF)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#FFFFFF] text-[#060606] py-24 md:py-32 border-b border-black/10 relative z-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          {/* Section Header */}
          <div className="flex flex-col gap-3 max-w-[700px]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C]">
              // CAPABILITY OVERVIEW
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-display font-bold uppercase tracking-tight text-[#060606]">
              What {pillar.title} Delivers
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#4A4A4A] font-sans leading-relaxed">
              Enterprise security requires precision. Explore how this core EnProbe capability transforms fragmented inputs into governed technical outcomes.
            </p>
          </div>

          {/* 3-Column Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillar.whatItDoes.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#F8F9FA] border border-[#E5E7EB] hover:border-[#08428C]/40 p-8 rounded-[8px] flex flex-col gap-4 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-[6px] bg-[#08428C]/10 flex items-center justify-center text-[#08428C] group-hover:bg-[#08428C] group-hover:text-white transition-colors">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-[18px] font-bold font-display uppercase tracking-tight text-[#060606] group-hover:text-[#08428C] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#52525B] leading-relaxed font-sans">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: HOW IT WORKS (Dark Navy Background #070B14)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#070B14] text-white py-24 md:py-32 border-b border-white/10 relative">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          {/* Section Header */}
          <div className="flex flex-col gap-3 max-w-[700px]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#3882E0]">
              // ARCHITECTURE & EXECUTION
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-display font-bold uppercase tracking-tight text-white">
              How {pillar.title} Operates
            </h2>
            <p className="text-[15px] text-[#A1A1AA] font-sans leading-relaxed">
              A 4-stage deterministic execution model engineered for enterprise scalability and continuous assurance.
            </p>
          </div>

          {/* 4-Step Sequential Step Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillar.howItWorks.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#0D1527] border border-white/10 hover:border-[#08428C] p-6 rounded-[8px] flex flex-col justify-between gap-6 transition-all group relative overflow-hidden"
              >
                {/* Top Step Number Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[24px] font-bold text-[#08428C] group-hover:text-[#3882E0] transition-colors">
                    {step.step}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#08428C]" />
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-[16px] font-bold font-display uppercase tracking-wider text-white">
                    {step.title}
                  </h4>
                  <p className="text-[13px] text-[#A1A1AA] leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: WHERE IT FITS (White Background #FFFFFF)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#FFFFFF] text-[#060606] py-24 md:py-32 border-b border-black/10 relative">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          {/* Section Header */}
          <div className="flex flex-col gap-3 max-w-[700px]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C]">
              // PRACTICE INTEGRATION
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-display font-bold uppercase tracking-tight text-[#060606]">
              Where It Fits In Your Security Operations
            </h2>
            <p className="text-[15px] text-[#52525B] font-sans leading-relaxed">
              EnProbe platform capabilities directly power Entersoft&apos;s expert human practices to deliver continuous, verified customer outcomes.
            </p>
          </div>

          {/* Cards linking to related services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillar.whereItFits.map((item, idx) => (
              <motion.div
                key={item.serviceName}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-[#F8F9FA] border border-[#E5E7EB] hover:border-[#08428C] p-8 rounded-[8px] flex flex-col justify-between gap-6 transition-all group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#08428C]">
                    <Layers className="w-4 h-4" />
                    <span>POWERING PRACTICE</span>
                  </div>
                  <h3 className="text-[20px] font-bold font-display text-[#060606] uppercase tracking-tight group-hover:text-[#08428C] transition-colors">
                    {item.serviceName}
                  </h3>
                  <p className="text-[14px] text-[#52525B] font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={item.serviceHref}
                    className="inline-flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-wider text-[#08428C] hover:text-[#0D518C] transition-colors"
                  >
                    <span>View Service Practice</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: CTA CLOSING (Reuses existing FinalCTA component)
          ───────────────────────────────────────────────────────────── */}
      <FinalCTA />
    </div>
  );
}
