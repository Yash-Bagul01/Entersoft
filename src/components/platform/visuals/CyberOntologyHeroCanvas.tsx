"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  speedOpacity: number;
  angle: number;
  speed: number;
}

interface NodePoint {
  x: number;
  y: number;
  label: string;
  connectedTo: number[];
}

export default function CyberOntologyHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isIntersecting = true;
    let prefersReducedMotion = false;

    // Check reduced motion preference
    if (typeof window !== "undefined") {
      prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 750);

    // Mouse tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let isHovered = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initParticles();
      initNodes();
    };

    window.addEventListener("resize", handleResize);

    // 1. Initialize Particles (Dot-Matrix Field)
    let particles: Particle[] = [];
    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((width * height) / 9000), 140);
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 1.8 + 0.8,
          opacity: Math.random() * 0.6 + 0.2,
          speedOpacity: Math.random() * 0.02 + 0.005,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.3 + 0.1,
        });
      }
    };

    // 2. Initialize Constellation Network Graph Nodes (Lower Silhouette)
    let nodes: NodePoint[] = [];
    const initNodes = () => {
      const centerY = height * 0.68;
      nodes = [
        { x: width * 0.15, y: centerY + 20, label: "APPS", connectedTo: [1, 3] },
        { x: width * 0.3, y: centerY - 45, label: "CODE REPOS", connectedTo: [2, 4] },
        { x: width * 0.5, y: centerY + 10, label: "API GATEWAY", connectedTo: [3, 5] },
        { x: width * 0.7, y: centerY - 35, label: "CLOUD IAM", connectedTo: [4, 6] },
        { x: width * 0.85, y: centerY + 30, label: "SERVICES", connectedTo: [] },
        { x: width * 0.38, y: centerY + 70, label: "DATABASES", connectedTo: [2] },
        { x: width * 0.62, y: centerY + 65, label: "CONTROLS", connectedTo: [3] },
      ];
    };

    initParticles();
    initNodes();

    // 3. Intersection Observer (Pause when off-screen)
    const observer = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // 4. Render Loop
    let time = 0;
    const render = () => {
      if (!isIntersecting) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.015;

      // Clear Canvas with Base Deep Navy Background
      ctx.fillStyle = "#030914";
      ctx.fillRect(0, 0, width, height);

      // A. Central Radial Glow (#0D518C and White Core)
      const glowX = width / 2;
      const glowY = height * 0.35;
      const radialGlow = ctx.createRadialGradient(
        glowX, glowY, 10,
        glowX, glowY, width * 0.45
      );
      radialGlow.addColorStop(0, "rgba(255, 255, 255, 0.18)");
      radialGlow.addColorStop(0.2, "rgba(13, 81, 140, 0.45)");
      radialGlow.addColorStop(0.55, "rgba(8, 66, 140, 0.2)");
      radialGlow.addColorStop(1, "rgba(3, 9, 20, 0)");

      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // B. Render Particles & Mouse Parallax
      if (!prefersReducedMotion) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Gentle sine wave shimmer
          p.opacity += Math.sin(time * p.speedOpacity * 10) * 0.008;
          p.opacity = Math.max(0.15, Math.min(0.85, p.opacity));

          // Drift
          p.baseY -= p.speed * 0.3;
          if (p.baseY < -10) p.baseY = height + 10;

          // Mouse push displacement
          let dx = mouseX - p.baseX;
          let dy = mouseY - p.baseY;
          let dist = Math.sqrt(dx * dx + dy * dy);
          let forceRadius = 140;

          if (isHovered && dist < forceRadius) {
            let force = (forceRadius - dist) / forceRadius;
            let angle = Math.atan2(dy, dx);
            p.x = p.baseX - Math.cos(angle) * force * 35;
            p.y = p.baseY - Math.sin(angle) * force * 35;
          } else {
            p.x += (p.baseX - p.x) * 0.08;
            p.y += (p.baseY - p.y) * 0.08;
          }

          // Draw Particle Dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(13, 81, 140, ${p.opacity})`;
          ctx.fill();

          // Highlight core dots near center
          if (dist < 100) {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.6})`;
            ctx.fill();
          }
        }
      }

      // C. Render Network Graph Constellation Silhouette (Lower Portion)
      ctx.strokeStyle = "rgba(13, 81, 140, 0.35)";
      ctx.lineWidth = 1;

      // Draw connection vectors between nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        for (let j of node.connectedTo) {
          if (nodes[j]) {
            const targetNode = nodes[j];
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.stroke();

            // Animated pulse along link
            const pulseT = (time * 0.5 + i * 0.3) % 1;
            const px = node.x + (targetNode.x - node.x) * pulseT;
            const py = node.y + (targetNode.y - node.y) * pulseT;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = "#38BDF8";
            ctx.fill();
          }
        }
      }

      // Draw Node Dots & Badges
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Outer halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(13, 81, 140, 0.25)";
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      // D. Dissolve / Fade Gradient into White Bottom Edge
      const fadeGradient = ctx.createLinearGradient(0, height * 0.82, 0, height);
      fadeGradient.addColorStop(0, "rgba(3, 9, 20, 0)");
      fadeGradient.addColorStop(0.7, "rgba(250, 252, 255, 0.7)");
      fadeGradient.addColorStop(1, "rgba(250, 252, 255, 1)");

      ctx.fillStyle = fadeGradient;
      ctx.fillRect(0, height * 0.75, width, height * 0.25);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
    />
  );
}
