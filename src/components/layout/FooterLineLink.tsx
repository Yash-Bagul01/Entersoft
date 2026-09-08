"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  label: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
};

export default function FooterLineLink({ label, onClick, href, external }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!wrap || !path || !svg) return;

    const state = { x: 0.5, amp: 0, target: 0 };
    let raf = 0;

    const draw = () => {
      const w = wrap.clientWidth || 1;
      svg.setAttribute("viewBox", `0 0 ${w} 24`);
      state.amp += (state.target - state.amp) * 0.16;
      const cx = Math.max(8, Math.min(w - 8, state.x * w));
      const cy = 12 - state.amp;
      path.setAttribute("d", `M 0 12 Q ${cx} ${cy} ${w} 12`);
      raf = requestAnimationFrame(draw);
    };

    const onEnter = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      state.x = (e.clientX - r.left) / Math.max(1, r.width);
      state.target = 20;
    };
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      state.x = (e.clientX - r.left) / Math.max(1, r.width);
      state.target = 20;
    };
    const onLeave = () => {
      state.target = 0;
    };

    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const copy = (
    <span className="site-footer-action-copy">
      <span>{label}</span>
      <span className="site-footer-action-arrow" aria-hidden="true">
        →
      </span>
    </span>
  );

  return (
    <div ref={wrapRef} className="site-footer-action">
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="site-footer-action-hit"
        >
          {copy}
        </a>
      ) : (
        <button type="button" className="site-footer-action-hit" onClick={onClick}>
          {copy}
        </button>
      )}
      <svg ref={svgRef} className="site-footer-action-line" preserveAspectRatio="none" aria-hidden="true">
        <path ref={pathRef} d="M 0 12 L 300 12" />
      </svg>
    </div>
  );
}
