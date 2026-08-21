"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { cloudResilienceHubData } from "@/data/cloudResilience";
import DeliveryModelBadge from "./DeliveryModelBadge";
import { Button } from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowRight, Cloud, ShieldCheck } from "lucide-react";

export default function CloudResilienceHubRoot() {
  const { cards, eyebrow, headline, subheadline } = cloudResilienceHubData;

  useEffect(() => {
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
      
      {/* HUB HERO SECTION */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-28 md:pt-36 pb-16 border-b border-white/[0.08] overflow-hidden bg-gradient-to-b from-[#080c18] via-[#06070a] to-[#060606]">
        {/* Ambient atmospheric highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-10%,rgba(0,163,255,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-start text-left gap-6">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--accent)] font-bold">Cloud Resilience Hub</span>
          </nav>

          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] md:text-[11px] font-bold text-[var(--accent)] tracking-[0.2em] uppercase">
              // {eyebrow}
            </span>
            <span className="px-2.5 py-1 rounded-[2px] bg-white/[0.05] border border-white/[0.08] font-mono text-[9px] font-bold tracking-widest text-cyan-300 uppercase">
              Continuous Assurance & Hybrid Monitoring · EnProbe Platform
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-[1.08] max-w-[850px]">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-[750px]">
            {subheadline}
          </p>

        </div>
      </section>

      {/* FIVE OFFERINGS SELECTOR GRID */}
      <section className="w-full py-20 md:py-28 px-6 md:px-12 lg:px-16 border-b border-white/[0.08] bg-[#080808]">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-12 text-left">
          
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <span className="font-mono text-[10px] font-bold text-zinc-400 tracking-[0.2em] uppercase">
              SELECT YOUR REQUIRED OUTCOME
            </span>
            <span className="font-mono text-[10px] text-zinc-500">
              05 ENGAGEMENT MODELS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cards.map((card, idx) => (
              <Link
                key={card.slug}
                href={card.route}
                className={`p-8 rounded-xl bg-[#0c101a] border border-white/[0.08] hover:border-[var(--accent)]/50 hover:bg-[#0f1524] transition-all duration-300 flex flex-col justify-between gap-8 group cursor-pointer relative shadow-lg ${
                  idx === 0 || idx === 1 ? "md:col-span-1" : ""
                }`}
              >
                <div className="flex flex-col gap-5">
                  {/* Top Bar: Index & Badge */}
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <span className="font-mono text-xl font-bold text-white tracking-tight group-hover:text-[var(--accent)] transition-colors">
                      [{card.index}]
                    </span>
                    <DeliveryModelBadge label={card.badge} type={card.deliveryType} />
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-2xl font-bold text-white group-hover:text-[var(--accent)] transition-colors tracking-tight leading-tight">
                    {card.title}
                  </h2>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Delivery Info & Arrow */}
                <div className="pt-6 border-t border-white/[0.06] flex flex-col gap-3">
                  <span className="font-mono text-[10px] text-zinc-400 font-semibold tracking-wider uppercase">
                    {card.delivery}
                  </span>
                  
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--accent)] group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE ENGAGEMENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-8 h-[1px] bg-white/20 group-hover:bg-[var(--accent)]/60 transition-colors" />
                <div className="absolute top-0 right-0 w-[1px] h-8 bg-white/20 group-hover:bg-[var(--accent)]/60 transition-colors" />
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* HUB EXECUTIVE CTA */}
      <section className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#060606] text-center flex flex-col items-center justify-center border-b border-white/[0.08]">
        <div className="max-w-[850px] w-full mx-auto flex flex-col items-center gap-6 relative z-10">
          <span className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-[0.25em] uppercase">
            // NEED GUIDANCE?
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-tight max-w-[700px] leading-tight">
            Unsure Which Engagement Fits Your Architecture?
          </h2>

          <p className="font-sans text-sm sm:text-base text-zinc-300 max-w-[620px] leading-relaxed">
            Speak directly with an Entersoft principal cloud security architect. We will evaluate your multi-cloud environment, compliance requirements, and operational maturity to recommend the exact engagement model.
          </p>

          <div className="mt-4">
            <MagneticButton>
              <Button variant="primary" size="lg" asLink href="/#contact">
                Request a Cloud Security Assessment
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>

    </div>
  );
}
