"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface IAMNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "root" | "role" | "permission";
  isExcess: boolean;
  parentId: string;
}

export default function IAMTree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const isReduced = useReducedMotion();

  const [activeStage, setActiveStage] = useState<"idle" | "audited" | "pruned">("idle");

  // Dynamic downstream permissions layout: 4 Admin, 6 Dev, 8 Service = 18 total.
  const nodes: IAMNode[] = [
    // Level 0 (Root)
    { id: "root", label: "ROOT ACCOUNT", x: 230, y: 15, type: "root", isExcess: false, parentId: "" },

    // Level 1 (Roles)
    { id: "admin_role", label: "ADMIN ROLE", x: 80, y: 65, type: "role", isExcess: false, parentId: "root" },
    { id: "dev_role", label: "DEV ROLE", x: 230, y: 65, type: "role", isExcess: false, parentId: "root" },
    { id: "svc_role", label: "SVC ACCOUNT", x: 380, y: 65, type: "role", isExcess: false, parentId: "root" },

    // Level 2 (Permissions - Admin)
    { id: "adm_p1", label: "S3_READ", x: 30, y: 120, type: "permission", isExcess: false, parentId: "admin_role" },
    { id: "adm_p2", label: "KMS_ALL", x: 63, y: 120, type: "permission", isExcess: true, parentId: "admin_role" },
    { id: "adm_p3", label: "EC2_CREATE", x: 96, y: 120, type: "permission", isExcess: false, parentId: "admin_role" },
    { id: "adm_p4", label: "IAM_ADMIN", x: 130, y: 120, type: "permission", isExcess: true, parentId: "admin_role" },

    // Level 2 (Permissions - Dev)
    { id: "dev_p1", label: "RDS_READ", x: 160, y: 120, type: "permission", isExcess: false, parentId: "dev_role" },
    { id: "dev_p2", label: "S3_WRITE", x: 188, y: 120, type: "permission", isExcess: true, parentId: "dev_role" },
    { id: "dev_p3", label: "EC2_DELETE", x: 216, y: 120, type: "permission", isExcess: true, parentId: "dev_role" },
    { id: "dev_p4", label: "LAMBDA_ALL", x: 244, y: 120, type: "permission", isExcess: false, parentId: "dev_role" },
    { id: "dev_p5", label: "VPC_EDIT", x: 272, y: 120, type: "permission", isExcess: true, parentId: "dev_role" },
    { id: "dev_p6", label: "SQS_SEND", x: 300, y: 120, type: "permission", isExcess: false, parentId: "dev_role" },

    // Level 2 (Permissions - Service Account)
    { id: "svc_p1", label: "SNS_PUB", x: 330, y: 120, type: "permission", isExcess: true, parentId: "svc_role" },
    { id: "svc_p2", label: "DYNAMO_ALL", x: 345, y: 120, type: "permission", isExcess: true, parentId: "svc_role" },
    { id: "svc_p3", label: "SES_SEND", x: 360, y: 120, type: "permission", isExcess: false, parentId: "svc_role" },
    { id: "svc_p4", label: "IAM_PASS", x: 375, y: 120, type: "permission", isExcess: true, parentId: "svc_role" },
    { id: "svc_p5", label: "COGNITO_ALL", x: 390, y: 120, type: "permission", isExcess: true, parentId: "svc_role" },
    { id: "svc_p6", label: "ROUTE53_EDIT", x: 405, y: 120, type: "permission", isExcess: true, parentId: "svc_role" },
    { id: "svc_p7", label: "CLOUDTRAIL", x: 420, y: 120, type: "permission", isExcess: true, parentId: "svc_role" },
    { id: "svc_p8", label: "EKS_READ", x: 435, y: 120, type: "permission", isExcess: false, parentId: "svc_role" },
  ];

  useEffect(() => {
    if (isReduced) {
      setActiveStage("pruned");
      return;
    }

    if (!isInView) {
      setActiveStage("idle");
      return;
    }

    let active = true;

    const runSequence = async () => {
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      // Step 1: Draw connections top down (GSAP-like Anime sequence)
      if (!active) return;
      setActiveStage("idle");
      
      // Set initial dasharray/offset for iam-line elements
      const svg = containerRef.current?.querySelector("svg");
      if (svg) {
        const iamLines = svg.querySelectorAll(".iam-line");
        iamLines.forEach((line: any) => {
          const len = line.getTotalLength ? line.getTotalLength() : 100;
          line.setAttribute("stroke-dasharray", len);
          line.setAttribute("stroke-dashoffset", len);
        });
      }

      // Set lines drawing animation
      animate(".iam-line", {
        strokeDashoffset: 0,
        duration: 1000,
        delay: stagger(50),
        ease: "outQuad",
      });

      animate(".iam-node-dot", {
        scale: [0.5, 1],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(25),
        ease: "outQuad",
      });

      await delay(1200);

      // Step 2: Audit checks flash & highlight excess nodes
      if (!active) return;
      setActiveStage("audited");
      
      animate(".iam-node-dot.excess-node", {
        scale: [1, 1.25, 1],
        borderColor: ["rgba(255,255,255,0.06)", "rgba(6, 182, 212, 1)"],
        duration: 800,
        delay: stagger(80),
        ease: "inOutSine",
      });

      await delay(2200);

      // Step 3: Prune excess nodes
      if (!active) return;
      setActiveStage("pruned");

      animate(".iam-node-group.excess-group", {
        scale: 0,
        opacity: 0,
        duration: 700,
        delay: stagger(40),
        ease: "inBack",
      });

      animate(".iam-line.excess-edge", {
        opacity: 0.05,
        duration: 700,
        delay: stagger(40),
        ease: "inQuad",
      });

      // Stagger slight scale up on remaining nodes
      animate(".iam-node-group.secure-group", {
        scale: [1, 1.08, 1],
        duration: 600,
        delay: stagger(40),
        ease: "outElastic(1, .8)",
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
      className="w-full max-w-[700px] aspect-[16/7] mx-auto select-none bg-black/35 border border-zinc-900/60 rounded p-5 flex flex-col justify-between font-mono text-[9px] md:text-xs relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
    >
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-3 text-[9px] text-zinc-600">
        <span>IAM ENTITY ACCESSIBILITY TREE</span>
        <span className={activeStage === "pruned" ? "text-cyan-400 font-bold" : "text-zinc-500"}>
          {activeStage === "idle" ? "AUDITING TRUST MAP..." : activeStage === "audited" ? "OVER-PRIVILEGED DETECTED" : "LEAST-PRIVILEGE ENFORCED"}
        </span>
      </div>

      <div className="relative flex-1 bg-black/40 border border-zinc-900 rounded p-3 flex items-center justify-center">
        <svg viewBox="0 0 460 145" className="w-full h-full">
          {/* Node Connections */}
          {nodes.map(node => {
            if (!node.parentId) return null;
            const parent = nodes.find(n => n.id === node.parentId);
            if (!parent) return null;

            const isExcessEdge = node.isExcess;

            return (
              <line
                key={`edge_${node.id}`}
                className={`iam-line ${isExcessEdge ? "excess-edge" : "secure-edge"}`}
                x1={parent.x}
                y1={parent.y}
                x2={node.x}
                y2={node.y}
                stroke={isExcessEdge ? "rgba(6, 182, 212, 0.45)" : "rgba(255, 255, 255, 0.12)"}
                strokeWidth={isExcessEdge ? "1" : "0.75"}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const isRoot = node.type === "root";
            const isRole = node.type === "role";

            // Visual parameters
            let nodeRadius = 3;
            let nodeFill = "rgba(10,10,10,0.8)";
            let nodeStroke = "rgba(255, 255, 255, 0.08)";

            if (isRoot) {
              nodeRadius = 5.5;
              nodeFill = "rgba(255,255,255,0.9)";
              nodeStroke = "rgba(255,255,255,0.9)";
            } else if (isRole) {
              nodeRadius = 4.5;
              nodeFill = "rgba(30, 30, 30, 0.8)";
              nodeStroke = "rgba(255, 255, 255, 0.35)";
            } else if (node.isExcess) {
              if (activeStage === "audited") {
                nodeFill = "rgba(6, 182, 212, 0.25)";
                nodeStroke = "rgba(6, 182, 212, 1)";
              }
            } else {
              if (activeStage === "pruned") {
                nodeStroke = "rgba(255, 255, 255, 0.8)";
                nodeFill = "rgba(25, 25, 25, 0.9)";
              }
            }

            return (
              <g 
                key={node.id} 
                className={`iam-node-group ${node.isExcess ? "excess-group" : "secure-group"}`}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                {/* Node Dot */}
                <circle
                  className="iam-node-dot"
                  cx={node.x}
                  cy={node.y}
                  r={nodeRadius}
                  fill={nodeFill}
                  stroke={nodeStroke}
                  strokeWidth="1"
                />

                {/* Node labels for level 0 and 1 */}
                {(isRoot || isRole) && (
                  <text
                    x={node.x}
                    y={node.y - (nodeRadius + 4)}
                    textAnchor="middle"
                    className="fill-zinc-300 text-[6.5px] font-mono font-bold select-none pointer-events-none tracking-wider"
                  >
                    {node.label}
                  </text>
                )}

                {/* Small indicator label for permissions */}
                {!isRoot && !isRole && (
                  <text
                    x={node.x}
                    y={node.y + 11}
                    textAnchor="middle"
                    className={`text-[5px] font-mono select-none pointer-events-none transition-colors duration-300 ${
                      node.isExcess 
                        ? activeStage === "audited" 
                          ? "fill-cyan-400 font-bold" 
                          : "fill-zinc-600"
                        : activeStage === "pruned"
                        ? "fill-zinc-300 font-bold"
                        : "fill-zinc-500"
                    }`}
                  >
                    {node.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex justify-between items-center text-[8px] text-zinc-600 select-none">
        <span>PRUNING OUTCOME: {activeStage === "pruned" ? "11 excess credentials pruned" : "Analyzing privilege boundaries..."}</span>
        <span>AUDIT RATIO: 18 permission branches checked</span>
      </div>
    </div>
  );
}
