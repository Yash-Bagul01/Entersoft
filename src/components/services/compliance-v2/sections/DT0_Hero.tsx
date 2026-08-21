"use client";

import React from "react";
import { motion } from "framer-motion";
import { digitalTrustData } from "@/data/digitalTrust";
import { Button } from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import ServiceBreadcrumb from "@/components/services/ServiceBreadcrumb";
import DT5_GovernanceTopologyCanvas from "./DT5_GovernanceTopologyCanvas";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function DT0_Hero() {
  const { hero } = digitalTrustData;
  const isReduced = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isReduced ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isReduced ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-center items-center px-6 md:px-12 lg:px-16 pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden border-b border-white/[0.08] bg-[#060606] text-[#F5F5F5]">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,163,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Hero Narrative */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-6 text-left"
          >
            <ServiceBreadcrumb />

            {/* Eyebrow & Badge */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] md:text-[11px] font-bold text-sky-400 tracking-[0.2em] uppercase">
                // {hero.eyebrow}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-[2px] bg-white/[0.05] border border-white/[0.08] font-mono text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                {hero.badge}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-[1.08] max-w-[680px]"
            >
              {hero.headline}
            </motion.h1>

            {/* Subline */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-[620px]"
            >
              {hero.subline}
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-2 pt-2">
              <MagneticButton>
                <Button variant="primary" size="lg" asLink href="/#contact">
                  Request a Readiness Workshop
                </Button>
              </MagneticButton>

              <span className="font-mono text-[9px] font-bold text-sky-300 tracking-wider uppercase border border-sky-500/20 bg-sky-950/20 px-3 py-2.5 rounded-lg">
                Readiness Workshop & Audit Governance · Fixed Engagement
              </span>

              <MagneticButton>
                <Button variant="ghost" size="lg" asLink href="#pillars">
                  Explore 4 Pillars →
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Fast Navigation Anchor Quick Links */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-white/[0.08] w-full font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-500"
            >
              <span className="text-zinc-600">JUMP TO:</span>
              <a href="#pillars" className="hover:text-sky-400 transition-colors">
                01. 4 Pillars
              </a>
              <span className="text-zinc-800">•</span>
              <a href="#operating-model" className="hover:text-sky-400 transition-colors">
                02. Operating Model
              </a>
              <span className="text-zinc-800">•</span>
              <a href="#frameworks" className="hover:text-sky-400 transition-colors">
                03. Frameworks
              </a>
              <span className="text-zinc-800">•</span>
              <a href="#roadmap" className="hover:text-sky-400 transition-colors">
                04. Roadmap
              </a>
              <span className="text-zinc-800">•</span>
              <a href="#faq" className="hover:text-sky-400 transition-colors">
                05. FAQ
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Governance Topology Visual */}
          <motion.div
            initial={{ opacity: 0, scale: isReduced ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
            className="w-full h-full flex items-center justify-center"
          >
            <DT5_GovernanceTopologyCanvas />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
