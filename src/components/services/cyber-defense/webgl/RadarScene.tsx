"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const RADAR_RINGS = 4;
const THREAT_NODES = 12;

interface RadarSceneProps {
  className?: string;
}

export default function RadarScene({ className = "" }: RadarSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;
    const isMobile = window.innerWidth < 768;

    const W = el.clientWidth || 500;
    const H = el.clientHeight || 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 7);

    const group = new THREE.Group();
    group.rotation.x = 0.3; // Slight tilt for 3D depth
    scene.add(group);

    const BLUE = new THREE.Color(0x4da9ff);
    const NEON = new THREE.Color(0xccff33);
    const DIMBLUE = new THREE.Color(0x1a3f60);

    // ── CONCENTRIC RINGS ──────────────────────────────────────
    const ringCount = isMobile ? 2 : RADAR_RINGS;
    for (let i = 1; i <= ringCount; i++) {
      const radius = i * 0.7;
      const pts: THREE.Vector3[] = [];
      for (let a = 0; a <= Math.PI * 2 + 0.05; a += 0.05) {
        pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: DIMBLUE,
        transparent: true,
        opacity: i === ringCount ? 0.5 : 0.2,
      });
      group.add(new THREE.Line(geo, mat));
    }

    // ── CROSSHAIR LINES ────────────────────────────────────────
    const crossMat = new THREE.LineBasicMaterial({ color: DIMBLUE, transparent: true, opacity: 0.2 });
    const hGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3, 0, 0), new THREE.Vector3(3, 0, 0)]);
    const vGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -3, 0), new THREE.Vector3(0, 3, 0)]);
    group.add(new THREE.Line(hGeo, crossMat));
    group.add(new THREE.Line(vGeo, crossMat));

    // ── SWEEP BEAM ────────────────────────────────────────────
    const SWEEP_SEGMENTS = 24;
    const SWEEP_ANGLE = Math.PI / 6; // 30-degree fan
    const SWEEP_RADIUS = 2.9;
    const sweepVerts: number[] = [0, 0, 0];
    for (let i = 0; i <= SWEEP_SEGMENTS; i++) {
      const a = -SWEEP_ANGLE / 2 + (i / SWEEP_SEGMENTS) * SWEEP_ANGLE;
      sweepVerts.push(Math.cos(a) * SWEEP_RADIUS, Math.sin(a) * SWEEP_RADIUS, 0);
    }
    const sweepGeo = new THREE.BufferGeometry();
    sweepGeo.setAttribute("position", new THREE.Float32BufferAttribute(sweepVerts, 3));
    const sweepIndices: number[] = [];
    for (let i = 0; i < SWEEP_SEGMENTS; i++) {
      sweepIndices.push(0, i + 1, i + 2);
    }
    sweepGeo.setIndex(sweepIndices);
    const sweepMat = new THREE.MeshBasicMaterial({
      color: BLUE,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const sweepMesh = new THREE.Mesh(sweepGeo, sweepMat);
    group.add(sweepMesh);

    // Sweep leading-edge glow line
    const edgePts: THREE.Vector3[] = [];
    for (let a = -SWEEP_ANGLE / 2; a <= SWEEP_ANGLE / 2; a += 0.04) {
      edgePts.push(new THREE.Vector3(Math.cos(a) * SWEEP_RADIUS, Math.sin(a) * SWEEP_RADIUS, 0));
    }
    const edgeGeo = new THREE.BufferGeometry().setFromPoints(edgePts);
    const edgeMat = new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.9 });
    const edgeLine = new THREE.Line(edgeGeo, edgeMat);
    group.add(edgeLine);

    // ── THREAT NODES ─────────────────────────────────────────
    const nodeCount = isMobile ? 6 : THREAT_NODES;
    const nodeAngles = Array.from({ length: nodeCount }, (_, i) => (i / nodeCount) * Math.PI * 2 + 0.2);
    const nodeRadii = nodeAngles.map((_, i) => 0.6 + ((i * 0.4) % 2.1));
    const activeSet = new Set([1, 3, 5]);

    const nodeObjects: THREE.Mesh[] = [];
    nodeAngles.forEach((angle, i) => {
      const isActive = activeSet.has(i);
      const r = nodeRadii[i];
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;

      const nodeMat = new THREE.MeshBasicMaterial({
        color: isActive ? NEON : BLUE,
        transparent: true,
        opacity: isReduced ? (isActive ? 0.9 : 0.5) : 0,
      });
      const nodeMesh = new THREE.Mesh(new THREE.SphereGeometry(isActive ? 0.1 : 0.065, 12, 12), nodeMat);
      nodeMesh.position.set(x, y, 0);
      nodeMesh.userData = { angle, baseOpacity: isActive ? 0.9 : 0.5, timer: isReduced ? 1.0 : 0 };
      group.add(nodeMesh);
      nodeObjects.push(nodeMesh);

      // Halo for active threats
      if (isActive) {
        const haloMat = new THREE.MeshBasicMaterial({
          color: NEON,
          transparent: true,
          opacity: isReduced ? 0.15 : 0,
          depthWrite: false,
          side: THREE.BackSide,
        });
        const halo = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), haloMat);
        halo.position.copy(nodeMesh.position);
        halo.userData = { isHalo: true, parentIndex: i };
        group.add(halo);
      }
    });

    // ── CENTER DOT ────────────────────────────────────────────
    const centerMat = new THREE.MeshBasicMaterial({ color: BLUE });
    const centerDot = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), centerMat);
    group.add(centerDot);

    if (isReduced) {
      renderer.render(scene, camera);
      return () => {
        renderer.dispose();
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      };
    }

    // ── ANIMATION & OBSERVER LOOP ─────────────────────────────
    let sweepAngle = 0;
    let rafId: number;
    let isVisible = true;
    const sweepSpeed = isMobile ? 0.008 : 0.018;

    const tick = () => {
      if (isVisible) {
        sweepAngle += sweepSpeed;

        // Rotate sweep beam
        sweepMesh.rotation.z = sweepAngle;
        edgeLine.rotation.z = sweepAngle;

        // Sweep lighting algorithm
        nodeObjects.forEach((node, i) => {
          const nodeAngle = node.userData.angle;
          const sweepNorm = ((sweepAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
          const nodeNorm = ((nodeAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
          const diff = Math.abs(sweepNorm - nodeNorm);

          if (diff < 0.18 || diff > Math.PI * 2 - 0.18) {
            node.userData.timer = 1.0;
          }

          if (node.userData.timer > 0) {
            node.userData.timer -= 0.012;
          }

          const t = Math.max(0, node.userData.timer);
          (node.material as THREE.MeshBasicMaterial).opacity = t * node.userData.baseOpacity;

          const halo = group.children.find((c) => c.userData.parentIndex === i && c.userData.isHalo) as THREE.Mesh | undefined;
          if (halo && halo.material) {
            (halo.material as THREE.MeshBasicMaterial).opacity = t * 0.18;
          }
        });

        // Subtle parallax motion
        group.rotation.y = Math.sin(Date.now() * 0.0004) * 0.08;

        renderer.render(scene, camera);
      }

      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(el);

    rafId = requestAnimationFrame(tick);

    const onResize = () => {
      const W2 = el.clientWidth || 500;
      const H2 = el.clientHeight || 500;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [isReduced]);

  return (
    <div
      ref={mountRef}
      className={`radar-scene ${className}`}
      style={{ width: "100%", height: "100%", minHeight: "340px" }}
    />
  );
}
