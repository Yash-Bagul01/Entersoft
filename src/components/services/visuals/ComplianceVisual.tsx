"use client";

import React from "react";
import { motion } from "framer-motion";

const frameworks = [
  { name: "ISO 27001", percent: 45, desc: "Standard client baseline - basic policy structures only." },
  { name: "GDPR", percent: 30, desc: "Incomplete consent tracking & data residency mapping." },
  { name: "CERT-In", percent: 55, desc: "Manual VAPT checks completed but logs not consolidated." },
  { name: "RBI Guidelines", percent: 25, desc: "Dormant key governance & API compliance gaps." },
];

export default function ComplianceVisual() {
  return (
    <div 
      className="w-full max-w-[450px] aspect-[4/3] bg-[var(--bg-elevated)]/40 border border-[var(--border-subtle)] rounded-[4px] p-6 flex flex-col justify-center relative overflow-hidden backdrop-blur-md"
      role="img"
      aria-label="Compliance readiness frameworks showing typical client baseline percentages"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />

      <div className="flex flex-col gap-5 w-full relative z-10">
        <span className="font-mono text-[9px] font-bold text-[var(--text-tertiary)] tracking-widest uppercase block text-center mb-1 select-none">
          Typical Client Baseline
        </span>

        {frameworks.map((fw) => (
          <div key={fw.name} className="flex flex-col gap-1.5 w-full">
            <div className="flex justify-between items-baseline font-mono text-[10px] font-bold text-[var(--text-primary)]">
              <span>{fw.name}</span>
              <span className="text-[var(--accent)]">{fw.percent}%</span>
            </div>
            
            {/* Meter Bar Container */}
            <div className="w-full h-1.5 bg-[var(--border-subtle)] rounded-[1px] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${fw.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-[var(--accent)] rounded-[1px] shadow-[0_0_8px_var(--accent)]"
              />
            </div>

            <span className="font-sans text-[9px] text-[var(--text-secondary)] leading-normal">
              {fw.desc}
            </span>
          </div>
        ))}

        <span className="font-mono text-[8px] text-[var(--text-tertiary)] text-center italic mt-2 select-none block">
          * Typical client baseline before Entersoft engagement.
        </span>
      </div>
    </div>
  );
}
