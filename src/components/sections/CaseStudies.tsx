"use client";

import React from "react";
import { caseStudies, CaseStudyItem } from "@/data/caseStudies";
import SectionLabel from "../ui/SectionLabel";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { scrollRevealVariants, staggerContainerVariants } from "@/lib/animations";

function CaseStudyGraphic({ type }: { type: string }) {
  switch (type) {
    case "network":
      return (
        <svg className="w-full h-full text-[var(--accent)] opacity-40 group-hover:opacity-75 transition-opacity duration-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="30" cy="30" r="4" fill="currentColor" />
          <circle cx="70" cy="30" r="4" fill="currentColor" />
          <circle cx="70" cy="70" r="4" fill="currentColor" />
          <circle cx="30" cy="70" r="4" fill="currentColor" />
          <circle cx="50" cy="50" r="6" stroke="currentColor" strokeWidth="1.5" />
          <line x1="30" y1="30" x2="50" y2="50" stroke="currentColor" strokeWidth="0.75" />
          <line x1="70" y1="30" x2="50" y2="50" stroke="currentColor" strokeWidth="0.75" />
          <line x1="70" y1="70" x2="50" y2="50" stroke="currentColor" strokeWidth="0.75" />
          <line x1="30" y1="70" x2="50" y2="50" stroke="currentColor" strokeWidth="0.75" />
          <line x1="30" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <line x1="70" y1="30" x2="70" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        </svg>
      );
    case "data":
      return (
        <svg className="w-full h-full text-[var(--accent)] opacity-40 group-hover:opacity-75 transition-opacity duration-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Circular matrix grid */}
          <line x1="20" y1="80" x2="80" y2="80" stroke="currentColor" strokeWidth="1" />
          <line x1="20" y1="80" x2="20" y2="20" stroke="currentColor" strokeWidth="1" />
          
          <rect x="28" y="55" width="8" height="25" fill="currentColor" opacity="0.4" />
          <rect x="42" y="40" width="8" height="40" fill="currentColor" opacity="0.6" />
          <rect x="56" y="25" width="8" height="55" fill="currentColor" />
          <rect x="70" y="48" width="8" height="32" fill="currentColor" opacity="0.8" />
          
          {/* Target dotted thresholds */}
          <line x1="20" y1="35" x2="80" y2="35" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        </svg>
      );
    case "code":
      return (
        <svg className="w-full h-full text-[var(--accent)] opacity-40 group-hover:opacity-75 transition-opacity duration-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Abstract code branches */}
          <path d="M15 15 L25 15 L25 45 L35 45" stroke="currentColor" strokeWidth="1" />
          <path d="M15 35 L45 35 L45 55 L55 55" stroke="currentColor" strokeWidth="1" />
          <path d="M15 75 L65 75 L65 65 L75 65" stroke="currentColor" strokeWidth="1" />
          <rect x="75" y="60" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
          <rect x="55" y="50" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
          <rect x="35" y="40" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "lines":
      return (
        <svg className="w-full h-full text-[var(--accent)] opacity-40 group-hover:opacity-75 transition-opacity duration-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Waves of security lines representing API packets */}
          <path d="M10 20 Q 30 40, 50 20 T 90 20" stroke="currentColor" strokeWidth="0.75" />
          <path d="M10 50 Q 30 70, 50 50 T 90 50" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 2" />
          <path d="M10 80 Q 30 60, 50 80 T 90 80" stroke="currentColor" strokeWidth="1" />
          {/* Pulse nodes */}
          <circle cx="30" cy="30" r="3" fill="currentColor" />
          <circle cx="70" cy="70" r="3" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative w-full bg-[#060606] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-36 flex flex-col gap-16">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="max-w-[620px]"
          >
            <div className="overflow-hidden">
              <motion.div
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                <SectionLabel color="secondary">PROVEN EFFECTIVENESS</SectionLabel>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="text-3xl md:text-4xl font-display font-medium text-[#F6F5F0] uppercase tracking-tight"
              >
                Mitigation Case Files
              </motion.h2>
            </div>
          </motion.div>
          <div className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-widest">
            // METRIC-DRIVEN VULNERABILITY AUDITS
          </div>
        </div>

        {/* 2x2 Grid of Case Study Tiles */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[var(--border-subtle)]"
        >
          {caseStudies.map((cs) => (
            <motion.div
              key={cs.id}
              variants={scrollRevealVariants}
              className="p-8 md:p-12 border-r border-b border-[var(--border-subtle)] bg-[#0f0f0f]/30 hover:bg-[#0F0F0F] transition-all duration-500 flex flex-col md:flex-row justify-between gap-8 group"
            >
              {/* Left Column Details */}
              <div className="w-full md:w-3/5 flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-wider">
                    {cs.sector}
                  </span>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-[#F6F5F0] uppercase tracking-tight leading-none">
                    {cs.title}
                  </h3>
                  <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed font-sans mt-1">
                    {cs.description}
                  </p>
                </div>
                
                {/* Specific Outcome Metric Highlight */}
                <div className="border-t border-[var(--border-subtle)] pt-4 mt-2">
                  <span className="font-mono text-[9px] font-bold text-[var(--text-tertiary)] tracking-widest uppercase block mb-1">
                    Verified Outcome //
                  </span>
                  <p className="text-[11px] text-[var(--text-primary)] font-medium leading-relaxed font-sans">
                    {cs.outcome}
                  </p>
                </div>

                <a
                  href={cs.link}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#F6F5F0] hover:text-[var(--accent)] uppercase tracking-wider mt-4 transition-colors"
                  data-cursor="link"
                >
                  Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Right Column Abstract Graphic */}
              <motion.div
                variants={{
                  hidden: { clipPath: "inset(0 0 100% 0)" },
                  visible: {
                    clipPath: "inset(0 0 0% 0)",
                    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className="w-full md:w-2/5 h-48 md:h-full border border-[var(--border-subtle)] bg-black/20 rounded-[2px] p-6 flex items-center justify-center relative overflow-hidden shrink-0"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.01)_0%,transparent_70%)]" />
                <CaseStudyGraphic type={cs.graphicType} />
              </motion.div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
