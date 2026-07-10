"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import StaticNoise from "./StaticNoise";

export default function NoiseField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Pre-generate 5 frames of noise patterns
    const noiseCanvases: HTMLCanvasElement[] = [];
    const noiseSize = 256;
    for (let f = 0; f < 5; f++) {
      const nCanvas = document.createElement("canvas");
      nCanvas.width = noiseSize;
      nCanvas.height = noiseSize;
      const nCtx = nCanvas.getContext("2d");
      if (nCtx) {
        const imgData = nCtx.createImageData(noiseSize, noiseSize);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const val = Math.floor(Math.random() * 255);
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
          // Sparse white noise pixels (approx 10-12% density)
          data[i + 3] = Math.random() > 0.88 ? 32 : 0;
        }
        nCtx.putImageData(imgData, 0, 0);
      }
      noiseCanvases.push(nCanvas);
    }

    const patterns = noiseCanvases.map((nCanvas) => ctx.createPattern(nCanvas, "repeat"));

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 24; // Locked at 24fps
    let isVisible = true;

    // IntersectionObserver to pause when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const elapsed = time - lastTime;

      if (elapsed >= fpsInterval) {
        lastTime = time - (elapsed % fpsInterval);

        // Breathing cycle: sine wave modulating brightness over 6-second period
        const breathingFactor = (Math.sin(time / 1000) + 1) / 2; // 0 to 1
        const maxOpacity = 0.065 + breathingFactor * 0.035; // 6.5% to 10% opacity

        // Draw solid dark background
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#080808";
        ctx.fillRect(0, 0, width, height);

        // Cycle through pre-rendered patterns
        const frameIdx = Math.floor(time / 45) % patterns.length;
        const pattern = patterns[frameIdx];

        if (pattern) {
          ctx.save();
          ctx.globalAlpha = maxOpacity;
          ctx.fillStyle = pattern;
          // Apply a tiny offset to avoid pixel repetition line artifacts
          const offsetX = Math.floor(Math.random() * noiseSize);
          const offsetY = Math.floor(Math.random() * noiseSize);
          ctx.translate(offsetX, offsetY);
          ctx.fillRect(-noiseSize, -noiseSize, width + noiseSize * 2, height + noiseSize * 2);
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [isReduced]);

  if (isReduced) {
    return <StaticNoise />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#080808]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
    </div>
  );
}
