"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, ArrowRight, Terminal, ShieldAlert, Check, Plus, Minus } from "lucide-react";
import { Button } from "../ui/Button";
import MagneticButton from "../ui/MagneticButton";
import SectionLabel from "../ui/SectionLabel";
import ServiceBreadcrumb from "./ServiceBreadcrumb";
import ServiceCTA from "./ServiceCTA";
import ServiceFAQ from "./ServiceFAQ";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const RubiksCube3D = dynamic(() => import("./RubiksCube3D"), { ssr: false });
import { animate, stagger } from "animejs";

// ==========================================
// SCENE 0: HERO CANVAS COMPONENT
// ==========================================
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    const numParticles = 45;
    const particles: Particle[] = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      });
    }

    let flashTimer = 0;
    let flashIndexA = -1;
    let flashIndexB = -1;

    const draw = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((p) => {
        if (!shouldReduceMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(156, 156, 151, 0.4)"; // --text-tertiary with opacity
        ctx.fill();
      });

      if (!shouldReduceMotion) {
        flashTimer++;
        if (flashTimer > 150) {
          flashTimer = 0;
          if (Math.random() < 0.6) {
            flashIndexA = Math.floor(Math.random() * numParticles);
            flashIndexB = Math.floor(Math.random() * numParticles);
          } else {
            flashIndexA = -1;
            flashIndexB = -1;
          }
        }
      }

      // Draw connections
      for (let i = 0; i < numParticles; i++) {
        for (let j = i + 1; j < numParticles; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            const isFlash = !shouldReduceMotion && 
              ((i === flashIndexA && j === flashIndexB) || (i === flashIndexB && j === flashIndexA));

            if (isFlash) {
              ctx.strokeStyle = `rgba(0, 163, 255, ${1 - dist / 130})`; // --accent
              ctx.lineWidth = 1.6;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / 130) * 0.055})`; // --border-subtle
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();
          }
        }
      }

      if (!shouldReduceMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    // Observer to pause loop when canvas goes out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !shouldReduceMotion) {
            draw();
          } else {
            cancelAnimationFrame(animationFrameId);
          }
        });
      },
      { threshold: 0.01 }
    );
    
    observer.observe(canvas);
    
    // Draw initial state
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ==========================================
// SCENE 1: FIND VISUAL
// ==========================================
function FindVisual() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const nodesData = [
    { id: 0, label: "gateway.js", x: 50, y: 70, type: "Entrypoint Gateway", severity: "safe" },
    { id: 1, label: "auth_service.py", x: 130, y: 150, type: "API Auth Endpoint", severity: "safe" },
    { id: 2, label: "db_client.ts", x: 190, y: 60, type: "Database Connector", severity: "critical", vuln: "SQL Injection", cvss: "8.8" },
    { id: 3, label: "user_controller.go", x: 210, y: 220, type: "Request Controller", severity: "safe" },
    { id: 4, label: "session_cache.rs", x: 270, y: 140, type: "Redis Cache Layer", severity: "safe" },
    { id: 5, label: "admin_handler.rb", x: 330, y: 220, type: "Admin Operations", severity: "critical", vuln: "Broken Auth Controls", cvss: "9.4" },
    { id: 6, label: "api_gateway.bin", x: 350, y: 70, type: "Edge Reverse Proxy", severity: "safe" },
    { id: 7, label: "jwt_helper.go", x: 410, y: 150, type: "Auth Token Signature", severity: "safe" }
  ];

  const connections = [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [4, 6], [4, 5], [5, 7], [6, 7]
  ];

  const [nodes] = useState(nodesData);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [sweepX, setSweepX] = useState(50);

  // Sweep scan beam back and forth organically
  useEffect(() => {
    if (shouldReduceMotion) return;
    let frameId: number;
    let startTime = Date.now();
    const update = () => {
      const elapsed = Date.now() - startTime;
      const x = 50 + Math.sin(elapsed / 1600) * 180 + 180; // Sweeps range 50 -> 410
      setSweepX(x);
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [shouldReduceMotion]);

  // Synchronize HUD print details with active node (hover or sweep overlap)
  const getActiveDisplayNode = () => {
    if (hoveredNode !== null) {
      return nodes[hoveredNode];
    }
    let closestNode = nodes[0];
    let minDistance = 9999;
    nodes.forEach((n) => {
      const dist = Math.abs(n.x - sweepX);
      if (dist < minDistance) {
        minDistance = dist;
        closestNode = n;
      }
    });
    return closestNode;
  };

  const activeNode = getActiveDisplayNode();

  return (
    <div 
      ref={containerRef}
      className="w-full h-full min-h-[380px] bg-[#0f0f0f]/40 border border-[var(--border-subtle)] rounded-[4px] p-5 md:p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-md font-mono"
    >
      {/* Sci-fi Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] rounded-tl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] rounded-tr-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] rounded-bl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] rounded-br-[2px] opacity-75 pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5 text-[9.5px] text-zinc-400 select-none">
        <span>ATTACK TOPOLOGY MAP // SCANNING</span>
        <span className="text-[var(--accent)] text-[9px] font-bold tracking-widest uppercase">
          FIND CAPABILITY
        </span>
      </div>

      {/* Interactive Map and HUD detail grid */}
      <div className="flex flex-col lg:flex-row gap-4 my-auto relative z-10 w-full items-stretch">
        
        {/* SVG Network Map */}
        <div className="relative flex-1 bg-[#121212]/30 border border-white/5 rounded-[3px] p-2 min-h-[220px] flex items-center justify-center">
          <svg viewBox="0 0 460 260" className="w-full h-full">
            <defs>
              <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.16" />
              </linearGradient>
            </defs>

            {/* Render Network Connections (Brighter default and active states) */}
            {connections.map(([fromIdx, toIdx], index) => {
              const fromNode = nodes[fromIdx];
              const toNode = nodes[toIdx];
              const isBeamNear = Math.abs(fromNode.x - sweepX) < 25 || Math.abs(toNode.x - sweepX) < 25;
              const isActive = hoveredNode === fromIdx || hoveredNode === toIdx || isBeamNear;
              return (
                <line
                  key={index}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isActive ? "rgba(0, 163, 255, 0.65)" : "rgba(255,255,255,0.18)"}
                  strokeWidth={isActive ? "2" : "1.25"}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Sweep Scan Beam (Increased visibility and shadow) */}
            {!shouldReduceMotion && (
              <g>
                <line
                  x1={sweepX}
                  y1="10"
                  x2={sweepX}
                  y2="250"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeOpacity="0.95"
                  style={{ filter: "drop-shadow(0 0 6px var(--accent))" }}
                />
                <rect
                  x={sweepX - 35}
                  y="10"
                  width="35"
                  height="240"
                  fill="url(#sweepGrad)"
                  pointerEvents="none"
                />
              </g>
            )}

            {/* Render Constellation Nodes (Enlarged node circles, brackets, and labels) */}
            {nodes.map((node) => {
              const isSwept = Math.abs(node.x - sweepX) < 18;
              const isActive = hoveredNode === node.id || isSwept;
              const isCritical = node.severity === "critical";

              return (
                <g key={node.id}>
                  {/* Outer glowing target brackets (Enlarged size) */}
                  {isActive && (
                    <rect
                      x={node.x - 10}
                      y={node.y - 10}
                      width="20"
                      height="20"
                      fill="transparent"
                      stroke={isCritical ? "#ff4444" : "var(--accent)"}
                      strokeWidth="1"
                      strokeDasharray="4 1.5"
                      className="animate-[spin_10s_linear_infinite]"
                    />
                  )}

                  {/* Pulsing warning halo for critical targets */}
                  {isCritical && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="15"
                      fill="transparent"
                      stroke="#ff4444"
                      strokeWidth="1.25"
                      className="animate-ping"
                      style={{ animationDuration: "1.5s" }}
                    />
                  )}

                  {/* Center Node dot (Increased radius) */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? "8.5" : "6"}
                    fill={isCritical ? "#ff4444" : "var(--accent)"}
                    fillOpacity={isActive ? "1" : "0.75"}
                    className="transition-all duration-300"
                  />

                  {/* Label tag (Enlarged font size and opacity) */}
                  <text
                    x={node.x}
                    y={node.y - 14}
                    textAnchor="middle"
                    fill={isCritical ? "#ff4444" : "#f4f4f5"}
                    fillOpacity={isActive ? "1" : "0.85"}
                    className="text-[10px] font-mono select-none font-bold uppercase tracking-wider transition-colors duration-300"
                  >
                    {node.label}
                  </text>

                  {/* Invisible target area for pointer hover checks */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="20"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* HUD Details Terminal Panel */}
        <div className="w-full lg:w-[170px] bg-[#121212]/50 border border-white/5 rounded-[3px] p-3 flex flex-col justify-between font-mono text-[8px] min-h-[220px]">
          <div>
            <span className="text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-1 block select-none mb-3">
              discovered_entity
            </span>

            <div className="flex flex-col gap-2.5">
              <div className="flex flex-col">
                <span className="text-zinc-500 uppercase select-none">Target File:</span>
                <span className="text-zinc-200 font-bold text-[9px] mt-0.5">{activeNode.label}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-zinc-500 uppercase select-none">Classification:</span>
                <span className="text-zinc-300 mt-0.5">{activeNode.type}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-zinc-500 uppercase select-none">Scan Status:</span>
                <span className={`font-bold mt-0.5 ${
                  activeNode.severity === "critical" 
                    ? "text-red-400 animate-pulse" 
                    : "text-emerald-400"
                }`}>
                  {activeNode.severity === "critical" ? "[✓ THREAT_ALERT]" : "[✓ STABLE_SECURE]"}
                </span>
              </div>

              {activeNode.severity === "critical" && (
                <>
                  <div className="flex flex-col">
                    <span className="text-red-500/80 uppercase select-none">Vulnerability:</span>
                    <span className="text-red-400 font-bold mt-0.5">{activeNode.vuln}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-red-500/80 uppercase select-none">CVSS Level:</span>
                    <span className="text-red-400 font-bold mt-0.5">{activeNode.cvss} / 10.0</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-white/5 pt-2 mt-4 text-[7px] text-zinc-500 flex flex-col gap-0.5 select-none">
            <span>PORT: 443 // PROTOCOL</span>
            <span>AUDIT STATE: ACTIVE</span>
          </div>
        </div>

      </div>
      
      {/* Bottom status bar */}
      <div className="flex justify-between items-center w-full mt-3 font-mono text-[9px] text-[var(--text-tertiary)] uppercase tracking-widest border-t border-[var(--border-subtle)] pt-3 select-none">
        <span>COVERAGE STATE: SCANNING //</span>
        <span className="text-[var(--accent)] font-bold">ACTIVE NODES: 8</span>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 2: VALIDATE VISUAL
// ==========================================
function ValidateVisual() {
  return (
    <div 
      className="relative w-full aspect-[4/3] max-w-[320px] sm:max-w-[420px] lg:max-w-[540px] mx-auto flex items-center justify-center select-none pointer-events-none mt-12 sm:mt-16 lg:mt-0"
    >
      {/* Astronaut Character (Space Theme 3D element) */}
      <motion.div 
        className="absolute left-[5%] top-[5%] w-[48%]"
        animate={{
          y: [0, -12, 0],
          rotate: [0, 1.5, 0]
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,163,255,0.2)]"
        >
          <source src="https://d2pas86kykpvmq.cloudfront.net/img_spacers/videos/astro.webm" type="video/webm" />
          <source src="https://d2pas86kykpvmq.cloudfront.net/img_spacers/videos/astro.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Alien Character (Space Theme 3D element) */}
      <motion.div 
        className="absolute right-[5%] bottom-[5%] w-[48%]"
        animate={{
          y: [0, 12, 0],
          rotate: [0, -1.5, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(16,185,129,0.15)]"
        >
          <source src="https://d2pas86kykpvmq.cloudfront.net/img_spacers/videos/alien.webm" type="video/webm" />
          <source src="https://d2pas86kykpvmq.cloudfront.net/img_spacers/videos/alien.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </div>
  );
}

// ==========================================
// SCENE 3: FIX VISUAL
// ==========================================
function FixVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const [animState, setAnimState] = useState<"vulnerable" | "scanning" | "fixing" | "merging" | "done">("vulnerable");
  const [typedChars, setTypedChars] = useState(0);
  const [gitLogs, setGitLogs] = useState<string[]>([]);
  const securePart = "'SELECT * FROM users WHERE id = ?', [id]";

  useEffect(() => {
    if (shouldReduceMotion) {
      setAnimState("done");
      return;
    }

    if (!isInView) return;

    let active = true;

    const runSequence = async () => {
      // Step 1: Vulnerable state
      if (!active) return;
      setAnimState("vulnerable");
      setTypedChars(0);
      setGitLogs([]);
      await delay(2200);

      // Step 2: Scanning state
      if (!active) return;
      setAnimState("scanning");
      await delay(1800);

      // Step 3: Fixing (typing secure code)
      if (!active) return;
      setAnimState("fixing");
      for (let i = 0; i <= securePart.length; i++) {
        if (!active) return;
        setTypedChars(i);
        await new Promise((resolve) => setTimeout(resolve, 35));
      }
      await delay(1200);

      // Step 4: Merging (Git commit logs)
      if (!active) return;
      setAnimState("merging");
      const logs = [
        "$ git add db.ts",
        "$ git commit -m \"fix: sanitize sql injection\"",
        "  [main 4f128be] fix: sanitize sql injection",
        "$ git push origin main",
        "  To github.com:entersoft/api.git",
        "     7a213e8..4f128be  main -> main",
        "  ✓ All security checks passed."
      ];

      for (let i = 0; i < logs.length; i++) {
        if (!active) return;
        setGitLogs((prev) => [...prev, logs[i]]);
        await delay(i === 1 || i === 3 ? 500 : 200);
      }
      await delay(1500);

      // Step 5: Done
      if (!active) return;
      setAnimState("done");
      await delay(3500);

      // Loop back
      if (active) runSequence();
    };

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    runSequence();

    return () => {
      active = false;
    };
  }, [isInView, shouldReduceMotion]);

  const getBadgeStyle = () => {
    switch (animState) {
      case "vulnerable":
        return { text: "CRITICAL: SQL_INJECTION", color: "text-red-400 bg-red-950/20 border-red-500/30 animate-pulse" };
      case "scanning":
        return { text: "AI DETECTED // SCANNING", color: "text-cyan-400 bg-cyan-950/20 border-cyan-500/30" };
      case "fixing":
        return { text: "REMEDIATION GENERATED", color: "text-amber-400 bg-amber-950/20 border-amber-500/30" };
      case "merging":
        return { text: "GIT HOOKS // DEPLOYING", color: "text-blue-400 bg-blue-950/20 border-blue-500/30" };
      case "done":
        return { text: "STATUS: SECURE", color: "text-emerald-400 bg-emerald-950/20 border-emerald-500/30" };
    }
  };

  const badge = getBadgeStyle();

  return (
    <div 
      ref={ref} 
      className="w-full h-full min-h-[360px] bg-[#0f0f0f]/40 border border-[var(--border-subtle)] rounded-[4px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-md font-mono"
    >
      {/* Sci-fi Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] rounded-tl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] rounded-tr-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] rounded-bl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] rounded-br-[2px] opacity-75 pointer-events-none" />

      {/* Scanning Laser Line */}
      {animState === "scanning" && (
        <motion.div 
          initial={{ top: "0%" }}
          animate={{ top: "100%" }}
          transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent shadow-[0_0_8px_rgba(0,163,255,0.8)] z-20"
        />
      )}

      {/* Top Bar Status */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-4 text-[10px] text-zinc-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-zinc-800" />
          <span className="w-2 h-2 rounded-full bg-zinc-800" />
          <span className="w-2 h-2 rounded-full bg-zinc-800" />
          <span className="ml-2 select-none">db.ts — REMEDIATION ENGINE</span>
        </div>
        <span className={`px-2 py-0.5 border text-[8px] font-bold rounded-[2px] tracking-widest ${badge.color}`}>
          {badge.text}
        </span>
      </div>

      {/* Code Editor Body */}
      <div className="my-auto text-[11px] md:text-[12.5px] leading-relaxed flex flex-col gap-4">
        {/* Vulnerable Code block */}
        <div className="flex flex-col">
          <span className="text-zinc-600 text-[8px] uppercase tracking-wider mb-1 select-none">// BEFORE (VULNERABLE)</span>
          <motion.div 
            animate={animState === "scanning" ? { x: [-1.5, 1.5, -1.5, 1.5, 0] } : {}}
            transition={animState === "scanning" ? { repeat: Infinity, duration: 0.12 } : {}}
            className={`py-2 px-3 border-l rounded-[2px] transition-all duration-300 ${
              animState === "vulnerable" || animState === "scanning"
                ? "bg-red-950/10 border-red-500/35 text-zinc-400"
                : "bg-[#0b0b0d]/50 border-white/5 text-zinc-600 line-through decoration-zinc-800/40"
            }`}
          >
            <span className="text-red-500/50 mr-3 select-none">-</span>
            <span className="text-blue-300">db</span>
            <span className="text-gray-400">.</span>
            <span className="text-yellow-200">query</span>
            <span className="text-gray-400">(</span>
            <span className={animState === "vulnerable" || animState === "scanning" ? "text-red-400 font-semibold underline decoration-wavy decoration-red-500/80" : ""}>
              `SELECT * FROM users WHERE id = &apos;{"$"}{"{"}id{"}"}&apos;`
            </span>
            <span className="text-gray-400">);</span>
          </motion.div>
        </div>

        {/* Secure Code block */}
        <div className="flex flex-col">
          <span className="text-zinc-600 text-[8px] uppercase tracking-wider mb-1 select-none">// AFTER (SECURED)</span>
          <div className={`py-2 px-3 border-l rounded-[2px] transition-all duration-300 ${
            animState === "fixing" || animState === "merging" || animState === "done"
              ? "bg-emerald-950/5 border-emerald-500/40 text-zinc-100"
              : "bg-[#0b0b0d]/50 border-white/5 text-zinc-600"
          }`}>
            <span className="text-emerald-500/60 mr-3 select-none">+</span>
            {animState === "fixing" || animState === "merging" || animState === "done" ? (
              <>
                <span className="text-blue-300">db</span>
                <span className="text-gray-400">.</span>
                <span className="text-yellow-200">query</span>
                <span className="text-gray-400">(</span>
                <span className="text-emerald-400 font-semibold">
                  {securePart.substring(0, typedChars)}
                </span>
                {typedChars < securePart.length && (
                  <span className="inline-block w-1.5 h-3.5 bg-[var(--accent)] ml-0.5 animate-pulse" />
                )}
                <span className="text-gray-400">);</span>
              </>
            ) : (
              <span className="opacity-25 font-mono text-[9px] italic">Awaiting AI patch...</span>
            )}
          </div>
        </div>
      </div>

      {/* Terminal Overlay */}
      <AnimatePresence>
        {(animState === "merging" || animState === "done") && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-4 bg-black/60 border border-white/5 rounded p-3 font-mono text-[9px] leading-relaxed text-zinc-400 overflow-y-auto max-h-[105px] scrollbar-none"
          >
            <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5 mb-1.5 text-zinc-500">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              <span className="select-none">TERMINAL // GIT WORKFLOW</span>
            </div>
            {gitLogs.map((log, idx) => (
              <div key={idx} className={log.startsWith("  ✓") ? "text-emerald-400 font-bold" : log.startsWith("$") ? "text-zinc-300" : "text-zinc-500"}>
                {log}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center w-full mt-6 border-t border-[var(--border-subtle)] pt-4 text-[9px] text-zinc-500 uppercase tracking-widest select-none">
        <span>DEVELOPER HUB // </span>
        <span className="text-[var(--accent)] font-semibold select-none">
          {animState === "done" ? "PR MERGED SUCCESSFULLY" : "AI REMEDIATION STAGE"}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 4: PROVE VISUAL
// ==========================================
function ProveVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const [currentStep, setCurrentStep] = useState<"idle" | "testing" | "passed" | "metrics">("idle");
  const [activeTestIndex, setActiveTestIndex] = useState(-1);
  const [testStates, setTestStates] = useState<("idle" | "loading" | "pass")[]>(["idle", "idle", "idle", "idle"]);
  const [score, setScore] = useState(0);
  const [checks, setChecks] = useState(0);
  const [vulns, setVulns] = useState(0);
  const [recurrence, setRecurrence] = useState(100);

  const testSuites = [
    { id: 1, name: "SQL Injection Sanitization", desc: "Checks database input parametrization" },
    { id: 2, name: "OAuth Authentication Bypass Patch", desc: "Validates callback authorization tokens" },
    { id: 3, name: "SSRF Webhook Validation", desc: "Checks loopback filter ranges" },
    { id: 4, name: "Path Traversal Checks", desc: "Evaluates directory resolving rules" }
  ];

  useEffect(() => {
    if (shouldReduceMotion) {
      setTestStates(["pass", "pass", "pass", "pass"]);
      setScore(100);
      setChecks(70);
      setVulns(12000);
      setRecurrence(0.01);
      setCurrentStep("metrics");
      return;
    }

    if (!isInView) return;

    let active = true;

    const runSequence = async () => {
      // Step 1: Idle
      if (!active) return;
      setCurrentStep("idle");
      setActiveTestIndex(-1);
      setTestStates(["idle", "idle", "idle", "idle"]);
      setScore(0);
      setChecks(0);
      setVulns(0);
      setRecurrence(100);
      await delay(1200);

      // Step 2: Testing (run suites one by one)
      if (!active) return;
      setCurrentStep("testing");
      
      for (let i = 0; i < 4; i++) {
        if (!active) return;
        setActiveTestIndex(i);
        setTestStates((prev) => prev.map((s, idx) => (idx === i ? "loading" : s)));
        await delay(800);
        
        if (!active) return;
        setTestStates((prev) => prev.map((s, idx) => (idx === i ? "pass" : s)));
      }
      await delay(600);

      // Step 3: Passed & Score counts up
      if (!active) return;
      setCurrentStep("passed");
      for (let s = 0; s <= 100; s += 5) {
        if (!active) return;
        setScore(s);
        await delay(35);
      }
      await delay(1000);

      // Step 4: Metrics count up
      if (!active) return;
      setCurrentStep("metrics");
      
      const metricsObj = { checks: 0, vulns: 0, recurrence: 100 };
      gsap.to(metricsObj, {
        checks: 70,
        vulns: 12000,
        recurrence: 0.01,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          if (!active) return;
          setChecks(Math.floor(metricsObj.checks));
          setVulns(Math.floor(metricsObj.vulns));
          setRecurrence(parseFloat(metricsObj.recurrence.toFixed(2)));
        }
      });

      await delay(4500);

      // Loop back
      if (active) runSequence();
    };

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    runSequence();

    return () => {
      active = false;
    };
  }, [isInView, shouldReduceMotion]);

  const getStatusText = () => {
    switch (currentStep) {
      case "idle":
        return "AWAITING COHORT INITIATION...";
      case "testing":
        return "REGRESSION SUITES RUNNING...";
      case "passed":
        return "COMPLIANCE CONTROLS ACTIVE";
      case "metrics":
        return "ZERO RECURRENCE RISK ASSURED";
    }
  };

  const getStatusColor = () => {
    switch (currentStep) {
      case "idle":
        return "text-zinc-500 border-zinc-800 bg-zinc-950/20";
      case "testing":
        return "text-amber-400 border-amber-500/20 bg-amber-950/20 animate-pulse";
      case "passed":
        return "text-cyan-400 border-cyan-500/20 bg-cyan-950/20";
      case "metrics":
        return "text-emerald-400 border-emerald-500/20 bg-emerald-950/20";
    }
  };

  const badgeColor = getStatusColor();

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[360px] bg-[#0f0f0f]/40 border border-[var(--border-subtle)] rounded-[4px] p-5 md:p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-md font-mono"
    >
      {/* Sci-fi Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] rounded-tl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] rounded-tr-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] rounded-bl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] rounded-br-[2px] opacity-75 pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-3 text-[10px] text-zinc-500 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-zinc-800" />
          <span className="w-2 h-2 rounded-full bg-zinc-800" />
          <span className="w-2 h-2 rounded-full bg-zinc-800" />
          <span className="ml-2 select-none">regression_test_runner.sh</span>
        </div>
        <span className="text-[var(--accent)] font-semibold text-[8px] tracking-widest">
          PROVE PHASE //
        </span>
      </div>

      {/* Main Area */}
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-4 my-auto relative z-10">
        
        {/* Left Column: Test Suites Checklist */}
        <div className="flex flex-col gap-2 bg-[#121212]/40 border border-white/5 p-3 rounded-[3px] min-h-[190px]">
          <span className="text-[8px] text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-1 block select-none">
            Sanitization Suites
          </span>
          <div className="flex flex-col gap-2 mt-1">
            {testSuites.map((ts, idx) => {
              const state = testStates[idx];
              return (
                <div 
                  key={ts.id} 
                  className={`flex items-start gap-2.5 p-2 rounded-[2px] border transition-all duration-300 ${
                    activeTestIndex === idx
                      ? "border-amber-500/35 bg-amber-950/10 text-zinc-200"
                      : state === "pass"
                      ? "border-emerald-500/20 bg-emerald-950/5 text-zinc-400"
                      : "border-white/5 bg-[#141414]/40 text-zinc-600"
                  }`}
                >
                  <div className="mt-0.5 select-none flex items-center justify-center w-3">
                    {state === "loading" && (
                      <span className="w-2 h-2 rounded-full border-2 border-t-transparent border-amber-400 animate-spin" />
                    )}
                    {state === "pass" && (
                      <span className="text-emerald-400 font-bold text-[8.5px] select-none">[✓]</span>
                    )}
                    {state === "idle" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                    )}
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className={`text-[8.5px] font-bold ${state === "pass" ? "text-zinc-300" : ""}`}>
                      {ts.name}
                    </span>
                    <span className="text-[7px] text-zinc-500 block truncate mt-0.5">{ts.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Security Score Ring */}
        <div className="flex flex-col items-center justify-center bg-[#121212]/40 border border-white/5 p-4 rounded-[3px] min-h-[190px] relative">
          <span className="text-[8px] text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-1 block select-none w-full text-left absolute top-3 left-3">
            Assurance Grade
          </span>

          <div className="relative w-20 h-20 flex items-center justify-center mt-3">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="30"
                fill="transparent"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="3.5"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="30"
                fill="transparent"
                stroke={currentStep === "metrics" ? "var(--accent)" : "var(--accent)"}
                strokeWidth="3.5"
                strokeDasharray={2 * Math.PI * 30}
                strokeDashoffset={2 * Math.PI * 30 * (1 - score / 100)}
                strokeLinecap="round"
                animate={{ strokeDashoffset: 2 * Math.PI * 30 * (1 - score / 100) }}
                transition={{ duration: 0.1 }}
              />
            </svg>
            <div className="absolute flex flex-col items-center select-none">
              <span className="font-mono text-sm font-bold text-[#F6F5F0]">
                {score}%
              </span>
              <span className="text-[6.5px] text-zinc-500 uppercase tracking-wider block mt-0.5">SCORE</span>
            </div>
          </div>

          <div className="mt-3 flex flex-col items-center select-none text-center">
            <span className={`text-[9px] font-bold tracking-widest uppercase ${score === 100 ? "text-emerald-400" : "text-zinc-500"}`}>
              {score === 100 ? "A+ GRADE ASSURED" : "EVALUATING CERTIFICATE..."}
            </span>
            <span className="text-[7px] text-zinc-500 block mt-1">Continuous Compliance Verified</span>
          </div>
        </div>

      </div>

      {/* Bottom Metrics Cards */}
      <div className="grid grid-cols-3 gap-3 border-t border-[var(--border-subtle)] pt-4 select-none">
        {/* Metric 1 */}
        <div className="bg-[#121212]/40 border border-white/5 p-2 rounded-[2px] flex flex-col justify-between">
          <span className="text-[7px] text-zinc-500 uppercase tracking-widest block select-none">Checks / Scope</span>
          <span className="text-sm font-bold text-[#F6F5F0] mt-1">{checks}+</span>
          <div className="w-full h-[2px] bg-white/5 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-[var(--accent)] transition-all duration-300" style={{ width: `${Math.min(100, (checks / 70) * 100)}%` }} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#121212]/40 border border-white/5 p-2 rounded-[2px] flex flex-col justify-between">
          <span className="text-[7px] text-zinc-500 uppercase tracking-widest block select-none">Closed Risks</span>
          <span className="text-sm font-bold text-[#F6F5F0] mt-1">{vulns.toLocaleString()}+</span>
          <div className="w-full h-[2px] bg-white/5 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-[var(--accent)] transition-all duration-300" style={{ width: `${Math.min(100, (vulns / 12000) * 100)}%` }} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#121212]/40 border border-white/5 p-2 rounded-[2px] flex flex-col justify-between">
          <span className="text-[7px] text-zinc-500 uppercase tracking-widest block select-none">Recurrence</span>
          <span className={`text-sm font-bold mt-1 transition-colors duration-300 ${recurrence <= 1 ? "text-emerald-400" : "text-[#F6F5F0]"}`}>
            {recurrence}%
          </span>
          <div className="w-full h-[2px] bg-white/5 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-[#ff5555] transition-all duration-300" style={{ width: `${recurrence}%` }} />
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className={`mt-4 border-t border-[var(--border-subtle)] pt-3 text-[8.5px] uppercase tracking-widest flex items-center justify-between transition-all duration-300 select-none ${badgeColor}`}>
        <span>Automated Audit Status //</span>
        <span className="font-bold tracking-wider">{getStatusText()}</span>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 5: INTEGRATE VISUAL
// ==========================================
function IntegrateVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const [hoveredSat, setHoveredSat] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([
    "// SYSTEM RUNTIME: OK",
    "// INTEGRATION INTERFACES ARMED & READY."
  ]);

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    const logPool = [
      "✓ [Azure DevOps] Hook auth: commit c49f120 validated secure.",
      "→ [GitHub Actions] Launching security regression suite #195...",
      "✓ [GitHub Actions] Suite #195 passed. 0 security Relapses.",
      "✦ [Jira] Synced vulnerability profile to Jira issue SEC-921.",
      "✓ [Jira] Ticket SEC-921 status auto-updated to RESOLVED.",
      "→ [ServiceNow] Offloading telemetry log sync to MID server...",
      "✓ [ServiceNow] Configuration sync completed. Audit state: SECURE.",
      "→ [Azure DevOps] Gate approved. Release pipeline unblocked."
    ];

    const interval = setInterval(() => {
      const entry = logPool[Math.floor(Math.random() * logPool.length)];
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLogs((prev) => [...prev.slice(-2), `[${timeStr}] ${entry}`]);
    }, 2800);

    return () => clearInterval(interval);
  }, [isInView, shouldReduceMotion]);

  const satellites = [
    { name: "Azure DevOps", x: 60, y: 70, color: "#0078d4", detail: "azure-pipelines-gate", status: "CONNECTED" },
    { name: "GitHub Actions", x: 340, y: 70, color: "#a855f7", detail: "github-webhook-event", status: "ACTIVE" },
    { name: "Jira Software", x: 60, y: 290, color: "#0052cc", detail: "jira-rest-sync", status: "ONLINE" },
    { name: "ServiceNow", x: 340, y: 290, color: "#81b03f", detail: "servicenow-mid-link", status: "STABLE" }
  ];

  return (
    <div 
      ref={ref} 
      className="w-full h-full min-h-[380px] bg-[#0c0c0f]/60 border border-[var(--border-subtle)] rounded-[4px] p-5 md:p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl font-mono text-[9px]"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes laserFlow {
          0% { stroke-dashoffset: 240; }
          100% { stroke-dashoffset: 0; }
        }
        .laser-line {
          stroke-dasharray: 8, 32;
          animation: laserFlow 3s linear infinite;
        }
        .laser-line-fast {
          stroke-dasharray: 12, 24;
          animation: laserFlow 1.8s linear infinite;
        }
      `}} />

      {/* Sci-fi Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] rounded-tl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] rounded-tr-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] rounded-bl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] rounded-br-[2px] opacity-75 pointer-events-none" />

      {/* Background Dot Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none z-0">
        <defs>
          <pattern id="integrateGrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.75" fill="#555" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#integrateGrid)" />
      </svg>

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 text-[9px] text-zinc-400 select-none relative z-10">
        <span>SECURITY WEBHOOKS // ORCHESTRATION</span>
        <span className="text-[var(--accent)] text-[8.5px] font-bold tracking-widest uppercase">
          INTEGRATE PHASE
        </span>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative flex-1 w-full min-h-[220px] flex items-center justify-center z-10">
        <svg viewBox="0 0 400 360" className="w-full h-full max-w-[340px]">
          <defs>
            {satellites.map((sat, i) => (
              <linearGradient key={i} id={`grad-${i}`} x1={sat.x} y1={sat.y} x2="200" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={sat.color} stopOpacity="1" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
              </linearGradient>
            ))}
          </defs>

          {/* Connection Lines (Base & Laser overlay) */}
          {satellites.map((sat, i) => {
            const isHovered = hoveredSat === i;
            return (
              <g key={i}>
                {/* Base connection path */}
                <line
                  x1={sat.x}
                  y1={sat.y}
                  x2="200"
                  y2="180"
                  stroke={isHovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="transition-colors duration-300"
                />

                {/* Laser flow overlay */}
                {!shouldReduceMotion && (
                  <line
                    x1={sat.x}
                    y1={sat.y}
                    x2="200"
                    y2="180"
                    stroke={`url(#grad-${i})`}
                    strokeWidth={isHovered ? "2.5" : "1.6"}
                    className={isHovered ? "laser-line-fast" : "laser-line"}
                  />
                )}
              </g>
            );
          })}

          {/* Central Radar Rings */}
          <g className="select-none">
            {/* Spinning Radar concentric dashes */}
            <circle
              cx="200"
              cy="180"
              r="58"
              fill="transparent"
              stroke="rgba(0,163,255,0.18)"
              strokeWidth="1"
              strokeDasharray="8 24"
              className="animate-[spin_24s_linear_infinite]"
            />
            <circle
              cx="200"
              cy="180"
              r="48"
              fill="transparent"
              stroke="rgba(0,163,255,0.35)"
              strokeWidth="1"
              strokeDasharray="4 8"
              className="animate-[spin_12s_linear_infinite_reverse]"
            />

            {/* Central glowing hub */}
            <circle
              cx="200"
              cy="180"
              r="38"
              fill="#09090b"
              stroke="var(--accent)"
              strokeWidth="2"
              className="transition-all duration-300"
              style={{ filter: "drop-shadow(0 0 8px rgba(0, 163, 255, 0.45))" }}
            />
            
            {/* Hub inner pulse */}
            <circle
              cx="200"
              cy="180"
              r="34"
              fill="transparent"
              stroke="var(--accent)"
              strokeWidth="1"
              className="animate-ping"
              style={{ animationDuration: "3s" }}
            />

            <text x="200" y="180" textAnchor="middle" dominantBaseline="central" fill="#F6F5F0" className="font-mono text-[8px] font-bold uppercase tracking-widest pointer-events-none">
              <tspan x="200" dy="-4">ENTERSOFT</tspan>
              <tspan x="200" dy="10" fill="var(--accent)">COMMAND</tspan>
            </text>
          </g>

          {/* Satellite Nodes */}
          {satellites.map((sat, i) => {
            const isHovered = hoveredSat === i;
            return (
              <g 
                key={i} 
                className="cursor-pointer"
                onMouseEnter={() => setHoveredSat(i)}
                onMouseLeave={() => setHoveredSat(null)}
              >
                {/* Node Glow Outer Halo */}
                <circle
                  cx={sat.x}
                  cy={sat.y}
                  r={isHovered ? "15" : "10"}
                  fill="transparent"
                  stroke={sat.color}
                  strokeWidth="1.25"
                  strokeOpacity={isHovered ? "0.6" : "0.15"}
                  className="transition-all duration-300"
                />

                {/* Inner solid node point */}
                <circle
                  cx={sat.x}
                  cy={sat.y}
                  r="5"
                  fill="#0c0c0f"
                  stroke={isHovered ? "#fff" : sat.color}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />

                {/* Satellite title labels (placed strategically around coordinates) */}
                <text
                  x={sat.x}
                  y={sat.y + (sat.y < 180 ? -16 : 22)}
                  textAnchor="middle"
                  fill={isHovered ? "#fff" : "rgba(246,245,240,0.7)"}
                  className="font-mono text-[7.5px] font-bold tracking-wider uppercase select-none transition-colors duration-300"
                >
                  {sat.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Live Tooltip HUD / Logging Panel */}
      <div className="flex flex-col gap-2 relative z-10 w-full">
        {/* Tooltip detail block */}
        <div className="h-[25px] overflow-hidden flex items-center select-none font-mono text-[7.5px]">
          {hoveredSat !== null ? (
            <div className="w-full flex items-center justify-between border-y border-[var(--border-subtle)] py-0.5 bg-[#09090b]/40 px-2 rounded-[2px]">
              <span className="text-zinc-400">NODE: <span className="text-white font-bold">{satellites[hoveredSat].name}</span></span>
              <span className="text-zinc-500">HOOK: <span className="text-[var(--accent)] font-semibold">{satellites[hoveredSat].detail}</span></span>
              <span className={`font-bold ${satellites[hoveredSat].status === "STABLE" ? "text-emerald-400" : "text-cyan-400"}`}>
                [✓ {satellites[hoveredSat].status}]
              </span>
            </div>
          ) : (
            <div className="w-full flex items-center justify-between text-zinc-500 px-2 select-none uppercase tracking-widest text-[7px]">
              <span>[ HOVER SATELLITE FOR TELEMETRY ]</span>
              <span>PROTOCOL: SECURE REST API</span>
            </div>
          )}
        </div>

        {/* Real-time Webhook Console Output */}
        <div className="bg-black/70 border border-white/5 rounded p-3 font-mono text-[8px] leading-relaxed text-zinc-400 min-h-[75px] max-h-[75px] flex flex-col justify-end overflow-hidden select-none">
          <div className="flex items-center gap-1.5 border-b border-white/5 pb-1 mb-1 text-zinc-500 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>INTEGRATION GATEWAY ACTIVE // LOGSSTREAM</span>
          </div>
          <div className="flex-1 flex flex-col justify-end gap-0.5 overflow-hidden">
            {logs.map((log, idx) => {
              let colorClass = "text-zinc-400";
              if (log.includes("[Azure DevOps]")) colorClass = "text-sky-300";
              if (log.includes("[GitHub Actions]")) colorClass = "text-purple-300";
              if (log.includes("[Jira]")) colorClass = "text-blue-300";
              if (log.includes("[ServiceNow]")) colorClass = "text-emerald-300";
              if (log.startsWith("//")) colorClass = "text-zinc-500 italic";
              return (
                <div key={idx} className={`truncate ${colorClass}`}>
                  {log}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center w-full mt-3 border-t border-[var(--border-subtle)] pt-3 text-[9px] text-zinc-500 uppercase tracking-widest select-none relative z-10">
        <span>CI/CD CONNECTIVITY // </span>
        <span className="text-[var(--accent)] font-semibold">ALL ENDPOINTS OPERATIONAL</span>
      </div>
    </div>
  );
}

// ==========================================
// VULNERABILITY INTERACTIVE TOUR TYPES & COMPONENT
// ==========================================
interface TabItem {
  id: string;
  name: string;
  desc: string;
  flaw: string;
  remedy: string;
}

const tabData: TabItem[] = [
  {
    id: "sqli",
    name: "SQL Injection",
    desc: "Direct database execution of untrusted client input bypassing query parameters.",
    flaw: "const query = `SELECT * FROM users WHERE email = '${req.body.email}'`;\nconst user = await db.query(query);",
    remedy: "const query = 'SELECT * FROM users WHERE email = ?';\nconst user = await db.query(query, [req.body.email]);"
  },
  {
    id: "xss",
    name: "XSS",
    desc: "Malicious scripts injected into client rendering pipelines, executing inside browser scopes.",
    flaw: "// Client-side vulnerable rendering\n<div dangerouslySetInnerHTML={{ __html: router.query.search }} />",
    remedy: "// Safe rendering via automatic HTML entity sanitization\n<div>{router.query.search}</div>"
  },
  {
    id: "idor",
    name: "IDOR",
    desc: "Direct object references requested without ownership and permission verification.",
    flaw: "router.get('/document/:id', async (req, res) => {\n  const doc = await Document.findById(req.params.id);\n  res.json(doc);\n});",
    remedy: "router.get('/document/:id', async (req, res) => {\n  const doc = await Document.findOne({\n    _id: req.params.id,\n    ownerId: req.user.id\n  });\n  if (!doc) return res.status(404).send('Not Found');\n  res.json(doc);\n});"
  },
  {
    id: "ssrf",
    name: "SSRF",
    desc: "Host requests executed directly against internal metadata or loopback resources.",
    flaw: "app.post('/fetch-avatar', async (req, res) => {\n  const img = await axios.get(req.body.url);\n  res.send(img.data);\n});",
    remedy: "app.post('/fetch-avatar', async (req, res) => {\n  const parsed = new URL(req.body.url);\n  if (['localhost', '127.0.0.1'].includes(parsed.hostname)) {\n    return res.status(400).send('Blocked Link');\n  }\n  const img = await axios.get(req.body.url);\n  res.send(img.data);\n});"
  },
  {
    id: "auth-bypass",
    name: "Auth Bypass",
    desc: "Routing authorization validation checks bypassed via weak path or cookie comparison.",
    flaw: "if (req.cookies.isAdmin === 'true' || req.path.includes('/admin')) {\n  next();\n}",
    remedy: "const token = req.headers.authorization?.split(' ')[1];\nconst decoded = jwt.verify(token, process.env.JWT_SECRET);\nif (decoded.role === 'admin') {\n  next();\n} else {\n  res.status(403).send('Forbidden access');\n}"
  },
  {
    id: "deserialization",
    name: "Deserialization",
    desc: "Untrusted serialized payloads loaded, leading to system execution takeover.",
    flaw: "const payload = req.body.config;\nconst data = jsyaml.load(payload); // Unsafe Yaml parser load",
    remedy: "const payload = req.body.config;\nconst data = jsyaml.safeLoad(payload); // Safe parsing restrictions"
  }
];

function InteractiveTour() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const viewRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(viewRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (shouldReduceMotion || isPaused || !isInView) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabData.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, shouldReduceMotion, isInView]);

  useEffect(() => {
    const laserEl = laserRef.current;
    if (shouldReduceMotion || !laserEl) return;

    laserEl.style.top = "0%";
    laserEl.style.opacity = "0.9";

    animate(laserEl, {
      top: ["0%", "100%"],
      opacity: [0.9, 0.9, 0],
      duration: 1000,
      easing: "easeInOutQuad"
    });
  }, [activeTab, shouldReduceMotion]);

  const activeData = tabData[activeTab];

  return (
    <section 
      ref={viewRef}
      id="appsec-tour"
      className="relative w-full bg-[var(--bg-primary)] px-6 md:px-12 py-20 md:py-32 overflow-hidden border-b border-[var(--border-subtle)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <SectionLabel color="secondary">VULNERABILITY COVERAGE</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-display font-medium text-[var(--text-primary)] uppercase tracking-tight">
            How it works in practice
          </h2>
          <p className="text-[12px] md:text-sm text-[var(--text-secondary)] font-sans max-w-[600px] leading-relaxed">
            Entersoft detects, validates, and helps remediate hundreds of software flaws. Click or hover on a vulnerability category below to audit our specific <Link href="/services/vapt" className="text-[var(--accent)] hover:underline">penetration testing</Link> and application security approaches.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-[var(--border-subtle)] pb-2 gap-2">
          {tabData.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(i);
                setIsPaused(true);
              }}
              className={`font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-4 py-2 border-b-2 transition-all duration-300 ${
                activeTab === i 
                  ? "border-[var(--accent)] text-[var(--text-primary)]" 
                  : "border-transparent text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-8 md:gap-12 min-h-[360px] items-start">
          {/* Info Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col gap-6 p-6 md:p-8 bg-[#0f0f0f]/40 border border-[var(--border-subtle)] rounded-[4px] backdrop-blur-md relative"
            >
              {/* Sci-fi Corner Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] rounded-tl-[2px] opacity-75 pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] rounded-tr-[2px] opacity-75 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] rounded-bl-[2px] opacity-75 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] rounded-br-[2px] opacity-75 pointer-events-none" />

              <span className="font-mono text-[9px] text-[var(--accent)] uppercase tracking-widest font-bold">
                AUDITED PROFILE
              </span>
              <h3 className="text-xl md:text-2xl font-display font-semibold uppercase text-[#F6F5F0]">
                {activeData.name}
              </h3>
              <p className="font-sans text-[12px] md:text-[13px] leading-relaxed text-zinc-400">
                {activeData.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Diffs Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col gap-6 font-mono text-[10px] md:text-[11.5px] relative overflow-hidden p-0.5"
            >
              {!shouldReduceMotion && (
                <div 
                  ref={laserRef}
                  className="absolute left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 pointer-events-none shadow-[0_0_12px_rgba(0,163,255,0.6)] z-20"
                  style={{ top: "0%" }}
                />
              )}

              {/* Flaw Snippet */}
              <div className="flex flex-col gap-2 p-5 bg-[#0f0f0f]/50 border border-red-500/20 rounded-[4px] relative overflow-hidden">
                <span className="absolute top-3 right-4 text-[8px] text-red-500/60 uppercase font-bold tracking-widest select-none">
                  VULNERABILITY FLAW
                </span>
                <span className="text-zinc-500 uppercase text-[9px] mb-1">// IDENTIFIED THREAT STATE</span>
                <pre className="overflow-x-auto text-zinc-400 leading-relaxed font-semibold">
                  <code>{activeData.flaw}</code>
                </pre>
              </div>

              {/* Remedy Snippet */}
              <div className="flex flex-col gap-2 p-5 bg-[#0f0f0f]/50 border border-[var(--accent)]/30 rounded-[4px] relative overflow-hidden">
                <span className="absolute top-3 right-4 text-[8px] text-[var(--accent)]/80 uppercase font-bold tracking-widest select-none">
                  SECURE REMEDIATION
                </span>
                <span className="text-[var(--accent)] uppercase text-[9px] mb-1">// ENTERSOFT FIXED SPEC</span>
                <pre className="overflow-x-auto text-[#F6F5F0] leading-relaxed font-semibold">
                  <code>{activeData.remedy}</code>
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// MAIN FLAGSHIP COMPONENT WRAPPER
// ==========================================
interface AppSecPlatformPageProps {
  faqs: { question: string; answer: string }[];
}

export default function AppSecPlatformPage({ faqs }: AppSecPlatformPageProps) {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const lenis = useSmoothScroll();

  useEffect(() => {
    setIsMounted(true);
    // Force dark theme on this page only
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  // GSAP pinned transition animation setup
  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const transitionSec = transitionRef.current;
    const stickyEl = stickyRef.current;
    const words = wordsRef.current;
    const marquee = marqueeRef.current;

    if (!transitionSec || !stickyEl || !words || !marquee) return;

    const ctx = gsap.context(() => {
      const wordElements = words.querySelectorAll(".transition-word");
      const marqueeText = marquee.querySelector(".marquee-text");

      // Combine pinning and animating into a single timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: transitionSec,
          pin: stickyEl,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      tl.to(words, {
        scale: 0.6,
        opacity: 0.05,
        y: -40,
        ease: "power1.inOut",
        duration: 0.3
      }, 0)
      .to(wordElements[0], { y: 60, ease: "none", duration: 0.3 }, 0)
      .to(wordElements[1], { y: 20, ease: "none", duration: 0.3 }, 0)
      .to(wordElements[2], { y: -20, ease: "none", duration: 0.3 }, 0)
      .to(wordElements[3], { y: -60, ease: "none", duration: 0.3 }, 0)
      
      // Marquee fades in quickly
      .to(marquee, {
        opacity: 1,
        y: -30,
        ease: "power1.inOut",
        duration: 0.1
      }, 0.15)
      
      // Marquee translates from x: 0 to x: -480 ( Brandium scroll style )
      .fromTo(marqueeText, 
        { x: 0 },
        { x: -480, ease: "none", duration: 0.4 },
        0.1
      )
      
      // Marquee fades out earlier and quickly (completed by progress 0.5)
      .to(marquee, {
        opacity: 0,
        y: -50,
        ease: "power2.in",
        duration: 0.1
      }, 0.4)
      
      // The entire sticky container fades out to 0 and finishes by 0.55 (y=1367)
      .to(stickyEl, {
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.1
      }, 0.45)
      
      // Add trailing empty padding tween to align total duration to 1.0
      .to({}, { duration: 0.45 }, 0.55);

      // Recalibrate trigger dimensions locally
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
    };
  }, [isMounted, lenis]);

  // GSAP Validate and Fix sections scroll reveal (Brandium style overlay slide-up & corner flattening)
  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    const validateSec = document.getElementById("appsec-validate");
    const fixSec = document.getElementById("appsec-fix");

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (validateSec) {
        // Transition from y: 180 & rounded-t-[120px] to y: 0 & rounded-none
        gsap.fromTo(validateSec,
          {
            y: 180,
            borderTopLeftRadius: "120px",
            borderTopRightRadius: "120px",
          },
          {
            y: 0,
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            ease: "none",
            scrollTrigger: {
              trigger: validateSec,
              start: "top bottom", // Starts when top of validate reaches bottom of screen
              end: "top top",      // Ends when top of validate reaches top of screen
              scrub: true,
            }
          }
        );
      }

      if (fixSec) {
        // Transition from y: 180 & rounded-t-[120px] to y: 0 & rounded-none
        gsap.fromTo(fixSec,
          {
            y: 180,
            borderTopLeftRadius: "120px",
            borderTopRightRadius: "120px",
          },
          {
            y: 0,
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            ease: "none",
            scrollTrigger: {
              trigger: fixSec,
              start: "top bottom", // Starts when top of fix reaches bottom of screen
              end: "top top",      // Ends when top of fix reaches top of screen
              scrub: true,
            }
          }
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, [isMounted]);

  const handleScrollToNext = () => {
    if (lenis) {
      lenis.scrollTo("#appsec-transition", {
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const nextSection = document.getElementById("appsec-transition");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-[#060606] text-[#F6F5F0]">
      {/* ==========================================
          SCENE 0: PAGE HERO
          ========================================== */}
      <section 
        id="appsec-hero"
        className="relative w-full min-h-[100vh] min-h-[100dvh] lg:h-[100vh] lg:h-[100dvh] overflow-hidden flex flex-col justify-between bg-[#060606] select-none"
      >
        {/* Canvas particle stream */}
        {isMounted && <HeroCanvas />}

        {/* Top bar spacer */}
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 relative z-20" />

        {/* Main headline text and Rubik's Cube */}
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-full relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center w-full py-8 lg:py-0">
            {/* Left Column: Headline */}
            <div className="max-w-[720px] flex flex-col items-start gap-4">
              <div className="overflow-hidden flex flex-wrap items-center gap-x-3 gap-y-1 select-none">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel color="accent">APPLICATION SECURITY</SectionLabel>
                </motion.div>
                <span className="text-zinc-700 text-[10px] font-mono font-bold">//</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="font-mono text-[9px] font-bold text-zinc-300 tracking-[0.12em] uppercase block bg-white/5 border border-white/10 px-2 py-0.5 rounded-[2px]"
                >
                  Application Assurance Command
                </motion.span>
              </div>
              
              <h1 className="text-[clamp(2rem,4.5vw,4rem)] lg:text-[clamp(2rem,5vw,4.4rem)] font-display font-semibold leading-[1.05] tracking-[-0.02em] uppercase text-left whitespace-pre-line drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                <span className="block overflow-hidden pb-[0.05em]">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="block font-serif italic text-white"
                  >
                    Application Security
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-[0.05em] text-white/90">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="block font-serif italic"
                  >
                    Testing Services
                  </motion.span>
                </span>
              </h1>

              {/* Col 3 Metadata Tags */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  className="flex flex-wrap items-center gap-2 mt-1 select-none"
                >
                  {["Web", "Mobile", "API", "Release Security"].map((tagText, idx) => (
                    <span 
                      key={idx} 
                      className="font-mono text-[9px] font-bold text-[var(--accent)] tracking-wider uppercase border border-[var(--accent)]/25 bg-[var(--accent)]/[0.04] px-2.5 py-1 rounded-[2px]"
                    >
                      {tagText}
                    </span>
                  ))}
                </motion.div>
              </div>
              
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 0.85 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  className="text-[clamp(14px,1.5vw,16px)] font-sans text-[#F6F5F0] leading-relaxed max-w-[550px] text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                >
                  Secure every release with continuous application security testing for web, API, and mobile applications - from vulnerability discovery to verified remediation.
                </motion.p>
              </div>

              {/* Mobile/Tablet CTA Button */}
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

            {/* Right Column: 3D Rubik's Cube */}
            <div className="flex items-center justify-center w-full min-h-[450px] md:min-h-[550px] lg:min-h-[600px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="w-full h-full flex items-center justify-center animate-pulse-subtle relative -top-[28px]"
              >
                <RubiksCube3D />
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
            className="flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg px-4 py-2 select-none"
            aria-label="Scroll to details"
          >
            <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-[var(--text-secondary)] uppercase">
              SCROLL
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-[#F6F5F0]" />
            </motion.div>
          </motion.button>
        </div>
      </section>

      {/* ==========================================
          SCENE TRANSITION: PINNED COLLAPSE STACK
          ========================================== */}
      <section 
        ref={transitionRef}
        id="appsec-transition"
        className="relative w-full h-[200vh] bg-[#060606] z-30"
      >
        <div ref={stickyRef} className="transition-sticky h-screen w-full flex flex-col justify-center items-center overflow-hidden">
          <div className="max-w-[1400px] w-full px-6 md:px-12 flex flex-col items-center justify-center h-full relative">
            <div ref={wordsRef} className="flex flex-col items-center justify-center font-display font-bold text-[clamp(2.5rem,7vw,7.5rem)] leading-[0.9] uppercase tracking-tighter text-[#F6F5F0] select-none">
              <span className="transition-word block text-[var(--accent)] font-serif italic">Find</span>
              <span className="transition-word block">Validate</span>
              <span className="transition-word block text-white/75">Fix</span>
              <span className="transition-word block text-white/45">Prove</span>
            </div>
            <div ref={marqueeRef} className="absolute bottom-[20%] w-full overflow-hidden whitespace-nowrap opacity-0 py-4 border-y border-[var(--border-subtle)] bg-[#060606]/85 backdrop-blur-md">
              <div className="marquee-text inline-block uppercase font-mono text-[9px] md:text-[10px] font-bold tracking-[0.25em] text-[var(--accent)]">
                {Array(8).fill("EVERY FINDING. EVERY TIME. NO EXCEPTIONS. • ").join("")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SCENE 1: FIND (Discovery)
          ========================================== */}
      <section 
        id="appsec-find"
        className="relative w-full min-h-[90vh] flex items-center bg-[#060606] px-6 md:px-12 py-20 border-b border-[var(--border-subtle)] z-20 overflow-hidden"
      >
        {/* Ambient radial color mesh to submerge and combine text with the image shades */}
        <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent blur-[130px] pointer-events-none z-0" />

        {/* Absolute Background Image (right side bleed to edge) */}
        <div className="absolute top-0 right-0 w-full lg:w-[48vw] h-full z-0 overflow-hidden">
          <div className="relative w-full h-full group">
            {/* Multi-directional gradient masks for borderless merge (Abnormal style) */}
            {/* Left fade is very wide (75%) for smooth transition into black text column */}
            <div className="absolute inset-y-0 left-0 w-[75%] bg-gradient-to-r from-[#060606] via-[#060606]/80 via-[#060606]/40 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-[#060606] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-[#060606] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-[#060606]/15 z-10 pointer-events-none mix-blend-multiply" />

            <Image
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
              alt="Cyber threat mapping server scan illustration"
              fill
              sizes="(max-w-lg) 100vw, 48vw"
              className="w-full h-full object-cover opacity-35 lg:opacity-75 group-hover:opacity-90 transition-all duration-700 select-none pointer-events-none"
            />
          </div>
        </div>

        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center relative z-10">
          {/* Left Column: Abnormal-style High-Contrast Large Typography */}
          <div className="flex flex-col gap-4 max-w-[640px] z-10">
            <span className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-[0.25em] uppercase select-none">
              THE CAPABILITY // FIND
            </span>
            <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-sans font-bold text-[#F6F5F0] tracking-tight leading-[1.08] uppercase mt-2 select-none">
              Continuous Application <span className="text-[var(--accent)]">Exposure Detection</span>
            </h2>
            
            <div className="mt-6 flex flex-col gap-4 select-none">
              <p className="text-[clamp(18px,2vw,22px)] font-sans font-semibold text-[#F6F5F0] leading-snug">
                Attack surfaces hide vulnerabilities.{" "}
                <span className="underline decoration-2 decoration-[var(--accent)] underline-offset-8">
                  We map them.
                </span>
              </p>
              <p className="text-[clamp(18px,2vw,22px)] font-sans font-semibold text-zinc-400 leading-snug">
                Continuous discovery unlocks automated <Link href="/services/managed-cloud-security" className="text-[var(--accent)] hover:underline">managed cloud security</Link> and application defense.
              </p>
            </div>
          </div>

          {/* Right Column spacer */}
          <div className="w-full h-[150px] lg:h-full pointer-events-none select-none z-0 lg:block hidden" />
        </div>
      </section>

      {/* ==========================================
          SCENE 2: VALIDATE (Analysis)
          ========================================== */}
      <section 
        id="appsec-validate"
        className="relative w-full min-h-[90vh] flex items-center bg-[#060606] px-6 md:px-12 py-20 border-b border-[var(--border-subtle)] z-20 overflow-hidden"
      >
        {/* Ambient radial color mesh to submerge and combine text with the image shades */}
        <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sky-500/10 via-indigo-500/5 to-transparent blur-[130px] pointer-events-none z-0" />

        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center relative z-10">
          {/* Left Column: Premium box-like illustration with liquid splash distortion reveal on hover */}
          <div className="w-full flex justify-center lg:justify-start order-2 lg:order-1">
            <ValidateVisual />
          </div>

          {/* Right Column: Abnormal-style High-Contrast Large Typography */}
          <div className="flex flex-col gap-4 max-w-[640px] order-1 lg:order-2 z-10 pb-6 lg:pb-0">
            <span className="font-mono text-[10px] font-bold text-[var(--accent)] tracking-[0.25em] uppercase select-none">
              THE CAPABILITY // VALIDATE
            </span>
            <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-sans font-bold text-[#F6F5F0] tracking-tight leading-[1.08] uppercase mt-2 select-none">
              Validate Exploitability with <span className="text-[var(--accent)]">Expert Triage</span>
            </h2>
            
            <div className="mt-6 flex flex-col gap-4 select-none">
              <p className="text-[clamp(18px,2vw,22px)] font-sans font-semibold text-[#F6F5F0] leading-snug">
                Our <Link href="/services/ai-ast" className="text-[var(--accent)] hover:underline">AI-powered application security testing</Link> models find threat candidates.{" "}
                <span className="underline decoration-2 decoration-[var(--accent)] underline-offset-8">
                  We audit them.
                </span>
              </p>
              <p className="text-[clamp(18px,2vw,22px)] font-sans font-semibold text-zinc-400 leading-snug">
                Human-in-the-loop validation removes false positives completely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SCENE 3: FIX (Remediation)
          ========================================== */}
      <section 
        id="appsec-fix"
        className="relative w-full min-h-[100vh] flex items-center bg-[#060606] px-6 md:px-12 py-20 border-b border-[var(--border-subtle)] z-20 overflow-hidden"
      >
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-4 max-w-[500px]">
            <SectionLabel color="secondary">03. CAPABILITY // FIX</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium uppercase text-[#F6F5F0] tracking-tight leading-none">
              Developer-Ready Security Remediation
            </h2>
            <p className="text-[12px] md:text-sm text-[var(--text-secondary)] font-sans leading-relaxed mt-2">
              We package every vulnerability report with clear, production-ready code diffs and patch steps. Developers merge the security updates directly inside standard workflows.
            </p>
          </div>
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[580px]">
              <FixVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SCENE 4: PROVE (Verification)
          ========================================== */}
      <section 
        id="appsec-prove"
        className="relative w-full min-h-[100vh] flex items-center bg-[#060606] px-6 md:px-12 py-20 border-b border-[var(--border-subtle)] z-20"
      >
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-5 max-w-[500px]">
            <SectionLabel color="secondary">04. CAPABILITY // PROVE</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium uppercase text-[#F6F5F0] tracking-tight leading-none">
              Continuous Validation & Proof of Remediation
            </h2>
            <p className="text-[11px] md:text-[12.5px] text-[var(--text-secondary)] font-sans leading-relaxed select-none">
              We execute automated attacks against staging and prod environments to verify patches and seal <Link href="/services/compliance-management" className="text-[var(--accent)] hover:underline">compliance management</Link> standards.
            </p>

            {/* Visual Step Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2 font-mono">
              <div className="border border-white/5 bg-[#121212]/30 p-3 rounded-[3px] flex flex-col justify-between min-h-[90px]">
                <div className="flex items-center justify-between text-[var(--accent)]">
                  <span className="text-[8px] font-bold tracking-wider select-none">01 // HOOK</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
                    <path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4" />
                    <circle cx="8" cy="12" r="2" />
                  </svg>
                </div>
                <div className="mt-2 select-none">
                  <span className="text-[9px] font-bold text-zinc-300 block leading-tight">Commit Hook</span>
                  <span className="text-[7.5px] text-zinc-500 block leading-normal mt-0.5">Triggers on push.</span>
                </div>
              </div>

              <div className="border border-white/5 bg-[#121212]/30 p-3 rounded-[3px] flex flex-col justify-between min-h-[90px]">
                <div className="flex items-center justify-between text-amber-400">
                  <span className="text-[8px] font-bold tracking-wider select-none">02 // TEST</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                    <line x1="12" y1="22" x2="12" y2="15.5" />
                    <polyline points="22 8.5 12 15.5 2 8.5" />
                    <polyline points="2 15.5 12 8.5 22 15.5" />
                    <line x1="12" y1="2" x2="12" y2="8.5" />
                  </svg>
                </div>
                <div className="mt-2 select-none">
                  <span className="text-[9px] font-bold text-zinc-300 block leading-tight">Active Re-test</span>
                  <span className="text-[7.5px] text-zinc-500 block leading-normal mt-0.5">Attacks live routes.</span>
                </div>
              </div>

              <div className="border border-white/5 bg-[#121212]/30 p-3 rounded-[3px] flex flex-col justify-between min-h-[90px]">
                <div className="flex items-center justify-between text-emerald-400">
                  <span className="text-[8px] font-bold tracking-wider select-none">03 // LOCK</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div className="mt-2 select-none">
                  <span className="text-[9px] font-bold text-zinc-300 block leading-tight">Block Relapse</span>
                  <span className="text-[7.5px] text-zinc-500 block leading-normal mt-0.5">Assures fix holds.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[580px]">
              <ProveVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SCENE 5: INTEGRATE (Ecosystem)
          ========================================== */}
      <section 
        id="appsec-integrate"
        className="relative w-full min-h-[100vh] flex items-center bg-[#060606] px-6 md:px-12 py-20 border-b border-[var(--border-subtle)] z-20"
      >
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-4 max-w-[500px]">
            <SectionLabel color="secondary">05. CAPABILITY // INTEGRATE</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium uppercase text-[#F6F5F0] tracking-tight leading-none">
              Application Security Across Your CI/CD Pipeline
            </h2>
            <p className="text-[12px] md:text-sm text-[var(--text-secondary)] font-sans leading-relaxed mt-2">
              Sync audits automatically. Entersoft webhook configurations feed finding logs natively into Azure DevOps, GitHub Actions, Jira pipelines, and <Link href="/services/siem" className="text-[var(--accent)] hover:underline">managed SIEM & monitoring</Link> dashboards.
            </p>
          </div>
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[580px]">
              <IntegrateVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          INTERACTIVE TOUR SECTION (Torq-style)
          ========================================== */}
      <InteractiveTour />

      {/* ==========================================
          FAQ SECTION
          ========================================== */}
      <ServiceFAQ faqs={faqs} isAccordion={true} />

      {/* ==========================================
          CTA CLOSE SECTION
          ========================================== */}
      <ServiceCTA />
    </div>
  );
}
