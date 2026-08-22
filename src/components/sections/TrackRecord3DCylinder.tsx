"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform, useMotionValue, MotionValue } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";
import { Button } from "../ui/Button";
import { fadeInUpVariants } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PhilosophyToken {
  text: string;
  highlight: boolean;
}

function JitterWordSpan({
  token,
  index,
  total,
  progress,
  isLight,
}: {
  token: PhilosophyToken;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isLight: boolean;
}) {
  // Stagger window per word with smooth overlap
  const start = index / total;
  const end = Math.min(1.0, (index + 1.25) / total);

  // Clearly visible priorly (opacity 0.52 -> 1.0)
  const opacity = useTransform(progress, [start, end], [0.52, 1.0]);
  const scale = useTransform(progress, [start, end], [0.98, 1.0]);

  const inactiveColor = isLight ? "#475569" : "#7C8DAB";

  const activeColor = token.highlight
    ? isLight
      ? "#1E52C8" // deep azure against the alabaster surface
      : "#96CBFF" // bright sky against the jet-black surface
    : isLight
    ? "#060606"
    : "#F1F5FF";

  const color = useTransform(progress, [start, end], [inactiveColor, activeColor]);

  return (
    <motion.span
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        opacity,
        scale,
        color,
        textShadow:
          token.highlight && !isLight ? "0 0 20px rgba(150, 203, 255, 0.42)" : undefined,
      }}
      className={`inline-block transition-all duration-150 cursor-default select-none hover:scale-[1.04] ${
        token.highlight ? "font-semibold" : "font-medium"
      }`}
    >
      {token.text}
    </motion.span>
  );
}

