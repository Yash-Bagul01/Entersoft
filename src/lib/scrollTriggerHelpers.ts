import { ScrollTrigger } from "gsap/ScrollTrigger";

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    ScrollTrigger.isTouch === 1 ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth < 1024
  );
}

export function createDesktopOnlyTrigger(config: ScrollTrigger.Vars) {
  if (typeof window === "undefined") return null;
  if (isTouchDevice()) return null;
  return ScrollTrigger.create(config);
}
