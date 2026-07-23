"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Dot {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  targetOpacity: number;
  targetRadius: number;
  isSurviving: boolean;
  waveGroup: number; // 0 to 4
}

export default function ValidationField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isReduced = useReducedMotion();
  const [filteringDone, setFilteringDone] = useState(isReduced);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = Math.max(340, Math.min(500, window.innerHeight * 0.5));
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const totalDots = 847;
    const survivingCount = 12;

    // Pick 12 random indices to survive
    const indices = Array.from({ length: totalDots }, (_, i) => i);
    // Shuffle indices
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const survivingSet = new Set(indices.slice(0, survivingCount));

    const dots: Dot[] = Array.from({ length: totalDots }, (_, i) => {
      const isSurviving = survivingSet.has(i);
      const waveGroup = Math.floor(Math.random() * 5);

      return {
        x: 30 + Math.random() * (width - 60),
        y: 30 + Math.random() * (height - 60),
        radius: isReduced && isSurviving ? 5 : 3,
        opacity: isReduced ? (isSurviving ? 1.0 : 0.03) : 0.25,
        targetOpacity: isSurviving ? 1.0 : 0.03,
        targetRadius: isSurviving ? 5 : 3,
        isSurviving,
        waveGroup,
      };
    });

    let pulseRadius = 0;
    let pulseOpacity = 0;
    let startTime = 0;
    let animationStarted = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStarted && !isReduced) {
          animationStarted = true;
          startTime = performance.now();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(canvas);

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      const elapsed = animationStarted ? now - startTime : 0;

      // Draw dots
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        if (animationStarted && !isReduced) {
          // Wave timing: 1.5s delay before filtering starts
          if (elapsed > 1500) {
            const waveDelay = 1500 + d.waveGroup * 200;
            if (elapsed >= waveDelay) {
              const progress = Math.min(1, (elapsed - waveDelay) / 500);
              // Interpolate opacity and radius
              d.opacity = 0.25 + progress * (d.targetOpacity - 0.25);
              if (d.isSurviving) {
                d.radius = 3 + progress * (d.targetRadius - 3);
              }
            }
          }

          // Trigger ring pulse after filtering completes (~2.7s)
          if (elapsed > 2700 && elapsed < 3900) {
            const ringProgress = (elapsed - 2700) / 1200;
            pulseRadius = ringProgress * (Math.max(width, height) * 0.5);
            pulseOpacity = 1 - ringProgress;
          } else if (elapsed >= 3900) {
            pulseOpacity = 0;
            setFilteringDone(true);
          }
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        if (d.isSurviving && (isReduced || (animationStarted && elapsed > 2300))) {
          ctx.fillStyle = "#00A3FF";
          ctx.shadowColor = "#00A3FF";
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = `rgba(245, 241, 232, ${d.opacity})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }

      // Draw center ring pulse during animation phase
      if (pulseOpacity > 0 && !isReduced) {
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 163, 255, ${pulseOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#00A3FF";
        ctx.shadowBlur = 12;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [isReduced]);

  return (
    <div className="w-full flex flex-col items-center justify-center select-none relative my-6">
      <canvas
        ref={canvasRef}
        className="w-full max-w-[1000px] h-[340px] md:h-[420px] rounded-lg border border-[rgba(245,241,232,0.08)] bg-[var(--bg-elevated)]/30 backdrop-blur-sm"
      />
    </div>
  );
}
