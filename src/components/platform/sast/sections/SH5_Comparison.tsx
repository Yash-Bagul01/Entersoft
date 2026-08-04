"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { comparison } from "@/data/sast";
import { CheckCircle2 } from "lucide-react";

export default function SH5_Comparison() {
  const [activeTab, setActiveTab] = useState(0);

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section className="bg-[var(--lt-gray)] py-24 px-6 md:px-12 text-[var(--lt-text)]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="max-w-[640px] mb-16">
          <motion.span {...fadeUp} className="lt-badge mb-4">
            {comparison.badge}
          </motion.span>
          <motion.h2 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="lt-section-h2 mb-4"
          >
            {comparison.heading}
          </motion.h2>
          <motion.p 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="lt-body"
          >
            {comparison.body}
          </motion.p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-[var(--lt-border)] pb-4 overflow-x-auto">
          {comparison.tabs.map((tab, idx) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 shrink-0 ${
                activeTab === idx
                  ? "bg-[var(--lt-white)] text-[var(--lt-text)] shadow-sm border border-[var(--lt-border)]"
                  : "text-[var(--lt-text-hint)] hover:text-[var(--lt-text)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Left Column: Text & Benefits */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="lt-section-h2 text-2xl">
                {comparison.tabs[activeTab].heading}
              </h3>
              <p className="lt-body text-base">
                {comparison.tabs[activeTab].body}
              </p>

              {/* Benefits List */}
              <div className="space-y-4 pt-4">
                {comparison.tabs[activeTab].benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5F8CFF] shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-[var(--lt-text-body)] leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Premium Image */}
            <div className="lg:col-span-6 rounded-lg overflow-hidden border border-[var(--lt-border)] shadow-md aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80" 
                alt="Team collaborating on software security architecture" 
                className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
