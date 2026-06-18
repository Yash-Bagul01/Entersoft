"use client";

import React from "react";
import SectionLabel from "../ui/SectionLabel";
import { Button } from "../ui/Button";
import MagneticButton from "../ui/MagneticButton";
import { motion } from "framer-motion";
import { scrollRevealVariants, staggerContainerVariants } from "@/lib/animations";

interface DifferentiatorItem {
  title: string;
  proof: string;
  gridClass: string;
}

export default function Differentiators() {
  const items: DifferentiatorItem[] = [
    {
      title: "Exploit-First Evidence",
      proof: "We construct and deliver active Proof of Concept (PoC) exploits and business impact validation on every finding, ensuring risk is verified, not theoretical.",
      gridClass: "md:col-span-2"
    },
    {
      title: "70 Logical Checks",
      proof: "Every application undergoes 70 standard logical verification checks beyond automated scanner capabilities.",
      gridClass: "md:col-span-1"
    },
    {
      title: "Zero-Noise Deliveries",
      proof: "We manually review and purge duplicate logs, delivering only verified high-integrity code risks.",
      gridClass: "md:col-span-1"
    },
    {
      title: "Developer-Ready Fixes",
      proof: "Every vulnerability report is packaged with clear code diff suggestions, sample fixes, and pull-request scripts to help developers patch issues instantly.",
      gridClass: "md:col-span-2"
    },
    {
      title: "Unlimited Retest Gates",
      proof: "Re-verify patched code on-demand within 365 days of the initial scan, securing mitigation records.",
      gridClass: "md:col-span-1"
    },
    {
      title: "Zero Talent Attrition",
      proof: "Your platforms are audited by the same veteran engineering cohort, maintaining zero technical staff turnover in 13 years.",
      gridClass: "md:col-span-2"
    },
    {
      title: "Native Pipeline Hooks",
      proof: "Direct webhook integrations sync finding data natively with Azure DevOps, GitHub, GitLab, Jira, and ServiceNow.",
      gridClass: "md:col-span-2"
    },
    {
      title: "Pre-Audit Compliance",
      proof: "Pre-mapped checks instantly clear requirements for CERT-In, ISO 27001, GDPR, CREST, and RBI guidelines.",
      gridClass: "md:col-span-1"
    }
  ];

  return (
    <section className="relative w-full bg-[#060606] overflow-hidden">
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
                <SectionLabel color="secondary">OPERATIONAL COMPARISON</SectionLabel>
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
                What Makes Working with Entersoft Different
              </motion.h2>
            </div>
          </motion.div>
          <div>
            <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-widest block mb-1">
              // RE-ARCHITECTING APPSEC DEFENSE
            </span>
          </div>
        </div>

        {/* Asymmetric Hairline Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[var(--border-subtle)]"
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={scrollRevealVariants}
              className={`p-8 md:p-10 border-r border-b border-[var(--border-subtle)] flex flex-col justify-between gap-4 hover:bg-white/[0.015] transition-all duration-300 min-h-[190px] relative overflow-hidden group ${item.gridClass}`}
            >
              {/* Radial glow background on hover */}
              <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(0,163,255,0.02)_0%,transparent_70%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <h3 className="font-display font-bold text-lg md:text-xl text-[#F6F5F0] uppercase tracking-tight group-hover:text-[var(--accent)] group-hover:translate-x-2 transition-all duration-300 relative z-10">
                {item.title}
              </h3>
              <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed font-sans group-hover:text-[#F6F5F0] transition-colors duration-300 relative z-10">
                {item.proof}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Call to Action */}
        <div className="flex justify-center mt-4">
          <MagneticButton>
            <Button variant="primary" size="lg" asLink href="#contact">
              Talk to an Expert
            </Button>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}
