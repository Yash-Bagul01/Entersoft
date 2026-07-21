"use client";

import React, { useEffect, useRef, useState } from "react";
import { certifications } from "@/data/certifications";
import SectionLabel from "../ui/SectionLabel";
import { ShieldAlert, Award, FileCheck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";

// Map icons to certifications with custom cybersecurity neon colors
const getIcon = (id: string) => {
  switch (id) {
    case "cert-in":
      return <ShieldAlert className="w-6 h-6 text-[#FF5C00] drop-shadow-[0_0_8px_rgba(255,92,0,0.3)]" />;
    case "crest":
      return <Award className="w-6 h-6 text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]" />;
    case "iso27001":
      return <FileCheck className="w-6 h-6 text-[#00FF85] drop-shadow-[0_0_8px_rgba(0,255,133,0.3)]" />;
    case "gdpr":
      return <CheckCircle className="w-6 h-6 text-[#BD00FF] drop-shadow-[0_0_8px_rgba(189,0,255,0.3)]" />;
    default:
      return <Award className="w-6 h-6 text-[var(--accent)]" />;
  }
};

const styleMap: Record<string, { borderClass: string; glowClass: string; spotlightColor: string; strokeColor: string }> = {
  "cert-in": {
    borderClass: "hover:border-[#FF5C00]/30",
    glowClass: "hover:shadow-[0_0_25px_rgba(255,92,0,0.15)]",
    spotlightColor: "rgba(255, 92, 0, 0.08)",
    strokeColor: "#FF5C00"
  },
  "crest": {
    borderClass: "hover:border-[#00F0FF]/30",
    glowClass: "hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]",
    spotlightColor: "rgba(0, 240, 255, 0.08)",
    strokeColor: "#00F0FF"
  },
  "iso27001": {
    borderClass: "hover:border-[#00FF85]/30",
    glowClass: "hover:shadow-[0_0_25px_rgba(0,255,133,0.15)]",
    spotlightColor: "rgba(0, 255, 133, 0.08)",
    strokeColor: "#00FF85"
  },
  "gdpr": {
    borderClass: "hover:border-[#BD00FF]/30",
    glowClass: "hover:shadow-[0_0_25px_rgba(189,0,255,0.15)]",
    spotlightColor: "rgba(189, 0, 255, 0.08)",
    strokeColor: "#BD00FF"
  }
};

// Custom Scramble Text Hook
function useScramble(initialText: string) {
  const [text, setText] = useState(initialText);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$@&%*+?_[]{}/\\";
    const duration = 600; // ms
    const intervalMs = 25;
    const totalSteps = duration / intervalMs;
    let step = 0;

    intervalRef.current = setInterval(() => {
      const progress = step / totalSteps;
      const result = initialText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          // Reveal character progressively from left to right
          if (index / initialText.length < progress) {
            return initialText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setText(result);
      step++;

      if (step > totalSteps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setText(initialText);
      }
    }, intervalMs);
  };

  const resetScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setText(initialText);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { text, startScramble, resetScramble };
}

// Sub-component for individual certification card
interface CertificationCardProps {
  cert: typeof certifications[number];
  index: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

function CertificationCard({ cert, index, hoveredId, setHoveredId }: CertificationCardProps) {
  const styles = styleMap[cert.id] || styleMap["cert-in"];
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<SVGRectElement>(null);

  const { text: nameText, startScramble: startNameScramble, resetScramble: resetNameScramble } = useScramble(cert.name);
  const { text: authText, startScramble: startAuthScramble, resetScramble: resetAuthScramble } = useScramble(cert.authority);

  const handleMouseEnter = () => {
    setHoveredId(cert.id);
    startNameScramble();
    startAuthScramble();

    // Trigger SVG border tracing animation
    const rect = borderRef.current;
    const card = cardRef.current;
    if (rect && card) {
      const w = card.offsetWidth;
      const h = card.offsetHeight;
      const length = 2 * (w + h);

      gsap.killTweensOf(rect);
      gsap.set(rect, {
        strokeDasharray: `${length / 4} ${length * 3 / 4}`,
        strokeDashoffset: length,
        opacity: 1
      });

      gsap.to(rect, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "none",
        repeat: -1
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const card = cardRef.current;
    const icon = iconRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight cursor tracking
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // 3D Perspective Tilt calculations
    const xNormal = (x / rect.width) - 0.5;
    const yNormal = (y / rect.height) - 0.5;
    
    // Smooth 3D tilt: max 12 degrees
    gsap.to(card, {
      rotateX: -yNormal * 12,
      rotateY: xNormal * 12,
      transformPerspective: 800,
      ease: "power2.out",
      duration: 0.35
    });

    // Magnetic Icon pull (clamped to max 4px to prevent overlapping content)
    if (icon) {
      const iconRect = icon.getBoundingClientRect();
      const iconCenterX = iconRect.left + iconRect.width / 2;
      const iconCenterY = iconRect.top + iconRect.height / 2;
      
      const deltaX = e.clientX - iconCenterX;
      const deltaY = e.clientY - iconCenterY;
      
      const maxPull = 4;
      const dist = Math.hypot(deltaX, deltaY) || 1;
      const pullX = (deltaX / dist) * Math.min(maxPull, dist * 0.05);
      const pullY = (deltaY / dist) * Math.min(maxPull, dist * 0.05);

      gsap.to(icon, {
        x: pullX,
        y: pullY,
        ease: "power2.out",
        duration: 0.25
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    resetNameScramble();
    resetAuthScramble();

    const card = cardRef.current;
    const icon = iconRef.current;
    const rect = borderRef.current;

    // Reset card tilt
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: "power3.out",
        duration: 0.6
      });
    }

    // Reset magnetic icon
    if (icon) {
      gsap.to(icon, {
        x: 0,
        y: 0,
        ease: "elastic.out(1.1, 0.6)",
        duration: 0.8
      });
    }

    // Fade out SVG border path tracing
    if (rect) {
      gsap.killTweensOf(rect);
      gsap.to(rect, {
        opacity: 0,
        duration: 0.3
      });
    }
  };

  const isDimmed = hoveredId !== null && hoveredId !== cert.id;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, filter: "blur(8px)", y: 25 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col justify-between h-full p-8 rounded-[8px] bg-[var(--bg-glass)] border border-[var(--border-glass)] shadow-md overflow-hidden group transition-all duration-500 will-change-transform ${
        isDimmed ? "opacity-30 blur-[1.5px] scale-[0.98]" : "opacity-100 scale-100"
      } ${styles.borderClass} ${styles.glowClass}`}
      style={{
        "--spotlight-color": styles.spotlightColor,
        "--mouse-x": "50%",
        "--mouse-y": "50%",
        transformStyle: "preserve-3d"
      } as React.CSSProperties}
    >
      {/* Holographic Glowing Border Tracing Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" style={{ padding: "1px" }}>
        <rect
          ref={borderRef}
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="8"
          ry="8"
          fill="none"
          stroke={styles.strokeColor}
          strokeWidth="2"
          style={{ opacity: 0 }}
        />
      </svg>

      {/* Dynamic Radial Spotlight Follow Layer */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--spotlight-color), transparent 80%)`
        }}
      />

      <div className="relative z-10 flex flex-col gap-6" style={{ transform: "translateZ(40px)" }}>
        {/* Icon Block */}
        <div 
          ref={iconRef}
          className="w-12 h-12 rounded-[6px] bg-[var(--text-primary)]/[0.02] border border-[var(--border-glass)] flex items-center justify-center group-hover:bg-[var(--text-primary)]/[0.04] transition-colors duration-300 will-change-transform"
        >
          {getIcon(cert.id)}
        </div>

        {/* Text Header */}
        <div className="flex flex-col gap-1.5">
          <h3 className="font-mono text-[13px] font-bold text-[#F6F5F0] uppercase tracking-wider group-hover:text-[var(--accent)] transition-colors duration-300 min-h-[36px] flex items-center">
            {nameText}
          </h3>
          <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider leading-relaxed min-h-[30px] block">
            {authText}
          </span>
        </div>
      </div>

      {/* Description details body */}
      <div 
        className="relative z-10 mt-6 pt-6 border-t border-[var(--border-subtle)] text-[12.5px] text-[var(--text-secondary)] leading-relaxed font-sans group-hover:text-[var(--text-primary)] transition-colors duration-300"
        style={{ transform: "translateZ(20px)" }}
      >
        {cert.description}
      </div>
    </motion.div>
  );
}

export default function CertificationsMarquee() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);

  // Periodic vertical scan laser line effect
  useEffect(() => {
    const laser = laserRef.current;
    const section = sectionRef.current;
    if (!laser || !section) return;

    const runScan = () => {
      const height = section.offsetHeight;
      const tl = gsap.timeline();
      tl.set(laser, { y: 0, opacity: 0 });
      tl.to(laser, { opacity: 0.5, duration: 0.4, ease: "power1.out" });
      tl.to(laser, { y: height, duration: 4.5, ease: "power2.inOut" });
      tl.to(laser, { opacity: 0, duration: 0.4, ease: "power1.in" });
    };

    // First scan after page loads
    const initialDelay = setTimeout(runScan, 1500);
    // Recurring scan every 12 seconds
    const interval = setInterval(runScan, 12000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="certifications" 
      className="relative w-full bg-[#060606] border-t border-[var(--border-subtle)] py-24 md:py-32 overflow-hidden"
    >
      {/* Dynamic Laser Scanning Bar */}
      <div 
        ref={laserRef}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent pointer-events-none z-20"
        style={{
          boxShadow: "0 0 12px var(--accent), 0 0 25px var(--accent)",
          opacity: 0
        }}
      />

      {/* Background Grid Pattern (stunning subtle neon mesh) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 pointer-events-none" />
      
      {/* Background Ambient Spotlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.015)_0%,transparent_70%)] blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(189,0,255,0.012)_0%,transparent_70%)] blur-[80px] pointer-events-none" />

      {/* Header Block */}
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4 relative z-10">
        <div>
          <SectionLabel color="secondary">REGULATORY CREDENTIALS</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-[#F6F5F0] uppercase tracking-tight mt-3">
            Accredited Security Compliance
          </h2>
        </div>
        <div className="font-mono text-[11px] text-[var(--text-tertiary)] uppercase tracking-widest pb-1.5">
          {"// ACCREDITED SEC AUDIT MATRICES"}
        </div>
      </div>

      {/* Spotlight Cards Grid */}
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={cert.id}
              cert={cert}
              index={index}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

