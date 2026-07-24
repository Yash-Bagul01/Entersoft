"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TrailChip {
  id: number;
  x: number;
  y: number;
  label: string;
  sub: string;
  rotation: number;
  opacity: number;
  scale: number;
}

const ABSTRACT_SIGNALS = [
  { label: "LOG_INGEST", sub: "10.0.1.22 → DC01" },
  { label: "EDR_FEED", sub: "CrowdStrike XDR" },
  { label: "DNS_TUNNEL", sub: "Query Anomaly" },
  { label: "IAM_AUDIT", sub: "MFA Bypass Alert" },
  { label: "WAF_BLOCK", sub: "API Injection" },
  { label: "C2_DETECT", sub: "Outbound TLS" },
];

export default function CursorImageTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<TrailChip[]>([]);
  const chipContainerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const lastMousePos = useRef({ x: 0, y: 0 });
  const chipIdCounter = useRef(0);

  useEffect(() => {
    if (isReduced || typeof window === "undefined") return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dist = Math.hypot(x - lastMousePos.current.x, y - lastMousePos.current.y);

      // Spawn a new chip every 55px of cursor movement
      if (dist > 55) {
        lastMousePos.current = { x, y };

        const signal = ABSTRACT_SIGNALS[chipIdCounter.current % ABSTRACT_SIGNALS.length];
        chipIdCounter.current++;

        const newChip: TrailChip = {
          id: chipIdCounter.current,
          x,
          y,
          label: signal.label,
          sub: signal.sub,
          rotation: (Math.random() - 0.5) * 16,
          opacity: 0.9,
          scale: 0.85 + Math.random() * 0.2,
        };

        chipsRef.current.push(newChip);
        // Keep max 6 trailing chips
        if (chipsRef.current.length > 6) {
          chipsRef.current.shift();
        }
      }
    };

    let rafId: number;
    const animate = () => {
      // Fade & shrink chips over time
      chipsRef.current = chipsRef.current
        .map((chip) => ({
          ...chip,
          opacity: chip.opacity - 0.018,
          scale: chip.scale - 0.005,
        }))
        .filter((chip) => chip.opacity > 0.05);

      if (chipContainerRef.current) {
        chipContainerRef.current.innerHTML = chipsRef.current
          .map(
            (c) => `
          <div style="
            position: absolute;
            left: ${c.x}px;
            top: ${c.y}px;
            transform: translate(-50%, -50%) rotate(${c.rotation}deg) scale(${c.scale});
            opacity: ${c.opacity};
            pointer-events: none;
            z-index: 15;
            background: rgba(8, 15, 28, 0.85);
            border: 1px solid rgba(77, 169, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.2);
            backdrop-filter: blur(8px);
            border-radius: 6px;
            padding: 6px 12px;
            display: flex;
            flex-direction: column;
            gap: 2px;
            white-space: nowrap;
            transition: opacity 0.1s linear;
          ">
            <span style="font-family: monospace; font-size: 9px; font-weight: 700; color: #38BDF8; letter-spacing: 0.1em;">${c.label}</span>
            <span style="font-family: sans-serif; font-size: 8px; color: rgba(238, 242, 255, 0.6);">${c.sub}</span>
          </div>
        `
          )
          .join("");
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isReduced]);

  if (isReduced) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10"
    >
      <div ref={chipContainerRef} className="w-full h-full relative" />
    </div>
  );
}
