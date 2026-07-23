"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NODES = [
  { id: 0, pos: [0, 3.2, 0], label: "USER INPUT" },
  { id: 1, pos: [0, 2.1, 0], label: "PROMPT LAYER" },
  { id: 2, pos: [0, 0.9, 0], label: "GUARDRAILS" },
  { id: 3, pos: [0, -0.2, 0], label: "LLM / MODEL" },
  { id: 4, pos: [1.2, -1.2, 0], label: "RAG" },
  { id: 5, pos: [-1.2, -1.2, 0], label: "TOOLS" },
  { id: 6, pos: [0, -2.3, 0], label: "AGENTS" },
  { id: 7, pos: [0, -3.4, 0], label: "API OUTPUT" },
];

const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 6],
  [5, 6],
  [6, 7],
];

// Flagged nodes (neon-highlighted active findings)
const FLAGGED_NODES = new Set([1, 4]); // PROMPT LAYER and RAG

export default function AIGraphScene({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;
    const W = el.clientWidth;
    const H = el.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 10);

    // Group that holds everything — tilted in 3D space
    const group = new THREE.Group();
    group.rotation.x = 0.25; // initial 3D tilt
    scene.add(group);

    // === NODES ===
    const neonColor = new THREE.Color(0xccff33);
    const nodeObjects: THREE.Mesh[] = [];

    NODES.forEach((n, i) => {
      const isFlagged = FLAGGED_NODES.has(i);
      const geo = new THREE.SphereGeometry(isFlagged ? 0.14 : 0.1, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color: isFlagged ? neonColor : new THREE.Color(0x667733),
        transparent: true,
        opacity: isFlagged ? 1 : 0.6,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...(n.pos as [number, number, number]));
      group.add(mesh);
      nodeObjects.push(mesh);

      // Glow halo for flagged nodes
      if (isFlagged) {
        const glowGeo = new THREE.SphereGeometry(0.38, 16, 16);
        const glowMat = new THREE.MeshBasicMaterial({
          color: neonColor,
          transparent: true,
          opacity: 0.12,
          depthWrite: false,
          side: THREE.BackSide,
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.position.copy(mesh.position);
        group.add(glow);
      }
    });

    // === EDGES ===
    EDGES.forEach(([a, b]) => {
      const posA = new THREE.Vector3(...(NODES[a].pos as [number, number, number]));
      const posB = new THREE.Vector3(...(NODES[b].pos as [number, number, number]));
      const pts = [posA, posB];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: neonColor,
        transparent: true,
        opacity: 0.18,
      });
      group.add(new THREE.Line(geo, mat));
    });

    // === TRAVELING DOTS ===
    const dots: { mesh: THREE.Mesh; a: THREE.Vector3; b: THREE.Vector3; t: number; speed: number }[] = [];
    const dotGeo = new THREE.SphereGeometry(0.04, 8, 8);
    EDGES.forEach(([a, b]) => {
      const dotMat = new THREE.MeshBasicMaterial({ color: neonColor });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      group.add(dot);
      dots.push({
        mesh: dot,
        a: new THREE.Vector3(...(NODES[a].pos as [number, number, number])),
        b: new THREE.Vector3(...(NODES[b].pos as [number, number, number])),
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.003,
      });
    });

    // === MOUSE INTERACTION ===
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // === ANIMATION LOOP ===
    let raf: number;
    let phi = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      if (!isReduced) {
        phi += 0.003; // slow auto-rotation
        group.rotation.y = phi + mouseRef.current.x * 0.18;
        group.rotation.x = 0.25 + mouseRef.current.y * -0.12;

        // Animate traveling dots
        dots.forEach((d) => {
          d.t += d.speed;
          if (d.t > 1) d.t = 0;
          d.mesh.position.lerpVectors(d.a, d.b, d.t);
        });

        // Pulse flagged nodes
        const pulse = 0.7 + 0.3 * Math.sin(Date.now() * 0.002);
        nodeObjects.forEach((mesh, i) => {
          if (FLAGGED_NODES.has(i)) {
            (mesh.material as THREE.MeshBasicMaterial).opacity = pulse;
          }
        });
      }

      renderer.render(scene, camera);
    };

    tick();

    const onResize = () => {
      if (!el) return;
      const W2 = el.clientWidth;
      const H2 = el.clientHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, [isReduced]);

  return <div ref={mountRef} className={`ai-graph-scene w-full h-full min-h-[450px] relative ${className}`} />;
}
