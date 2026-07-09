"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
      <div className="absolute inset-0 bg-radial-gradient bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)]" />

      {/* Grid lines */}
      <div className="absolute inset-0 flex justify-between px-6 lg:px-12">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-zinc-900/40 relative">
            {/* Gliding laser streak vertically */}
            <div 
              className="absolute w-[2px] h-[120px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent top-0 animate-laser-v"
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
              className="absolute h-[2px] w-[120px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent left-0 animate-laser-h"
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
        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-laser-v {
          animation-name: laser-vertical;
        }
        .animate-laser-h {
          animation-name: laser-horizontal;
        }
        .animate-text-shimmer {
          background-size: 200% auto;
          animation: text-shimmer 5s linear infinite;
        }
      `}} />
    </div>
  );
}

// Interactive 3D Card Stack visual with mouse parallax, stock images, and multi-colored HUD elements
function VAPTHeroVisual3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [cardIndices, setCardIndices] = useState<number[]>([0, 1, 2]);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic slideshow/card cycle every 2.5 seconds unless paused (hovered)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCardIndices((prev) => {
        const [back, middle, front] = prev;
        return [front, back, middle];
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Smooth 3D tilt angles based on mouse offset from center (up to +/- 12 degrees)
    const rX = -(mouseY / (height / 2)) * 12; 
    const rY = (mouseX / (width / 2)) * 12;  
    
    setTilt({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredCardIdx(null);
  };

  const bringToFront = (idx: number) => {
    setCardIndices((prev) => {
      const filtered = prev.filter((item) => item !== idx);
      return [...filtered, idx];
    });
  };

  const handleCardClick = (idx: number) => {
    const stackPos = cardIndices.indexOf(idx);
    if (stackPos === 2) {
      // Cycle stack: Front goes to back
      setCardIndices((prev) => {
        const [back, middle, front] = prev;
        return [front, back, middle];
      });
    } else {
      bringToFront(idx);
    }
  };

  const cards = [
    {
      idx: 0,
      title: "BLACK BOX AUDIT",
      subtitle: "Tier 01 // External Perimeter",
      desc: "Zero-knowledge penetration testing targeting external boundaries, exposed networks, and public entry points.",
      icon: <Shield className="w-5 h-5 text-cyan-400" />,
      color: "cyan",
      glowColor: "#06b6d4",
      glowBorderColor: "rgba(6, 182, 212, 0.4)",
      textColor: "text-cyan-400",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      metrics: [
        { label: "METHOD", val: "Zero Knowledge Exploits" },
        { label: "SCOPES", val: "DNS, IP Ranges, Web App Boundaries" },
        { label: "RISK RATIO", val: "High Critical Expose" }
      ]
    },
    {
      idx: 1,
      title: "GREY BOX AUDIT",
      subtitle: "Tier 02 // Insider Privilege",
      desc: "Credentialed penetration testing evaluating API gateways, privilege escalation, and lateral movement vectors.",
      icon: <Lock className="w-5 h-5 text-amber-400" />,
      color: "amber",
      glowColor: "#f59e0b",
      glowBorderColor: "rgba(245, 158, 11, 0.4)",
      textColor: "text-amber-400",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      metrics: [
        { label: "METHOD", val: "Authenticated APIs & Tokens" },
        { label: "SCOPES", val: "Session hijacking, ACL bypasses" },
        { label: "RISK RATIO", val: "Privileged Leak Vectors" }
      ]
    },
    {
      idx: 2,
      title: "WHITE BOX AUDIT",
      subtitle: "Tier 03 // Deep Repository Audit",
      desc: "Full source code audit, logical sequence checks, and security architecture validation.",
      icon: <Layers className="w-5 h-5 text-emerald-400" />,
      color: "emerald",
      glowColor: "#10b981",
      glowBorderColor: "rgba(16, 185, 129, 0.4)",
      textColor: "text-emerald-400",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
      metrics: [
        { label: "METHOD", val: "Full Git & Config Access" },
        { label: "SCOPES", val: "Data Logic Flow, Logic Validation" },
        { label: "RISK RATIO", val: "Zero-Day Architectures" }
      ]
    }
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        handleMouseLeave();
      }}
      className="relative w-full max-w-[460px] aspect-square flex items-center justify-center select-none z-10 perspective-[1200px]"
    >
      {/* Floating 3D stack wrapper */}
      <div 
        className="relative w-[310px] h-[340px] md:w-[340px] md:h-[370px] transition-all duration-300 ease-out transform-style-3d"
        style={{
          transform: `rotateX(${20 + tilt.x}deg) rotateY(${-20 + tilt.y}deg) rotateZ(0deg)`,
        }}
      >
        {cards.map((card) => {
          const stackPos = cardIndices.indexOf(card.idx);
          const isFront = stackPos === 2;
          const isMiddle = stackPos === 1;
          const isHovered = hoveredCardIdx === card.idx;

          // Compute stack position metrics
          let x = 0;
          let y = 0;
          let z = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 10;
          let blurFilter = "blur(0px)";

          if (isFront) {
            x = 0;
            y = 0;
            z = isHovered ? 60 : 40;
            scale = 1.0;
            opacity = 1.0;
            zIndex = 30;
          } else if (isMiddle) {
            x = 28;
            y = -28;
            z = isHovered ? 15 : 0;
            scale = 0.93;
            opacity = 0.85;
            zIndex = 20;
            blurFilter = "blur(0.5px)";
          } else {
            x = 56;
            y = -56;
            z = isHovered ? -25 : -40;
            scale = 0.86;
            opacity = 0.6;
            zIndex = 10;
            blurFilter = "blur(1.5px)";
          }

          return (
            <motion.div
              key={card.idx}
              onClick={() => handleCardClick(card.idx)}
              onMouseEnter={() => setHoveredCardIdx(card.idx)}
              onMouseLeave={() => setHoveredCardIdx(null)}
              animate={{
                x,
                y,
                z,
                scale,
                opacity,
                zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 26,
              }}
              style={{
                background: "rgba(10, 10, 12, 0.45)",
                backdropFilter: `blur(16px) ${blurFilter}`,
                WebkitBackdropFilter: `blur(16px) ${blurFilter}`,
                borderColor: isFront 
                  ? card.glowBorderColor 
                  : isHovered 
                    ? "rgba(255, 255, 255, 0.15)" 
                    : "rgba(255, 255, 255, 0.05)",
                boxShadow: isFront 
                  ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px ${card.glowColor}15`
                  : "none"
              }}
              className={`absolute inset-0 w-full h-full rounded-2xl border p-5 md:p-6 flex flex-col justify-between cursor-pointer transform-style-3d transition-all duration-300 group`}
            >
              {/* Scanline laser line */}
              {isFront && (
                <motion.div 
                  className="absolute left-0 right-0 h-[1.5px] z-20 pointer-events-none"
                  style={{
                    background: `linear-gradient(to right, transparent, ${card.glowColor}, transparent)`,
                    boxShadow: `0 0 10px ${card.glowColor}`
                  }}
                  animate={{
                    top: ["0%", "100%", "0%"]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}

              {/* Background Stock Image & Gradients */}
              <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl z-0 pointer-events-none">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 350px) 100vw, 350px"
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  style={{
                    opacity: isHovered || isFront ? 0.3 : 0.12,
                    mixBlendMode: "overlay",
                    filter: "grayscale(30%) saturate(90%)",
                  }}
                  priority
                />
                
                {/* HUD Scanlines overlay */}
                <div className="absolute inset-0 bg-scanlines opacity-[0.04]" />
                
                {/* Radial Glow Overlay */}
                <div 
                  className="absolute w-[220px] h-[220px] rounded-full blur-[80px] -bottom-12 -right-12 opacity-35 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, ${card.glowColor} 0%, transparent 70%)`
                  }}
                />
              </div>

              {/* Card top bar info */}
              <div className="flex flex-col gap-1 relative z-10 w-full">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl border bg-black/60 transition-colors border-white/5">
                      {card.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none">
                        {card.subtitle}
                      </span>
                      <h3 className={`font-display text-xs md:text-sm font-semibold tracking-wider mt-1 transition-colors leading-none ${isFront ? card.textColor : "text-zinc-200"}`}>
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  {/* Corner indicator */}
                  <div className={`font-mono text-[9px] font-bold select-none ${isFront ? card.textColor : "text-zinc-600"}`}>
                    {`[ L-0${3 - card.idx} ]`}
                  </div>
                </div>

                <div className="w-full h-[1px] bg-zinc-800/40 mt-3" />
              </div>

              {/* Card Description */}
              <div className="relative z-10 flex-grow flex items-center py-4">
                <p className="font-sans text-[11px] md:text-[12px] text-zinc-400 leading-relaxed pr-2 transition-opacity duration-300">
                  {card.desc}
                </p>
              </div>

              {/* Technical Readout Parameters */}
              <div className="relative z-10 flex flex-col gap-2 border-t border-zinc-800/40 pt-4 w-full">
                {card.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="flex justify-between items-start gap-4 text-[9px] md:text-[10px] font-mono">
                    <span className="text-zinc-500 tracking-wider shrink-0 uppercase">
                      {metric.label}
                    </span>
                    <span className={`text-right break-all leading-normal ${isFront ? "text-zinc-200" : "text-zinc-500"}`}>
                      {metric.val}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .bg-scanlines {
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.25) 50%
          ), linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.06),
            rgba(0, 255, 0, 0.02),
            rgba(0, 0, 255, 0.06)
          );
          background-size: 100% 4px, 6px 100%;
        }
        .perspective-[1200px] {
          perspective: 1200px;
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



      {/* Main headline content & 3D Glass Stack */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-full relative z-20 pt-28 lg:pt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center w-full py-8 lg:py-0">
          
          {/* Left Column: Headline copy */}
          <div className="max-w-[720px] flex flex-col items-start gap-4 text-left relative top-0 lg:-top-[5px]">
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
                    className="font-mono text-[9px] font-bold text-cyan-400 tracking-[0.12em] uppercase block bg-cyan-950/20 border border-cyan-500/20 px-2 py-0.5 rounded-[2px]"
                  >
                    {col2Description}
                  </motion.span>
                </>
              )}
            </div>
            
            <h1 className="text-[clamp(2.0rem,4.8vw,3.6rem)] lg:text-[clamp(2.4rem,5.4vw,4.2rem)] font-display font-extrabold leading-[0.88] tracking-tighter uppercase text-left whitespace-pre-line text-white">
              {titleLines.map((line, idx) => {
                const isSecondLine = idx === 1;
                return (
                  <span key={idx} className="block overflow-hidden pb-[0.08em]">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 * (idx + 1) }}
                      className={`block ${
                        isSecondLine 
                          ? "bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-cyan-200 to-teal-400 bg-[size:200%_auto] animate-text-shimmer drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]" 
                          : "text-white"
                      }`}
                    >
                      {line}
                    </motion.span>
                  </span>
                );
              })}
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
                      className="font-mono text-[9px] font-bold text-cyan-400 tracking-wider uppercase border border-cyan-500/20 bg-cyan-950/[0.03] px-2.5 py-1 rounded-[2px]"
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
              className="w-full h-full flex items-center justify-center relative top-0 lg:-top-[10px]"
            >
              <VAPTHeroVisual3D />
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
          className="flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg px-4 py-2 select-none"
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
