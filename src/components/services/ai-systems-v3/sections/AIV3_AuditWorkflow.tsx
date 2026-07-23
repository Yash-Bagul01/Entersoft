"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShieldAlert,
  CheckCircle2,
  Award,
  FileCheck2,
  Sparkles,
} from "lucide-react";
import { auditWorkflowV3 } from "@/data/aiSystemsV3";

const STAGE_ICONS = [Search, ShieldAlert, CheckCircle2, Award];

export default function AIV3_AuditWorkflow() {
  const [activeStep, setActiveStep] = useState(0);

  const currentWorkflow = auditWorkflowV3[activeStep];
  const CurrentStageIcon = STAGE_ICONS[activeStep] || Search;

  return (
    <section className="relative w-full bg-[#060606] px-6 md:px-12 py-28 border-b border-white/10 overflow-hidden select-none">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto flex flex-col gap-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="flex flex-col gap-3 max-w-[720px]">
            <div className="font-mono text-xs font-semibold text-[#00A3FF] tracking-[0.25em] uppercase">
              [ 05 — ASSURANCE METHODOLOGY ]
            </div>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-bold text-[#F6F5F0] leading-[1.12] tracking-tight">
              Four steps to{" "}
              <em className="italic text-[#00A3FF] font-serif font-normal">
                secure enterprise AI.
              </em>
            </h2>
            <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed mt-1">
              Structured assessment pipeline delivering threat discovery, adversarial stress testing, and official security attestation.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 border border-white/10 font-mono text-xs text-white/70">
            <Sparkles className="w-4 h-4 text-[#00A3FF]" />
            <span>AUDIT PIPELINE</span>
          </div>
        </div>

        {/* 4-Stage Connected Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 relative">
          {auditWorkflowV3.map((w, idx) => {
            const isActive = idx === activeStep;
            const Icon = STAGE_ICONS[idx] || Search;

            return (
              <motion.button
                key={w.step}
                onClick={() => setActiveStep(idx)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`relative z-10 flex flex-col gap-4 p-6 rounded-xl border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive
                    ? "bg-[#0E131F] border-[#00A3FF] shadow-[0_0_30px_rgba(0,163,255,0.2)]"
                    : "bg-[#0A0D14] border-white/10 hover:border-white/20 hover:bg-[#0E121B]"
                }`}
              >
                {/* Corner Crosshair */}
                <span className="absolute top-2 left-2 text-white/20 font-mono text-[9px]">+</span>
                <span className="absolute top-2 right-2 text-white/20 font-mono text-[9px]">+</span>

                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-colors ${
                      isActive
                        ? "bg-[#00A3FF] text-black border-[#00A3FF]"
                        : "bg-white/[0.04] border-white/10 text-white/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="font-mono text-xs font-bold text-[#00A3FF]">
                    STAGE {w.step}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-lg font-bold text-[#F6F5F0]">
                    {w.title}
                  </h3>
                  <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase">
                    {w.badge}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Detailed Stage Showcase Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWorkflow.step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-[#0A0D14] p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl flex flex-col lg:flex-row gap-8 items-start justify-between relative"
          >
            {/* Corner Crosshairs */}
            <span className="absolute top-3 left-3 text-white/20 font-mono text-[10px]">+</span>
            <span className="absolute top-3 right-3 text-white/20 font-mono text-[10px]">+</span>

            {/* Left Content */}
            <div className="flex flex-col gap-4 lg:w-3/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00A3FF]/15 border border-[#00A3FF]/40 flex items-center justify-center text-[#00A3FF] shrink-0">
                  <CurrentStageIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-[#00A3FF] font-semibold tracking-wider uppercase">
                    STAGE {currentWorkflow.step} SPECIFICATION
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#F6F5F0]">
                    {currentWorkflow.title}
                  </h3>
                </div>
              </div>

              <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed mt-1">
                {currentWorkflow.description}
              </p>

              <div className="flex flex-col gap-3 mt-2">
                <span className="font-mono text-xs font-bold text-white/50 uppercase tracking-wider">
                  CORE ASSURANCE ACTIVITIES
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentWorkflow.details?.map((detail, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-sans text-xs text-white/90 font-medium">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Deliverable Card */}
            <div className="lg:w-2/5 w-full bg-black/60 p-6 rounded-xl border border-white/10 flex flex-col gap-5 justify-between relative">
              <span className="absolute top-2 right-2 text-white/20 font-mono text-[9px]">+</span>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                    STAGE DELIVERABLE
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono text-[10px] border border-emerald-500/30">
                    VERIFIED
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FileCheck2 className="w-8 h-8 text-[#00A3FF] shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-sans text-sm font-bold text-[#F6F5F0]">
                      {currentWorkflow.deliverable}
                    </span>
                    <span className="font-sans text-xs text-white/60">
                      Formal audit report & attestation
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#00A3FF]/10 border border-[#00A3FF]/20 flex items-center gap-3 text-xs text-white/80">
                <div className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse shrink-0" />
                <span>Provides clear risk prioritization and actionable guidance.</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
