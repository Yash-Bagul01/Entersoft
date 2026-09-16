"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Syne } from "next/font/google";
import gsap from "gsap";
import { PLATFORM_HUB_ITEMS } from "@/data/platformHub";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { usePlatformTransition } from "@/components/layout/PlatformPageTransition";
import "./platform-hub.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
});

const LERP = 0.1;
const REST_X = -16;
const REST_Y = -34;
/** Bottom long face → front; current front → top. Never yaw onto the short end. */
const PITCH = 90;
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

function turnDirection(from: number, to: number) {
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
}: {
  src: string;
  alt?: string;
  className: string;
  style: React.CSSProperties;
}) {
  return (
    <div className={className} style={style}>
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
  const wrapRef = useRef<HTMLDivElement>(null);
  const spin = useRef({ x: 0 });
  const pointer = useRef({ x: 0, y: 0 });
  const current = useRef({ x: REST_X, y: REST_Y });
  const drag = useRef({ x: 0, y: 0 });
  const spaceHeld = useRef(false);
  const dragging = useRef(false);
  const dragged = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const busy = useRef(false);
  const shownRef = useRef(0);
  const stepsRef = useRef(0);
  const wheelAcc = useRef(0);
  const wheelTimer = useRef(0);
  const touchStart = useRef(0);
  const turnTween = useRef<gsap.core.Tween | null>(null);

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
      if (busy.current || target === shownRef.current) return;

      const dir = turnDirection(shownRef.current, target) as 1 | -1;
      const nextSteps = stepsRef.current + dir;
      busy.current = true;
      setActive(target);
      setIncoming(target);
      setTurnDir(dir);

      const settle = () => {
        spin.current.x = nextSteps * PITCH;
        stepsRef.current = nextSteps;
        shownRef.current = target;
        setSteps(nextSteps);
        setShown(target);
        setIncoming(null);
        setTurnDir(0);
        window.setTimeout(() => {
          busy.current = false;
        }, 80);
      };

      if (reduce) {
        current.current.x = REST_X + nextSteps * PITCH;
        settle();
        busy.current = false;
        return;
      }

      turnTween.current?.kill();
      turnTween.current = gsap.to(spin.current, {
        x: nextSteps * PITCH,
        duration: 0.92,
        ease: "power2.inOut",
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
    const cube = cubeRef.current;
    if (!cube) return;

    const onMove = (event: MouseEvent) => {
      pointer.current.x = event.clientX / window.innerWidth - 0.5;
      pointer.current.y = event.clientY / window.innerHeight - 0.5;

      if (dragging.current) {
        dragged.current = true;
        drag.current.y += (event.clientX - lastPointer.current.x) * 0.28;
        drag.current.x -= (event.clientY - lastPointer.current.y) * 0.28;
        lastPointer.current = { x: event.clientX, y: event.clientY };
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space") return;
      event.preventDefault();
      spaceHeld.current = true;
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") spaceHeld.current = false;
    };
    const onMouseUp = () => {
      dragging.current = false;
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (busy.current) {
        wheelAcc.current = 0;
        return;
      }
      wheelAcc.current += event.deltaY;
      window.clearTimeout(wheelTimer.current);
      wheelTimer.current = window.setTimeout(() => {
        wheelAcc.current = 0;
      }, 160);
      if (wheelAcc.current > 72) {
        wheelAcc.current = 0;
        startTurn(shownRef.current + 1);
      } else if (wheelAcc.current < -72) {
        wheelAcc.current = 0;
        startTurn(shownRef.current - 1);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStart.current = event.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (busy.current) return;
      const y = event.touches[0]?.clientY ?? touchStart.current;
      const delta = touchStart.current - y;
      if (delta > 48) {
        touchStart.current = y;
        startTurn(shownRef.current + 1);
      } else if (delta < -48) {
        touchStart.current = y;
        startTurn(shownRef.current - 1);
      }
    };

    let rafId = 0;
    const tick = () => {
      const targetX = REST_X + spin.current.x + pointer.current.y * -4 + drag.current.x;
      const targetY = REST_Y + pointer.current.x * 5 + drag.current.y;
      const amount = reduce ? 1 : LERP;
      current.current.x = lerp(current.current.x, targetX, amount);
      current.current.y = lerp(current.current.y, targetY, amount);
      cube.style.transform = `rotateX(${current.current.x}deg) rotateY(${current.current.y}deg)`;
      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("mouseup", onMouseUp);
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
      text: spaceHeld.current ? "HOLD SPACE TO DRAG" : "[ VIEW PROJECT ]",
    });
  };

  const onCubeDown = (event: React.MouseEvent) => {
    if (!spaceHeld.current) return;
    dragging.current = true;
    dragged.current = false;
    lastPointer.current = { x: event.clientX, y: event.clientY };
  };

  const openActive = () => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    if (platformTransition) {
      platformTransition.to(item.href, item.name);
      return;
    }
    router.push(item.href);
  };

  return (
    <section
      className={`platform-hub ${syne.className}`}
      style={{ backgroundColor: item.bg }}
    >
      <div className="platform-hub__stage">
        <nav className="platform-hub__names" aria-label="Platform modules">
          {PLATFORM_HUB_ITEMS.map((entry, index) => (
            <Link
              key={entry.id}
              href={entry.href}
              className={`platform-hub__name${index === active ? " is-active" : ""}`}
              onMouseEnter={() => startTurn(index)}
              onFocus={() => startTurn(index)}
            >
              {entry.name}
            </Link>
          ))}
        </nav>

        <div
          ref={wrapRef}
          className="platform-hub__cube-wrap"
          onMouseMove={onCubeMove}
          onMouseLeave={() => setTip((currentTip) => ({ ...currentTip, on: false }))}
          onMouseDown={onCubeDown}
          onMouseUp={() => {
            dragging.current = false;
          }}
          onClick={openActive}
          role="link"
          tabIndex={0}
          aria-label={`View ${item.name}`}
          onKeyDown={(event) => {
            if (event.key === "Enter") openActive();
          }}
        >
          <div ref={cubeRef} className="platform-hub__cube">
            <FaceImage
              src={src("front")}
              alt={item.name}
              className="platform-hub__face platform-hub__face--front"
              style={{ transform: `translateZ(${depth / 2}px)` }}
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

      <div
        className={`platform-hub__tip${tip.on ? " is-on" : ""}`}
        style={{ left: tip.x, top: tip.y }}
      >
        {tip.text}
      </div>
    </section>
  );
}
