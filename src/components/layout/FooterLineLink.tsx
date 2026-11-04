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
    let width = wrap.clientWidth || 1;

    // The curve only moves while it eases toward its target, so the loop sleeps once it settles.
    const draw = () => {
      raf = 0;
      svg.setAttribute("viewBox", `0 0 ${width} 24`);
      state.amp += (state.target - state.amp) * 0.16;
      if (Math.abs(state.target - state.amp) < 0.01) state.amp = state.target;
      const cx = Math.max(8, Math.min(width - 8, state.x * width));
      const cy = 12 - state.amp;
      path.setAttribute("d", `M 0 12 Q ${cx} ${cy} ${width} 12`);
      if (state.amp !== state.target) raf = requestAnimationFrame(draw);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onEnter = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      state.x = (e.clientX - r.left) / Math.max(1, r.width);
      state.target = 20;
      wake();
    };
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      state.x = (e.clientX - r.left) / Math.max(1, r.width);
      state.target = 20;
      wake();
    };
    const onLeave = () => {
      state.target = 0;
      wake();
    };
    const ro = new ResizeObserver(() => {
      width = wrap.clientWidth || 1;
      wake();
    });

    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    ro.observe(wrap);
    wake();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
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
