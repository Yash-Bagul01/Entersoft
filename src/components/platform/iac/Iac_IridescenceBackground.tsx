"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface IridescenceBackgroundProps {
  color?: [number, number, number];
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
  className?: string;
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  // Add subtle mouse parallax displacement
  uv += (uMouse - vec2(0.5)) * uAmplitude;

  // Diagonal flow matrix inspired by https://3f37ge.aura.build/
  float d = -uTime * 0.4 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * (uv.x * 0.8 + uv.y * 0.6));
    d += sin((uv.y * 0.8 - uv.x * 0.6) * i + a);
  }
  d += uTime * 0.4 * uSpeed;
  
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;

  // Deep Obsidian Dark Space Gradient (Left side dark, right side diagonal glowing ribbon)
  float diagonalMask = smoothstep(-0.6, 0.9, vUv.x * 1.1 + vUv.y * 0.5 - 0.45);
  float radialVignette = smoothstep(1.5, 0.25, length(vUv - vec2(0.65, 0.45)));

  // Combine colors with dark space
  vec3 baseDark = vec3(0.024, 0.024, 0.035);
  vec3 finalColor = mix(baseDark, col * 1.35, diagonalMask * radialVignette);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default function Iac_IridescenceBackground({
  color = [0.38, 0.58, 1.35], // Signature electric cobalt blue & radiant violet
  speed = 0.9,
  amplitude = 0.12,
  mouseReact = true,
  className = "",
}: IridescenceBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const reqAnimRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Orthographic Camera for Fullscreen Quad
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // 2. WebGL Renderer with performance optimizations
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.innerHTML = "";
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL initialization failed, falling back to CSS background", e);
      return;
    }

    // 3. Shader Material with uniforms matching https://3f37ge.aura.build/
    const uniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Vector3(...color) },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uAmplitude: { value: amplitude },
      uSpeed: { value: speed },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4. Mouse movement tracking with lerp damping
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mousePos.current.targetX = Math.max(0, Math.min(1, x));
      mousePos.current.targetY = Math.max(0, Math.min(1, y));
    };

    if (mouseReact) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // 5. Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 6. Render Loop
    let startTime = performance.now();
    const animate = (time: number) => {
      reqAnimRef.current = requestAnimationFrame(animate);

      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;
      uniforms.uMouse.value.set(mousePos.current.x, mousePos.current.y);

      // Time uniform progression
      uniforms.uTime.value = (time - startTime) * 0.001;

      if (renderer) {
        renderer.render(scene, camera);
      }
    };
    reqAnimRef.current = requestAnimationFrame(animate);

    return () => {
      if (reqAnimRef.current) cancelAnimationFrame(reqAnimRef.current);
      window.removeEventListener("resize", handleResize);
      if (mouseReact) window.removeEventListener("mousemove", handleMouseMove);
      if (renderer) {
        renderer.dispose();
        geometry.dispose();
        material.dispose();
      }
    };
  }, [color, speed, amplitude, mouseReact]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-[#060609] ${className}`}
      style={{
        contain: "strict",
      }}
    >
      {/* Fallback CSS gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#060609] via-[#0A0D18] to-[#120B1E] opacity-90" />
    </div>
  );
}