function JitterScrollText({
  tokens,
  isLight,
  pinnedProgress,
}: {
  tokens: PhilosophyToken[];
  isLight: boolean;
  pinnedProgress: MotionValue<number>;
}) {
  return (
    <h2 className="text-[clamp(1.5rem,3.4vw,2.8rem)] font-display font-medium leading-[1.2] tracking-[-0.02em] uppercase text-center flex flex-wrap justify-center gap-x-[0.28em] gap-y-[0.2em]">
      {tokens.map((token, index) => (
        <React.Fragment key={index}>
          <JitterWordSpan
            token={token}
            index={index}
            total={tokens.length}
            progress={pinnedProgress}
            isLight={isLight}
          />
          {index < tokens.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </h2>
  );
}

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
    backHex: string;
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
    backHex: string;
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
    // CREST Accredited
    value: "CREST",
    label: "PENETRATION TESTING",
    watermark: "CREST",
    category: "CREST ACCREDITED",
    description: "CREST-accredited penetration testing delivering internationally validated security assessments.",
    badge: "CREST ACCREDITED",
    metricDetail: "Penetration Testing",
    lightColors: {
      bgStart: "#FFF9FD",
      bgMid: "#F5E4F3",
      bgEnd: "#D694AD",
      accent: "#8D3B67",
      topCapHex: 0xD694AD,
      backHex: "rgba(245, 228, 243, 0.55)",
      watermark: "rgba(173, 112, 146, 0.18)",
      border: "rgba(214, 148, 173, 0.85)",
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
      backHex: "rgba(48, 24, 46, 0.65)",
      watermark: "rgba(243, 236, 243, 0.14)",
      border: "rgba(244, 168, 202, 0.65)",
      chipBg: "rgba(48, 24, 46, 0.95)",
      chipText: "#F4A8CA",
      textColor: "#FFFFFF",
      descColor: "#FAFAF6"
    }
  },
  {
    // CERT-In Empanelled
    value: "CERT-In",
    label: "AUDITING ORGANISATION",
    watermark: "Empanelled",
    category: "CERT-IN EMPANELLED",
    description: "CERT-In empanelled auditing organisation authorized for corporate and government security assessments.",
    badge: "CERT-IN EMPANELLED",
    metricDetail: "Auditing Organisation",
    lightColors: {
      bgStart: "#F5FAFE",
      bgMid: "#D8ECFA",
      bgEnd: "#8DB5D9",
      accent: "#1E5782",
      topCapHex: 0x8DB5D9,
      backHex: "rgba(216, 236, 250, 0.55)",
      watermark: "rgba(107, 153, 197, 0.18)",
      border: "rgba(141, 181, 217, 0.85)",
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
      backHex: "rgba(18, 46, 78, 0.65)",
      watermark: "rgba(215, 243, 253, 0.14)",
      border: "rgba(125, 211, 252, 0.65)",
      chipBg: "rgba(18, 46, 78, 0.95)",
      chipText: "#7DD3FC",
      textColor: "#FFFFFF",
      descColor: "#FAFAF6"
    }
  },
  {
    // ISO/IEC 27001
    value: "ISO 27001",
    label: "CERTIFIED ISMS",
    watermark: "ISO 27001",
    category: "ISO 27001 CERTIFIED",
    description: "ISO/IEC 27001-certified ISMS adhering to international standards for information security management.",
    badge: "ISO 27001 CERTIFIED",
    metricDetail: "ISMS Certified",
    lightColors: {
      bgStart: "#FCFAF6",
      bgMid: "#F7EEE0",
      bgEnd: "#E9C797",
      accent: "#825922",
      topCapHex: 0xE9C797,
      backHex: "rgba(247, 238, 224, 0.55)",
      watermark: "rgba(208, 169, 117, 0.18)",
      border: "rgba(233, 199, 151, 0.85)",
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
      backHex: "rgba(51, 38, 23, 0.65)",
      watermark: "rgba(233, 199, 151, 0.14)",
      border: "rgba(253, 230, 138, 0.65)",
      chipBg: "rgba(51, 38, 23, 0.95)",
      chipText: "#FDE68A",
      textColor: "#FFFFFF",
      descColor: "#FAFAF6"
    }
  },
  {
    // Founded 2013
    value: "2013",
    label: "FOUNDED IN 2013",
    watermark: "2013",
    category: "FOUNDED 2013",
    description: "Founded in 2013 with over a decade of continuous cybersecurity and offensive testing expertise.",
    badge: "FOUNDED 2013",
    metricDetail: "Established Track Record",
    lightColors: {
      bgStart: "#F4FDF8",
      bgMid: "#DFF8EA",
      bgEnd: "#34D399",
      accent: "#047857",
      topCapHex: 0x34D399,
      backHex: "rgba(223, 248, 234, 0.55)",
      watermark: "rgba(5, 150, 105, 0.18)",
      border: "rgba(52, 211, 153, 0.85)",
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
      backHex: "rgba(17, 56, 39, 0.65)",
      watermark: "rgba(167, 243, 208, 0.14)",
      border: "rgba(110, 231, 183, 0.65)",
      chipBg: "rgba(17, 56, 39, 0.95)",
      chipText: "#6EE7B7",
      textColor: "#FFFFFF",
      descColor: "#FAFAF6"
    }
  },
  {
    // Verified Delivery
    value: "100%",
    label: "VERIFIED ENTERPRISE DELIVERY",
    watermark: "Verified",
    category: "VERIFIED DELIVERY",
    description: "Verified enterprise delivery across banking, fintech, cloud, healthcare, and digital assets.",
    badge: "VERIFIED DELIVERY",
    metricDetail: "Enterprise Proven",
    lightColors: {
      bgStart: "#F8F7FF",
      bgMid: "#E8E5FF",
      bgEnd: "#A78BFA",
      accent: "#5B21B6",
      topCapHex: 0xA78BFA,
      backHex: "rgba(232, 229, 255, 0.55)",
      watermark: "rgba(139, 92, 246, 0.18)",
      border: "rgba(167, 139, 250, 0.85)",
      chipBg: "rgba(238, 235, 255, 0.95)",
      chipText: "#5B21B6",
      textColor: "#0A0A0A",
      descColor: "#0E0E0C"
    },
    darkColors: {
      bgStart: "#141026",
      bgMid: "#251D45",
      bgEnd: "#3C2E6B",
      accent: "#C4B5FD",
      topCapHex: 0xC4B5FD,
      backHex: "rgba(37, 29, 69, 0.65)",
      watermark: "rgba(196, 181, 253, 0.14)",
      border: "rgba(196, 181, 253, 0.65)",
      chipBg: "rgba(37, 29, 69, 0.95)",
      chipText: "#C4B5FD",
      textColor: "#FFFFFF",
      descColor: "#FAFAF6"
    }
  }
];

// Helper to draw the high-resolution front canvas texture with rounded corners and dynamic real-time glare
function drawCardFrontCanvas(
  canvas: HTMLCanvasElement,
  spec: CardSpec,
  index: number,
  isLight: boolean,
  glareX: number,
  glareY: number,
  glareIntensity: number
) {
  const W = 2800;
  const H = 1200;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const colors = isLight ? spec.lightColors : spec.darkColors;
  const r = 70; // Smooth curved card corner radius

  // 1. Path of the Rounded Card
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

  // Save clip so nothing leaks out past rounded corners
  ctx.save();
  ctx.clip();

  // 2. Base Multi-stop Atmospheric Gradient Fill
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, colors.bgStart);
  bgGrad.addColorStop(0.50, colors.bgMid);
  bgGrad.addColorStop(1, colors.bgEnd);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  // 3. Dynamic Specular Cylindrical Glass Lighting Highlight (Tracks mouse hover)
  const glareGrad = ctx.createRadialGradient(glareX, glareY, 10, glareX, glareY, W * 0.65);
  const alphaHigh = isLight ? 0.85 * glareIntensity : 0.45 * glareIntensity;
  const alphaMid = isLight ? 0.24 * glareIntensity : 0.10 * glareIntensity;
  glareGrad.addColorStop(0, `rgba(255, 255, 255, ${alphaHigh})`);
  glareGrad.addColorStop(0.35, `rgba(255, 255, 255, ${alphaMid})`);
  glareGrad.addColorStop(0.70, `rgba(255, 255, 255, ${0.03 * glareIntensity})`);
  glareGrad.addColorStop(1, "transparent");
  ctx.fillStyle = glareGrad;
  ctx.fill();

  // 4. Clean Palantir-Style Watermark Typography
  ctx.save();
  ctx.font = "600 280px 'Inter Tight', 'Inter', -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = colors.watermark;
  ctx.fillText(spec.watermark, W / 2, H / 2 + 10);
  ctx.restore();

  // 5. Top Row: Index Capsule, Category Badge, Security Glyph
  const leftX = 160;
  const rightX = 2640;
  const topY = 155;

  // Index Capsule [01 / 04]
  ctx.save();
  const indexText = `0${index + 1} / 04`;
  ctx.font = "500 30px 'IBM Plex Mono', 'JetBrains Mono', monospace";
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
  ctx.font = "500 28px 'IBM Plex Mono', 'JetBrains Mono', monospace";
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

  // Primary Metric Number (Clean Neo-Grotesk)
  ctx.save();
  ctx.font = "600 120px 'Inter Tight', 'Inter', -apple-system, sans-serif";
  ctx.fillStyle = colors.textColor;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(spec.value, leftX, centerY - 24);

  // Stat Label (IBM Plex Mono)
  ctx.font = "500 24px 'IBM Plex Mono', 'JetBrains Mono', monospace";
  ctx.fillStyle = colors.chipText;
  ctx.textAlign = "left";
  ctx.fillText(spec.label, leftX, centerY + 70);
  ctx.restore();

  // Right Side Description (Inter Tight - Clean Technical Paragraph)
  ctx.save();
  ctx.font = "400 28px 'Inter Tight', 'Inter', sans-serif";
  ctx.fillStyle = colors.descColor;
  ctx.textAlign = "right";
  ctx.textBaseline = "top";

  const maxDescW = 440;
  const words = spec.description.split(" ");
  let line = "";
  let lineY = centerY - 56;
  const lineHeight = 40;

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
  ctx.font = "500 28px 'Inter Tight', 'Inter', sans-serif";
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

  // Restore clip to draw outer smooth border
  ctx.restore();

  // 8. Outer Double Rounded Bevel Stroke
  ctx.save();
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

  ctx.lineWidth = 4;
  ctx.strokeStyle = colors.border;
  ctx.stroke();

  // Inner hairline lighting line
  ctx.lineWidth = 2;
  ctx.strokeStyle = isLight ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.25)";
  ctx.beginPath();
  ctx.roundRect(14, 14, W - 28, H - 28, r - 8);
  ctx.stroke();
  ctx.restore();
}

