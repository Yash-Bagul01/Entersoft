"use client";

import React from "react";
import { ProcessStep } from "@/data/services";
import SectionLabel from "../ui/SectionLabel";

interface ServiceProcessProps {
  steps: ProcessStep[];
  layoutType?: "vertical" | "horizontal-timeline";
  id?: string;
}

export default function ServiceProcess({
  steps,
  layoutType = "vertical",
  id,
}: ServiceProcessProps) {
  return (
    <section id={id} className="relative w-full bg-[var(--bg-primary)] px-6 md:px-12 py-20 md:py-28 overflow-hidden border-b border-[var(--border-subtle)]">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-12 md:gap-16">
        <div>
          <SectionLabel color="secondary">ENGAGEMENT PROCESS</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-display font-medium text-[var(--text-primary)] uppercase tracking-tight mt-2">
            How It Works
          </h2>
        </div>

        {layoutType === "horizontal-timeline" ? (
          <>
            {/* Desktop Horizontal Timeline (Drag/Scroll) */}
            <div className="hidden md:block w-full overflow-x-auto pb-6 scrollbar-thin cursor-grab active:cursor-grabbing">
              <div className="flex gap-8 min-w-[1000px] relative pr-12">
                {/* Horizontal line running through elements */}
                <div className="absolute top-[28px] left-0 right-0 h-[1.5px] bg-[var(--border-subtle)] z-0" />
                
                {steps.map((step) => (
                  <div key={step.index} className="flex-1 flex flex-col gap-4 relative z-10">
                    <div className="flex items-center gap-4">
                      {/* Timeline node */}
                      <span className="w-14 h-14 rounded-full border border-[var(--accent)] bg-[var(--bg-elevated)] text-[var(--accent)] font-mono text-sm font-bold flex items-center justify-center shadow-lg select-none">
                        {step.index}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      <h3 className="font-display font-medium text-lg uppercase text-[var(--text-primary)] leading-tight">
                        {step.title}
                      </h3>
                      <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed max-w-[250px]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Accordion View */}
            <div className="md:hidden flex flex-col border-t border-[var(--border-subtle)]">
              {steps.map((step) => (
                <div key={step.index} className="border-b border-[var(--border-subtle)] py-5">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs font-bold text-[var(--accent)] mt-1">
                      {step.index}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-display font-medium text-base uppercase text-[var(--text-primary)] leading-tight">
                        {step.title}
                      </h3>
                      <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Default Vertical Stacked List */
          <div className="flex flex-col border-t border-[var(--border-subtle)]">
            {steps.map((step) => (
              <div
                key={step.index}
                className="flex flex-col md:grid md:grid-cols-[0.15fr_0.35fr_0.5fr] gap-4 md:gap-8 py-8 border-b border-[var(--border-subtle)] items-start"
              >
                <span className="font-mono text-2xl font-bold text-[var(--text-tertiary)] opacity-35">
                  {step.index}
                </span>
                <h3 className="font-display font-medium text-lg md:text-xl uppercase text-[var(--text-primary)] leading-tight">
                  {step.title}
                </h3>
                <p className="font-sans text-xs md:text-[13px] text-[var(--text-secondary)] leading-relaxed max-w-[650px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
