"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Layers, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import FinalCTA from "@/components/sections/FinalCTA";
import { PlatformPillar } from "@/data/platform";
import { PLATFORM_HUB_ITEMS } from "@/data/platformHub";

interface PlatformSubpageTemplateProps {
  pillar: PlatformPillar;
}

export default function PlatformSubpageTemplate({ pillar }: PlatformSubpageTemplateProps) {
  const currentIndex = PLATFORM_HUB_ITEMS.findIndex(
    (item) =>
      item.id === pillar.slug ||
      item.name.toLowerCase().includes(pillar.slug.toLowerCase()) ||
      item.name.toLowerCase() === pillar.title.toLowerCase()
  );
  const nextItem =
    PLATFORM_HUB_ITEMS[(currentIndex + 1) % PLATFORM_HUB_ITEMS.length] || PLATFORM_HUB_ITEMS[0];

  return (
    <div className="w-full bg-[#060606] text-white selection:bg-[#08428C] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          TOP NAVIGATION BAR MATCHING BELEN JONES REFERENCE
          ───────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#060606]/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href="/platform"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white text-white hover:text-black font-mono text-[11px] font-bold uppercase tracking-wider transition-all"
          >
            <span>/RETURN</span>
          </Link>
          {nextItem && (
            <Link
              href={nextItem.href}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white text-white hover:text-black font-mono text-[11px] font-bold uppercase tracking-wider transition-all"
            >
              <span>NEXT</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/platform"
            className="font-mono text-[11px] font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
          >
            ENTERSOFT PLATFORM
          </Link>
          <Link
            href="/booking"
            className="px-4 py-1.5 rounded-full bg-[#08428C] hover:bg-[#0D518C] text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-all"
          >
            CONTACT
          </Link>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO (Editorial Minimalist Split View)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[85vh] flex items-center pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden bg-[#060606] border-b border-white/10">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 left-1/3 w-[650px] h-[400px] bg-gradient-to-tr from-[#08428C]/25 to-[#0D518C]/15 rounded-full blur-[130px] pointer-events-none opacity-50" />
        
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Artwork / Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative w-full aspect-[4/3] rounded-[12px] overflow-hidden border border-white/15 bg-white/5 shadow-2xl group"
          >
            <img
              src={nextItem?.faces.front || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200"}
              alt={pillar.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/70 bg-black/60 backdrop-blur-md px-3 py-1 rounded">
                [ 2026 BESPOKE APPSEC ]
              </span>
              <span className="font-mono text-[10px] font-bold text-[#3882E0] bg-black/60 backdrop-blur-md px-3 py-1 rounded">
                MODULE :: {pillar.slug.toUpperCase()}
              </span>
            </div>
          </motion.div>

          {/* Right Column: Editorial Details */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-mono text-[12px] font-bold uppercase tracking-widest text-[#3882E0]"
            >
              [ 2026 ] BESPOKE PLATFORM CAPABILITY
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.8rem,5.5vw,5rem)] font-display font-extrabold uppercase tracking-tight leading-[0.95] text-white"
            >
              {pillar.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full py-4 border-y border-white/10 font-mono text-[12px]"
            >
              <div>
                <span className="text-white/40 block mb-1 uppercase tracking-wider">// ROLE</span>
                <span className="text-white font-semibold uppercase">{pillar.cluster} LEAD ASSURANCE</span>
              </div>
              <div>
                <span className="text-white/40 block mb-1 uppercase tracking-wider">// CORE ENGINE</span>
                <span className="text-white font-semibold uppercase">{pillar.coreCapability}</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[16px] md:text-[18px] text-[#A1A1AA] leading-relaxed font-sans font-normal"
            >
              {pillar.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button variant="primary" size="lg" asLink href="/booking" className="gap-2 bg-[#08428C] hover:bg-[#0D518C] text-white border-none shadow-lg">
                Request Briefing <ArrowRight className="w-4 h-4" />
              </Button>
              <Link href="/platform" className="inline-flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-wider text-white/70 hover:text-white border-b border-white/30 hover:border-white py-1">
                <span>[ VIEW ALL MODULES ]</span>
              </Link>
            </motion.div>
          </div>
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
