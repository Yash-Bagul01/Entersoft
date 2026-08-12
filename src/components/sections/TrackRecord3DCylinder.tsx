"use client";

import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";
import { Button } from "../ui/Button";
import { fadeInUpVariants } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CardSpec {
  value: string;
  label: string;
  watermark: string;
  category: string;
  description: string;
  badge: string;
  metricDetail: string;
  lightColors: {
    bgStart: string;
    bgMid: string;
    bgEnd: string;
    accent: string;
    topCapHex: number;
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
    topCapHex: number;
    watermark: string;
    border: string;
    chipBg: string;
    chipText: string;
    textColor: string;
    descColor: string;
  };
}

const PHILOSOPHY_TOKENS = [
  { text: "Built", highlight: false },
  { text: "on", highlight: false },
  { text: "14", highlight: true },
  { text: "years", highlight: true },
  { text: "of", highlight: false },
  { text: "offensive", highlight: true },
  { text: "security", highlight: true },
  { text: "expertise,", highlight: true },
  { text: "Entersoft", highlight: false },
  { text: "combines", highlight: false },
  { text: "AI-native", highlight: true },
  { text: "analysis", highlight: true },
  { text: "with", highlight: false },
  { text: "human", highlight: true },
  { text: "validation", highlight: true },
  { text: "to", highlight: false },
  { text: "help", highlight: false },
  { text: "enterprises", highlight: false },
  { text: "map,", highlight: true },
  { text: "test,", highlight: true },
  { text: "prioritize", highlight: true },
  { text: "and", highlight: false },
  { text: "remediate", highlight: true },
  { text: "risk", highlight: true },
  { text: "across", highlight: false },
  { text: "applications,", highlight: true },
  { text: "APIs,", highlight: true },
  { text: "code,", highlight: true },
  { text: "cloud", highlight: true },
  { text: "and", highlight: true },
  { text: "identity.", highlight: true }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const CARDS_DATA: CardSpec[] = [
  {
    // Aikawa "Work" Palette: Twilight Rose / Lilac Crystal
    value: "600+",
    label: "CLIENTS SECURED",
    watermark: "Enterprise",
    category: "ENTERPRISE ASSURANCE",
    description: "Securing global enterprises across Tier-1 banking, cloud infrastructure, and fintech ecosystems with zero breach history.",
    badge: "GLOBAL TRUST",
    metricDetail: "Fortune 500 & Fintech",
    lightColors: {
      bgStart: "#FFF9FD",
      bgMid: "#F5E4F3",
      bgEnd: "#D694AD",
      accent: "#8D3B67",
      topCapHex: 0xD694AD,
      watermark: "rgba(173, 112, 146, 0.15)",
      border: "rgba(214, 148, 173, 0.75)",
      chipBg: "rgba(243, 236, 243, 0.95)",
      chipText: "#8D3B67",
      textColor: "#0A0A0A",
      descColor: "#0E0E0C"
    },
    darkColors: {
      bgStart: "#1A101C",
      bgMid: "#30182E",
      bgEnd: "#542242",
      accent: "#F4A8CA",
      topCapHex: 0xF4A8CA,
      watermark: "rgba(243, 236, 243, 0.12)",
      border: "rgba(244, 168, 202, 0.55)",
      chipBg: "rgba(48, 24, 46, 0.95)",
      chipText: "#F4A8CA",
      textColor: "#FFFFFF",
      descColor: "#FAFAF6"
    }
  },
  {
    // Aikawa "Journey" Palette: Glacial Alpine Lake / Cerulean Blue
    value: "12,000+",
    label: "EXPLOITS PROVEN",
    watermark: "Validation",
    category: "POC VALIDATION",
    description: "Every finding backed by deterministic Proof of Concept execution and demonstrable enterprise business impact.",
    badge: "POC VERIFIED",
    metricDetail: "0 False Positives",
    lightColors: {
      bgStart: "#F5FAFE",
      bgMid: "#D8ECFA",
      bgEnd: "#8DB5D9",
      accent: "#1E5782",
      topCapHex: 0x8DB5D9,
      watermark: "rgba(107, 153, 197, 0.15)",
      border: "rgba(141, 181, 217, 0.75)",
      chipBg: "rgba(215, 243, 253, 0.95)",
      chipText: "#1E5782",
      textColor: "#0A0A0A",
      descColor: "#0E0E0C"
    },
    darkColors: {
      bgStart: "#0A1729",
      bgMid: "#122E4E",
      bgEnd: "#1D4570",
      accent: "#7DD3FC",
      topCapHex: 0x7DD3FC,
      watermark: "rgba(215, 243, 253, 0.12)",
      border: "rgba(125, 211, 252, 0.55)",
      chipBg: "rgba(18, 46, 78, 0.95)",
      chipText: "#7DD3FC",
      textColor: "#FFFFFF",
      descColor: "#FAFAF6"
    }
  },
  {
    // Aikawa "Fashion" Palette: Warm Solar Amber / Champagne Gold
    value: "100,000+",
    label: "MANUAL AUDIT HOURS",
    watermark: "Adversarial",
    category: "OFFENSIVE ADVERSARIAL",
    description: "Deep manual test cases and bespoke red team attack flows executing business logic paths far beyond scanner capabilities.",
    badge: "ELITE RED TEAM",
    metricDetail: "14-Yr Avg Analyst Tenure",
    lightColors: {
      bgStart: "#FCFAF6",
      bgMid: "#F7EEE0",
      bgEnd: "#E9C797",
      accent: "#825922",
      topCapHex: 0xE9C797,
      watermark: "rgba(208, 169, 117, 0.15)",
      border: "rgba(233, 199, 151, 0.75)",
      chipBg: "rgba(245, 236, 224, 0.95)",
      chipText: "#825922",
      textColor: "#0A0A0A",
      descColor: "#0E0E0C"
    },
    darkColors: {
      bgStart: "#1E1812",
      bgMid: "#332617",
      bgEnd: "#523B20",
      accent: "#FDE68A",
      topCapHex: 0xFDE68A,
      watermark: "rgba(233, 199, 151, 0.12)",
      border: "rgba(253, 230, 138, 0.55)",
      chipBg: "rgba(51, 38, 23, 0.95)",
      chipText: "#FDE68A",
      textColor: "#FFFFFF",
      descColor: "#FAFAF6"
    }
  },
  {
    // Aikawa Emerald Aurora: Mint Crystal / Security Assurance
    value: "0.01%",
    label: "RECURRENCE RATE",
    watermark: "Assurance",
    category: "PERMANENT REMEDIATION",
    description: "Unprecedented vulnerability elimination rate, ensuring discovered security flaws remain permanently eradicated post-verification.",
    badge: "GUARANTEED SLA",
    metricDetail: "Permanent Remediation",
    lightColors: {
      bgStart: "#F4FDF8",
      bgMid: "#DFF8EA",
      bgEnd: "#34D399",
      accent: "#047857",
      topCapHex: 0x34D399,
      watermark: "rgba(5, 150, 105, 0.15)",
      border: "rgba(52, 211, 153, 0.75)",
      chipBg: "rgba(230, 247, 240, 0.95)",
      chipText: "#047857",
      textColor: "#0A0A0A",
      descColor: "#0E0E0C"
    },
    darkColors: {
      bgStart: "#0B1D15",
      bgMid: "#113827",
      bgEnd: "#1A573D",
      accent: "#6EE7B7",
      topCapHex: 0x6EE7B7,
      watermark: "rgba(167, 243, 208, 0.12)",
      border: "rgba(110, 231, 183, 0.55)",
      chipBg: "rgba(17, 56, 39, 0.95)",
      chipText: "#6EE7B7",
      textColor: "#FFFFFF",
      descColor: "#FAFAF6"
    }
  }
];

// Draw ultra-high-resolution 2800x1200 canvas texture with double border and high-contrast typography
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

  // 1. Base Multi-stop Atmospheric Gradient Fill
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, colors.bgStart);
  bgGrad.addColorStop(0.50, colors.bgMid);
  bgGrad.addColorStop(1, colors.bgEnd);

  const r = 54;
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

  // 2. Specular Cylindrical Glass Lighting Highlight
  const glareGrad = ctx.createRadialGradient(W / 2, 0, 10, W / 2, 0, W * 0.70);
  glareGrad.addColorStop(0, isLight ? "rgba(255, 255, 255, 0.90)" : "rgba(255, 255, 255, 0.25)");
  glareGrad.addColorStop(0.40, isLight ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.06)");
  glareGrad.addColorStop(1, "transparent");
  ctx.fillStyle = glareGrad;
  ctx.fill();

  // 3. Double Outer & Inner Bevel Highlight Border
  ctx.lineWidth = 4;
  ctx.strokeStyle = colors.border;
  ctx.stroke();

  // Inner hairline lighting line
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = isLight ? "rgba(255, 255, 255, 0.65)" : "rgba(255, 255, 255, 0.20)";
  ctx.beginPath();
  ctx.roundRect(14, 14, W - 28, H - 28, r - 6);
  ctx.stroke();

  // 4. Atmospheric Watermark Typography (Instrument Serif Italic)
  ctx.save();
  ctx.font = "italic 300 280px 'Instrument Serif', 'Cormorant Garamond', 'Playfair Display', Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = colors.watermark;
  ctx.fillText(spec.watermark, W / 2, H / 2 + 10);
  ctx.restore();

  // 5. Top Row: Index Capsule, Category Badge, Security Glyph
  const leftX = 280;
  const rightX = 2520;
  const topY = 155;

  // Index Capsule [01 / 04]
  ctx.save();
  const indexText = `0${index + 1} / 04`;
  ctx.font = "600 30px 'IBM Plex Mono', 'JetBrains Mono', monospace";
  ctx.textAlign = "left";
  const indexMetrics = ctx.measureText(indexText);
  const pillW = indexMetrics.width + 44;
  const pillH = 56;
  const pillX = leftX;
  const pillY = topY - 36;

  ctx.fillStyle = colors.chipBg;
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 28);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = colors.chipText;
  ctx.textBaseline = "middle";
  ctx.fillText(indexText, pillX + 22, pillY + pillH / 2);

  // Category Badge Text with tracked mono styling
  ctx.font = "600 28px 'IBM Plex Mono', 'JetBrains Mono', monospace";
  ctx.fillStyle = colors.chipText;
  ctx.fillText(spec.badge, pillX + pillW + 30, pillY + pillH / 2);

  // Top Right Icon Pill
  const iconR = 34;
  const iconX = rightX - iconR;
  const iconY = topY - 8;
  ctx.beginPath();
  ctx.arc(iconX, iconY, iconR, 0, Math.PI * 2);
  ctx.fillStyle = isLight ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.65)";
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 2.5;
  ctx.fill();
  ctx.stroke();

  // Geometric shield glyph
  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(iconX, iconY - 2, 12, 0, Math.PI);
  ctx.stroke();
  ctx.restore();

  // 6. Center Row: Bold Metric Number & Editorial Paragraph
  const centerY = H / 2 + 10;

  // Primary Metric Number (Syne Display - Bold & Sculptural)
  ctx.save();
  ctx.font = "800 156px 'Syne', 'Plus Jakarta Sans', 'Schibsted Grotesk', sans-serif";
  ctx.fillStyle = colors.textColor;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(spec.value, leftX, centerY - 24);

  // Stat Label (IBM Plex Mono)
  ctx.font = "600 30px 'IBM Plex Mono', 'JetBrains Mono', monospace";
  ctx.fillStyle = colors.chipText;
  ctx.textAlign = "left";
  ctx.fillText(spec.label, leftX, centerY + 90);
  ctx.restore();

  // Right Side Description (Plus Jakarta Sans - High-Contrast Editorial Paragraph)
  ctx.save();
  ctx.font = "500 38px 'Plus Jakarta Sans', 'Schibsted Grotesk', 'Inter', sans-serif";
  ctx.fillStyle = colors.descColor;
  ctx.textAlign = "right";
  ctx.textBaseline = "top";

  const maxDescW = 900;
  const words = spec.description.split(" ");
  let line = "";
  let lineY = centerY - 76;
  const lineHeight = 54;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxDescW && n > 0) {
      ctx.fillText(line, rightX, lineY);
      line = words[n] + " ";
      lineY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, rightX, lineY);
  ctx.restore();

  // 7. Bottom Row: Verified Status & Protocol Stamp
  const botY = H - 130;
  ctx.save();
  ctx.strokeStyle = isLight ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(leftX, botY - 38);
  ctx.lineTo(rightX, botY - 38);
  ctx.stroke();

  // Checkmark circle
  ctx.beginPath();
  ctx.arc(leftX + 18, botY, 18, 0, Math.PI * 2);
  ctx.fillStyle = "#10B981";
  ctx.fill();

  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(leftX + 12, botY);
  ctx.lineTo(leftX + 16, botY + 5);
  ctx.lineTo(leftX + 24, botY - 4);
  ctx.stroke();

  // Verified Live Metric label
  ctx.font = "600 28px 'Plus Jakarta Sans', 'Schibsted Grotesk', sans-serif";
  ctx.fillStyle = colors.textColor;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("Verified Live Metric", leftX + 48, botY);

  // Metric Detail Pill
  ctx.font = "500 26px 'IBM Plex Mono', 'JetBrains Mono', monospace";
  ctx.fillStyle = colors.descColor;
  ctx.textAlign = "left";
  ctx.fillText(`• ${spec.metricDetail}`, leftX + 370, botY);

  // Right pill: EnProbe ASPM
  const aspmText = "EnProbe ASPM ↗";
  ctx.font = "600 26px 'IBM Plex Mono', 'JetBrains Mono', monospace";
  ctx.textAlign = "left";
  const aspmMetrics = ctx.measureText(aspmText);
  const aspmW = aspmMetrics.width + 42;
  const aspmH = 50;
  const aspmPillX = rightX - aspmW;
  const aspmPillY = botY - aspmH / 2;

  ctx.fillStyle = colors.chipBg;
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(aspmPillX, aspmPillY, aspmW, aspmH, 25);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = colors.chipText;
  ctx.fillText(aspmText, aspmPillX + 21, aspmPillY + aspmH / 2);
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
  const philosophyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion();

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeIndex, setActiveIndex] = useState(0);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cylinderGroupRef = useRef<THREE.Group | null>(null);
  const reflectionGroupRef = useRef<THREE.Group | null>(null);

  // Animation & Interaction state
  const rotationAngle = useRef(0);
  const manualOffset = useRef(0);
  const targetRotationY = useRef(0);
  const currentTiltX = useRef(-Math.PI / 2); // Initial top-down angle
  const targetTiltX = useRef(-Math.PI / 2);
  const baseScale = useRef(0.65);
  const dynamicScale = useRef(0.65);
  const targetScale = useRef(0.65);
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

  // Three.js WebGL True Curved Volumetric Cylinder Construction
  useEffect(() => {
    if (typeof window === "undefined" || !canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.14, 7.85);
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

    // Initial faded background state for Defensive Philosophy
    container.style.opacity = isReduced ? "1" : "0.38";
    container.style.transition = "opacity 0.2s ease-out";

    // 3. Cylinder Dimensions with Slim Physical Thickness (0.08 slabDepth)
    const radius = 3.85;
    const cardHeight = 2.12;
    const slabDepth = 0.08; // Slim, crisp, refined physical thickness
    const gap = 0.055; // Seam between curved slabs
    const sectorAngle = Math.PI / 2 - gap; // 90 deg arc per card

    // 4. Main 3D Cylinder Group
    const cylinderGroup = new THREE.Group();
    cylinderGroup.position.set(0, 0, 0);
    cylinderGroup.rotation.x = isReduced ? -0.06 : -Math.PI / 2; // Top-down disc view by default
    cylinderGroup.scale.setScalar(isReduced ? 1.0 : 0.65);
    scene.add(cylinderGroup);
    cylinderGroupRef.current = cylinderGroup;

    // 5. Mirrored Floor Reflection Group
    const reflectionGroup = new THREE.Group();
    reflectionGroup.position.set(0, -cardHeight - 0.20, 0);
    reflectionGroup.rotation.x = isReduced ? -0.06 : -Math.PI / 2;
    reflectionGroup.scale.set(isReduced ? 1.0 : 0.65, isReduced ? -1.0 : -0.65, isReduced ? 1.0 : 0.65);
    reflectionGroup.visible = isReduced;
    scene.add(reflectionGroup);
    reflectionGroupRef.current = reflectionGroup;

    // Set initial state
    currentTiltX.current = isReduced ? -0.06 : -Math.PI / 2;
    targetTiltX.current = isReduced ? -0.06 : -Math.PI / 2;
    baseScale.current = isReduced ? 1.0 : 0.65;
    dynamicScale.current = isReduced ? 1.0 : 0.65;
    targetScale.current = isReduced ? 1.0 : 0.65;

    // 6. Build 4 Volumetric Curved Slabs with Identical Matching Colors on All 4 Sides
    CARDS_DATA.forEach((spec, idx) => {
      const centerAngle = (idx * Math.PI) / 2;
      const thetaStart = centerAngle - sectorAngle / 2;
      const thetaEnd = centerAngle + sectorAngle / 2;
      const colors = isLight ? spec.lightColors : spec.darkColors;

      // Outer curved front shell
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

      // Inner curved back shell (Obsidian dark titanium backing)
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
        color: isLight ? 0x222228 : 0x0E0E12,
        transparent: true,
        opacity: 0.95,
        side: THREE.BackSide
      });
      const backMesh = new THREE.Mesh(backGeom, backMat);
      cylinderGroup.add(backMesh);

      // Unified material for all 4 surrounding sides of this card (Top, Bottom, Left, Right)
      const capMat = new THREE.MeshBasicMaterial({
        color: colors.topCapHex,
        side: THREE.DoubleSide
      });

      // Top Bevel Cap Ring (Side 1)
      const topCapGeom = new THREE.RingGeometry(
        radius - slabDepth / 2,
        radius + slabDepth / 2,
        48,
        1,
        thetaStart,
        sectorAngle
      );
      const topCapMesh = new THREE.Mesh(topCapGeom, capMat);
      topCapMesh.position.y = cardHeight / 2;
      topCapMesh.rotation.x = -Math.PI / 2;
      cylinderGroup.add(topCapMesh);

      // Bottom Bevel Cap Ring (Side 2)
      const botCapMesh = new THREE.Mesh(topCapGeom.clone(), capMat);
      botCapMesh.position.y = -cardHeight / 2;
      botCapMesh.rotation.x = -Math.PI / 2;
      cylinderGroup.add(botCapMesh);

      // Left Edge Wall (Side 3)
      const edgeGeom = new THREE.PlaneGeometry(slabDepth, cardHeight);
      const leftEdge = new THREE.Mesh(edgeGeom, capMat);
      leftEdge.position.set(radius * Math.sin(thetaStart), 0, radius * Math.cos(thetaStart));
      leftEdge.rotation.y = thetaStart + Math.PI / 2;
      cylinderGroup.add(leftEdge);

      // Right Edge Wall (Side 4)
      const rightEdge = new THREE.Mesh(edgeGeom.clone(), capMat);
      rightEdge.position.set(radius * Math.sin(thetaEnd), 0, radius * Math.cos(thetaEnd));
      rightEdge.rotation.y = thetaEnd + Math.PI / 2;
      cylinderGroup.add(rightEdge);

      // Mirrored Floor Reflection Mesh
      const reflTexture = texture.clone();
      const reflMat = new THREE.MeshBasicMaterial({
        map: reflTexture,
        transparent: true,
        opacity: isLight ? 0.22 : 0.30,
        side: THREE.FrontSide
      });
      const reflMesh = new THREE.Mesh(frontGeom.clone(), reflMat);
      reflectionGroup.add(reflMesh);
    });

    // 7. Render Loop with smooth inertia and scale easing
    const renderLoop = () => {
      reqAnimFrameId.current = requestAnimationFrame(renderLoop);

      // Idle tourbillon drift for the top-down circle in background
      if (currentTiltX.current < -1.3 && !isDragging.current) {
        targetRotationY.current += 0.0018;
      }

      // Smooth rotation Y (Horizontal Carousel)
      rotationAngle.current += (targetRotationY.current - rotationAngle.current) * 0.12;
      cylinderGroup.rotation.y = rotationAngle.current;
      reflectionGroup.rotation.y = rotationAngle.current;

      // Smooth rotation X (Top-Down to Upright unrolling tilt)
      currentTiltX.current += (targetTiltX.current - currentTiltX.current) * 0.12;
      cylinderGroup.rotation.x = currentTiltX.current;
      reflectionGroup.rotation.x = currentTiltX.current;

      // Smooth dynamic scale
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
  }, [isLight, isReduced]);

  // GSAP ScrollTrigger: Unroll from Defensive Philosophy into Validated Track Record
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    if (isReduced) return;

    const sectionEl = sectionRef.current;

    const timer = setTimeout(() => {
      const st = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        end: "+=3600",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          if (p <= 0.20) {
            // PHASE 1: Defensive Philosophy in foreground, Faded Top-down circle in background
            if (philosophyRef.current) {
              philosophyRef.current.style.opacity = "1";
              philosophyRef.current.style.transform = `translateY(0px)`;
              philosophyRef.current.style.pointerEvents = "auto";
            }
            if (canvasContainerRef.current) {
              canvasContainerRef.current.style.opacity = "0.38";
            }
            if (headerRef.current) {
              headerRef.current.style.opacity = "0";
              headerRef.current.style.transform = "translateY(-30px)";
            }
            if (reflectionGroupRef.current) {
              reflectionGroupRef.current.visible = false;
            }

            targetTiltX.current = -Math.PI / 2;
            baseScale.current = 0.65;
          } else if (p > 0.20 && p <= 0.48) {
            // PHASE 2: Unrolling from Top-Down Circle to Upright Track Record Carousel (p: 0.20 -> 0.48)
            const t = (p - 0.20) / 0.28; // Normalized 0 -> 1
            const easeT = gsap.parseEase("power2.out")(t);

            // Defensive Philosophy text fades out swiftly and slides up
            if (philosophyRef.current) {
              philosophyRef.current.style.opacity = `${Math.max(0, 1 - t * 2.8)}`;
              philosophyRef.current.style.transform = `translateY(${-easeT * 140}px)`;
              philosophyRef.current.style.pointerEvents = "none";
            }

            // Circle fades from 0.38 to 1.0 as it unrolls
            if (canvasContainerRef.current) {
              canvasContainerRef.current.style.opacity = `${0.38 + easeT * 0.62}`;
            }

            // Unroll Rotation X: from -Math.PI / 2 to -0.06 rad
            targetTiltX.current = -Math.PI / 2 + easeT * (Math.PI / 2 - 0.06);

            // Expand Base Scale: from 0.65 to 1.0
            baseScale.current = 0.65 + easeT * 0.35;

            // Rotation Y locked to Card 1
            targetRotationY.current = manualOffset.current;

            // Fade in header
            if (headerRef.current) {
              headerRef.current.style.opacity = `${easeT}`;
              headerRef.current.style.transform = `translateY(${-30 + easeT * 30}px)`;
            }
            if (reflectionGroupRef.current) {
              reflectionGroupRef.current.visible = t > 0.4;
            }
          } else {
            // PHASE 3: Upright Cylinder Revolves horizontally through all 4 cards (p: 0.48 -> 1.0)
            const t = (p - 0.48) / 0.52; // Normalized 0 -> 1

            if (philosophyRef.current) {
              philosophyRef.current.style.opacity = "0";
              philosophyRef.current.style.pointerEvents = "none";
            }
            if (canvasContainerRef.current) {
              canvasContainerRef.current.style.opacity = "1";
            }
            if (headerRef.current) {
              headerRef.current.style.opacity = "1";
              headerRef.current.style.transform = "translateY(0px)";
            }
            if (reflectionGroupRef.current) {
              reflectionGroupRef.current.visible = true;
            }

            targetTiltX.current = -0.06;
            baseScale.current = 1.0;

            // 0 -> 1 in Phase 3 rotates through all 4 cards (0 to -270 deg)
            const baseScrollAngle = t * (-Math.PI * 1.5);
            targetRotationY.current = baseScrollAngle + manualOffset.current;
          }

          // Dynamic scale-on-scroll breathing expansion effect
          const velocity = Math.abs(self.getVelocity());
          targetScale.current = Math.min(1.03, baseScale.current + velocity * 0.00002);

          if (scrollVelocityTimer.current) clearTimeout(scrollVelocityTimer.current);
          scrollVelocityTimer.current = setTimeout(() => {
            targetScale.current = baseScale.current;
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
    if (scrollTriggerInstance.current && scrollTriggerInstance.current.progress > 0.48) {
      const t = (scrollTriggerInstance.current.progress - 0.48) / 0.52;
      const baseScrollAngle = t * (-Math.PI * 1.5);
      targetRotationY.current = baseScrollAngle + manualOffset.current;
    } else {
      targetRotationY.current = manualOffset.current;
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
    if (scrollTriggerInstance.current && scrollTriggerInstance.current.progress > 0.48) {
      const t = (scrollTriggerInstance.current.progress - 0.48) / 0.52;
      const baseScrollAngle = t * (-Math.PI * 1.5);
      targetRotationY.current = baseScrollAngle + manualOffset.current;
    } else {
      targetRotationY.current = manualOffset.current;
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

      {/* DEFENSIVE PHILOSOPHY Statement Layer (Exact Original Animations & Styling) */}
      <div
        ref={philosophyRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 md:px-12 text-center transition-all duration-300 pointer-events-none"
      >
        <div className="max-w-[1150px] flex flex-col items-center gap-6 md:gap-8 text-center pointer-events-auto">
          <SectionLabel color="secondary">DEFENSIVE PHILOSOPHY</SectionLabel>

          {/* Main Statement Word-by-Word Reveal Animation */}
          <motion.h2
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="text-[clamp(1.5rem,3.4vw,2.8rem)] font-display font-medium leading-[1.2] tracking-[-0.02em] uppercase text-center flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.15em]"
          >
            {PHILOSOPHY_TOKENS.map((token, index) => (
              <React.Fragment key={index}>
                <motion.span
                  variants={itemVariants}
                  whileHover={
                    token.highlight
                      ? {
                          scale: 1.05,
                          textShadow: "0 0 12px rgba(0,163,255,0.25)",
                          transition: { duration: 0.2, ease: "easeOut" },
                        }
                      : {
                          y: -2,
                          transition: { duration: 0.2, ease: "easeOut" },
                        }
                  }
                  className={`inline-block transition-all duration-300 cursor-default hover:text-accent ${
                    token.highlight
                      ? "text-text-secondary font-semibold"
                      : "text-text-primary"
                  }`}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {token.text}
                </motion.span>
                {index < PHILOSOPHY_TOKENS.length - 1 ? " " : ""}
              </React.Fragment>
            ))}
          </motion.h2>

          {/* Action Button & Scroll Prompt */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="mt-2 flex flex-col items-center gap-4 text-center"
          >
            <Button variant="secondary" size="md" asLink href="#track-record" className="gap-2">
              Explore Track Record <span className="font-sans">↓</span>
            </Button>

            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted/60 transition-colors">
              Scroll to unroll deterministic metrics
            </span>
          </motion.div>
        </div>
      </div>

      {/* VALIDATED TRACK RECORD Top Header (Fades in during unroll) */}
      <header
        ref={headerRef}
        className="relative z-30 pt-12 sm:pt-14 md:pt-16 px-6 md:px-12 max-w-[1440px] mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0 transition-all duration-300 opacity-0"
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

      {/* Main 3D WebGL Canvas Arena */}
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
