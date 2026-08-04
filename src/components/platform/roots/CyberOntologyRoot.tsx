"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Compass, 
  Network, 
  Database, 
  Shield, 
  ChevronDown, 
  ChevronRight, 
  Layers, 
  Activity, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Lock, 
  Cpu, 
  Key, 
  Cloud 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import CyberOntologyHeroCanvas from "../visuals/CyberOntologyHeroCanvas";
import { 
  CodeApiDiagram, 
  CloudTopologyDiagram, 
  IamMatrixDiagram, 
  ControlsDiagram 
} from "../visuals/CyberOntologyDiagrams";
import { stats } from "@/data/stats";
import { testimonials } from "@/data/testimonials";
import { blogPosts } from "@/data/blog";

export default function CyberOntologyRoot() {
  // Accordion state for Section 8 FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Cyber Ontology unify data across isolated security scanners?",
      a: "Cyber Ontology ingests raw metadata, OpenAPI specifications, CloudTrail logs, and AST findings into a unified graph engine, mapping disparate signals to exact code owners and runtime workloads."
    },
    {
      q: "Can Cyber Ontology map multi-cloud topologies across AWS, Azure, and GCP?",
      a: "Yes. It continuously ingests VPC route tables, IAM permission boundaries, Kubernetes EKS cluster roles, and storage buckets into connected graph entities across multi-cloud environments."
    },
    {
      q: "How does graph modeling eliminate noisy scanner false positives?",
      a: "By contextualizing vulnerability findings with reachability analysis, active WAF rule parameters, and identity boundary controls, Cyber Ontology filters out unexploitable alerts automatically."
    },
    {
      q: "How does Cyber Ontology integrate with Entersoft's Application & Cloud practices?",
      a: "Cyber Ontology provides the asset dependency map that powers Entersoft's AppSec code-level verification and Managed Cloud Security continuous posture auditing."
    }
  ];

  // Testimonial from HIL / CK Birla Group
  const testimonial = testimonials[0];

  return (
    <div className="w-full bg-[#FAFCFF] text-slate-900 selection:bg-[#08428C] selection:text-white font-sans min-h-screen relative overflow-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION (DARK NAVY #030914 + HTML5 CANVAS PARTICLE MATRIX)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-36 pb-32 md:pt-48 md:pb-40 overflow-hidden bg-[#030914] text-white dark-hero-section">
        
        {/* Interactive HTML5 Canvas (Particle Dot Matrix + Radial Glow + Parallax + Network Silhouette) */}
        <CyberOntologyHeroCanvas />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-8">
          
          {/* Eyebrow Badge Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-[#38BDF8] bg-[#0D518C]/30 border border-[#0D518C]/60 px-4.5 py-2 rounded-full shadow-[0_0_20px_rgba(13,81,140,0.3)] backdrop-blur-md"
          >
            <Compass className="w-3.5 h-3.5 text-[#38BDF8] animate-spin-slow" />
            <span>DISCOVER & MODEL</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-200" style={{ color: "#e2e8f0" }}>UNIFIED SECURITY CONTEXT</span>
          </motion.div>

          {/* 2-Line Bold Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ color: "#ffffff" }}
            className="text-[clamp(2.8rem,5.8vw,5.2rem)] font-display font-extrabold text-white !text-white tracking-tight leading-[1.05] uppercase max-w-[960px] drop-shadow-2xl"
          >
            Model The Entire Security System.
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: "#cbd5e1" }}
            className="text-[18px] md:text-[21px] text-slate-300 !text-slate-300 leading-relaxed font-sans max-w-[780px]"
          >
            Applications, APIs, code repositories, multi-cloud assets, identities, controls, and business services mapped into one connected operational security model.
          </motion.p>

          {/* Dual Side-by-Side CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Button 
              variant="primary" 
              size="lg" 
              asLink 
              href="/#contact" 
              className="gap-2.5 bg-[#08428C] hover:bg-[#0D518C] text-white px-8 py-4 rounded-xl text-[15px] font-semibold shadow-[0_0_25px_rgba(8,66,140,0.5)] transition-all border-none"
            >
              <span>Explore Ontology Model</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="font-mono text-xs font-bold text-[#38BDF8] tracking-widest uppercase flex items-center gap-2 bg-[#05132A]/80 border border-slate-700/80 px-5 py-3.5 rounded-xl backdrop-blur-md">
              <span>CONNECTED ONTOLOGY ENGINE</span>
              <span className="text-slate-400 font-normal">+</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: APPROACH / PHILOSOPHY STATEMENT (WHITE BACKGROUND)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-white text-slate-900 py-24 md:py-32 border-b border-slate-200/80 relative">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col gap-20">
          
          {/* Two-Column Editorial Statement Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C] bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block">
                // OUR APPROACH & PHILOSOPHY
              </span>
            </div>
            
            <div className="lg:col-span-8 flex flex-col gap-6">
              <p className="text-[24px] md:text-[32px] font-display font-medium text-slate-900 leading-[1.3]">
                Traditional security tools operate in isolated silos. Cyber Ontology ingests metadata across every domain and unifies them under a single graph query interface, transforming routine testing into governed enterprise risk management.
              </p>
            </div>
          </div>

          {/* Stat Counter Row (Real Entersoft Stats) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-slate-200/80">
            {[
              { num: "600+", label: "CLIENTS SECURED", sub: "Global enterprises across banking & tech" },
              { num: "12,000+", label: "EXPLOITS PROVEN", sub: "Strict PoC evidence verification" },
              { num: "100,000+", label: "MANUAL AUDIT HOURS", sub: "Deep logical test cases beyond scanners" },
              { num: "0", label: "BREACHES RECORDED", sub: "Pristine 14-year breach prevention record" }
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <span className="text-[36px] md:text-[44px] font-display font-extrabold text-[#08428C] tracking-tight">
                  {stat.num}
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-900">
                  {stat.label}
                </span>
                <span className="text-[12px] text-slate-500 font-sans leading-normal">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: VISUAL PROOF GRID (NUMBERED 01-04 DIAGRAM TILES)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#FAFCFF] text-slate-900 py-24 md:py-32 border-b border-slate-200/80 relative">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          
          <div className="flex flex-col gap-3 max-w-[780px]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C]">
              // VISUAL PROOF & BUILDING BLOCKS
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-display font-extrabold uppercase tracking-tight text-slate-900">
              The Four Pillars of Cyber Ontology
            </h2>
            <p className="text-[16px] text-slate-600 font-sans leading-relaxed">
              Every layer of your operational architecture mapped into connected graph entities with live security context.
            </p>
          </div>

          {/* 4-Tile Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tile 01 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200/90 rounded-3xl p-8 flex flex-col gap-6 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[14px] font-extrabold text-[#08428C]">01</span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">APPLICATIONS & CODE</span>
              </div>
              <h3 className="text-[22px] font-bold font-display text-slate-900 group-hover:text-[#08428C] transition-colors">
                Code & API Graph
              </h3>
              <p className="text-[14.5px] text-slate-600 leading-relaxed font-sans">
                Maps AST scanner findings, source repos, OpenAPI specs, and internal routes directly to code committers and repository maintainers.
              </p>
              <CodeApiDiagram />
            </motion.div>

            {/* Tile 02 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-slate-200/90 rounded-3xl p-8 flex flex-col gap-6 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[14px] font-extrabold text-[#08428C]">02</span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">CLOUD & INFRASTRUCTURE</span>
              </div>
              <h3 className="text-[22px] font-bold font-display text-slate-900 group-hover:text-[#08428C] transition-colors">
                Cloud & IAM Topology
              </h3>
              <p className="text-[14.5px] text-slate-600 leading-relaxed font-sans">
                Ingests VPC routes, EKS cluster roles, IAM permissions, S3 buckets, and runtime workloads into connected asset entities.
              </p>
              <CloudTopologyDiagram />
            </motion.div>

            {/* Tile 03 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-slate-200/90 rounded-3xl p-8 flex flex-col gap-6 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[14px] font-extrabold text-[#08428C]">03</span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">IDENTITY & IAM MATRIX</span>
              </div>
              <h3 className="text-[22px] font-bold font-display text-slate-900 group-hover:text-[#08428C] transition-colors">
                Identity & Access Boundaries
              </h3>
              <p className="text-[14.5px] text-slate-600 leading-relaxed font-sans">
                Governs active OAuth2/OIDC role relationships and enforces zero-trust permission boundaries across multi-cloud topologies.
              </p>
              <IamMatrixDiagram />
            </motion.div>

            {/* Tile 04 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-slate-200/90 rounded-3xl p-8 flex flex-col gap-6 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[14px] font-extrabold text-[#08428C]">04</span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">CONTROLS & EXPOSURES</span>
              </div>
              <h3 className="text-[22px] font-bold font-display text-slate-900 group-hover:text-[#08428C] transition-colors">
                Control & Exposure Graph
              </h3>
              <p className="text-[14.5px] text-slate-600 leading-relaxed font-sans">
                Links active threat intelligence feeds, CVE exposures, WAF rules, and GRC compliance frameworks to actual asset criticalities.
              </p>
              <ControlsDiagram />
            </motion.div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: FEATURE CARDS ("BUILT FOR X" 3-CARD GRID)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-white text-slate-900 py-24 md:py-32 border-b border-slate-200/80 relative">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          
          <div className="flex flex-col gap-3 max-w-[780px]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C]">
              // UNIVERSAL SCHEMA MAPPING
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-display font-extrabold uppercase tracking-tight text-slate-900">
              Connect Disparate Security Schemas Into One Graph
            </h2>
            <p className="text-[16px] text-slate-600 font-sans leading-relaxed">
              Cyber Ontology ingests metadata across every domain and unifies them under a single graph query interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Network className="w-6 h-6 text-[#08428C]" />,
                title: "Enterprise Graph Modeling",
                description: "Continuously map relational dependencies across your codebase, cloud assets, IAM roles, and business processes into a single unified security graph."
              },
              {
                icon: <Database className="w-6 h-6 text-[#08428C]" />,
                title: "Context-Aware Risk Abstraction",
                description: "Transform isolated scanner alerts into rich contextual entities linked to actual asset criticalities and business services."
              },
              {
                icon: <Shield className="w-6 h-6 text-[#08428C]" />,
                title: "Dynamic Schema Integration",
                description: "Ingest and normalize disparate asset schemas across multi-cloud environments, container orchestrations, and API endpoints."
              }
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#FAFCFF] border border-slate-200/90 hover:border-[#08428C] p-8 rounded-3xl flex flex-col gap-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-[#08428C] group-hover:text-white transition-colors duration-300">
                  {card.icon}
                </div>
                <h3 className="text-[20px] font-bold font-display uppercase tracking-tight text-slate-900 group-hover:text-[#08428C] transition-colors">
                  {card.title}
                </h3>
                <p className="text-[15px] text-slate-600 leading-relaxed font-sans">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: STAT HIGHLIGHT + CTA STRIP (WHITE BACKGROUND, #08428C BUTTON)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#FAFCFF] text-slate-900 py-24 md:py-32 border-b border-slate-200/80 relative">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col gap-16 items-center text-center">
          
          <div className="flex flex-col gap-4 max-w-[820px] items-center">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C] bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">
              // ZERO FALSE ASSUMPTIONS
            </span>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-display font-extrabold uppercase tracking-tight text-slate-900">
              Unified Security Context Driven By Proof
            </h2>
            <p className="text-[17px] text-slate-600 font-sans leading-relaxed max-w-[680px]">
              Eliminate noisy alert queues by contextualizing exposures against real operational reachability and impact parameters.
            </p>
          </div>

          {/* 3 Stacked Percentage Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1000px] pt-4">
            <div className="bg-white border border-slate-200/80 p-8 rounded-3xl flex flex-col items-center text-center gap-2 shadow-sm">
              <span className="text-[48px] font-display font-extrabold text-[#08428C]">100%</span>
              <span className="font-mono text-[11px] font-bold uppercase text-slate-900 tracking-wider">Cross-Domain Graph Correlation</span>
              <span className="text-[12px] text-slate-500 font-sans">AST, Cloud, and IAM assets unified</span>
            </div>

            <div className="bg-white border border-slate-200/80 p-8 rounded-3xl flex flex-col items-center text-center gap-2 shadow-sm">
              <span className="text-[48px] font-display font-extrabold text-[#08428C]">0.01%</span>
              <span className="font-mono text-[11px] font-bold uppercase text-slate-900 tracking-wider">Vulnerability Recurrence Rate</span>
              <span className="text-[12px] text-slate-500 font-sans">Governed remediation patches</span>
            </div>

            <div className="bg-white border border-slate-200/80 p-8 rounded-3xl flex flex-col items-center text-center gap-2 shadow-sm">
              <span className="text-[48px] font-display font-extrabold text-[#08428C]">0</span>
              <span className="font-mono text-[11px] font-bold uppercase text-slate-900 tracking-wider">False Positives in Context</span>
              <span className="text-[12px] text-slate-500 font-sans">Reachability-filtered alerts</span>
            </div>
          </div>

          <div className="pt-6">
            <Button 
              variant="primary" 
              size="lg" 
              asLink 
              href="/#contact" 
              className="gap-2.5 bg-[#08428C] hover:bg-[#0D518C] text-white px-9 py-4.5 rounded-xl text-[15px] font-semibold shadow-lg shadow-blue-600/20 border-none"
            >
              <span>Request Architecture Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: DARK TESTIMONIAL BAND (DARK NAVY #05132A)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#05132A] text-white dark-testimonial-section py-24 md:py-32 border-b border-slate-800 relative">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col gap-12 items-center text-center">
          
          <div className="flex items-center gap-2 text-[#38BDF8] font-mono text-[11px] font-bold uppercase tracking-widest bg-[#0D518C]/30 border border-[#0D518C]/60 px-4 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span style={{ color: "#38bdf8" }}>VERIFIED AUDIT TESTIMONIAL</span>
          </div>

          <blockquote style={{ color: "#f8fafc" }} className="text-[22px] md:text-[30px] font-display font-medium text-slate-100 !text-slate-100 max-w-[920px] leading-relaxed italic">
            "{testimonial.quote}"
          </blockquote>

          <div className="flex flex-col items-center gap-2">
            <span style={{ color: "#ffffff" }} className="font-mono text-[13px] font-extrabold text-white !text-white tracking-widest uppercase author-title">
              {testimonial.author}
            </span>
            <span style={{ color: "#94a3b8" }} className="text-[12px] font-mono text-slate-400 !text-slate-400">
              {testimonial.role} — <strong className="text-[#38BDF8]" style={{ color: "#38bdf8" }}>{testimonial.company}</strong>
            </span>
            <span className="mt-2 text-[10px] font-mono font-bold bg-[#0D518C]/40 border border-[#38BDF8]/40 text-[#38BDF8] px-3 py-1 rounded-full" style={{ color: "#38bdf8" }}>
              {testimonial.badge} • {testimonial.metric}
            </span>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: HOW IT WORKS / WHERE IT FITS (3-STEP WORKFLOW)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-white text-slate-900 py-24 md:py-32 border-b border-slate-200/80 relative">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          
          <div className="flex flex-col gap-3 max-w-[780px]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C]">
              // HOW CYBER ONTOLOGY WORKS
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-display font-extrabold uppercase tracking-tight text-slate-900">
              3-Step Operational Workflow
            </h2>
            <p className="text-[16px] text-slate-600 font-sans leading-relaxed">
              From raw telemetry ingestion to contextual risk boundary computation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Step 1 */}
            <div className="bg-[#FAFCFF] border border-slate-200/90 p-8 rounded-3xl flex flex-col justify-between gap-6 shadow-xs">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[13px] font-extrabold text-[#08428C] bg-blue-50 px-3 py-1 rounded-full w-fit border border-blue-100">STEP 01</span>
                <h3 className="text-[20px] font-bold font-display text-slate-900">Asset Telemetry Ingestion</h3>
                <p className="text-[14.5px] text-slate-600 leading-relaxed font-sans">
                  Collect asset metadata and relational configurations from repositories, cloud providers, and identity providers.
                </p>
              </div>
            </div>

            {/* Step 2 (EMPHASIZED CORE STEP) */}
            <div className="bg-white border-2 border-[#08428C] p-8 rounded-3xl flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden transform md:-translate-y-2">
              <div className="absolute top-0 right-0 bg-[#08428C] text-white font-mono text-[9px] font-bold uppercase px-4 py-1.5 rounded-bl-xl tracking-widest">
                CORE GRAPH ENGINE
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[13px] font-extrabold text-white bg-[#08428C] px-3 py-1 rounded-full w-fit">STEP 02</span>
                <h3 className="text-[20px] font-bold font-display text-[#08428C]">Graph Correlation Mapping</h3>
                <p className="text-[14.5px] text-slate-700 leading-relaxed font-sans font-medium">
                  Map cross-domain dependencies into a high-performance graph engine to establish true asset context.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAFCFF] border border-slate-200/90 p-8 rounded-3xl flex flex-col justify-between gap-6 shadow-xs">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[13px] font-extrabold text-[#08428C] bg-blue-50 px-3 py-1 rounded-full w-fit border border-blue-100">STEP 03</span>
                <h3 className="text-[20px] font-bold font-display text-slate-900">Boundary & Ownership Analysis</h3>
                <p className="text-[14.5px] text-slate-600 leading-relaxed font-sans">
                  Automatically compute operational ownership, reachability parameters, and business impact boundaries.
                </p>
              </div>
            </div>
          </div>

          {/* Practice Integration Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="bg-[#FAFCFF] border border-slate-200/80 p-8 rounded-3xl flex flex-col justify-between gap-4">
              <div>
                <span className="font-mono text-[11px] font-bold text-[#08428C] uppercase tracking-wider block mb-2">// PRACTICE INTEGRATION</span>
                <h4 className="text-[20px] font-bold font-display text-slate-900">Application Assurance</h4>
                <p className="text-[14px] text-slate-600 mt-2 font-sans">Connects code-level vulnerability findings directly with runtime cloud infrastructures and identity controls.</p>
              </div>
              <Link href="/services/appsec" className="inline-flex items-center gap-2 font-mono text-[12px] font-bold text-[#08428C] uppercase tracking-wider hover:underline pt-2">
                <span>Explore Practice</span> <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-[#FAFCFF] border border-slate-200/80 p-8 rounded-3xl flex flex-col justify-between gap-4">
              <div>
                <span className="font-mono text-[11px] font-bold text-[#08428C] uppercase tracking-wider block mb-2">// PRACTICE INTEGRATION</span>
                <h4 className="text-[20px] font-bold font-display text-slate-900">Cloud Security & Resilience</h4>
                <p className="text-[14px] text-slate-600 mt-2 font-sans">Provides the asset dependency map needed to contextualize CSPM findings and multi-cloud misconfigurations.</p>
              </div>
              <Link href="/services/managed-cloud-security" className="inline-flex items-center gap-2 font-mono text-[12px] font-bold text-[#08428C] uppercase tracking-wider hover:underline pt-2">
                <span>Explore Practice</span> <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: FAQ ACCORDION (WHITE BACKGROUND)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#FAFCFF] text-slate-900 py-24 md:py-32 border-b border-slate-200/80 relative">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 flex flex-col gap-12">
          
          <div className="flex flex-col gap-3 text-center items-center">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C]">
              // FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-display font-extrabold uppercase tracking-tight text-slate-900">
              Platform Architecture FAQ
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-[18px] text-slate-900 hover:text-[#08428C] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[13px] text-[#08428C] font-extrabold">0{idx + 1}</span>
                      <span>{faq.q}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-[#08428C] transition-transform duration-300 shrink-0 ${isOpen ? "transform rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 pb-6 pt-0 text-[14.5px] text-slate-600 leading-relaxed font-sans border-t border-slate-100"
                      >
                        <p className="pt-4">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: THREAT INTELLIGENCE DESK (RELATED CONTENT)
          ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-white text-slate-900 py-24 md:py-32 border-b border-slate-200/80 relative">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          
          <div className="flex flex-col gap-3 max-w-[780px]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C]">
              // ENTERSOFT THREAT DESK
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-display font-extrabold uppercase tracking-tight text-slate-900">
              Latest Technical Research & Briefings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-[#FAFCFF] border border-slate-200/90 p-8 rounded-3xl flex flex-col justify-between gap-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[10px] font-bold text-[#08428C] bg-blue-50 px-3 py-1 rounded-full w-fit border border-blue-100 uppercase">
                    {post.category}
                  </span>
                  <h3 className="text-[19px] font-bold font-display text-slate-900 group-hover:text-[#08428C] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-[14px] text-slate-600 font-sans leading-relaxed">
                    {post.teaser}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 font-mono text-[11px] text-slate-400">
                  <span>{post.date}</span>
                  <span className="text-[#08428C] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    READ <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 10: CLOSING CTA (DARK NAVY #030914 WITH HERO GLOW MATCH)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-28 md:py-40 bg-[#030914] text-white dark-cta-section overflow-hidden border-t border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#0D518C]/25 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-8">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#38BDF8] bg-[#0D518C]/30 border border-[#0D518C]/60 px-4 py-1.5 rounded-full" style={{ color: "#38bdf8" }}>
            SECURE ENGAGEMENT GATE
          </span>

          <h2 style={{ color: "#ffffff" }} className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-display font-extrabold uppercase tracking-tight text-white !text-white leading-tight">
            Connect Your Stack To Cyber Ontology
          </h2>

          <p style={{ color: "#cbd5e1" }} className="text-[17px] text-slate-300 !text-slate-300 font-sans max-w-[620px] leading-relaxed">
            Establish a baseline. An Entersoft threat coordinator will analyze your asset architecture and respond within 2 hours.
          </p>

          <div className="pt-4">
            <Button 
              variant="primary" 
              size="lg" 
              asLink 
              href="/#contact" 
              className="gap-2.5 bg-[#08428C] hover:bg-[#0D518C] text-white px-9 py-4.5 rounded-xl text-[15px] font-semibold shadow-[0_0_30px_rgba(8,66,140,0.5)] transition-all border-none"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
