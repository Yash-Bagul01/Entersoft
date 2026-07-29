"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, ChevronRight, Database, Sliders, Cpu, Activity, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import FinalCTA from "@/components/sections/FinalCTA";
import DataFusionStream from "../visuals/DataFusionStream";

export default function DataFusionRoot() {
  return (
    <div className="w-full bg-[#060606] text-white selection:bg-[#08428C] selection:text-white">
      {/* HERO & LIVE TERMINAL STREAM */}
      <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#060606] border-b border-white/10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#08428C]/30 to-[#0D518C]/20 rounded-full blur-[130px] pointer-events-none opacity-50" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-12">
          <div className="flex flex-col items-start gap-6 max-w-[900px]">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C] bg-[#08428C]/10 border border-[#08428C]/30 px-3.5 py-1.5 rounded-full"
            >
              <Database className="w-3.5 h-3.5" />
              <span>DISCOVER & MODEL</span>
              <span className="text-white/30">•</span>
              <span className="text-white/80">CONNECT THE STACK</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-display font-bold uppercase tracking-tight leading-[1.05] text-white"
            >
              Security Data Fusion — Unify Fragmented Telemetry
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[16px] md:text-[19px] text-[#A1A1AA] leading-relaxed font-sans max-w-[780px]"
            >
              Stream, normalize, and deduplicate security signals across AppSec, IAM, cloud, EDR, SIEM, threat intelligence, and developer tools into a clean, actionable data pipeline.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button variant="primary" size="lg" asLink href="/#contact" className="gap-2 bg-[#08428C] hover:bg-[#0D518C] text-white border-none shadow-lg">
                Request Stream Demo <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <DataFusionStream />
          </motion.div>
        </div>
      </section>

      {/* INTEGRATIONS MATRIX & BENCHMARK STRIP */}
      <section className="w-full bg-[#0a0f1d] text-white py-24 md:py-32 border-b border-white/10 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          <div className="flex flex-col gap-3 max-w-[750px]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C]">
              // ECOSYSTEM INTEGRATION
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-display font-bold uppercase tracking-tight text-white">
              Native Connectors Across Your Security Stack
            </h2>
            <p className="text-[15px] text-[#A1A1AA] font-sans leading-relaxed">
              Eliminate manual data wrangling. Data Fusion connects via native APIs to automatically map inputs from static scanners, runtime telemetry, and GRC dashboards.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[12px]">
            {["CrowdStrike EDR", "AWS GuardDuty", "Snyk SAST/SCA", "Datadog Telemetry", "GitHub Actions", "Jira Software", "Splunk Enterprise", "Okta Identity"].map((tool) => (
              <div key={tool} className="bg-[#060606] border border-[#08428C]/30 p-4 rounded flex items-center justify-between">
                <span>{tool}</span>
                <span className="w-2 h-2 rounded-full bg-[#08428C] animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICE INTEGRATION */}
      <section className="w-full bg-[#060606] text-white py-24 md:py-32 border-b border-white/10 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          <div className="flex flex-col gap-3 max-w-[750px]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#08428C]">
              // ENTERSOFT PRACTICE INTEGRATION
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-display font-bold uppercase tracking-tight text-white">
              Powering Practice Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Cyber Defense Operations",
                href: "/services/siem",
                desc: "Feeds enriched, multi-source security events into active SOC monitoring and incident detection pipelines."
              },
              {
                name: "Adversarial Validation",
                href: "/services/vapt",
                desc: "Ingests penetration audit findings and correlates them against existing automated scanner outputs."
              }
            ].map((item) => (
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
