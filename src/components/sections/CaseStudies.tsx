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
  switch (type) {
    case "network":
      return (
        <svg className="w-full h-full text-[var(--accent)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <style>{`
            @keyframes rotateOrbit {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes pulseNode {
              0%, 100% { r: 4; opacity: 0.6; }
              50% { r: 6.5; opacity: 1; }
            }
            @keyframes signalTravel {
              0% { stroke-dashoffset: 40; }
              100% { stroke-dashoffset: 0; }
            }
            .orbit { transform-origin: 50px 50px; animation: rotateOrbit 16s linear infinite; }
            .node-pulse { animation: pulseNode 3s ease-in-out infinite; }
            .signal-line { stroke-dasharray: 6 3; animation: signalTravel 3s linear infinite; }
          `}</style>
          <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="0.5" className="orbit" strokeDasharray="3 3" />
          <line x1="18" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="1" className="signal-line" />
          <line x1="82" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="1" className="signal-line" />
          <line x1="50" y1="18" x2="50" y2="50" stroke="currentColor" strokeWidth="1" className="signal-line" />
          <line x1="50" y1="82" x2="50" y2="50" stroke="currentColor" strokeWidth="1" className="signal-line" />
          <circle cx="50" cy="50" r="7" stroke="currentColor" strokeWidth="1.5" className="node-pulse" fill="none" />
          <circle cx="18" cy="50" r="4.5" fill="currentColor" />
          <circle cx="82" cy="50" r="4.5" fill="currentColor" />
          <circle cx="50" cy="18" r="4.5" fill="currentColor" />
          <circle cx="50" cy="82" r="4.5" fill="currentColor" />
        </svg>
      );
    case "data":
      return (
        <svg className="w-full h-full text-[var(--accent)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <style>{`
            @keyframes growBar {
              0%, 100% { height: 30px; y: 50px; }
              50% { height: 48px; y: 32px; }
            }
            @keyframes growBarTwo {
              0%, 100% { height: 55px; y: 25px; }
              50% { height: 32px; y: 48px; }
            }
            @keyframes scanLine {
              0% { transform: translateY(0px); }
              50% { transform: translateY(48px); }
              100% { transform: translateY(0px); }
            }
            .bar-1 { animation: growBar 3.2s ease-in-out infinite; }
            .bar-2 { animation: growBarTwo 2.8s ease-in-out infinite; }
            .scan { animation: scanLine 4s ease-in-out infinite; }
          `}</style>
          <line x1="15" y1="80" x2="85" y2="80" stroke="currentColor" strokeWidth="1.2" />
          <line x1="15" y1="80" x2="15" y2="20" stroke="currentColor" strokeWidth="1.2" />
          
          <rect x="25" y="50" width="8" height="30" fill="currentColor" className="bar-1" opacity="0.5" />
          <rect x="40" y="25" width="8" height="55" fill="currentColor" className="bar-2" opacity="0.7" />
          <rect x="55" y="18" width="8" height="62" fill="currentColor" className="bar-1" />
          <rect x="70" y="48" width="8" height="32" fill="currentColor" className="bar-2" opacity="0.6" />
          
          <line x1="15" y1="28" x2="85" y2="28" stroke="currentColor" strokeWidth="1" className="scan" strokeDasharray="3 3" />
        </svg>
      );
    case "code":
      return (
        <svg className="w-full h-full text-[var(--accent)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <style>{`
            @keyframes drawPipeline {
              0% { stroke-dashoffset: 80; }
              100% { stroke-dashoffset: 0; }
            }
            @keyframes pulseCommits {
              0%, 100% { transform: scale(1); opacity: 0.7; }
              50% { transform: scale(1.2); opacity: 1; }
            }
            .pipe-line { stroke-dasharray: 8 4; animation: drawPipeline 6s linear infinite; }
            .commit-node { transform-origin: center; animation: pulseCommits 2.5s ease-in-out infinite; }
          `}</style>
          <path d="M15 28 H50 V72 H85" fill="none" stroke="currentColor" strokeWidth="1.2" className="pipe-line" />
          <path d="M15 50 H85" fill="none" stroke="currentColor" strokeWidth="0.8" className="pipe-line" opacity="0.4" />
          <path d="M15 72 H50 V28 H85" fill="none" stroke="currentColor" strokeWidth="0.8" className="pipe-line" opacity="0.2" />
          
          <circle cx="30" cy="50" r="4.5" fill="currentColor" className="commit-node" />
          <circle cx="50" cy="50" r="4.5" fill="currentColor" className="commit-node" style={{ animationDelay: "0.8s" }} />
          <circle cx="70" cy="50" r="4.5" fill="currentColor" className="commit-node" style={{ animationDelay: "1.6s" }} />
        </svg>
      );
    case "lines":
      return (
        <svg className="w-full h-full text-[var(--accent)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <style>{`
            @keyframes undulate {
              0%, 100% { d: path("M10 50 Q 30 25, 50 50 T 90 50"); }
              50% { d: path("M10 50 Q 30 75, 50 50 T 90 50"); }
            }
            @keyframes travelDot {
              0% { offset-distance: 0%; }
              100% { offset-distance: 100%; }
            }
            .wave { animation: undulate 5s ease-in-out infinite; }
            .dot-1 {
              animation: travelDot 4s linear infinite;
              offset-path: path("M10 50 Q 30 25, 50 50 T 90 50");
            }
          `}</style>
          <path d="M10 50 Q 30 25, 50 50 T 90 50" fill="none" stroke="currentColor" strokeWidth="1.2" className="wave" />
          <path d="M10 50 Q 30 75, 50 50 T 90 50" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
          <circle r="3.5" fill="currentColor" className="dot-1" />
        </svg>
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
    const rotateX = ((centerY - y) / centerY) * 8; // Max 8 degrees tilt
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
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
      className="p-8 md:p-12 border-r border-b border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-md transition-all duration-500 flex flex-col md:flex-row justify-between gap-8 group relative overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Liquid Gradient Spotlight Mesh Backdrop */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 z-0 pointer-events-auto bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(0,163,255,0.06),transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity" />

      {/* Left Column Details */}
      <div className="w-full md:w-3/5 flex flex-col justify-between gap-6 relative z-10" style={{ transformStyle: "preserve-3d" }}>
        <div className="flex flex-col gap-3" style={{ transform: "translateZ(20px)" }}>
          <span className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-wider">
            {cs.sector}
          </span>
          <h3 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] uppercase tracking-tight leading-none">
            {cs.title}
          </h3>
          <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed font-sans mt-1">
            {cs.description}
          </p>
        </div>
        
        {/* Specific Outcome Metric Highlight */}
        <div className="border-t border-[var(--border-subtle)] pt-4 mt-2" style={{ transform: "translateZ(30px)" }}>
          <span className="font-mono text-[9px] font-bold text-[var(--text-tertiary)] tracking-widest uppercase block mb-1">
            Verified Outcome //
          </span>
          <p className="text-[11px] text-[var(--text-primary)] font-medium leading-relaxed font-sans">
            {cs.outcome}
          </p>
        </div>

        <button
          onClick={() => onSelect(cs.id)}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[var(--text-primary)] hover:text-[var(--accent)] uppercase tracking-wider mt-4 transition-colors cursor-pointer text-left w-fit"
          data-cursor="link"
          style={{ transform: "translateZ(10px)" }}
        >
          Read Case Study <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right Column Abstract Graphic */}
      <motion.div
        variants={{
          hidden: { clipPath: "inset(0 0 100% 0)" },
          visible: {
            clipPath: "inset(0 0 0% 0)",
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
          }
        }}
        className="w-full md:w-2/5 h-48 md:h-full border border-[var(--border-subtle)] bg-white/[0.01] rounded-[2px] p-6 flex items-center justify-center relative overflow-hidden shrink-0 group-hover:border-[var(--accent)] transition-colors duration-500"
        style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.01)_0%,transparent_70%)]" />
        <CaseStudyGraphic type={cs.graphicType} isHovered={isHovered} />
      </motion.div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const activeCase = caseStudies.find((cs) => cs.id === activeCaseId);
  const activeDetails = activeCase ? caseDetails[activeCase.id] : null;

  return (
    <section id="case-studies" className="relative w-full bg-[#060606] overflow-hidden">
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
