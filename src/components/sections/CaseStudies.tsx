"use client";

import React, { useState, useRef } from "react";
import { caseStudies, CaseStudyItem } from "@/data/caseStudies";
import SectionLabel from "../ui/SectionLabel";
import { ArrowRight, X, ShieldAlert, FileCode2, Cpu, RefreshCw, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollRevealVariants, staggerContainerVariants } from "@/lib/animations";

// Case details details local mapping
const caseDetails: Record<string, { vulnerability: string; strategy: string; impact: string }> = {
  cision: {
    vulnerability: "Insecure direct object references (IDOR) and legacy database leaks exposed pre-acquisition due diligence data.",
    strategy: "Conducted deep-dive manual threat audits and integrated real-time API traffic sanitization rules.",
    impact: "Eradicated all major threat vectors, securing pre-merger integrations across 14 multi-cloud endpoints."
  },
  "nbfc-rbi": {
    vulnerability: "Non-compliant network segmentation and lack of continuous compliance monitoring violated RBI cyber directives.",
    strategy: "Implemented micro-segmentation architectures and set up continuous security posture controls.",
    impact: "Secured licensing clearance with zero violations across 230 backend host systems."
  },
  "logistics-appsec": {
    vulnerability: "Secrets hardcoded in build scripts and vulnerable third-party open-source dependencies in the release pipeline.",
    strategy: "Built static analysis gates and secret scanners directly into the automated Jenkins/GitLab CI/CD process.",
    impact: "Prevented pre-compile security leaks and accelerated deployment cycles from 4 hours to 8 minutes."
  },
  "fintech-bank": {
    vulnerability: "Lack of mutual TLS (mTLS) authentication and broken rate-limiting controls on partner-facing APIs.",
    strategy: "Hardened banking gateway protocols, implemented mTLS, and deployed robust API traffic rate-limiters.",
    impact: "Validated bank-grade penetration compliance and secured integration with Australia's leading banking platforms within 30 days."
  }
};

