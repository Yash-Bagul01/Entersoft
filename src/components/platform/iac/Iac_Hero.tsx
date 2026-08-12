"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Iac_IridescenceBackground from "./Iac_IridescenceBackground";

export default function Iac_Hero() {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#060609] text-[#FFFFFF] pt-24 pb-16 px-6 sm:px-10 lg:px-16 isolate">
      {/* 1. Exact Aura WebGL Iridescence Shader Background */}
      <Iac_IridescenceBackground
        color={[0.42, 0.62, 1.4]}
        speed={0.85}
        amplitude={0.14}
        mouseReact={true}
        className="opacity-100"
      />

      {/* 2. Atmospheric Top Light Blade Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-b from-[#3B82F6]/20 via-[#8B5CF6]/15 to-transparent blur-[140px] pointer-events-none" />

      {/* 3. Aura Minimalist Sub-Header Nav Bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 max-w-[1360px] mx-auto w-full flex items-center justify-between py-4 border-b border-white/[0.1]"
      >
        {/* Brand/Platform Pillar Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-white/25 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.35)]">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#60A5FA] animate-pulse" />
          </div>
          <span className="font-display font-medium text-lg tracking-tight text-[#FFFFFF]">
            Entersoft <span className="text-white/50 font-mono text-sm ml-1">// IaC Engine</span>
          </span>
        </div>

        {/* Quick Anchor Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#E4E4E7] font-normal">
          <a href="#capabilities" className="hover:text-[#FFFFFF] transition-colors">
            Capabilities
          </a>
          <a href="#simulator" className="hover:text-[#FFFFFF] transition-colors">
            Policy Simulator
          </a>
          <a href="#workflow" className="hover:text-[#FFFFFF] transition-colors">
            Workflow
          </a>
          <a href="#metrics" className="hover:text-[#FFFFFF] transition-colors">
            Benchmarks
          </a>
          <a href="#faq" className="hover:text-[#FFFFFF] transition-colors">
            FAQ
          </a>
        </nav>

        {/* Header Right Action */}
        <Link
          href="/company/contact"
          className="px-5 py-2 rounded-full border border-white/25 bg-white/[0.06] hover:bg-white/[0.16] text-xs font-mono uppercase tracking-wider text-[#FFFFFF] backdrop-blur-md transition-all duration-300 shadow-sm"
        >
          Request Briefing
        </Link>
      </motion.div>

      {/* 4. Center Hero Typography & High-Impact Visual Content */}
      <div className="relative z-20 max-w-[1180px] mx-auto w-full my-auto text-center flex flex-col items-center justify-center pt-8 sm:pt-12">
        {/* Aura-Style Visionary Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.2] bg-white/[0.08] backdrop-blur-xl mb-6 shadow-[0_0_25px_rgba(96,165,250,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C4B5FD]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#E4E4E7]">
            // PRE-DEPLOYMENT INFRASTRUCTURE DEFENSE
          </span>
        </motion.div>

        {/* Hero Headline with Aura Iridescent Violet Primary Word */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-sans font-normal tracking-[-0.04em] leading-[1.04] text-[#FFFFFF] max-w-5xl"
        >
          <span className="bg-gradient-to-r from-[#DDD6FE] via-[#A78BFA] to-[#93C5FD] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(167,139,250,0.45)] font-light">
            Infrastructure
          </span>{" "}
          that defends the future
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-[#D4D4D8] font-normal leading-relaxed max-w-2xl mt-6 sm:mt-7 text-balance"
        >
          We craft deterministic Infrastructure as Code security that detects misconfigurations,
          enforces Open Policy Agent guardrails, and prevents cloud drift before deployment.
        </motion.p>

        {/* Aura Dual Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8 sm:mt-10"
        >
          {/* Primary Stark-White Button */}
          <a
            href="#simulator"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#FFFFFF] text-[#0A0A0F] font-sans font-semibold text-sm sm:text-base hover:bg-zinc-100 transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Live Policy Simulator</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
          </a>

          {/* Secondary Frosted Glass Button */}
          <a
            href="#capabilities"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-black/50 border border-white/25 text-[#FFFFFF] font-sans font-medium text-sm sm:text-base hover:bg-white/15 hover:border-white/40 transition-all duration-300 backdrop-blur-xl shadow-lg active:scale-[0.98]"
          >
            <Terminal className="w-4 h-4 text-[#93C5FD]" />
            <span>Explore IaC Rules</span>
          </a>
        </motion.div>

        {/* 5. Sub-Hero Framework Pill Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-12 sm:mt-16 pt-6 border-t border-white/[0.1] text-[#A1A1AA] text-xs sm:text-sm font-mono"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-[#E4E4E7]">Terraform & OpenTofu (HCL)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-[#E4E4E7]">Kubernetes & Helm (YAML)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-[#E4E4E7]">AWS CloudFormation & CDK</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-[#E4E4E7]">Open Policy Agent (Rego)</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <div className="relative z-20 text-center pb-2 pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
          [ SCROLL TO EXPLORE IAC ENGINE ]
        </span>
      </div>
    </section>
  );
}
