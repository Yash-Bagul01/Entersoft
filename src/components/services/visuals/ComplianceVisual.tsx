"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Check, Play, RefreshCw } from "lucide-react";

interface OutcomeItem {
  label: string;
  detail: string;
}

interface FrameworkDetails {
  title: string;
  score: number;
  description: string;
  outcomes: OutcomeItem[];
  accentColor: string; // Theme color (cyan, emerald, gold)
}

const frameworksData: Record<string, FrameworkDetails> = {
  "ISO 27001": {
    title: "ISO/IEC 27001:2022",
    score: 98,
    description: "Global standard for comprehensive information security management.",
    accentColor: "rgba(0, 163, 255, 1)", // cyan
    outcomes: [
      { label: "Asset Scope Mapped", detail: "100% core client systems indexed & audited." },
      { label: "Operational Logs", detail: "Continuous threat event monitoring active." },
      { label: "Cryptographic Keys", detail: "Rotations verified against legislative guidelines." }
    ]
  },
  "GDPR": {
    title: "GDPR Privacy Standard",
    score: 100,
    description: "Strict privacy safeguards and personal data boundaries.",
    accentColor: "rgba(16, 185, 129, 1)", // emerald
    outcomes: [
      { label: "Data Boundaries", detail: "Residency limits and transit channels audited." },
      { label: "API Encryption", detail: "TLS 1.3 enforced across public ingress points." },
      { label: "Processing Records", detail: "Audit trail activities continuously synced." }
    ]
  },
  "SOC 2": {
    title: "SOC 2 Type II Audits",
    score: 97,
    description: "Security and confidentiality trust principles verified.",
    accentColor: "rgba(245, 158, 11, 1)", // amber/gold
    outcomes: [
      { label: "Ingress Governance", detail: "MFA rules & root access credentials verified." },
      { label: "WAF Telemetry", detail: "Intrusion logs streaming to security operations." },
      { label: "Change Logs", detail: "Branch protection and PR code gates active." }
    ]
  },
  "RBI Guidelines": {
    title: "RBI NBFC Framework",
    score: 95,
    description: "Banking regulation alignment for core transactional systems.",
    accentColor: "rgba(0, 163, 255, 1)", // cyan
    outcomes: [
      { label: "Transaction Logs", detail: "PCI-grade tokenization active on payload channels." },
      { label: "Threat Response", detail: "Real-time fraud alerts integrated into logs." },
      { label: "HSM Custody", detail: "Cryptographic keys secured inside cloud vaults." }
    ]
  },
  "CIS Benchmarks": {
    title: "CIS Hardening Guidelines",
    score: 99,
    description: "Configuration profiles validated against cloud security baselines.",
    accentColor: "rgba(16, 185, 129, 1)", // emerald
    outcomes: [
      { label: "Root Permissions", detail: "Global root API administrative keys disabled." },
      { label: "VPC Ingress Rules", detail: "Public inbound SSH/RDP ports closed." },
      { label: "Log Storage Lock", detail: "Log integrity archives locked with KMS checks." }
    ]
  }
};

