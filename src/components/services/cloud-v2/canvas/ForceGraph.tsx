"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { forceSimulation, forceLink, forceManyBody, forceCenter } from "d3-force";
import { gsap } from "gsap";

interface GraphNode {
  id: string;
  radius: number;
  color: string;
  type: "root" | "admin" | "dev" | "service" | "resource";
  isExcess: boolean;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  isExcess: boolean;
  opacity?: number;
}

export default function ForceGraph({ onPruneUpdate }: { onPruneUpdate?: (nodesLeft: number, linksLeft: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isReduced = useReducedMotion();
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  const [prunedState, setPrunedState] = useState<"before" | "pruned">("before");

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

    // Node definitions: 42 nodes total (1 root, 3 admin, 6 dev, 12 service, 20 resource)
    const initialNodes: GraphNode[] = [
      { id: "root", radius: 12, color: "#F5F5F5", type: "root", isExcess: false },
      
      { id: "adm_1", radius: 8, color: "#F5F5F5", type: "admin", isExcess: false },
      { id: "adm_2", radius: 8, color: "#F5F5F5", type: "admin", isExcess: true },
      { id: "adm_3", radius: 8, color: "#F5F5F5", type: "admin", isExcess: false },

      ...Array.from({ length: 6 }, (_, i) => ({
        id: `dev_${i}`,
        radius: 6,
        color: "rgba(245, 245, 245, 0.7)",
        type: "dev" as const,
        isExcess: i % 2 === 0, // 3 excess dev roles
      })),

      ...Array.from({ length: 12 }, (_, i) => ({
        id: `svc_${i}`,
        radius: 4.5,
        color: "rgba(245, 245, 245, 0.5)",
        type: "service" as const,
        isExcess: i % 3 !== 0, // 8 excess svc account roles
      })),

      ...Array.from({ length: 20 }, (_, i) => ({
        id: `res_${i}`,
        radius: 3,
        color: "rgba(245, 245, 245, 0.3)",
        type: "resource" as const,
        isExcess: i % 4 !== 0, // 15 excess resources link mappings
      })),
    ];

    // Build connections (~78 links)
    const initialLinks: GraphLink[] = [];
    
    // Root to Admins
    initialLinks.push({ source: "root", target: "adm_1", isExcess: false });
    initialLinks.push({ source: "root", target: "adm_2", isExcess: true });
    initialLinks.push({ source: "root", target: "adm_3", isExcess: false });

    // Admins to Dev
    for (let i = 0; i < 6; i++) {
      initialLinks.push({ source: `adm_${(i % 3) + 1}`, target: `dev_${i}`, isExcess: i % 2 === 0 });
    }

    // Devs to Services
    for (let i = 0; i < 12; i++) {
      initialLinks.push({ source: `dev_${i % 6}`, target: `svc_${i}`, isExcess: i % 3 !== 0 });
    }

    // Services to Resources
    for (let i = 0; i < 20; i++) {
      initialLinks.push({ source: `svc_${i % 12}`, target: `res_${i}`, isExcess: i % 4 !== 0 });
      // Add cross-linking for over-permission maps
      if (i % 2 === 0) {
        initialLinks.push({ source: `svc_${(i + 3) % 12}`, target: `res_${i}`, isExcess: true });
      }
    }

    // Inter-hub extra links representing dense permissions
    for (let i = 0; i < 15; i++) {
      initialLinks.push({ source: `dev_${i % 6}`, target: `res_${(i * 3) % 20}`, isExcess: true });
    }

    const pNodes = initialNodes.filter((n) => !n.isExcess);
    const pLinks = initialLinks.filter((l) => !l.isExcess);

    const getNodePos = (nodeId: string, w: number, h: number) => {
      const node = pNodes.find((n) => n.id === nodeId);
      if (!node) return { x: w / 2, y: h / 2 };

      if (node.id === "root") {
        return { x: w / 2, y: h / 2 };
      }

      const sameTypeNodes = pNodes.filter((n) => n.type === node.type);
      const typeIdx = sameTypeNodes.findIndex((n) => n.id === node.id);
      const typeCount = sameTypeNodes.length;

      const minDim = Math.min(w, h);
      let dist = 50;
      if (node.type === "admin") dist = minDim * 0.16;
      else if (node.type === "dev") dist = minDim * 0.28;
      else if (node.type === "service") dist = minDim * 0.38;
      else if (node.type === "resource") dist = minDim * 0.46;

      const angle = (typeIdx / typeCount) * Math.PI * 2;
      return {
        x: w / 2 + Math.cos(angle) * dist,
        y: h / 2 + Math.sin(angle) * dist,
      };
    };

    const drawStatic = (w: number, h: number) => {
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, w, h);

      // Links drawing
      ctx.strokeStyle = "rgba(245, 245, 245, 0.08)";
      ctx.lineWidth = 0.5;
      pLinks.forEach((link) => {
        const sId = typeof link.source === "string" ? link.source : (link.source as any).id;
        const tId = typeof link.target === "string" ? link.target : (link.target as any).id;
        const start = getNodePos(sId, w, h);
        const end = getNodePos(tId, w, h);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      });

      // Nodes drawing
      pNodes.forEach((node) => {
        const pos = getNodePos(node.id, w, h);
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Reduced motion shortcut: render pruned structure instantly
    if (isReduced) {
      setPrunedState("pruned");
      if (onPruneUpdate) onPruneUpdate(pNodes.length, pLinks.length);

      const handleResizeReduced = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);
        drawStatic(width, height);
      };

      handleResizeReduced();
      window.addEventListener("resize", handleResizeReduced);
      return () => {
        window.removeEventListener("resize", handleResizeReduced);
      };
    }

    let isVisible = true;

    // Copy to mutable references
    const activeNodes = JSON.parse(JSON.stringify(initialNodes)) as GraphNode[];
    const activeLinks = JSON.parse(JSON.stringify(initialLinks)) as GraphLink[];

    activeLinks.forEach((l) => {
      l.opacity = 1;
    });

    if (onPruneUpdate) {
      onPruneUpdate(activeNodes.length, activeLinks.length);
    }

    const draw = () => {
      if (!isVisible || !isInView) return;
      ctx.clearRect(0, 0, width, height);

      // Draw connections/edges
      activeLinks.forEach((link: any) => {
        if (link.opacity <= 0) return;
        ctx.strokeStyle = `rgba(245, 245, 245, ${link.isExcess ? link.opacity * 0.28 : 0.08})`;
        ctx.lineWidth = link.isExcess ? 0.8 : 0.5;
        ctx.beginPath();
        ctx.moveTo(link.source.x, link.source.y);
        ctx.lineTo(link.target.x, link.target.y);
        ctx.stroke();
      });

      // Draw nodes
      activeNodes.forEach((node) => {
        if (node.radius <= 0) return;
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (isVisible && !wasVisible) {
            draw();
          }
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    // Initialize D3 Simulation
    const simulation = forceSimulation(activeNodes)
      .force("charge", forceManyBody().strength(-22))
      .force("center", forceCenter(width / 2, height / 2))
      .force("link", forceLink(activeLinks).id((d: any) => d.id).distance(38))
      .alphaDecay(0.024)
      .on("tick", draw); // Draw inside simulation tick only! No requestAnimationFrame loop.

    // Timeline steps
    const settleTimer = setTimeout(() => {
      // Freeze simulation physics to save CPU once settled
      simulation.stop();
    }, 2800);

    const pruneTimer = setTimeout(() => {
      // Step 2: Trigger pruning animation at 3s after graph settles
      setPrunedState("pruned");

      // Animate link fades
      activeLinks.forEach((l) => {
        if (l.isExcess) {
          gsap.to(l, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onUpdate: draw,
          });
        }
      });

      // Shrink excess nodes to radius 0
      activeNodes.forEach((node, idx) => {
        if (node.isExcess) {
          gsap.to(node, {
            radius: 0,
            duration: 1,
            delay: idx * 0.02,
            ease: "power3.inOut",
            onUpdate: draw,
          });
        }
      });

      // Update counters
      const remainingNodesCount = activeNodes.filter(n => !n.isExcess).length;
      const remainingLinksCount = activeLinks.filter(l => !l.isExcess).length;
      if (onPruneUpdate) {
        onPruneUpdate(remainingNodesCount, remainingLinksCount);
      }

      // Re-run force physics briefly to let remaining nodes settle
      setTimeout(() => {
        simulation.alpha(0.25).restart();
        // Settle physics again
        setTimeout(() => simulation.stop(), 2000);
      }, 100);

    }, 3200);

    const handleResizeResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      simulation.force("center", forceCenter(width / 2, height / 2));
      simulation.alpha(0.1).restart();
    };

    window.addEventListener("resize", handleResizeResize);

    return () => {
      clearTimeout(settleTimer);
      clearTimeout(pruneTimer);
      window.removeEventListener("resize", handleResizeResize);
      observer.disconnect();
      simulation.stop();
    };
  }, [isInView, isReduced]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[380px] relative z-10 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
    </div>
  );
}
