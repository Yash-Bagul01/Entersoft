"use client";

import React, { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudies } from "@/data/caseStudies";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ============================================================
   SCENE GEOMETRY
   Values are in viewBox units where 1000 units = viewport
   height, so the diagram keeps identical proportions on any
   screen: circle radius 0.262H, centre offset 0.169H and an
   overall figure diameter of 0.86H.
   ============================================================ */
const C = 500; // scene centre
const R = 262; // radius of each of the four circles
const D = 168; // distance of each circle centre from the scene centre

const SAGE = "#535E51"; // solid fill of the four-way intersection
const SAGE_LINE = "#66735F"; // circle outlines

const CIRCLE_CENTRES = {
  top: { cx: C, cy: C - D },
  right: { cx: C + D, cy: C },
  bottom: { cx: C, cy: C + D },
  left: { cx: C - D, cy: C },
} as const;

type NodePos = keyof typeof CIRCLE_CENTRES;

// Four nodes arranged N / E / S / W
const NODES: Array<{ pos: NodePos; label: string; study: (typeof caseStudies)[number] }> = [
  { pos: "top", label: "Mergers", study: caseStudies[0] },
  { pos: "right", label: "Governance", study: caseStudies[1] },
  { pos: "bottom", label: "Pipeline", study: caseStudies[2] },
  { pos: "left", label: "Banking", study: caseStudies[3] },
];

// Symbols sit inside the exclusive lobe of their own circle
const SYMBOL_OFFSET = D + R * 0.7;
const SYMBOL_POS: Record<NodePos, { x: number; y: number }> = {
  top: { x: C, y: C - SYMBOL_OFFSET },
  right: { x: C + SYMBOL_OFFSET, y: C },
  bottom: { x: C, y: C + SYMBOL_OFFSET },
  left: { x: C - SYMBOL_OFFSET, y: C },
};

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
};