// Helper to draw the matching frosted back canvas texture with rounded corners
function drawCardBackCanvas(
  canvas: HTMLCanvasElement,
  spec: CardSpec,
  isLight: boolean
) {
  const W = 2800;
  const H = 1200;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);
  ctx.imageSmoothingEnabled = true;

  const colors = isLight ? spec.lightColors : spec.darkColors;
  const r = 70;

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

  ctx.fillStyle = colors.backHex;
  ctx.fill();

  ctx.lineWidth = 3;
  ctx.strokeStyle = colors.border;
  ctx.stroke();
}

function createCardCanvasTexture(
  spec: CardSpec,
  index: number,
  isLight: boolean,
  maxAnisotropy: number
): {
  frontTexture: THREE.CanvasTexture;
  frontCanvas: HTMLCanvasElement;
  backTexture: THREE.CanvasTexture;
  backCanvas: HTMLCanvasElement;
} {
  const W = 2800;
  const H = 1200;

  // Front Canvas
  const frontCanvas = document.createElement("canvas");
  frontCanvas.width = W;
  frontCanvas.height = H;
  drawCardFrontCanvas(frontCanvas, spec, index, isLight, W * 0.50, H * 0.15, 1.0);

  const frontTexture = new THREE.CanvasTexture(frontCanvas);
  frontTexture.colorSpace = THREE.SRGBColorSpace;
  frontTexture.generateMipmaps = true;
  frontTexture.minFilter = THREE.LinearMipmapLinearFilter;
  frontTexture.magFilter = THREE.LinearFilter;
  frontTexture.anisotropy = Math.min(maxAnisotropy, 16);

  // Back Canvas
  const backCanvas = document.createElement("canvas");
  backCanvas.width = W;
  backCanvas.height = H;
  drawCardBackCanvas(backCanvas, spec, isLight);

  const backTexture = new THREE.CanvasTexture(backCanvas);
  backTexture.colorSpace = THREE.SRGBColorSpace;
  backTexture.generateMipmaps = true;
  backTexture.minFilter = THREE.LinearMipmapLinearFilter;
  backTexture.magFilter = THREE.LinearFilter;
  backTexture.anisotropy = Math.min(maxAnisotropy, 16);

  return { frontTexture, frontCanvas, backTexture, backCanvas };
}