function CaseStudyGraphic({ type, isHovered }: { type: string; isHovered: boolean }) {
  // Common theme-aware container stretching full height and width
  const containerClass = "w-full h-full min-h-[260px] md:min-h-[300px] relative flex items-center justify-center p-4 select-none overflow-hidden rounded-[8px] bg-transparent";

  switch (type) {
    case "network":
      // 1. Large 3D Multi-Orbit Field & Refraction Core (High-Contrast Theme Visibility)
      return (
        <div className={containerClass}>
          {/* Ambient Glow Aura */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,163,255,0.18),transparent_70%)] pointer-events-none" />
          
          <div className="relative w-44 h-44 md:w-52 md:h-52 flex items-center justify-center">
            {/* Outer 3D Orbit Ring 1 */}
            <motion.div
              animate={{ rotateX: [65, 65, 65], rotateY: [0, 180, 360], rotateZ: [0, 90, 180] }}
              transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
              className={`absolute inset-0 rounded-full border-[2px] border-sky-500/70 shadow-[0_0_25px_rgba(0,163,255,0.3)] ${
                isHovered ? "scale-110 border-sky-400" : ""
              } transition-all duration-500`}
            />

            {/* Middle 3D Gyro Ring 2 */}
            <motion.div
              animate={{ rotateX: [45, 45, 45], rotateY: [360, 180, 0], rotateZ: [180, 90, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute inset-4 rounded-full border-[2px] border-indigo-600/70 border-dashed"
            />

            {/* Inner Ring 3 */}
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              className="absolute inset-9 rounded-full border-[1.5px] border-cyan-600/60"
            />

            {/* Central Refraction Core */}
            <motion.div
              animate={{ scale: [0.95, 1.08, 0.95] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0284c7] via-indigo-600 to-sky-400 p-[2px] shadow-[0_6px_25px_rgba(0,163,255,0.5)] backdrop-blur-xl"
            >
              <div className="w-full h-full rounded-full bg-[var(--bg-elevated)] border border-[var(--accent)]/40 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)] animate-ping" />
              </div>
            </motion.div>

            {/* Floating Orbital Photons */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_12px_#06b6d4] absolute top-1 left-1/2 -translate-x-1/2 border border-white/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-[0_0_10px_#4f46e5] absolute bottom-2 left-1/2 -translate-x-1/2 border border-white/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-[0_0_10px_#0284c7] absolute top-1/2 left-1 -translate-y-1/2 border border-white/80" />
            </motion.div>
          </div>
        </div>
      );

    case "data":
      // 2. Large 3D Hex Shield Matrix & Glass Emblem (High-Contrast Theme Visibility)
      return (
        <div className={containerClass}>
          {/* Ambient Spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.18),transparent_70%)] pointer-events-none" />

          {/* Full-Height Hexagonal Mesh Matrix */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 160 160" fill="none">
              <defs>
                <linearGradient id="hexGradLarge" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="1" />
                  <stop offset="50%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              {/* Outer Large Hexagon */}
              <motion.polygon
                points="80,10 145,47.5 145,112.5 80,150 15,112.5 15,47.5"
                stroke="url(#hexGradLarge)"
                strokeWidth="2.5"
                fill="none"
                animate={{ strokeDashoffset: [0, 300] }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                strokeDasharray="14 6"
              />
              {/* Inner Hexagon */}
              <polygon
                points="80,30 125,56 125,104 80,130 35,104 35,56"
                stroke="rgba(16, 185, 129, 0.6)"
                strokeWidth="1.5"
                fill="rgba(16, 185, 129, 0.06)"
              />
              {/* Core Hexagon */}
              <polygon
                points="80,48 107,63.5 107,96.5 80,112 53,96.5 53,63.5"
                stroke="rgba(2, 132, 199, 0.7)"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>

            {/* Central 3D Glass Emblem */}
            <motion.div
              animate={{ y: [-4, 4, -4], rotate: [0, 3, 0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className={`absolute w-18 h-18 md:w-20 md:h-20 rounded-2xl bg-[var(--bg-elevated)] border-2 border-emerald-500/70 backdrop-blur-xl flex items-center justify-center shadow-[0_12px_35px_rgba(16,185,129,0.3)] ${
                isHovered ? "border-emerald-400 scale-110 shadow-[0_0_40px_rgba(16,185,129,0.55)]" : ""
              } transition-all duration-500`}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-[2px]">
                <div className="w-full h-full rounded-[10px] bg-[var(--bg-elevated)] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-sm bg-emerald-500 shadow-[0_0_14px_#10b981] rotate-45" />
                </div>
              </div>
            </motion.div>

            {/* Radiating Ripple Rings */}
            {isHovered && (
              <motion.div
                initial={{ scale: 0.4, opacity: 1 }}
                animate={{ scale: 1.7, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }}
                className="absolute w-28 h-28 rounded-full border-2 border-emerald-500/80 pointer-events-none"
              />
            )}
          </div>
        </div>
      );

    case "code":
      // 3. Large Multi-Strand Curved Bezier Flow Lines (High-Contrast Theme Visibility)
      return (
        <div className={containerClass}>
          {/* Ambient Purple Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.18),transparent_70%)] pointer-events-none" />

          {/* Full-Height Bezier Flow SVG */}
          <svg className="w-full h-full min-h-[240px]" viewBox="0 0 200 160" fill="none">
            <defs>
              <linearGradient id="beamGradLrg1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#9333ea" stopOpacity="1" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="beamGradLrg2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Static Guide Curves */}
            <path d="M 10,25 C 70,25 130,135 190,135" stroke="rgba(124, 58, 237, 0.4)" strokeWidth="2" />
            <path d="M 10,60 C 70,60 130,100 190,100" stroke="rgba(2, 132, 199, 0.45)" strokeWidth="2" />
            <path d="M 10,100 C 70,100 130,60 190,60" stroke="rgba(2, 132, 199, 0.45)" strokeWidth="2" />
            <path d="M 10,135 C 70,135 130,25 190,25" stroke="rgba(124, 58, 237, 0.4)" strokeWidth="2" />

            {/* Animated Flowing Laser Beams */}
            <motion.path
              d="M 10,25 C 70,25 130,135 190,135"
              stroke="url(#beamGradLrg1)"
              strokeWidth="3.5"
              strokeDasharray="50 140"
              animate={{ strokeDashoffset: [-190, 0] }}
              transition={{ repeat: Infinity, duration: isHovered ? 1.5 : 3, ease: "linear" }}
            />
            <motion.path
              d="M 10,60 C 70,60 130,100 190,100"
              stroke="url(#beamGradLrg2)"
              strokeWidth="3.5"
              strokeDasharray="60 130"
              animate={{ strokeDashoffset: [0, -190] }}
              transition={{ repeat: Infinity, duration: isHovered ? 1.2 : 2.4, ease: "linear" }}
            />
            <motion.path
              d="M 10,100 C 70,100 130,60 190,60"
              stroke="url(#beamGradLrg2)"
              strokeWidth="3.5"
              strokeDasharray="60 130"
              animate={{ strokeDashoffset: [-190, 0] }}
              transition={{ repeat: Infinity, duration: isHovered ? 1.4 : 2.8, ease: "linear" }}
            />
            <motion.path
              d="M 10,135 C 70,135 130,25 190,25"
              stroke="url(#beamGradLrg1)"
              strokeWidth="3.5"
              strokeDasharray="50 140"
              animate={{ strokeDashoffset: [0, -190] }}
              transition={{ repeat: Infinity, duration: isHovered ? 1.8 : 3.5, ease: "linear" }}
            />
          </svg>

          {/* Focal Intersection Glass Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--bg-elevated)] border-2 border-purple-600/70 backdrop-blur-xl flex items-center justify-center shadow-[0_6px_25px_rgba(168,85,247,0.5)]">
            <div className="w-3.5 h-3.5 rounded-full bg-purple-500 shadow-[0_0_14px_#a855f7] animate-pulse" />
          </div>
        </div>
      );

    case "lines":
      // 4. Large Dual Undulating Sine Waves & Resonance Lattice (High-Contrast Theme Visibility)
      return (
        <div className={containerClass}>
          {/* Ambient Cyan Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.18),transparent_70%)] pointer-events-none" />

          {/* Full-Height Undulating Waves SVG */}
          <div className="relative w-full h-full flex items-center justify-center">
            <svg className="w-full h-full min-h-[240px]" viewBox="0 0 200 140" fill="none">
              <defs>
                <linearGradient id="waveGradLrg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0891b2" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#0284c7" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Wave 1 */}
              <motion.path
                d="M 10,70 Q 50,20 100,70 T 190,70"
                stroke="url(#waveGradLrg)"
                strokeWidth="3.5"
                fill="none"
                animate={{
                  d: [
                    "M 10,70 Q 50,20 100,70 T 190,70",
                    "M 10,70 Q 50,120 100,70 T 190,70",
                    "M 10,70 Q 50,20 100,70 T 190,70"
                  ]
                }}
                transition={{ repeat: Infinity, duration: isHovered ? 2 : 4, ease: "easeInOut" }}
              />

              {/* Wave 2 (Counter) */}
              <motion.path
                d="M 10,70 Q 50,120 100,70 T 190,70"
                stroke="rgba(2, 132, 199, 0.7)"
                strokeWidth="2.5"
                fill="none"
                animate={{
                  d: [
                    "M 10,70 Q 50,120 100,70 T 190,70",
                    "M 10,70 Q 50,20 100,70 T 190,70",
                    "M 10,70 Q 50,120 100,70 T 190,70"
                  ]
                }}
                transition={{ repeat: Infinity, duration: isHovered ? 2 : 4, ease: "easeInOut" }}
              />
            </svg>

            {/* Central Floating Glass Orb */}
            <motion.div
              animate={{ scale: [0.96, 1.05, 0.96] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute w-14 h-14 rounded-full bg-[var(--bg-elevated)] border-2 border-cyan-500/70 backdrop-blur-xl flex items-center justify-center shadow-[0_6px_30px_rgba(6,182,212,0.45)]"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-600 to-sky-400 p-[2px]">
                <div className="w-full h-full rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

interface CaseStudyCardProps {
  cs: CaseStudyItem;
  onSelect: (id: string) => void;
}

function CaseStudyCard({ cs, onSelect }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 6; // Soft tilt
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={scrollRevealVariants}
      className="case-study-card p-8 md:p-10 border-r border-b border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-md transition-all duration-500 flex flex-col md:flex-row justify-between items-center gap-8 group relative overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Dynamic Spotlight Mesh Backdrop */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 z-0 pointer-events-auto bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(0,163,255,0.08),transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,163,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,163,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity" />

      {/* Left Details Column */}
      <div className="w-full md:w-7/12 flex flex-col justify-between gap-6 relative z-10" style={{ transformStyle: "preserve-3d" }}>
        <div className="flex flex-col gap-3" style={{ transform: "translateZ(15px)" }}>
          <span className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-wider">
            {cs.sector}
          </span>
          <h3 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase tracking-tight leading-snug">
            {cs.title}
          </h3>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed font-sans mt-1">
            {cs.description}
          </p>
        </div>
        
        {/* Specific Outcome Metric Highlight */}
        <div className="border-t border-[var(--border-subtle)] pt-4 mt-1" style={{ transform: "translateZ(20px)" }}>
          <span className="font-mono text-[9px] font-bold text-[var(--text-tertiary)] tracking-widest uppercase block mb-1">
            Verified Outcome //
          </span>
          <p className="text-[12px] text-[var(--text-primary)] font-semibold leading-relaxed font-sans">
            {cs.outcome}
          </p>
        </div>

        <button
          onClick={() => onSelect(cs.id)}
          className="inline-flex items-center gap-2 text-[11px] font-mono font-bold text-[var(--text-primary)] hover:text-[var(--accent)] uppercase tracking-wider mt-2 transition-colors cursor-pointer text-left w-fit"
          data-cursor="link"
          style={{ transform: "translateZ(25px)" }}
        >
          Read Case Study <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Integrated Borderless Visual Accent (Spans full height vertically, no inner border box!) */}
      <div 
        className="w-full md:w-5/12 h-64 md:h-full min-h-[260px] md:min-h-[300px] flex items-center justify-center relative shrink-0 z-10 pointer-events-none"
        style={{ transform: "translateZ(30px)" }}
      >
        <CaseStudyGraphic type={cs.graphicType} isHovered={isHovered} />
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const activeCase = caseStudies.find((cs) => cs.id === activeCaseId);
  const activeDetails = activeCase ? caseDetails[activeCase.id] : null;

  return (
    <section id="case-studies" className="relative w-full bg-[var(--bg-primary)] transition-colors duration-500 overflow-hidden">
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
                <SectionLabel color="secondary">PROVEN EFFECTIVENESS</SectionLabel>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="text-3xl md:text-4xl font-display font-medium text-[var(--text-primary)] uppercase tracking-tight"
              >
                Mitigation Case Files
              </motion.h2>
            </div>
          </motion.div>
          <div className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-widest">
            // METRIC-DRIVEN VULNERABILITY AUDITS
          </div>
        </div>

        {/* 2x2 Grid of Case Study Tiles */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[var(--border-subtle)]"
        >
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.id} cs={cs} onSelect={setActiveCaseId} />
          ))}
        </motion.div>
      </div>

      {/* Dynamic Slide-Out Glass Case File Drawer */}
      <AnimatePresence>
        {activeCase && activeDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
            onClick={() => setActiveCaseId(null)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 180 }}
              className="w-full max-w-[620px] h-full bg-[var(--bg-elevated)] border-l border-[var(--border-subtle)] p-8 md:p-12 overflow-y-auto flex flex-col justify-between shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCaseId(null)}
                className="absolute top-8 right-8 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:rotate-90 transition-all duration-300 p-1 bg-white/[0.02] border border-[var(--border-subtle)] rounded-[4px] cursor-pointer"
                aria-label="Close case study"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col gap-10 mt-8">
                {/* Header info */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-widest uppercase">
                    {activeCase.sector} // MITIGATION CASE FILE
                  </span>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--text-primary)] uppercase tracking-tight leading-none mt-1">
                    {activeCase.title}
                  </h3>
                  <div className="w-12 h-1 bg-[var(--accent)] mt-4 rounded-full" />
                </div>

                {/* Case File Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y border-[var(--border-subtle)] py-8 my-2">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[9px] text-[var(--text-tertiary)] uppercase tracking-wider">
                      Vulnerability Level
                    </span>
                    <span className="text-[12px] font-bold text-red-500 uppercase flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4" /> CRITICAL
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[9px] text-[var(--text-tertiary)] uppercase tracking-wider">
                      Audit Scope
                    </span>
                    <span className="text-[12px] font-bold text-[var(--text-primary)] uppercase flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-[var(--accent)]" /> AppSec / API
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[9px] text-[var(--text-tertiary)] uppercase tracking-wider">
                      Status
                    </span>
                    <span className="text-[12px] font-bold text-green-500 uppercase flex items-center gap-1.5">
                      <Layers className="w-4 h-4" /> Hardened
                    </span>
                  </div>
                </div>

                {/* Detailed Sections */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2.5">
                    <h4 className="font-mono text-[10px] font-bold text-[var(--text-tertiary)] tracking-widest uppercase">
                      01 / The Vulnerability
                    </h4>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed font-sans">
                      {activeDetails.vulnerability}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <h4 className="font-mono text-[10px] font-bold text-[var(--text-tertiary)] tracking-widest uppercase">
                      02 / Mitigation Strategy
                    </h4>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed font-sans">
                      {activeDetails.strategy}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <h4 className="font-mono text-[10px] font-bold text-[var(--text-tertiary)] tracking-widest uppercase">
                      03 / Security Result
                    </h4>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed font-sans">
                      {activeDetails.impact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="border-t border-[var(--border-subtle)] pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-[var(--text-tertiary)] uppercase tracking-widest">
                    Verified Outcome
                  </span>
                  <span className="text-[12.5px] font-bold text-[var(--text-primary)] mt-0.5">
                    {activeCase.outcome}
                  </span>
                </div>
                <button
                  onClick={() => setActiveCaseId(null)}
                  className="px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] font-mono text-[11px] font-bold uppercase tracking-wider rounded-[3px] hover:bg-[var(--accent)] hover:text-white transition-colors duration-300 cursor-pointer shrink-0"
                >
                  Close File
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
