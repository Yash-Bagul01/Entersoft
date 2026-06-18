"use client";

import React from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticButtonProps {
  children: React.ReactElement;
  strength?: number;
  radius?: number;
}

export default function MagneticButton({
  children,
  strength = 0.35,
  radius = 90,
}: MagneticButtonProps) {
  const magneticRef = useMagnetic(strength, radius);

  // Clone the child component and attach the mouse-magnetic ref
  return React.cloneElement(children as React.ReactElement<any>, { ref: magneticRef });
}
