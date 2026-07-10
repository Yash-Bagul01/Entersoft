"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  ChevronRight, 
  Terminal as TerminalIcon, 
  ShieldAlert, 
  Check, 
  Plus, 
  Minus, 
  Lock, 
  Unlock, 
  Shield, 
  Copy, 
  RotateCcw,
  AlertTriangle,
  Server,
  Database,
  Radio,
  Activity,
  Award
} from "lucide-react";
import Link from "next/link";
import SectionLabel from "../ui/SectionLabel";
import ServiceCTA from "./ServiceCTA";
import MagneticButton from "../ui/MagneticButton";

// ==========================================
// SCENE 0: CLOUD TOPOLOGY CANVAS
// ==========================================
function CloudHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }

    const numParticles = 40;
    const particles: Particle[] = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const draw = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle background grid
      ctx.strokeStyle = "rgba(34, 34, 34, 0.25)";
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`; // Cyan accent
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < numParticles; i++) {
        for (let j = i + 1; j < numParticles; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - dist / 150) * 0.08})`; // Muted cyan connections
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            draw();
          } else {
            cancelAnimationFrame(animationFrameId);
          }
        });
      },
      { threshold: 0.01 }
    );
    
    observer.observe(canvas);
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ==========================================
// SCENE 1: DRIFT TERMINAL SIMULATOR (SECTION A)
// ==========================================
function DriftTerminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const [logs, setLogs] = useState<string[]>([]);
  const [stage, setStage] = useState<"scanning" | "drift-found" | "alerting" | "retesting" | "secured">("scanning");

  useEffect(() => {
    if (!isInView) return;

    let active = true;
    const runSequence = async () => {
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      while (active) {
        // Init
        setStage("scanning");
        setLogs([
          "Initializing Continuous Cloud Posture Scan...",
          "[TELEMETRY] Connected to AWS: us-east-1 via security-audit IAM role.",
          "[TELEMETRY] Connected to GCP: europe-west1 via serviceAccount credential.",
          "[INFO] Loading CIS Benchmark v1.4.0 mapping matrices.",
          "[INFO] Scanning active resources (EC2, S3, IAM, CloudTrail, KMS)..."
        ]);
        await delay(1500);

        if (!active) return;
        setLogs(prev => [...prev, "[SCAN] Evaluating AWS S3 bucket policies..."]);
        await delay(800);

        if (!active) return;
        setLogs(prev => [...prev, "[SCAN] Evaluating Azure Network Security Groups..."]);
        await delay(800);

        if (!active) return;
        // Drift found
        setStage("drift-found");
        setLogs(prev => [
          ...prev,
          "[CRITICAL] MISCONFIGURATION DRIFT DETECTED",
          "  - Entity: AWS S3 Bucket 'entersoft-production-backups'",
          "  - Property: PublicAccessBlockConfiguration.BlockPublicAcls == false",
          "  - Severity: CRITICAL (CVSS 8.2)",
          "  - Breach Risk: Data Exposure / Leakage"
        ]);
        await delay(2000);

        if (!active) return;
        // Alerting
        setStage("alerting");
        setLogs(prev => [
          ...prev,
          "[ALERT] Routing notification to Enterprise SOC...",
          "  ✓ Sent Slack Webhook alert to #sec-ops-channel",
          "  ✓ Logged event in SIEM (ID: EVT-9041-3A2)",
          "[ALERT] Generation of hotfix patch initiated."
        ]);
        await delay(2000);

        if (!active) return;
        // Retesting/fixing
        setStage("retesting");
        setLogs(prev => [
          ...prev,
          "[HOTFIX] Simulating remediation patch ingestion...",
          "Applying configuration change... (BlockPublicAcls = true)",
          "[RETEST] Verification scan launched on entersoft-production-backups..."
        ]);
        await delay(1800);

        if (!active) return;
        // Secured
        setStage("secured");
        setLogs(prev => [
          ...prev,
          "[✓ MATCH] CIS Security Control 2.1.1: PASSED",
          "[✓ MATCH] SOC 2 CC6.3 Access Configuration: PASSED",
          "[SECURE] Resource configuration aligned to baseline. Drift resolved.",
          "--------------------------------------------------"
        ]);
        await delay(4000);
      }
    };

    runSequence();

    return () => {
      active = false;
    };
  }, [isInView]);

  return (
    <div 
      ref={containerRef}
      className="w-full bg-black border border-zinc-800 rounded p-4 font-mono text-[10px] md:text-xs text-zinc-400 select-none shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
    >
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-3 text-[9px] text-zinc-500">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 animate-ping" />
          <span>ENTERSOFT // CSPM DETECTOR</span>
        </div>
        <span className={`px-2 py-0.5 border text-[8px] font-bold rounded tracking-widest ${
          stage === "drift-found" || stage === "alerting"
            ? "text-red-400 bg-red-950/20 border-red-500/30 animate-pulse"
            : stage === "secured"
            ? "text-cyan-400 bg-cyan-950/20 border-cyan-500/30"
            : "text-zinc-400 bg-zinc-950 border-zinc-800"
        }`}>
          {stage.toUpperCase()}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-2 scrollbar-thin">
        {logs.map((log, index) => {
          let textClass = "text-zinc-300";
          if (log.startsWith("[CRITICAL]")) textClass = "text-red-400 font-bold";
          else if (log.startsWith("  -")) textClass = "text-red-400/80 pl-2";
          else if (log.startsWith("[ALERT]")) textClass = "text-yellow-500";
          else if (log.startsWith("  ✓")) textClass = "text-zinc-400 pl-4";
          else if (log.startsWith("[SECURE]") || log.startsWith("[✓")) textClass = "text-cyan-400 font-bold";
          else if (log.startsWith("[INFO]")) textClass = "text-zinc-500";

          return (
            <div key={index} className={`${textClass} leading-normal`}>
              {log}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 border-t border-zinc-800 pt-2.5 flex justify-between items-center text-[8px] text-zinc-600">
        <span>BASELINE: CIS BENCHMARKS V1.4</span>
        <span>RESOLUTION FRAME: CONTINUOUS</span>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 2: IAM ACCESS MAP (SECTION B)
// ==========================================
function IAMAccessMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const [pulsePos, setPulsePos] = useState(0);
  const [state, setState] = useState<"vulnerable" | "blocked">("vulnerable");

  useEffect(() => {
    if (!isInView) return;
    let active = true;

    // Toggle vulnerabilities state in map
    const interval = setInterval(() => {
      if (active) {
        setState(prev => prev === "vulnerable" ? "blocked" : "vulnerable");
      }
    }, 4500);

    const animationLoop = () => {
      if (!active) return;
      setPulsePos(prev => (prev + 0.5) % 100);
      requestAnimationFrame(animationLoop);
    };
    requestAnimationFrame(animationLoop);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [isInView]);

  return (
    <div 
      ref={containerRef}
      className="w-full bg-[#050505] border border-zinc-800 rounded p-5 flex flex-col justify-between font-mono text-[9px] md:text-xs select-none shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
    >
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-4 text-[9px] text-zinc-500">
        <span>IAM ROLE EXPOSURE AUDITOR</span>
        <span className={`font-bold tracking-wider ${state === "vulnerable" ? "text-red-400" : "text-cyan-400"}`}>
          {state === "vulnerable" ? "[PRIVILEGE ESCALATION VULN]" : "[POLICY GUARD ACTIVE]"}
        </span>
      </div>

      <div className="relative h-[180px] bg-black/40 border border-zinc-900 rounded flex items-center justify-center p-4">
        {/* SVG Path drawing connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* User -> Role connection */}
          <path d="M 40 90 L 160 90" stroke={state === "vulnerable" ? "#ef4444" : "#06b6d4"} strokeWidth="1.5" strokeDasharray={state === "vulnerable" ? "none" : "3"} className="transition-colors duration-500" />
          
          {/* Role -> S3 Bucket connection (Permissive path) */}
          <path d="M 190 70 L 290 40" stroke={state === "vulnerable" ? "#ef4444" : "#06b6d4"} strokeWidth="1.5" className="transition-colors duration-500" />
          {/* Role -> Database connection (Escalation Path) */}
          <path d="M 190 110 L 290 140" stroke={state === "vulnerable" ? "#ef4444" : "rgba(82, 82, 91, 0.4)"} strokeWidth="1.5" strokeDasharray={state === "vulnerable" ? "none" : "4"} className="transition-colors duration-500" />

          {/* Animated pulse dot */}
          <circle
            cx={40 + (120 * pulsePos / 100)}
            cy={90}
            r="3"
            fill={state === "vulnerable" ? "#ef4444" : "#06b6d4"}
            className="transition-colors duration-500"
          />
          {pulsePos > 50 && (
            <>
              <circle
                cx={190 + (100 * (pulsePos - 50) / 50)}
                cy={70 - (30 * (pulsePos - 50) / 50)}
                r="2.5"
                fill={state === "vulnerable" ? "#ef4444" : "#06b6d4"}
              />
              <circle
                cx={190 + (100 * (pulsePos - 50) / 50)}
                cy={110 + (30 * (pulsePos - 50) / 50)}
                r="2.5"
                fill={state === "vulnerable" ? "#ef4444" : "transparent"}
              />
            </>
          )}
        </svg>

        {/* Nodes */}
        <div className="absolute left-[20px] top-[75px] flex flex-col items-center gap-1 z-10">
          <div className={`w-8 h-8 rounded-full bg-zinc-950 border ${state === "vulnerable" ? "border-red-500/60" : "border-cyan-500/60"} flex items-center justify-center text-zinc-300 text-[10px]`}>
            USER
          </div>
          <span className="text-[7px] text-zinc-500">dev-session</span>
        </div>

        <div className="absolute left-[140px] top-[60px] flex flex-col items-center gap-1 z-10 bg-zinc-950 p-1 rounded border border-zinc-800">
          <div className="text-[8px] text-zinc-500 font-bold mb-0.5">ASSUMED ROLE</div>
          <div className="text-zinc-200 text-[9px] font-bold px-2 py-1 bg-black/80 rounded border border-zinc-900">
            EC2InstanceRole
          </div>
          <span className="text-[7px] text-red-400">{state === "vulnerable" ? "sts:AssumeRole" : "verified-lock"}</span>
        </div>

        <div className="absolute right-[20px] top-[20px] flex flex-col items-center gap-1 z-10">
          <div className="w-7 h-7 rounded border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-400">
            S3
          </div>
          <span className="text-[7px] text-zinc-500">backups</span>
        </div>

        <div className="absolute right-[20px] bottom-[20px] flex flex-col items-center gap-1 z-10">
          <div className={`w-7 h-7 rounded border ${state === "vulnerable" ? "border-red-500/40 bg-red-950/20" : "border-zinc-800 bg-zinc-950"} flex items-center justify-center text-zinc-400 transition-colors duration-500`}>
            DB
          </div>
          <span className={`text-[7px] ${state === "vulnerable" ? "text-red-400" : "text-zinc-500"}`}>
            {state === "vulnerable" ? "EXPOSED" : "SECURED"}
          </span>
        </div>
      </div>

      <div className="mt-4 text-[8px] text-zinc-500 flex justify-between select-none">
        <span>OVER-PERMISSIVE ROLES SEARCH: ACTIVE</span>
        <span className="text-zinc-400">TARGET: IDENTITY TRUST BOUNDARIES</span>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 3: REMEDIATION CONSOLE (SECTION D)
// ==========================================
function RemediationConsole() {
  const [activeTab, setActiveTab] = useState<"terraform" | "telemetry">("terraform");
  const [patchApplied, setPatchApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const applyPatch = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setPatchApplied(true);
    }, 1800);
  };

  const resetPatch = () => {
    setPatchApplied(false);
  };

  const tfCode = `resource "aws_s3_bucket" "prod_backup" {
  bucket = "entersoft-production-backups"
}

resource "aws_s3_bucket_public_access_block" "block_public" {
  bucket = aws_s3_bucket.prod_backup.id

  # HOTFIX: Block public access to prevent posture drift
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`;

  return (
    <div className="w-full bg-[#050505] border border-zinc-800 rounded p-4 flex flex-col justify-between font-mono text-[9px] md:text-xs select-none shadow-[0_20px_50px_rgba(0,0,0,0.8)] min-h-[300px]">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-3 text-[9px] text-zinc-500">
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab("terraform")}
            className={`cursor-pointer uppercase tracking-wider pb-1 transition-colors ${activeTab === "terraform" ? "text-white border-b-2 border-cyan-500" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            Terraform Patch
          </button>
          <button 
            onClick={() => setActiveTab("telemetry")}
            className={`cursor-pointer uppercase tracking-wider pb-1 transition-colors ${activeTab === "telemetry" ? "text-white border-b-2 border-cyan-500" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            Compliance Health
          </button>
        </div>
        <span className={`font-bold ${patchApplied ? "text-cyan-400" : "text-red-400"}`}>
          {patchApplied ? "[STATE: COMPLIANT]" : "[STATE: DRIFT_DETECTED]"}
        </span>
      </div>

      <div className="flex-1 bg-black/60 border border-zinc-900 rounded p-3 relative flex flex-col justify-between">
        {activeTab === "terraform" ? (
          <div className="flex flex-col h-full justify-between gap-4">
            <pre className="text-zinc-400 text-[8.5px] leading-relaxed overflow-x-auto select-text scrollbar-thin">
              {tfCode}
            </pre>
            <div className="flex justify-between items-center border-t border-zinc-900 pt-3">
              <span className="text-[7.5px] text-zinc-500">// IAAC REMEDIATION EXPORT READY</span>
              <div className="flex gap-2">
                {patchApplied ? (
                  <button 
                    onClick={resetPatch}
                    className="cursor-pointer px-2.5 py-1.5 border border-zinc-800 bg-zinc-950 text-zinc-400 text-[8.5px] flex items-center gap-1 hover:text-white transition-colors rounded-[2px]"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Drift
                  </button>
                ) : (
                  <button 
                    disabled={isApplying}
                    onClick={applyPatch}
                    className={`cursor-pointer px-3 py-1.5 text-[8.5px] font-bold tracking-widest rounded-[2px] transition-all flex items-center gap-1.5 ${
                      isApplying 
                        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                        : "bg-cyan-500 text-black hover:bg-cyan-400 active:scale-95 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                    }`}
                  >
                    {isApplying ? "DEPLOYING PATCH..." : "APPLY TERRAFORM PATCH"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 py-2">
            {[
              { framework: "CIS Benchmarks v1.4", rate: patchApplied ? 100 : 88, color: "bg-cyan-500", raw: patchApplied ? "120/120 checks" : "105/120 checks" },
              { framework: "SOC 2 Trust Principles", rate: patchApplied ? 100 : 94, color: "bg-cyan-500", raw: patchApplied ? "45/45 controls" : "42/45 controls" },
              { framework: "ISO 27001 ISMS Controls", rate: patchApplied ? 100 : 91, color: "bg-cyan-500", raw: patchApplied ? "114/114 items" : "104/114 items" },
              { framework: "HIPAA Security Standards", rate: 100, color: "bg-cyan-500", raw: "18/18 standards" }
            ].map((fw) => (
              <div key={fw.framework} className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[8.5px] text-zinc-300">
                  <span>{fw.framework}</span>
                  <span className={fw.rate === 100 ? "text-cyan-400 font-bold" : "text-red-400 font-bold"}>
                    {fw.rate}% ({fw.raw})
                  </span>
                </div>
                <div className="w-full h-1 bg-zinc-950 border border-zinc-900 rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${fw.rate}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`absolute top-0 bottom-0 left-0 ${fw.rate === 100 ? "bg-cyan-500" : "bg-red-400"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 text-[7.5px] text-zinc-600 flex justify-between select-none">
        <span>SECURITY COMPLIANCE AUDITING: 24/7 ACTIVE</span>
        <span>REMEDIATION MODE: IAAC AUTO-GEN</span>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 4: MATRIX COVERAGE TABLE (SECTION C)
// ==========================================
const matrixData = [
  { surface: "AWS S3 / Azure Blob Storage", detect: "[✓]", alert: "[✓]", remedy: "[✓]", compliance: "[✓]" },
  { surface: "IAM Policies & Active Roles", detect: "[✓]", alert: "[✓]", remedy: "[✓]", compliance: "[✓]" },
  { surface: "Kubernetes Container Ingress", detect: "[✓]", alert: "[✓]", remedy: "[—]", compliance: "[✓]" },
  { surface: "VPC Network & Security Gates", detect: "[✓]", alert: "[✓]", remedy: "[✓]", compliance: "[—]" },
  { surface: "Cloud Databases & KMS Secrets", detect: "[✓]", alert: "[✓]", remedy: "[—]", compliance: "[✓]" },
];

function CoverageMatrixTable() {
  return (
    <div className="w-full border border-zinc-800 bg-[#050505] rounded shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-[9px] md:text-[10px] select-none">
      <div className="flex justify-between items-center border-b border-zinc-800 p-3 text-[9px] text-zinc-500 bg-black">
        <span>CAPABILITY MATRIX</span>
        <span>COVERAGE EVALUATION</span>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-zinc-800 bg-black/40 text-[8px] text-zinc-500 tracking-wider">
              <th className="p-3">ATTACK SURFACE</th>
              <th className="p-3 text-center">DETECTION</th>
              <th className="p-3 text-center">ALERTING</th>
              <th className="p-3 text-center">REMEDIATION</th>
              <th className="p-3 text-center">COMPLIANCE</th>
            </tr>
          </thead>
          <tbody>
            {matrixData.map((row, idx) => (
              <tr key={idx} className="border-b border-zinc-900/60 hover:bg-zinc-950/80 transition-colors">
                <td className="p-3 text-zinc-300 font-bold">{row.surface}</td>
                <td className="p-3 text-center text-cyan-400 font-bold">{row.detect}</td>
                <td className="p-3 text-center text-cyan-400 font-bold">{row.alert}</td>
                <td className="p-3 text-center text-zinc-500">{row.remedy}</td>
                <td className="p-3 text-center text-cyan-400 font-bold">{row.compliance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 5: FAQS ACCORDION
// ==========================================
function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full flex flex-col border-t border-zinc-900">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border-b border-zinc-900 w-full backdrop-blur-md">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full py-5 flex justify-between items-center text-left gap-4 group focus:outline-none select-none"
            >
              <span className={`font-mono text-xs md:text-sm tracking-wide uppercase transition-colors duration-300 ${isOpen ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"}`}>
                {index + 1}. {faq.question}
              </span>
              <div className={`w-6 h-6 rounded flex items-center justify-center border border-zinc-800 transition-all duration-300 ${isOpen ? "bg-zinc-900 text-white" : "bg-black text-zinc-500 group-hover:text-zinc-300"}`}>
                {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
              </div>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "max-h-[250px] opacity-100 pb-5" : "max-h-0 opacity-0"}`}>
              <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed max-w-[850px] pl-5 border-l border-zinc-800">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export default function CloudSecurityPlatformPage({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Force dark theme on this page only
    document.documentElement.setAttribute("data-theme", "dark");

    const sections = ["hero", "section-a", "section-b", "section-c", "section-d"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-45% 0px -45% 0px", // Trigger when center of viewport crosses section
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const letters = [
    { label: "A", id: "section-a", desc: "Posture Audit & Configuration Drift" },
    { label: "B", id: "section-b", desc: "Identity Exposure & IAM" },
    { label: "C", id: "section-c", desc: "VPC & Container Boundaries" },
    { label: "D", id: "section-d", desc: "Real-time Alerts & Remediation Code" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#000000] text-[#FFFFFF] relative overflow-hidden select-none">
      {/* Subtle vertical aesthetic gridlines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-zinc-800" />
        <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-zinc-800" />
      </div>

      {/* FIXED SIDE LETTER NAVIGATION (Dot expanding to Letter on hover) */}
      <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 select-none">
        {letters.map((letter) => {
          const isActive = activeSection === letter.id;
          return (
            <a
              key={letter.label}
              href={`#${letter.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(letter.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-3 relative cursor-pointer"
            >
              {/* Dot / Letter indicator */}
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center border font-mono text-[9px] font-bold transition-all duration-300 ${
                  isActive 
                    ? "bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.4)]" 
                    : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-500 hover:text-white"
                }`}
              >
                {/* Normally show dot on mobile, expands on desktop */}
                <span className="hidden md:inline group-hover:scale-100">{letter.label}</span>
                <span className="inline md:hidden">{isActive ? letter.label : "•"}</span>
              </div>
              
              {/* Floating Tooltip Description */}
              <span className="absolute left-8 bg-zinc-950/90 border border-zinc-800 text-[8px] font-mono text-zinc-400 px-2.5 py-1 whitespace-nowrap opacity-0 pointer-events-none translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 rounded uppercase tracking-wider hidden md:inline">
                {letter.desc}
              </span>
            </a>
          );
        })}
      </div>

      {/* HERO SECTION */}
      <section 
        id="hero" 
        className="relative w-full h-[95vh] h-[95dvh] flex flex-col items-center justify-center px-6 text-center overflow-hidden border-b border-zinc-900 bg-gradient-to-b from-black via-black to-[#050505]"
      >
        <CloudHeroCanvas />
        
        <div className="relative z-10 flex flex-col items-center max-w-[1000px] gap-8">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-[9px] font-bold text-cyan-400 tracking-[0.3em] uppercase border border-cyan-500/25 bg-cyan-950/10 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.1)]"
          >
            ENTERPRISING SECURITY SYSTEMS // POSTURE ASSURANCES
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold uppercase tracking-tight leading-none text-white max-w-[850px]"
          >
            {"{"} CLOUD SECURITY {"}"}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-mono text-xs sm:text-sm md:text-base text-zinc-400 uppercase tracking-widest max-w-[680px]"
          >
            Continuous configuration audits. Posture management (CSPM). Runtime identity & perimeter threat defense.
          </motion.h2>

          {/* Minimalist Dashboard Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-3 gap-6 md:gap-12 max-w-[700px] w-full border-t border-b border-zinc-900 py-6 mt-6 text-left"
          >
            <div className="flex flex-col gap-1 pl-4 md:pl-8 border-l border-cyan-500/30">
              <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest leading-none">FOOTPRINT COVERAGE</span>
              <span className="font-mono text-xs md:text-[13px] font-bold text-zinc-100 mt-1">AWS • GCP • AZURE</span>
            </div>
            <div className="flex flex-col gap-1 pl-4 md:pl-8 border-l border-cyan-500/30">
              <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest leading-none">COMPLIANCE STATS</span>
              <span className="font-mono text-xs md:text-[13px] font-bold text-zinc-100 mt-1">CIS • SOC 2 • ISO</span>
            </div>
            <div className="flex flex-col gap-1 pl-4 md:pl-8 border-l border-cyan-500/30">
              <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest leading-none">TELEMETRY POLLING</span>
              <span className="font-mono text-xs md:text-[13px] font-bold text-cyan-400 mt-1">REAL-TIME</span>
            </div>
          </motion.div>

          {/* Call to Scroll Action */}
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            onClick={() => document.getElementById("section-a")?.scrollIntoView({ behavior: "smooth" })}
            className="cursor-pointer font-mono text-[9px] text-zinc-500 uppercase tracking-[0.25em] flex flex-col items-center gap-2 mt-8 hover:text-white transition-colors"
          >
            <span>DISCOVER PLATFORM APPARATUS</span>
            <div className="w-1 h-12 bg-zinc-900 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 bottom-0 left-0 right-0 bg-cyan-400"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.button>
        </div>
      </section>

      {/* SECTION A: POSTURE AUDITING & DRIFT */}
      <section 
        id="section-a" 
        className="w-full bg-[#000000] px-6 md:px-12 py-24 md:py-36 border-b border-zinc-950 relative"
      >
        <div className="max-w-[1250px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            <span className="font-mono text-[9px] font-bold text-cyan-400 tracking-[0.3em] uppercase">
              PHASE A // BASELINE CONTROL
            </span>
            <h2 className="font-mono text-3xl md:text-4xl font-bold uppercase tracking-tight text-white leading-[0.95]">
              Posture Audits & Configuration Drift
            </h2>
            <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed">
              Traditional cloud auditing is a point-in-time snapshot. Entersoft connect read-only IAM credentials to check configurations continuously against CIS Benchmarks, compliance controls, and trust criteria. When a developer changes a configuration, our system triggers immediately.
            </p>
            <div className="flex flex-col gap-2 font-mono text-[9.5px] text-zinc-500 mt-2">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>CONTINUOUS CIS BENCHMARK SCANNING</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>REAL-TIME CONFIGURATION DRIFT TRIGGERS</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>NO WRITE CONFIGURATION ACCESS REQUIRED</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 w-full">
            <DriftTerminal />
          </div>
        </div>
      </section>

      {/* SECTION B: IDENTITY EXPOSURE & IAM */}
      <section 
        id="section-b" 
        className="w-full bg-[#050505] px-6 md:px-12 py-24 md:py-36 border-b border-zinc-950 relative"
      >
        <div className="max-w-[1250px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1 w-full">
            <IAMAccessMap />
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-5 text-left">
            <span className="font-mono text-[9px] font-bold text-cyan-400 tracking-[0.3em] uppercase">
              PHASE B // IDENTITY SEGREGATION
            </span>
            <h2 className="font-mono text-3xl md:text-4xl font-bold uppercase tracking-tight text-white leading-[0.95]">
              Privilege Escalation & IAM Mapping
            </h2>
            <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed">
              Dormant API keys, multi-account trusts, and over-permissive role parameters represent massive breach vectors. We build graph topologies of your entire identity structure to identify access paths, audit trust chains, and ensure strict least-privilege configurations.
            </p>
            <div className="flex flex-col gap-2 font-mono text-[9.5px] text-zinc-500 mt-2">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>PRIVILEGE ESCALATION GRAPH RESOLUTION</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>DORMANT IDENTITIES & EXPIRED KEYS REMOVAL</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>CROSS-ACCOUNT TRUST RELATIONSHIP ANALYSIS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: CONTAINER & PERIMETER BOUNDARIES */}
      <section 
        id="section-c" 
        className="w-full bg-[#000000] px-6 md:px-12 py-24 md:py-36 border-b border-zinc-950 relative"
      >
        <div className="max-w-[1250px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            <span className="font-mono text-[9px] font-bold text-cyan-400 tracking-[0.3em] uppercase">
              PHASE C // BOUNDARY DIAGNOSTICS
            </span>
            <h2 className="font-mono text-3xl md:text-4xl font-bold uppercase tracking-tight text-white leading-[0.95]">
              VPC Networks & Container Shields
            </h2>
            <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed">
              Cloud networks are virtualized, elastic, and transient. We actively scan VPC boundaries, gateway permissions, load balancers, and Kubernetes container ingress routes. This guarantees that your internal microservices and databases remain strictly quarantined from public internet exposures.
            </p>
            <div className="flex flex-col gap-2 font-mono text-[9.5px] text-zinc-500 mt-2">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>VPC FLOW LOG INTEGRATION & THREAT AUDIT</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>KUBERNETES CONTAINER SHIELD POLICY AUDITS</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>INTERNET-EXPOSED PORT SCAN DIAGNOSTICS</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 w-full">
            <CoverageMatrixTable />
          </div>
        </div>
      </section>

      {/* SECTION D: THREAT ALERTS & REMEDIATION */}
      <section 
        id="section-d" 
        className="w-full bg-[#050505] px-6 md:px-12 py-24 md:py-36 border-b border-zinc-950 relative"
      >
        <div className="max-w-[1250px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1 w-full">
            <RemediationConsole />
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-5 text-left">
            <span className="font-mono text-[9px] font-bold text-cyan-400 tracking-[0.3em] uppercase">
              PHASE D // RESPONSE ENGINE
            </span>
            <h2 className="font-mono text-3xl md:text-4xl font-bold uppercase tracking-tight text-white leading-[0.95]">
              Real-Time Alerting & Remediation Code
            </h2>
            <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed">
              Detection is only half the battle. When a security threat or posture drift occurs, Entersoft routes real-time alerts to your security operations center (SOC). Simultaneously, we generate ready-to-run Infrastructure-as-Code (IaC) templates and Terraform patches so developers can remediate misconfigurations instantly.
            </p>
            <div className="flex flex-col gap-2 font-mono text-[9.5px] text-zinc-500 mt-2">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>TERRAFORM & CLOUDFORMATION HOTFIX CODE</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>IMMEDIATE SOC INTEGRATION (SLACK, SIEM, TEAMS)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>DEVELOPER TICKETING SYNC (JIRA, AZURE DEVOPS)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL BANNER */}
      <section className="w-full bg-black px-6 py-24 md:py-36 border-b border-zinc-900 text-center relative overflow-hidden select-none">
        <div className="max-w-[950px] mx-auto flex flex-col items-center gap-6 relative z-10">
          <Award className="w-8 h-8 text-cyan-400 opacity-60 mb-2" />
          <p className="font-mono italic text-lg sm:text-xl md:text-2xl text-zinc-200 tracking-tight leading-relaxed max-w-[850px]">
            &ldquo;In highly elastic, multi-cloud structures, infrastructure compliance is a moving target. Entersoft transformed our visibility from quarterly audits to continuous active posture validation, reducing configuration resolution times from weeks to under five minutes.&rdquo;
          </p>
          <span className="font-mono text-[9px] font-bold text-zinc-500 tracking-[0.2em] uppercase mt-4">
            CHIEF INFORMATION SECURITY OFFICER // FINANCIAL GATEWAY SERVICE
          </span>
        </div>
      </section>

      {/* DELIVERABLES & INTEGRATIONS */}
      <section className="w-full bg-[#050505] px-6 md:px-12 py-24 md:py-32 border-b border-zinc-900">
        <div className="max-w-[1250px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Deliverables */}
          <div className="flex flex-col gap-6 text-left">
            <div>
              <span className="font-mono text-[8px] font-bold text-cyan-400 tracking-widest uppercase">CSPM INVENTORY</span>
              <h3 className="font-mono text-xl md:text-2xl font-bold uppercase tracking-tight text-white mt-1">
                SYSTEM DELIVERABLES
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Posture Analytics Map", desc: "Live score assessment mapping configurations across cloud accounts." },
                { title: "IAM Privilege Graph", desc: "Interactive role policy evaluation paths and key risk zones." },
                { title: "CIS Compliance Reports", desc: "Audit logs mapped to CIS Benchmarks, SOC 2, HIPAA, PCI frameworks." },
                { title: "Hotfix Code Templates", desc: "Exportable Terraform and cloud template configurations." }
              ].map((d, index) => (
                <div key={index} className="p-4 border border-zinc-900 bg-black/40 rounded flex flex-col gap-1.5">
                  <span className="font-mono text-[9.5px] font-bold text-zinc-100 uppercase">{d.title}</span>
                  <span className="font-sans text-[11px] text-zinc-400 leading-normal">{d.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Integrations */}
          <div className="flex flex-col gap-6 text-left">
            <div>
              <span className="font-mono text-[8px] font-bold text-cyan-400 tracking-widest uppercase">INFRASTRUCTURE SUPPORT</span>
              <h3 className="font-mono text-xl md:text-2xl font-bold uppercase tracking-tight text-white mt-1">
                CONNECTED CLOUD PLATFORMS
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "AWS", type: "Security Hub / IAM" },
                { name: "AZURE", type: "Microsoft Defender" },
                { name: "GCP", type: "Security Command" },
                { name: "KUBERNETES", type: "Container Policy" },
                { name: "TERRAFORM", type: "Remediation IaC" },
                { name: "SLACK", type: "Incident Alerts" },
                { name: "JIRA", type: "Ticketing Gate" },
                { name: "SPLUNK", type: "SIEM Correlation" }
              ].map((i, index) => (
                <div key={index} className="p-3 border border-zinc-900 bg-black/40 rounded flex flex-col items-center justify-center text-center gap-1">
                  <span className="font-mono text-[10px] font-bold text-cyan-400">{i.name}</span>
                  <span className="font-mono text-[7px] text-zinc-500 uppercase tracking-wider">{i.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="w-full bg-[#000000] px-6 md:px-12 py-24 md:py-32 border-b border-zinc-900">
        <div className="max-w-[1000px] mx-auto flex flex-col gap-10">
          <div className="text-center">
            <span className="font-mono text-[9px] font-bold text-cyan-400 tracking-[0.25em] uppercase">
              FAQ MATRIX // SECURITY DOCUMENTATION
            </span>
            <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-white mt-1">
              Common Audit Questions
            </h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="w-full bg-black px-6 py-28 md:py-36 text-center relative select-none">
        <div className="absolute inset-0 bg-radial-gradient bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.012)_0%,transparent_75%)] pointer-events-none" />
        <div className="max-w-[800px] mx-auto flex flex-col items-center gap-8 relative z-10">
          <span className="font-mono text-[9px] font-bold text-cyan-400 tracking-[0.3em] uppercase">
            CONNECT WITH ENTERSOFT CYBER ENGINEERS
          </span>
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white max-w-[700px]">
            Accelerate Cloud Security, Resolve Drift Instantly.
          </h2>
          <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed max-w-[550px] -mt-2">
            Establish continuous posture protection on AWS, Azure, and Google Cloud in under 30 minutes without exposing write access to your production accounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <MagneticButton>
              <Link
                href="/contact"
                className="cursor-pointer inline-flex items-center justify-center font-mono text-[10px] font-bold uppercase tracking-widest px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black transition-colors rounded-[2px]"
              >
                REQUEST TELEMETRY ASSESSMENT
              </Link>
            </MagneticButton>
            <Link
              href="/contact"
              className="cursor-pointer inline-flex items-center justify-center font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors px-6 py-4"
            >
              Explore Pricing <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
