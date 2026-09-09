"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import type {
  SolutionExpandPayload,
  SolutionExpandRect,
} from "@/components/solutions/SolutionTransitionContext";
import "@/components/solutions/solution-case.css";

type Phase = "idle" | "expanding" | "covering";

export default function SolutionExpandOverlay({
  phase,
  payload,
  fromRect,
  arrived,
  onExpanded,
  onFinished,
}: {
  phase: Phase;
  payload: SolutionExpandPayload | null;
  fromRect: SolutionExpandRect | null;
  arrived: boolean;
  onExpanded: () => void;
  onFinished: () => void;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef(false);
  const fadingRef = useRef(false);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || !payload || !fromRect) return;

    if (phase === "expanding") {
      expandedRef.current = false;
      fadingRef.current = false;
      gsap.killTweensOf(layer);
      gsap.set(layer, {
        autoAlpha: 1,
        top: fromRect.top,
        left: fromRect.left,
        width: fromRect.width,
        height: fromRect.height,
      });
      const tween = gsap.to(layer, {
        top: 0,
        left: 0,
        width: () => window.innerWidth,
        height: () => window.innerHeight,
        duration: 0.92,
        ease: "power3.inOut",
        onComplete: () => {
          if (expandedRef.current) return;
          expandedRef.current = true;
          onExpanded();
        },
      });
      return () => {
        tween.kill();
      };
    }

    if (phase === "covering") {
      gsap.set(layer, {
        autoAlpha: 1,
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, [phase, payload, fromRect, onExpanded]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || !arrived || phase !== "covering" || fadingRef.current) return;
    fadingRef.current = true;
    const tween = gsap.to(layer, {
      autoAlpha: 0,
      duration: 0.38,
      delay: 0.06,
      ease: "power2.out",
      onComplete: onFinished,
    });
    return () => {
      tween.kill();
    };
  }, [arrived, phase, onFinished]);

  if (typeof document === "undefined" || phase === "idle" || !payload || !fromRect) {
    return null;
  }

  return createPortal(
    <div
      ref={layerRef}
      className="solution-expand-overlay"
      aria-hidden="true"
      style={{
        top: fromRect.top,
        left: fromRect.left,
        width: fromRect.width,
        height: fromRect.height,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={payload.image} alt="" className="solution-expand-overlay__image" />
    </div>,
    document.body
  );
}
