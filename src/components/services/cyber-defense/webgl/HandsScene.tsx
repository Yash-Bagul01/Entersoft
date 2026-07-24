"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function HandsScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const isMobile = window.innerWidth < 768;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Color Palette — Blueish & Cyan
    const CYAN = new THREE.Color(0x38bdf8);
    const BLUE = new THREE.Color(0x4da9ff);
    const BRIGHT_CYAN = new THREE.Color(0x00f0ff);
    const DEEP_BLUE = new THREE.Color(0x0284c7);

    // ── HIGH-FIDELITY 3D CYBERNETIC HAND GENERATOR ────────────────
    const createHandGroup = (isLeft: boolean) => {
      const hand = new THREE.Group();
      const m = isLeft ? -1 : 1;

      // Realistic relative 3D joint positions (Wrist, Palm, 5 Fingers with 3 joints each)
      const joints: THREE.Vector3[] = [
        // Forearm & Wrist (0-3)
        new THREE.Vector3(2.2 * m, -2.4, -0.8),
        new THREE.Vector3(1.6 * m, -1.8, -0.4),
        new THREE.Vector3(1.0 * m, -1.2, -0.1),
        new THREE.Vector3(0.5 * m, -0.7, 0.1),

        // Palm Hub (4)
        new THREE.Vector3(0.1 * m, -0.3, 0.2),

        // Thumb (5, 6, 7)
        new THREE.Vector3(1.1 * m, -0.5, 0.4),
        new THREE.Vector3(1.5 * m, -0.1, 0.55),
        new THREE.Vector3(1.8 * m, 0.35, 0.7),

        // Index Finger (8, 9, 10)
        new THREE.Vector3(0.5 * m, 0.3, 0.35),
        new THREE.Vector3(0.65 * m, 1.0, 0.45),
        new THREE.Vector3(0.75 * m, 1.65, 0.5),

        // Middle Finger (11, 12, 13)
        new THREE.Vector3(0.15 * m, 0.4, 0.25),
        new THREE.Vector3(0.2 * m, 1.25, 0.35),
        new THREE.Vector3(0.22 * m, 1.95, 0.4),

        // Ring Finger (14, 15, 16)
        new THREE.Vector3(-0.25 * m, 0.3, 0.15),
        new THREE.Vector3(-0.35 * m, 1.1, 0.2),
        new THREE.Vector3(-0.42 * m, 1.7, 0.25),

        // Pinky Finger (17, 18, 19)
        new THREE.Vector3(-0.65 * m, 0.15, -0.05),
        new THREE.Vector3(-0.85 * m, 0.8, -0.1),
        new THREE.Vector3(-1.0 * m, 1.35, -0.15),
      ];

      // Structural Bone Segment Connections
      const connections: [number, number][] = [
        [0, 1], [1, 2], [2, 3], [3, 4],
        // Thumb
        [2, 5], [5, 6], [6, 7],
        // Index
        [4, 8], [8, 9], [9, 10],
        // Middle
        [4, 11], [11, 12], [12, 13],
        // Ring
        [4, 14], [14, 15], [15, 16],
        // Pinky
        [3, 17], [17, 18], [18, 19],
        // Cross Web Connections
        [5, 8], [8, 11], [11, 14], [14, 17]
      ];

      // 1. Wireframe Line Mesh
      const linePoints: THREE.Vector3[] = [];
      connections.forEach(([a, b]) => {
        linePoints.push(joints[a], joints[b]);
      });
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: CYAN,
        transparent: true,
        opacity: 0.55,
      });
      hand.add(new THREE.LineSegments(lineGeo, lineMat));

      // 2. Glowing Nodes on Joint Points
      const nodeGeo = new THREE.SphereGeometry(0.07, 12, 12);
      const tipIndices = [7, 10, 13, 16, 19];

      joints.forEach((pos, idx) => {
        const isTip = tipIndices.includes(idx);
        const nodeMat = new THREE.MeshBasicMaterial({
          color: isTip ? BRIGHT_CYAN : BLUE,
          transparent: true,
          opacity: isTip ? 0.95 : 0.65,
        });
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        nodeMesh.position.copy(pos);
        hand.add(nodeMesh);

        // Fingertip Volumetric Glow Halos
        if (isTip) {
          const haloGeo = new THREE.SphereGeometry(0.22, 12, 12);
          const haloMat = new THREE.MeshBasicMaterial({
            color: BRIGHT_CYAN,
            transparent: true,
            opacity: 0.22,
            side: THREE.BackSide,
          });
          const haloMesh = new THREE.Mesh(haloGeo, haloMat);
          haloMesh.position.copy(pos);
          hand.add(haloMesh);
        }
      });

      // 3. Dense Digital Particle Surface Envelope
      const cloudCount = isMobile ? 120 : 260;
      const cloudPos = new Float32Array(cloudCount * 3);
      for (let p = 0; p < cloudCount; p++) {
        const conn = connections[p % connections.length];
        const j1 = joints[conn[0]];
        const j2 = joints[conn[1]];
        const t = Math.random();

        cloudPos[p * 3] = j1.x + (j2.x - j1.x) * t + (Math.random() - 0.5) * 0.2;
        cloudPos[p * 3 + 1] = j1.y + (j2.y - j1.y) * t + (Math.random() - 0.5) * 0.2;
        cloudPos[p * 3 + 2] = j1.z + (j2.z - j1.z) * t + (Math.random() - 0.5) * 0.2;
      }
      const cloudGeo = new THREE.BufferGeometry();
      cloudGeo.setAttribute("position", new THREE.BufferAttribute(cloudPos, 3));
      const cloudMat = new THREE.PointsMaterial({
        color: BRIGHT_CYAN,
        size: 0.045,
        transparent: true,
        opacity: 0.6,
      });
      hand.add(new THREE.Points(cloudGeo, cloudMat));

      return { hand, joints, tipIndices };
    };

    // Instantiate Left & Right Cybernetic Hands
    const leftData = createHandGroup(true);
    leftData.hand.position.set(-3.2, -0.4, -0.4);
    leftData.hand.rotation.set(0.2, 0.45, -0.25);
    mainGroup.add(leftData.hand);

    const rightData = createHandGroup(false);
    rightData.hand.position.set(3.2, -0.4, -0.4);
    rightData.hand.rotation.set(0.2, -0.45, 0.25);
    mainGroup.add(rightData.hand);

    // ── CENTER ZERO-KNOWLEDGE GLOW CORE & DATA RINGS ──────────────
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0, 0);
    mainGroup.add(coreGroup);

    // Center Glowing Sphere
    const coreGeo = new THREE.SphereGeometry(0.35, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({
      color: BRIGHT_CYAN,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Outer Halo
    const coreHaloGeo = new THREE.SphereGeometry(0.7, 24, 24);
    const coreHaloMat = new THREE.MeshBasicMaterial({
      color: BLUE,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
    });
    coreGroup.add(new THREE.Mesh(coreHaloGeo, coreHaloMat));

    // Concentric Energy Rings
    for (let r = 1; r <= 3; r++) {
      const ringRadius = r * 0.75;
      const pts: THREE.Vector3[] = [];
      for (let a = 0; a <= Math.PI * 2 + 0.05; a += 0.08) {
        pts.push(new THREE.Vector3(Math.cos(a) * ringRadius, Math.sin(a) * ringRadius, 0));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const ringMat = new THREE.LineBasicMaterial({
        color: r === 1 ? BRIGHT_CYAN : BLUE,
        transparent: true,
        opacity: 0.35 - r * 0.08,
      });
      const ringMesh = new THREE.Line(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI * 0.4 * r;
      ringMesh.userData = { rotSpeed: 0.005 * (r % 2 === 0 ? 1 : -1) };
      coreGroup.add(ringMesh);
    }

    // ── FINGERTIP BEAMS CONNECTING TO CENTER CORE ─────────────────
    const beamPts: THREE.Vector3[] = [];
    leftData.tipIndices.forEach((tIdx) => {
      const tipWorld = leftData.joints[tIdx].clone().add(leftData.hand.position);
      beamPts.push(tipWorld, new THREE.Vector3(0, 0, 0));
    });
    rightData.tipIndices.forEach((tIdx) => {
      const tipWorld = rightData.joints[tIdx].clone().add(rightData.hand.position);
      beamPts.push(tipWorld, new THREE.Vector3(0, 0, 0));
    });
    const beamGeo = new THREE.BufferGeometry().setFromPoints(beamPts);
    const beamMat = new THREE.LineBasicMaterial({
      color: BRIGHT_CYAN,
      transparent: true,
      opacity: 0.22,
    });
    const beamLines = new THREE.LineSegments(beamGeo, beamMat);
    mainGroup.add(beamLines);

    // ── AMBIENT FLOATING CYBER PARTICLES ─────────────────────────
    const envParticleCount = isMobile ? 150 : 400;
    const envParticleGeo = new THREE.BufferGeometry();
    const envPos = new Float32Array(envParticleCount * 3);
    for (let i = 0; i < envParticleCount; i++) {
      envPos[i * 3] = (Math.random() - 0.5) * 16;
      envPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      envPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    envParticleGeo.setAttribute("position", new THREE.BufferAttribute(envPos, 3));
    const envParticleMat = new THREE.PointsMaterial({
      color: CYAN,
      size: 0.045,
      transparent: true,
      opacity: 0.45,
    });
    const envParticles = new THREE.Points(envParticleGeo, envParticleMat);
    mainGroup.add(envParticles);

    if (isReduced) {
      renderer.render(scene, camera);
      return () => {
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    }

    // ── MOUSE INTERACTION & ANIMATION LOOP ───────────────────────
    let animationFrameId: number;
    let isVisible = true;
    let time = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      if (isVisible) {
        time += 0.012;

        // Smooth mouse parallax interpolation
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        mainGroup.rotation.y = currentMouseX;
        mainGroup.rotation.x = -currentMouseY;

        // Left Hand wave animation
        leftData.hand.position.y = -0.4 + Math.sin(time * 0.8) * 0.12;
        leftData.hand.rotation.z = -0.25 + Math.cos(time * 0.6) * 0.04;

        // Right Hand wave animation
        rightData.hand.position.y = -0.4 + Math.cos(time * 0.8) * 0.12;
        rightData.hand.rotation.z = 0.25 + Math.sin(time * 0.6) * 0.04;

        // Center Core animation
        coreGroup.children.forEach((child) => {
          if (child.userData.rotSpeed) {
            child.rotation.z += child.userData.rotSpeed;
          }
        });
        coreMesh.scale.setScalar(1 + Math.sin(time * 2) * 0.08);

        // Ambient particles slow drift
        envParticles.rotation.y = time * 0.04;

        renderer.render(scene, camera);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [isReduced]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
}
