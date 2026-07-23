"use client";

import React, { useEffect, useState, useRef } from "react";
import { attackLayers } from "@/data/aiSystems";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AIArchitectureGraph() {
  const isReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<"idle" | "path" | "nodes" | "vectors" | "complete">(
    isReduced ? "complete" : "idle"
  );
  const [activePulseIndex, setActivePulseIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isReduced) {
      setPhase("complete");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === "idle") {
          setPhase("path");

          // Sequence:
          // 0ms: path begins drawing
          // 400ms: nodes start materializing
          // 2400ms: attack vectors branch & diamonds pulse
          // 2800ms: complete phase -> start idle pulse
          const t1 = setTimeout(() => setPhase("nodes"), 400);
          const t2 = setTimeout(() => setPhase("vectors"), 2200);
          const t3 = setTimeout(() => setPhase("complete"), 2800);

          return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
          };
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [phase, isReduced]);

  // Idle pulse loop after completion
  useEffect(() => {
    if (phase !== "complete" || isReduced) return;

    let lastIndex = -1;
    const interval = setInterval(() => {
      let nextIndex = Math.floor(Math.random() * attackLayers.length);
      while (nextIndex === lastIndex) {
        nextIndex = Math.floor(Math.random() * attackLayers.length);
      }
      lastIndex = nextIndex;

      setActivePulseIndex(nextIndex);
      setTimeout(() => {
        setActivePulseIndex(null);
      }, 1200);
    }, 2800);

    return () => clearInterval(interval);
  }, [phase, isReduced]);

  const svgWidth = 460;
  const svgHeight = 560;
  const mainX = 140;
  const startY = 40;
  const endY = 520;
  const stepY = (endY - startY) / (attackLayers.length - 1);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center items-center py-4 select-none relative"
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full max-w-[500px] h-auto overflow-visible font-mono"
      >
        <defs>
          <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00A3FF" stopOpacity="0.2" />
          </linearGradient>
          <filter id="neonFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Main vertical path line */}
        <line
          x1={mainX}
          y1={startY}
          x2={mainX}
          y2={endY}
          stroke="rgba(245, 241, 232, 0.4)"
          strokeWidth="1.5"
          strokeDasharray={endY - startY}
          strokeDashoffset={
            phase === "idle" ? endY - startY : 0
          }
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />

        {/* 2. Nodes & Attack vectors */}
        {attackLayers.map((layer, idx) => {
          const cy = startY + idx * stepY;
          const isNodeVisible =
            phase === "nodes" || phase === "vectors" || phase === "complete";
          const isVectorVisible =
            phase === "vectors" || phase === "complete";

          const branchEndX = mainX + 90;
          const branchEndY = cy + 20;

          const isPulsing = activePulseIndex === idx;

          return (
            <g key={layer.id} className="transition-all duration-300">
              {/* Attack Vector Branch Line */}
              <path
                d={`M ${mainX + 45} ${cy} L ${branchEndX - 15} ${branchEndY} L ${branchEndX} ${branchEndY}`}
                fill="none"
                stroke={isPulsing ? "#00A3FF" : "rgba(245, 241, 232, 0.25)"}
                strokeWidth="1"
                strokeDasharray="200"
                strokeDashoffset={isVectorVisible ? 0 : 200}
                className="transition-all duration-500 ease-out"
                style={{ opacity: isVectorVisible ? 1 : 0 }}
              />

              {/* Diamond Marker */}
              {isVectorVisible && (
                <g
                  transform={`translate(${branchEndX}, ${branchEndY})`}
                  className="transition-all duration-300"
                >
                  <polygon
                    points="0,-5 5,0 0,5 -5,0"
                    fill={isPulsing ? "#00A3FF" : "var(--bg-elevated)"}
                    stroke={isPulsing ? "#00A3FF" : "rgba(245, 241, 232, 0.4)"}
                    strokeWidth="1"
                    filter={isPulsing ? "url(#neonFilter)" : undefined}
                    className={`transition-all duration-500 ${
                      isPulsing ? "scale-125" : "scale-100"
                    }`}
                  />
                  {/* Threat Label */}
                  <text
                    x="12"
                    y="3"
                    fill={isPulsing ? "#00A3FF" : "var(--text-tertiary)"}
                    fontSize="8"
                    letterSpacing="0.08em"
                    className="transition-colors duration-300 font-mono font-medium"
                  >
                    {layer.threat}
                  </text>
                </g>
              )}

              {/* Node Pill Capsule */}
              <g
                transform={`translate(${mainX}, ${cy})`}
                style={{
                  opacity: isNodeVisible ? 1 : 0,
                  transform: `translate(${mainX}px, ${cy}px) scale(${
                    isNodeVisible ? 1 : 0.4
                  })`,
                  transition: `all 400ms ease-out ${idx * 80}ms`,
                }}
              >
                <rect
                  x="-55"
                  y="-11"
                  width="110"
                  height="22"
                  rx="11"
                  fill="var(--bg-elevated)"
                  stroke="rgba(245, 241, 232, 0.2)"
                  strokeWidth="0.8"
                />

                {/* Node Center Label */}
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  fill="var(--text-tertiary)"
                  fontSize="8.5"
                  letterSpacing="0.06em"
                  className="font-mono font-semibold uppercase"
                >
                  {layer.label}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
