"use client";

import React from "react";
import SectionLabel from "../ui/SectionLabel";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { fadeInUpVariants } from "@/lib/animations";

export default function ValueProposition() {
  const tokens = [
    { text: "Built", highlight: false },
    { text: "on", highlight: false },
    { text: "14", highlight: true },
    { text: "years", highlight: true },
    { text: "of", highlight: false },
    { text: "offensive", highlight: true },
    { text: "security", highlight: true },
    { text: "expertise,", highlight: true },
    { text: "Entersoft", highlight: false },
    { text: "combines", highlight: false },
    { text: "AI-native", highlight: true },
    { text: "analysis", highlight: true },
    { text: "with", highlight: false },
    { text: "human", highlight: true },
    { text: "validation", highlight: true },
    { text: "to", highlight: false },
    { text: "help", highlight: false },
    { text: "enterprises", highlight: false },
    { text: "map,", highlight: true },
    { text: "test,", highlight: true },
    { text: "prioritize", highlight: true },
    { text: "and", highlight: false },
    { text: "remediate", highlight: true },
    { text: "risk", highlight: true },
    { text: "across", highlight: false },
    { text: "applications,", highlight: true },
    { text: "APIs,", highlight: true },
    { text: "code,", highlight: true },
    { text: "cloud", highlight: true },
    { text: "and", highlight: true },
    { text: "identity.", highlight: true }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section id="value-proposition" className="relative w-full bg-bg-primary overflow-hidden">
      {/* Background radial highlight for premium touch */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.015)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-10 md:pt-32 md:pb-12 flex flex-col items-center justify-center gap-8 md:gap-10 text-center">
        <div className="max-w-[1150px] flex flex-col items-center gap-6 text-center">
          <SectionLabel color="secondary">DEFENSIVE PHILOSOPHY</SectionLabel>
          
          {/* Main Statement Word-by-Word Reveal */}
          <motion.h2
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="text-[clamp(1.5rem,3.4vw,2.8rem)] font-display font-medium leading-[1.2] tracking-[-0.02em] uppercase text-center flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.15em]"
          >
            {tokens.map((token, index) => (
              <React.Fragment key={index}>
                <motion.span
                  variants={itemVariants}
                  whileHover={token.highlight ? { 
                    scale: 1.05, 
                    textShadow: "0 0 12px rgba(0,163,255,0.25)",
                    transition: { duration: 0.2, ease: "easeOut" }
                  } : { 
                    y: -2,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  className={`inline-block transition-all duration-300 cursor-default hover:text-accent ${
                    token.highlight ? "text-text-secondary font-semibold" : "text-text-primary"
                  }`}
                  style={{ display: 'inline-block', whiteSpace: 'pre' }}
                >
                  {token.text}
                </motion.span>
                {index < tokens.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </motion.h2>
        </div>

        {/* Action Button & Scroll Indicator */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="mt-2 flex flex-col items-center gap-6 text-center"
        >
          <Button variant="secondary" size="md" asLink href="#track-record" className="gap-2">
            Explore Track Record <span className="font-sans">↓</span>
          </Button>

          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted/60 transition-colors">
            Scroll to unroll deterministic metrics
          </span>
        </motion.div>
      </div>
    </section>
  );
}
