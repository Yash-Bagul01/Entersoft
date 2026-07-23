"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const AMBIENT_FRAGMENTS = [
  "tok", "<|", "|>", "sys", "usr", "rag", "llm", "api", "ctx", "emb",
  "vec", "att", "prm", "fnd", "val", "sec", "run", "out", "pld", "tkn"
];

interface AmbientToken {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  opacity: number;
}

export default function TokenStreamAmbient() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    // Disable on mobile completely per performance budget
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let lastFrameTime = performance.now();
    const targetFps = 30;
    const frameInterval = 1000 / targetFps;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize 80 low-density ambient tokens
    const tokens: AmbientToken[] = Array.from({ length: 80 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.04 + Math.random() * 0.15;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        text: AMBIENT_FRAGMENTS[Math.floor(Math.random() * AMBIENT_FRAGMENTS.length)],
        opacity: 0.03 + Math.random() * 0.05,
      };
    });

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = (now: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const elapsed = now - lastFrameTime;
      if (elapsed < frameInterval && !isReduced) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = now - (elapsed % frameInterval);

      ctx.clearRect(0, 0, width, height);
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.textBaseline = "middle";

      for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];

        if (!isReduced) {
          t.x += t.vx;
          t.y += t.vy;

          if (t.x < -20) t.x = width + 20;
          if (t.x > width + 20) t.x = -20;
          if (t.y < -20) t.y = height + 20;
          if (t.y > height + 20) t.y = -20;
        }

        ctx.fillStyle = `rgba(245, 241, 232, ${t.opacity})`;
        ctx.fillText(t.text, t.x, t.y);
      }

      if (!isReduced) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", resize);
    };
  }, [isReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full hidden md:block"
    />
  );
}
