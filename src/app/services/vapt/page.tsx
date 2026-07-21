"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import VAPTHero from "@/components/services/VAPTHero";
import ServiceCTA from "@/components/services/ServiceCTA";
import SectionLabel from "@/components/ui/SectionLabel";
import { servicePagesData } from "@/data/services";
import { ChevronRight, Plus, Minus, CheckCircle, ShieldAlert, BadgeAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import { APP_URL, getCanonicalUrl, ROUTES } from "@/config/routes";

// Custom FAQ Accordion Item matching Sui.io style
function FAQAccordionItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-zinc-800 w-full backdrop-blur-md">
      <button
        onClick={onToggle}
        className="w-full py-6 flex justify-between items-center text-left gap-4 group focus:outline-none select-none"
      >
        <span className={`font-display text-base md:text-lg font-medium transition-colors duration-300 ${isOpen ? "text-[#BD00FF]" : "text-zinc-300 group-hover:text-white"}`}>
          {question}
        </span>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-[#BD00FF]/10 text-[#BD00FF] rotate-180" : "bg-zinc-900 text-zinc-500 group-hover:text-zinc-300"}`}>
          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "max-h-[300px] opacity-100 pb-6" : "max-h-0 opacity-0"}`}>
        <p className="font-sans text-sm text-zinc-400 leading-relaxed max-w-[800px]">
          {answer}
        </p>
      </div>
    </div>
  );
}

interface ThreeCanvasProps {
  color: number;
  type: "globe" | "knot" | "shield";
}

function ThreeCanvas({ color, type }: ThreeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 250;
    const height = rect.height || 333;

    // Create scene
    const scene = new THREE.Scene();

    // Centered Camera straight on Z-axis to prevent off-center visibility issues
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.0);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- High-Intensity Lighting Rig ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(0, 0, 4);
    scene.add(dirLight);

    // Core point light to illuminate custom mesh faces intensely
    const pointLight = new THREE.PointLight(color, 4.0, 10);
    pointLight.position.set(0, 0, 0.8);
    scene.add(pointLight);

    // Parent group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    let updateAnimation: (time: number) => void = () => {};

    if (type === "globe") {
      // Phase 1: Interactive 3D Cyber DNA Double Helix (Organic Code Chain)
      const helixGroup = new THREE.Group();
      mainGroup.add(helixGroup);

      const strandCount = 22;
      const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const sphereMat1 = new THREE.MeshStandardMaterial({ color, roughness: 0.1, metalness: 0.9, emissive: color, emissiveIntensity: 0.8 });
      const sphereMat2 = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, metalness: 0.9, emissive: color, emissiveIntensity: 0.4 });
      
      const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 });

      const strandAMeshes: THREE.Mesh[] = [];
      const strandBMeshes: THREE.Mesh[] = [];
      const connectorLines: THREE.Line[] = [];

      for (let i = 0; i < strandCount; i++) {
        const meshA = new THREE.Mesh(sphereGeo, sphereMat1);
        const meshB = new THREE.Mesh(sphereGeo, sphereMat2);
        helixGroup.add(meshA);
        helixGroup.add(meshB);
        strandAMeshes.push(meshA);
        strandBMeshes.push(meshB);

        // Connector line
        const dummyGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
        const line = new THREE.Line(dummyGeo, lineMat);
        helixGroup.add(line);
        connectorLines.push(line);
      }

      updateAnimation = (time) => {
        helixGroup.rotation.y = time * 0.45;
        helixGroup.rotation.x = Math.sin(time * 0.2) * 0.15;

        for (let i = 0; i < strandCount; i++) {
          const t = (i / strandCount) * Math.PI * 3.5 + time * 0.8;
          const y = (i / strandCount) * 2.8 - 1.4;

          const xA = Math.cos(t) * 0.8;
          const zA = Math.sin(t) * 0.8;
          strandAMeshes[i].position.set(xA, y, zA);

          const xB = -Math.cos(t) * 0.8;
          const zB = -Math.sin(t) * 0.8;
          strandBMeshes[i].position.set(xB, y, zB);

          // Update connector line vertices
          const points = [strandAMeshes[i].position, strandBMeshes[i].position];
          connectorLines[i].geometry.setFromPoints(points);
        }
      };
    } else if (type === "knot") {
      // Phase 2: 3D Undulating Wave Grid (Cyber Terrain Scanner)
      const waveGroup = new THREE.Group();
      mainGroup.add(waveGroup);

      const cols = 14;
      const rows = 14;
      const spacing = 0.2;
      const startX = -((cols - 1) * spacing) / 2;
      const startY = -((rows - 1) * spacing) / 2;

      const sphereGeo = new THREE.SphereGeometry(0.065, 12, 12);
      const sphereMat = new THREE.MeshStandardMaterial({ 
        color, 
        roughness: 0.1, 
        metalness: 0.9, 
        emissive: color, 
        emissiveIntensity: 0.9 
      });

      const gridPoints: THREE.Mesh[][] = [];

      for (let c = 0; c < cols; c++) {
        gridPoints[c] = [];
        for (let r = 0; r < rows; r++) {
          const mesh = new THREE.Mesh(sphereGeo, sphereMat);
          const x = startX + c * spacing;
          const y = startY + r * spacing;
          mesh.position.set(x, y, 0);
          waveGroup.add(mesh);
          gridPoints[c][r] = mesh;
        }
      }

      // Beautiful tilted orientation for depth
      waveGroup.rotation.x = -Math.PI / 3.4;
      waveGroup.rotation.y = Math.PI / 12;
      waveGroup.rotation.z = Math.PI / 7;

      updateAnimation = (time) => {
        // Organic undulating terrain coordinates
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            const mesh = gridPoints[c][r];
            if (mesh) {
              const dx = c - cols / 2;
              const dy = r - rows / 2;
              const dist = Math.sqrt(dx * dx + dy * dy) * 0.35;
              mesh.position.z = Math.sin(time * 1.5 + dist) * 0.45;
            }
          }
        }
        // slow rotation of the whole plane
        waveGroup.rotation.z = Math.PI / 7 + Math.sin(time * 0.1) * 0.15;
      };
    } else {
      // Phase 3: 3D Swarming Quantum Orb (Active Security Core)
      const swarmGroup = new THREE.Group();
      mainGroup.add(swarmGroup);

      // Central physical locking nucleus
      const coreGeo = new THREE.DodecahedronGeometry(0.55, 0);
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: 0x0f172a,
        metalness: 0.98,
        roughness: 0.1,
        clearcoat: 1.0,
        emissive: color,
        emissiveIntensity: 0.35
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      swarmGroup.add(core);

      const particleCount = 40;
      const particleGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const particleMat = new THREE.MeshStandardMaterial({ 
        color, 
        roughness: 0.2, 
        metalness: 0.85, 
        emissive: color, 
        emissiveIntensity: 0.9 
      });

      const particles: { mesh: THREE.Mesh; angle: number; radius: number; speed: number; yOffset: number }[] = [];

      for (let i = 0; i < particleCount; i++) {
        const mesh = new THREE.Mesh(particleGeo, particleMat);
        const radius = 0.85 + Math.random() * 0.85;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.008 + Math.random() * 0.012;
        const yOffset = (Math.random() - 0.5) * 1.6;

        mesh.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
        swarmGroup.add(mesh);

        particles.push({ mesh, angle, radius, speed, yOffset });
      }

      updateAnimation = (time) => {
        core.rotation.y = time * 0.6;
        core.rotation.x = time * 0.3;

        // Pulse the core size
        const coreScale = 0.95 + Math.sin(time * 2.5) * 0.1;
        core.scale.set(coreScale, coreScale, coreScale);

        // Orbit the satellite particles swarming around the core
        particles.forEach((p) => {
          p.angle += p.speed;
          p.mesh.position.x = Math.cos(p.angle) * p.radius;
          p.mesh.position.z = Math.sin(p.angle) * p.radius;
          p.mesh.position.y = p.yOffset + Math.sin(p.angle * 2.5) * 0.15;
        });

        swarmGroup.rotation.y = time * 0.15;
      };
    }

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.0012;
      updateAnimation(time);
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      const w = canvas.clientWidth || 250;
      const h = canvas.clientHeight || 333;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      
      // Dispose geometries & materials
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => mat.dispose());
        } else {
          object.material.dispose();
        }
      });
    };
  }, [color, type]);

  return <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />;
}

const pipelineSteps = [
  {
    key: 0,
    step: "01",
    titleLine1: "DISCOVERY & SURFACE",
    titleLine2: "BOUNDARY DIAGNOSTIC",
    descLines: [
      "WE CATALOG AND ANALYZE EXPOSED BOUNDARIES",
      "TO IDENTIFY GATEWAY THREAT SHADOWS.",
      "EVERY ENTRY POINT IS ACTIVELY MAPPED",
      "BEFORE DEEPER LOGIC EXPLOIT STAGES BEGIN."
    ],
    color: 0x06b6d4, // Cyan
    type: "globe" as const,
    colorClass: "text-cyan-400",
    glowBorderColor: "rgba(6, 182, 212, 0.25)"
  },
  {
    key: 1,
    step: "02",
    titleLine1: "CREDENTIALED LOGIC",
    titleLine2: "PENETRATION & TESTING",
    descLines: [
      "WE SIMULATE AUTHENTICATED THREAT SCENARIOS.",
      "TESTING API PRIVILEGES AND GATEWAY ACLS",
      "TO UNCOVER CRITICAL DATA ACCESS VECTORS",
      "THAT AUTOMATED SCANNING SYSTEMS MISS."
    ],
    color: 0xf59e0b, // Amber
    type: "knot" as const,
    colorClass: "text-amber-500",
    glowBorderColor: "rgba(245, 158, 11, 0.25)"
  },
  {
    key: 2,
    step: "03",
    titleLine1: "REMEDIATION SIGNATURE",
    titleLine2: "& RETEST SIGN-OFF",
    descLines: [
      "WE DELIVER COMPLETE EXPLOIT PROOF SCRIPTS.",
      "SUPPORTING REMEDIATION RE-AUDITS FOR 90 DAYS",
      "TO CONFIRM FULL ARCHITECTURE STABILITY",
      "AND PROVABLE THREAT MITIGATION SIGN-OFF."
    ],
    color: 0x10b981, // Emerald
    type: "shield" as const,
    colorClass: "text-emerald-500",
    glowBorderColor: "rgba(16, 185, 129, 0.25)"
  }
];

function ScrollRevealItem({ 
  step, 
  titleLine1, 
  titleLine2, 
  descLines, 
  color, 
  type,
  colorClass, 
  glowBorderColor,
  idx
}: { 
  step: string; 
  titleLine1: string; 
  titleLine2: string; 
  descLines: string[]; 
  color: number;
  type: "globe" | "knot" | "shield";
  colorClass: string; 
  glowBorderColor: string; 
  idx: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this card relative to viewport
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  // GSAP-grade scroll-linked scale-down and opacity fades for both entry and exit
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.95, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.7, 1, 1, 0.7]);
  
  // Title animations: slide-up on entry, fade-out on exit
  const titleY = useTransform(scrollYProgress, [0, 0.45], [40, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.6, 0.85], [0, 1, 1, 0]);

  // Description animations: slide-up and fade
  const descY = useTransform(scrollYProgress, [0.1, 0.48], [30, 0]);
  const descOpacity = useTransform(scrollYProgress, [0.2, 0.48, 0.6, 0.85], [0, 1, 1, 0]);

  // Image animations: inner-crop zoom and parallax position y-shift
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.0, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <motion.div 
      ref={itemRef} 
      style={{ 
        scale, 
        opacity,
        zIndex: 10 + idx,
      }}
      className="relative lg:sticky lg:top-0 w-full min-h-[100vh] min-h-[100dvh] flex flex-col items-center justify-center bg-[#030712] overflow-hidden select-none border-b border-zinc-950/60 py-12 lg:py-0"
    >
      {/* Background tech grids */}
      <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0 bg-radial-gradient bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.015)_0%,transparent_80%)]" />
        <div className="absolute inset-0 flex justify-between px-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-[1px] h-full bg-zinc-900/15" />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between h-[80%] max-h-[580px] w-full px-6 max-w-[1200px] mx-auto text-center">
        
        {/* Phase Label & Bold Condensed Title (detroit.paris style) */}
        <motion.div 
          style={{ y: titleY, opacity: titleOpacity }}
          className="flex flex-col items-center"
        >
          <span className={`font-mono text-[9px] font-bold tracking-[0.25em] ${colorClass} mb-4`}>
            PHASE {step} // PIPELINE
          </span>
          <h2 className="font-display uppercase text-center text-4xl sm:text-5xl md:text-[3.8rem] lg:text-[4.4rem] font-extrabold tracking-tighter leading-[0.85] text-white max-w-[850px] mx-auto">
            {titleLine1}<br/>{titleLine2}
          </h2>
        </motion.div>

        {/* Image: Centered, vertical aspect ratio (aspect-[3/4]) */}
        <div 
          className="w-[190px] sm:w-[220px] md:w-[250px] aspect-[3/4] rounded-lg overflow-hidden border bg-zinc-950/40 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-colors duration-500 relative flex items-center justify-center p-2"
          style={{ borderColor: glowBorderColor }}
        >
          <motion.div 
            className="w-full h-full relative"
            style={{ scale: imageScale, y: imageY }}
          >
            <ThreeCanvas color={color} type={type} />
            <div className="absolute inset-0 bg-scanlines opacity-[0.02] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Description paragraph centered lines */}
        <motion.div 
          style={{ y: descY, opacity: descOpacity }}
          className="flex flex-col items-center gap-2 md:gap-2.5 max-w-[780px] px-4"
        >
          {descLines.map((line, lIdx) => (
            <p 
              key={lIdx} 
              className="font-mono text-[10.5px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.18em] leading-normal text-zinc-300 font-medium"
            >
              {line}
            </p>
          ))}
        </motion.div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .bg-scanlines {
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.25) 50%
          ), linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.06),
            rgba(0, 255, 0, 0.02),
            rgba(0, 0, 255, 0.06)
          );
          background-size: 100% 4px, 6px 100%;
        }
      `}} />
    </motion.div>
  );
}

