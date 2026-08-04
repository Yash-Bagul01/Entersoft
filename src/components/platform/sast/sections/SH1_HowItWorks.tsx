"use client";

import React from "react";
import { motion } from "framer-motion";
import { howItWorksSteps } from "@/data/sast";

export default function SH1_HowItWorks() {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  };

  const staggerContainer = {
    whileInView: { transition: { staggerChildren: 0.1 } },
  };

  // Map step index to corresponding premium image
  const getStepImage = (index: number) => {
    switch (index) {
      case 0:
        return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"; // Abstract network nodes
      case 1:
        return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"; // Clean code scanning
      case 2:
        return "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80"; // Developer fixing code
      default:
        return "";
    }
  };

  return (
    <section id="how-it-works" className="bg-[var(--lt-gray)] py-24 px-6 md:px-12 text-[var(--lt-text)]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="max-w-[640px] mb-16">
          <motion.span 
            {...fadeUp}
            className="lt-badge mb-4"
          >
            How EnProbe SAST Works
          </motion.span>
          <motion.h2 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="lt-section-h2 mb-4"
          >
            Your first scan is five minutes away.
          </motion.h2>
          <motion.p 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="lt-body"
          >
            Integrate security directly into your development lifecycle. Scan every commit, identify vulnerabilities, and fix them where you write code.
          </motion.p>
        </div>

        {/* Step Cards Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={step.badge}
              variants={fadeUp}
              className="bg-[var(--lt-white)] border border-[var(--lt-border)] rounded-lg p-6 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Floating Mini-Badge */}
              <span className="absolute top-6 right-6 font-mono text-[11px] font-bold text-[var(--lt-text-hint)] bg-[var(--lt-pill-bg)] px-2.5 py-1 rounded-full border border-[var(--lt-border)]">
                {step.badge2}
              </span>

              {/* Premium Image Area */}
              <div className="mb-8 mt-4 overflow-hidden rounded-lg border border-[var(--lt-border)] bg-[var(--lt-warm)] aspect-[16/10]">
                <img 
                  src={getStepImage(index)} 
                  alt={step.title} 
                  className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
                />
              </div>

              {/* Step Info */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs font-bold text-[#D8A85F]">{step.badge}</span>
                  <span className="font-mono text-[10px] font-bold text-[var(--lt-text-hint)] uppercase tracking-widest">{step.tagLabel}</span>
                </div>
                <h3 className="lt-feature-h3 mb-2">{step.title}</h3>
                <p className="font-sans text-sm text-[var(--lt-text-body)] leading-relaxed">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
