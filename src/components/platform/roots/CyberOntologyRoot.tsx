"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, ChevronRight, Share2, Compass, Network, Database, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import FinalCTA from "@/components/sections/FinalCTA";
import CyberOntologyGraph from "../visuals/CyberOntologyGraph";

export default function CyberOntologyRoot() {
  return (
    <div className="w-full bg-[#060606] text-white selection:bg-[#08428C] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO & INTERACTIVE GRAPH VISUALIZER
          ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#060606] border-b border-white/10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#08428C]/30 to-[#0D518C]/20 rounded-full blur-[130px] pointer-events-none opacity-50" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-12">
          <div className="flex flex-col items-start gap-6 max-w-[900px]">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C] bg-[#08428C]/10 border border-[#08428C]/30 px-3.5 py-1.5 rounded-full"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>DISCOVER & MODEL</span>
              <span className="text-white/30">•</span>
              <span className="text-white/80">UNIFIED SECURITY CONTEXT</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-display font-bold uppercase tracking-tight leading-[1.05] text-white"
            >
              Cyber Ontology — Model The Entire Security System
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[16px] md:text-[19px] text-[#A1A1AA] leading-relaxed font-sans max-w-[780px]"
            >
              Applications, APIs, code repositories, multi-cloud assets, identities, controls, and business services mapped into one connected operational security model.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button variant="primary" size="lg" asLink href="/#contact" className="gap-2 bg-[#08428C] hover:bg-[#0D518C] text-white border-none shadow-lg">
                Explore Ontology Model <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          {/* Interactive Graph Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <CyberOntologyGraph />
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: INGESTION CONNECTORS & SCHEMA MAP
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#0a0f1d] text-white py-24 md:py-32 border-b border-white/10 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          <div className="flex flex-col gap-3 max-w-[750px]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C]">
              // UNIVERSAL SCHEMA MAPPING
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-display font-bold uppercase tracking-tight text-white">
              Connect Disparate Security Schemas Into One Graph
            </h2>
            <p className="text-[15px] text-[#A1A1AA] font-sans leading-relaxed">
              Traditional security tools operate in isolated silos. Cyber Ontology ingest metadata across every domain and unifies them under a single graph query interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Network className="w-6 h-6 text-[#08428C]" />,
                title: "Code & API Graph",
                description: "Maps AST scanner findings, source repos, OpenAPI specs, and internal routes directly to code committers and repository maintainers."
              },
              {
                icon: <Database className="w-6 h-6 text-[#08428C]" />,
                title: "Cloud & IAM Topology",
                description: "Ingests VPC routes, EKS cluster roles, IAM permissions, S3 buckets, and runtime workloads into connected asset entities."
              },
              {
                icon: <Shield className="w-6 h-6 text-[#08428C]" />,
                title: "Control & Exposure Graph",
                description: "Links active threat intelligence feeds, CVE exposures, WAF rules, and GRC compliance frameworks to actual asset criticalities."
              }
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#060606] border border-[#08428C]/30 hover:border-[#08428C] p-8 rounded-[8px] flex flex-col gap-4 shadow-xl transition-all group"
              >
                <div className="w-12 h-12 rounded-[6px] bg-[#08428C]/10 flex items-center justify-center group-hover:bg-[#08428C] group-hover:text-white transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-[18px] font-bold font-display uppercase tracking-tight text-white group-hover:text-[#08428C] transition-colors">
                  {card.title}
                </h3>
                <p className="text-[14px] text-[#A1A1AA] leading-relaxed font-sans">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: PRACTICE INTEGRATION & CTA
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#060606] text-white py-24 md:py-32 border-b border-white/10 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          <div className="flex flex-col gap-3 max-w-[750px]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C]">
              // ENTERSOFT PRACTICE INTEGRATION
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-display font-bold uppercase tracking-tight text-white">
              Powering Expert Practices
            </h2>
            <p className="text-[15px] text-[#A1A1AA] font-sans leading-relaxed">
              Cyber Ontology provides the underlying asset context that transforms routine testing into governed enterprise risk management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Application Assurance",
                href: "/services/appsec",
                desc: "Connects code-level vulnerability findings directly with runtime cloud infrastructures and identity controls."
              },
              {
                name: "Cloud Resilience",
                href: "/services/managed-cloud-security",
                desc: "Provides the asset dependency map needed to contextualize CSPM findings and multi-cloud misconfigurations."
              }
            ].map((item, idx) => (
              <div key={item.name} className="bg-[#0a0f1d] border border-white/10 hover:border-[#08428C] p-8 rounded-[8px] flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#08428C] font-bold uppercase tracking-widest">
                    <Layers className="w-4 h-4" />
                    <span>PRACTICE INTEGRATION</span>
                  </div>
                  <h3 className="text-[22px] font-bold font-display text-white">{item.name}</h3>
                  <p className="text-[14px] text-[#A1A1AA] font-sans leading-relaxed">{item.desc}</p>
                </div>
                <Link href={item.href} className="inline-flex items-center gap-2 font-mono text-[12px] font-bold text-[#08428C] uppercase tracking-wider hover:underline">
                  <span>Explore Practice</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
