"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Node {
  id: string;
  label: string;
  category: "core" | "control" | "mandate" | "evidence" | "party";
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  active: boolean;
}

interface Edge {
  from: string;
  to: string;
  style: "solid" | "dashed";
  flowOffset: number;
}

export default function DT5_GovernanceTopologyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Node definitions positioned relative to a normalized 1000x600 space
    const initialNodes: Node[] = [
      { id: "org", label: "ORGANIZATION", category: "core", x: 500, y: 300, baseX: 500, baseY: 300, vx: 0, vy: 0, radius: 28, pulsePhase: 0, active: true },
      { id: "controls", label: "SECURITY CONTROLS", category: "control", x: 320, y: 190, baseX: 320, baseY: 190, vx: 0, vy: 0, radius: 20, pulsePhase: 1.2, active: true },
      { id: "cloud", label: "CLOUD ESTATE", category: "control", x: 680, y: 190, baseX: 680, baseY: 190, vx: 0, vy: 0, radius: 20, pulsePhase: 2.1, active: true },
      { id: "identity", label: "IAM & IDENTITY", category: "control", x: 230, y: 330, baseX: 230, baseY: 330, vx: 0, vy: 0, radius: 18, pulsePhase: 0.8, active: true },
      { id: "data", label: "DATA & PRIVACY", category: "control", x: 770, y: 330, baseX: 770, baseY: 330, vx: 0, vy: 0, radius: 18, pulsePhase: 3.4, active: true },
      { id: "regulations", label: "REGULATORY MANDATES", category: "mandate", x: 500, y: 100, baseX: 500, baseY: 100, vx: 0, vy: 0, radius: 22, pulsePhase: 1.7, active: true },
      { id: "evidence", label: "EVIDENCE VAULT", category: "evidence", x: 500, y: 480, baseX: 500, baseY: 480, vx: 0, vy: 0, radius: 22, pulsePhase: 2.9, active: true },
      { id: "registrars", label: "EXTERNAL AUDITORS", category: "party", x: 300, y: 460, baseX: 300, baseY: 460, vx: 0, vy: 0, radius: 18, pulsePhase: 0.5, active: true },
      { id: "vendors", label: "THIRD-PARTY VENDORS", category: "party", x: 700, y: 460, baseX: 700, baseY: 460, vx: 0, vy: 0, radius: 18, pulsePhase: 4.1, active: true },
    ];

    const edges: Edge[] = [
      { from: "regulations", to: "org", style: "solid", flowOffset: 0 },
      { from: "regulations", to: "controls", style: "dashed", flowOffset: 0.3 },
      { from: "org", to: "controls", style: "solid", flowOffset: 0.5 },
      { from: "org", to: "cloud", style: "solid", flowOffset: 0.2 },
      { from: "controls", to: "identity", style: "solid", flowOffset: 0.7 },
      { from: "cloud", to: "data", style: "solid", flowOffset: 0.4 },
      { from: "identity", to: "evidence", style: "dashed", flowOffset: 0.1 },
      { from: "data", to: "evidence", style: "dashed", flowOffset: 0.6 },
      { from: "controls", to: "evidence", style: "solid", flowOffset: 0.8 },
      { from: "cloud", to: "evidence", style: "solid", flowOffset: 0.9 },
      { from: "org", to: "evidence", style: "solid", flowOffset: 0 },
      { from: "evidence", to: "registrars", style: "solid", flowOffset: 0.4 },
      { from: "org", to: "vendors", style: "dashed", flowOffset: 0.2 },
      { from: "vendors", to: "evidence", style: "dashed", flowOffset: 0.7 },
    ];

    const nodes = initialNodes;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Pause rendering when canvas is outside viewport
    const intersectionObserver = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });
    intersectionObserver.observe(container);

    // Mouse tracking for subtle interactive float
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      setHoveredNode(null);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Coordinate scaling factor based on container dimensions
      const scaleX = width / 1000;
      const scaleY = height / 600;
      const scale = Math.min(scaleX, scaleY);
      const offsetX = (width - 1000 * scale) / 2;
      const offsetY = (height - 600 * scale) / 2;

      // Update node physics
      let currentHover: string | null = null;

      nodes.forEach((node) => {
        const targetX = node.baseX * scale + offsetX;
        const targetY = node.baseY * scale + offsetY;

        if (!isReduced) {
          // Micro floating oscillation
          const floatX = Math.sin(time * 0.001 + node.pulsePhase) * 3;
          const floatY = Math.cos(time * 0.0012 + node.pulsePhase) * 3;

          // Mouse proximity reaction
          const dx = mouseX - (node.x || targetX);
          const dy = mouseY - (node.y || targetY);
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            currentHover = node.label;
            const push = (80 - dist) * 0.08;
            node.x = targetX - (dx / dist) * push;
            node.y = targetY - (dy / dist) * push;
          } else {
            node.x = targetX + floatX;
            node.y = targetY + floatY;
          }
        } else {
          node.x = targetX;
          node.y = targetY;
        }
      });

      if (currentHover !== hoveredNode) {
        setHoveredNode(currentHover);
      }

      // Draw background grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 40 * scale;
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

      // Draw Edges
      edges.forEach((edge) => {
        const source = nodes.find((n) => n.id === edge.from);
        const target = nodes.find((n) => n.id === edge.to);
        if (!source || !target) return;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        if (edge.style === "dashed") {
          ctx.setLineDash([4 * scale, 4 * scale]);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 1;
        } else {
          ctx.setLineDash([]);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
          ctx.lineWidth = 1.2;
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated telemetry pulse particle flowing on the edge
        if (!isReduced) {
          const flowSpeed = 0.35;
          const progress = ((time * 0.0005 * flowSpeed + edge.flowOffset) % 1);
          const px = source.x + (target.x - source.x) * progress;
          const py = source.y + (target.y - source.y) * progress;

          ctx.beginPath();
          ctx.arc(px, py, 2.5 * scale, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 163, 255, 0.85)";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, 5 * scale, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 163, 255, 0.2)";
          ctx.fill();
        }
      });

      // Draw Nodes
      nodes.forEach((node) => {
        const radius = node.radius * scale;

        // Category-based coloring
        let fillBg = "#0e111a";
        let strokeColor = "rgba(255, 255, 255, 0.4)";
        let glowColor = "rgba(255, 255, 255, 0.05)";
        let textColor = "#f0f4ff";

        if (node.category === "core") {
          fillBg = "#0a1324";
          strokeColor = "rgba(0, 163, 255, 0.8)";
          glowColor = "rgba(0, 163, 255, 0.25)";
        } else if (node.category === "evidence") {
          fillBg = "#07172c";
          strokeColor = "rgba(96, 165, 250, 0.8)";
          glowColor = "rgba(96, 165, 250, 0.25)";
        } else if (node.category === "mandate") {
          fillBg = "#0b192e";
          strokeColor = "rgba(56, 189, 248, 0.8)";
          glowColor = "rgba(56, 189, 248, 0.2)";
        }

        // Ambient outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 8 * scale, 0, Math.PI * 2);
        ctx.fillStyle = glowColor;
        ctx.fill();

        // Base node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = fillBg;
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = node.category === "core" ? 2 : 1.2;
        ctx.stroke();

        // Inner decorative center dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3 * scale, 0, Math.PI * 2);
        ctx.fillStyle = strokeColor;
        ctx.fill();

        // Text label below node
        ctx.font = `700 ${Math.max(9, Math.round(9.5 * scale))}px JetBrains Mono, monospace`;
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(node.label, node.x, node.y + radius + 7 * scale);
      });

      if (!isReduced) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (!isReduced) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      render(performance.now());
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isReduced, hoveredNode]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[440px] lg:h-[500px] rounded-xl bg-[#07090e]/80 border border-white/[0.08] overflow-hidden flex items-center justify-center select-none shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />

      {/* Top telemetry status bar overlay */}
      <div className="absolute top-3 left-4 right-4 flex justify-between items-center pointer-events-none font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-zinc-400 font-bold">GOVERNANCE TOPOLOGY ACTIVE</span>
        </div>
        <span className="hidden sm:inline text-zinc-600">CONTROL CONNECTOR MATRIX — SAMPLE DATA</span>
      </div>

      {/* Bottom active inspection hint */}
      <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center pointer-events-none font-mono text-[8px] text-zinc-600 uppercase tracking-wider">
        <span>[ ISO 27001 • SOC 2 • GDPR • RBI ]</span>
        <span className="text-zinc-500">Continuous Telemetry Flow</span>
      </div>
    </div>
  );
}
