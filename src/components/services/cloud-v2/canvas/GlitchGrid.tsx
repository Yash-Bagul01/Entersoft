"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "gsap";

interface GridCell {
  x: number;
  y: number;
  width: number;
  height: number;
  isMisconfigured: boolean;
  flashValue: number; // For laser sweep hit
  flickerOffset: number; // Staggered cycle
}

export default function GlitchGrid({ onTallyChange }: { onTallyChange?: (tally: number) => void }) {
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
    let cells: GridCell[] = [];
    const cellSize = 32;

    const generateGrid = (w: number, h: number) => {
      const arr: GridCell[] = [];
      const cols = Math.floor(w / cellSize);
      const rows = Math.floor(h / cellSize);

      // Select exactly 23 misconfigured indices randomly but deterministic
      const totalCells = cols * rows;
      const misconfigIndices = new Set<number>();
      
      if (totalCells > 25) {
        let seed = 1;
        while (misconfigIndices.size < 23 && misconfigIndices.size < totalCells) {
          const rand = Math.sin(seed++) * 10000;
          const index = Math.floor((rand - Math.floor(rand)) * totalCells);
          misconfigIndices.add(index);
        }
      } else {
        // Fallback for tiny screen dimensions
        for (let i = 0; i < Math.min(totalCells, 5); i++) {
          misconfigIndices.add(i);
        }
      }

      let index = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          arr.push({
            x: c * cellSize,
            y: r * cellSize,
            width: cellSize,
            height: cellSize,
            isMisconfigured: misconfigIndices.has(index),
            flashValue: 0,
            flickerOffset: Math.random() * Math.PI * 2,
          });
          index++;
        }
      }

      if (onTallyChange) {
        onTallyChange(misconfigIndices.size);
      }

      return arr;
    };

    const drawStatic = (w: number, h: number) => {
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = "rgba(245, 245, 245, 0.08)";
      ctx.lineWidth = 1;
      cells.forEach((cell) => {
        ctx.strokeRect(cell.x, cell.y, cell.width, cell.height);
        if (cell.isMisconfigured) {
          ctx.fillStyle = "rgba(245, 245, 245, 0.9)";
          ctx.fillRect(cell.x + 2, cell.y + 2, cell.width - 4, cell.height - 4);
        }
      });
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
      cells = generateGrid(width, height);
      
      if (isReduced) {
        drawStatic(width, height);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (isReduced) {
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    let animationFrameId: number;
    let startTime = performance.now();
    let isVisible = true;
    let laserY = -50;

    // Laser Y movement timeline via GSAP
    let laserTimeline: gsap.core.Timeline | null = null;

    if (isInView) {
      laserY = -50;
      laserTimeline = gsap.timeline();
      laserTimeline.to(
        {},
        {
          duration: 1.5,
          ease: "none",
          onUpdate: function () {
            laserY = this.progress() * (height + 100) - 50;
          },
        }
      );
    }

    const render = (now: number) => {
      if (!isVisible || !isInView) {
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const elapsed = (now - startTime) / 1000; // time in seconds

      // Draw dark grid backdrop
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, width, height);

      // Draw Cells & Gridlines
      cells.forEach((cell) => {
        // Grid outline
        ctx.strokeStyle = "rgba(245, 245, 245, 0.06)";
        ctx.lineWidth = 0.75;
        ctx.strokeRect(cell.x, cell.y, cell.width, cell.height);

        // Scan detection logic: flash cell as laser passes
        const distance = Math.abs(cell.y + cell.height / 2 - laserY);
        if (distance < 24 && laserY > -40) {
          cell.flashValue = Math.max(cell.flashValue, 1 - distance / 24);
        }

        // Draw laser hit highlight
        if (cell.flashValue > 0) {
          ctx.fillStyle = `rgba(245, 245, 245, ${cell.flashValue * 0.35})`;
          ctx.fillRect(cell.x + 1, cell.y + 1, cell.width - 2, cell.height - 2);
          cell.flashValue *= 0.88; // decay
        }

        // Beat 2 & 3: flag cells post-sweep with flicker glitch
        const isPassedByLaser = cell.y + cell.height / 2 < laserY || laserY > height;
        if (cell.isMisconfigured && isPassedByLaser) {
          let opacity = 0.9;
          
          if (elapsed < 3.0) {
            // Beat 2: Keep static flagged white
            opacity = 0.85;
          } else if (elapsed >= 3.0 && elapsed < 4.5) {
            // Beat 3: Glitch pulse flicker
            const flickerIndex = Math.sin(now * 0.08 + cell.flickerOffset);
            opacity = flickerIndex > 0.3 ? 0.95 : flickerIndex > -0.3 ? 0.35 : 0.65;
          } else {
            // Idle state: slow breathing opacity (3s period)
            opacity = 0.65 + Math.sin(now * 0.002 + cell.flickerOffset) * 0.25;
          }

          ctx.fillStyle = `rgba(245, 245, 245, ${opacity})`;
          ctx.fillRect(cell.x + 2, cell.y + 2, cell.width - 4, cell.height - 4);
        }
      });

      // Draw horizontal laser scan sweep line
      if (laserY > 0 && laserY < height) {
        // Outer glow
        ctx.shadowColor = "rgba(245, 245, 245, 0.8)";
        ctx.shadowBlur = 8;
        ctx.strokeStyle = "rgba(245, 245, 245, 0.95)";
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.moveTo(0, laserY);
        ctx.lineTo(width, laserY);
        ctx.stroke();

        // Reset shadow
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
      }

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
            startTime = performance.now();
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
      if (laserTimeline) laserTimeline.kill();
    };
  }, [isInView, isReduced]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[360px] relative z-10 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
    </div>
  );
}
