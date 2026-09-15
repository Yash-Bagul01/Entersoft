"use client";

import { useEffect } from "react";
import { useOptionalSolutionTransition } from "@/components/solutions/SolutionTransitionContext";

export default function SolutionArrivalMarker({ href }: { href: string }) {
  const transition = useOptionalSolutionTransition();

  useEffect(() => {
    transition?.markArrived(href);
  }, [href, transition]);

  return null;
}
