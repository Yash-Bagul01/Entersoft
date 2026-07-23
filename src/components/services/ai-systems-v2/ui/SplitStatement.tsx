"use client";

import React from "react";
import WordReveal from "./WordReveal";

interface LineItem {
  text: string;
  weight?: "dim" | "bright" | "dimmer";
  className?: string;
  delay?: number;
}

interface SplitStatementProps {
  lines: LineItem[];
  className?: string;
}

export default function SplitStatement({ lines, className = "" }: SplitStatementProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {lines.map((line, idx) => {
        const weightClass =
          line.weight === "bright"
            ? "text-[var(--fg)] font-bold tracking-tight"
            : line.weight === "dimmer"
            ? "text-[var(--fg-dimmer)] font-medium"
            : "text-[var(--fg-dim)] font-semibold";

        return (
          <div key={idx} className={`w-full ${line.className || ""} ${weightClass}`}>
            <WordReveal text={line.text} delay={line.delay ?? idx * 0.2} />
          </div>
        );
      })}
    </div>
  );
}
