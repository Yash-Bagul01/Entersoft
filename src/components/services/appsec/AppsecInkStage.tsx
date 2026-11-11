"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { animate, stagger } from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type AnimePlayback = { pause?: () => void };

export default function AppsecInkStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const paths = [...root.querySelectorAll<SVGPathElement>(".as-ink path")];
    if (reduced) {
      paths.forEach((path) => {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
      });
      return;
    }

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });

    let draw: AnimePlayback | undefined;
    let pulse: AnimePlayback | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        draw = animate(paths, {
          strokeDashoffset: 0,
          delay: stagger(14),
          duration: 980,
          ease: "inOutQuad",
        });
        const dots = root.querySelectorAll(".as-ink-dot");
        if (dots.length > 0) {
          pulse = animate(dots, {
            opacity: [0.25, 1],
            delay: stagger(160),
            duration: 1500,
            loop: true,
            alternate: true,
            ease: "inOutSine",
          });
        }
        observer.disconnect();
      },
      { threshold: 0.28 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      draw?.pause?.();
      pulse?.pause?.();
    };
  }, [reduced]);

  return (
    <div className="as-illus__stage" ref={ref}>
      {children}
    </div>
  );
}
