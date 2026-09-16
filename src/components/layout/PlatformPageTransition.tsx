"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PLATFORM_HUB_ITEMS } from "@/data/platformHub";
import { services } from "@/data/services";
import { ROUTES } from "@/config/routes";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import "./platform-page-transition.css";

const COLS = 5;
const EASE = "power4.inOut";
gsap.registerPlugin(ScrollTrigger);

type PlatformTransitionApi = {
  to: (href: string, label?: string) => void;
};

const PlatformTransitionContext = createContext<PlatformTransitionApi | null>(null);

export function usePlatformTransition() {
  return useContext(PlatformTransitionContext);
}

function pathOnly(href: string) {
  return href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
}

export function isPlatformRoute(href: string) {
  const path = pathOnly(href);
  return path === "/platform" || path.startsWith("/platform/");
}

export function isServicesRoute(href: string) {
  const path = pathOnly(href);
  return path === ROUTES.servicesHub || path.startsWith(`${ROUTES.servicesHub}/`);
}

export function isCoverRoute(href: string) {
  return isPlatformRoute(href) || isServicesRoute(href);
}

export function platformPageLabel(href: string) {
  const path = pathOnly(href);
  const platform = PLATFORM_HUB_ITEMS.find((item) => pathOnly(item.href) === path);
  if (platform) return platform.name;
  const service = services.find((item) => pathOnly(item.route) === path);
  if (service) return service.displayName;
  if (path === "/platform") return "Platform";
  if (path === ROUTES.servicesHub) return "Services";
  const slug = path.split("/").pop() || "Page";
  return slug.replace(/-/g, " ");
}

export function PlatformTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const lenis = useSmoothScroll();
  const colsRef = useRef<HTMLDivElement[]>([]);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const pending = useRef<string | null>(null);
  const apiRef = useRef<PlatformTransitionApi>({ to: () => {} });

  const resetChrome = useCallback(() => {
    const cols = colsRef.current.filter(Boolean);
    const overlay = overlayRef.current;
    const labelEl = labelRef.current;
    gsap.killTweensOf([...cols, labelEl]);
    if (overlay) overlay.classList.remove("is-on");
    gsap.set(cols, { scaleY: 0, clearProps: "transform" });
    gsap.set(labelEl, { opacity: 0, y: 0, clearProps: "transform" });
    lenis?.start();
    busy.current = false;
    pending.current = null;
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [lenis]);

  const coverThenPush = useCallback(
    (href: string, label?: string) => {
      const path = pathOnly(href);
      if (!isCoverRoute(path)) {
        router.push(href);
        return;
      }
      if (path === pathOnly(pathname || "/")) return;
      if (busy.current) return;
      busy.current = true;
      pending.current = path;
      router.prefetch(path);
      lenis?.stop();

      if (reduce) {
        router.push(path);
        window.setTimeout(() => {
          resetChrome();
        }, 40);
        return;
      }

      const cols = colsRef.current.filter(Boolean);
      const overlay = overlayRef.current;
      const labelEl = labelRef.current;
      if (overlay) overlay.classList.add("is-on");
      if (labelEl) labelEl.textContent = (label || platformPageLabel(path)).toUpperCase();

      gsap.set(cols, { transformOrigin: "50% 100%", scaleY: 0 });
      gsap.set(labelEl, { opacity: 0, y: 28 });
      const timeline = gsap.timeline({
        onComplete: () => {
          router.push(path);
        },
      });
      timeline.to(
        cols,
        { scaleY: 1, duration: 0.72, stagger: 0.07, ease: EASE },
        0,
      );
      timeline.to(
        labelEl,
        { opacity: 1, y: 0, duration: 0.45, ease: EASE },
        0.28,
      );
    },
    [lenis, pathname, reduce, resetChrome, router],
  );

  apiRef.current.to = coverThenPush;

  const api = useMemo<PlatformTransitionApi>(
    () => ({
      to: (href, label) => apiRef.current.to(href, label),
    }),
    [],
  );

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      const raw = anchor.getAttribute("href");
      if (!raw || raw.startsWith("#")) return;
      let path = raw;
      try {
        const url = new URL(raw, window.location.origin);
        if (url.origin !== window.location.origin) return;
        path = url.pathname;
      } catch {
        return;
      }
      if (!isCoverRoute(path)) return;
      if (pathOnly(path) === pathOnly(pathname || "/")) return;
      event.preventDefault();
      coverThenPush(path, platformPageLabel(path));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [coverThenPush, pathname]);

  useEffect(() => {
    const path = pathOnly(pathname || "/");
    if (!pending.current) return;
    if (path !== pending.current) {
      resetChrome();
      return;
    }

    const cols = colsRef.current.filter(Boolean);
    const overlay = overlayRef.current;
    const labelEl = labelRef.current;

    const finish = () => {
      if (overlay) overlay.classList.remove("is-on");
      gsap.set(cols, { scaleY: 0, clearProps: "transform" });
      lenis?.start();
      lenis?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      busy.current = false;
      pending.current = null;
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    if (reduce) {
      finish();
      return;
    }

    const timeline = gsap.timeline({ onComplete: finish });
    timeline.to(labelEl, { opacity: 0, y: -18, duration: 0.28, ease: EASE }, 0);
    timeline.set(cols, { transformOrigin: "50% 0%" }, 0.05);
    timeline.to(
      cols,
      { scaleY: 0, duration: 0.72, stagger: 0.07, ease: EASE },
      0.08,
    );
  }, [lenis, pathname, reduce, resetChrome]);

  useEffect(() => {
    return () => {
      gsap.killTweensOf(colsRef.current.filter(Boolean));
      lenis?.start();
    };
  }, [lenis]);

  return (
    <PlatformTransitionContext.Provider value={api}>
      {children}
      <div ref={overlayRef} className="exo-pt" aria-hidden="true">
        <div className="exo-pt__cols">
          {Array.from({ length: COLS }, (_, index) => (
            <div
              key={index}
              className="exo-pt__col"
              ref={(node) => {
                if (node) colsRef.current[index] = node;
              }}
            />
          ))}
        </div>
        <p ref={labelRef} className="exo-pt__label" />
      </div>
    </PlatformTransitionContext.Provider>
  );
}
