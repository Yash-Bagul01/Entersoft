"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Anybody } from "next/font/google";
import gsap from "gsap";
import { PLATFORM_HUB_ITEMS } from "@/data/platformHub";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { usePlatformTransition } from "@/components/layout/PlatformPageTransition";
import "./platform-hub.css";

/** Extra-wide grotesque in the Monument Extended register used on belenjones.com. */
const display = Anybody({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const LERP = 0.12;
/** Camera pose only — never mixed into the 90° step. */
const POSE_X = 4;
const POSE_Y = -32;
/** Scroll down / later name: bottom long face comes to camera, front becomes top. */
const NEXT_PITCH = -90;
const COUNT = PLATFORM_HUB_ITEMS.length;
const BELT = ["front", "bottom", "back", "top"] as const;
type BeltFace = (typeof BELT)[number];

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function wrapIndex(index: number) {
  return ((index % COUNT) + COUNT) % COUNT;
}

function wrap4(index: number) {
  return ((index % 4) + 4) % 4;
}

function shortestDir(from: number, to: number): 1 | -1 {
  const forward = wrapIndex(to - from);
  const backward = wrapIndex(from - to);
  if (forward === 0) return 1;
  return forward <= backward ? 1 : -1;
}

function beltItemIndex(
  cssFace: BeltFace,
  steps: number,
  shown: number,
  incoming: number | null,
  dir: 1 | -1 | 0,
) {
  const slot = wrap4(BELT.indexOf(cssFace) - wrap4(steps));
  if (incoming != null && dir === 1 && slot === 1) return incoming;
  if (incoming != null && dir === -1 && slot === 3) return incoming;
  const offset = [0, 1, 2, -1][slot];
  return wrapIndex(shown + offset);
}

function FaceImage({
  src,
  alt,
  className,
  style,
  faceRef,
}: {
  src: string;
  alt?: string;
  className: string;
  style: React.CSSProperties;
  faceRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div ref={faceRef} className={className} style={style}>
      <img src={src} alt={alt ?? ""} />
    </div>
  );
}

export default function PlatformHubScene() {
  const router = useRouter();
  const platformTransition = usePlatformTransition();
  const reduce = useReducedMotion();
  const lenis = useSmoothScroll();
  const cubeRef = useRef<HTMLDivElement>(null);
  const poseRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const pose = useRef({ x: POSE_X, y: POSE_Y });
  const busy = useRef(false);
  const shownRef = useRef(0);
  const stepsRef = useRef(0);
  const pendingRef = useRef<number | null>(null);
  const wheelAcc = useRef(0);
  const wheelTimer = useRef(0);
  const touchStart = useRef(0);
  const dragStart = useRef({ x: 0, y: 0, active: false });
  const dragged = useRef(false);
  const leaving = useRef(false);
  const pendingZoomHref = useRef<string | null>(null);
  const zoomOutRef = useRef<(href?: string, name?: string) => void>(() => {});
  const turnTween = useRef<gsap.core.Tween | null>(null);
  const frontFaceRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [steps, setSteps] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [turnDir, setTurnDir] = useState<1 | -1 | 0>(0);
  const [size, setSize] = useState({ w: 1100, h: 620 });
  const [tip, setTip] = useState({ on: false, x: 0, y: 0, text: "[ VIEW PROJECT ]" });

  const item = PLATFORM_HUB_ITEMS[active];
  const depth = size.h;
  const src = (face: BeltFace) =>
    PLATFORM_HUB_ITEMS[beltItemIndex(face, steps, shown, incoming, turnDir)].faces.front;
  const sideSrc = PLATFORM_HUB_ITEMS[shown].faces.right;

  const startTurn = useCallback(
    (to: number) => {
      const target = wrapIndex(to);
      if (leaving.current) return;
      if (target === shownRef.current) return;
      if (busy.current) {
        pendingRef.current = target;
        return;
      }

      const dir = shortestDir(shownRef.current, target);
      const nextSteps = stepsRef.current + dir;
      const pitch = nextSteps * NEXT_PITCH;
      busy.current = true;
      setActive(target);
      setIncoming(target);
      setTurnDir(dir);

      const settle = () => {
        stepsRef.current = nextSteps;
        shownRef.current = target;
        setSteps(nextSteps);
        setShown(target);
        setIncoming(null);
        setTurnDir(0);
        busy.current = false;
        const zoomHref = pendingZoomHref.current;
        pendingZoomHref.current = null;
        if (zoomHref) {
          const zoomItem = PLATFORM_HUB_ITEMS.find((entry) => entry.href === zoomHref);
          zoomOutRef.current(zoomHref, zoomItem?.name);
          return;
        }
        const queued = pendingRef.current;
        pendingRef.current = null;
        if (queued != null && queued !== target) {
          startTurn(queued);
        }
      };

      if (reduce) {
        const cube = cubeRef.current;
        if (cube) gsap.set(cube, { rotateX: pitch });
        settle();
        return;
      }

      const cube = cubeRef.current;
      if (!cube) {
        settle();
        return;
      }

      turnTween.current?.kill();
      turnTween.current = gsap.to(cube, {
        rotateX: pitch,
        duration: 0.88,
        ease: "power3.inOut",
        overwrite: true,
        onComplete: settle,
      });
    },
    [reduce],
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const rect = wrap.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    return () => {
      observer.disconnect();
      turnTween.current?.kill();
    };
  }, []);

  useEffect(() => {
    lenis?.stop();
    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      lenis?.start();
    };
  }, [lenis]);

  useEffect(() => {
    const poseEl = poseRef.current;
    if (!poseEl) return;

    const onMove = (event: MouseEvent) => {
      pointer.current.x = event.clientX / window.innerWidth - 0.5;
      pointer.current.y = event.clientY / window.innerHeight - 0.5;

      if (dragStart.current.active) {
        const dy = event.clientY - dragStart.current.y;
        if (Math.abs(dy) > 8) dragged.current = true;
      }
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (leaving.current) return;
      wheelAcc.current += event.deltaY;
      window.clearTimeout(wheelTimer.current);
      wheelTimer.current = window.setTimeout(() => {
        wheelAcc.current = 0;
      }, 140);
      if (wheelAcc.current > 64) {
        wheelAcc.current = 0;
        startTurn(shownRef.current + 1);
      } else if (wheelAcc.current < -64) {
        wheelAcc.current = 0;
        startTurn(shownRef.current - 1);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStart.current = event.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const y = event.touches[0]?.clientY ?? touchStart.current;
      const delta = touchStart.current - y;
      if (delta > 42) {
        touchStart.current = y;
        dragged.current = true;
        startTurn(shownRef.current + 1);
      } else if (delta < -42) {
        touchStart.current = y;
        dragged.current = true;
        startTurn(shownRef.current - 1);
      }
    };

    let rafId = 0;
    const tick = () => {
      if (!leaving.current) {
        const targetX = POSE_X + pointer.current.y * -5;
        const targetY = POSE_Y + pointer.current.x * 7;
        const amount = reduce ? 1 : LERP;
        pose.current.x = lerp(pose.current.x, targetX, amount);
        pose.current.y = lerp(pose.current.y, targetY, amount);
        poseEl.style.transform = `rotateY(${pose.current.y}deg) rotateX(${pose.current.x}deg)`;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.clearTimeout(wheelTimer.current);
      window.cancelAnimationFrame(rafId);
    };
  }, [reduce, startTurn]);

  const onCubeMove = (event: React.MouseEvent) => {
    setTip({
      on: true,
      x: event.clientX,
      y: event.clientY,
      text: "[ VIEW PROJECT ]",
    });
  };

  const onCubeDown = (event: React.MouseEvent) => {
    dragStart.current = { x: event.clientX, y: event.clientY, active: true };
    dragged.current = false;
  };

  const onCubeUp = (event: React.MouseEvent) => {
    if (dragStart.current.active) {
      const dy = event.clientY - dragStart.current.y;
      if (dy > 48) startTurn(shownRef.current - 1);
      else if (dy < -48) startTurn(shownRef.current + 1);
    }
    dragStart.current.active = false;
  };

  const zoomOut = useCallback(
    (href?: string, name?: string) => {
      if (busy.current || leaving.current) return;
      const wrap = wrapRef.current;
      const scaleEl = scaleRef.current;
      const poseEl = poseRef.current;
      const shownItem = PLATFORM_HUB_ITEMS[shownRef.current];
      const targetHref = href || shownItem.href;
      const targetName = name || shownItem.name;
      const targetItem =
        PLATFORM_HUB_ITEMS.find((entry) => entry.href === targetHref) ?? shownItem;

      leaving.current = true;
      wrap?.closest(".platform-hub")?.classList.add("is-expanding");
      setTip((current) => ({ ...current, on: false }));

      const finish = () => {
        if (platformTransition) {
          platformTransition.to(targetHref, targetName, {
            image: targetItem.faces.front,
            grown: true,
          });
          return;
        }
        router.push(targetHref);
      };

      if (reduce || !wrap || !scaleEl || !poseEl) {
        finish();
        return;
      }

      const cover = Math.max(
        window.innerWidth / wrap.offsetWidth,
        window.innerHeight / wrap.offsetHeight,
      );

      const preload = new Image();
      preload.src = targetItem.faces.front;

      gsap
        .timeline({ onComplete: finish })
        .to(
          poseEl,
          { rotateY: 0, rotateX: 0, duration: 1.28, ease: "power2.inOut", overwrite: true },
          0,
        )
        .to(
          scaleEl,
          { scale: cover, duration: 1.28, ease: "power2.inOut", overwrite: true },
          0,
        );
    },
    [platformTransition, reduce, router],
  );

  zoomOutRef.current = zoomOut;

  const openActive = () => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    zoomOut();
  };

  useEffect(() => {
    const onZoom = (event: Event) => {
      const href = (event as CustomEvent<{ href?: string }>).detail?.href;
      if (!href) return;
      const index = PLATFORM_HUB_ITEMS.findIndex((entry) => entry.href === href);
      if (index < 0) return;
      if (index !== shownRef.current) {
        pendingZoomHref.current = href;
        startTurn(index);
        return;
      }
      zoomOut(href, PLATFORM_HUB_ITEMS[index].name);
    };
    window.addEventListener("platform-hub-zoom", onZoom);
    return () => window.removeEventListener("platform-hub-zoom", onZoom);
  }, [startTurn, zoomOut]);

  return (
    <section
      className={`platform-hub ${display.className}`}
      style={{ backgroundColor: item.bg }}
    >
      <footer className="platform-hub__footer">
        <div>[ SCROLL OR DRAG TO SWITCH MODULES ]</div>
        <div>ENTERSOFT SECURITY • 2026 EDITION</div>
      </footer>

      <div className="platform-hub__stage">
        <nav className="platform-hub__names" aria-label="Platform modules">
          {PLATFORM_HUB_ITEMS.map((entry, index) => (
            <button
              key={entry.id}
              type="button"
              className={`platform-hub__name${index === active ? " is-active" : ""}`}
              onMouseEnter={() => startTurn(index)}
              onFocus={() => startTurn(index)}
              onClick={() => startTurn(index)}
            >
              {entry.name}
            </button>
          ))}
        </nav>

        <div
          ref={wrapRef}
          className="platform-hub__cube-wrap"
          onMouseMove={onCubeMove}
          onMouseLeave={() => setTip((currentTip) => ({ ...currentTip, on: false }))}
          onMouseDown={onCubeDown}
          onMouseUp={onCubeUp}
          onClick={openActive}
          role="link"
          tabIndex={0}
          aria-label={`View ${item.name}`}
          onKeyDown={(event) => {
            if (event.key === "Enter") openActive();
          }}
        >
          <div ref={scaleRef} className="platform-hub__cube-scale">
          <div ref={poseRef} className="platform-hub__cube-pose">
            <div ref={cubeRef} className="platform-hub__cube">
              <FaceImage
                src={src("front")}
                alt={item.name}
                className="platform-hub__face platform-hub__face--front"
                style={{ transform: `translateZ(${depth / 2}px)` }}
                faceRef={frontFaceRef}
              />
              <FaceImage
                src={src("back")}
                className="platform-hub__face platform-hub__face--back"
                style={{ transform: `rotateY(180deg) translateZ(${depth / 2}px)` }}
              />
              <FaceImage
                src={sideSrc}
                className="platform-hub__face platform-hub__face--right"
                style={{
                  width: depth,
                  left: (size.w - depth) / 2,
                  transform: `rotateY(90deg) translateZ(${size.w / 2}px)`,
                }}
              />
              <FaceImage
                src={sideSrc}
                className="platform-hub__face platform-hub__face--left"
                style={{
                  width: depth,
                  left: (size.w - depth) / 2,
                  transform: `rotateY(-90deg) translateZ(${size.w / 2}px)`,
                }}
              />
              <FaceImage
                src={src("top")}
                className="platform-hub__face platform-hub__face--top"
                style={{
                  height: depth,
                  top: (size.h - depth) / 2,
                  transform: `rotateX(90deg) translateZ(${size.h / 2}px)`,
                }}
              />
              <FaceImage
                src={src("bottom")}
                className="platform-hub__face platform-hub__face--bottom"
                style={{
                  height: depth,
                  top: (size.h - depth) / 2,
                  transform: `rotateX(-90deg) translateZ(${size.h / 2}px)`,
                }}
              />
            </div>
          </div>
          </div>
        </div>
      </div>

      <div
        className={`platform-hub__tip${tip.on ? " is-on" : ""}`}
        style={{ left: tip.x, top: tip.y }}
      >
        {tip.text}
      </div>
    </section>
  );
}
