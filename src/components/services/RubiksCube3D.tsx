"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { animate } from "animejs";

export default function RubiksCube3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(3.8, 3.8, 6.2);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    // Main highlight light
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight1.position.set(6, 12, 8);
    scene.add(dirLight1);

    // Secondary accent blue light (Entersoft signature)
    const dirLight2 = new THREE.DirectionalLight(0x00a3ff, 1.4);
    dirLight2.position.set(-6, -6, -6);
    scene.add(dirLight2);

    // Subtle front fill light
    const pointLight = new THREE.PointLight(0xffffff, 0.6, 12);
    pointLight.position.set(0, 0, 6);
    scene.add(pointLight);

    // --- Rubik's Cube Setup ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const cubes: THREE.Mesh[] = [];
    const size = 0.91; // Slightly smaller than 1 to create gaps between cubes
    
    // Geometry
    const geometry = new THREE.BoxGeometry(size, size, size);

    // Materials: We create dark-metallic finishes for the block bodies.
    // Order of materials in Three.js Box: Right (+X), Left (-X), Top (+Y), Bottom (-Y), Front (+Z), Back (-Z)
    
    // Inner matte material for internal/hidden faces
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x08080a,
      roughness: 0.8,
      metalness: 0.1,
    });

    // Premium outer face materials
    const outerMats = {
      right: new THREE.MeshPhysicalMaterial({ color: 0x1f3f6b, roughness: 0.2, metalness: 0.85, clearcoat: 1.0, clearcoatRoughness: 0.1 }), // Deep Indigo (Brighter)
      left: new THREE.MeshPhysicalMaterial({ color: 0x0c4a45, roughness: 0.2, metalness: 0.85, clearcoat: 1.0, clearcoatRoughness: 0.1 }),  // Deep Teal (Brighter)
      top: new THREE.MeshPhysicalMaterial({ color: 0x424249, roughness: 0.25, metalness: 0.8, clearcoat: 1.0, clearcoatRoughness: 0.15 }), // Charcoal Slate (Brighter)
      bottom: new THREE.MeshPhysicalMaterial({ color: 0x52361d, roughness: 0.3, metalness: 0.75, clearcoat: 1.0, clearcoatRoughness: 0.15 }),// Dark Copper (Brighter)
      front: new THREE.MeshPhysicalMaterial({ color: 0x00bfff, roughness: 0.1, metalness: 0.9, clearcoat: 1.0, clearcoatRoughness: 0.05 }), // Signature Entersoft Cyan (Glowing)
      back: new THREE.MeshPhysicalMaterial({ color: 0x3a1b5c, roughness: 0.2, metalness: 0.85, clearcoat: 1.0, clearcoatRoughness: 0.15 }),  // Dark Amethyst (Brighter)
    };

    // Create 3x3x3 grid
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          // Construct material array for this specific block
          const mats = [
            x === 1 ? outerMats.right : innerMat,   // Right
            x === -1 ? outerMats.left : innerMat,   // Left
            y === 1 ? outerMats.top : innerMat,     // Top
            y === -1 ? outerMats.bottom : innerMat, // Bottom
            z === 1 ? outerMats.front : innerMat,   // Front
            z === -1 ? outerMats.back : innerMat,   // Back
          ];

          const mesh = new THREE.Mesh(geometry, mats);
          mesh.position.set(x, y, z);
          mainGroup.add(mesh);
          cubes.push(mesh);

          // Add a thin cyber-glow wire outline for each block
          const edges = new THREE.EdgesGeometry(geometry);
          const lineMat = new THREE.LineBasicMaterial({
            color: 0x00bfff,
            transparent: true,
            opacity: 0.38,
          });
          const line = new THREE.LineSegments(edges, lineMat);
          mesh.add(line);
        }
      }
    }

    // --- Interactive Mouse Tilt ---
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      targetX = y * 0.4;
      targetY = x * 0.4;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // --- Auto layer-rotation animations via anime.js ---
    let isLayerAnimating = false;
    let animeInstance: any = null;

    const selectRandomLayer = () => {
      if (isLayerAnimating) return;

      const axes: ("x" | "y" | "z")[] = ["x", "y", "z"];
      const axis = axes[Math.floor(Math.random() * axes.length)];
      
      const layers = [-1, 0, 1];
      const layerVal = layers[Math.floor(Math.random() * layers.length)];
      
      // Select cubes in this layer
      const layerCubes = cubes.filter(
        (c) => Math.abs(c.position[axis] - layerVal) < 0.15
      );

      if (layerCubes.length === 0) return;

      isLayerAnimating = true;

      // Create a temporary rotation pivot group
      const pivot = new THREE.Group();
      mainGroup.add(pivot);

      // Attach all layer cubes to the pivot
      layerCubes.forEach((c) => {
        pivot.attach(c);
      });

      const angle = (Math.random() < 0.5 ? 1 : -1) * (Math.PI / 2);
      const animObj = { rotation: 0 };

      // Use anime.js to animate the rotation smoothly
      animeInstance = animate(animObj, {
        rotation: angle,
        duration: 1500,
        easing: "cubicBezier(0.16, 1, 0.3, 1)", // Premium easing curve
        onUpdate: () => {
          pivot.rotation[axis] = animObj.rotation;
        },
        onComplete: () => {
          // Re-attach elements to mainGroup and destroy pivot
          const children = [...pivot.children];
          children.forEach((c) => {
            mainGroup.attach(c);
          });
          mainGroup.remove(pivot);
          isLayerAnimating = false;
        },
      });
    };

    // Cycle layer rotation every 3.8 seconds
    const intervalId = setInterval(selectRandomLayer, 3800);

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // --- Tick Loop ---
    let frameId: number;
    let baseAngle = 0;

    const tick = () => {
      baseAngle += 0.002; // Slow perpetual idle spin

      // Smooth inertia mouse tilt
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Combine idle rotation with user mouse tilt
      mainGroup.rotation.x = currentX + Math.sin(baseAngle * 0.5) * 0.05;
      mainGroup.rotation.y = currentY + baseAngle;
      mainGroup.rotation.z = Math.cos(baseAngle * 0.3) * 0.04;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    tick();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);

      if (animeInstance) {
        animeInstance.pause();
      }

      // Dispose WebGL resources
      cubes.forEach((cube) => {
        cube.geometry.dispose();
        if (Array.isArray(cube.material)) {
          cube.material.forEach((m) => m.dispose());
        } else {
          cube.material.dispose();
        }
        cube.children.forEach((child: any) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      });
      geometry.dispose();
      innerMat.dispose();
      Object.values(outerMats).forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[450px] md:min-h-[550px] lg:min-h-[600px] flex items-center justify-center relative select-none"
    >
      <div className="absolute w-[320px] h-[320px] rounded-full bg-[var(--accent)]/15 blur-[90px] pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[550px] max-h-[550px] outline-none cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
