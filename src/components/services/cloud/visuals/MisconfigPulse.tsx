"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ArchitectureNode {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMisconfigured: boolean;
  issue?: string;
}

export default function MisconfigPulse() {
  const containerRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<SVGLineElement>(null);
  const isReduced = useReducedMotion();
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  const [activeStage, setActiveStage] = useState<"idle" | "scanning" | "found">("idle");
  const [flaggedIds, setFlaggedIds] = useState<string[]>([]);

  const nodes: ArchitectureNode[] = [
    { id: "ec2", label: "EC2 INSTANCE", x: 40, y: 35, width: 85, height: 40, isMisconfigured: false },
    { id: "s3", label: "S3 BUCKET", x: 185, y: 35, width: 85, height: 40, isMisconfigured: true, issue: "PUBLIC_READ" },
    { id: "sec_group", label: "SEC GROUP", x: 330, y: 35, width: 85, height: 40, isMisconfigured: true, issue: "EXPOSED_22" },
    { id: "rds", label: "RDS DB", x: 110, y: 110, width: 85, height: 40, isMisconfigured: true, issue: "UNENCRYPTED" },
    { id: "kms", label: "KMS KEY", x: 260, y: 110, width: 85, height: 40, isMisconfigured: true, issue: "EXPOSED" },
  ];

  const connections = [
    { from: "ec2", to: "rds" },
    { from: "ec2", to: "sec_group" },
    { from: "s3", to: "kms" },
    { from: "rds", to: "kms" },
  ];

  useEffect(() => {
    if (isReduced) {
      setActiveStage("found");
      setFlaggedIds(nodes.filter(n => n.isMisconfigured).map(n => n.id));
      return;
    }

    if (!isInView) {
      setActiveStage("idle");
      setFlaggedIds([]);
      return;
    }

    let active = true;

    const runSequence = () => {
      if (!active) return;
      
      setActiveStage("scanning");
      setFlaggedIds([]);

      const laser = laserRef.current;
      if (!laser) return;

      // Laser scanning timeline
      const tl = gsap.timeline({
        onComplete: () => {
          if (active) {
            setActiveStage("found");
            // Set all misconfigs flagged
            setFlaggedIds(nodes.filter(n => n.isMisconfigured).map(n => n.id));
          }
        }
      });

      // Animate sweep
      tl.fromTo(laser, 
        { y: 5 }, 
        { y: 185, ease: "none", duration: 1.6 }
      );

      // Stagger node activation as laser passes them
      nodes.forEach(node => {
        const passY = node.y + (node.height / 2);
        const durationRatio = passY / 200; // rough percentage of laser height
        
        if (node.isMisconfigured) {
          gsap.delayedCall(1.6 * durationRatio, () => {
            if (active) {
              setFlaggedIds(prev => [...prev, node.id]);
            }
          });
        }
      });
    };

    runSequence();

    return () => {
      active = false;
    };
  }, [isInView, isReduced]);

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-[550px] aspect-[4/3] mx-auto select-none bg-black/35 border border-zinc-900/60 rounded p-5 flex flex-col justify-between font-mono text-[9px] md:text-xs relative shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
    >
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-3 text-[9px] text-zinc-600">
        <span>ARCHITECTURAL MISCONFIGURATION SCAN</span>
        <span className={activeStage === "found" ? "text-cyan-400 font-bold" : "text-zinc-500"}>
          {activeStage === "scanning" ? "SWEEPING ENDPOINTS..." : activeStage === "found" ? "SCAN COMPLETED" : "STANDBY"}
        </span>
      </div>

      <div className="relative flex-1 bg-black/40 border border-zinc-900 rounded p-4 flex items-center justify-center">
        <svg viewBox="0 0 460 190" className="w-full h-full">
          {/* Node Connections */}
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const fromCenterX = fromNode.x + (fromNode.width / 2);
            const fromCenterY = fromNode.y + (fromNode.height / 2);
            const toCenterX = toNode.x + (toNode.width / 2);
            const toCenterY = toNode.y + (toNode.height / 2);

            return (
              <line
                key={idx}
                x1={fromCenterX}
                y1={fromCenterY}
                x2={toCenterX}
                y2={toCenterY}
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="1.25"
              />
            );
          })}

          {/* Laser scanning line */}
          {activeStage === "scanning" && (
            <line
              ref={laserRef}
              x1="5"
              y1="0"
              x2="455"
              y2="0"
              stroke="rgba(6, 182, 212, 0.95)"
              strokeWidth="2"
              style={{ filter: "drop-shadow(0 0 5px rgba(6, 182, 212, 0.8))" }}
            />
          )}

          {/* Cloud Nodes */}
          {nodes.map(node => {
            const isFlagged = flaggedIds.includes(node.id);
            const isVulnerable = node.isMisconfigured;
            
            let rectStroke = "rgba(255,255,255,0.06)";
            let rectFill = "rgba(5, 5, 5, 0.4)";
            let textColor = "fill-zinc-500 font-mono";

            if (isFlagged && isVulnerable) {
              rectStroke = "rgba(6, 182, 212, 0.8)";
              rectFill = "rgba(6, 182, 212, 0.05)";
              textColor = "fill-cyan-400 font-bold font-mono";
            } else if (activeStage === "found" && !isVulnerable) {
              rectStroke = "rgba(255, 255, 255, 0.25)";
              rectFill = "rgba(10, 10, 10, 0.6)";
              textColor = "fill-zinc-300 font-mono";
            }

            return (
              <g key={node.id} className="transition-all duration-300">
                {/* Node Box */}
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.width}
                  height={node.height}
                  rx="3"
                  ry="3"
                  fill={rectFill}
                  stroke={rectStroke}
                  strokeWidth="1.25"
                  className="transition-colors duration-300"
                />

                {/* Node Label */}
                <text
                  x={node.x + (node.width / 2)}
                  y={node.y + (node.height / 2) + 3}
                  textAnchor="middle"
                  className={`${textColor} text-[8px] select-none pointer-events-none tracking-wider`}
                >
                  {node.label}
                </text>

                {/* Danger Banner Warning Tag */}
                {isFlagged && isVulnerable && node.issue && (
                  <g>
                    {/* Small bracket label pointing to issues */}
                    <rect
                      x={node.x}
                      y={node.y - 12}
                      width={node.width}
                      height={10}
                      fill="rgba(6, 182, 212, 0.15)"
                      stroke="rgba(6, 182, 212, 0.4)"
                      strokeWidth="0.5"
                      rx="1"
                    />
                    <text
                      x={node.x + (node.width / 2)}
                      y={node.y - 5}
                      textAnchor="middle"
                      className="fill-cyan-400 font-bold text-[6.5px] font-mono select-none pointer-events-none tracking-widest"
                    >
                      {node.issue}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex justify-between items-center text-[8px] text-zinc-600 select-none">
        <span>EXPOSURES LOCATED: {flaggedIds.length} / 5 SCAN POINTS</span>
        <span>AUDIT DRIFT LOG: PENDING INTEGRATION</span>
      </div>
    </div>
  );
}
