"use client";

import React from "react";
import { motion } from "framer-motion";
import { aiAnalysis } from "@/data/sast";

export default function SH4_AIAnalysis() {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  };

  const getSeverityColor = (sev: string) => {
    switch (sev.toLowerCase()) {
      case "critical":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      case "high":
        return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case "medium":
        return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      default:
        return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    }
  };

  return (
    <section className="bg-[var(--lt-white)] py-24 px-6 md:px-12 text-[var(--lt-text)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="max-w-[640px] mb-16">
          <motion.span {...fadeUp} className="lt-badge mb-4">
            {aiAnalysis.badge}
          </motion.span>
          <motion.h2 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="lt-section-h2 mb-4"
          >
            {aiAnalysis.heading}
          </motion.h2>
          <motion.p 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="lt-body"
          >
            {aiAnalysis.body}
          </motion.p>
        </div>

        {/* AI Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aiAnalysis.insights.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="bg-[var(--lt-gray)] border border-[var(--lt-border)] rounded-lg p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--lt-border)]">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded border ${getSeverityColor(card.severity)}`}>
                    {card.severity}
                  </span>
                  <span className="text-xs font-mono text-[var(--lt-text-hint)]">{card.id}</span>
                </div>

                {/* Title and Description */}
                <h3 className="text-base font-bold font-sans tracking-tight text-[var(--lt-text)] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-[var(--lt-text-body)] leading-relaxed mb-6 font-sans">
                  {card.desc}
                </p>
              </div>

              {/* Code/Context block simulating AI output */}
              <div className="bg-[var(--lt-white)] border border-[var(--lt-border)] rounded p-4 font-mono text-[11px] text-[var(--lt-text-body)] space-y-2 overflow-x-auto">
                <div className="flex items-center gap-2 text-[var(--lt-text-hint)] border-b border-[var(--lt-border)] pb-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D8A85F] animate-pulse" />
                  <span>AI Remediation Agent</span>
                </div>
                <div className="text-[#5F8CFF]">{card.codeLabel}</div>
                <pre className="text-xs">{card.code}</pre>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
