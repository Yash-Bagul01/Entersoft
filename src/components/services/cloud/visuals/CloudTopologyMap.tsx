"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, stagger, createTimeline } from "animejs";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "hub" | "resource" | "central";
  cluster: "aws" | "azure" | "gcp" | "entersoft";
}

interface Edge {
  from: string;
  to: string;
  id: string;
}

export default function CloudTopologyMap({ ambient = false }: { ambient?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isReduced = useReducedMotion();
  const lenis = useSmoothScroll();

  // Nodes Coordinates
  const nodes: Node[] = [
    // Central Node
    { id: "central", label: "ENTERSOFT CSPM", x: 220, y: 140, type: "central", cluster: "entersoft" },
    
    // AWS Cluster (Left)
    { id: "aws_hub", label: "AWS GATEWAY", x: 80, y: 100, type: "hub", cluster: "aws" },
    { id: "aws_ec2", label: "EC2 INSTANCE", x: 30, y: 50, type: "resource", cluster: "aws" },
    { id: "aws_s3", label: "S3 BUCKET", x: 40, y: 150, type: "resource", cluster: "aws" },
    { id: "aws_rds", label: "RDS DATA", x: 100, y: 40, type: "resource", cluster: "aws" },
    { id: "aws_iam", label: "IAM PROFILE", x: 120, y: 160, type: "resource", cluster: "aws" },
    
    // Azure Cluster (Top/Center)
    { id: "az_hub", label: "AZURE HUB", x: 220, y: 50, type: "hub", cluster: "azure" },
    { id: "az_vm", label: "VM SHIELD", x: 160, y: 20, type: "resource", cluster: "azure" },
    { id: "az_blob", label: "BLOB STORAGE", x: 280, y: 20, type: "resource", cluster: "azure" },
    { id: "az_entra", label: "ENTRA ID", x: 210, y: 15, type: "resource", cluster: "azure" },

    // GCP Cluster (Right)
    { id: "gcp_hub", label: "GCP EDGE", x: 360, y: 110, type: "hub", cluster: "gcp" },
    { id: "gcp_gce", label: "COMPUTE ENG", x: 420, y: 60, type: "resource", cluster: "gcp" },
    { id: "gcp_gcs", label: "CLOUD STORAGE", x: 430, y: 150, type: "resource", cluster: "gcp" },
    { id: "gcp_sql", label: "CLOUD SQL", x: 380, y: 45, type: "resource", cluster: "gcp" },
    { id: "gcp_iam", label: "IAM WORKSPACE", x: 320, y: 170, type: "resource", cluster: "gcp" },
  ];

  // Connections
  const edges: Edge[] = [
    // Central Hub Links
    { from: "central", to: "aws_hub", id: "edge_c_aws" },
    { from: "central", to: "az_hub", id: "edge_c_az" },
    { from: "central", to: "gcp_hub", id: "edge_c_gcp" },

    // AWS Resource Links
    { from: "aws_hub", to: "aws_ec2", id: "edge_aws_ec2" },
    { from: "aws_hub", to: "aws_s3", id: "edge_aws_s3" },
    { from: "aws_hub", to: "aws_rds", id: "edge_aws_rds" },
    { from: "aws_hub", to: "aws_iam", id: "edge_aws_iam" },

    // Azure Resource Links
    { from: "az_hub", to: "az_vm", id: "edge_az_vm" },
    { from: "az_hub", to: "az_blob", id: "edge_az_blob" },
    { from: "az_hub", to: "az_entra", id: "edge_az_entra" },

    // GCP Resource Links
    { from: "gcp_hub", to: "gcp_gce", id: "edge_gcp_gce" },
    { from: "gcp_hub", to: "gcp_gcs", id: "edge_gcp_gcs" },
    { from: "gcp_hub", to: "gcp_sql", id: "edge_gcp_sql" },
    { from: "gcp_hub", to: "gcp_iam", id: "edge_gcp_iam" },

    // Inter-cloud Federation
    { from: "aws_hub", to: "gcp_hub", id: "edge_aws_gcp" },
  ];

  // Traveling Dot State
  const [activePulse, setActivePulse] = useState<{ fromX: number; fromY: number; toX: number; toY: number } | null>(null);

  // Scroll Velocity Skew effect using Lenis + GSAP
  useEffect(() => {
    if (isReduced || !lenis || !containerRef.current) return;
    const target = containerRef.current;
    
    // Quick setter for skewY
    const skewSetter = gsap.quickTo(target, "skewY", { duration: 0.35, ease: "power3.out" });

    const handleScroll = (e: any) => {
      const velocity = e.velocity ?? 0;
      // Cap at 2deg
      const skew = gsap.utils.clamp(-2, 2, velocity * 0.045);
      skewSetter(skew);
    };

    lenis.on("scroll", handleScroll);
    return () => {
      lenis.off("scroll", handleScroll);
      gsap.set(target, { skewY: 0 });
    };
  }, [lenis, isReduced]);

  // Animation sequence on load or scroll trigger
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    if (isReduced) {
      // Set instantly to final state
      gsap.set(".topo-line", { strokeDashoffset: 0 });
      gsap.set(".topo-node", { scale: 1, opacity: 1 });
      gsap.set(".central-glow", { opacity: 0.3 });
      return;
    }

    // Set initial dasharray & offset for lines
    const lines = svg.querySelectorAll(".topo-line");
    lines.forEach((line: any) => {
      const len = line.getTotalLength ? line.getTotalLength() : 150;
      line.setAttribute("stroke-dasharray", len);
      line.setAttribute("stroke-dashoffset", len);
    });

    // Create the Anime.js v4 timeline
    const tl = createTimeline();

    // Step 1: Draw connecting lines
    tl.add(".topo-line", {
      strokeDashoffset: 0,
      duration: 1400,
      delay: stagger(60),
      ease: "outQuad",
    })

    // Step 2: Fade & Scale nodes
    .add(".topo-node", {
      scale: [0.6, 1],
      opacity: [0, 1],
      duration: 700,
      delay: stagger(30),
      ease: "outQuad",
    }, "-=1000")

    // Step 3: Flash Central Ring
    .add(".central-glow", {
      opacity: [0, 0.45],
      scale: [0.8, 1],
      duration: 600,
      ease: "outQuad",
    }, "-=400");

  }, [isReduced]);

  // Traveling Dot Idle State Loop
  useEffect(() => {
    if (isReduced || ambient) return;

    let active = true;
    const triggerPulse = async () => {
      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      
      while (active) {
        // Pick a random edge
        const randomEdge = edges[Math.floor(Math.random() * edges.length)];
        const fromNode = nodes.find((n) => n.id === randomEdge.from);
        const toNode = nodes.find((n) => n.id === randomEdge.to);

        if (fromNode && toNode) {
          setActivePulse({
            fromX: fromNode.x,
            fromY: fromNode.y,
            toX: toNode.x,
            toY: toNode.y,
          });

          // Run pulse translation
          await delay(2000);
        }

        // Wait between pulses
        await delay(1500 + Math.random() * 2000);
      }
    };

    // Delay start of pulse
    const startTimeout = setTimeout(triggerPulse, 2500);

    return () => {
      active = false;
      clearTimeout(startTimeout);
    };
  }, [isReduced, ambient]);

  return (
    <div 
      ref={containerRef}
      className={`w-full max-w-[550px] aspect-[4/3] mx-auto select-none relative bg-black/35 border border-zinc-900/60 rounded p-4 backdrop-blur-md transition-all duration-300 ${
        ambient ? "opacity-15 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute top-2 left-3 font-mono text-[8px] text-zinc-600 tracking-wider">
        MAP MODEL: MULTI-CLOUD DEPLOYMENT
      </div>

      <svg 
        ref={svgRef}
        viewBox="0 0 460 200" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection Lines (Edges) */}
        {edges.map((edge) => {
          const fromNode = nodes.find((n) => n.id === edge.from);
          const toNode = nodes.find((n) => n.id === edge.to);
          if (!fromNode || !toNode) return null;

          const isFederated = edge.id === "edge_aws_gcp";
          return (
            <line
              key={edge.id}
              className="topo-line"
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={isFederated ? "rgba(6, 182, 212, 0.25)" : "rgba(255, 255, 255, 0.08)"}
              strokeWidth={isFederated ? "1.25" : "0.9"}
              strokeDasharray={isFederated ? "3 3" : undefined}
            />
          );
        })}

        {/* Traveling Dot Pulse (Anime.js/React driven) */}
        {activePulse && !isReduced && (
          <motion.circle
            initial={{ cx: activePulse.fromX, cy: activePulse.fromY, r: 2.5, fill: "rgba(6, 182, 212, 0.85)" }}
            animate={{ cx: activePulse.toX, cy: activePulse.toY }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 4px rgba(6, 182, 212, 0.8))" }}
          />
        )}

        {/* Node Groups */}
        {nodes.map((node) => {
          const isCentral = node.type === "central";
          const isHub = node.type === "hub";

          // Node styling logic
          let nodeRadius = 3;
          let nodeColor = "rgba(100, 100, 100, 0.8)";
          let labelColor = "text-[7px] fill-zinc-500 font-mono";

          if (isCentral) {
            nodeRadius = 6;
            nodeColor = "rgba(6, 182, 212, 1)";
            labelColor = "text-[8px] fill-white font-mono font-bold";
          } else if (isHub) {
            nodeRadius = 4.5;
            nodeColor = "rgba(255, 255, 255, 0.9)";
            labelColor = "text-[7px] fill-zinc-300 font-mono font-semibold";
          }

          return (
            <g 
              key={node.id} 
              className="topo-node cursor-pointer"
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              {/* Central Glowing Radar rings */}
              {isCentral && (
                <>
                  <circle
                    className="central-glow"
                    cx={node.x}
                    cy={node.y}
                    r="15"
                    fill="transparent"
                    stroke="rgba(6, 182, 212, 0.3)"
                    strokeWidth="0.5"
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="22"
                    fill="transparent"
                    stroke="rgba(6, 182, 212, 0.15)"
                    strokeWidth="0.5"
                    animate={isReduced ? {} : { scale: [0.8, 1.2], opacity: [0.7, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                </>
              )}

              {/* Core Node Circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeRadius}
                fill={nodeColor}
                className="transition-all duration-300"
              />

              {/* Node Labels */}
              <text
                x={node.x}
                y={node.y - (nodeRadius + 4)}
                textAnchor="middle"
                className={`${labelColor} select-none pointer-events-none tracking-wider`}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Mobile cluster reduction info */}
      <div className="absolute bottom-2 right-3 font-mono text-[7px] text-zinc-600 md:hidden">
        + GCP & Hybrid Cluster details verified via CLI
      </div>
    </div>
  );
}
