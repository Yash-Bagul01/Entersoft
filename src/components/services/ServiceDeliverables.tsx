"use client";

import React from "react";
import SectionLabel from "../ui/SectionLabel";

interface ServiceDeliverablesProps {
  deliverables: string[];
  integrations: string[];
}

export default function ServiceDeliverables({
  deliverables,
  integrations,
}: ServiceDeliverablesProps) {
  return (
    <section className="relative w-full bg-[var(--bg-primary)] px-6 md:px-12 py-20 md:py-28 overflow-hidden border-b border-[var(--border-subtle)]">
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Deliverables Column */}
        <div className="flex flex-col gap-8">
          <div>
            <SectionLabel color="secondary">OUTCOMES & ASSETS</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-display font-medium text-[var(--text-primary)] uppercase tracking-tight mt-2">
              Deliverables
            </h2>
          </div>
          <ul className="flex flex-col gap-5">
            {deliverables.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="text-[var(--accent)] font-mono text-base font-bold select-none mt-0.5">
                  →
                </span>
                <span className="font-sans text-sm md:text-base text-[var(--text-primary)] leading-normal">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Integrations Column */}
        <div className="flex flex-col gap-8 bg-[var(--bg-elevated)]/30 border border-[var(--border-subtle)] p-8 md:p-10 rounded-[4px] backdrop-blur-md">
          <div>
            <span className="font-mono text-[10px] font-bold text-[var(--text-tertiary)] tracking-widest uppercase block">
              ECOSYSTEM SYNC
            </span>
            <h3 className="text-xl md:text-2xl font-display font-medium text-[var(--text-primary)] uppercase tracking-tight mt-2">
              Workflow Integrations
            </h3>
          </div>
          <p className="font-sans text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
            Connect our findings and pipeline hooks directly into your team&apos;s everyday tools for seamless tracking, alerts, and automatic ticket filing.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            {integrations.map((item, index) => (
              <span
                key={index}
                className="px-4 py-2 border border-[var(--border-subtle)] bg-[var(--bg-primary)]/45 text-[var(--text-primary)] font-mono text-[11px] font-bold uppercase tracking-wider rounded-[2px]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