export default function TrackRecord3DCylinder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const brandBgRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const pinnedTextProgress = useMotionValue(0);

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeIndex, setActiveIndex] = useState(0);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cylinderGroupRef = useRef<THREE.Group | null>(null);
  const reflectionGroupRef = useRef<THREE.Group | null>(null);

  // Textures and Canvases for dynamic hover updates
  const cardTexturesRef = useRef<
    Array<{
      frontTexture: THREE.CanvasTexture;
      frontCanvas: HTMLCanvasElement;
      spec: CardSpec;
      index: number;
    }>
  >([]);

  // Animation & Interaction state
  const rotationAngle = useRef(0);
  const manualOffset = useRef(0);
  const targetRotationY = useRef(0);
  const currentTiltX = useRef(-Math.PI / 2);
  const targetTiltX = useRef(-Math.PI / 2);
  const baseScale = useRef(0.72);
  const dynamicScale = useRef(0.72);
  const targetScale = useRef(0.72);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
  const reqAnimFrameId = useRef<number | null>(null);

  // Mouse hover parallax & dynamic glare position
  const mouseCoords = useRef({ x: 0.5, y: 0.5, isOver: false });
  const glareCoords = useRef({ x: 1400, y: 200, intensity: 1.0 });

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

  // Navigation handlers for next / prev cards
  const handleNextCard = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const currentRot = targetRotationY.current;
    targetRotationY.current = Math.floor(currentRot / (Math.PI / 2)) * (Math.PI / 2) - Math.PI / 2;
    manualOffset.current = targetRotationY.current;
  }, []);

  const handlePrevCard = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const currentRot = targetRotationY.current;
    targetRotationY.current = Math.ceil(currentRot / (Math.PI / 2)) * (Math.PI / 2) + Math.PI / 2;
    manualOffset.current = targetRotationY.current;
  }, []);

  // Three.js WebGL True Curved Volumetric Cylinder Construction
  useEffect(() => {
    if (typeof window === "undefined" || !canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera (Eye level, matching Aikawa Kenichi)
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.04, 7.85);
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

    // Initial prominent visible background state for Defensive Philosophy (0.80 opacity)
    container.style.opacity = isReduced ? "1" : "0.80";
    container.style.transition = "opacity 0.2s ease-out";

    // 3. Cylinder Dimensions: Wafer-Thin Paper-Sleek Depth
    const radius = 3.85;
    const cardHeight = 2.16;
    const slabDepth = 0.016; // Paper-thin crystal glass depth
    const gap = 0.038; // Clean, razor-sharp seam between cards
    const sectorAngle = Math.PI / 2 - gap; // 90 deg arc per card

    // 4. Main 3D Cylinder Group
    const cylinderGroup = new THREE.Group();
    cylinderGroup.position.set(0, 0, 0);
    cylinderGroup.rotation.x = isReduced ? -0.015 : -Math.PI / 2;
    cylinderGroup.scale.setScalar(isReduced ? 1.0 : 0.72);
    scene.add(cylinderGroup);
    cylinderGroupRef.current = cylinderGroup;

    // 5. Mirrored Floor Reflection Group
    const reflectionGroup = new THREE.Group();
    reflectionGroup.position.set(0, -cardHeight - 0.16, 0);
    reflectionGroup.rotation.x = isReduced ? -0.015 : -Math.PI / 2;
    reflectionGroup.scale.set(isReduced ? 1.0 : 0.72, isReduced ? -1.0 : -0.72, isReduced ? 1.0 : 0.72);
    reflectionGroup.visible = isReduced;
    scene.add(reflectionGroup);
    reflectionGroupRef.current = reflectionGroup;

    // Set initial state
    currentTiltX.current = isReduced ? -0.015 : -Math.PI / 2;
    targetTiltX.current = isReduced ? -0.015 : -Math.PI / 2;
    baseScale.current = isReduced ? 1.0 : 0.72;
    dynamicScale.current = isReduced ? 1.0 : 0.72;
    targetScale.current = isReduced ? 1.0 : 0.72;

    // Add Ambient, Directional, and Dynamic Interactive Mouse Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, isLight ? 1.6 : 1.1);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, isLight ? 2.0 : 1.4);
    dirLight.position.set(4, 6, 8);
    scene.add(dirLight);

    const mouseLight = new THREE.PointLight(0xffffff, isLight ? 2.5 : 1.8, 22);
    mouseLight.position.set(0, 0, 7.5);
    scene.add(mouseLight);

    // 6. Build 4 Volumetric Curved Slabs with Pure Curved Rounded Silhouettes & 3D Glass Front Structures
    cardTexturesRef.current = [];

    CARDS_DATA.forEach((spec, idx) => {
      const centerAngle = (idx * Math.PI) / 2;
      const thetaStart = centerAngle - sectorAngle / 2;

      // Outer curved front shell
      const frontGeom = new THREE.CylinderGeometry(
        radius + slabDepth / 2,
        radius + slabDepth / 2,
        cardHeight,
        64,
        1,
        true,
        thetaStart,
        sectorAngle
      );

      const { frontTexture, frontCanvas, backTexture } = createCardCanvasTexture(spec, idx, isLight, maxAniso);
      cardTexturesRef.current.push({ frontTexture, frontCanvas, spec, index: idx });

      // Front Material with alpha test for 100% clean rounded corner clipping
      const frontMat = new THREE.MeshBasicMaterial({
        map: frontTexture,
        transparent: true,
        alphaTest: 0.05,
        side: THREE.FrontSide
      });

      const cardMesh = new THREE.Mesh(frontGeom, frontMat);
      cylinderGroup.add(cardMesh);

      // 3D Glass Finished Element Structure floating directly in front of the card box
      const glassFrontGeom = new THREE.CylinderGeometry(
        radius + slabDepth / 2 + 0.035,
        radius + slabDepth / 2 + 0.035,
        cardHeight * 0.96,
        64,
        1,
        true,
        thetaStart + 0.02,
        sectorAngle - 0.04
      );

      const glassFrontMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.0,
        roughness: 0.06,
        transmission: 0.94,
        thickness: 0.6,
        ior: 1.50,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
        transparent: true,
        opacity: isLight ? 0.68 : 0.80,
        reflectivity: 0.95,
        side: THREE.FrontSide,
        depthWrite: false,
      });

      const glassShieldMesh = new THREE.Mesh(glassFrontGeom, glassFrontMat);
      cylinderGroup.add(glassShieldMesh);

      // Back shell with matching frosted crystal tone and identical rounded clipping
      const backGeom = new THREE.CylinderGeometry(
        radius - slabDepth / 2,
        radius - slabDepth / 2,
        cardHeight,
        64,
        1,
        true,
        thetaStart,
        sectorAngle
      );
      const backMat = new THREE.MeshBasicMaterial({
        map: backTexture,
        transparent: true,
        alphaTest: 0.05,
        side: THREE.BackSide
      });
      const backMesh = new THREE.Mesh(backGeom, backMat);
      cylinderGroup.add(backMesh);

      // Mirrored Floor Reflection Mesh
      const reflTexture = frontTexture.clone();
      const reflMat = new THREE.MeshBasicMaterial({
        map: reflTexture,
        transparent: true,
        alphaTest: 0.05,
        opacity: isLight ? 0.22 : 0.30,
        side: THREE.FrontSide
      });
      const reflMesh = new THREE.Mesh(frontGeom.clone(), reflMat);
      reflectionGroup.add(reflMesh);
    });

    let frameCount = 0;

    // 7. Render Loop with real-time hover glare & mouse parallax tilt
    const renderLoop = () => {
      reqAnimFrameId.current = requestAnimationFrame(renderLoop);
      frameCount++;

      // Smooth continuous idle drift in top-down circle view
      if (currentTiltX.current < -1.3 && !isDragging.current) {
        targetRotationY.current += 0.0016;
      }

      // Smooth rotation Y (Horizontal Carousel)
      rotationAngle.current += (targetRotationY.current - rotationAngle.current) * 0.12;

      // Mouse Parallax 3D Tilt calculation
      const parallaxX = mouseCoords.current.isOver ? (mouseCoords.current.y - 0.5) * -0.045 : 0;
      const parallaxY = mouseCoords.current.isOver ? (mouseCoords.current.x - 0.5) * 0.055 : 0;

      cylinderGroup.rotation.y = rotationAngle.current + parallaxY;
      reflectionGroup.rotation.y = rotationAngle.current + parallaxY;

      // Smooth rotation X (Top-Down to Upright unrolling tilt)
      currentTiltX.current += (targetTiltX.current - currentTiltX.current) * 0.12;
      cylinderGroup.rotation.x = currentTiltX.current + parallaxX;
      reflectionGroup.rotation.x = currentTiltX.current + parallaxX;

      // Smooth dynamic scale (Hover zoom + scroll breathing)
      const hoverScaleBoost = mouseCoords.current.isOver && currentTiltX.current > -0.2 ? 0.018 : 0;
      const effectiveTargetScale = targetScale.current + hoverScaleBoost;
      dynamicScale.current += (effectiveTargetScale - dynamicScale.current) * 0.14;
      cylinderGroup.scale.setScalar(dynamicScale.current);
      reflectionGroup.scale.set(dynamicScale.current, -dynamicScale.current, dynamicScale.current);

      // Update interactive mouse point light position in 3D space
      if (mouseCoords.current.isOver) {
        mouseLight.position.x = (mouseCoords.current.x - 0.5) * 8.5;
        mouseLight.position.y = (0.5 - mouseCoords.current.y) * 5.5;
      }

      // Active card index calculation
      const normAngle = ((-rotationAngle.current % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const activeIdx = Math.round(normAngle / (Math.PI / 2)) % CARDS_DATA.length;
      setActiveIndex(activeIdx);

      // Dynamic Canvas Texture Specular Glare update on active card (smoothened at 30fps)
      if (currentTiltX.current > -0.2 && frameCount % 2 === 0) {
        const targetGX = mouseCoords.current.isOver ? mouseCoords.current.x * 2800 : 1400;
        const targetGY = mouseCoords.current.isOver ? mouseCoords.current.y * 1200 : 200;
        const targetGI = mouseCoords.current.isOver ? 1.45 : 1.0;

        glareCoords.current.x += (targetGX - glareCoords.current.x) * 0.15;
        glareCoords.current.y += (targetGY - glareCoords.current.y) * 0.15;
        glareCoords.current.intensity += (targetGI - glareCoords.current.intensity) * 0.12;

        const activeCardObj = cardTexturesRef.current[activeIdx];
        if (activeCardObj) {
          drawCardFrontCanvas(
            activeCardObj.frontCanvas,
            activeCardObj.spec,
            activeCardObj.index,
            isLight,
            glareCoords.current.x,
            glareCoords.current.y,
            glareCoords.current.intensity
          );
          activeCardObj.frontTexture.needsUpdate = true;
        }
      }

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

  // GSAP ScrollTrigger: Instant, Natural Fluid Unroll from Defensive Philosophy into Track Record
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    if (isReduced) return;

    const sectionEl = sectionRef.current;

    const timer = setTimeout(() => {
      const st = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        end: "+=1900",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Update pinned text reveal progress for Jitter word reveal animation (0.0 -> 0.22)
          if (p <= 0.22) {
            const textP = Math.min(1, p / 0.18);
            pinnedTextProgress.set(textP);
          } else {
            pinnedTextProgress.set(1);
          }

          if (p <= 0.16) {
            // PHASE 1: Defensive Philosophy in foreground, Prominent Visible Top-down circle in background
            if (philosophyRef.current) {
              philosophyRef.current.style.opacity = "1";
              philosophyRef.current.style.transform = `translateY(0px)`;
              philosophyRef.current.style.pointerEvents = "auto";
            }
            if (canvasContainerRef.current) {
              canvasContainerRef.current.style.opacity = "0.80";
            }
            if (headerRef.current) {
              headerRef.current.style.opacity = "0";
              headerRef.current.style.transform = "translateY(-24px)";
            }
            if (brandBgRef.current) {
              brandBgRef.current.style.opacity = "0";
              brandBgRef.current.style.transform = "scale(0.95)";
            }
            if (reflectionGroupRef.current) {
              reflectionGroupRef.current.visible = false;
            }

            targetTiltX.current = -Math.PI / 2;
            baseScale.current = 0.72;
          } else if (p > 0.16 && p <= 0.45) {
            // PHASE 2: Instant Unrolling on user's natural scroll (p: 0.16 -> 0.45)
            const t = (p - 0.16) / 0.29; // Normalized 0 -> 1
            const easeT = gsap.parseEase("power2.out")(t);

            // Defensive Philosophy text fades out smoothly
            if (philosophyRef.current) {
              philosophyRef.current.style.opacity = `${Math.max(0, 1 - t * 2.2)}`;
              philosophyRef.current.style.transform = `translateY(${-easeT * 100}px)`;
              philosophyRef.current.style.pointerEvents = "none";
            }
            // Circle transitions from 0.80 to 1.0 as it unrolls upright
            if (canvasContainerRef.current) {
              canvasContainerRef.current.style.opacity = `${0.80 + easeT * 0.20}`;
            }

            // Unroll Rotation X: from -Math.PI / 2 to -0.015 rad
            targetTiltX.current = -Math.PI / 2 + easeT * (Math.PI / 2 - 0.015);

            // Expand Base Scale: from 0.72 to 1.0
            baseScale.current = 0.72 + easeT * 0.28;

            // Rotation Y progresses smoothly without resetting
            targetRotationY.current = manualOffset.current - easeT * 0.15;

            // Fade in header
            if (headerRef.current) {
              headerRef.current.style.opacity = `${easeT}`;
              headerRef.current.style.transform = `translateY(${-24 + easeT * 24}px)`;
            }

            // Late graceful fade-in for ENTERSOFT background watermark (starts only when cylinder is almost fully upright, t > 0.70)
            if (brandBgRef.current) {
              if (t <= 0.70) {
                brandBgRef.current.style.opacity = "0";
                brandBgRef.current.style.transform = "scale(0.95)";
              } else {
                const brandT = (t - 0.70) / 0.30; // Normalized 0 -> 1 late in unroll
                const brandEase = gsap.parseEase("power2.out")(brandT);
                brandBgRef.current.style.opacity = `${brandEase}`;
                brandBgRef.current.style.transform = `scale(${0.95 + brandEase * 0.05})`;
              }
            }

            if (reflectionGroupRef.current) {
              reflectionGroupRef.current.visible = t > 0.30;
            }
          } else {
            // PHASE 3: Upright Cylinder Revolves horizontally through all 4 cards (p: 0.38 -> 1.0)
            const t = (p - 0.38) / 0.62; // Normalized 0 -> 1

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
            if (brandBgRef.current) {
              brandBgRef.current.style.opacity = "1";
              brandBgRef.current.style.transform = "scale(1.0)";
            }
            if (reflectionGroupRef.current) {
              reflectionGroupRef.current.visible = true;
            }

            targetTiltX.current = -0.015;
            baseScale.current = 1.0;

            // 0 -> 1 in Phase 3 rotates continuously through cards
            const baseScrollAngle = -0.15 - t * (Math.PI * 1.5);
            targetRotationY.current = baseScrollAngle + manualOffset.current;
          }

          // Dynamic scale-on-scroll breathing expansion effect
          const velocity = Math.abs(self.getVelocity());
          targetScale.current = Math.min(1.025, baseScale.current + velocity * 0.000015);
        },
      });

      scrollTriggerInstance.current = st;
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timer);
      if (scrollTriggerInstance.current) {
        scrollTriggerInstance.current.kill();
        scrollTriggerInstance.current = null;
      }
    };
  }, [isReduced]);

  // Mouse & Touch Drag and Hover interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartAngle.current = manualOffset.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (canvasContainerRef.current) {
      const rect = canvasContainerRef.current.getBoundingClientRect();
      const normX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const normY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      mouseCoords.current = { x: normX, y: normY, isOver: true };
    }

    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    manualOffset.current = dragStartAngle.current + deltaX * 0.0045;
    if (scrollTriggerInstance.current && scrollTriggerInstance.current.progress > 0.38) {
      const t = (scrollTriggerInstance.current.progress - 0.38) / 0.62;
      const baseScrollAngle = -0.15 - t * (Math.PI * 1.5);
      targetRotationY.current = baseScrollAngle + manualOffset.current;
    } else {
      targetRotationY.current = manualOffset.current;
    }
  };

  const handleMouseEnter = () => {
    mouseCoords.current.isOver = true;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    mouseCoords.current = { x: 0.5, y: 0.5, isOver: false };
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
    if (scrollTriggerInstance.current && scrollTriggerInstance.current.progress > 0.38) {
      const t = (scrollTriggerInstance.current.progress - 0.38) / 0.62;
      const baseScrollAngle = -0.15 - t * (Math.PI * 1.5);
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

      {/* Background Monumental Editorial Typography: "ENTERSOFT" (Aikawa Style - Faded Luxury Watermark) */}
      <div
        ref={brandBgRef}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none overflow-hidden transition-all duration-300 opacity-0"
        style={{
          transform: "translateY(-3%)",
        }}
      >
        <h2
          className="text-[clamp(3.5rem,14vw,14.5rem)] uppercase leading-none transition-colors duration-500 whitespace-nowrap select-none"
          style={{
            fontFamily: "'Instrument Serif', 'Cormorant Garamond', 'Fraunces', Georgia, serif",
            fontWeight: 400,
            letterSpacing: "0.06em",
            opacity: isLight ? 0.055 : 0.075,
          }}
        >
          ENTERSOFT
        </h2>
      </div>

      {/* DEFENSIVE PHILOSOPHY Statement Layer */}
      <div
        ref={philosophyRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 md:px-12 text-center transition-all duration-300 pointer-events-none"
      >
        <div className="max-w-[1150px] flex flex-col items-center gap-6 md:gap-8 text-center pointer-events-auto">
          <SectionLabel color="secondary">DEFENSIVE PHILOSOPHY</SectionLabel>

          {/* Main Statement Jitter Scroll Text Reveal Animation */}
          <JitterScrollText
            tokens={PHILOSOPHY_TOKENS}
            isLight={isLight}
            pinnedProgress={pinnedTextProgress}
          />

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
              Scroll to explore verified security outcomes
            </span>
          </motion.div>
        </div>
      </div>

      {/* VALIDATED TRACK RECORD Top Header */}
      <header
        ref={headerRef}
        className="relative z-30 pt-10 sm:pt-12 md:pt-14 px-6 md:px-12 max-w-[1440px] mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0 transition-all duration-300 opacity-0"
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
              3D Curvature Slab
            </span>
          </div>
          <h1
            className={`text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-display font-semibold uppercase tracking-[-0.025em] mt-2 leading-[1.08] transition-colors ${
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
            Scroll or drag to revolve through verified security outcomes, empirical validation milestones, and enterprise operational benchmarks.
          </p>

          <div className="flex items-center gap-2 pointer-events-auto relative z-50">
            <button
              onClick={handlePrevCard}
              aria-label="Previous Metric"
              className={`w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer pointer-events-auto transition-all ${
                isLight
                  ? "bg-white/90 border-slate-200 hover:bg-slate-100 hover:scale-105 active:scale-95 text-slate-800 shadow-sm"
                  : "bg-slate-900/90 border-slate-700 hover:bg-slate-800 hover:scale-105 active:scale-95 text-slate-200 shadow-sm"
              }`}
            >
              ←
            </button>
            <button
              onClick={handleNextCard}
              aria-label="Next Metric"
              className={`w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer pointer-events-auto transition-all ${
                isLight
                  ? "bg-white/90 border-slate-200 hover:bg-slate-100 hover:scale-105 active:scale-95 text-slate-800 shadow-sm"
                  : "bg-slate-900/90 border-slate-700 hover:bg-slate-800 hover:scale-105 active:scale-95 text-slate-200 shadow-sm"
              }`}
            >
              →
            </button>
          </div>
        </div>
      </header>

      {/* Main 3D WebGL Canvas Arena (Full-bleed height without bottom bar obstruction) */}
      <div
        ref={canvasContainerRef}
        className="relative z-20 flex-1 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing my-auto"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </section>
  );
}
