"use client";

import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "../ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CardSpec {
  value: string;
  label: string;
  watermark: string;
  category: string;
  description: string;
  badge: string;
  metricDetail: string;
  // Aikawa Kenichi exact color palettes
  lightColors: {
    bgStart: string;
    bgMid: string;
    bgEnd: string;
    accent: string;
    watermark: string;
    border: string;
    chipBg: string;
    chipText: string;
    textColor: string;
    descColor: string;
  };
  darkColors: {
    bgStart: string;
    bgMid: string;
    bgEnd: string;
    accent: string;
    watermark: string;
    border: string;
    chipBg: string;
    chipText: string;
    textColor: string;
    descColor: string;
  };
}

const CARDS_DATA: CardSpec[] = [
  {
    // Aikawa "Work" Palette: #F3ECF3, #D9C6DB, #D694AD, #AD7092 (Twilight Rose / Lilac Crystal)
    value: "600+",
    label: "CLIENTS SECURED",
    watermark: "Enterprise",
    category: "ENTERPRISE ASSURANCE",
    description: "Securing global enterprises across Tier-1 banking, cloud infrastructure, and fintech ecosystems with zero breach history.",
    badge: "GLOBAL TRUST",
    metricDetail: "Fortune 500 & Fintech",
    lightColors: {
      bgStart: "#FDF8FD",
      bgMid: "#F3E5F3",
      bgEnd: "#D694AD",
      accent: "#8D3B67",
      watermark: "rgba(173, 112, 146, 0.14)",
      border: "rgba(214, 148, 173, 0.65)",
      chipBg: "rgba(243, 236, 243, 0.95)",
      chipText: "#8D3B67",
      textColor: "#0A0A0A",
      descColor: "#323230"
    },
    darkColors: {
      bgStart: "#18101A",
      bgMid: "#2C172A",
      bgEnd: "#4E213E",
      accent: "#F4A8CA",
      watermark: "rgba(243, 236, 243, 0.10)",
      border: "rgba(214, 148, 173, 0.45)",
      chipBg: "rgba(44, 23, 42, 0.95)",
      chipText: "#F4A8CA",
      textColor: "#FFFFFF",
      descColor: "#DCDCD6"
    }
  },
  {
    // Aikawa "Journey" Palette: #D7F3FD, #B4D0E8, #8DB5D9, #6B99C5 (Glacial Alpine Lake / Cerulean)
    value: "12,000+",
    label: "EXPLOITS PROVEN",
    watermark: "Validation",
    category: "POC VALIDATION",
    description: "Every finding backed by deterministic Proof of Concept execution and demonstrable enterprise business impact.",
    badge: "POC VERIFIED",
    metricDetail: "0 False Positives",
    lightColors: {
      bgStart: "#F4FAFE",
      bgMid: "#DBEDFA",
      bgEnd: "#B4D0E8",
      accent: "#1E5782",
      watermark: "rgba(107, 153, 197, 0.14)",
      border: "rgba(141, 181, 217, 0.65)",
      chipBg: "rgba(215, 243, 253, 0.95)",
      chipText: "#1E5782",
      textColor: "#0A0A0A",
      descColor: "#323230"
    },
    darkColors: {
      bgStart: "#0B1626",
      bgMid: "#132A44",
      bgEnd: "#1C3E63",
      accent: "#7DD3FC",
      watermark: "rgba(215, 243, 253, 0.10)",
      border: "rgba(141, 181, 217, 0.45)",
      chipBg: "rgba(19, 42, 68, 0.95)",
      chipText: "#7DD3FC",
      textColor: "#FFFFFF",
      descColor: "#DCDCD6"
    }
  },
  {
    // Aikawa "Fashion" Palette: #DBD1D0, #282824, #E9C797, #D0A975 (Warm Solar Amber / Champagne Gold)
    value: "100,000+",
    label: "MANUAL AUDIT HOURS",
    watermark: "Adversarial",
    category: "OFFENSIVE ADVERSARIAL",
    description: "Deep manual test cases and bespoke red team attack flows executing business logic paths far beyond scanner capabilities.",
    badge: "ELITE RED TEAM",
    metricDetail: "14-Yr Avg Analyst Tenure",
    lightColors: {
      bgStart: "#FCFAF7",
      bgMid: "#F6EEE2",
      bgEnd: "#E9C797",
      accent: "#825922",
      watermark: "rgba(208, 169, 117, 0.14)",
      border: "rgba(208, 169, 117, 0.65)",
      chipBg: "rgba(245, 236, 224, 0.95)",
      chipText: "#825922",
      textColor: "#0A0A0A",
      descColor: "#323230"
    },
    darkColors: {
      bgStart: "#1C1712",
      bgMid: "#2D2216",
      bgEnd: "#48341E",
      accent: "#FDE68A",
      watermark: "rgba(233, 199, 151, 0.10)",
      border: "rgba(233, 199, 151, 0.45)",
      chipBg: "rgba(45, 34, 22, 0.95)",
      chipText: "#FDE68A",
      textColor: "#FFFFFF",
      descColor: "#DCDCD6"
    }
  },
  {
    // Aikawa Emerald Aurora: #E6F7F0, #A7F3D0, #34D399, #059669 (Mint Crystal / Security Assurance)
    value: "0.01%",
    label: "RECURRENCE RATE",
    watermark: "Assurance",
    category: "PERMANENT REMEDIATION",
    description: "Unprecedented vulnerability elimination rate, ensuring discovered security flaws remain permanently eradicated post-verification.",
    badge: "GUARANTEED SLA",
    metricDetail: "Permanent Remediation",
    lightColors: {
      bgStart: "#F4FDF7",
      bgMid: "#E2F9EC",
      bgEnd: "#A7F3D0",
      accent: "#047857",
      watermark: "rgba(5, 150, 105, 0.14)",
      border: "rgba(52, 211, 153, 0.65)",
      chipBg: "rgba(230, 247, 240, 0.95)",
      chipText: "#047857",
      textColor: "#0A0A0A",
      descColor: "#323230"
    },
    darkColors: {
      bgStart: "#0B1C14",
      bgMid: "#103022",
      bgEnd: "#184E38",
      accent: "#6EE7B7",
      watermark: "rgba(167, 243, 208, 0.10)",
      border: "rgba(52, 211, 153, 0.45)",
      chipBg: "rgba(16, 48, 34, 0.95)",
      chipText: "#6EE7B7",
      textColor: "#FFFFFF",
      descColor: "#DCDCD6"
    }
  }
];

