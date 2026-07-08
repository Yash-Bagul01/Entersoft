"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { animate } from "animejs";

export interface RubiksCube3DProps {
  glowColor?: number;
  radialBgClass?: string;
}

export default function RubiksCube3D({ glowColor = 0x00a3ff, radialBgClass = "bg-[var(--accent)]/15" }: RubiksCube3DProps) {
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
        ctx.fillStyle = "#333335"; // Darkened base grey
        ctx.fillRect(0, 0, 128, 128);
        const imgData = ctx.getImageData(0, 0, 128, 128);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() - 0.5) * 45; // Reduced noise amplitude for smoother dark texture
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
        ctx.fillStyle = "#0c0c0e"; // Darkened carbon base
        ctx.fillRect(0, 0, 64, 64);
        
        ctx.strokeStyle = "#1b1b22"; // Subtle grid lines
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i <= 64; i += 8) {
          ctx.moveTo(i, 0);
          ctx.lineTo(i, 64);
          ctx.moveTo(0, i);
          ctx.lineTo(64, i);
        }
        ctx.stroke();

        ctx.fillStyle = "#141418"; // Darker microtexture dots
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
      color: 0x0a0a0c, // Darkened inner blocks
      roughness: 0.9,
      metalness: 0.1,
    });

    const sandblastTex = createSandblastedTexture();
    const gridTex = createGridTexture();

    // Premium outer face materials (Darkened for high-contrast premium dark aesthetic)
    const outerMats = {
      obsidian: new THREE.MeshPhysicalMaterial({
        color: 0x08080a, // Sleek, dark glassy obsidian
        roughness: 0.05,
        metalness: 0.98,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
      }),
      sandblast: new THREE.MeshPhysicalMaterial({
        color: 0x121215, // Dark slate sandblast
        bumpMap: sandblastTex,
        bumpScale: 0.025,
        roughness: 0.8,
        metalness: 0.45,
      }),
      grid: new THREE.MeshPhysicalMaterial({
        color: 0x0e0e11, // Dark carbon grid mesh
        map: gridTex,
        roughness: 0.5,
        metalness: 0.85,
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

          // Add a thin cyber-glow wire outline for each block (Dynamic glowing accent lines)
          const edges = new THREE.EdgesGeometry(geometry);
          const lineMat = new THREE.LineBasicMaterial({
            color: glowColor,
            transparent: true,
            opacity: 0.4, // Balanced opacity for nice digital outline
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
      <div className={`absolute w-[320px] h-[320px] rounded-full blur-[90px] pointer-events-none ${radialBgClass}`} />
      <canvas
        ref={canvasRef}
        className="w-full h-full outline-none cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
