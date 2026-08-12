"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Key, Zap, CheckCircle2 } from "lucide-react";

export default function NovaSecrets_Hero() {
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
    let time = 0;

    const updateDimensions = () => {
      if (!canvas || !canvas.parentElement) return;
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Stardust floating particles in the upper sky
    const numStars = 85;
    const stars: { x: number; y: number; size: number; alpha: number; speedY: number; speedX: number }[] = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.6,
        size: 0.8 + Math.random() * 1.8,
        alpha: 0.2 + Math.random() * 0.8,
        speedY: (Math.random() - 0.5) * 0.0003,
        speedX: (Math.random() - 0.5) * 0.0003,
      });
    }

    // High-density grid configuration for ultra-fine 3D topological undulating terrain
    const cols = 84;
    const rows = 48;

    const render = () => {
      time += 0.009;
      
      // Reset transform and clear
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;

      // 1. Draw Starfield in Upper Atmosphere
      stars.forEach((star) => {
        star.y += star.speedY;
        star.x += star.speedX;
        if (star.y < 0) star.y = 0.6;
        if (star.y > 0.6) star.y = 0;
        if (star.x < 0) star.x = 1;
        if (star.x > 1) star.x = 0;

        const sx = star.x * width;
        const sy = star.y * height;
        const flicker = 0.7 + Math.sin(time * 2.5 + star.x * 25) * 0.3;

        ctx.fillStyle = `rgba(186, 230, 253, ${star.alpha * flicker})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Large Radiant Blue/Cyan Atmosphere Glow behind peaks
      const glowLeft = ctx.createRadialGradient(
        centerX - width * 0.3,
        height * 0.58,
        20,
        centerX - width * 0.3,
        height * 0.58,
        width * 0.45
      );
      glowLeft.addColorStop(0, "rgba(56, 189, 248, 0.42)"); // Radiant Cyan
      glowLeft.addColorStop(0.45, "rgba(37, 99, 235, 0.18)"); // Electric Blue
      glowLeft.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowLeft;
      ctx.fillRect(0, 0, width, height);

      const glowRight = ctx.createRadialGradient(
        centerX + width * 0.32,
        height * 0.55,
        20,
        centerX + width * 0.32,
        height * 0.55,
        width * 0.48
      );
      glowRight.addColorStop(0, "rgba(14, 165, 233, 0.45)");
      glowRight.addColorStop(0.5, "rgba(29, 78, 216, 0.2)");
      glowRight.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowRight;
      ctx.fillRect(0, 0, width, height);

      // Center ambient illumination
      const glowCenter = ctx.createRadialGradient(
        centerX,
        height * 0.62,
        10,
        centerX,
        height * 0.62,
        width * 0.38
      );
      glowCenter.addColorStop(0, "rgba(224, 242, 254, 0.35)");
      glowCenter.addColorStop(0.45, "rgba(56, 189, 248, 0.2)");
      glowCenter.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowCenter;
      ctx.fillRect(0, 0, width, height);

      // 3. 3D Topological Undulating Terrain Mesh Calculation
      const points: { sx: number; sy: number; heightNorm: number; depthNorm: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        points[r] = [];
        const depthNorm = r / (rows - 1); // 0 (foreground) to 1 (far horizon)

        // Baseline Y spans from foreground (bottom) to horizon (middle)
        const baselineY = height * 0.94 - Math.pow(depthNorm, 0.85) * (height * 0.48);
        const spreadWidth = width * (1.35 - depthNorm * 0.45);

        for (let c = 0; c < cols; c++) {
          const normX = c / (cols - 1) - 0.5; // -0.5 to +0.5
          const sx = centerX + normX * spreadWidth;

          // Rolling mountainous waves matching the Auralis/Nova reference image
          const freqX = normX * Math.PI * 3.2;
          const freqZ = depthNorm * Math.PI * 2.8;

          // Harmonic waves
          const waveHarmonic = Math.sin(freqX * 1.6 + time * 0.8) * Math.cos(freqZ * 1.4 - time * 0.6) * 115;
          const waveDetail = Math.sin(freqX * 3.4 - time * 0.5 + freqZ * 1.2) * 45;

          // Majestic peak ridges on left and right (rising high in midground)
          const ridgeLeft = Math.exp(-Math.pow((normX + 0.32) / 0.16, 2)) * Math.exp(-Math.pow((depthNorm - 0.45) / 0.32, 2)) * 250 * (0.85 + Math.sin(time * 0.9 + depthNorm) * 0.15);
          const ridgeRight = Math.exp(-Math.pow((normX - 0.35) / 0.18, 2)) * Math.exp(-Math.pow((depthNorm - 0.42) / 0.32, 2)) * 270 * (0.85 + Math.cos(time * 0.8 + depthNorm) * 0.15);
          const ridgeCenter = Math.exp(-Math.pow((normX - 0.02) / 0.14, 2)) * Math.exp(-Math.pow((depthNorm - 0.48) / 0.3, 2)) * 130 * (0.75 + Math.sin(time * 1.1) * 0.25);

          const totalElevation = (waveHarmonic + waveDetail + ridgeLeft + ridgeRight + ridgeCenter) * (0.35 + depthNorm * 0.75);
          const sy = baselineY - totalElevation;

          const heightNorm = Math.min(1, Math.max(0, (totalElevation - 20) / 260));

          points[r][c] = { sx, sy, heightNorm, depthNorm };
        }
      }

      // 4. Render Mesh Lines: Horizontal Rows, Depth Columns, and Diagonal Triangular Tessellation
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];

          // Compute color & illumination based on elevation & depth
          const depthFade = Math.pow(1 - pt.depthNorm * 0.6, 1.1);
          const h = pt.heightNorm;

          let strokeColor = "";
          let lineWidth = 1;

          if (h > 0.6) {
            // Bright white crest highlight on peak tops
            const alpha = Math.min(1, (0.75 + (h - 0.6) * 2) * depthFade);
            strokeColor = `rgba(255, 255, 255, ${alpha})`;
            lineWidth = 1.35;
          } else if (h > 0.28) {
            // Radiant Electric Cyan to Sky Blue on slopes
            const alpha = (0.45 + h * 0.6) * depthFade;
            strokeColor = `rgba(56, 189, 248, ${alpha})`;
            lineWidth = 1.05;
          } else {
            // Valleys and foreground (Deep Electric Blue to Cobalt)
            const alpha = (0.15 + h * 0.45) * depthFade;
            strokeColor = `rgba(37, 99, 235, ${alpha})`;
            lineWidth = 0.85;
          }

          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = lineWidth;

          // Horizontal wireframe segment
          if (c < cols - 1) {
            const nextX = points[r][c + 1];
            ctx.beginPath();
            ctx.moveTo(pt.sx, pt.sy);
            ctx.lineTo(nextX.sx, nextX.sy);
            ctx.stroke();
          }

          // Depth wireframe segment
          if (r < rows - 1) {
            const nextZ = points[r + 1][c];
            ctx.beginPath();
            ctx.moveTo(pt.sx, pt.sy);
            ctx.lineTo(nextZ.sx, nextZ.sy);
            ctx.stroke();
          }

          // Diagonal wireframe tessellation for triangular mesh geometry
          if (r < rows - 1 && c < cols - 1) {
            const diag = points[r + 1][c + 1];
            ctx.beginPath();
            ctx.moveTo(pt.sx, pt.sy);
            ctx.lineTo(diag.sx, diag.sy);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", updateDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-36 overflow-hidden bg-[#000000] text-white border-b border-[#27272A]/80 font-sans select-none">
      
      {/* ─────────────────────────────────────────────────────────────
          1. 3D TOPOLOGICAL UNDULATING WIREFRAME TERRAIN CANVAS
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
        
        {/* Soft Bottom Fade */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#000000] via-[#000000]/85 to-transparent pointer-events-none" />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        
        {/* ─────────────────────────────────────────────────────────────
            2. TOP PILL BADGE
            ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#18181B]/80 border border-white/10 backdrop-blur-xl mb-8 shadow-[0_0_25px_rgba(56,189,248,0.2)] hover:border-[#38BDF8]/40 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8] animate-pulse" />
          <span className="text-xs font-medium tracking-wide text-slate-200">
            EnProbe Platform • Real-Time Credential Defense
          </span>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            3. DISPLAY HEADLINE (Nova / Auralis Master Title)
            ───────────────────────────────────────────────────────────── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white font-sans max-w-[1100px] leading-[1.03] mb-6"
        >
          Zero Credential Leaks.{" "}
          <span className="bg-gradient-to-r from-[#BAE6FD] via-[#38BDF8] to-[#60A5FA] bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(56,189,248,0.7)]">
            Absolute Trust.
          </span>
        </motion.h1>

        {/* ─────────────────────────────────────────────────────────────
            4. SUBTITLE
            ───────────────────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-[#A1A1AA] font-sans font-normal max-w-[740px] leading-relaxed mb-10"
        >
          We engineer continuous real-time secret defense across developer workstations, git repositories, and cloud fleets with motion, clarity, and precision.
        </motion.p>

        {/* ─────────────────────────────────────────────────────────────
            5. DUAL ACTION BUTTONS (Shiny Electric Cyan/Blue Button + Glass)
            ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#3B82F6] hover:from-[#7DD3FC] hover:to-[#2563EB] text-[#030712] font-sans font-bold text-sm tracking-tight transition-all duration-300 shadow-[0_0_35px_rgba(56,189,248,0.45)] hover:scale-[1.03] cursor-pointer"
            data-cursor="button"
          >
            <span>Scan Repositories</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>

          <Link
            href="#capabilities"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#18181B]/80 hover:bg-[#27272A] border border-white/10 hover:border-white/20 text-slate-200 hover:text-white font-sans font-medium text-sm transition-all duration-200 backdrop-blur-xl cursor-pointer"
            data-cursor="button"
          >
            <Play className="w-3.5 h-3.5 fill-current text-[#38BDF8]" />
            <span>Explore Platform</span>
          </Link>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            6. 3 NOVA GLASS CARDS (Matching Proportions)
            ───────────────────────────────────────────────────────────── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
          
          {/* Card 1: Workstation Pre-Commit */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="p-px rounded-[24px] bg-gradient-to-b from-[#38BDF8]/35 via-white/10 to-transparent shadow-[0_10px_30px_rgba(0,0,0,0.6)] group hover:from-[#38BDF8]/60 transition-all duration-300"
          >
            <div className="w-full h-full bg-[#12141A]/90 rounded-[23px] p-7 flex flex-col justify-between gap-4 backdrop-blur-2xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-white font-sans tracking-tight group-hover:text-[#BAE6FD] transition-colors">
                  Pre-Commit Defense
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed font-sans">
                  Sub-240ms local git hook scanning that intercepts high-entropy secrets on developer machines with zero workflow latency.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#38BDF8]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero Developer Friction</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Live Active Proof */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="p-px rounded-[24px] bg-gradient-to-b from-[#38BDF8]/35 via-white/10 to-transparent shadow-[0_10px_30px_rgba(0,0,0,0.6)] group hover:from-[#38BDF8]/60 transition-all duration-300"
          >
            <div className="w-full h-full bg-[#12141A]/90 rounded-[23px] p-7 flex flex-col justify-between gap-4 backdrop-blur-2xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-white font-sans tracking-tight group-hover:text-[#BAE6FD] transition-colors">
                  Live Active Key Proof
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed font-sans">
                  Safely probes detected credentials against upstream token issuers to verify active exploitability with 100% precision.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#38BDF8]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% True-Positive Rate</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Autonomous Rotation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.49 }}
            className="p-px rounded-[24px] bg-gradient-to-b from-[#38BDF8]/35 via-white/10 to-transparent shadow-[0_10px_30px_rgba(0,0,0,0.6)] group hover:from-[#38BDF8]/60 transition-all duration-300"
          >
            <div className="w-full h-full bg-[#12141A]/90 rounded-[23px] p-7 flex flex-col justify-between gap-4 backdrop-blur-2xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                <Key className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-white font-sans tracking-tight group-hover:text-[#BAE6FD] transition-colors">
                  Autonomous Key Rotation
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed font-sans">
                  Automated IAM revocation playbooks that rotate compromised cloud credentials and sync vaults within seconds.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#38BDF8]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>&lt; 5s Mean Time to Revoke</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
