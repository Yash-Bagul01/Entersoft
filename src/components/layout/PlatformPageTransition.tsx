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
import { PLATFORM_HUB_ITEMS, platformHubItemByHref } from "@/data/platformHub";
import { services } from "@/data/services";
import { ROUTES } from "@/config/routes";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import "./platform-page-transition.css";

const COLS = 5;
const EASE = "power4.inOut";
gsap.registerPlugin(ScrollTrigger);

export type PlatformExpandOpts = {
  from?: HTMLElement;
  image: string;
  video?: string;
  grown?: boolean;
};

type PlatformTransitionApi = {
  to: (href: string, label?: string, expand?: PlatformExpandOpts) => void;
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
  const expandRef = useRef<HTMLDivElement>(null);
  const expandImgRef = useRef<HTMLImageElement>(null);
  const expandVideoRef = useRef<HTMLVideoElement>(null);
  const expandShadeRef = useRef<HTMLDivElement>(null);
  const sourceElRef = useRef<HTMLElement | null>(null);
  const busy = useRef(false);
  const pending = useRef<string | null>(null);
  const modeRef = useRef<"wipe" | "expand" | null>(null);
  const apiRef = useRef<PlatformTransitionApi>({ to: () => {} });

  const resetChrome = useCallback(() => {
    const cols = colsRef.current.filter(Boolean);
    const overlay = overlayRef.current;
    const labelEl = labelRef.current;
    const expand = expandRef.current;
    gsap.killTweensOf([...cols, labelEl, expand, expandShadeRef.current]);
    if (overlay) overlay.classList.remove("is-on");
    if (expand) {
      expand.classList.remove("is-on");
      gsap.set(expand, { autoAlpha: 0, clearProps: "top,left,width,height,transform" });
    }
    if (sourceElRef.current) {
      sourceElRef.current.style.visibility = "";
      sourceElRef.current = null;
    }
    document.documentElement.removeAttribute("data-platform-expand");
    document.documentElement.removeAttribute("data-platform-expand-settle");
    gsap.set(cols, { scaleY: 0, clearProps: "transform" });
    gsap.set(labelEl, { opacity: 0, y: 0, clearProps: "transform" });
    lenis?.start();
    busy.current = false;
    pending.current = null;
    modeRef.current = null;
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [lenis]);

  const coverThenPush = useCallback(
    (href: string, label?: string, expand?: PlatformExpandOpts) => {
      const path = pathOnly(href);
      if (!isCoverRoute(path)) {
        router.push(href);
        return;
      }
      if (path === pathOnly(pathname || "/")) return;
      if (busy.current) return;
      busy.current = true;
      pending.current = path;
      modeRef.current = expand?.image ? "expand" : "wipe";
      router.prefetch(path);
      lenis?.stop();

      if (reduce) {
        router.push(path);
        window.setTimeout(() => {
          resetChrome();
        }, 40);
        return;
      }

      if (modeRef.current === "expand" && expand) {
        const layer = expandRef.current;
        const img = expandImgRef.current;
        const clip = expandVideoRef.current;
        const shade = expandShadeRef.current;
        document.documentElement.setAttribute("data-platform-expand", "1");
        if (img) img.src = expand.image;
        if (clip) {
          if (expand.video) {
            clip.src = expand.video;
            clip.poster = expand.image;
            void clip.play().catch(() => {});
          } else {
            clip.removeAttribute("src");
            clip.load();
          }
        }
        const preload = new Image();
        preload.src = expand.image;

        if (!layer) {
          router.push(path);
          return;
        }

        layer.classList.add("is-on");

        const source = expand.from;
        const rect = source?.getBoundingClientRect();
        const grown = Boolean(expand.grown);
        if (source && !grown) {
          sourceElRef.current = source;
          source.style.visibility = "hidden";
        }
        gsap.set(layer, {
          autoAlpha: grown ? 0 : 1,
          top: rect?.top ?? 0,
          left: rect?.left ?? 0,
          width: Math.max(rect?.width ?? window.innerWidth, 8),
          height: Math.max(rect?.height ?? window.innerHeight, 8),
        });
        gsap.set(shade, { opacity: 0 });
        const grow = grown ? 1.28 : 1.12;
        gsap
          .timeline({
            onComplete: () => {
              router.push(path);
            },
          })
          .to(
            layer,
            {
              top: 0,
              left: 0,
              width: () => window.innerWidth,
              height: () => window.innerHeight,
              duration: grow,
              ease: "power2.inOut",
            },
            0,
          )
          .to(
            layer,
            {
              autoAlpha: 1,
              duration: grown ? 0.72 : 0.01,
              ease: "power1.out",
            },
            grown ? 0.42 : 0,
          )
          .to(
            shade,
            { opacity: 1, duration: grown ? 0.78 : 0.55, ease: "power2.inOut" },
            grown ? 0.58 : 0.48,
          );
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
      to: (href, label, expand) => apiRef.current.to(href, label, expand),
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

      const fromHub = pathOnly(pathname || "/") === "/platform";
      const hubItem = platformHubItemByHref(path);
      if (fromHub && hubItem) {
        window.dispatchEvent(
          new CustomEvent("platform-hub-zoom", { detail: { href: path } }),
        );
        return;
      }

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
    const expand = expandRef.current;

    const finish = () => {
      if (overlay) overlay.classList.remove("is-on");
      if (expand) expand.classList.remove("is-on");
      if (sourceElRef.current) {
        sourceElRef.current.style.visibility = "";
        sourceElRef.current = null;
      }
      document.documentElement.removeAttribute("data-platform-expand");
      document.documentElement.removeAttribute("data-platform-expand-settle");
      gsap.set(cols, { scaleY: 0, clearProps: "transform" });
      gsap.set(expand, { autoAlpha: 0, clearProps: "top,left,width,height" });
      lenis?.start();
      lenis?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      busy.current = false;
      pending.current = null;
      modeRef.current = null;
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    if (reduce) {
      finish();
      return;
    }

    if (modeRef.current === "expand") {
      gsap.set(expand, {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        autoAlpha: 1,
      });
      const reveal = () => {
        document.documentElement.setAttribute("data-platform-expand-settle", "1");
        document.documentElement.removeAttribute("data-platform-expand");
        gsap.to(expand, {
          autoAlpha: 0,
          duration: 1.15,
          ease: "power2.inOut",
          onComplete: finish,
        });
      };
      requestAnimationFrame(() => requestAnimationFrame(reveal));
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
      <div ref={expandRef} className="exo-pt-expand" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={expandImgRef} alt="" className="exo-pt-expand__image" />
        <video
          ref={expandVideoRef}
          className="exo-pt-expand__image exo-pt-expand__video"
          muted
          loop
          playsInline
          autoPlay
        />
        <div ref={expandShadeRef} className="exo-pt-expand__shade" />
      </div>
    </PlatformTransitionContext.Provider>
  );
}
