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
    camera.position.set(3.4, 3.4, 5.6); // Camera further back for a more refined scale
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Brighter ambient fill
    scene.add(ambientLight);

    // Main highlight light
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.4); // Stronger highlights
    dirLight1.position.set(6, 12, 8);
    scene.add(dirLight1);

    // Secondary accent cool white light (Resend signature monochromatic look)
    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.35); // Stronger backlights
    dirLight2.position.set(-6, -6, -6);
    scene.add(dirLight2);

    // Subtle front fill light
    const pointLight = new THREE.PointLight(0xffffff, 1.2, 12); // Stronger front fill to reveal textures
    pointLight.position.set(0, 0, 6);
    scene.add(pointLight);

    // --- Rubik's Cube Setup ---
    const mainGroup = new THREE.Group();
    mainGroup.scale.set(0.96, 0.96, 0.96); // Reduced scale for a more compact and elegant profile
    scene.add(mainGroup);

    const cubes: THREE.Mesh[] = [];
    const size = 0.91; // Slightly smaller than 1 to create gaps between cubes
    
    // Geometry
    const geometry = new THREE.BoxGeometry(size, size, size);

    // Materials: We create dark-metallic finishes for the block bodies.
    // Order of materials in Three.js Box: Right (+X), Left (-X), Top (+Y), Bottom (-Y), Front (+Z), Back (-Z)
    
    // Helper to create a procedural sandblasted texture
    const createSandblastedTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#959595"; // Slightly lighter base grey
        ctx.fillRect(0, 0, 128, 128);
        const imgData = ctx.getImageData(0, 0, 128, 128);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() - 0.5) * 75;
          data[i] = Math.min(255, Math.max(0, data[i] + noise));
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
        }
        ctx.putImageData(imgData, 0, 0);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return texture;
    };

    // Helper to create a procedural carbon/grid texture
    const createGridTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#222222"; // Lighter base
        ctx.fillRect(0, 0, 64, 64);
        
        ctx.strokeStyle = "#444444"; // More visible grid lines
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i <= 64; i += 8) {
          ctx.moveTo(i, 0);
          ctx.lineTo(i, 64);
          ctx.moveTo(0, i);
          ctx.lineTo(64, i);
        }
        ctx.stroke();

        ctx.fillStyle = "#363636"; // Brighter microtexture dots
        for (let x = 4; x < 64; x += 8) {
          for (let y = 4; y < 64; y += 8) {
            ctx.fillRect(x - 1, y - 1, 2, 2);
          }
        }
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
      return texture;
    };

    // Inner matte material for internal/hidden faces
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x121215, // Slightly lighter inner blocks for visibility
      roughness: 0.85,
      metalness: 0.1,
    });

    const sandblastTex = createSandblastedTexture();
    const gridTex = createGridTexture();

    // Premium outer face materials (Monochromatic Resend Style - Brightened for contrast)
    const outerMats = {
      obsidian: new THREE.MeshPhysicalMaterial({
        color: 0x1c1c1e, // Brighter glossy dark graphite (was 0x050505)
        roughness: 0.1,
        metalness: 0.95,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
      }),
      sandblast: new THREE.MeshPhysicalMaterial({
        color: 0x2e2e30, // Brighter sandblast grey (was 0x181818)
        bumpMap: sandblastTex,
        bumpScale: 0.035,
        roughness: 0.7,
        metalness: 0.65,
      }),
      grid: new THREE.MeshPhysicalMaterial({
        color: 0x28282a, // Brighter carbon mesh base (was 0x121212)
        map: gridTex,
        roughness: 0.4,
        metalness: 0.8,
      }),
    };

    // Create 3x3x3 grid
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          // Construct material array for this specific block using a varied layout of obsidian, sandblast, and grid textures
          const mats = [
            x === 1 ? outerMats.obsidian : innerMat,   // Right (+X)
            x === -1 ? outerMats.grid : innerMat,      // Left (-X)
            y === 1 ? outerMats.sandblast : innerMat,  // Top (+Y)
            y === -1 ? outerMats.obsidian : innerMat,  // Bottom (-Y)
            z === 1 ? outerMats.grid : innerMat,       // Front (+Z)
            z === -1 ? outerMats.sandblast : innerMat, // Back (-Z)
          ];

          const mesh = new THREE.Mesh(geometry, mats);
          mesh.position.set(x, y, z);
          mainGroup.add(mesh);
          cubes.push(mesh);

          // Add a thin cyber-glow wire outline for each block (Resend clean white/light highlight style - more visible)
          const edges = new THREE.EdgesGeometry(geometry);
          const lineMat = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.48, // Increased opacity to make highlights stand out
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
      sandblastTex.dispose();
      gridTex.dispose();
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
        className="w-full h-full outline-none cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
