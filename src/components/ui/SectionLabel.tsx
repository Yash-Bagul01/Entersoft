import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  color?: "accent" | "secondary" | "tertiary";
}

export default function SectionLabel({
  children,
  className,
  color = "accent",
}: SectionLabelProps) {
  const colorClasses = {
    accent: "text-[var(--accent)]",
    secondary: "text-[var(--text-secondary)]",
    tertiary: "text-[var(--text-tertiary)]",
  };

  return (
    <span
      className={cn(
        "font-mono text-[11px] font-bold uppercase tracking-[0.14em] block mb-3 md:mb-4",
        colorClasses[color],
        className
      )}
    >
      {"// "}{children}
    </span>
  );
}
