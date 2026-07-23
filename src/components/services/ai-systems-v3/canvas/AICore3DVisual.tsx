"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ShieldCheck, Zap, Lock, RefreshCw } from "lucide-react";

export default function AICore3DVisual() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [shieldState, setShieldState] = useState<"secured" | "intercepting" | "lockdown">("secured");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Inner Glowing AI Core Sphere
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 3);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00a3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Inner Core Solid Glow
    const solidCoreGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const solidCoreMat = new THREE.MeshBasicMaterial({
      color: 0x00a3ff,
      transparent: true,
      opacity: 0.25,
    });
    const solidCoreMesh = new THREE.Mesh(solidCoreGeo, solidCoreMat);
    scene.add(solidCoreMesh);

    // Outer Geodesic Holographic Shield
    const shieldGeo = new THREE.IcosahedronGeometry(2.4, 2);
    const shieldMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    scene.add(shieldMesh);

    // Orbital Ring 1
    const ring1Geo = new THREE.TorusGeometry(3.1, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00a3ff,
      transparent: true,
      opacity: 0.6,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3;
    scene.add(ring1Mesh);

    // Orbital Ring 2
    const ring2Geo = new THREE.TorusGeometry(3.5, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.4,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 4;
    scene.add(ring2Mesh);

    // Orbital Floating Signal Particles
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const r = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00a3ff,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });
    const particlesMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particlesMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    let animationFrameId: number;

    const animate = () => {
      coreMesh.rotation.x += 0.005;
      coreMesh.rotation.y += 0.008;

      shieldMesh.rotation.x -= 0.003;
      shieldMesh.rotation.y -= 0.004;

      ring1Mesh.rotation.z += 0.006;
      ring2Mesh.rotation.z -= 0.005;

      particlesMesh.rotation.y += 0.002;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      solidCoreGeo.dispose();
      solidCoreMat.dispose();
      shieldGeo.dispose();
      shieldMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* 3D WebGL Canvas Container */}
      <div className="relative w-full h-[380px] md:h-[480px] rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex items-center justify-center shadow-[0_0_60px_rgba(0,163,255,0.1)]">
        {/* Ambient Radial Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.12)_0%,transparent_70%)] pointer-events-none" />

        {/* 3D Mount Element */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Status Overlay HUD */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/70 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs text-white/90 font-semibold uppercase">
              3D AI THREAT SHIELD CORE
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/70 border border-white/10 backdrop-blur-md font-mono text-xs text-[#00A3FF]">
            <span>60 FPS REALTIME</span>
          </div>
        </div>

        {/* Interactive Mode Controls at Bottom of 3D Canvas */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
          <button
            onClick={() => setShieldState("secured")}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              shieldState === "secured"
                ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                : "bg-black/60 text-white/70 hover:text-white border border-white/10"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            NORMAL PROTECTION
          </button>

          <button
            onClick={() => setShieldState("intercepting")}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              shieldState === "intercepting"
                ? "bg-[#00A3FF] text-black shadow-[0_0_20px_rgba(0,163,255,0.4)]"
                : "bg-black/60 text-white/70 hover:text-white border border-white/10"
            }`}
          >
            <Zap className="w-4 h-4" />
            REAL-TIME THREAT INTERCEPT
          </button>

          <button
            onClick={() => setShieldState("lockdown")}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              shieldState === "lockdown"
                ? "bg-amber-400 text-black shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                : "bg-black/60 text-white/70 hover:text-white border border-white/10"
            }`}
          >
            <Lock className="w-4 h-4" />
            ZERO-TRUST ISOLATION
          </button>
        </div>
      </div>

      {/* Dynamic Status Explanation Banner */}
      <div className="w-full p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-left">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#00A3FF] animate-pulse" />
          <span className="font-sans text-xs md:text-sm text-white/90">
            {shieldState === "secured" &&
              "System Status: Active multi-layer protection monitoring all prompt, vector, and agent inputs."}
            {shieldState === "intercepting" &&
              "Interception Status: Adversarial injection detected and quarantined in < 0.4ms window."}
            {shieldState === "lockdown" &&
              "Lockdown Status: Zero-trust context boundary active — zero unauthorized API or tool calls permitted."}
          </span>
        </div>

        <span className="font-mono text-xs font-bold text-[#00A3FF] shrink-0">
          ENTERSOFT SHIELD V3
        </span>
      </div>
    </div>
  );
}
