"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Shield, Lock, Layers } from "lucide-react";
import { Button } from "../ui/Button";
import MagneticButton from "../ui/MagneticButton";
import SectionLabel from "../ui/SectionLabel";
import ServiceBreadcrumb from "./ServiceBreadcrumb";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";

// Sui-style technical grid background with gliding laser streaks
function TechGridBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* Radial overlay glow in the center */}
      <div className="absolute inset-0 bg-radial-gradient bg-[radial-gradient(circle_at_center,rgba(189,0,255,0.06)_0%,transparent_70%)]" />

      {/* Grid lines */}
      <div className="absolute inset-0 flex justify-between px-6 lg:px-12">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-zinc-900/40 relative">
            {/* Gliding laser streak vertically */}
            <div 
              className="absolute w-[2px] h-[120px] bg-gradient-to-b from-transparent via-[#BD00FF]/50 to-transparent top-0 animate-laser-v"
              style={{
                animationDelay: `${i * 1.8}s`,
                animationDuration: "5s",
                animationIterationCount: "infinite",
                animationTimingFunction: "linear"
              }}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col justify-between py-12">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[1px] w-full bg-zinc-900/40 relative">
            {/* Gliding laser streak horizontally */}
            <div 
              className="absolute h-[2px] w-[120px] bg-gradient-to-r from-transparent via-[#BD00FF]/50 to-transparent left-0 animate-laser-h"
              style={{
                animationDelay: `${i * 1.2}s`,
                animationDuration: "6s",
                animationIterationCount: "infinite",
                animationTimingFunction: "linear"
              }}
            />
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes laser-vertical {
          0% { top: -120px; }
          100% { top: 100%; }
        }
        @keyframes laser-horizontal {
          0% { left: -120px; }
          100% { left: 100%; }
        }
        .animate-laser-v {
          animation-name: laser-vertical;
        }
        .animate-laser-h {
          animation-name: laser-horizontal;
        }
      `}} />
    </div>
  );
}

// 3D Isometric stack of three glass layers (Black Box, Grey Box, White Box)
function VAPTStack3D() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const layers = [
    {
      title: "WHITE BOX AUDIT",
      subtitle: "Tier 03 // Deep Repository Audit",
      desc: "Full source code audit, logic validation, and architecture reviews.",
      icon: <Layers className="w-4 h-4 text-[#BD00FF]" />,
      translateZ: "translate-z-[40px] hover:translate-z-[60px]",
      shadow: "shadow-[0_20px_40px_rgba(189,0,255,0.06)]",
      nodes: (
        <svg className="w-full h-full text-[#BD00FF]/40 absolute inset-0 p-4" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="20" cy="50" r="3" fill="currentColor" />
          <circle cx="80" cy="50" r="3" fill="currentColor" />
          <circle cx="50" cy="20" r="3" fill="currentColor" />
          <circle cx="50" cy="80" r="3" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "GREY BOX AUDIT",
      subtitle: "Tier 02 // Credentialed API Gateways",
      desc: "Tests application logic, session token hijacks, and privileges.",
      icon: <Lock className="w-4 h-4 text-[#BD00FF]" />,
      translateZ: "translate-z-[0px] hover:translate-z-[15px]",
      shadow: "shadow-[0_15px_30px_rgba(189,0,255,0.04)]",
      nodes: (
        <svg className="w-full h-full text-[#BD00FF]/30 absolute inset-0 p-4" viewBox="0 0 100 100" fill="none">
          <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          <circle cx="50" cy="50" r="4" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "BLACK BOX AUDIT",
      subtitle: "Tier 01 // External Perimeter",
      desc: "Zero knowledge assessment mapping public gateways.",
      icon: <Shield className="w-4 h-4 text-[#BD00FF]" />,
      translateZ: "translate-z-[-40px] hover:translate-z-[-25px]",
      shadow: "shadow-[0_10px_20px_rgba(189,0,255,0.02)]",
      nodes: (
        <svg className="w-full h-full text-[#BD00FF]/20 absolute inset-0 p-4" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center select-none z-10 perspective-[1000px]">
      
      {/* Floating 3D stack wrapper */}
      <div 
        className="relative w-[340px] h-[340px] transition-all duration-700 ease-out transform-style-3d rotate-x-[58deg] rotate-y-[0deg] rotate-z-[-45deg]"
        style={{
          transform: "rotateX(58deg) rotateY(0deg) rotateZ(-45deg)"
        }}
      >
        {/* Connector vertical lines in the corners to join layers */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-zinc-800/60 z-0 transform-style-3d translate-z-[-60px] h-[200px]" style={{ transform: "translateX(0px) translateY(0px) translateZ(-60px)" }} />
        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-zinc-800/60 z-0 transform-style-3d translate-z-[-60px] h-[200px]" style={{ transform: "translateX(340px) translateY(0px) translateZ(-60px)" }} />

        {layers.map((layer, idx) => {
          const isHovered = hoveredIdx === idx;
          const isAnyHovered = hoveredIdx !== null;
          
          let zTransform = "translateZ(0px)";
          if (idx === 0) zTransform = isHovered ? "translateZ(75px)" : "translateZ(50px)";
          if (idx === 1) zTransform = isHovered ? "translateZ(20px)" : "translateZ(0px)";
          if (idx === 2) zTransform = isHovered ? "translateZ(-30px)" : "translateZ(-50px)";

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`absolute inset-0 w-full h-full rounded-lg border transition-all duration-500 ease-out transform-style-3d cursor-pointer ${layer.shadow}`}
              style={{
                transform: zTransform,
                background: "rgba(20, 20, 25, 0.25)",
                borderColor: isHovered 
                  ? "rgba(189, 0, 255, 0.45)" 
                  : isAnyHovered 
                    ? "rgba(255, 255, 255, 0.02)" 
                    : "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)"
              }}
            >
              {/* Inner graphic representing scanner grids */}
              {layer.nodes}

              {/* Layer copy info in perspective */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1 text-left select-none">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded bg-black/50 border transition-colors ${isHovered ? "border-[#BD00FF]/40 text-[#BD00FF]" : "border-white/5 text-zinc-400"}`}>
                    {layer.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none">
                      {layer.subtitle}
                    </span>
                    <h3 className={`font-display text-sm font-semibold tracking-wider mt-1 transition-colors leading-none ${isHovered ? "text-[#BD00FF]" : "text-[#F6F5F0]"}`}>
                      {layer.title}
                    </h3>
                  </div>
                </div>
                {isHovered && (
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    className="font-sans text-[10px] text-zinc-300 leading-normal mt-2 pr-4"
                  >
                    {layer.desc}
                  </motion.p>
                )}
              </div>

              {/* Top corners HUD indicator */}
              <div className="absolute top-4 right-4 font-mono text-[9px] text-zinc-600 font-bold select-none">
                {`[ L-0${3 - idx} ]`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Global CSS for 3D translations */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-\\[1000px\\] {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}} />
    </div>
  );
}

