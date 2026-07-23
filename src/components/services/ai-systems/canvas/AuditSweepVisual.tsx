"use client";

import React, { useEffect, useRef, useState } from "react";
import { attackLayers } from "@/data/aiSystems";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AuditSweepVisual() {
  const isReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const beamRef = useRef<SVGLineElement | null>(null);
  const [scanY, setScanY] = useState(isReduced ? 600 : 0);

  useEffect(() => {
    if (typeof window === "undefined" || isReduced) {
      setScanY(600);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const isTouch = window.innerWidth < 768;
    if (isTouch) {
      setScanY(600);
      return;
    }

    // Bind GSAP scrub on container scroll progress
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 65%",
        end: "bottom 35%",
        scrub: 1,
        onUpdate: (self) => {
          // Progress from 0 to 1 translates to scanY from 0 to 560
          setScanY(self.progress * 560);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isReduced]);

  const svgWidth = 480;
  const svgHeight = 560;
  const mainX = 140;
  const startY = 40;
  const endY = 520;
  const stepY = (endY - startY) / (attackLayers.length - 1);

  // Active threat indices: 0 (PROMPT INJECTION) and 4 (RAG POISONING)
  const activeFindingIndices = new Set([0, 4]);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col justify-center items-center py-4 select-none relative"
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full max-w-[500px] h-auto overflow-visible font-mono"
      >
        <defs>
          <filter id="beamGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Vertical architecture main line */}
        <line
          x1={mainX}
          y1={startY}
          x2={mainX}
          y2={endY}
          stroke="rgba(245, 241, 232, 0.3)"
          strokeWidth="1.5"
        />

        {/* Nodes & Vectors */}
        {attackLayers.map((layer, idx) => {
          const cy = startY + idx * stepY;
          const isPassed = scanY >= cy || isReduced;
          const isActiveFinding = activeFindingIndices.has(idx);

          const branchEndX = mainX + 90;
          const branchEndY = cy + 20;

          return (
            <g key={layer.id}>
              {/* Attack Vector Branch Line */}
              <path
                d={`M ${mainX + 45} ${cy} L ${branchEndX - 15} ${branchEndY} L ${branchEndX} ${branchEndY}`}
                fill="none"
                stroke={
                  isPassed
                    ? isActiveFinding
                      ? "#00A3FF"
                      : "rgba(245, 241, 232, 0.1)"
                    : "rgba(245, 241, 232, 0.25)"
                }
                strokeWidth="1"
                className="transition-colors duration-300"
              />

              {/* Diamond Marker & Finding Indicator */}
              <g transform={`translate(${branchEndX}, ${branchEndY})`}>
                <polygon
                  points="0,-5 5,0 0,5 -5,0"
                  fill={
                    isPassed && isActiveFinding
                      ? "#00A3FF"
                      : "var(--bg-elevated)"
                  }
                  stroke={
                    isPassed
                      ? isActiveFinding
                        ? "#00A3FF"
                        : "rgba(245, 241, 232, 0.15)"
                      : "rgba(245, 241, 232, 0.4)"
                  }
                  strokeWidth="1"
                  className="transition-all duration-300"
                />

                {/* Finding label */}
                <text
                  x="12"
                  y="3"
                  fill={
                    isPassed
                      ? isActiveFinding
                        ? "#00A3FF"
                        : "rgba(245, 241, 232, 0.3)"
                      : "var(--text-tertiary)"
                  }
                  fontSize="8"
                  letterSpacing="0.08em"
                  className="font-mono font-medium transition-colors duration-300"
                >
                  {layer.threat}
                </text>

                {/* Finding active alert '!' marker */}
                {isPassed && isActiveFinding && (
                  <text
                    x="-18"
                    y="3"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="bold"
                    className="font-mono animate-pulse"
                  >
                    !
                  </text>
                )}
              </g>

              {/* Node Pill */}
              <g transform={`translate(${mainX}, ${cy})`}>
                {/* Node Pill Capsule */}
                <rect
                  x="-55"
                  y="-11"
                  width="110"
                  height="22"
                  rx="11"
                  fill={
                    isPassed
                      ? "rgba(245, 241, 232, 0.12)"
                      : "var(--bg-elevated)"
                  }
                  stroke={
                    isPassed
                      ? "rgba(245, 241, 232, 0.6)"
                      : "rgba(245, 241, 232, 0.2)"
                  }
                  strokeWidth="0.8"
                  className="transition-all duration-300"
                />

                {/* Cleared checkmark indicator */}
                {isPassed && (
                  <text
                    x="-68"
                    y="3"
                    fill="#00A3FF"
                    fontSize="10"
                    fontWeight="bold"
                    className="font-mono"
                  >
                    ✓
                  </text>
                )}

                {/* Node Label */}
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  fill={isPassed ? "#F6F5F0" : "var(--text-tertiary)"}
                  fontSize="8.5"
                  letterSpacing="0.06em"
                  className="font-mono font-semibold uppercase transition-colors duration-300"
                >
                  {layer.label}
                </text>
              </g>
            </g>
          );
        })}

        {/* Horizontal Scan Beam Line */}
        {!isReduced && scanY > 0 && scanY < 550 && (
          <line
            ref={beamRef}
            x1="20"
            y1={scanY}
            x2={svgWidth - 20}
            y2={scanY}
            stroke="#00A3FF"
            strokeWidth="2"
            filter="url(#beamGlow)"
            className="pointer-events-none"
          />
        )}
      </svg>

      {/* Summary Data Callout below diagram */}
      <div className="mt-6 pt-4 border-t border-[rgba(245,241,232,0.08)] w-full max-w-[480px] flex items-center justify-between text-center font-mono text-[10px] md:text-xs text-[var(--text-tertiary)] tracking-wider">
        <span className="text-[#00A3FF] font-semibold">2 ACTIVE FINDINGS</span>
        <span className="opacity-40">|</span>
        <span className="text-[var(--text-secondary)]">6 CLEARED</span>
        <span className="opacity-40">|</span>
        <span className="text-[var(--text-secondary)]">0 FALSE POSITIVES</span>
      </div>
    </div>
  );
}