export default function VAPTPage() {
  const data = servicePagesData.vapt;
  const canonicalUrl = getCanonicalUrl(ROUTES.services.vapt);

  // FAQ accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  useEffect(() => {
    // Force dark theme on this page only
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${APP_URL}/#organization`,
        "name": "Entersoft Security",
        "url": APP_URL,
        "logo": {
          "@type": "ImageObject",
          "@id": `${APP_URL}/#logo`,
          "url": "https://d2ghx8biuioax8.cloudfront.net/main-website-images/entersoftLogo.svg",
          "caption": "Entersoft Security Logo"
        },
        "description": "One scan to know where you are exposed. One report to fix it fast. Award-winning cybersecurity including AppSec, VAPT, Managed Cloud Security, Compliance, SIEM, and Smart Contract audits."
      },
      {
        "@type": "WebSite",
        "@id": `${APP_URL}/#website`,
        "url": APP_URL,
        "name": "Entersoft Security",
        "publisher": {
          "@id": `${APP_URL}/#organization`
        }
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}/#webpage`,
        "url": canonicalUrl,
        "name": "Adversarial Validation | Vulnerability Assessment & Pen Testing | Entersoft",
        "description": "Expert-driven vulnerability assessment and penetration testing (VAPT) providing real exploit proofs. CERT-In certified audit compliance with zero false-positive reports.",
        "inLanguage": "en",
        "isPartOf": {
          "@id": `${APP_URL}/#website`
        },
        "about": {
          "@id": `${canonicalUrl}/#service`
        },
        "breadcrumb": {
          "@id": `${canonicalUrl}/#breadcrumb`
        }
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}/#service`,
        "name": "Adversarial Validation",
        "serviceType": "Adversarial Validation",
        "provider": {
          "@id": `${APP_URL}/#organization`
        },
        "description": "Expert penetration testing with active exploitation proof. CERT-In certified audit compliance with zero false-positive reports.",
        "areaServed": {
          "@type": "Country",
          "name": "Global"
        },
        "url": canonicalUrl
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": getCanonicalUrl(ROUTES.home)
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Adversarial Validation",
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}/#faq`,
        "mainEntity": data.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <main className="w-full flex flex-col relative overflow-hidden bg-[#030712]">
      {/* Sui technical grid overlay line structure */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-zinc-900/30" />
        <div className="absolute top-0 bottom-0 left-[80%] w-[1px] bg-zinc-900/30" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Sui-style Hero */}
      <VAPTHero
        category={data.category}
        title={data.heroStatement}
        tagline={data.tagline}
        col2Description={data.col2Description}
        col3Metadata={data.col3Metadata}
        scrollTargetId="#vapt-stats"
      />

      {/* SECTION 1: Sui DeFi Stats Grid */}
      <section id="vapt-stats" className="relative w-full bg-[#030712] px-6 md:px-12 py-24 md:py-32 border-b border-zinc-900 overflow-hidden">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-16 relative z-10">
          
          {/* Header block */}
          <div className="flex flex-col gap-3 max-w-[800px] text-left">
            <SectionLabel color="secondary">01 / PERFORMANCE METRICS</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-display font-medium uppercase text-white tracking-tight">
              PROVABLE AUDIT RESOLUTION
            </h2>
            <p className="font-sans text-sm md:text-base text-zinc-400 leading-relaxed max-w-[620px]">
              Every penetration test runs active manual validation to eliminate false scanner noise, producing incontrovertible evidence.
            </p>
          </div>

          {/* Stats grid cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              {
                num: "0%",
                title: "FALSE POSITIVES",
                desc: "Every logic vulnerability is manually validated by security leads, eliminating automated scanner noise.",
                accentColor: "cyan",
                colorClass: "text-cyan-400",
                glowColor: "#06b6d4",
                borderGlow: "rgba(6, 182, 212, 0.25)",
                borderTop: "border-t-cyan-500/70",
                hoverBorder: "hover:border-cyan-500/40",
                icon: <CheckCircle className="w-5 h-5 text-cyan-400" />,
                hud: (
                  <div className="relative w-full h-14 bg-black/40 rounded border border-white/5 overflow-hidden font-mono text-[9px] p-2 text-zinc-500 flex flex-col justify-between select-none">
                    <div className="flex justify-between items-center text-cyan-400 font-bold">
                      <span>[ NOISE FILTER: ACTIVE ]</span>
                      <span className="animate-pulse">0% FALSE</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden relative">
                      <motion.div 
                        className="absolute top-0 bottom-0 left-0 bg-cyan-500" 
                        animate={{ width: ["0%", "100%", "100%", "0%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                    <div className="flex justify-between text-[8px] text-zinc-600">
                      <span>SCAN NOISE: 0.00%</span>
                      <span>VALIDATION: 100%</span>
                    </div>
                  </div>
                )
              },
              {
                num: "100%",
                title: "EXPLOIT PROOFS",
                desc: "We provide Proof of Concept videos and exploit scripts proving target vulnerability impact.",
                accentColor: "amber",
                colorClass: "text-amber-500",
                glowColor: "#f59e0b",
                borderGlow: "rgba(245, 158, 11, 0.25)",
                borderTop: "border-t-amber-500/70",
                hoverBorder: "hover:border-amber-500/40",
                icon: <ShieldAlert className="w-5 h-5 text-amber-500" />,
                hud: (
                  <div className="relative w-full h-14 bg-black/40 rounded border border-white/5 overflow-hidden font-mono text-[9px] p-2 text-zinc-500 flex flex-col justify-between select-none">
                    <div className="flex justify-between items-center text-amber-500 font-bold">
                      <span>[ POC SHELL EXPLOIT ]</span>
                      <span className="animate-pulse">SUCCESS</span>
                    </div>
                    <div className="text-[8px] text-amber-500/80 leading-none truncate">
                      $ ./exploit_payload.sh --target internal_api
                    </div>
                    <div className="flex justify-between items-center text-[8px] text-zinc-600">
                      <span>VULN: <span className="text-emerald-500 font-bold">[CONFIRMED]</span></span>
                      <span>ACCURACY: 100%</span>
                    </div>
                  </div>
                )
              },
              {
                num: "90-DAY",
                title: "RETEST PERIOD",
                desc: "Get unlimited retesting of patch updates within 90 days to verify configuration stability.",
                accentColor: "emerald",
                colorClass: "text-emerald-500",
                glowColor: "#10b981",
                borderGlow: "rgba(16, 185, 129, 0.25)",
                borderTop: "border-t-emerald-500/70",
                hoverBorder: "hover:border-emerald-500/40",
                icon: <BadgeAlert className="w-5 h-5 text-emerald-500" />,
                hud: (
                  <div className="relative w-full h-14 bg-black/40 rounded border border-white/5 overflow-hidden font-mono text-[9px] p-2 text-zinc-500 flex flex-col justify-between select-none">
                    <div className="flex justify-between items-center text-emerald-500 font-bold">
                      <span>[ RETEST WINDOW ]</span>
                      <span className="animate-pulse">STANDBY</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] text-zinc-500">COVERAGE</span>
                      <div className="flex gap-0.5">
                        {[...Array(12)].map((_, i) => (
                          <motion.div 
                            key={i} 
                            className="w-1 h-1.5 bg-emerald-500" 
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between text-[8px] text-zinc-600">
                      <span>CYCLE: 90 DAYS</span>
                      <span>RETESTS: UNLIMITED</span>
                    </div>
                  </div>
                )
              }
            ].map((stat, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className={`group p-6 md:p-8 flex flex-col justify-between text-left rounded-xl border border-zinc-800/80 bg-zinc-900/[0.12] backdrop-blur-md transition-all duration-300 ${stat.hoverBorder} border-t-2 ${stat.borderTop} relative overflow-hidden`}
                style={{
                  boxShadow: `0 15px 30px -15px rgba(0,0,0,0.8)`
                }}
              >
                {/* Background ambient glow inside each card */}
                <div 
                  className="absolute w-[180px] h-[180px] rounded-full blur-[80px] -bottom-10 -right-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${stat.glowColor} 0%, transparent 70%)`
                  }}
                />

                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center w-full relative z-10">
                    <span className={`font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-white`}>
                      {stat.num}
                    </span>
                    <div 
                      className="p-2 rounded-xl border bg-black/60 transition-colors"
                      style={{ borderColor: stat.borderGlow }}
                    >
                      {stat.icon}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 relative z-10">
                    <h3 className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-widest leading-none">
                      {stat.title}
                    </h3>
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed min-h-[54px]">
                      {stat.desc}
                    </p>
                  </div>
                </div>

                {/* Cyber HUD Mini Graph Visual */}
                <div className="w-full mt-6 relative z-10">
                  {stat.hud}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 2: Pipeline Flow (Detroit.paris styled vertical stack reveal) */}
      <section id="vapt-pipeline" className="relative w-full bg-[#030712] border-b border-zinc-900 overflow-visible z-30">
        <div className="relative w-full flex flex-col">
          {pipelineSteps.map((stepData, idx) => (
            <ScrollRevealItem 
              key={idx}
              step={stepData.step}
              titleLine1={stepData.titleLine1}
              titleLine2={stepData.titleLine2}
              descLines={stepData.descLines}
              color={stepData.color}
              type={stepData.type}
              colorClass={stepData.colorClass}
              glowBorderColor={stepData.glowBorderColor}
              idx={idx}
            />
          ))}
        </div>
      </section>

      {/* SECTION 3: FAQ Accordions */}
      <section id="vapt-faq" className="relative w-full bg-[#030712] px-6 md:px-12 py-24 md:py-32 border-b border-zinc-900 overflow-hidden">
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Accordion sidebar */}
          <div className="flex flex-col gap-6 max-w-[380px] text-left lg:sticky lg:top-24 relative">
            <div className="flex flex-col gap-3">
              <SectionLabel color="secondary">03 / FAQS</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-display font-medium uppercase text-white leading-tight">
                Consider before partnering.
              </h2>
            </div>
            <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed">
              Have questions about scan scopes, timelines, retesting parameters, or audit sign-offs? Reach out directly.
            </p>
            <div className="mt-4">
              <MagneticButton>
                <Button variant="primary" size="lg" asLink href="/#contact" className="gap-2 w-full sm:w-auto text-center justify-center">
                  Book a Briefing <ChevronRight className="w-4 h-4" />
                </Button>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Accordion list */}
          <div className="w-full flex flex-col border-t border-zinc-800">
            {data.faqs.map((faq, idx) => (
              <FAQAccordionItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqIdx === idx}
                onToggle={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <ServiceCTA />

      {/* SECTION 4: Interactive Giant VAPT Footer (detroit.paris styled) */}
      <footer className="relative w-full bg-[#030712] overflow-hidden select-none pb-0 border-t border-zinc-900/40">
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        ` }} />
        
        <div className="max-w-[1400px] w-full mx-auto flex flex-col items-center justify-end relative h-[18vw] min-h-[120px] max-h-[260px] overflow-hidden">
          {/* Giant VAPT text container */}
          <div className="relative w-full flex justify-center overflow-visible top-[2vw]">
            <motion.h1 
              initial={{ y: "35%", color: "#27272a" }} // zinc-800
              whileHover={{ y: "0%", color: "#ffffff" }} // white
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold uppercase tracking-tighter cursor-pointer text-[22vw] leading-none select-none origin-bottom text-center"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                lineHeight: "0.8"
              }}
            >
              VAPT
            </motion.h1>
          </div>
        </div>
      </footer>
    </main>
  );
}
