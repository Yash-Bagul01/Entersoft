"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Narrative3DVisualProps {
  stageIndex: number;
}

export default function Narrative3DVisual({ stageIndex }: Narrative3DVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(stageIndex);
  stageRef.current = stageIndex;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 4, 30);
    blueLight.position.set(5, 5, 5);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x60a5fa, 3, 30);
    cyanLight.position.set(-5, -5, 5);
    scene.add(cyanLight);

    // Group for Stage 0 (Problem: Distorted Fragmented Nodes)
    const groupStage0 = new THREE.Group();
    const geom0 = new THREE.IcosahedronGeometry(3.5, 1);
    const mat0 = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      emissive: 0xef4444,
      emissiveIntensity: 0.3,
    });
    const mesh0 = new THREE.Mesh(geom0, mat0);
    groupStage0.add(mesh0);

    // Scattered Fragment Particles
    const fragGeom = new THREE.BufferGeometry();
    const fragPos = new Float32Array(90 * 3);
    for (let i = 0; i < 90; i++) {
      fragPos[i * 3] = (Math.random() - 0.5) * 12;
      fragPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      fragPos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    fragGeom.setAttribute("position", new THREE.BufferAttribute(fragPos, 3));
    const fragMat = new THREE.PointsMaterial({ size: 0.2, color: 0xf59e0b, transparent: true, opacity: 0.8 });
    const fragPoints = new THREE.Points(fragGeom, fragMat);
    groupStage0.add(fragPoints);
    scene.add(groupStage0);

    // Group for Stage 1 (Operating Model: Unified SOC Core)
    const groupStage1 = new THREE.Group();
    const coreGeom = new THREE.SphereGeometry(2.2, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x2563eb,
      emissiveIntensity: 0.5,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    groupStage1.add(coreMesh);

    // Concentric Ring 1
    const ring1Geom = new THREE.TorusGeometry(3.6, 0.08, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, wireframe: true });
    const ring1 = new THREE.Mesh(ring1Geom, ringMat);
    ring1.rotation.x = Math.PI / 3;
    groupStage1.add(ring1);

    // Concentric Ring 2
    const ring2Geom = new THREE.TorusGeometry(4.8, 0.06, 16, 100);
    const ring2 = new THREE.Mesh(ring2Geom, ringMat);
    ring2.rotation.y = Math.PI / 4;
    groupStage1.add(ring2);

    scene.add(groupStage1);

    // Group for Stage 2 (Correlation Engine: 8 Node Web)
    const groupStage2 = new THREE.Group();
    const nodeCount = 8;
    const nodeRadius = 5.5;
    const nodePositions: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const x = Math.cos(angle) * nodeRadius;
      const y = Math.sin(angle) * nodeRadius;
      const pos = new THREE.Vector3(x, y, 0);
      nodePositions.push(pos);

      // Node Sphere
      const nGeom = new THREE.SphereGeometry(0.4, 16, 16);
      const nMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x3b82f6, emissiveIntensity: 0.6 });
      const nMesh = new THREE.Mesh(nGeom, nMat);
      nMesh.position.copy(pos);
      groupStage2.add(nMesh);

      // Laser Beam line to center
      const lineGeom = new THREE.BufferGeometry().setFromPoints([pos, new THREE.Vector3(0, 0, 0)]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.6 });
      const line = new THREE.Line(lineGeom, lineMat);
      groupStage2.add(line);
    }

    // Central Engine Node
    const centerGeom = new THREE.OctahedronGeometry(1.6, 2);
    const centerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x3b82f6, emissiveIntensity: 0.8 });
    const centerMesh = new THREE.Mesh(centerGeom, centerMat);
    groupStage2.add(centerMesh);
    scene.add(groupStage2);

    // Group for Stage 3 (Human SLA: Holographic Radar Sweep)
    const groupStage3 = new THREE.Group();
    const radarGeom = new THREE.RingGeometry(1, 5, 32);
    const radarMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
    const radarMesh = new THREE.Mesh(radarGeom, radarMat);
    groupStage3.add(radarMesh);

    const sweepGeom = new THREE.ConeGeometry(4.8, 0, 32, 1, false, 0, Math.PI / 3);
    const sweepMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.25, side: THREE.DoubleSide });
    const sweepMesh = new THREE.Mesh(sweepGeom, sweepMat);
    sweepMesh.rotation.x = Math.PI / 2;
    groupStage3.add(sweepMesh);

    scene.add(groupStage3);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const st = stageRef.current;

      // Visibility toggles based on active stage
      groupStage0.visible = st === 0;
      groupStage1.visible = st === 1;
      groupStage2.visible = st === 2;
      groupStage3.visible = st === 3;

      // Parallax camera lerp
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Stage Specific Animations
      if (st === 0) {
        groupStage0.rotation.y = elapsedTime * 0.3;
        groupStage0.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2;
        mesh0.scale.setScalar(1 + Math.sin(elapsedTime * 3) * 0.05);
      } else if (st === 1) {
        groupStage1.rotation.y = elapsedTime * 0.4;
        ring1.rotation.z = elapsedTime * 0.6;
        ring2.rotation.z = -elapsedTime * 0.4;
      } else if (st === 2) {
        groupStage2.rotation.z = elapsedTime * 0.25;
        centerMesh.rotation.x = elapsedTime * 0.8;
        centerMesh.rotation.y = elapsedTime * 0.5;
      } else if (st === 3) {
        sweepMesh.rotation.z = -elapsedTime * 2;
        groupStage3.rotation.x = Math.PI / 4 + Math.sin(elapsedTime) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[300px] relative flex items-center justify-center overflow-hidden rounded-xl">
      {/* Ambient Radial Glass Gradient Mask */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,#0F172A_100%)] z-10" />
    </div>
  );
}
