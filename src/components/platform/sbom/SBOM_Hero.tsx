"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, FileCode2, ShieldAlert, Cpu, CheckCircle2 } from "lucide-react";

export default function SBOM_Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const updateDimensions = () => {
      if (!canvas || !canvas.parentElement) return;
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // High-Contrast Palette: Electric Lavender Indigo, Sky Cyan Blue, Royal Indigo, Warm Gold & Pure White
    const palette = [
      { r: 129, g: 140, b: 248 }, // Electric Indigo (#818CF8)
      { r: 56,  g: 189, b: 248 }, // Sky Cyan Blue (#38BDF8)
      { r: 99,  g: 102, b: 241 }, // Royal Indigo (#6366F1)
      { r: 245, g: 158, b: 11  }, // Warm Gold (#F59E0B)
      { r: 255, g: 255, b: 255 }, // Pure White (#FFFFFF)
    ];

    // High volume of tracks with uniform line width
    const numTracks = 95;
    const uniformLineWidth = 2.1; // Made slightly larger for better presence without being overwhelming

    const tracks: {
      xNorm: number;
      color: { r: number; g: number; b: number };
      alpha: number;
    }[] = [];

    for (let i = 0; i < numTracks; i++) {
      const norm = (i / (numTracks - 1)) * 2 - 1; // -1 to 1
      const sign = Math.sign(norm);
      const shapedNorm = sign * Math.pow(Math.abs(norm), 1.18) * 0.96;

      tracks.push({
        xNorm: shapedNorm,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: 0.5 + Math.random() * 0.45,
      });
    }

    // High volume of streaming particles for dense, rich light streams
    const numParticles = 115;
    const particles: {
      trackIndex: number;
      t: number; // 0 (bottom) to 1 (top)
      speed: number;
      length: number;
      brightness: number;
    }[] = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        trackIndex: Math.floor(Math.random() * numTracks),
        t: Math.random(),
        speed: 0.0007 + Math.random() * 0.0011,
        length: 0.16 + Math.random() * 0.28,
        brightness: 0.85 + Math.random() * 0.15,
      });
    }

    // 3D path coordinate calculation using full section proportion down to bottom corners
    const getPathPoint = (xNorm: number, t: number, w: number, h: number) => {
      const centerX = w * 0.5;
      const bendY = h * 0.65;
      const startY = h * 1.02; // Full bottom height to fill empty bottom space completely

      if (t <= 0.38) {
        const p = t / 0.38;
        const y = startY - p * (startY - bendY);
        const spread = (1 - p * 0.75) * (w * 0.82);
        return { x: centerX + xNorm * spread, y };
      } else if (t <= 0.48) {
        const p = (t - 0.38) / 0.10;
        const y = bendY - p * 30;
        const spread = (1 - 0.75) * (w * 0.82);
        return { x: centerX + xNorm * spread, y };
      } else {
        const p = (t - 0.48) / 0.52;
        const topStartY = bendY - 30;
        const y = topStartY - p * (topStartY + 75); // Shoots straight up past top behind navbar
        const spread = (1 - 0.75) * (w * 0.82);
        return { x: centerX + xNorm * spread, y };
      }
    };

    const render = () => {
      ctx.save();
      ctx.scale(dpr, dpr);

      // Deep dark void background
      ctx.fillStyle = "#07080A";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw static guide track lines (Clearer & thicker)
      ctx.globalCompositeOperation = "source-over";
      tracks.forEach((tr) => {
        ctx.beginPath();
        const steps = 28;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const pt = getPathPoint(tr.xNorm, t, width, height);
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        const { r, g, b } = tr.color;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${tr.alpha * 0.32})`;
        ctx.lineWidth = uniformLineWidth * 0.65;
        ctx.stroke();
      });

      // 2. Draw 3D floor perspective grid lines (Spanning full bottom proportion)
      const bendY = height * 0.65;
      const startY = height * 1.02;
      for (let j = 0; j <= 12; j++) {
        const p = Math.pow(j / 12, 1.7);
        const y = startY - p * (startY - bendY);
        const t = (1 - p) * 0.38;
        
        const ptLeft = getPathPoint(-0.96, t, width, height);
        const ptRight = getPathPoint(0.96, t, width, height);

        ctx.beginPath();
        ctx.moveTo(ptLeft.x, y);
        ctx.lineTo(ptRight.x, y);
        ctx.strokeStyle = `rgba(129, 140, 248, ${0.08 + p * 0.22})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      // 3. Hardware-Accelerated GLOWING & SHINY 3D Streaming Lines (Screen Blend Layering)
      ctx.globalCompositeOperation = "screen";

      const segmentSteps = 16;

      particles.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.trackIndex = Math.floor(Math.random() * numTracks);
        }

        const tr = tracks[p.trackIndex];
        const headT = p.t;
        const tailT = Math.max(0, p.t - p.length);

        const { r, g, b } = tr.color;

        // Pass A: Outer Glowing Color Aura Line
        ctx.lineWidth = uniformLineWidth * 2.4;
        for (let i = 0; i < segmentSteps; i++) {
          const stepT1 = tailT + (i / segmentSteps) * (headT - tailT);
          const stepT2 = tailT + ((i + 1) / segmentSteps) * (headT - tailT);

          const pt1 = getPathPoint(tr.xNorm, stepT1, width, height);
          const pt2 = getPathPoint(tr.xNorm, stepT2, width, height);

          const progress = i / segmentSteps;
          const currentAlpha = Math.sin(progress * Math.PI) * tr.alpha * p.brightness * 0.85;

          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha})`;
          ctx.stroke();
        }

        // Pass B: Shiny Pure White Core Highlight Line (Glossy Shine)
        ctx.lineWidth = uniformLineWidth * 1.0;
        for (let i = 0; i < segmentSteps; i++) {
          const stepT1 = tailT + (i / segmentSteps) * (headT - tailT);
          const stepT2 = tailT + ((i + 1) / segmentSteps) * (headT - tailT);

          const pt1 = getPathPoint(tr.xNorm, stepT1, width, height);
          const pt2 = getPathPoint(tr.xNorm, stepT2, width, height);

          const progress = i / segmentSteps;
          const currentAlpha = Math.sin(progress * Math.PI) * p.brightness * 0.98;

          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.stroke();
        }
      });

      // 4. Central Ambient Luminous Glow
      ctx.globalCompositeOperation = "source-over";
      const glowX = width * 0.5;
      const glowY = height * 0.65;
      const glowGrad = ctx.createRadialGradient(glowX, glowY, 20, glowX, glowY, width * 0.52);
      glowGrad.addColorStop(0, "rgba(129, 140, 248, 0.28)");
      glowGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.15)");
      glowGrad.addColorStop(1, "rgba(7, 8, 10, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // 5. Subtle Bottom Vignette
      const bottomGrad = ctx.createLinearGradient(0, height - 60, 0, height);
      bottomGrad.addColorStop(0, "rgba(7, 8, 10, 0)");
      bottomGrad.addColorStop(1, "rgba(7, 8, 10, 0.5)");
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, height - 60, width, 60);

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", updateDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[640px] lg:min-h-[700px] bg-[#07080A] text-white font-sans overflow-hidden border-b border-white/10 pt-28 md:pt-32 lg:pt-36 pb-14 lg:pb-18">
      {/* 3D Curved Vertical Streaming Light Grid Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-12 flex flex-col justify-center h-full">
        
        {/* MAIN HERO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end min-h-[480px]">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div className="w-full pt-1">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] leading-[1.08] font-display font-semibold uppercase tracking-tight text-white mt-1 mb-6"
              >
                <span className="block text-white font-semibold">Continuous SBOM.</span>
                <span className="block bg-gradient-to-r from-white via-cyan-200 to-[#38BDF8] bg-clip-text text-transparent font-semibold">
                  Master License Risk.
                </span>
              </motion.h1>
            </div>

            {/* Stack of 3 Glassmorphic Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full max-w-xl flex flex-col gap-3 mt-2"
            >
              {/* Card 1 */}
              <div className="group relative flex items-center gap-3.5 p-3.5 md:p-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-200 shadow-xl">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0 text-[#818CF8] group-hover:scale-105 transition-transform">
                  <FileCode2 className="w-4.5 h-4.5 text-[#818CF8]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white tracking-tight">
                    Continuous SPDX & CycloneDX Generation
                  </span>
                  <span className="text-xs text-slate-300 font-normal">
                    Automated, machine-readable manifest generation across all builds.
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative flex items-center gap-3.5 p-3.5 md:p-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-200 shadow-xl">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-300 group-hover:scale-105 transition-transform">
                  <ShieldAlert className="w-4.5 h-4.5 text-amber-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white tracking-tight">
                    Open Source License Compliance Auditing
                  </span>
                  <span className="text-xs text-slate-300 font-normal">
                    Real-time detection of copyleft, GPL & viral license obligations.
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative flex items-center gap-3.5 p-3.5 md:p-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-200 shadow-xl">
                <div className="w-9 h-9 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0 text-sky-400 group-hover:scale-105 transition-transform">
                  <Cpu className="w-4.5 h-4.5 text-sky-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white tracking-tight">
                    Continuous CVE & Supply Chain Intelligence
                  </span>
                  <span className="text-xs text-slate-300 font-normal">
                    Cross-references generated SBOMs against real-time NVD & OSV feeds.
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5 flex flex-col justify-end h-full pt-4 lg:pt-0 lg:pl-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-start gap-5 max-w-md"
            >
              <p className="text-slate-200 font-normal text-sm md:text-base leading-relaxed font-sans">
                EnProbe monitors software supply chains in real-time, translating raw package manifests into clear, machine-readable SBOMs while guaranteeing zero open-source license risk.
              </p>

              <div className="flex flex-col gap-1.5 w-full text-xs font-mono text-slate-300 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#818CF8]" />
                  <span>CycloneDX 1.5 & SPDX 2.3 Formats</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#818CF8]" />
                  <span>Executive Order 14028 & NTIA Compliant</span>
                </div>
              </div>

              <div className="w-full pt-1">
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-3 bg-white hover:bg-slate-100 text-slate-950 pl-5 pr-2 py-2 rounded-md font-semibold text-sm shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span className="tracking-tight text-slate-950 font-bold">Request Access</span>
                  <div className="w-7 h-7 rounded bg-slate-950 text-white flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
