"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CyberOntologyHero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 650;

    // 1. Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    container.appendChild(renderer.domElement);

    // 2. High Definition Lighting for Glass Specular & Cyber Glow
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x38bdf8, 5.0);
    mainLight.position.set(6, 8, 5);
    scene.add(mainLight);

    const blueLight = new THREE.DirectionalLight(0x0b4fd2, 4.5);
    blueLight.position.set(-6, -5, 4);
    scene.add(blueLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 6.0, 20);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    // 3. Central 3D Mesh: Dynamic Physical Glass Torus Knot / Ontology Core
    const knotGeometry = new THREE.TorusKnotGeometry(1.9, 0.52, 280, 48, 2, 5);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0B4FD2"),
      emissive: new THREE.Color("#082c7a"),
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.8,
      ior: 1.5,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      thickness: 1.8,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(knotGeometry, knotMaterial);
    mesh.position.set(2.2, -0.2, -0.5); // Positioned slightly to the right to frame hero text cleanly
    scene.add(mesh);

    // Wireframe Outer Shell
    const wireframeGeo = new THREE.TorusKnotGeometry(1.94, 0.53, 140, 24, 2, 5);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#38BDF8"),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    wireframeMesh.position.copy(mesh.position);
    scene.add(wireframeMesh);

    // 4. Connected 3D Node Particles Cloud (Graph Network)
    const particleCount = 70;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleNodes: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 6;
      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;
      particleNodes.push(new THREE.Vector3(x, y, z));
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color("#38BDF8"),
      size: 0.08,
      transparent: true,
      opacity: 0.85,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Dynamic Connection Lines between nearby particles
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#0B4FD2"),
      transparent: true,
      opacity: 0.25,
    });

    const linePositions: number[] = [];
    for (let i = 0; i < particleNodes.length; i++) {
      for (let j = i + 1; j < particleNodes.length; j++) {
        const dist = particleNodes[i].distanceTo(particleNodes[j]);
        if (dist < 2.8) {
          linePositions.push(
            particleNodes[i].x, particleNodes[i].y, particleNodes[i].z,
            particleNodes[j].x, particleNodes[j].y, particleNodes[j].z
          );
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMesh = new THREE.LineSegments(lineGeo, lineMaterial);
    scene.add(lineMesh);

    // Mouse Interaction Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.0006;
      mouseY = (event.clientY - windowHalfY) * 0.0006;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const newW = containerRef.current.clientWidth || window.innerWidth;
      const newH = containerRef.current.clientHeight || 650;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // 5. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // 3D Glass Object Rotation
      mesh.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2 + targetY * 1.5;
      mesh.rotation.y = elapsedTime * 0.2 + targetX * 1.5;
      mesh.rotation.z = Math.cos(elapsedTime * 0.25) * 0.15;
      mesh.position.y = -0.2 + Math.sin(elapsedTime * 0.6) * 0.12;

      wireframeMesh.rotation.copy(mesh.rotation);
      wireframeMesh.position.copy(mesh.position);

      // Slow drift for node particles
      particleSystem.rotation.y = elapsedTime * 0.04;
      lineMesh.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      knotGeometry.dispose();
      knotMaterial.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
}
