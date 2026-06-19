"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { scrollRevealVariants, staggerContainerVariants } from "@/lib/animations";
import { stats } from "@/data/stats";
import AnimatedCounter from "../ui/AnimatedCounter";
import SectionLabel from "../ui/SectionLabel";
import { Shield, Clock, Search, Hourglass, Percent, AlertOctagon } from "lucide-react";
import { gsap } from "gsap";

function StatCard({ stat, idx, getIcon }: { stat: any; idx: number; getIcon: (id: number) => React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * 10;
    const tiltY = ((centerX - x) / centerX) * 10;

    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      scale: 1.02,
      transformPerspective: 800,
      transformStyle: "preserve-3d",
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        left: x,
        top: y,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (glareRef.current) {
      const glareX = ((x - centerX) / centerX) * 15;
      const glareY = ((y - centerY) / centerY) * 15;
      gsap.to(glareRef.current, {
        x: -glareX,
        y: -glareY,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseEnter = () => {
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.6,
        duration: 0.2,
      });
    }
    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0.15,
        duration: 0.2,
      });
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        transformPerspective: 800,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }
    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  return (
    <motion.div
      variants={scrollRevealVariants}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="h-full p-8 md:p-10 bg-[#0F0F0F]/30 backdrop-blur-md border border-[var(--border-subtle)] rounded-[4px] flex flex-col justify-between gap-6 hover:border-[var(--text-primary)] transition-colors duration-300 min-h-[220px] relative overflow-hidden group select-none cursor-default"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Dynamic Cursor Spotlight Glow */}
        <div
          ref={glowRef}
          className="absolute pointer-events-none w-[300px] h-[300px] rounded-full bg-[var(--accent-dim)] opacity-0 filter blur-[80px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
          style={{ left: 0, top: 0 }}
        />

        {/* Diagonal glare element */}
        <div
          ref={glareRef}
          className="absolute pointer-events-none inset-[-50px] opacity-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12), transparent 50%)",
            mixBlendMode: "overlay",
          }}
        />

        {/* Card Header (Icon + Eyebrow Label) */}
        <div className="flex items-center justify-between relative z-10" style={{ transform: "translateZ(30px)" }}>
          <span className="font-mono text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest">
            {stat.label}
          </span>
          <div className="p-2 bg-white/[0.01] border border-white/[0.04] rounded-[2px] group-hover:border-[var(--text-primary)] group-hover:bg-[var(--accent-dim)] transition-all duration-300 group-hover:scale-110">
            {getIcon(idx)}
          </div>
        </div>

        {/* Number and Suffix */}
        <div className="flex items-baseline gap-0.5 relative z-10" style={{ transform: "translateZ(40px)" }}>
          <span className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold text-[#F6F5F0] leading-none tracking-tighter">
            <AnimatedCounter value={stat.value} decimals={stat.decimals} />
          </span>
          <span className="text-[clamp(1.2rem,2.5vw,2rem)] font-display font-semibold text-[var(--accent)] leading-none">
            {stat.suffix}
          </span>
        </div>

        {/* Description */}
        <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed max-w-[320px] font-sans relative z-10 group-hover:text-[var(--text-primary)] transition-colors duration-300" style={{ transform: "translateZ(20px)" }}>
          {stat.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function StatsCounter() {
  // Map icons to statistical metrics
  const getIcon = (id: number) => {
    switch (id) {
      case 0: return <Shield className="w-4 h-4 text-[var(--accent)]" />;
      case 1: return <Clock className="w-4 h-4 text-[var(--accent)]" />;
      case 2: return <Search className="w-4 h-4 text-[var(--accent)]" />;
      case 3: return <Hourglass className="w-4 h-4 text-[var(--accent)]" />;
      case 4: return <Percent className="w-4 h-4 text-[var(--accent)]" />;
      case 5: return <AlertOctagon className="w-4 h-4 text-[var(--accent)]" />;
      default: return <Shield className="w-4 h-4 text-[var(--accent)]" />;
    }
  };

  return (
    <section className="relative w-full bg-[#060606] overflow-hidden border-t border-[var(--border-subtle)]">
      {/* Sleek cyber grid lines backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
      
      {/* Ambient gradient soft blur glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[var(--accent)]/3 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-purple-500/3 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10">
        
        {/* Section Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } }
          }}
          className="mb-16 flex flex-col items-start"
        >
          <div className="overflow-hidden">
            <motion.div
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <SectionLabel color="secondary">VALIDATED TRACK RECORD</SectionLabel>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-[clamp(1.4rem,3vw,2.4rem)] font-display font-medium text-[#F6F5F0] uppercase tracking-tight"
            >
              Defense Measured in Certainty
            </motion.h2>
          </div>
        </motion.div>

        {/* 6-Card Glassmorphic Border-Aligned Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stats.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} idx={idx} getIcon={getIcon} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
