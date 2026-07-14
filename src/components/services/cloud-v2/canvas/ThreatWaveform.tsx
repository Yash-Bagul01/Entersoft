"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ThreatLabel {
  text: string;
  x: number;
  y: number;
  opacity: number;
}

export default function ThreatWaveform() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    if (isReduced) {
      // Reduced motion static fallback: draw a static waveform path with 3 pre-placed spikes
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(245, 245, 245, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      const centerY = height / 2;
      for (let x = 0; x < width; x++) {
        let y = centerY;
        // Static mock spikes
        if (Math.abs(x - width * 0.25) < 30) {
          y += Math.sin((x - width * 0.25) * 0.15) * 45;
        } else if (Math.abs(x - width * 0.55) < 30) {
          y += Math.sin((x - width * 0.55) * 0.15) * -50;
        } else if (Math.abs(x - width * 0.8) < 30) {
          y += Math.sin((x - width * 0.8) * 0.15) * 40;
        } else {
          y += (Math.sin(x * 0.05) * 3) + (Math.cos(x * 0.1) * 2);
        }
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Static labels
      ctx.font = "8px monospace";
      ctx.fillStyle = "rgba(245, 245, 245, 0.5)";
      ctx.fillText("KEY LEAKED", width * 0.25 - 20, centerY - 50);
      ctx.fillText("ROOT LOGIN", width * 0.55 - 20, centerY + 60);
      ctx.fillText("BUCKET EXPOSED", width * 0.8 - 30, centerY - 45);

      return;
    }

    let animationFrameId: number;
    let isVisible = true;

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    // Waveform state variables
    let currentX = 0;
    let prevX = 0;
    let prevY = height / 2;
    let spikeActive = false;
    let spikeStartTime = 0;
    const spikeDuration = 400; // ms
    let nextSpikeTime = Date.now() + 2500;
    
    const threatLabels: string[] = [
      "ROOT LOGIN",
      "BUCKET EXPOSED",
      "PORT 22 OPEN",
      "KEY LEAKED",
      "MFA DISABLED"
    ];
    let labels: ThreatLabel[] = [];

    // Frame-rate throttling for mobile
    let lastRenderTime = 0;

    const render = (timestamp: number) => {
      if (!isVisible) {
        return;
      }

      // Check mobile viewport and throttle to 30fps
      const isMobile = window.innerWidth < 768;
      const targetFpsInterval = 1000 / (isMobile ? 30 : 60);
      const elapsed = timestamp - lastRenderTime;

      if (elapsed < targetFpsInterval) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastRenderTime = timestamp;

      const now = Date.now();
      const centerY = height / 2;
      const stepSpeed = isMobile ? 3 : 4; // drawing speed

      // Trigger spike on randomised timer
      if (!spikeActive && now > nextSpikeTime) {
        spikeActive = true;
        spikeStartTime = now;
        nextSpikeTime = now + 2500 + Math.random() * 2000;

        // Spawn a text label above this spike Y offset
        const text = threatLabels[Math.floor(Math.random() * threatLabels.length)];
        labels.push({
          text,
          x: currentX,
          y: centerY - 45 - Math.random() * 20,
          opacity: 1,
        });

        // Limit active label cache size
        if (labels.length > 5) labels.shift();
      }

      // Draw phosphorus-decay tail fade overlay
      ctx.fillStyle = "rgba(8, 8, 8, 0.055)"; // decays trails over ~3s
      ctx.fillRect(0, 0, width, height);

      // Increment position
      prevX = currentX;
      currentX += stepSpeed;
      
      let noise = (Math.random() - 0.5) * 5;

      if (spikeActive) {
        const spikeElapsed = now - spikeStartTime;
        const progress = spikeElapsed / spikeDuration; // 0 to 1

        if (progress >= 1) {
          spikeActive = false;
        } else {
          // Sine burst equation
          const wave = Math.sin(progress * Math.PI * 10);
          const envelope = Math.sin(progress * Math.PI);
          const amplitude = envelope * 55; // 8x amplification
          noise += wave * amplitude;
        }
      }

      const currentY = centerY + noise;

      // Draw the waveform stroke segment
      if (prevX < currentX) {
        ctx.strokeStyle = "rgba(245, 245, 245, 0.7)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
      }

      // Wrap drawing around left-edge boundary
      if (currentX >= width) {
        currentX = 0;
        prevX = 0;
      }
      prevY = currentY;

      // Draw and decay active labels
      ctx.font = "8px monospace";
      ctx.fillStyle = "rgba(245, 245, 245, 0.6)";

      labels.forEach((label) => {
        if (label.opacity <= 0) return;
        
        ctx.fillStyle = `rgba(245, 245, 245, ${label.opacity * 0.65})`;
        ctx.fillText(label.text, label.x - 20, label.y);
        
        // Decay opacity over 2s
        label.opacity -= 0.008;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver to pause when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (isVisible && !wasVisible) {
            // Restart loop
            lastRenderTime = performance.now();
            animationFrameId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    if (isVisible) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [isReduced]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[350px] relative z-10 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
    </div>
  );
}
