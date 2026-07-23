"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { Filter, CheckCircle2, AlertTriangle, RefreshCw, Zap } from "lucide-react";

export default function AnimeTelemetryVisual() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scanLineRef = useRef<HTMLDivElement | null>(null);
  const countRawRef = useRef<HTMLSpanElement | null>(null);
  const countThreatsRef = useRef<HTMLSpanElement | null>(null);
  const countNoiseRef = useRef<HTMLSpanElement | null>(null);
  const [animationPhase, setAnimationPhase] = useState<string>("Auditing Raw Inference Telemetry...");

  useEffect(() => {
    if (!containerRef.current) return;

    const dotsContainer = containerRef.current.querySelector(".dots-grid");
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";
    const totalDots = 48;
    const threatIndices = [4, 12, 19, 23, 28, 31, 35, 41, 44]; // Survived threats

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("div");
      const isThreat = threatIndices.includes(i);
      dot.className = `signal-dot w-4 h-4 rounded-full border transition-colors flex items-center justify-center ${
        isThreat
          ? "threat-dot bg-amber-400/80 border-amber-300"
          : "raw-dot bg-white/20 border-white/10"
      }`;
      dot.setAttribute("data-threat", isThreat ? "true" : "false");
      dotsContainer.appendChild(dot);
    }

    // Anime.js v4 animate calls
    const anim1 = animate(".signal-dot", {
      scale: [0.6, 1],
      opacity: [0.3, 0.8],
      delay: stagger(30, { start: 100 }),
      duration: 800,
      ease: "outQuad",
    });

    let anim2: any;
    if (scanLineRef.current) {
      anim2 = animate(scanLineRef.current, {
        left: ["0%", "100%"],
        duration: 2000,
        ease: "inOutExpo",
        loop: true,
        onLoop: () => setAnimationPhase("Anime.js Hybrid Triage Scanning..."),
      });
    }

    const anim3 = animate(".raw-dot", {
      opacity: [0.8, 0.08],
      scale: [1, 0.5],
      duration: 1200,
      delay: 800,
      ease: "outQuad",
    });

    const anim4 = animate(".threat-dot", {
      scale: [1, 1.4, 1.2],
      backgroundColor: "#10b981",
      borderColor: "#34d399",
      boxShadow: "0 0 15px #10b981",
      duration: 1000,
      delay: 1000,
      onComplete: () => setAnimationPhase("98.6% Noise Eliminated — 12 Validated Threats Confirmed"),
    });

    // Counter animation
    const counterObj = { raw: 0, threats: 0, noise: 0 };
    const anim5 = animate(counterObj, {
      raw: 847,
      threats: 12,
      noise: 98.6,
      duration: 1600,
      ease: "outSine",
      onUpdate: () => {
        if (countRawRef.current) countRawRef.current.innerText = `${Math.round(counterObj.raw)}`;
        if (countThreatsRef.current) countThreatsRef.current.innerText = `${Math.round(counterObj.threats)}`;
        if (countNoiseRef.current) countNoiseRef.current.innerText = `${counterObj.noise.toFixed(1)}%`;
      },
    });

    return () => {
      anim1?.pause();
      anim2?.pause();
      anim3?.pause();
      anim4?.pause();
      anim5?.pause();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center gap-8 my-4 select-none">
      {/* Anime.js Visual Matrix Container */}
      <div className="relative w-full max-w-[1000px] h-[340px] md:h-[380px] rounded-2xl bg-black/70 border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(0,163,255,0.08)]">
        {/* Ambient Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Anime.js Scanning Beam */}
        <div
          ref={scanLineRef}
          className="absolute top-0 bottom-0 w-1.5 bg-gradient-to-r from-[#00A3FF] via-[#00A3FF] to-emerald-400 shadow-[0_0_25px_#00A3FF] z-20 pointer-events-none"
        />

        {/* Top Phase Status Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00A3FF]/15 border border-[#00A3FF]/40 flex items-center justify-center text-[#00A3FF]">
              <Filter className="w-4 h-4" />
            </div>
            <span className="font-mono text-xs text-[#00A3FF] font-bold uppercase tracking-wider">
              {animationPhase}
            </span>
          </div>

          <span className="font-mono text-[10px] px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/60">
            ANIME.JS TIMELINE ENGINE
          </span>
        </div>

        {/* Center Signal Dots Grid */}
        <div className="relative z-10 dots-grid grid grid-cols-8 md:grid-cols-12 gap-4 md:gap-6 items-center justify-items-center py-6" />

        {/* Bottom Bar */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-sans text-xs text-white/80 font-medium">
              Human-in-the-Loop Analyst Verification Active
            </span>
          </div>

          <span className="font-mono text-xs text-emerald-400 font-bold">
            0.0% FALSE POSITIVES
          </span>
        </div>
      </div>

      {/* 4-Stat Metric Counter Grid */}
      <div className="w-full max-w-[1000px] grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
        <div className="p-5 rounded-2xl bg-[#0B0F17] border border-white/10 flex flex-col items-center gap-1">
          <span ref={countRawRef} className="font-serif text-3xl md:text-4xl font-bold text-[#F6F5F0]">
            847
          </span>
          <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
            RAW SIGNALS AUDITED
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B0F17] border border-white/10 flex flex-col items-center gap-1">
          <span ref={countThreatsRef} className="font-serif text-3xl md:text-4xl font-bold text-[#00A3FF]">
            12
          </span>
          <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
            VALIDATED THREATS
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B0F17] border border-white/10 flex flex-col items-center gap-1">
          <span ref={countNoiseRef} className="font-serif text-3xl md:text-4xl font-bold text-emerald-400">
            98.6%
          </span>
          <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
            NOISE ELIMINATED
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B0F17] border border-white/10 flex flex-col items-center gap-1">
          <span className="font-serif text-3xl md:text-4xl font-bold text-emerald-400">
            0.0%
          </span>
          <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
            FALSE POSITIVES
          </span>
        </div>
      </div>
    </div>
  );
}