export interface VAPTHeroProps {
  category: string;
  title: string;
  tagline: string;
  col2Description?: string;
  col3Metadata?: string;
  scrollTargetId?: string;
}

export default function VAPTHero({
  category,
  title,
  tagline,
  col2Description,
  col3Metadata,
  scrollTargetId = "#vapt-stats",
}: VAPTHeroProps) {
  const lenis = useSmoothScroll();

  const handleScrollToNext = () => {
    if (lenis) {
      lenis.scrollTo(scrollTargetId, {
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const nextSection = document.getElementById(scrollTargetId.replace("#", ""));
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const titleLines = title.split("\n");
  const tags = col3Metadata ? col3Metadata.split("•").map((t) => t.trim()) : [];

  return (
    <section 
      id="vapt-hero"
      className="relative w-full min-h-[100vh] min-h-[100dvh] lg:h-[100vh] lg:h-[100dvh] overflow-hidden flex flex-col justify-between bg-[#030712] select-none border-b border-zinc-900"
    >
      {/* Tech grid tracks & laser animations */}
      <TechGridBackground />

      {/* Top bar with Breadcrumbs */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 relative z-20">
        <ServiceBreadcrumb />
      </div>

      {/* Main headline content & 3D Glass Stack */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center w-full py-8 lg:py-0">
          
          {/* Left Column: Headline copy */}
          <div className="max-w-[720px] flex flex-col items-start gap-4 text-left">
            <div className="overflow-hidden flex flex-wrap items-center gap-x-3 gap-y-1 select-none">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <SectionLabel color="accent">{category}</SectionLabel>
              </motion.div>
              {col2Description && (
                <>
                  <span className="text-zinc-700 text-[10px] font-mono font-bold">//</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="font-mono text-[9px] font-bold text-[#BD00FF] tracking-[0.12em] uppercase block bg-[#BD00FF]/5 border border-[#BD00FF]/15 px-2 py-0.5 rounded-[2px]"
                  >
                    {col2Description}
                  </motion.span>
                </>
              )}
            </div>
            
            <h1 className="text-[clamp(2.0rem,4.4vw,3.8rem)] lg:text-[clamp(2.2rem,4.8vw,4.2rem)] font-display font-medium leading-[1.1] tracking-[-0.01em] uppercase text-left whitespace-pre-line text-white">
              {titleLines.map((line, idx) => (
                <span key={idx} className="block overflow-hidden pb-[0.05em]">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 * (idx + 1) }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Metadata Tags */}
            {tags.length > 0 && (
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  className="flex flex-wrap items-center gap-2 mt-1 select-none"
                >
                  {tags.map((tagText, idx) => (
                    <span 
                      key={idx} 
                      className="font-mono text-[9px] font-bold text-[#BD00FF] tracking-wider uppercase border border-[#BD00FF]/20 bg-[#BD00FF]/[0.03] px-2.5 py-1 rounded-[2px]"
                    >
                      {tagText}
                    </span>
                  ))}
                </motion.div>
              </div>
            )}
            
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 0.75 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="text-[clamp(14px,1.5vw,16px)] font-sans text-zinc-300 leading-relaxed max-w-[560px]"
              >
                {tagline}
              </motion.p>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="mt-8 flex lg:hidden"
            >
              <MagneticButton>
                <Button variant="primary" size="lg" asLink href="/#contact" className="gap-2">
                  Request Briefing <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: 3D Stack Visualization */}
          <div className="flex items-center justify-center w-full min-h-[360px] lg:min-h-[500px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="w-full h-full flex items-center justify-center relative -top-[10px]"
            >
              <VAPTStack3D />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div className="w-full flex justify-center pb-10 relative z-20">
        <motion.button
          onClick={handleScrollToNext}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 0.75, y: 0 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            opacity: { delay: 1.2, duration: 0.6 },
            y: { delay: 1.2, duration: 0.6 },
            scale: { duration: 0.2 }
          }}
          className="flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-[#BD00FF] rounded-lg px-4 py-2 select-none"
          aria-label="Scroll to details"
        >
          <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-zinc-300" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
