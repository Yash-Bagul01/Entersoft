"use client";

import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number; // target x
  ty: number; // target y
  currentCluster: number;
  origTx: number; // original target x
  origTy: number; // original target y
}

export default function ParticleCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isReduced = useReducedMotion();
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    const numParticles = 1200; // Optimized particle count for buttery smooth 60fps even under throttling

    const generateParticles = (w: number, h: number) => {
      const arr: Particle[] = [];
      const centers = [
        { x: w * 0.22, y: h * 0.52 }, // AWS
        { x: w * 0.5, y: h * 0.38 },  // Azure
        { x: w * 0.78, y: h * 0.58 }, // GCP
      ];

      for (let i = 0; i < numParticles; i++) {
        // Initial random placement (chaos phase)
        const rx = Math.random() * w;
        const ry = Math.random() * h;

        // Assign target cluster
        const clusterIdx = i % 3;
        const center = centers[clusterIdx];

        // Target coordinates in Gaussian clusters
        const angle = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 1.6) * 65; // Spread radius
        const tx = center.x + Math.cos(angle) * r;
        const ty = center.y + Math.sin(angle) * r;

        arr.push({
          x: rx,
          y: ry,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          tx: tx,
          ty: ty,
          currentCluster: clusterIdx,
          origTx: tx,
          origTy: ty,
        });
      }
      return arr;
    };

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      
      // Regenerate target coordinates on screen resize
      particles = generateParticles(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (isReduced) {
      // Reduced motion: draw fixed clusters directly
      ctx.fillStyle = "rgba(245, 245, 245, 0.65)";
      particles.forEach((p) => {
        ctx.fillRect(p.tx, p.ty, 1.5, 1.5);
      });
      window.removeEventListener("resize", handleResize);
      return;
    }

    let animationFrameId: number;
    let startTime = document.timeline ? document.timeline.currentTime as number : Date.now();
    let isVisible = true;

    const render = (now: number) => {
      if (!isVisible || !isInView) {
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const elapsed = (now - startTime) / 1000; // in seconds

      ctx.fillStyle = "rgba(245, 245, 245, 0.6)";

      // Phase control parameters
      const isChaos = elapsed < 2.0;
      const isFormation = elapsed >= 2.0 && elapsed < 4.5;
      const isIdle = elapsed >= 4.5;

      particles.forEach((p) => {
        if (isChaos) {
          // Phase 1: Drift randomly
          p.x += p.vx;
          p.y += p.vy;

          // Screen bounds bounce
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        } else if (isFormation) {
          // Phase 2: Lerp to target clusters (spring physics look)
          p.x += (p.tx - p.x) * 0.075;
          p.y += (p.ty - p.y) * 0.075;
        } else if (isIdle) {
          // Phase 3: Cluster micro-drift and random cross-cluster data flow
          const wanderX = (Math.random() - 0.5) * 0.28;
          const wanderY = (Math.random() - 0.5) * 0.28;
          
          p.x += (p.tx + wanderX - p.x) * 0.05;
          p.y += (p.ty + wanderY - p.y) * 0.05;

          // Occasional cluster swap representing data routing (1 in 8000 chance per frame)
          if (Math.random() < 0.00012) {
            const nextCluster = (p.currentCluster + 1) % 3;
            const centers = [
              { x: width * 0.22, y: height * 0.52 },
              { x: width * 0.5, y: height * 0.38 },
              { x: width * 0.78, y: height * 0.58 },
            ];
            const center = centers[nextCluster];
            const angle = Math.random() * Math.PI * 2;
            const r = Math.pow(Math.random(), 1.6) * 65;
            
            p.tx = center.x + Math.cos(angle) * r;
            p.ty = center.y + Math.sin(angle) * r;
            p.currentCluster = nextCluster;
          }
        }

        ctx.fillRect(p.x, p.y, 1.5, 1.5);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver to pause when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (isVisible && !wasVisible && isInView) {
            // Restart loop when returning to viewport
            startTime = document.timeline ? document.timeline.currentTime as number : Date.now();
            animationFrameId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    if (isInView && isVisible) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [isInView, isReduced]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[360px] relative z-10 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
    </div>
  );
}
