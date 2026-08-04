"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { capabilities } from "@/data/sast";

export default function SH2_Capabilities() {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  };

  // Map capability index to corresponding premium stock image
  const getCapImage = (index: number) => {
    switch (index) {
      case 0:
        return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"; // Minimalist modern architecture (precision)
      case 1:
        return "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80"; // Sleek microchip (CI/CD native)
      case 2:
        return "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80"; // Sleek laptop with code (developer experience)
      default:
        return "";
    }
  };

  return (
    <section className="bg-[var(--lt-white)] py-24 px-6 md:px-12 text-[var(--lt-text)]">
      <div className="max-w-[1200px] mx-auto">
        {/* Top Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-[var(--lt-border)] pb-10">
          <div className="max-w-[640px]">
            <motion.span {...fadeUp} className="lt-badge mb-4">
              The Scanning Platform
            </motion.span>
            <motion.h2 
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="lt-section-h2"
            >
              From first commit to verified fix. All in one place.
            </motion.h2>
          </div>
          <motion.div 
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="shrink-0"
          >
            <Link href="/contact" className="lt-btn-primary">
              Book a Live Demo
            </Link>
          </motion.div>
        </div>

        {/* Alternating Feature Rows */}
        <div className="space-y-24 md:space-y-32">
          {capabilities.map((cap, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={cap.badge}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Text Column */}
                <div className="w-full lg:w-[45%] space-y-6">
                  <motion.span 
                    {...fadeUp}
                    className="font-mono text-xs font-bold text-[#D8A85F] tracking-wider block"
                  >
                    {cap.badge}
                  </motion.span>
                  <motion.h3 
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.1 }}
                    className="lt-section-h2"
                  >
                    <span className="block">{cap.title1}</span>
                    <span className="block text-[var(--lt-text-hint)] font-normal mt-1">{cap.title2}</span>
                  </motion.h3>
                  <motion.p 
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.2 }}
                    className="lt-body text-base"
                  >
                    {cap.body}
                  </motion.p>
                  
                  {/* Stat Callout */}
                  <motion.div 
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.3 }}
                    className="pt-4 border-t border-[var(--lt-border)] flex items-baseline gap-4"
                  >
                    <span className="text-3xl font-bold font-mono text-[var(--lt-text)]">{cap.stat.value}</span>
                    <span className="text-xs font-mono text-[var(--lt-text-hint)] uppercase tracking-wider">{cap.stat.label}</span>
                  </motion.div>
                </div>

                {/* Visual Column */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.97, y: 16 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                  className="w-full lg:w-[55%] rounded-lg overflow-hidden border border-[var(--lt-border)] shadow-md aspect-[16/10]"
                >
                  <img 
                    src={getCapImage(index)} 
                    alt={cap.badge} 
                    className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