const arc = (cx: number, cy: number, r: number, a1: number, a2: number) => {
  const [x1, y1] = polar(cx, cy, r, a1);
  const [x2, y2] = polar(cx, cy, r, a2);
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
  const sweep = a2 > a1 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} ${sweep} ${x2.toFixed(2)} ${y2.toFixed(2)}`;
};

// Each detail label curves just outside its own circle, wound so it reads naturally
const LABEL_R = R + 22;
const LABEL_ARCS: Record<NodePos, string> = {
  top: arc(C, C - D, LABEL_R, 200, 340),
  right: arc(C + D, C, LABEL_R, -70, 70),
  bottom: arc(C, C + D, LABEL_R, 160, 20),
  left: arc(C - D, C, LABEL_R, 110, 250),
};

// The six pairwise overlaps that carry the diagonal hatch
const PAIRS: Array<[NodePos, NodePos]> = [
  ["top", "right"],
  ["right", "bottom"],
  ["bottom", "left"],
  ["left", "top"],
  ["top", "bottom"],
  ["left", "right"],
];

// Radial dial ticks, elongated towards bottom centre
const TICKS = Array.from({ length: 120 }, (_, i) => {
  const rad = ((i * 360) / 120) * (Math.PI / 180);
  const len = 16 + 16 * Math.pow(Math.max(0, Math.sin(rad)), 8);
  return {
    id: i,
    x1: C + 419 * Math.cos(rad),
    y1: C + 419 * Math.sin(rad),
    x2: C + (419 + len) * Math.cos(rad),
    y2: C + (419 + len) * Math.sin(rad),
  };
});

/* ============================================================
   SCROLL CHOREOGRAPHY
   The stage stays pinned for SCROLL_LENGTH, so the zoom-out
   spans the scroll distance of several ordinary sections.
   Every phase below is a fraction of that length, so changing
   the constant rescales the whole sequence.

   Zoom decay is sampled from the reference recording: fast at
   first, then settling. The opening scale is large enough that
   the sage core alone fills any viewport, including ultrawide,
   so the section opens as a flat field of colour.
   ============================================================ */
const SCROLL_LENGTH = "1000vh";

const ZOOM_STOPS = [0, 0.1, 0.16, 0.24, 0.35, 0.47, 0.6, 0.78, 1];
const ZOOM_SCALE = [13, 13, 10.6, 5.8, 3.2, 1.95, 1.33, 1, 0.99];
const ZOOM_LOG = ZOOM_SCALE.map(Math.log);

const ROTATE_STOPS = [0, 0.24, 0.5, 0.78];
const ROTATE_DEG = [-8, -7, -3, 0];

const DIAL_FADE = [0.1, 0.3]; // dial holds, then dissolves as the zoom takes over

// Piecewise interpolation across a table of stops
const sample = (p: number, stops: number[], values: number[]) => {
  if (p <= stops[0]) return values[0];
  for (let i = 1; i < stops.length; i++) {
    if (p <= stops[i]) {
      const t = (p - stops[i - 1]) / (stops[i] - stops[i - 1]);
      return values[i - 1] + (values[i] - values[i - 1]) * t;
    }
  }
  return values[values.length - 1];
};

export default function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || isReduced) return;

    const container = containerRef.current;
    const scene = sceneRef.current;
    const dial = dialRef.current;
    if (!container || !scene || !dial) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set([scene, dial], { force3D: true });

      const setSceneScale = gsap.quickSetter(scene, "scale");
      const setSceneRotate = gsap.quickSetter(scene, "rotation", "deg");
      const setDialOpacity = gsap.quickSetter(dial, "opacity");
      const setDialScale = gsap.quickSetter(dial, "scale");
      const setDialRotate = gsap.quickSetter(dial, "rotation", "deg");

      const render = (p: number) => {
        // Interpolating in log space keeps the zoom velocity even to the eye
        setSceneScale(Math.exp(sample(p, ZOOM_STOPS, ZOOM_LOG)));
        setSceneRotate(sample(p, ROTATE_STOPS, ROTATE_DEG));

        const fade = gsap.utils.clamp(
          0,
          1,
          (p - DIAL_FADE[0]) / (DIAL_FADE[1] - DIAL_FADE[0])
        );
        setDialOpacity(1 - fade);
        setDialScale(1 - fade * 0.16);
        setDialRotate(fade * 5);
      };

      // A scrubbed proxy tween smooths the wheel steps. Kept short because
      // Lenis already applies its own inertia to the scroll position.
      const proxy = { p: 0 };
      gsap.to(proxy, {
        p: 1,
        ease: "none",
        onUpdate: () => render(proxy.p),
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      render(0);
    }, container);

    return () => ctx.revert();
  }, [isReduced]);

  const clipId = (key: string) => `${uid}-clip-${key}`;

  return (
    <section
      id="case-studies"
      ref={containerRef}
      className="relative w-full bg-[#0D0D0D] text-[#F2F2F2] select-none"
      style={{ height: isReduced ? "100vh" : SCROLL_LENGTH }}
    >
      {/* Pinned full-viewport stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Faint diagonal texture in the dark field */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 26px)",
          }}
        />

        {/* ====================================================
            ZOOMING SCENE — four overlapping circles, hatched
            pairwise lenses, solid sage four-way intersection
            ==================================================== */}
        <div
          ref={sceneRef}
          style={{ transform: isReduced ? undefined : `scale(${ZOOM_SCALE[0]})` }}
          className="absolute inset-0 flex items-center justify-center origin-center will-change-transform"
        >
          <svg
            viewBox="0 0 1000 1000"
            style={{ overflow: "visible" }}
            className="h-screen w-screen max-w-none"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              {Object.entries(CIRCLE_CENTRES).map(([key, { cx, cy }]) => (
                <clipPath key={key} id={clipId(key)}>
                  <circle cx={cx} cy={cy} r={R} />
                </clipPath>
              ))}

              <pattern
                id={`${uid}-hatch`}
                width="9"
                height="9"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="9" stroke="rgba(226,232,222,0.22)" strokeWidth="1.1" />
              </pattern>

              {/* Fine pinstripes that only read while zoomed in */}
              <pattern id={`${uid}-pinstripe`} width="5" height="5" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="5" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
              </pattern>

              {Object.entries(LABEL_ARCS).map(([key, d]) => (
                <path key={`arc-${key}`} id={`${uid}-arc-${key}`} d={d} fill="none" />
              ))}
            </defs>

            <rect
              x="-3000"
              y="-3000"
              width="7000"
              height="7000"
              fill={`url(#${uid}-pinstripe)`}
              opacity="0.1"
            />

            {/* Hatched pairwise intersections */}
            {PAIRS.map(([a, b]) => (
              <g key={`${a}-${b}`} clipPath={`url(#${clipId(a)})`}>
                <g clipPath={`url(#${clipId(b)})`}>
                  <rect x="0" y="0" width="1000" height="1000" fill={`url(#${uid}-hatch)`} />
                </g>
              </g>
            ))}

            {/* Solid sage core where all four circles intersect */}
            <g clipPath={`url(#${clipId("top")})`}>
              <g clipPath={`url(#${clipId("right")})`}>
                <g clipPath={`url(#${clipId("bottom")})`}>
                  <g clipPath={`url(#${clipId("left")})`}>
                    <rect x="0" y="0" width="1000" height="1000" fill={SAGE} />
                  </g>
                </g>
              </g>
            </g>

            {/* Circle outlines */}
            {Object.entries(CIRCLE_CENTRES).map(([key, { cx, cy }]) => (
              <circle
                key={`ring-${key}`}
                cx={cx}
                cy={cy}
                r={R}
                fill="none"
                stroke={SAGE_LINE}
                strokeWidth="1.6"
                opacity="0.9"
              />
            ))}

            {/* Element symbols, sub-labels and curved detail labels */}
            {NODES.map(({ pos, label, study }) => {
              const { x, y } = SYMBOL_POS[pos];
              return (
                <g key={study.id}>
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    fill="#F2F2F2"
                    fontSize="52"
                    fontWeight="500"
                    letterSpacing="1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {study.symbol}
                  </text>
                  <text
                    x={x}
                    y={y + 30}
                    textAnchor="middle"
                    fill="#F2F2F2"
                    fillOpacity="0.92"
                    fontSize="17"
                    letterSpacing="1.4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {label}
                  </text>
                  <text
                    fill="#F2F2F2"
                    fillOpacity="0.88"
                    fontSize="14"
                    letterSpacing="0.6"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <textPath href={`#${uid}-arc-${pos}`} startOffset="50%" textAnchor="middle">
                      {study.arcText.replace(/ · /g, " | ")}
                    </textPath>
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ====================================================
            SCREEN-ANCHORED DIAL + TITLE
            ==================================================== */}
        <div
          ref={dialRef}
          style={{ opacity: isReduced ? 0 : 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none origin-center will-change-transform"
        >
          <svg viewBox="0 0 1000 1000" className="h-screen w-screen max-w-none" aria-hidden="true">
            {TICKS.map((t) => (
              <line
                key={t.id}
                x1={t.x1.toFixed(2)}
                y1={t.y1.toFixed(2)}
                x2={t.x2.toFixed(2)}
                y2={t.y2.toFixed(2)}
                stroke="#F2F2F2"
                strokeWidth="2.4"
                opacity="0.92"
              />
            ))}
          </svg>

          <h2 className="absolute font-display text-[clamp(1.6rem,6.6vh,4rem)] font-normal tracking-[-0.01em] text-[#F2F2F2] text-center px-8">
            Verified Enterprise Delivery
          </h2>
        </div>
      </div>

      {/* Accessible Enterprise Case Studies Detail Grid */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col gap-4 mb-10 text-left">
          <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-widest">VERIFIED ENGAGEMENT PROOF</span>
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-white uppercase tracking-tight">Structured Case Studies</h3>
          <p className="font-sans text-sm text-zinc-400 max-w-2xl">Examine detailed engagement scope, technical approach, technology used, and measured outcomes from enterprise security deliveries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {caseStudies.map((study) => (
            <article 
              key={study.id} 
              className="bg-[#0B132B]/80 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-6 backdrop-blur-md hover:border-[var(--accent)]/40 transition-colors"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-wider uppercase">{study.sector}</span>
                  <span className="font-mono text-xs text-zinc-500">{study.timeline}</span>
                </div>

                <h4 className="font-display text-xl font-semibold text-white">{study.title}</h4>
                <p className="font-sans text-xs text-zinc-300 leading-relaxed">{study.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="bg-black/30 border border-white/5 rounded-xl p-3.5 flex flex-col gap-1">
                    <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Customer Problem</span>
                    <span className="font-sans text-xs text-zinc-200">{study.customerProblem}</span>
                  </div>
                  <div className="bg-black/30 border border-white/5 rounded-xl p-3.5 flex flex-col gap-1">
                    <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Agreed Scope</span>
                    <span className="font-sans text-xs text-zinc-200">{study.agreedScope}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-black/30 border border-white/5 rounded-xl p-3.5 flex flex-col gap-1">
                    <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Entersoft Approach</span>
                    <span className="font-sans text-xs text-zinc-200">{study.entersoftApproach}</span>
                  </div>
                  <div className="bg-black/30 border border-white/5 rounded-xl p-3.5 flex flex-col gap-1">
                    <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Technology Used</span>
                    <span className="font-sans text-xs text-zinc-200">{study.technologyUsed}</span>
                  </div>
                </div>

                <div className="bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-xl p-4 flex flex-col gap-1 mt-1">
                  <span className="font-mono text-[9px] font-bold text-[var(--accent)] uppercase tracking-widest">Measured Result</span>
                  <span className="font-sans text-xs font-medium text-white">{study.measuredResult}</span>
                </div>

                <blockquote className="border-l-2 border-[var(--accent)] pl-4 italic text-xs font-sans text-zinc-300 mt-2">
                  &ldquo;{study.customerQuote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[9.5px] font-mono text-zinc-500 uppercase tracking-wider">
                <span>{study.anonymisationStatement}</span>
                <span className="text-[var(--accent)] font-bold">{study.metric}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
