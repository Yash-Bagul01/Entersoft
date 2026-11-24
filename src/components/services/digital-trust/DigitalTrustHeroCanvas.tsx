"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function DigitalTrustHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.set(0, 0.2, 6.2);

    const group = new THREE.Group();
    group.position.set(1.6, 0.15, 0);
    scene.add(group);

    const mint = new THREE.MeshBasicMaterial({
      color: 0xf4f4f2,
      wireframe: true,
      transparent: true,
      opacity: 0.42,
    });
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.85, 1), mint);
    group.add(shell);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.55, 0.012, 12, 96),
      new THREE.MeshBasicMaterial({ color: 0xf4f7f1, transparent: true, opacity: 0.28 }),
    );
    ring.rotation.x = Math.PI / 2.4;
    group.add(ring);

    const count = 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 2.2 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.72;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const points = new THREE.BufferGeometry();
    points.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dust = new THREE.Points(
      points,
      new THREE.PointsMaterial({ color: 0xf4f4f2, size: 0.035, transparent: true, opacity: 0.7 }),
    );
    group.add(dust);

    let frame = 0;
    const resize = () => {
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);

    const draw = () => {
      if (!reduced) {
        group.rotation.y += 0.0024;
        group.rotation.x = Math.sin(group.rotation.y * 0.7) * 0.12;
        ring.rotation.z += 0.0015;
      }
      renderer.render(scene, camera);
    };

    draw();
    if (!reduced) {
      const loop = () => {
        draw();
        frame = window.requestAnimationFrame(loop);
      };
      frame = window.requestAnimationFrame(loop);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      shell.geometry.dispose();
      ring.geometry.dispose();
      points.dispose();
      mint.dispose();
      (ring.material as THREE.Material).dispose();
      (dust.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="dt-hero__canvas" />;
}
