"use client";

import React from "react";
import { motion } from "framer-motion";
import { languageCoverage } from "@/data/sast";

export default function SH3_LanguageCoverage() {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  };

  const staggerContainer = {
    whileInView: { transition: { staggerChildren: 0.05 } },
  };

  return (
    <section className="bg-[var(--lt-gray)] py-24 px-6 md:px-12 text-[var(--lt-text)]">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left Column: Text & Pills */}
        <div className="w-full lg:w-1/2 space-y-6">
          <motion.span {...fadeUp} className="lt-badge mb-2">
            {languageCoverage.badge}
          </motion.span>
          <motion.h2 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="lt-section-h2"
          >
            {languageCoverage.heading}
          </motion.h2>
          <motion.p 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="lt-body"
          >
            {languageCoverage.body}
          </motion.p>

          {/* Language Pills */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.05 }}
            className="flex flex-wrap gap-2 pt-4"
          >
            {languageCoverage.languages.map((lang) => (
              <motion.span
                key={lang}
                variants={fadeUp}
                className="bg-[var(--lt-white)] border border-[var(--lt-border)] rounded-lg px-3.5 py-1.5 text-xs font-semibold text-[var(--lt-text)] shadow-sm hover:border-[var(--lt-text-hint)] transition-colors duration-200"
              >
                {lang}
              </motion.span>
            ))}
          </motion.div>

          {/* Frameworks List */}
          <div className="pt-4">
            <span className="text-xs font-mono text-[var(--lt-text-hint)] uppercase tracking-wider block mb-2">Supported Frameworks Include:</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--lt-text-body)] font-medium">
              {languageCoverage.frameworks.map((fw) => (
                <span key={fw}>• {fw}</span>
              ))}
              <span>+ many more</span>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="w-full lg:w-1/2 rounded-lg overflow-hidden border border-[var(--lt-border)] shadow-md aspect-[4/3]"
        >
          <img 
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80" 
            alt="Clean laptop screen representing multi-language coding" 
            className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
          />
        </motion.div>
      </div>
    </section>
  );
}
