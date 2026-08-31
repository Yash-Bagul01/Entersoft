"use client";

import React from "react";
import SectionLabel from "../ui/SectionLabel";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { fadeInUpVariants } from "@/lib/animations";
import { Cpu, Shield, Building2 } from "lucide-react";

export default function ValueProposition() {
  const pillars = [
    {
      index: "01",
      title: "EnProbe platform",
      icon: <Cpu className="w-5 h-5 text-[var(--accent)]" />,
      description: "Continuous posture management, unified SAST/DAST/SCA telemetry, attack surface discovery, and exposure decisioning."
    },
    {
      index: "02",
      title: "Expert practices",
      icon: <Shield className="w-5 h-5 text-[var(--accent)]" />,
      description: "Senior-led practices across application security, penetration testing, cloud resilience, digital trust, MDR operations, protocol, and AI assurance."
    },
    {
      index: "03",
      title: "Enterprise programmes",
      icon: <Building2 className="w-5 h-5 text-[var(--accent)]" />,
      description: "Strategic risk governance, audit readiness, auditor liaison, and custom delivery tailored for CISOs, procurement, and enterprise boards."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section id="value-proposition" className="relative w-full bg-bg-primary overflow-hidden border-b border-[var(--border-subtle)]">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-16 md:pt-28 md:pb-24 flex flex-col items-center justify-center gap-12 md:gap-16 text-center">
        {/* Header */}
        <div className="max-w-[850px] flex flex-col items-center gap-4 text-center">
          <SectionLabel color="secondary">DELIVERY ARCHITECTURE</SectionLabel>
          
          <h2 className="text-[clamp(2rem,3.8vw,3.2rem)] font-display font-semibold tracking-[-0.02em] text-[var(--text-primary)] leading-[1.1]">
            One operating model. Three ways to create assurance.
          </h2>

          <p className="text-[clamp(14px,1.6vw,17px)] font-sans text-[var(--text-secondary)] leading-relaxed max-w-[760px] mt-2">
            Security tools generate signals. Enterprises need verified decisions, accountable action and evidence that risk has been reduced. Entersoft connects technology, specialist expertise and managed programmes so security teams can move from discovery to closure without losing context.
          </p>
        </div>

        {/* Three Pillar Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1240px] text-left"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.index}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className="group relative p-8 rounded-xl bg-[var(--bg-elevated)]/40 border border-[var(--border-subtle)] hover:border-[var(--accent)]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Card subtle glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-wider">
                    {pillar.index}
                  </span>
                  <div className="p-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)]">
                    {pillar.icon}
                  </div>
                </div>

                <h3 className="text-xl font-display font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200">
                  {pillar.title}
                </h3>

                <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-[var(--border-subtle)]/60 flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors duration-200">
                <span>ENTERPRISE CAPABILITY</span>
                <span>→</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 5-Step Delivery Model Lifecycle Section */}
        <div className="w-full max-w-[1240px] pt-12 border-t border-[var(--border-subtle)] flex flex-col items-center gap-8 text-center mt-4">
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-widest uppercase">ENGAGEMENT LIFECYCLE</span>
            <h3 className="text-xl md:text-2xl font-display font-semibold text-[var(--text-primary)] uppercase tracking-tight">
              5-Step Delivery Model
            </h3>
            <p className="text-xs font-sans text-[var(--text-secondary)] max-w-xl">
              From initial assessment to continuous assurance, Entersoft structures every client engagement around five disciplined delivery stages.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full text-left"
          >
            {[
              {
                step: "01",
                name: "ASSESS",
                label: "Discovery & Posture",
                desc: "Understand the environment, attack surface, application, cloud posture, controls, or security requirement."
              },
              {
                step: "02",
                name: "VALIDATE",
                label: "Risk & Exploitability",
                desc: "Test findings and determine actual risk, exploitability, business impact, and control effectiveness."
              },
              {
                step: "03",
                name: "REMEDIATE",
                label: "Guidance & Support",
                desc: "Provide practical remediation guidance and work with customer teams where engagement includes fix support."
              },
              {
                step: "04",
                name: "RETEST",
                label: "Fix Verification",
                desc: "Verify that agreed remediation has addressed the identified issue with verifiable proof."
              },
              {
                step: "05",
                name: "CONTINUOUSLY ASSURE",
                label: "Ongoing Governance",
                desc: "Maintain ongoing posture visibility beyond point-in-time assessment where continuous service is enabled."
              }
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={cardVariants}
                className="p-5 rounded-xl bg-[var(--bg-elevated)]/30 border border-[var(--border-subtle)] hover:border-[var(--accent)]/30 transition-all flex flex-col justify-between"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-widest">STAGE {item.step}</span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-[var(--text-primary)] tracking-wide">{item.name}</h4>
                  <span className="font-mono text-[9.5px] text-zinc-400 font-semibold">{item.label}</span>
                  <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Action Button & Indicator */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="flex flex-col items-center gap-4 text-center mt-2"
        >
          <Button variant="secondary" size="md" asLink href="#services" className="gap-2">
            Explore Expert Services <span className="font-sans">↓</span>
          </Button>

          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-tertiary)] opacity-75">
            Scroll to view measurable security outcomes
          </span>
        </motion.div>
      </div>
    </section>
  );
}