// Helper to draw ultra-high-resolution 2800x1200 canvas texture with razor-sharp typography
function createCardCanvasTexture(
  spec: CardSpec,
  index: number,
  isLight: boolean,
  maxAnisotropy: number
): THREE.CanvasTexture {
  const W = 2800;
  const H = 1200;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const colors = isLight ? spec.lightColors : spec.darkColors;

  // 1. Base Gradient Fill
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, colors.bgStart);
  bgGrad.addColorStop(0.45, colors.bgMid);
  bgGrad.addColorStop(1, colors.bgEnd);

  // Rounded rectangle card surface
  const r = 56;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(W - r, 0);
  ctx.quadraticCurveTo(W, 0, W, r);
  ctx.lineTo(W, H - r);
  ctx.quadraticCurveTo(W, H, W - r, H);
  ctx.lineTo(r, H);
  ctx.quadraticCurveTo(0, H, 0, H - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();

  ctx.fillStyle = bgGrad;
  ctx.fill();

  // 2. Specular Top Glare (Cylindrical Glass Highlight)
  const glareGrad = ctx.createRadialGradient(W / 2, 0, 10, W / 2, 0, W * 0.7);
  glareGrad.addColorStop(0, isLight ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.25)");
  glareGrad.addColorStop(0.45, isLight ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.06)");
  glareGrad.addColorStop(1, "transparent");
  ctx.fillStyle = glareGrad;
  ctx.fill();

  // 3. Delicate Card Stroke / Rim
  ctx.lineWidth = 5;
  ctx.strokeStyle = colors.border;
  ctx.stroke();

  // 4. Large Luxury Editorial Watermark Typography (Aikawa Kenichi Signature)
  ctx.save();
  ctx.font = "italic 400 320px 'Playfair Display', 'Cormorant Garamond', Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = colors.watermark;
  ctx.fillText(spec.watermark, W / 2, H / 2 + 10);
  ctx.restore();

  // 5. Top Row: Index Capsule, Category Badge, Security Badge
  const paddingX = 120;
  const topY = 145;

  // Index Capsule [01 / 04]
  ctx.save();
  const indexText = `0${index + 1} / 04`;
  ctx.font = "700 36px 'JetBrains Mono', 'SF Mono', monospace";
  const indexMetrics = ctx.measureText(indexText);
  const pillW = indexMetrics.width + 48;
  const pillH = 64;
  const pillX = paddingX;
  const pillY = topY - 42;

  ctx.fillStyle = colors.chipBg;
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 32);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = colors.chipText;
  ctx.textBaseline = "middle";
  ctx.fillText(indexText, pillX + 24, pillY + pillH / 2);

  // Category Badge Text
  ctx.font = "700 34px 'JetBrains Mono', 'SF Mono', monospace";
  ctx.fillStyle = colors.chipText;
  ctx.fillText(spec.badge, pillX + pillW + 36, pillY + pillH / 2);

  // Top Right Icon Pill
  const iconR = 38;
  const iconX = W - paddingX - iconR;
  const iconY = topY - 10;
  ctx.beginPath();
  ctx.arc(iconX, iconY, iconR, 0, Math.PI * 2);
  ctx.fillStyle = isLight ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.6)";
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 2.5;
  ctx.fill();
  ctx.stroke();

  // Shield glyph in icon circle
  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(iconX, iconY - 2, 13, 0, Math.PI);
  ctx.stroke();
  ctx.restore();

  // 6. Center Row: Large Counter Metric + Description (Razor Sharp Rendering)
  const centerY = H / 2 + 15;

  // Large Stat Number
  ctx.save();
  ctx.font = "900 185px -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Roboto, sans-serif";
  ctx.fillStyle = colors.textColor;
  ctx.textBaseline = "middle";
  ctx.fillText(spec.value, paddingX, centerY - 20);

  // Stat Label
  ctx.font = "700 36px 'JetBrains Mono', 'SF Mono', monospace";
  ctx.fillStyle = colors.chipText;
  ctx.fillText(spec.label, paddingX, centerY + 105);
  ctx.restore();

  // Right Side Description Text (Wrapped Paragraph)
  ctx.save();
  ctx.font = "500 40px -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Roboto, sans-serif";
  ctx.fillStyle = colors.descColor;
  ctx.textAlign = "right";
  ctx.textBaseline = "top";

  const maxDescW = 860;
  const words = spec.description.split(" ");
  let line = "";
  let lineY = centerY - 80;
  const lineHeight = 58;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxDescW && n > 0) {
      ctx.fillText(line, W - paddingX, lineY);
      line = words[n] + " ";
      lineY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, W - paddingX, lineY);
  ctx.restore();

  // 7. Bottom Row: Verified Status & Protocol Stamp
  const botY = H - 120;
  ctx.save();
  // Bottom divider line
  ctx.strokeStyle = isLight ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(paddingX, botY - 38);
  ctx.lineTo(W - paddingX, botY - 38);
  ctx.stroke();

  // Checkmark circle
  ctx.beginPath();
  ctx.arc(paddingX + 20, botY, 20, 0, Math.PI * 2);
  ctx.fillStyle = "#10B981";
  ctx.fill();

  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(paddingX + 13, botY);
  ctx.lineTo(paddingX + 18, botY + 6);
  ctx.lineTo(paddingX + 27, botY - 5);
  ctx.stroke();

  // Verified Live Metric label
  ctx.font = "700 34px -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Roboto, sans-serif";
  ctx.fillStyle = colors.textColor;
  ctx.textBaseline = "middle";
  ctx.fillText("Verified Live Metric", paddingX + 56, botY);

  ctx.font = "500 32px 'JetBrains Mono', 'SF Mono', monospace";
  ctx.fillStyle = colors.descColor;
  ctx.fillText(`• ${spec.metricDetail}`, paddingX + 410, botY);

  // Right pill: EnProbe ASPM
  const aspmText = "EnProbe ASPM ↗";
  ctx.font = "700 32px 'JetBrains Mono', 'SF Mono', monospace";
  const aspmMetrics = ctx.measureText(aspmText);
  const aspmW = aspmMetrics.width + 48;
  const aspmH = 58;
  const aspmX = W - paddingX - aspmW;
  const aspmY = botY - aspmH / 2;

  ctx.fillStyle = colors.chipBg;
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(aspmX, aspmY, aspmW, aspmH, 29);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = colors.chipText;
  ctx.fillText(aspmText, aspmX + 24, aspmY + aspmH / 2);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = Math.min(maxAnisotropy, 16);
  return texture;
}

