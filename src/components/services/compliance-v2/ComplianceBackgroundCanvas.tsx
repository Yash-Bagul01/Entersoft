"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ComplianceBackgroundCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Regular white light
    const whiteDirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    whiteDirLight.position.set(5, 5, 5);
    scene.add(whiteDirLight);

    // Signature Lime Green Accent Light
    const limeAccentLight = new THREE.PointLight(0xCCFF33, 0, 20); // starts dark
    limeAccentLight.position.set(0, 2, 4);
    scene.add(limeAccentLight);

    // --- Geometry Data ---
    // A symmetrical dual-geodesic structure (24 nodes)
    const targetVertices = [
      // Outer layer (Octahedron vertices)
      new THREE.Vector3(0, 2.2, 0),    // 0
      new THREE.Vector3(0, -2.2, 0),   // 1
      new THREE.Vector3(2.2, 0, 0),    // 2
      new THREE.Vector3(-2.2, 0, 0),   // 3
      new THREE.Vector3(0, 0, 2.2),    // 4
      new THREE.Vector3(0, 0, -2.2),   // 5
      
      // Mid layer (Cuboctahedron / connection nodes)
      new THREE.Vector3(1.1, 1.1, 1.1),   // 6
      new THREE.Vector3(1.1, 1.1, -1.1),  // 7
      new THREE.Vector3(1.1, -1.1, 1.1),  // 8
      new THREE.Vector3(1.1, -1.1, -1.1), // 9
      new THREE.Vector3(-1.1, 1.1, 1.1),  // 10
      new THREE.Vector3(-1.1, 1.1, -1.1), // 11
      new THREE.Vector3(-1.1, -1.1, 1.1), // 12
      new THREE.Vector3(-1.1, -1.1, -1.1),// 13

      // Inner core (Octahedron core)
      new THREE.Vector3(0, 0.7, 0),    // 14
      new THREE.Vector3(0, -0.7, 0),   // 15
      new THREE.Vector3(0.7, 0, 0),    // 16
      new THREE.Vector3(-0.7, 0, 0),   // 17
      new THREE.Vector3(0, 0, 0.7),    // 18
      new THREE.Vector3(0, 0, -0.7),   // 19

      // Extra connectors for symmetry
      new THREE.Vector3(0.5, 0.5, 0.5),   // 20
      new THREE.Vector3(-0.5, 0.5, 0.5),  // 21
      new THREE.Vector3(0.5, -0.5, 0.5),  // 22
      new THREE.Vector3(0.5, 0.5, -0.5),  // 23
    ];

    const numNodes = targetVertices.length;

    // Scattered layout (disconnected practices)
    const scatteredVertices: THREE.Vector3[] = [];
    const seedRandom = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < numNodes; i++) {
      const rx = (seedRandom(i * 12 + 1) - 0.5) * 8;
      const ry = (seedRandom(i * 17 + 2) - 0.5) * 8;
      const rz = (seedRandom(i * 23 + 3) - 0.5) * 6;
      scatteredVertices.push(new THREE.Vector3(rx, ry, rz));
    }

    // Connect indices to form wireframe architecture
    const connections = [
      // Outer octahedron ring
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2],

      // Mid layer octahedron ties
      [6, 0], [6, 2], [6, 4],
      [7, 0], [7, 2], [7, 5],
      [8, 1], [8, 2], [8, 4],
      [9, 1], [9, 2], [9, 5],
      [10, 0], [10, 3], [10, 4],
      [11, 0], [11, 3], [11, 5],
      [12, 1], [12, 3], [12, 4],
      [13, 1], [13, 3], [13, 5],

      // Core ties
      [14, 16], [14, 17], [14, 18], [14, 19],
      [15, 16], [15, 17], [15, 18], [15, 19],
      [16, 18], [18, 17], [17, 19], [19, 16],

      // Connector nodes linking core to outer
      [20, 6], [20, 14], [20, 18],
      [21, 10], [21, 14], [21, 18],
      [22, 8], [22, 15], [22, 18],
      [23, 7], [23, 14], [23, 19],
    ];

    // Node spheres group
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const nodeGeometry = new THREE.SphereGeometry(0.045, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sphereMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < numNodes; i++) {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      mesh.position.copy(scatteredVertices[i]);
      nodeGroup.add(mesh);
      sphereMeshes.push(mesh);
    }

    // Line segments connecting nodes
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    const lineGeometries: THREE.BufferGeometry[] = [];
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });

    connections.forEach((conn) => {
      const geom = new THREE.BufferGeometry().setFromPoints([
        scatteredVertices[conn[0]],
        scatteredVertices[conn[1]],
      ]);
      const line = new THREE.Line(geom, lineMaterial);
      lineGroup.add(line);
      lineGeometries.push(geom);
    });

    // Solid Shaded Faces (added in Phase 2)
    // We group triangles of outer structure
    const faceGroup = new THREE.Group();
    scene.add(faceGroup);

    const faces = [
      // Outer faces
      [0, 6, 4], [0, 4, 10], [0, 10, 3], [0, 3, 11], [0, 11, 5], [0, 5, 7], [0, 7, 2], [0, 2, 6],
      [1, 8, 4], [1, 4, 12], [1, 12, 3], [1, 3, 13], [1, 13, 5], [1, 5, 9], [1, 9, 2], [1, 2, 8],
    ];

    const faceMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      roughness: 0.2,
      metalness: 0.8,
      flatShading: true,
    });

    const faceMeshes: THREE.Mesh[] = [];
    faces.forEach((f) => {
      const geom = new THREE.BufferGeometry();
      // Setup dynamic vertex tracking
      const vertices = new Float32Array(9); // 3 points * 3 coords
      geom.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
      const mesh = new THREE.Mesh(geom, faceMaterial);
      faceGroup.add(mesh);
      faceMeshes.push(mesh);
    });

    // --- GSAP Scroll-linked Animation State ---
    const animState = {
      progress: 0, // global page progress (0 to 1)
      yRotation: 0,
      hoverOffset: 0,
    };

    if (isReduced) {
      // Reduced motion fallback: show structure fully resolved, static
      animState.progress = 1.0;
      nodeGroup.rotation.y = 0.3;
      nodeGroup.rotation.x = 0.2;
      lineGroup.rotation.y = 0.3;
      lineGroup.rotation.x = 0.2;
      faceGroup.rotation.y = 0.3;
      faceGroup.rotation.x = 0.2;

      // Position vertices instantly
      for (let i = 0; i < numNodes; i++) {
        sphereMeshes[i].position.copy(targetVertices[i]);
      }
      connections.forEach((conn, index) => {
        const positions = new Float32Array([
          targetVertices[conn[0]].x, targetVertices[conn[0]].y, targetVertices[conn[0]].z,
          targetVertices[conn[1]].x, targetVertices[conn[1]].y, targetVertices[conn[1]].z,
        ]);
        lineGeometries[index].setAttribute("position", new THREE.BufferAttribute(positions, 3));
        lineGeometries[index].attributes.position.needsUpdate = true;
      });
      faces.forEach((f, idx) => {
        const positions = new Float32Array([
          targetVertices[f[0]].x, targetVertices[f[0]].y, targetVertices[f[0]].z,
          targetVertices[f[1]].x, targetVertices[f[1]].y, targetVertices[f[1]].z,
          targetVertices[f[2]].x, targetVertices[f[2]].y, targetVertices[f[2]].z,
        ]);
        faceMeshes[idx].geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        faceMeshes[idx].geometry.computeVertexNormals();
        faceMeshes[idx].geometry.attributes.position.needsUpdate = true;
      });

      faceMaterial.opacity = 0.15;
      limeAccentLight.intensity = 3.0;
      renderer.render(scene, camera);
      return;
    }

    // Scroll trigger binding across the entire page height
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: "#compliance-v2-container",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        animState.progress = self.progress;
      },
    });

    // --- Interactive Mouse Tilt ---
    let targetMouseX = 0;
    let targetMouseY = 0;
    let curMouseX = 0;
    let curMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- Animation Rendering Loop ---
    let frameId: number;

    const tick = () => {
      // 1. Mouse parallax interpolation
      curMouseX += (targetMouseX * 0.4 - curMouseX) * 0.05;
      curMouseY += (targetMouseY * 0.4 - curMouseY) * 0.05;

      // 2. Slow idle spin
      animState.yRotation += 0.003;

      // Apply rotation on all groups
      const totalRotX = curMouseY + Math.sin(animState.yRotation * 0.4) * 0.05;
      const totalRotY = curMouseX + animState.yRotation;

      nodeGroup.rotation.x = totalRotX;
      nodeGroup.rotation.y = totalRotY;

      lineGroup.rotation.x = totalRotX;
      lineGroup.rotation.y = totalRotY;

      faceGroup.rotation.x = totalRotX;
      faceGroup.rotation.y = totalRotY;

      // 3. Interpolate vertices based on scroll progress
      // Assembly range: scroll progress 0.0 to 0.45
      const assemblyProgress = Math.min(animState.progress / 0.45, 1);
      
      const currentPositions: THREE.Vector3[] = [];

      for (let i = 0; i < numNodes; i++) {
        const v = new THREE.Vector3().lerpVectors(
          scatteredVertices[i],
          targetVertices[i],
          assemblyProgress
        );
        sphereMeshes[i].position.copy(v);
        currentPositions.push(v);
      }

      // Update connection lines coordinates
      connections.forEach((conn, index) => {
        const positions = new Float32Array([
          currentPositions[conn[0]].x, currentPositions[conn[0]].y, currentPositions[conn[0]].z,
          currentPositions[conn[1]].x, currentPositions[conn[1]].y, currentPositions[conn[1]].z,
        ]);
        lineGeometries[index].setAttribute("position", new THREE.BufferAttribute(positions, 3));
        lineGeometries[index].attributes.position.needsUpdate = true;
      });

      // 4. Solid faces opacity and geometry updates (Process section, progress 0.4 to 0.75)
      let faceOpacity = 0;
      if (animState.progress > 0.4) {
        faceOpacity = Math.min((animState.progress - 0.4) / 0.28, 0.35); // Max opacity of 0.35
      }
      faceMaterial.opacity = faceOpacity;

      // Update face meshes position coordinates dynamically
      faces.forEach((f, idx) => {
        const positions = new Float32Array([
          currentPositions[f[0]].x, currentPositions[f[0]].y, currentPositions[f[0]].z,
          currentPositions[f[1]].x, currentPositions[f[1]].y, currentPositions[f[1]].z,
          currentPositions[f[2]].x, currentPositions[f[2]].y, currentPositions[f[2]].z,
        ]);
        faceMeshes[idx].geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        faceMeshes[idx].geometry.computeVertexNormals();
        faceMeshes[idx].geometry.attributes.position.needsUpdate = true;
      });

      // 5. Lime Green certified moment (Proof & CTA, progress 0.72 to 1.0)
      let limeIntensity = 0;
      if (animState.progress > 0.7) {
        limeIntensity = Math.min((animState.progress - 0.7) / 0.15, 1) * 3.5; // Max intensity 3.5
      }
      limeAccentLight.intensity = limeIntensity;

      // Animate lime accent light position slightly for specular highlights
      const lightTime = performance.now() * 0.001;
      limeAccentLight.position.x = Math.sin(lightTime * 0.8) * 3;
      limeAccentLight.position.z = Math.cos(lightTime * 0.8) * 3 + 2;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    tick();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frameId);
      scrollTriggerInstance.kill();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Dispose resources
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineMaterial.dispose();
      faceMaterial.dispose();

      sphereMeshes.forEach((mesh) => scene.remove(mesh));
      lineGeometries.forEach((geom) => geom.dispose());
      faceMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        scene.remove(mesh);
      });

      renderer.dispose();
    };
  }, [isReduced]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: "hidden" }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block bg-transparent" 
      />
    </div>
  );
}
