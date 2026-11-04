import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Phones and tablets: no hover, finger input. Scrolling stays native here. */
export const TOUCH_FIRST_QUERY = "(hover: none) and (pointer: coarse)";

let touchQuery: MediaQueryList | null = null;

export function isTouchFirst(): boolean {
  if (typeof window === "undefined") return false;
  touchQuery ??= window.matchMedia(TOUCH_FIRST_QUERY);
  return touchQuery.matches;
}

let probe: HTMLDivElement | null = null;
let stableWidth = -1;
let stableHeight = 0;

/*
 * Reading innerWidth/innerHeight flushes pending style work, and the pinned sections ask for the
 * viewport several times per frame, so the size is cached until the next resize. The listener is
 * registered at module load so it runs before any component's own resize handler.
 */
let liveWidth = 0;
let liveHeight = 0;
let sizeDirty = true;
if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    sizeDirty = true;
  });
}

function readSize() {
  if (!sizeDirty) return;
  sizeDirty = false;
  liveWidth = window.innerWidth;
  liveHeight = window.innerHeight;
}

export function viewportWidth(): number {
  if (typeof window === "undefined") return 0;
  readSize();
  return liveWidth;
}

/*
 * On touch devices innerHeight grows and shrinks as the browser toolbar hides and shows,
 * which made pinned sections resize mid-scroll. Their math uses the small viewport (100svh)
 * instead, re-measured only when the width changes (rotation).
 */
export function viewportHeight(): number {
  if (typeof window === "undefined") return 0;
  readSize();
  if (!isTouchFirst()) return liveHeight;
  if (liveWidth !== stableWidth || !stableHeight) {
    if (!probe) {
      probe = document.createElement("div");
      probe.setAttribute("aria-hidden", "true");
      probe.style.cssText =
        "position:fixed;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none;";
      document.body.appendChild(probe);
    }
    stableWidth = liveWidth;
    stableHeight = probe.offsetHeight || liveHeight;
  }
  return stableHeight;
}

/*
 * Touch devices scroll on the compositor, so a stage switched to `position: fixed` from JS lands
 * a frame late and jerks. `sticky` is pinned by the browser itself; it needs html/body to clip
 * rather than hide horizontal overflow, which globals.css does for touch devices.
 */
export function canStickyPin(): boolean {
  if (!isTouchFirst()) return false;
  const clips = (el: Element) => {
    const x = getComputedStyle(el).overflowX;
    return x === "clip" || x === "visible";
  };
  return clips(document.documentElement) && clips(document.body);
}

let lastScroll = 0;
let listening = false;
let pending = 0;
const beforeRefresh = new Set<() => void>();

function markScroll() {
  lastScroll = performance.now();
}

/*
 * A ScrollTrigger refresh while a finger fling is still running cancels the momentum and can
 * throw the page back, so late layout refreshes wait until scrolling has been idle briefly.
 */
export function refreshWhenIdle(before?: () => void) {
  if (typeof window === "undefined") return;
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", markScroll, { passive: true });
    window.addEventListener("touchmove", markScroll, { passive: true });
    window.addEventListener("wheel", markScroll, { passive: true });
  }
  if (before) beforeRefresh.add(before);
  if (pending) return;
  const attempt = () => {
    if (performance.now() - lastScroll < 240) {
      pending = window.setTimeout(attempt, 140);
      return;
    }
    pending = 0;
    beforeRefresh.forEach((fn) => fn());
    beforeRefresh.clear();
    ScrollTrigger.refresh();
  };
  pending = window.setTimeout(attempt, 0);
}

export function cancelRefreshTask(before: () => void) {
  beforeRefresh.delete(before);
}
