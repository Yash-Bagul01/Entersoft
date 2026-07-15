"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Scroll3DCanvasProps {
  isPatched: boolean;
  activeVuln: string;
}

export default function Scroll3DCanvas({ isPatched, activeVuln }: Scroll3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use refs to track values across animation loop without re-triggering useEffect
  const stateRef = useRef({ isPatched, activeVuln });
  useEffect(() => {
    stateRef.current = { isPatched, activeVuln };
  }, [isPatched, activeVuln]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.5);
    camera.lookAt(0, 0, 0);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(5, 8, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight2.position.set(-5, -5, -2);
    scene.add(dirLight2);

    // Keypoint spotlight for metallic reflections
    const spotLight = new THREE.SpotLight(0xffffff, 4.0);
    spotLight.position.set(0, 4, 5);
    scene.add(spotLight);

    // 4. Upgraded Mesh: High-quality reflective TorusKnot (Cryptographic knot)
    const geometry = new THREE.TorusKnotGeometry(0.8, 0.24, 250, 36, 3, 5);
    
    // Physical metallic shader
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xe5ff5d, // Citrine Signal
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.2, // hybrid glass-metal refraction
      thickness: 0.5,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Track scroll position
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Lerp helper
    const lerp = (start: number, end: number, amt: number) => {
      return (1 - amt) * start + amt * end;
    };

    // Tracking current animated states for smooth lerp transitions
    const current = {
      x: 0,
      y: 1.1,
      z: 0,
      scale: 1.05,
      rotX: 0,
      rotY: 0,
      colorR: 229 / 255,
      colorG: 255 / 255,
      colorB: 93 / 255,
    };

    // 5. Animation Loop
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Determine viewport size type
      const isMobile = window.innerWidth < 1024;

      // Calculate scroll progress percentage (capped between 0 and 1)
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // Define checkpoints targets based on scroll progress
      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;
      let targetScale = 1.0;
      let targetRotSpeed = 0.008;
      
      // Target Color representation
      let targetR = 229 / 255;
      let targetG = 255 / 255;
      let targetB = 93 / 255;

      // Check current active debugger state
      const { isPatched: debuggerPatched, activeVuln: debuggerVuln } = stateRef.current;

      // Scroll checkpoints mapping:
      // Hero (0.00 -> 0.20)
      // Fuzzing (0.20 -> 0.45)
      // Debugger (0.45 -> 0.75)
      // Protocols (0.75 -> 1.00)
      if (progress < 0.22) {
        // Hero targets
        const ratio = progress / 0.22;
        if (isMobile) {
          targetX = 0;
          targetY = lerp(0.9, -0.6, ratio);
          targetZ = -1.2;
          targetScale = 0.75;
        } else {
          targetX = lerp(0, 0.4, ratio);
          targetY = lerp(1.1, -0.4, ratio);
          targetZ = 0;
          targetScale = 1.1;
        }
        targetRotSpeed = 0.008;
      } else if (progress < 0.48) {
        // Fuzzing targets
        const ratio = (progress - 0.22) / 0.26;
        if (isMobile) {
          targetX = 0;
          targetY = lerp(-0.6, 0.9, ratio);
          targetZ = -1.2;
          targetScale = 0.7;
        } else {
          targetX = lerp(0.4, -1.8, ratio);
          targetY = lerp(-0.4, -0.1, ratio);
          targetZ = -0.2;
          targetScale = 1.15;
        }
        // Rotate rapidly to simulate processing
        targetRotSpeed = 0.045;
        
        // Citrine Signal in fuzzing phase
        targetR = 229 / 255;
        targetG = 255 / 255;
        targetB = 93 / 255;
      } else if (progress < 0.76) {
        // Debugger targets
        const ratio = (progress - 0.48) / 0.28;
        if (isMobile) {
          targetX = 0;
          targetY = lerp(0.9, -0.7, ratio);
          targetZ = -1.4;
          targetScale = 0.65;
        } else {
          targetX = lerp(-1.8, 1.8, ratio);
          targetY = lerp(-0.1, -0.1, ratio);
          targetZ = 0;
          targetScale = 1.0;
        }
        targetRotSpeed = 0.01;

        // Change color based on debugger checks
        if (debuggerPatched) {
          // Pure Citrine
          targetR = 229 / 255;
          targetG = 255 / 255;
          targetB = 93 / 255;
        } else if (debuggerVuln !== "none") {
          // Warning Red
          targetR = 239 / 255;
          targetG = 68 / 255;
          targetB = 68 / 255;
        } else {
          // Standby Stone grey
          targetR = 156 / 255;
          targetG = 156 / 255;
          targetB = 156 / 255;
        }
      } else {
        // Protocols targets
        const ratio = (progress - 0.76) / 0.24;
        if (isMobile) {
          targetX = 0;
          targetY = lerp(-0.7, -1.2, ratio);
          targetZ = -1.6;
          targetScale = 0.55;
        } else {
          targetX = lerp(1.8, 0, ratio);
          targetY = lerp(-0.1, -0.4, ratio);
          targetZ = lerp(0, -1.6, ratio);
          targetScale = 0.85;
        }
        targetRotSpeed = 0.005;

        // Secured Citrine
        targetR = 229 / 255;
        targetG = 255 / 255;
        targetB = 93 / 255;
      }

      // Smooth Lerp step calculations
      current.x = lerp(current.x, targetX, 0.06);
      current.y = lerp(current.y, targetY, 0.06);
      current.z = lerp(current.z, targetZ, 0.06);
      current.scale = lerp(current.scale, targetScale, 0.06);
      
      current.colorR = lerp(current.colorR, targetR, 0.08);
      current.colorG = lerp(current.colorG, targetG, 0.08);
      current.colorB = lerp(current.colorB, targetB, 0.08);

      // Apply animated properties to Three.js mesh
      mesh.position.set(current.x, current.y, current.z);
      mesh.scale.set(current.scale, current.scale, current.scale);
      
      // Auto-rotation spins along with scroll speed
      mesh.rotation.y += targetRotSpeed;
      mesh.rotation.x += 0.004;
      mesh.rotation.z += 0.002;

      // Update material color vector
      material.color.setRGB(current.colorR, current.colorG, current.colorB);

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize Handler
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
    </div>
  );
}
