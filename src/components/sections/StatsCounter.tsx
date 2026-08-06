"use client";

import React from "react";
import { motion } from "framer-motion";
import { scrollRevealVariants, staggerContainerVariants } from "@/lib/animations";
import { stats } from "@/data/stats";
import AnimatedCounter from "../ui/AnimatedCounter";
import SectionLabel from "../ui/SectionLabel";
import { Shield, Search, Hourglass, Percent, CheckCircle2 } from "lucide-react";

// Individual Stat Card (Matching reference image design + Blue Hover Blur)
function StatCard({ stat, idx, getIcon }: { stat: any; idx: number; getIcon: (id: number) => React.ReactNode }) {
  return (
    <motion.div variants={scrollRevealVariants} className="h-full">
      <div className="group relative h-full min-h-[380px] sm:min-h-[400px] md:min-h-[420px] p-4 sm:p-6 md:p-7 lg:p-8 rounded-[22px] sm:rounded-[28px] bg-[#0F0F0F] border border-white/10 hover:border-blue-500/40 flex flex-col justify-between overflow-hidden transition-all duration-500 ease-out shadow-xs hover:shadow-2xl hover:-translate-y-3 cursor-pointer select-none">
        
        {/* VIBRANT BLUE COLOR GRADIENT SHADOW EFFECT FROM DOWN TO UP ON HOVER */}
        <div className="absolute inset-x-0 bottom-0 h-[82%] bg-gradient-to-t from-[#1D4ED8] via-[#1D4ED8] via-[#2563EB]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none rounded-b-[22px] sm:rounded-b-[28px] z-0" />
        <div className="absolute -bottom-8 inset-x-2 h-44 bg-gradient-to-t from-[#1E40AF] via-[#3B82F6] to-[#60A5FA] filter blur-[30px] opacity-0 group-hover:opacity-90 transition-opacity duration-500 ease-out pointer-events-none z-0" />

        {/* TOP SECTION: Metric Number & Subtitle */}
        <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
          <div className="flex items-center justify-between">
            <span className="stat-card-label font-mono text-[9px] sm:text-[10px] font-bold text-[#9C9C97] group-hover:text-blue-100 transition-colors duration-300 uppercase tracking-widest truncate max-w-[70%]">
              {stat.label}
            </span>
            <div className="stat-card-icon-box p-1.5 sm:p-2.5 rounded-full bg-white/5 border border-white/10 text-white group-hover:bg-white/20 group-hover:border-white/30 group-hover:text-white transition-all duration-300 shadow-2xs shrink-0">
              {getIcon(idx)}
            </div>
          </div>

          <div className="flex items-baseline gap-0.5 sm:gap-1 mt-1">
            <span className="stat-card-number text-[clamp(1.6rem,2.4vw,3.2rem)] font-display font-bold text-[#F6F5F0] group-hover:text-white transition-colors duration-300 leading-none tracking-tight">
              <AnimatedCounter value={stat.value} decimals={stat.decimals} />
            </span>
            <span className="stat-card-suffix text-base sm:text-xl md:text-2xl font-display font-bold text-[#00A3FF] group-hover:text-cyan-300 transition-colors duration-300 leading-none">
              {stat.suffix}
            </span>
          </div>

          {/* Main Card Title / Headline Paragraph */}
          <h3 className="stat-card-desc text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-[#F6F5F0] leading-snug font-sans mt-1 sm:mt-2 group-hover:text-white transition-colors duration-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            {stat.description}
          </h3>
        </div>

        {/* BOTTOM SECTION: Metadata Row */}
        <div className="stat-card-meta-border relative z-10 pt-4 sm:pt-6 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300 flex items-center gap-2 sm:gap-3">
          <div className="stat-card-check-box w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00A3FF] font-bold text-xs shrink-0 group-hover:bg-white/20 group-hover:border-white/30 group-hover:text-white transition-all shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A3FF] group-hover:text-white transition-colors duration-300" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="stat-card-meta-title text-[11px] sm:text-xs font-bold text-[#F6F5F0] group-hover:text-white transition-colors duration-300 leading-tight truncate">
              Verified Metric
            </span>
            <span className="stat-card-meta-sub text-[9px] sm:text-[11px] text-[#9C9C97] group-hover:text-blue-100 transition-colors duration-300 leading-tight mt-0.5 font-mono truncate">
              EnProbe Engine
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function StatsCounter() {
  const getIcon = (id: number) => {
    switch (id) {
      case 0: return <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case 1: return <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case 2: return <Hourglass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case 3: return <Percent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      default: return <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
    }
  };

  const displayStats = stats.filter(
    (stat) =>
      stat.label !== "TEAM STABILITY" &&
      stat.label !== "BREACHES RECORDED"
  );

  return (
    <section id="track-record" className="relative w-full bg-[#060606] text-[#F6F5F0] overflow-hidden border-t border-white/10 py-20 lg:py-28 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 relative z-10">
        
        {/* Section Title Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col items-start">
            <SectionLabel color="secondary">VALIDATED TRACK RECORD</SectionLabel>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-display font-medium text-[#F6F5F0] uppercase tracking-tight mt-2">
              Defense Measured in Certainty
            </h2>
          </div>
          <p className="text-[#9C9C97] font-normal text-sm md:text-base leading-relaxed max-w-md">
            From global enterprises to critical infrastructure, EnProbe delivers continuous threat prevention with zero compromise.
          </p>
        </div>

        {/* 4-Box Single Row Grid (strictly 4 columns in 1 single row) */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full"
        >
          {displayStats.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} idx={idx} getIcon={getIcon} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
