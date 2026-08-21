"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CloudResilienceOffering } from "@/data/cloudResilience";
import DeliveryModelBadge from "./DeliveryModelBadge";
import EngagementBoundaryPanel from "./EngagementBoundaryPanel";
import CloudSiblingNav from "./CloudSiblingNav";
import { Button } from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionLabel from "@/components/ui/SectionLabel";
import { CheckCircle2, Shield, FileText, Layers, ArrowRight, Info, Cpu, Sparkles } from "lucide-react";

interface CloudOfferingLayoutProps {
  offering: CloudResilienceOffering;
}

export default function CloudOfferingLayout({ offering }: CloudOfferingLayoutProps) {
  useEffect(() => {
    // Apply dark theme overrides for consistent service-page styling
    const prevTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.setAttribute("data-page", "cloud-security");

    return () => {
      if (prevTheme) {
        document.documentElement.setAttribute("data-theme", prevTheme);
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      document.documentElement.removeAttribute("data-page");
    };
  }, []);

  return (
    <div className="w-full bg-[#060606] text-[#F5F5F5] flex flex-col overflow-x-hidden">
      
      {/* 01. HERO SECTION */}
      <section className="relative w-full min-h-[75vh] flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-28 md:pt-36 pb-20 border-b border-white/[0.08] overflow-hidden bg-gradient-to-b from-[#080c16] via-[#060608] to-[#060606]">
        {/* Ambient atmospheric glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(0,163,255,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col gap-8 text-left">
          
          {/* Breadcrumb Bar */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services/cloud-resilience" className="hover:text-white transition-colors">
              Cloud Resilience
            </Link>
            <span>/</span>
            <span className="text-[var(--accent)] font-bold">{offering.shortTitle}</span>
          </nav>

          {/* Eyebrow & Delivery Badge (Prominent in Hero) */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-[10px] md:text-[11px] font-bold text-[var(--accent)] tracking-[0.2em] uppercase">
              // {offering.eyebrow}
            </span>
            <DeliveryModelBadge label={offering.deliveryBadge} type={offering.deliveryType} />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-[1.08] max-w-[900px]">
            {offering.headline}
          </h1>

          {/* Subline */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-[800px]">
            {offering.sub}
          </p>

          {/* Delivery Model Banner */}
          <div className="p-4 sm:p-5 rounded-lg bg-white/[0.03] border border-white/[0.08] max-w-[850px] flex items-start gap-3">
            <Info className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">
                COMMERCIAL & OPERATIONAL MODEL
              </span>
              <p className="font-sans text-xs sm:text-sm text-zinc-300">
                {offering.deliveryModel}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton>
              <Button variant="primary" size="lg" asLink href={offering.cta.href}>
                {offering.cta.label}
              </Button>
            </MagneticButton>

            <MagneticButton>
              <Button variant="ghost" size="lg" asLink href="#scope">
                View Scope & Deliverables ↓
              </Button>
            </MagneticButton>
          </div>

          {/* 4-Item Key Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 mt-4 border-t border-white/[0.08]">
            {offering.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col gap-1 p-4 rounded bg-white/[0.02] border border-white/[0.04]">
                <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                  {m.label}
                </span>
                <span className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 02. SPECIAL CALLOUT: EnProbe Explanation (if applicable) */}
      {offering.explanation && (
        <section className="w-full py-12 px-6 md:px-12 lg:px-16 bg-[#090e1a] border-b border-white/[0.08]">
          <div className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
            <div className="flex items-start gap-4 max-w-[950px]">
              <div className="p-3 rounded-lg bg-[var(--accent)]/15 border border-[var(--accent)]/30 shrink-0">
                <Sparkles className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-widest uppercase">
                  PLATFORM CAPABILITY CLARIFICATION
                </span>
                <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-200 leading-relaxed font-medium">
                  {offering.explanation}
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <span className="px-3.5 py-1.5 rounded bg-white/[0.05] border border-white/[0.1] font-mono text-[10px] font-bold text-zinc-300 uppercase tracking-wider">
                ENPROBE CSPM
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 03. SPECIAL CALLOUT: Delivery Models Breakdown (if applicable) */}
      {offering.deliveryOptions && (
        <section className="w-full py-16 md:py-20 px-6 md:px-12 lg:px-16 bg-[#07090e] border-b border-white/[0.08]">
          <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-8 text-left">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-[0.2em] uppercase">
                OPERATIONAL DEPLOYMENT OPTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-white tracking-tight">
                Choose Your Detection Operating Model
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offering.deliveryOptions.map((opt, i) => (
                <div key={i} className="p-7 rounded-xl bg-[#0d121f] border border-white/[0.08] flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                      {opt.title}
                    </h3>
                    <span className="font-mono text-[9px] text-[var(--accent)] font-bold">
                      OPTION 0{i + 1}
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 04. SCOPE & DELIVERABLES DETAILED MATRICES */}
      <section id="scope" className="scroll-mt-24 w-full py-20 md:py-28 px-6 md:px-12 lg:px-16 border-b border-white/[0.08] bg-[#080808]">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-16 text-left">
          
          {/* Detailed Scope */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 max-w-[800px]">
              <SectionLabel color="secondary">TECHNICAL SCOPE</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
                Comprehensive Technical Coverage
              </h2>
              <p className="font-sans text-xs sm:text-sm text-zinc-400">
                {offering.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offering.scope.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-[#0c101a] border border-white/[0.06] hover:border-white/[0.14] transition-colors flex flex-col justify-between gap-4 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-zinc-500 group-hover:text-[var(--accent)] transition-colors">
                      SCOPE 0{idx + 1}
                    </span>
                    <Shield className="w-4 h-4 text-zinc-600 group-hover:text-[var(--accent)] transition-colors" />
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Deliverables */}
          <div className="flex flex-col gap-8 pt-10 border-t border-white/[0.06]">
            <div className="flex flex-col gap-2 max-w-[800px]">
              <SectionLabel color="secondary">ENGAGEMENT ARTIFACTS</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
                Audit-Ready Deliverables & Evidence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {offering.deliverables.map((deliv, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-lg bg-[#0b0e17] border border-white/[0.06] flex items-start gap-4"
                >
                  <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06] shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                      DELIVERABLE 0{idx + 1}
                    </span>
                    <span className="font-sans text-xs sm:text-sm text-zinc-200 font-semibold leading-snug">
                      {deliv}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 05. IN SCOPE / NOT INCLUDED BOUNDARY PANEL */}
      <EngagementBoundaryPanel
        inScope={offering.inScope}
        notIncluded={offering.notIncluded}
      />

      {/* 06. CLOUD SIBLING NAVIGATION */}
      <CloudSiblingNav currentSlug={offering.slug} />

      {/* 07. BOTTOM EXECUTIVE CTA */}
      <section className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#060606] text-center flex flex-col items-center justify-center border-b border-white/[0.08]">
        <div className="max-w-[850px] w-full mx-auto flex flex-col items-center gap-6 relative z-10">
          <span className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-[0.25em] uppercase">
            // EXECUTIVE BRIEFING
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-tight max-w-[700px] leading-tight">
            Schedule a {offering.shortTitle} Briefing
          </h2>

          <p className="font-sans text-sm sm:text-base text-zinc-300 max-w-[620px] leading-relaxed">
            Partner with Entersoft cloud security architects to scope your infrastructure, align on compliance baselines, and accelerate remediation.
          </p>

          <div className="mt-4">
            <MagneticButton>
              <Button variant="primary" size="lg" asLink href={offering.cta.href}>
                {offering.cta.label}
              </Button>
            </MagneticButton>
          </div>

          <div className="font-mono text-[9px] text-zinc-500 tracking-[0.2em] uppercase mt-4 flex flex-wrap justify-center items-center gap-4">
            <span>EXPERT-LED</span>
            <span>•</span>
            <span>MULTI-CLOUD</span>
            <span>•</span>
            <span>AUDIT-READY</span>
          </div>
        </div>
      </section>

    </div>
  );
}
