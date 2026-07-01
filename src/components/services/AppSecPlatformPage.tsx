"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, ArrowRight, Terminal, ShieldAlert, Check, Plus, Minus } from "lucide-react";
import { Button } from "../ui/Button";
import MagneticButton from "../ui/MagneticButton";
import SectionLabel from "../ui/SectionLabel";
import ServiceBreadcrumb from "./ServiceBreadcrumb";
import ServiceCTA from "./ServiceCTA";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RubiksCube3D from "./RubiksCube3D";
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
  const nodes = Array.from({ length: 64 });
  const flaggedIndices = [14, 27, 45, 52];

  const handleNodeHover = (index: number) => {
    if (shouldReduceMotion || !containerRef.current) return;
    
    // Trigger anime.js ripple wave centered at index
    animate(containerRef.current.querySelectorAll(".find-grid-node"), {
      scale: [
        { value: 1.3, duration: 120, easing: "easeOutQuad" },
        { value: 1.0, duration: 600, easing: "easeOutElastic(1, .8)" }
      ],
      borderColor: [
        { value: "rgba(0, 163, 255, 0.7)", duration: 120 },
        { value: "rgba(255, 255, 255, 0.05)", duration: 700 }
      ],
      backgroundColor: [
        { value: "rgba(0, 163, 255, 0.25)", duration: 120 },
        { value: "#151515", duration: 700 }
      ],
      delay: stagger(30, { grid: [8, 8], from: index })
    });
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full min-h-[300px] md:min-h-[380px] bg-[#0f0f0f]/40 border border-[var(--border-subtle)] rounded-[4px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-md"
    >
      {/* Sci-fi Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] rounded-tl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] rounded-tr-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] rounded-bl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] rounded-br-[2px] opacity-75 pointer-events-none" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-20" />
      
      {!shouldReduceMotion && (
        <>
          <div 
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent pointer-events-none opacity-80 shadow-[0_0_15px_rgba(0,163,255,0.5)] z-10"
            style={{ animation: "scanBeam 5s linear infinite" }}
          />
          <style>{`
            @keyframes scanBeam {
              0% { top: 0%; opacity: 0; }
              10% { opacity: 0.8; }
              90% { opacity: 0.8; }
              100% { top: 100%; opacity: 0; }
            }
          `}</style>
        </>
      )}

      <div className="grid grid-cols-8 gap-3 my-auto w-full max-w-[340px] mx-auto relative z-0">
        {nodes.map((_, i) => {
          const isFlagged = flaggedIndices.includes(i);
          return (
            <div
              key={i}
              onMouseEnter={() => handleNodeHover(i)}
              className={`find-grid-node aspect-square border rounded-[2px] flex items-center justify-center transition-colors duration-500 cursor-crosshair ${
                isFlagged 
                  ? "border-[var(--accent)] bg-[var(--accent-dim)] shadow-[0_0_10px_var(--accent-dim)]" 
                  : "border-white/5 bg-[#151515]"
              }`}
            >
              {isFlagged && (
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping duration-[1200ms]" />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between items-center w-full mt-4 font-mono text-[9px] text-[var(--text-tertiary)] uppercase tracking-widest border-t border-[var(--border-subtle)] pt-4">
        <span>COVERAGE STATE: SCANNING //</span>
        <span className="text-[var(--accent)] font-bold">ACTIVE NODES: 64</span>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 2: VALIDATE VISUAL
// ==========================================
function ValidateVisual() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [rawLogs, setRawLogs] = useState<string[]>([
    "AUTH_BYPASS_ATTEMPT",
    "SQLI_DETECTED_L12",
    "SCA_STALE_DEP_LOW"
  ]);
  const [confirmedThreats, setConfirmedThreats] = useState<string[]>([]);
  const [logCounter, setLogCounter] = useState(0);

  const logTemplates = [
    "AUTH_BYPASS_ATTEMPT",
    "SQLI_DETECTED_L12",
    "SCA_STALE_DEP_LOW",
    "XSS_CANDIDATE_R42",
    "CVE-2026-9283_HIGH",
    "SSRF_VERBAL_PATTERN",
    "CSRF_TOKEN_MISSING",
    "PATH_TRAVERSAL_L8"
  ];

  const threatTemplates = [
    "SQL_INJECTION",
    "AUTH_BYPASS",
    "CROSS_SITE_SCRIPTING",
    "SERVER_SIDE_RF"
  ];

  useEffect(() => {
    if (shouldReduceMotion) {
      setConfirmedThreats(["SQL_INJECTION", "AUTH_BYPASS"]);
      setRawLogs(["SCA_STALE_DEP_LOW"]);
      return;
    }

    const interval = setInterval(() => {
      if (!containerRef.current || !leftRef.current || !centerRef.current || !rightRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const leftRect = leftRef.current.getBoundingClientRect();
      const centerRect = centerRef.current.getBoundingClientRect();
      const rightRect = rightRef.current.getBoundingClientRect();

      const startX = leftRect.left - containerRect.left + leftRect.width / 2;
      const startY = leftRect.top - containerRect.top + leftRect.height / 2;

      const midX = centerRect.left - containerRect.left + centerRect.width / 2;
      const midY = centerRect.top - containerRect.top + centerRect.height / 2;

      const endX = rightRect.left - containerRect.left + rightRect.width / 2;
      const endY = rightRect.top - containerRect.top + rightRect.height / 2;

      const packet = document.createElement("div");
      packet.className = "absolute w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] z-20 pointer-events-none";
      packet.style.left = `${startX}px`;
      packet.style.top = `${startY}px`;
      containerRef.current.appendChild(packet);

      const nextLogName = logTemplates[(logCounter + 3) % logTemplates.length];
      setRawLogs((prev) => [...prev.slice(1), nextLogName]);
      setLogCounter((prev) => prev + 1);

      const isValidated = Math.random() < 0.45;

      animate(packet, {
        left: midX,
        top: midY,
        duration: 800,
        easing: "easeOutQuad",
        onComplete: () => {
          animate(centerRef.current, {
            scale: [1, 1.15, 1],
            borderColor: ["rgba(0, 163, 255, 0.8)", "rgba(255,255,255,0.05)"],
            duration: 300,
            easing: "easeOutBack",
          });

          if (isValidated) {
            packet.style.backgroundColor = "var(--accent)";
            packet.style.boxShadow = "0 0 10px var(--accent)";

            animate(packet, {
              left: endX,
              top: endY,
              duration: 800,
              easing: "easeInQuad",
              onComplete: () => {
                const nextThreatName = threatTemplates[Math.floor(Math.random() * threatTemplates.length)];
                setConfirmedThreats((prev) => {
                  const updated = [...prev, nextThreatName];
                  if (updated.length > 3) updated.shift();
                  return updated;
                });

                animate(rightRef.current, {
                  scale: [1, 1.05, 1],
                  borderColor: ["var(--accent)", "var(--border-subtle)"],
                  duration: 250,
                });

                packet.remove();
              }
            });
          } else {
            packet.style.backgroundColor = "#ff5555";
            packet.style.boxShadow = "0 0 10px #ff3333";

            animate(packet, {
              top: midY + 40,
              opacity: 0,
              duration: 600,
              easing: "easeOutQuad",
              onComplete: () => {
                packet.remove();
              }
            });
          }
        }
      });

    }, 2400);

    return () => clearInterval(interval);
  }, [logCounter, shouldReduceMotion]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full min-h-[350px] bg-[#0f0f0f]/40 border border-[var(--border-subtle)] rounded-[4px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-md"
    >
      {/* Sci-fi Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] rounded-tl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] rounded-tr-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] rounded-bl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] rounded-br-[2px] opacity-75 pointer-events-none" />

      <div className="grid grid-cols-[1.1fr_60px_1.1fr] items-center gap-2 md:gap-4 my-auto relative z-10">
        
        {/* Left: Candidates Container */}
        <div ref={leftRef} className="flex flex-col gap-3 min-h-[170px] bg-[#121212]/50 border border-white/5 p-3 rounded-[3px]">
          <span className="font-mono text-[8px] text-[var(--text-tertiary)] uppercase tracking-wider block border-b border-white/5 pb-1">
            Candidates Stream
          </span>
          <div className="flex flex-col gap-2">
            {rawLogs.map((cand, idx) => (
              <div
                key={cand + idx}
                className="font-mono text-[9px] bg-[#141414] border border-white/5 px-2.5 py-1.5 rounded-[2px] flex items-center justify-between text-zinc-400"
              >
                <span className="truncate">{cand}</span>
                <span className="w-1 h-1 rounded-full bg-orange-400/50 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Center: Classifier Engine */}
        <div className="flex flex-col items-center justify-center">
          <div 
            ref={centerRef}
            className="w-11 h-11 rounded-full border border-white/10 bg-[#161616] flex flex-col items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.01)]"
          >
            <div className="absolute inset-1 rounded-full border border-dashed border-[var(--accent)]/30 animate-spin duration-[10000ms]" />
            <span className="font-mono text-[8px] text-[var(--accent)] font-bold">AI</span>
          </div>
          <span className="font-mono text-[7px] text-zinc-500 uppercase tracking-widest mt-2">Filter</span>
        </div>

        {/* Right: Confirmed Container */}
        <div ref={rightRef} className="flex flex-col gap-3 min-h-[170px] bg-[#121212]/50 border border-white/5 p-3 rounded-[3px]">
          <span className="font-mono text-[8px] text-[var(--accent)] uppercase tracking-wider block border-b border-[var(--accent)]/10 pb-1">
            Confirmed Threats
          </span>
          <div className="flex flex-col gap-2">
            {confirmedThreats.map((conf, idx) => (
              <div
                key={conf + idx}
                className="font-mono text-[9px] bg-[var(--bg-elevated)] border border-[var(--accent)]/40 text-[#F6F5F0] px-2.5 py-1.5 rounded-[2px] flex items-center justify-between shadow-[0_0_8px_rgba(0,163,255,0.05)]"
              >
                <span className="truncate">{conf}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_4px_var(--accent)]" />
              </div>
            ))}
            {confirmedThreats.length === 0 && (
              <div className="text-[8px] font-mono text-zinc-600 italic py-8 text-center">
                Awaiting Engine Feed...
              </div>
            )}
          </div>
        </div>

      </div>

      <div className="w-full border-t border-[var(--border-subtle)] pt-4 mt-4 flex items-center justify-between font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
        <span>Operational Stream // </span>
        <span className="text-[var(--text-primary)]">847 Candidates → 12 Confirmed</span>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 3: FIX VISUAL
// ==========================================
function FixVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();
  const [typedLine, setTypedLine] = useState("");
  const targetLine = "db.query('SELECT * FROM users WHERE id = ?', [id]);";

  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedLine(targetLine);
      return;
    }

    if (isInView) {
      let index = 0;
      const interval = setInterval(() => {
        setTypedLine(targetLine.substring(0, index));
        index++;
        if (index > targetLine.length) {
          clearInterval(interval);
        }
      }, 45);

      if (laserRef.current) {
        animate(laserRef.current, {
          top: ["0%", "100%"],
          opacity: [0.3, 0.9, 0.3],
          duration: 3500,
          loop: true,
          direction: "alternate",
          easing: "easeInOutSine"
        });
      }

      return () => clearInterval(interval);
    }
  }, [isInView, shouldReduceMotion]);

  return (
    <div 
      ref={ref} 
      className="w-full h-full min-h-[300px] bg-[#0f0f0f]/40 border border-[var(--border-subtle)] rounded-[4px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-md font-mono"
    >
      {/* Sci-fi Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] rounded-tl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] rounded-tr-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] rounded-bl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] rounded-br-[2px] opacity-75 pointer-events-none" />

      {!shouldReduceMotion && (
        <div 
          ref={laserRef}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 pointer-events-none shadow-[0_0_8px_rgba(0,163,255,0.4)] z-20"
          style={{ top: "0%" }}
        />
      )}

      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-4 text-[10px] text-zinc-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-zinc-800" />
          <span className="w-2 h-2 rounded-full bg-zinc-800" />
          <span className="w-2 h-2 rounded-full bg-zinc-800" />
          <span className="ml-2">db.ts — DIFF SUGGESTION</span>
        </div>
        <span className="text-[var(--accent)] font-semibold">PR MERGE</span>
      </div>

      <div className="my-auto text-[11px] md:text-[13px] leading-relaxed flex flex-col gap-3">
        <div className="flex flex-col">
          <span className="text-zinc-600 text-[9px] uppercase tracking-wider mb-1">// BEFORE (VULNERABLE)</span>
          <div className="bg-red-950/10 border-l border-red-500/20 py-2 px-3 text-zinc-500 line-through decoration-red-900/30">
            <span className="text-red-400/50 mr-3 select-none">-</span>
            db.query(<span className="text-red-400/70">`SELECT * FROM users WHERE id = &apos;{"$"}{"{"}id{"}"}&apos;`</span>);
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-zinc-600 text-[9px] uppercase tracking-wider mb-1">// AFTER (SECURED)</span>
          <div className="bg-zinc-900/40 border-l border-[var(--accent)]/50 py-2 px-3 text-[#F6F5F0]">
            <span className="text-[var(--accent)] mr-3 select-none font-bold">+</span>
            {typedLine ? (
              <>
                db.query(<span className="text-[var(--accent)]">&apos;SELECT * FROM users WHERE id = ?&apos;</span>, [id]);
                {!shouldReduceMotion && typedLine.length < targetLine.length && (
                  <span className="inline-block w-1.5 h-3.5 bg-[var(--accent)] ml-0.5 animate-pulse" />
                )}
              </>
            ) : (
              <span className="opacity-0">.</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center w-full mt-6 border-t border-[var(--border-subtle)] pt-4 text-[9px] text-zinc-500 uppercase tracking-widest">
        <span>DEVELOPER HUB // </span>
        <span className="text-[var(--accent)]">PATCH PREPARED</span>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 4: PROVE VISUAL
// ==========================================
function ProveVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const [checks, setChecks] = useState(0);
  const [vulns, setVulns] = useState(0);
  const [recurrence, setRecurrence] = useState(1.0);

  const radius = 30;
  const strokeWidth = 2.5;
  const circumference = 2 * Math.PI * radius;

  const circleRef1 = useRef<SVGCircleElement>(null);
  const circleRef2 = useRef<SVGCircleElement>(null);
  const circleRef3 = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      setChecks(70);
      setVulns(12000);
      setRecurrence(0.01);
      return;
    }

    if (isInView) {
      const obj = { checks: 0, vulns: 0, recurrence: 1.00 };

      gsap.to(obj, {
        checks: 70,
        vulns: 12000,
        recurrence: 0.01,
        duration: 2.2,
        ease: "power3.out",
        onUpdate: () => {
          setChecks(Math.floor(obj.checks));
          setVulns(Math.floor(obj.vulns));
          setRecurrence(parseFloat(obj.recurrence.toFixed(2)));
        }
      });

      if (circleRef1.current) {
        animate(circleRef1.current, {
          strokeDashoffset: [circumference, 0],
          duration: 2200,
          easing: "easeOutCubic",
        });
      }
      if (circleRef2.current) {
        animate(circleRef2.current, {
          strokeDashoffset: [circumference, 0],
          duration: 2200,
          easing: "easeOutCubic",
          delay: 150
        });
      }
      if (circleRef3.current) {
        const targetOffset = circumference * (1 - 0.01);
        animate(circleRef3.current, {
          strokeDashoffset: [circumference, targetOffset],
          duration: 2200,
          easing: "easeOutCubic",
          delay: 300
        });
      }
    }
  }, [isInView, shouldReduceMotion, circumference]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[350px] bg-[#0f0f0f]/40 border border-[var(--border-subtle)] rounded-[4px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-md"
    >
      {/* Sci-fi Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] rounded-tl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] rounded-tr-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] rounded-bl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] rounded-br-[2px] opacity-75 pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-6 items-center justify-around my-auto py-4">
        {/* Metric 1 */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                fill="transparent"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth={strokeWidth}
              />
              <circle
                ref={circleRef1}
                cx="48"
                cy="48"
                r={radius}
                fill="transparent"
                stroke="var(--accent)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={shouldReduceMotion ? 0 : circumference}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute font-mono text-2xl font-bold text-[#F6F5F0] select-none">
              {checks}
            </div>
          </div>
          <span className="font-mono text-[8px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.15em] text-center max-w-[120px] select-none">
            Logical Checks Per Scope
          </span>
        </div>

        {/* Metric 2 */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                fill="transparent"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth={strokeWidth}
              />
              <circle
                ref={circleRef2}
                cx="48"
                cy="48"
                r={radius}
                fill="transparent"
                stroke="var(--accent)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={shouldReduceMotion ? 0 : circumference}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute font-mono text-base font-bold text-[#F6F5F0] select-none">
              {vulns.toLocaleString()}+
            </div>
          </div>
          <span className="font-mono text-[8px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.15em] text-center max-w-[120px] select-none">
            Risks Discovered & Closed
          </span>
        </div>

        {/* Metric 3 */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                fill="transparent"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth={strokeWidth}
              />
              <circle
                ref={circleRef3}
                cx="48"
                cy="48"
                r={radius}
                fill="transparent"
                stroke="#ff5555"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={shouldReduceMotion ? circumference * 0.99 : circumference}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute font-mono text-lg font-bold text-[#F6F5F0] select-none">
              {recurrence}%
            </div>
          </div>
          <span className="font-mono text-[8px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.15em] text-center max-w-[120px] select-none">
            Post-Mitigation Recurrence
          </span>
        </div>
      </div>

      <div className="w-full border-t border-[var(--border-subtle)] pt-4 text-[9px] text-zinc-500 uppercase tracking-widest">
        <span>DEVELOPER HUB // </span>
        <span className="text-[var(--accent)]">ZERO GUESSWORK</span>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 5: INTEGRATE VISUAL
// ==========================================
function IntegrateVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const p1Ref = useRef<SVGCircleElement>(null);
  const p2Ref = useRef<SVGCircleElement>(null);
  const p3Ref = useRef<SVGCircleElement>(null);
  const p4Ref = useRef<SVGCircleElement>(null);
  const centerPulseRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    const animatePacket = (target: SVGCircleElement | null, startX: number, startY: number, delayVal: number) => {
      if (!target) return;
      
      animate(target, {
        cx: [startX, 200],
        cy: [startY, 200],
        r: [0, 4, 4, 0],
        opacity: [0, 1, 1, 0],
        duration: 2500,
        delay: delayVal,
        loop: true,
        easing: "linear",
        onBegin: () => {
          target.setAttribute("cx", startX.toString());
          target.setAttribute("cy", startY.toString());
        },
        onLoop: () => {
          if (centerPulseRef.current) {
            animate(centerPulseRef.current, {
              r: [45, 60],
              opacity: [0.6, 0],
              duration: 500,
              easing: "easeOutQuad"
            });
          }
        }
      });
    };

    animatePacket(p1Ref.current, 80, 100, 0);
    animatePacket(p2Ref.current, 320, 100, 600);
    animatePacket(p3Ref.current, 80, 300, 1200);
    animatePacket(p4Ref.current, 320, 300, 1800);

  }, [isInView, shouldReduceMotion]);

  return (
    <div 
      ref={ref} 
      className="w-full h-full min-h-[350px] bg-[#0f0f0f]/40 border border-[var(--border-subtle)] rounded-[4px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-md"
    >
      {/* Sci-fi Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] rounded-tl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] rounded-tr-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] rounded-bl-[2px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] rounded-br-[2px] opacity-75 pointer-events-none" />

      <div className="relative w-full max-w-[340px] aspect-square mx-auto my-auto">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Connection lines */}
          <path
            d="M 80 100 L 200 200"
            stroke="rgba(0, 163, 255, 0.25)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d="M 320 100 L 200 200"
            stroke="rgba(0, 163, 255, 0.25)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d="M 80 300 L 200 200"
            stroke="rgba(0, 163, 255, 0.25)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d="M 320 300 L 200 200"
            stroke="rgba(0, 163, 255, 0.25)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* Central Pulse Ripple Ring */}
          <circle
            ref={centerPulseRef}
            cx="200"
            cy="200"
            r="45"
            fill="transparent"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0"
          />

          {/* Data Packets */}
          {!shouldReduceMotion && (
            <>
              <circle ref={p1Ref} cx="80" cy="100" r="0" fill="var(--accent)" opacity="0" />
              <circle ref={p2Ref} cx="320" cy="100" r="0" fill="var(--accent)" opacity="0" />
              <circle ref={p3Ref} cx="80" cy="300" r="0" fill="var(--accent)" opacity="0" />
              <circle ref={p4Ref} cx="320" cy="300" r="0" fill="var(--accent)" opacity="0" />
            </>
          )}

          {/* Center: ENTERSOFT APPSEC */}
          <g>
            <circle cx="200" cy="200" r="45" className="fill-[#141414] stroke-[var(--accent)]" strokeWidth="2" />
            <text cx="200" cy="200" textAnchor="middle" dominantBaseline="central" fill="#F6F5F0" className="font-mono text-[9px] font-bold uppercase tracking-widest select-none">
              <tspan x="200" dy="-4">ENTERSOFT</tspan>
              <tspan x="200" dy="11" fill="var(--accent)">APPSEC</tspan>
            </text>
          </g>

          {/* Satellites */}
          <g>
            <circle cx="80" cy="100" r="5" className="fill-[#141414] stroke-white/25" strokeWidth="1" />
            <text x="80" y="80" textAnchor="middle" fill="var(--text-secondary)" className="font-mono text-[9px] font-bold tracking-widest uppercase select-none">
              AZURE DEVOPS
            </text>
          </g>
          <g>
            <circle cx="320" cy="100" r="5" className="fill-[#141414] stroke-white/25" strokeWidth="1" />
            <text x="320" y="80" textAnchor="middle" fill="var(--text-secondary)" className="font-mono text-[9px] font-bold tracking-widest uppercase select-none">
              GITHUB ACTIONS
            </text>
          </g>
          <g>
            <circle cx="80" cy="300" r="5" className="fill-[#141414] stroke-white/25" strokeWidth="1" />
            <text x="80" y="325" textAnchor="middle" fill="var(--text-secondary)" className="font-mono text-[9px] font-bold tracking-widest uppercase select-none">
              JIRA
            </text>
          </g>
          <g>
            <circle cx="320" cy="300" r="5" className="fill-[#141414] stroke-white/25" strokeWidth="1" />
            <text x="320" y="325" textAnchor="middle" fill="var(--text-secondary)" className="font-mono text-[9px] font-bold tracking-widest uppercase select-none">
              SERVICENOW
            </text>
          </g>
        </svg>
      </div>

      <div className="flex justify-between items-center w-full mt-4 border-t border-[var(--border-subtle)] pt-4 text-[9px] text-zinc-500 uppercase tracking-widest">
        <span>CI/CD PIPELINE // </span>
        <span className="text-[var(--accent)]">CONNECTIONS LOADED</span>
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
    if (shouldReduceMotion || !laserRef.current) return;

    laserRef.current.style.top = "0%";
    laserRef.current.style.opacity = "0.9";

    animate(laserRef.current, {
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
            Entersoft detects, validates, and helps remediate hundreds of software flaws. Click or hover on a vulnerability category below to audit our specific approaches.
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
export default function AppSecPlatformPage() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const lenis = useSmoothScroll();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP pinned transition animation setup
  useEffect(() => {
    if (!isMounted || typeof window === "undefined" || shouldReduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const transitionSec = transitionRef.current;
    const words = wordsRef.current;
    const marquee = marqueeRef.current;

    if (!transitionSec || !words || !marquee) return;

    const ctx = gsap.context(() => {
      // 1. Pin the sticky content inside the 200vh section during scroll
      ScrollTrigger.create({
        trigger: transitionSec,
        pin: ".transition-sticky",
        start: "top top",
        end: "bottom top",
        pinType: "fixed",
        scrub: true,
      });

      // 2. Animate word stack scaling, collapsing towards center and marquee sliding
      const wordElements = words.querySelectorAll(".transition-word");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: transitionSec,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      tl.to(words, {
        scale: 0.6,
        opacity: 0.05,
        y: -40,
        ease: "power1.inOut"
      }, 0)
      .to(wordElements[0], { y: 60, ease: "none" }, 0)
      .to(wordElements[1], { y: 20, ease: "none" }, 0)
      .to(wordElements[2], { y: -20, ease: "none" }, 0)
      .to(wordElements[3], { y: -60, ease: "none" }, 0)
      .to(marquee, {
        opacity: 1,
        y: -30,
        ease: "power1.inOut"
      }, 0.25)
      .to(".transition-sticky", {
        opacity: 0,
        ease: "none"
      }, 0.85); // Cross-fade effect out at scroll boundary
    });

    return () => {
      ctx.revert();
    };
  }, [isMounted, shouldReduceMotion]);

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

        {/* Top bar with Breadcrumbs */}
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 relative z-20">
          <ServiceBreadcrumb />
        </div>

        {/* Main headline text and Rubik's Cube */}
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-full relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center w-full py-8 lg:py-0">
            {/* Left Column: Headline */}
            <div className="max-w-[720px] flex flex-col items-start gap-4">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel color="accent">APPLICATION SECURITY</SectionLabel>
                </motion.div>
              </div>
              
              <h1 className="text-[clamp(2rem,4.5vw,4rem)] lg:text-[clamp(2rem,5vw,4.4rem)] font-display font-semibold leading-[1.05] tracking-[-0.02em] uppercase text-left whitespace-pre-line drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                <span className="block overflow-hidden pb-[0.05em]">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="block font-serif italic text-white"
                  >
                    The System Behind
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-[0.05em] text-white/90">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="block"
                  >
                    Every Fix.
                  </motion.span>
                </span>
              </h1>
              
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 0.85 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  className="text-[clamp(14px,1.5vw,16px)] font-sans text-[#F6F5F0] leading-relaxed max-w-[550px] text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                >
                  Continuous application audits that fit dev cycles. From first vulnerability discovery scan to ultimate remediation PR sign-off.
                </motion.p>
              </div>
            </div>

            {/* Right Column: 3D Rubik's Cube */}
            <div className="flex items-center justify-center w-full min-h-[450px] md:min-h-[550px] lg:min-h-[600px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="w-full h-full flex items-center justify-center animate-pulse-subtle"
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
        {shouldReduceMotion ? (
          /* Static presentation for reduced-motion */
          <div className="h-screen w-full flex flex-col justify-center items-center px-6">
            <div className="flex flex-col items-center gap-2 font-display font-bold text-4xl uppercase tracking-tighter text-[#F6F5F0] select-none text-center">
              <span className="text-[var(--accent)] font-serif italic">Find</span>
              <span>Validate</span>
              <span className="text-white/70">Fix</span>
              <span className="text-white/40">Prove</span>
            </div>
          </div>
        ) : (
          <div className="transition-sticky h-screen w-full flex flex-col justify-center items-center overflow-hidden">
            <div className="max-w-[1400px] w-full px-6 md:px-12 flex flex-col items-center justify-center h-full relative">
              <div ref={wordsRef} className="flex flex-col items-center justify-center font-display font-bold text-[clamp(2.5rem,7vw,7.5rem)] leading-[0.9] uppercase tracking-tighter text-[#F6F5F0] select-none">
                <span className="transition-word block text-[var(--accent)] font-serif italic">Find</span>
                <span className="transition-word block">Validate</span>
                <span className="transition-word block text-white/75">Fix</span>
                <span className="transition-word block text-white/45">Prove</span>
              </div>
              <div ref={marqueeRef} className="absolute bottom-[20%] w-full overflow-hidden whitespace-nowrap opacity-0 py-4 border-y border-[var(--border-subtle)] bg-[#060606]/85 backdrop-blur-md">
                <div className="inline-block animate-marquee uppercase font-mono text-[9px] md:text-[10px] font-bold tracking-[0.25em] text-[var(--accent)]">
                  {Array(8).fill("EVERY FINDING. EVERY TIME. NO EXCEPTIONS. • ").join("")}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ==========================================
          SCENE 1: FIND (Discovery)
          ========================================== */}
      <section 
        id="appsec-find"
        className="relative w-full min-h-[100vh] flex items-center bg-[#060606] px-6 md:px-12 py-20 border-b border-[var(--border-subtle)] z-20"
      >
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-4 max-w-[500px]">
            <SectionLabel color="secondary">01. CAPABILITY // FIND</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium uppercase text-[#F6F5F0] tracking-tight leading-none">
              Every endpoint. Every dependency. Every line that ships.
            </h2>
            <p className="text-[12px] md:text-sm text-[var(--text-secondary)] font-sans leading-relaxed mt-2">
              Continuous automated code scans mapping your entire software footprint. We evaluate SAST, DAST, IAST, and SCA configurations to verify exposure scope before deployment.
            </p>
          </div>
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[580px]">
              <FindVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SCENE 2: VALIDATE (Analysis)
          ========================================== */}
      <section 
        id="appsec-validate"
        className="relative w-full min-h-[100vh] flex items-center bg-[#060606] px-6 md:px-12 py-20 border-b border-[var(--border-subtle)] z-20"
      >
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-4 max-w-[500px]">
            <SectionLabel color="secondary">02. CAPABILITY // VALIDATE</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium uppercase text-[#F6F5F0] tracking-tight leading-none">
              AI finds candidates. People confirm threats.
            </h2>
            <p className="text-[12px] md:text-sm text-[var(--text-secondary)] font-sans leading-relaxed mt-2">
              AI scan outputs generate candidates; our senior penetration engineers audit and cross-verify findings, removing duplicates and false positives completely.
            </p>
          </div>
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[580px]">
              <ValidateVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SCENE 3: FIX (Remediation)
          ========================================== */}
      <section 
        id="appsec-fix"
        className="relative w-full min-h-[100vh] flex items-center bg-[#060606] px-6 md:px-12 py-20 border-b border-[var(--border-subtle)] z-20"
      >
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-4 max-w-[500px]">
            <SectionLabel color="secondary">03. CAPABILITY // FIX</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium uppercase text-[#F6F5F0] tracking-tight leading-none">
              Ready for a pull request, not a meeting.
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
          SCENE 4: PROVE (Assurance)
          ========================================== */}
      <section 
        id="appsec-prove"
        className="relative w-full min-h-[100vh] flex items-center bg-[#060606] px-6 md:px-12 py-20 border-b border-[var(--border-subtle)] z-20"
      >
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-4 max-w-[500px]">
            <SectionLabel color="secondary">04. CAPABILITY // PROVE</SectionLabel>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium uppercase text-[#F6F5F0] tracking-tight leading-none">
              70 checks per application. Zero guesswork.
            </h2>
            <p className="text-[12px] md:text-sm text-[var(--text-secondary)] font-sans leading-relaxed mt-2">
              Every audit follows 70 logical vulnerability checks. With precise retest schedules and verified patches, vulnerability recurrence rates slide under 0.01%.
            </p>
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
              Fits the pipeline you already have.
            </h2>
            <p className="text-[12px] md:text-sm text-[var(--text-secondary)] font-sans leading-relaxed mt-2">
              Sync audits automatically. Entersoft webhook configurations feed finding logs natively into Azure DevOps, GitHub Actions, Jira pipelines, and ServiceNow dashboards.
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
          CTA CLOSE SECTION
          ========================================== */}
      <ServiceCTA />
    </div>
  );
}
