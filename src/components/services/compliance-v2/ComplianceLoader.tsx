"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ComplianceLoader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    // Check session storage
    if (typeof window !== "undefined") {
      const visited = sessionStorage.getItem("compliance-visited");
      if (visited === "true" || isReduced) {
        setVisible(false);
        onComplete();
        return;
      }
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high-DPI scaling
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.scale(dpr, dpr);

    let animationFrameId: number;
    const startTime = performance.now();
    const duration = 1400; // time in ms for drawing

    // Draw coordinate points for three interconnected wireframe node structures
    const nodes = [
      { x: width * 0.5, y: height * 0.4 },
      { x: width * 0.43, y: height * 0.52 },
      { x: width * 0.57, y: height * 0.52 },
    ];

    const draw = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, width, height);

      // Set grid background
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw thin white wireframe lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = 1.2;

      // Draw lines between nodes based on progress
      // Line 1: Node 0 to Node 1
      if (progress > 0) {
        const p1 = Math.min(progress * 2, 1);
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(
          nodes[0].x + (nodes[1].x - nodes[0].x) * p1,
          nodes[0].y + (nodes[1].y - nodes[0].y) * p1
        );
        ctx.stroke();
      }

      // Line 2: Node 1 to Node 2
      if (progress > 0.3) {
        const p2 = Math.min((progress - 0.3) * 2, 1);
        ctx.beginPath();
        ctx.moveTo(nodes[1].x, nodes[1].y);
        ctx.lineTo(
          nodes[1].x + (nodes[2].x - nodes[1].x) * p2,
          nodes[1].y + (nodes[2].y - nodes[1].y) * p2
        );
        ctx.stroke();
      }

      // Line 3: Node 2 to Node 0
      if (progress > 0.6) {
        const p3 = Math.min((progress - 0.6) * 2.5, 1);
        ctx.beginPath();
        ctx.moveTo(nodes[2].x, nodes[2].y);
        ctx.lineTo(
          nodes[2].x + (nodes[0].x - nodes[2].x) * p3,
          nodes[2].y + (nodes[0].y - nodes[2].y) * p3
        );
        ctx.stroke();
      }

      // Draw node dots
      nodes.forEach((node, index) => {
        let nodeProgress = 0;
        if (index === 0) nodeProgress = progress;
        if (index === 1) nodeProgress = Math.max(0, progress - 0.3);
        if (index === 2) nodeProgress = Math.max(0, progress - 0.6);

        if (nodeProgress > 0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(nodeProgress * 3, 1)})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(nodeProgress * 1.5, 0.15)})`;
          ctx.stroke();
        }
      });

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(draw);
      } else {
        // Trigger clip-path text reveal in CSS
        if (textRef.current) {
          textRef.current.classList.add("text-revealed");
        }

        // Finish loader after text reveal completes
        setTimeout(() => {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("compliance-visited", "true");
          }
          setVisible(false);
          onComplete();
        }, 850);
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete, isReduced]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-[#060606] z-[9999] flex flex-col justify-center items-center select-none pointer-events-none transition-opacity duration-500">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block bg-transparent" />
      
      {/* Clip-path reveal container */}
      <div 
        ref={textRef} 
        className="absolute top-[58%] text-center opacity-0 transform translate-y-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col items-center justify-center text-revealed-style"
      >
        <span className="font-mono text-[11px] font-bold text-white tracking-[0.3em] uppercase block">
          ENTERSOFT SECURITY
        </span>
        <span className="font-serif text-3xl font-bold text-white tracking-[0.05em] uppercase block mt-1">
          COMPLIANCE
        </span>
      </div>

      <style jsx global>{`
        .text-revealed-style {
          clip-path: inset(100% 0 0 0);
          transition: clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s, transform 0.8s;
        }
        .text-revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
          clip-path: inset(0 0 0 0) !important;
        }
      `}</style>
    </div>
  );
}
