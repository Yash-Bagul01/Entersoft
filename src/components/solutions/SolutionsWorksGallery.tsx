"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SOLUTION_LANDINGS } from "@/data/solutionLandings";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { useOptionalSolutionTransition } from "@/components/solutions/SolutionTransitionContext";
import "./solutions-works.css";

/** Same media the solution subpage hero opens on, so the expand matches the arrival. */
const HERO_IMAGE: Record<string, string> = {
  "api-discovery": "/images/solutions/api-discovery/hero-still.jpg?v=5",
  "ai-bom": "/images/solutions/ai-bom/hero.jpg?v=4",
  "manage-vulnerabilities": "/images/solutions/manage-vuln/hero-still.jpg?v=2",
  "automate-security-workflows": "/images/solutions/automate-workflows/hero-still.jpg?v=2",
  "track-appsec-kpis": "/images/solutions/hub/track-appsec-kpis-try-590041.jpg",
  "manage-open-source-risk": "/images/solutions/open-source/hero-freight.jpg",
};

const COUNT = SOLUTION_LANDINGS.length;
/** Radians between neighbouring cards. One continuous turn, not two crossing strands. */
const TWIST = 0.96;

function wrap(value: number, size: number) {
  return ((value % size) + size) % size;
}

/**
 * One spiral. Card 0 sits at the front when progress is 0.
 * Scrolling walks 0 → 1 → 2 → … → last → 0 again.
 * The join stays at the back of the spiral, so the trail never jumps across the word.
 */
function pose(index: number, progress: number) {
  let slot = wrap(index - progress, COUNT);
  if (slot > COUNT / 2) slot -= COUNT;

  const theta = slot * TWIST;
  const depth = (Math.cos(theta) + 1) / 2;
  const seam = Math.min(1, Math.max(0, (Math.abs(slot) - 2.15) / 0.85));

  return {
    x: Math.sin(theta) * 460,
    y: slot * 128,
    z: Math.cos(theta) * 230 - seam * 260,
    rx: slot * 12,
    ry: -Math.sin(theta) * 54,
    rz: Math.sin(theta) * -4,
    scale: (0.58 + depth * 0.5) * 0.48,
    opacity: 1 - seam * 0.82,
  };
}

export default function SolutionsWorksGallery() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const lenis = useSmoothScroll();
  const transition = useOptionalSolutionTransition();
  const wordRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const progress = useRef(0);
  const target = useRef(0);
  const hover = useRef<number | null>(null);
  const lift = useRef<number[]>(SOLUTION_LANDINGS.map(() => 0));
  const drag = useRef({ y: 0, active: false, moved: false });

  useEffect(() => {
    lenis?.stop();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
      lenis?.start();
    };
  }, [lenis]);

  useEffect(() => {
    let frame = 0;
    let alive = true;

    const draw = () => {
      if (!alive) return;
      progress.current += (target.current - progress.current) * (reduce ? 1 : 0.08);

      const word = wordRef.current;
      if (word) {
        word.style.transform = "translate(-50%, -50%)";
      }

      const unit = Math.min(window.innerWidth, 1440) / 1440;
      const liftEase = reduce ? 1 : 0.055;
      cardsRef.current.forEach((el, index) => {
        if (!el) return;
        const p = pose(index, progress.current);
        const goal = hover.current === index ? 1 : 0;
        const current = lift.current[index] ?? 0;
        const t = current + (goal - current) * liftEase;
        lift.current[index] = t;
        const x = p.x * unit;
        const y = p.y * unit - 22 * t;
        const z = p.z + 160 * t;
        const ry = p.ry * (1 - t * 0.78);
        const rx = p.rx * (1 - t * 0.65);
        const scale = p.scale * (1 + t * 0.08);
        el.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), ${z.toFixed(1)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${p.rz.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = String(p.opacity + (1 - p.opacity) * t);
        el.style.zIndex = String(Math.round(1000 + z));
      });

      frame = window.requestAnimationFrame(draw);
    };

    draw();
    return () => {
      alive = false;
      window.cancelAnimationFrame(frame);
    };
  }, [reduce]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
      target.current += delta * 0.0018;
    };
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", onWheel, true);
  }, []);

  const open = (index: number) => {
    if (drag.current.moved) return;
    const item = SOLUTION_LANDINGS[index];
    const el = cardsRef.current[index];
    if (el && transition && !reduce) {
      transition.startFromCard(el, {
        href: item.href,
        image: HERO_IMAGE[item.slug] ?? item.reel.image,
        title: item.navName,
      });
      return;
    }
    router.push(item.href);
  };

  return (
    <section
      className="sw-scene"
      aria-label="Solutions"
      onPointerDown={(event) => {
        drag.current = { y: event.clientY, active: true, moved: false };
        event.currentTarget.classList.add("is-drag");
      }}
      onPointerMove={(event) => {
        if (!drag.current.active) return;
        const dy = drag.current.y - event.clientY;
        if (Math.abs(dy) > 4) drag.current.moved = true;
        drag.current.y = event.clientY;
        target.current += dy * 0.005;
      }}
      onPointerUp={(event) => {
        drag.current.active = false;
        event.currentTarget.classList.remove("is-drag");
        window.setTimeout(() => {
          drag.current.moved = false;
        }, 40);
      }}
      onPointerLeave={(event) => {
        drag.current.active = false;
        event.currentTarget.classList.remove("is-drag");
      }}
    >
      <div className="sw-bg" />
      <svg className="sw-waves" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="none" stroke="rgba(52, 104, 184, 0.42)" strokeWidth="1.25">
          {Array.from({ length: 6 }, (_, ring) => (
            <ellipse key={`lat-${ring}`} cx="720" cy="470" rx="720" ry={40 + ring * 72} />
          ))}
          {Array.from({ length: 5 }, (_, ring) => (
            <ellipse key={`lon-${ring}`} cx="720" cy="470" rx={70 + ring * 140} ry="450" />
          ))}
        </g>
      </svg>

      <div className="sw-stage">
        <h1 ref={wordRef} className="sw-word">
          Solutions
        </h1>
        {SOLUTION_LANDINGS.map((item, index) => (
          <button
            key={item.slug}
            ref={(node) => {
              cardsRef.current[index] = node;
            }}
            type="button"
            className="sw-card"
            aria-label={item.navName}
            onMouseEnter={() => {
              hover.current = index;
            }}
            onMouseLeave={() => {
              if (hover.current === index) hover.current = null;
            }}
            onClick={() => open(index)}
          >
            <span className="sw-shot">
              <img src={HERO_IMAGE[item.slug] ?? item.reel.image} alt="" draggable={false} />
              <span className="sw-card-name">{item.navName}</span>
            </span>
          </button>
        ))}
      </div>

      <p className="sw-hint">Scroll or drag</p>
    </section>
  );
}
