"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MatrixRow {
  framework: string;
  coverage: boolean[]; // matches columns
}

export default function ComplianceMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const isReduced = useReducedMotion();

  const columns = [
    "Continuous Monitoring",
    "Alert on Drift",
    "Remediation Guidance",
    "Audit-Ready Report",
    "Evidence Package"
  ];

  const rows: MatrixRow[] = [
    { framework: "ISO 27001", coverage: [true, true, true, true, true] },
    { framework: "CIS Benchmarks (AWS/Azure/GCP)", coverage: [true, true, true, true, true] },
    { framework: "GDPR Controls", coverage: [true, true, false, true, true] },
    { framework: "CERT-In Compliance", coverage: [true, true, true, true, false] },
    { framework: "RBI Guidelines", coverage: [true, true, true, true, true] },
  ];

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-[860px] mx-auto select-none bg-black/35 border border-zinc-900/60 rounded p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden font-mono"
    >
      <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4 text-[9px] text-zinc-500 bg-black/10 px-2 rounded-t">
        <span>SECURITY COMPLIANCE AUDITING SCHEME</span>
        <span>CONTINUOUS COMPLIANCE MATRIX</span>
      </div>

      <div className="w-full overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[650px] text-[10px]">
          <thead>
            <tr className="border-b border-zinc-800 text-[8.5px] text-zinc-500 tracking-wider">
              <th className="py-3 px-4 font-bold">FRAMEWORK</th>
              {columns.map((col, idx) => (
                <th key={idx} className="py-3 px-2 text-center font-bold">{col.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <motion.tr 
                key={row.framework} 
                initial={isReduced ? {} : { opacity: 0, y: 12 }}
                animate={isReduced ? {} : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: rIdx * 0.08, ease: "easeOut" }}
                className="border-b border-zinc-900/60 hover:bg-zinc-950/60 transition-colors"
              >
                <td className="py-4 px-4 text-zinc-300 font-bold tracking-wide">{row.framework}</td>
                {row.coverage.map((covered, cIdx) => (
                  <td key={cIdx} className="py-4 px-2 text-center">
                    <div className="flex items-center justify-center h-4">
                      {covered ? (
                        <motion.div
                          initial={isReduced ? {} : { scale: 0 }}
                          animate={isReduced ? {} : isInView ? { scale: 1 } : { scale: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 260, 
                            damping: 20, 
                            delay: rIdx * 0.08 + cIdx * 0.04 
                          }}
                          className="w-3.5 h-3.5 rounded-full bg-cyan-400 border border-cyan-500/35 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                        />
                      ) : (
                        <span className="text-zinc-600 font-bold">—</span>
                      )}
                    </div>
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 text-center text-[9.5px] text-zinc-500 font-mono select-none">
        Coverage verified against live cloud configuration, not point-in-time snapshots.
      </div>
    </div>
  );
}
