"use client";

import React from "react";
import SectionLabel from "@/components/ui/SectionLabel";

export default function ComplianceProof() {
  return (
    <section className="relative w-full bg-transparent px-6 md:px-12 py-24 md:py-32 overflow-hidden border-b border-[var(--border-subtle)] z-10">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-16 md:gap-24 relative z-20">
        
        {/* Header */}
        <div className="flex flex-col items-start text-left gap-2">
          <SectionLabel color="secondary">EVIDENCE & STATS</SectionLabel>
          <h2 className="text-3xl lg:text-5xl font-display font-medium text-white uppercase tracking-tight mt-2">
            The Evidence of Rigor
          </h2>
        </div>

        {/* Stats Strip - Inline Typographic Layout separated by thin rules */}
        <div className="w-full border-y border-zinc-800/80 py-10 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 items-center text-left">
            
            {/* Stat 1 */}
            <div className="flex flex-col gap-1 pr-6 border-r border-zinc-800/60 h-full justify-between">
              <span className="font-mono text-[9px] font-bold text-zinc-500 tracking-wider uppercase">
                TRUSTED AUDITS
              </span>
              <span className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tighter leading-none mt-4">
                600+
              </span>
              <span className="font-sans text-[11px] text-zinc-400 mt-2 leading-relaxed">
                Global clients secured and certified.
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col gap-1 px-6 md:border-r border-zinc-800/60 h-full justify-between">
              <span className="font-mono text-[9px] font-bold text-zinc-500 tracking-wider uppercase">
                TRACK RECORD
              </span>
              <span className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tighter leading-none mt-4">
                13 Yrs
              </span>
              <span className="font-sans text-[11px] text-zinc-400 mt-2 leading-relaxed">
                Of compliance expertise.
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col gap-1 px-6 border-r border-zinc-800/60 h-full justify-between">
              <span className="font-mono text-[9px] font-bold text-zinc-500 tracking-wider uppercase">
                SECURITY BREACHES
              </span>
              <span className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tighter leading-none mt-4">
                0
              </span>
              <span className="font-sans text-[11px] text-zinc-400 mt-2 leading-relaxed">
                Breaches recorded post-audit phase.
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col gap-1 pl-6 h-full justify-between">
              <span className="font-mono text-[9px] font-bold text-zinc-500 tracking-wider uppercase">
                COMPLIANCE DRIFT
              </span>
              <span className="font-serif text-4xl sm:text-6xl font-bold text-[var(--accent)] tracking-tighter leading-none mt-4">
                0.01%
              </span>
              <span className="font-sans text-[11px] text-zinc-400 mt-2 leading-relaxed">
                Audit failure and posture drift rate.
              </span>
            </div>

          </div>
        </div>

        {/* Custom Data Visual: Wireframe timeline of audit process */}
        <div className="flex flex-col gap-8 text-left">
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] font-bold text-zinc-400 tracking-[0.2em] uppercase">
              REPRESENTATIVE SEQUENCE
            </span>
            <h3 className="text-xl md:text-2xl font-display font-medium text-white uppercase tracking-tight">
              Standard 90-Day Certification Velocity
            </h3>
          </div>

          {/* Wireframe horizontal timeline rendered via clean inline SVG */}
          <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
            <div className="min-w-[800px] w-full pt-10 pb-6 relative px-4">
              <svg 
                viewBox="0 0 1000 120" 
                className="w-full h-auto overflow-visible select-none"
              >
                {/* Horizontal wireframe axis */}
                <line 
                  x1="50" y1="50" x2="950" y2="50" 
                  stroke="rgba(255, 255, 255, 0.08)" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4"
                />

                {/* Progress highlight axis */}
                <line 
                  x1="50" y1="50" x2="800" y2="50" 
                  stroke="var(--accent)" 
                  strokeWidth="2" 
                />

                {/* Grid guidelines */}
                {[50, 237.5, 425, 612.5, 800, 950].map((x, i) => (
                  <line 
                    key={i}
                    x1={x} y1="10" x2={x} y2="90" 
                    stroke="rgba(255, 255, 255, 0.03)" 
                    strokeWidth="1"
                  />
                ))}

                {/* Milestone nodes */}
                {[
                  { x: 50, day: "DAY 01", label: "Boundary Scoping", active: true },
                  { x: 237.5, day: "DAY 15", label: "Gap Discovery", active: true },
                  { x: 425, day: "DAY 45", label: "Control Hardening", active: true },
                  { x: 612.5, day: "DAY 75", label: "Registrar Audit", active: true },
                  { x: 800, day: "DAY 90", label: "Cert Issued", active: true, certified: true },
                  { x: 950, day: "ONGOING", label: "Continuous Drift Audits", active: false }
                ].map((node, idx) => {
                  return (
                    <g key={idx}>
                      {/* Node circle */}
                      <circle 
                        cx={node.x} cy="50" r={node.certified ? "8" : "5"}
                        fill={node.active ? "var(--bg-primary)" : "#0c0c0e"}
                        stroke={node.certified ? "var(--accent)" : (node.active ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.2)")}
                        strokeWidth={node.certified ? "3" : "1.5"}
                      />

                      {/* Ripple glow for certification node */}
                      {node.certified && (
                        <circle 
                          cx={node.x} cy="50" r="14"
                          fill="none"
                          stroke="var(--accent)"
                          strokeWidth="1"
                          opacity="0.3"
                          className="animate-ping"
                          style={{ animationDuration: "3s" }}
                        />
                      )}

                      {/* Day text */}
                      <text 
                        x={node.x} y="25" 
                        textAnchor="middle" 
                        className="font-mono text-[9px] font-bold"
                        fill={node.certified ? "var(--accent)" : (node.active ? "rgba(245, 245, 245, 0.8)" : "rgba(245, 245, 245, 0.3)")}
                      >
                        {node.day}
                      </text>

                      {/* Label text */}
                      <text 
                        x={node.x} y="80" 
                        textAnchor="middle" 
                        className="font-serif text-[11px] font-bold"
                        fill={node.active ? "white" : "rgba(245, 245, 245, 0.4)"}
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
