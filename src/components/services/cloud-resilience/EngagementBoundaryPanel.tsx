"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, XCircle } from "lucide-react";
import { CloudCrossLink } from "@/data/cloudResilience";

interface EngagementBoundaryPanelProps {
  inScope: string[];
  notIncluded: CloudCrossLink[];
}

export default function EngagementBoundaryPanel({
  inScope,
  notIncluded,
}: EngagementBoundaryPanelProps) {
  return (
    <section className="w-full py-16 md:py-24 border-b border-white/[0.08] bg-[#07090e]">
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col items-start text-left gap-2 max-w-[800px]">
          <span className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-[0.2em] uppercase">
            // SCOPE DEFINITION & BOUNDARIES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
            Engagement Boundaries & Coverage
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-400">
            Clear boundaries ensure transparency on what this specific engagement delivers and where other Cloud Resilience services apply.
          </p>
        </div>

        {/* 2-Column In-Scope vs Not-Included Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* IN SCOPE Panel */}
          <div className="flex flex-col justify-between p-7 sm:p-9 rounded-xl bg-[#0b101b] border border-sky-900/40 text-left">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
                  <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                    INCLUDED IN THIS ENGAGEMENT
                  </h3>
                </div>
                <span className="font-mono text-[9px] font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/50 uppercase">
                  CORE SCOPE
                </span>
              </div>

              <ul className="flex flex-col gap-3.5">
                {inScope.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                    <span className="font-mono text-sky-400 text-xs font-bold shrink-0 mt-0.5">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
              [ 100% Guaranteed Delivery Scope ]
            </div>
          </div>

          {/* NOT INCLUDED / SIBLING SERVICES Panel */}
          <div className="flex flex-col justify-between p-7 sm:p-9 rounded-xl bg-[#0e0c12] border border-rose-950/40 text-left">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-2.5">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                    NOT INCLUDED (SEPARATE ENGAGEMENTS)
                  </h3>
                </div>
                <span className="font-mono text-[9px] font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/50 uppercase">
                  OUT OF SCOPE
                </span>
              </div>

              <div className="flex flex-col gap-3.5">
                {notIncluded.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-white/[0.14] transition-colors"
                  >
                    <span className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {item.text}
                    </span>
                    
                    <Link
                      href={item.targetHref}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[var(--accent)]/50 font-mono text-[10px] font-bold text-[var(--accent)] shrink-0 transition-all cursor-pointer"
                    >
                      <span>{item.targetLabel}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
              [ Cross-linked alternative practices ]
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
