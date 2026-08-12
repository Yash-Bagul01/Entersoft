"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Shield, Lock, ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ThayonSecrets_IntelligenceLead() {
  return (
    <section className="relative w-full bg-[#08090D] text-white py-24 md:py-32 border-b border-neutral-800/90 overflow-hidden dark-panel">
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

      <div className="relative max-w-[1240px] mx-auto px-6">
        {/* Dark Box with Thayon Vertical Bracket Accents & Avatar */}
        <div className="relative rounded-3xl border border-neutral-800 bg-neutral-950 p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Subtle Ambient Light Flare */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Research Lab & Avatar */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-400/80 shadow-md">
                  <Image
                    src="/images/secrets/lead_avatar.png"
                    alt="Entersoft AppSec Research Practice Lead"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                    Entersoft AppSec Research Practice
                  </div>
                  <div className="text-xl font-serif text-white font-bold" style={{ color: '#ffffff' }}>
                    Entersoft Cryptographic Assurance Unit
                  </div>
                </div>
              </div>

              <h3 
                className="text-2xl sm:text-3xl lg:text-4xl font-serif leading-tight text-white" 
                style={{ color: '#ffffff' }}
              >
                Depth over volume. Active validation over regex noise.
              </h3>

              <p 
                className="font-sans text-sm sm:text-base leading-relaxed font-light text-neutral-300" 
                style={{ color: '#d4d4d8' }}
              >
                We engineered Entersoft EnProbe Secrets Defense because modern cloud software relies on thousands of distributed micro-credentials. 
                Blind string-matching creates alert fatigue and dangerous blind spots. 
                Our research team maintains 1,280+ active provider sandbox probes so that no leaked secret survives in your organization longer than 60 seconds.
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-neutral-400">
                <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300" style={{ color: '#e4e4e7' }}>
                  Global AppSec Operations
                </span>
                <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300" style={{ color: '#e4e4e7' }}>
                  24/7 Threat Intel Feeds
                </span>
              </div>
            </div>

            {/* Right Column: Customer Testimonial Quote */}
            <div className="lg:col-span-6 p-8 sm:p-10 rounded-2xl bg-neutral-900/90 border border-neutral-800 relative space-y-6">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400">
                <Quote className="w-5 h-5 text-emerald-400" />
              </div>

              <blockquote 
                className="text-base sm:text-lg font-sans text-neutral-100 leading-relaxed font-light italic" 
                style={{ color: '#f4f4f5' }}
              >
                &ldquo;Entersoft Secrets cut our false-positive alerts by 94% on day one. When an engineer accidentally committed an AWS key at 2 AM, the engine verified validity and triggered auto-rotation in under 30 seconds before any adversary bot could harvest it.&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white font-sans" style={{ color: '#ffffff' }}>
                    VP of Engineering
                  </div>
                  <div className="text-xs font-mono text-neutral-400">
                    Tier-1 Digital NeoBank & Cloud Core
                  </div>
                </div>
                <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
                  Verified Case
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Pill */}
          <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono text-neutral-400">
              Ready to eliminate hardcoded secret risk across your repos?
            </span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-sans text-xs font-semibold hover:bg-neutral-200 transition-all active:scale-95 shadow-md"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Schedule Architecture Briefing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
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
