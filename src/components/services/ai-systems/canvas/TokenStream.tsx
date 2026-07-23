"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TOKEN_FRAGMENTS = [
  "tok", "<|", "|>", "sys", "usr", "rag", "llm", "api", "ctx", "emb",
  "vec", "att", "prm", "fnd", "val", "sec", "run", "out", "pld", "tkn",
  "enc", "dec", "mem", "sub", "raw", "ptr", "opt", "cfg", "jwt", "chk"
];

interface Token {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  baseOpacity: number;
  opacity: number;
  isFlashing: boolean;
  flashPhase: "none" | "hold" | "fade";
  flashStartTime: number;
}

export default function TokenStream() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let lastFrameTime = performance.now();

    const isMobile = window.innerWidth < 768;
    const tokenCount = isMobile ? 150 : 400;
    const targetFps = isMobile ? 24 : 30;
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

    // Initialize tokens
    const tokens: Token[] = Array.from({ length: tokenCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.05 + Math.random() * 0.25;
      const baseOp = isMobile
        ? 0.04 + Math.random() * 0.08
        : 0.06 + Math.random() * 0.12;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        text: TOKEN_FRAGMENTS[Math.floor(Math.random() * TOKEN_FRAGMENTS.length)],
        baseOpacity: baseOp,
        opacity: baseOp,
        isFlashing: false,
        flashPhase: "none",
        flashStartTime: 0,
      };
    });

    let currentFlashingIndex: number | null = null;
    let flashIntervalId: NodeJS.Timeout | null = null;

    if (!isReduced) {
      flashIntervalId = setInterval(() => {
        if (!isVisible) return;
        // Reset old flashing token if active
        if (currentFlashingIndex !== null && tokens[currentFlashingIndex]) {
          tokens[currentFlashingIndex].isFlashing = false;
          tokens[currentFlashingIndex].flashPhase = "none";
          tokens[currentFlashingIndex].opacity = tokens[currentFlashingIndex].baseOpacity;
        }

        // Pick one random token to flash
        const randomIndex = Math.floor(Math.random() * tokens.length);
        currentFlashingIndex = randomIndex;
        const t = tokens[randomIndex];
        t.isFlashing = true;
        t.flashPhase = "hold";
        t.opacity = 0.9;
        t.flashStartTime = performance.now();
      }, 3500);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

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
          // Update position
          t.x += t.vx;
          t.y += t.vy;

          if (t.x < -20) t.x = width + 20;
          if (t.x > width + 20) t.x = -20;
          if (t.y < -20) t.y = height + 20;
          if (t.y > height + 20) t.y = -20;

          // Update flash phase
          if (t.isFlashing) {
            const flashElapsed = now - t.flashStartTime;
            if (flashElapsed < 800) {
              t.opacity = 0.9;
            } else if (flashElapsed < 1200) {
              const progress = (flashElapsed - 800) / 400;
              t.opacity = 0.9 - progress * (0.9 - t.baseOpacity);
            } else {
              t.isFlashing = false;
              t.flashPhase = "none";
              t.opacity = t.baseOpacity;
              if (currentFlashingIndex === i) {
                currentFlashingIndex = null;
              }
            }
          }
        }

        // Draw token
        if (t.isFlashing) {
          ctx.fillStyle = "#00A3FF";
        } else {
          ctx.fillStyle = `rgba(245, 241, 232, ${t.opacity})`;
        }
        ctx.fillText(t.text, t.x, t.y);
      }

      if (!isReduced) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (flashIntervalId) clearInterval(flashIntervalId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [isReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none w-full h-full"
    />
  );
}