export default function ComplianceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedTab, setSelectedTab] = useState<string>("ISO 27001");
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [outcomeStates, setOutcomeStates] = useState<boolean[]>([false, false, false]);

  const scoreIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Animation states inside canvas
  const alignmentProgress = useRef<number>(0); // 0: floating, 1: stacked
  const targetAlignment = useRef<number>(0);
  const rotationY = useRef<number>(0);

  // Mouse coords for 3D parallax
  const mouseRef = useRef({ x: 0, y: 0 });
  const viewRot = useRef({ x: 0.35, y: 0.45 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const triggerPostVerify = (tabKey: string) => {
    setIsScanning(true);
    setCurrentScore(0);
    setOutcomeStates([false, false, false]);
    targetAlignment.current = 0; // split apart first

    const activeFw = frameworksData[tabKey];

    // 1. Animate score progress
    let count = 0;
    if (scoreIntervalRef.current) clearInterval(scoreIntervalRef.current);
    scoreIntervalRef.current = setInterval(() => {
      count += Math.ceil(activeFw.score / 15);
      if (count >= activeFw.score) {
        count = activeFw.score;
        clearInterval(scoreIntervalRef.current!);
      }
      setCurrentScore(count);
    }, 60);

    // 2. Animate alignment stacking sequence
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Step A: Spin apart rapidly
    timerRef.current = setTimeout(() => {
      // Step B: Collapse stack together
      targetAlignment.current = 1;

      // Delayed outcomes checkmarks pop-in
      setTimeout(() => setOutcomeStates([true, false, false]), 300);
      setTimeout(() => setOutcomeStates([true, true, false]), 600);
      setTimeout(() => {
        setOutcomeStates([true, true, true]);
        setIsScanning(false);
      }, 900);

    }, 800);
  };

  useEffect(() => {
    triggerPostVerify(selectedTab);
    return () => {
      if (scoreIntervalRef.current) clearInterval(scoreIntervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [selectedTab]);

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    let animationFrameId: number;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let time = 0;
    let beamOpacity = 0;
    let rippleRadius = 0;
    let rippleOpacity = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse parallax tilt rotation interpolation
      const targetRotX = mouseRef.current.y * 0.25 + 0.35; // Pitch
      const targetRotY = mouseRef.current.x * 0.3 + 0.45; // Yaw
      viewRot.current.x += (targetRotX - viewRot.current.x) * 0.08;
      viewRot.current.y += (targetRotY - viewRot.current.y) * 0.08;

      const cosX = Math.cos(viewRot.current.x);
      const sinX = Math.sin(viewRot.current.x);
      const cosY = Math.cos(viewRot.current.y);
      const sinY = Math.sin(viewRot.current.y);

      const centerX = width / 2;
      const centerY = height / 2;
      const perspective = 180;

      time += 0.015;

      // Interpolate alignment progress to target (0: floating, 1: stacked)
      alignmentProgress.current += (targetAlignment.current - alignmentProgress.current) * 0.09;

      // Sphere rotation angle Y
      // Spins faster during scan, drifts slowly when idle
      const spinSpeed = isScanning ? 0.08 : 0.006;
      rotationY.current += spinSpeed;

      // Project function
      const project = (x: number, y: number, z: number) => {
        // Rotate Y (Yaw)
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate X (Pitch)
        const y1 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const scale = perspective / (perspective + z2);
        return {
          x: centerX + x1 * scale,
          y: centerY + y1 * scale,
          zDepth: z2,
          scale
        };
      };

      const activeFw = frameworksData[selectedTab];
      const themeColor = activeFw.accentColor;

      // 1. Draw a soft radial ambient background glow inside canvas
      const bgGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 120);
      bgGlow.addColorStop(0, themeColor.replace("1)", "0.03)"));
      bgGlow.addColorStop(1, "transparent");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw central laser verification beam when stacked
      if (alignmentProgress.current > 0.8) {
        beamOpacity += (1 - beamOpacity) * 0.1;
      } else {
        beamOpacity += (0 - beamOpacity) * 0.15;
      }

      if (beamOpacity > 0.02) {
        ctx.save();
        ctx.strokeStyle = themeColor.replace("1)", `${beamOpacity * 0.45})`);
        ctx.lineWidth = 2.5;
        ctx.shadowColor = themeColor;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        // Draw vertical projected line through the core axis
        const topPt = project(0, -90, 0);
        const btmPt = project(0, 90, 0);
        ctx.moveTo(topPt.x, topPt.y);
        ctx.lineTo(btmPt.x, btmPt.y);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Draw concentric glassmorphic layers
      // Layers: Top (Access), Middle (Data), Bottom (Network)
      const layersCount = 3;
      const ringRadius = 75;

      // Loop layers back-to-front for proper 3D sorting (or simple layering order)
      for (let l = layersCount - 1; l >= 0; l--) {
        // Base height offset in 3D:
        // floating: separated (-48, 0, 48)
        // stacked: collapsed (-8, 0, 8)
        const baseOffset = (l - 1) * 45;
        const stackedOffset = (l - 1) * 10;
        const currentY = baseOffset + (stackedOffset - baseOffset) * alignmentProgress.current;

        // Add soft sinus floating motion when not scanning/stacked
        const floatFactor = (1 - alignmentProgress.current);
        const floatY = Math.sin(time * 2.2 + l * 1.5) * 6 * floatFactor;
        const y3D = currentY + floatY;

        // Draw projected glass ellipse path
        ctx.save();
        ctx.beginPath();

        const points: { x: number; y: number }[] = [];
        const segments = 48;
        
        // Yaw rot of the ellipse segments
        const ellipseRot = rotationY.current * (l === 1 ? -1.2 : 1.0);

        for (let s = 0; s <= segments; s++) {
          const theta = (s / segments) * Math.PI * 2;
          const x = Math.cos(theta + ellipseRot) * ringRadius;
          const z = Math.sin(theta + ellipseRot) * ringRadius;
          const proj = project(x, y3D, z);
          points.push({ x: proj.x, y: proj.y });
        }

        // Fill glass base with low opacity frosted glass look
        const glassFill = ctx.createLinearGradient(centerX, centerY - 60, centerX, centerY + 60);
        glassFill.addColorStop(0, "rgba(255, 255, 255, 0.03)");
        glassFill.addColorStop(1, themeColor.replace("1)", "0.08)"));
        ctx.fillStyle = glassFill;

        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.fill();

        // Draw glowing edge outline
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 1;
        ctx.shadowColor = themeColor;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();

        // Draw 3 orbiting nodes on the edges of the glass discs
        const nodeTheta = (time * (1.2 + l * 0.2) + l * 2.1) % (Math.PI * 2);
        const nodeX = Math.cos(nodeTheta) * ringRadius;
        const nodeZ = Math.sin(nodeTheta) * ringRadius;
        const nodeProj = project(nodeX, y3D, nodeZ);

        ctx.save();
        ctx.shadowColor = themeColor;
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(nodeProj.x, nodeProj.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Draw shockwave ripple on full stack alignment completion
      if (alignmentProgress.current > 0.96) {
        if (rippleOpacity === 0 && rippleRadius === 0) {
          rippleOpacity = 1;
          rippleRadius = 10;
        }
      }

      if (rippleOpacity > 0.01) {
        rippleRadius += 2.5;
        rippleOpacity -= 0.025;

        ctx.save();
        ctx.strokeStyle = themeColor.replace("1)", `${rippleOpacity * 0.7})`);
        ctx.lineWidth = 1.2;
        ctx.beginPath();

        // Dotted circular flat ripple ring on X-Z plane
        for (let theta = 0; theta <= Math.PI * 2 + 0.1; theta += 0.15) {
          const rx = Math.cos(theta) * rippleRadius;
          const rz = Math.sin(theta) * rippleRadius;
          const proj = project(rx, 0, rz);
          if (theta === 0) {
            ctx.moveTo(proj.x, proj.y);
          } else {
            ctx.lineTo(proj.x, proj.y);
          }
        }
        ctx.stroke();
        ctx.restore();
      } else {
        // Reset ripple cache when unaligned/re-scanned
        if (alignmentProgress.current < 0.2) {
          rippleRadius = 0;
          rippleOpacity = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedTab, isScanning]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[620px] bg-[var(--bg-elevated)]/40 border border-[var(--border-subtle)] rounded-[6px] p-5 flex flex-col gap-4 relative backdrop-blur-md shadow-2xl select-none"
    >
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5 z-10">
        <div className="flex items-center gap-2">
          <Shield 
            className="w-4 h-4 transition-colors duration-300" 
            style={{ color: frameworksData[selectedTab].accentColor }} 
          />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--text-primary)]">
            KINETIC POSTURE STACK
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[7px] text-[var(--text-tertiary)] uppercase font-bold">
          <span>ALIGNED METRICS</span>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 items-stretch z-10 min-h-[300px]">
        
        {/* Left: 3D Kinetic Canvas Panel */}
        <div className="relative w-full h-[300px] bg-black/30 rounded-[3px] border border-[var(--border-subtle)] overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
          
          {/* Subtle canvas overlays */}
          <div className="absolute top-3 left-3 text-left pointer-events-none font-mono text-[7px] text-[rgba(245,245,245,0.3)] uppercase tracking-wider flex flex-col gap-0.5">
            <span>Projection: 3D Kinetic Glass</span>
            <span>Motion: Orbital floating</span>
          </div>

          <div className="absolute bottom-3 left-3 pointer-events-none font-mono text-[6px] text-[rgba(245,245,245,0.35)] uppercase">
            [ Drag cursor to rotate parallax ]
          </div>
        </div>

        {/* Right: Modern Clean HUD outcome details */}
        <div className="flex flex-col justify-between gap-4">
          
          {/* Framework Tab selectors */}
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[7px] uppercase tracking-widest text-[var(--text-tertiary)] font-bold text-left">
              Framework compliance Standard
            </span>
            <div className="flex flex-wrap gap-1">
              {Object.keys(frameworksData).map((tab) => {
                const isActive = selectedTab === tab;
                const fw = frameworksData[tab];
                return (
                  <button
                    key={tab}
                    onClick={() => !isScanning && setSelectedTab(tab)}
                    disabled={isScanning}
                    className={`font-mono text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded-[2px] border transition-all duration-300 ${
                      isActive
                        ? "text-black bg-white border-white"
                        : "text-[var(--text-tertiary)] border-zinc-800/60 hover:text-[var(--text-secondary)] hover:border-zinc-700/60 disabled:opacity-40"
                    }`}
                    style={{
                      boxShadow: isActive ? `0 0 10px ${fw.accentColor.replace("1)", "0.3)")}` : "none"
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clean compliance score status banner */}
          <div 
            className="flex items-center gap-4 bg-zinc-950/20 border rounded-[4px] p-3 transition-all duration-500"
            style={{ borderColor: frameworksData[selectedTab].accentColor.replace("1)", "0.2)") }}
          >
            <div 
              className="relative w-12 h-12 flex items-center justify-center border border-dashed rounded-full transition-colors duration-300"
              style={{ borderColor: frameworksData[selectedTab].accentColor.replace("1)", "0.3)") }}
            >
              <span className="font-serif text-[13px] font-bold text-white transition-all duration-300">
                {currentScore}%
              </span>
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="font-serif text-[11px] font-bold text-white uppercase leading-none">
                {frameworksData[selectedTab].title}
              </span>
              <span className="font-mono text-[7px] tracking-wider text-[var(--text-tertiary)] uppercase mt-1">
                Security compliance rating
              </span>
            </div>
          </div>

          {/* Simple outcomes checkbox summary */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-mono text-[7px] uppercase tracking-wider text-[var(--text-tertiary)] font-bold text-left border-b border-[var(--border-subtle)] pb-1">
              Security Outcomes Verified
            </span>
            <div className="flex flex-col gap-2 mt-1 w-full">
              {frameworksData[selectedTab].outcomes.map((outcome, idx) => {
                const isChecked = outcomeStates[idx];
                return (
                  <div key={idx} className="flex items-start gap-2.5 text-left">
                    <div 
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border shrink-0 transition-all duration-300 ${
                        isChecked
                          ? "bg-green-500/10 border-green-500/30 text-green-400"
                          : "bg-zinc-800/10 border-zinc-700/30 text-zinc-500"
                      }`}
                    >
                      {isChecked ? (
                        <Check className="w-2.5 h-2.5 stroke-[3px]" />
                      ) : (
                        <span className="w-1 h-1 bg-zinc-600 rounded-full" />
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className={`font-serif text-[10px] uppercase font-bold tracking-wide transition-colors duration-300 ${
                        isChecked ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"
                      }`}>
                        {outcome.label}
                      </span>
                      <span className="font-sans text-[9px] text-[var(--text-secondary)] leading-normal">
                        {outcome.detail}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trigger Scan Button */}
          <button
            onClick={() => !isScanning && triggerPostVerify(selectedTab)}
            disabled={isScanning}
            className={`w-full flex items-center justify-center gap-2 cursor-pointer font-mono text-[9px] font-bold uppercase tracking-wider py-2.5 border rounded-[3px] transition-all duration-300 ${
              isScanning
                ? "bg-zinc-950/20 text-zinc-600 border-zinc-800/40 cursor-not-allowed"
                : "bg-white text-black border-white hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)]"
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${isScanning ? "animate-spin" : ""}`} />
            <span>Verify Compliance Posture</span>
          </button>

        </div>

      </div>

      {/* HUD Footer description */}
      <div className="border-t border-[var(--border-subtle)] pt-2.5 text-left flex justify-between items-center font-mono text-[8px] text-[var(--text-tertiary)] z-10 leading-normal">
        <span className="italic max-w-[80%] leading-normal">
          * {frameworksData[selectedTab].description}
        </span>
        <span 
          className="font-bold uppercase tracking-wider transition-colors duration-300"
          style={{ color: frameworksData[selectedTab].accentColor }}
        >
          POSTURE COMPLIANT
        </span>
      </div>
    </div>
  );
}
