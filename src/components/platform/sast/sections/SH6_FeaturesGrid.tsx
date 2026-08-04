"use client";

import React from "react";
import { motion } from "framer-motion";
import { featuresGrid } from "@/data/sast";
import * as Icons from "lucide-react";

export default function SH6_FeaturesGrid() {
  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };

  const staggerContainer = {
    whileInView: { transition: { staggerChildren: 0.04 } },
  };

  // Helper to dynamically render Lucide icons
  const renderIcon = (iconName: string) => {
    const LucideIcon = (Icons as any)[iconName];
    if (!LucideIcon) return <Icons.Check className="w-5 h-5" />;
    return <LucideIcon className="w-5 h-5 text-[#5F8CFF]" />;
  };

  return (
    <section className="bg-[var(--lt-white)] py-24 px-6 md:px-12 text-[var(--lt-text)]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="max-w-[640px] mb-16">
          <motion.span {...fadeUp} className="lt-badge mb-4">
            {featuresGrid.badge}
          </motion.span>
          <motion.h2 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="lt-section-h2 mb-4"
          >
            {featuresGrid.heading}
          </motion.h2>
          <motion.p 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="lt-body"
          >
            {featuresGrid.body}
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuresGrid.features.map((feat) => (
            <motion.div
              key={feat.title}
              variants={fadeUp}
              className="bg-[var(--lt-gray)] border border-[var(--lt-border)] rounded-lg p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div>
                {/* Icon & Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--lt-white)] border border-[var(--lt-border)] flex items-center justify-center shadow-sm group-hover:border-[#5F8CFF]/30 transition-colors duration-200">
                    {renderIcon(feat.icon)}
                  </div>
                  {feat.status !== "available" && (
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-[#D8A85F]/10 text-[#D8A85F] px-2 py-0.5 rounded border border-[#D8A85F]/20">
                      {feat.status}
                    </span>
                  )}
                </div>

                {/* Title & Body */}
                <h3 className="text-base font-bold font-sans tracking-tight text-[var(--lt-text)] mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-[var(--lt-text-body)] leading-relaxed font-sans">
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
