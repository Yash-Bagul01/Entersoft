"use client";

import React from "react";

interface DeliveryModelBadgeProps {
  label: string;
  type?: 'fixed' | 'ongoing' | 'managed' | 'hybrid' | 'platform';
  className?: string;
}

export default function DeliveryModelBadge({
  label,
  type = 'fixed',
  className = '',
}: DeliveryModelBadgeProps) {
  let dotColor = "bg-sky-400";
  let borderColor = "border-sky-500/30";
  let textColor = "text-sky-300";
  let bg = "bg-sky-500/10";

  if (type === 'ongoing' || type === 'platform') {
    dotColor = "bg-emerald-400";
    borderColor = "border-emerald-500/30";
    textColor = "text-emerald-300";
    bg = "bg-emerald-500/10";
  } else if (type === 'managed') {
    dotColor = "bg-purple-400";
    borderColor = "border-purple-500/30";
    textColor = "text-purple-300";
    bg = "bg-purple-500/10";
  } else if (type === 'hybrid') {
    dotColor = "bg-amber-400";
    borderColor = "border-amber-500/30";
    textColor = "text-amber-300";
    bg = "bg-amber-500/10";
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-[3px] border font-mono text-[10px] md:text-[11px] font-bold tracking-wider uppercase select-none ${bg} ${borderColor} ${textColor} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      <span>{label}</span>
    </div>
  );
}