export default function TrackRecord3DCylinder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const bgTypographyRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeIndex, setActiveIndex] = useState(0);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cylinderGroupRef = useRef<THREE.Group | null>(null);
  const reflectionGroupRef = useRef<THREE.Group | null>(null);
  const cardMeshesRef = useRef<THREE.Mesh[]>([]);
  const reflMeshesRef = useRef<THREE.Mesh[]>([]);

  // Animation & Interaction state
  const rotationAngle = useRef(0);
  const manualOffset = useRef(0);
  const targetRotation = useRef(0);
  const dynamicScale = useRef(1.0);
  const targetScale = useRef(1.0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
  const scrollVelocityTimer = useRef<NodeJS.Timeout | null>(null);
  const reqAnimFrameId = useRef<number | null>(null);

  // Theme observer
  useEffect(() => {
    const updateTheme = () => {
      const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      setTheme(current);
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const isLight = theme === "light";

  // Three.js WebGL True Curved Cylinder Construction (Enlarged & Sharp)
  useEffect(() => {
    if (typeof window === "undefined" || !canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera (cinematic perspective tilt)
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    // Adjusted camera distance for larger, more commanding cylinder presentation
    camera.position.set(0, 0.28, 7.35);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 2. WebGL Renderer with retina supersampling and alpha
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Cylinder Sizing & Dimensions (Enlarged for Prominence & Impact)
    const radius = 4.15;
    const cardHeight = 2.45;
    const slabDepth = 0.16; // 16px physical depth / broadness
    const gap = 0.04; // 2.3 degree hairline seam between adjacent curved slabs
    const sectorAngle = Math.PI / 2 - gap; // 90 deg arc per card

    // 4. Main 3D Cylinder Group
    const cylinderGroup = new THREE.Group();
    cylinderGroup.position.set(0, 0, 0);
    cylinderGroup.rotation.x = -0.06; // -3.5 deg vertical tilt
    scene.add(cylinderGroup);
    cylinderGroupRef.current = cylinderGroup;

    // 5. Mirrored Floor Reflection Group
    const reflectionGroup = new THREE.Group();
    reflectionGroup.position.set(0, -cardHeight - 0.26, 0);
    reflectionGroup.rotation.x = -0.06;
    reflectionGroup.scale.y = -1;
    scene.add(reflectionGroup);
    reflectionGroupRef.current = reflectionGroup;

    // 6. Build 4 True Circular Curved Sector Slabs (Circle Forming Seen From Above)
    const cardMeshes: THREE.Mesh[] = [];
    const reflMeshes: THREE.Mesh[] = [];

    CARDS_DATA.forEach((spec, idx) => {
      const centerAngle = (idx * Math.PI) / 2;
      const thetaStart = centerAngle - sectorAngle / 2;

      // Outer curved front shell (Radius R + depth/2)
      const frontGeom = new THREE.CylinderGeometry(
        radius + slabDepth / 2,
        radius + slabDepth / 2,
        cardHeight,
        54,
        1,
        true,
        thetaStart,
        sectorAngle
      );

      const texture = createCardCanvasTexture(spec, idx, isLight, maxAniso);
      const frontMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.FrontSide
      });

      const cardMesh = new THREE.Mesh(frontGeom, frontMat);
      cylinderGroup.add(cardMesh);
      cardMeshes.push(cardMesh);

      // 3D Physical Extruded Bevel Rims (Broadness & Thickness)
      // Inner curved back shell
      const backGeom = new THREE.CylinderGeometry(
        radius - slabDepth / 2,
        radius - slabDepth / 2,
        cardHeight,
        54,
        1,
        true,
        thetaStart,
        sectorAngle
      );
      const backMat = new THREE.MeshBasicMaterial({
        color: isLight ? 0xe2e2e0 : 0x141418,
        transparent: true,
        opacity: 0.9,
        side: THREE.BackSide
      });
      const backMesh = new THREE.Mesh(backGeom, backMat);
      cylinderGroup.add(backMesh);

      // Mirrored Floor Reflection Mesh
      const reflTexture = texture.clone();
      const reflMat = new THREE.MeshBasicMaterial({
        map: reflTexture,
        transparent: true,
        opacity: isLight ? 0.24 : 0.32,
        side: THREE.FrontSide
      });
      const reflMesh = new THREE.Mesh(frontGeom.clone(), reflMat);
      reflectionGroup.add(reflMesh);
      reflMeshes.push(reflMesh);
    });

    cardMeshesRef.current = cardMeshes;
    reflMeshesRef.current = reflMeshes;

    // 7. Render Loop with smooth inertia and scale easing
    const renderLoop = () => {
      reqAnimFrameId.current = requestAnimationFrame(renderLoop);

      // Smooth rotation interpolation
      rotationAngle.current += (targetRotation.current - rotationAngle.current) * 0.12;
      cylinderGroup.rotation.y = rotationAngle.current;
      reflectionGroup.rotation.y = rotationAngle.current;

      // Smooth dynamic scale interpolation
      dynamicScale.current += (targetScale.current - dynamicScale.current) * 0.15;
      cylinderGroup.scale.setScalar(dynamicScale.current);
      reflectionGroup.scale.set(dynamicScale.current, -dynamicScale.current, dynamicScale.current);

      // Active card calculation
      const normAngle = ((-rotationAngle.current % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const activeIdx = Math.round(normAngle / (Math.PI / 2)) % CARDS_DATA.length;
      setActiveIndex(activeIdx);

      renderer.render(scene, camera);
    };
    renderLoop();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (reqAnimFrameId.current) cancelAnimationFrame(reqAnimFrameId.current);
      renderer.dispose();
      scene.clear();
    };
  }, [isLight]);

  // Entrance animation on load
  useEffect(() => {
    if (typeof window === "undefined" || isReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (bgTypographyRef.current) {
        tl.fromTo(bgTypographyRef.current, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 1.4 }, 0);
      }
      if (headerRef.current) {
        tl.fromTo(headerRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1.0 }, 0.15);
      }
      if (canvasContainerRef.current) {
        tl.fromTo(canvasContainerRef.current, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 1.5, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }, 0.1);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced]);

  // GSAP ScrollTrigger Pinning & Dynamic Scroll Scale Expansion
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    if (isReduced) return;

    const sectionEl = sectionRef.current;

    const timer = setTimeout(() => {
      const st = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        end: "+=2600",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Progress 0 -> 1 maps 0 to -270 deg (0, -PI/2, -PI, -3PI/2)
          const baseScrollAngle = self.progress * (-Math.PI * 1.5);
          targetRotation.current = baseScrollAngle + manualOffset.current;

          // Dynamic scale-on-scroll breathing expansion effect
          const velocity = Math.abs(self.getVelocity());
          targetScale.current = Math.min(1.075, 1.0 + velocity * 0.00004);

          // Relax scale back to 1.0 when scroll stops
          if (scrollVelocityTimer.current) clearTimeout(scrollVelocityTimer.current);
          scrollVelocityTimer.current = setTimeout(() => {
            targetScale.current = 1.0;
          }, 120);
        },
      });

      scrollTriggerInstance.current = st;
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timer);
      if (scrollVelocityTimer.current) clearTimeout(scrollVelocityTimer.current);
      if (scrollTriggerInstance.current) {
        scrollTriggerInstance.current.kill();
        scrollTriggerInstance.current = null;
      }
    };
  }, [isReduced]);

  // Mouse & Touch Drag interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartAngle.current = manualOffset.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    manualOffset.current = dragStartAngle.current + deltaX * 0.0045;
    if (scrollTriggerInstance.current) {
      const baseScrollAngle = scrollTriggerInstance.current.progress * (-Math.PI * 1.5);
      targetRotation.current = baseScrollAngle + manualOffset.current;
    } else {
      targetRotation.current = manualOffset.current;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartAngle.current = manualOffset.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.touches[0].clientX - dragStartX.current;
    manualOffset.current = dragStartAngle.current + deltaX * 0.005;
    if (scrollTriggerInstance.current) {
      const baseScrollAngle = scrollTriggerInstance.current.progress * (-Math.PI * 1.5);
      targetRotation.current = baseScrollAngle + manualOffset.current;
    } else {
      targetRotation.current = manualOffset.current;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <section
      ref={sectionRef}
      id="track-record"
      className={`relative w-full h-screen overflow-hidden select-none flex flex-col justify-between isolate transition-colors duration-500 z-20 ${
        isLight
          ? "bg-[#F6F5F0] text-[#060606]"
          : "bg-[#060608] text-[#F6F5F0]"
      }`}
      style={{
        contain: "paint",
      }}
    >
      {/* Ambient Atmospheric Lighting Gradients */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[550px] rounded-full blur-[150px] pointer-events-none transition-opacity duration-500 ${
          isLight
            ? "bg-gradient-to-r from-[#D694AD]/30 via-[#8DB5D9]/25 to-[#E9C797]/30 opacity-80"
            : "bg-gradient-to-r from-[#D694AD]/20 via-[#8DB5D9]/20 to-[#34D399]/20 opacity-90"
        }`}
      />
      <div
        className={`absolute inset-0 [background-size:28px_28px] pointer-events-none transition-opacity duration-500 ${
          isLight
            ? "bg-[radial-gradient(#94a3b8_1px,transparent_1px)] opacity-20"
            : "bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-15"
        }`}
      />

      {/* Top Header Information: Polished H1 and Balanced Description */}
      <header
        ref={headerRef}
        className="relative z-30 pt-16 sm:pt-20 md:pt-22 px-6 md:px-12 max-w-[1440px] mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0"
      >
        <div className="flex flex-col items-start max-w-xl">
          <div className="flex items-center gap-3">
            <SectionLabel color="secondary">VALIDATED TRACK RECORD</SectionLabel>
            <span
              className={`hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border transition-colors ${
                isLight
                  ? "bg-black/5 border-black/10 text-zinc-800"
                  : "bg-white/5 border-white/10 text-zinc-300"
              }`}
            >
              3D Circular Cylinder
            </span>
          </div>
          <h1
            className={`text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-display font-bold uppercase tracking-tight mt-2 leading-[1.08] transition-colors ${
              isLight ? "text-[#060606]" : "text-[#F6F5F0]"
            }`}
          >
            Defense Measured in Certainty
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <p
            className={`font-normal text-xs sm:text-sm leading-relaxed max-w-md hidden md:block transition-colors ${
              isLight ? "text-[#4A4A46]" : "text-[#A8A8A2]"
            }`}
          >
            Scroll to revolve through deterministic security metrics, empirical validation milestones, and enterprise operational benchmarks.
          </p>
          <div
            className={`hidden lg:flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest px-4 py-2 rounded-full border shrink-0 shadow-sm transition-colors ${
              isLight
                ? "bg-black/5 border-black/10 text-zinc-700 hover:bg-black/10"
                : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
            }`}
          >
            <span>Scroll to Rotate</span>
            <span className="animate-bounce font-bold">↓</span>
          </div>
        </div>
      </header>

      {/* Giant Architectural Background Watermark: Prominent & Luxurious ENTERSOFT */}
      <div
        ref={bgTypographyRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 overflow-hidden"
      >
        <div className="relative flex items-center justify-center">
          {/* Subtle Horizontal Guide Line Left */}
          <div
            className={`hidden sm:block flex-1 max-w-[200px] border-t transition-colors ${
              isLight ? "border-black/10" : "border-white/10"
            }`}
          />
          <span
            className={`font-display font-black text-[clamp(5.5rem,18vw,15.5rem)] leading-none tracking-tight uppercase whitespace-nowrap select-none px-6 transition-colors ${
              isLight ? "text-black/[0.08]" : "text-white/[0.08]"
            }`}
          >
            ENTERSOFT
          </span>
          {/* Subtle Horizontal Guide Line Right */}
          <div
            className={`hidden sm:block flex-1 max-w-[200px] border-t transition-colors ${
              isLight ? "border-black/10" : "border-white/10"
            }`}
          />
        </div>

        <div className="flex items-center justify-center gap-8 -mt-2 sm:-mt-5">
          <span
            className={`font-mono text-[10px] sm:text-[12px] font-medium tracking-[0.4em] uppercase transition-colors ${
              isLight ? "text-black/35" : "text-white/30"
            }`}
          >
            // ZERO COMPROMISE METRICS
          </span>
          <span
            className={`font-mono text-[10px] sm:text-[12px] font-medium tracking-[0.4em] uppercase transition-colors ${
              isLight ? "text-[#8D3B67]/55" : "text-[#D694AD]/45"
            }`}
          >
            // 14 YEARS UNBROKEN DEFENSE
          </span>
        </div>
      </div>

      {/* Main 3D WebGL Canvas Arena (Prominent Sizing) */}
      <div
        ref={canvasContainerRef}
        className="relative z-20 flex-1 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing my-auto"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Bottom Subtle Guide Indicator */}
      <div className="relative z-30 pb-6 text-center pointer-events-none select-none">
        <span
          className={`font-mono text-[10px] tracking-[0.25em] uppercase transition-colors ${
            isLight ? "text-black/30" : "text-white/25"
          }`}
        >
          [ 0{activeIndex + 1} / 04 — {CARDS_DATA[activeIndex].category} ]
        </span>
      </div>
    </section>
  );
}



