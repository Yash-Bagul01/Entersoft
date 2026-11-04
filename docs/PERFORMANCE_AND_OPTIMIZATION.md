# Performance and Optimisation

This document covers the performance techniques implemented in the codebase, where each one is used, and what it improves. It then lists the known performance risks.

**No measured Core Web Vitals or Lighthouse scores exist in the repository**, so none are reported here. §6 explains how to measure them.

Related: [ANIMATIONS_AND_INTERACTIONS.md](ANIMATIONS_AND_INTERACTIONS.md) · [KNOWN_ISSUES_AND_FUTURE_WORK.md](KNOWN_ISSUES_AND_FUTURE_WORK.md)

---

## 1. Rendering and delivery

| Technique | Where | Benefit |
|---|---|---|
| Static generation of every route | All routes; `[slug]` routes use `generateStaticParams` and `dynamicParams=false` (the last successful build generated 82 pages) | HTML served from cache with no server work per request, which helps TTFB and FCP |
| Server components for pages and the root layout | `src/app/**/page.tsx` | Metadata and markup with no client JS for the wrapper |
| Automatic per-route code splitting | Next/Webpack | Each route ships only its own client components |
| `router.prefetch` of likely next routes | `ServicesReel` (all service routes, production only), `PlatformPageTransition`, `SolutionsShowcase` | Near-instant navigation after the transition |
| `next/font` for Inter, Inter Tight, IBM Plex Mono and Familjen Grotesk | `layout.tsx`, sections | Self-hosted fonts with `font-display` handling and no layout shift from late font metrics |
| `next/image` | ServicesShowcase (`sizes="340px"`, `quality={85}`, `priority` on the first 2), Navbar logo, ~20 other files | Responsive sizes, lazy loading by default, modern formats; `images.qualities [75,85,95]` limits which quality variants can be requested |
| Remote image allow-list | `next.config.ts` `remotePatterns` (CloudFront, Unsplash) | Optimizer limited to trusted hosts |

## 2. Animation performance

| Technique | Where | Why it matters |
|---|---|---|
| **Transform- and opacity-only animation** | Almost all GSAP and CSS motion (`x`, `y`, `yPercent`, `scale`, `scaleY`, `opacity`); `force3D: true` | Runs on the compositor and avoids layout and paint |
| **One shared clock** (Lenis inside `gsap.ticker`) | `SmoothScrollProvider` | One rAF for scroll smoothing, ScrollTrigger and the drive functions; no conflicting loops |
| **`gsap.ticker.lagSmoothing(500, 33)`** | `SmoothScrollProvider` | After a long main-thread stall, animations resume smoothly instead of jumping |
| **Per-frame values kept out of React state** | All drive functions, TrackRecord, HeroCursor, LandingGradient | No re-render each frame |
| **State written only on change** | TrackRecord active index; DesignInMotion arc path strings | Limits React work to discrete events |
| **rAF coalescing and read-then-write batching** | `LandingGradient` (all `getBoundingClientRect` reads first, then all writes) | Avoids layout thrashing across 7 instances |
| **Shared singleton listeners** | `LandingGradient` (one scroll, one resize, one ResizeObserver for every instance) | Fewer handlers per scroll event |
| **Passive scroll listeners** | `{ passive: true }` throughout | The browser can scroll without waiting for JS |
| **Native scroll on touch, browser-pinned stages** | Lenis `duration 0` on touch-first devices; homepage stages use `position: sticky` there (`src/lib/viewport.ts`) | Pins stay in step with compositor scrolling; no one-frame jerk at pin start/end |
| **Idle-only layout refreshes** | `refreshWhenIdle()` replaces timed `ScrollTrigger.refresh()` kicks in the homepage sections | A refresh can no longer cancel a finger fling mid-scroll |
| **`will-change: transform`** | ServicesShowcase image stack and other selected layers | Promotes the layers ahead of time |
| **`ScrollTrigger.config({ ignoreMobileResize: true })`** | `SmoothScrollProvider` | No full refresh when the mobile address bar shows or hides |
| **Reduced-motion fallbacks** | ~100 files, plus the global CSS clamp | Less CPU and GPU use, and better accessibility |

## 3. WebGL / Three.js (`TrackRecord3DCylinder`)

| Technique | Detail |
|---|---|
| DPR cap | `setPixelRatio(Math.min(devicePixelRatio, 2))` |
| Off-screen pause | `IntersectionObserver` (threshold 0.02) plus an early return in the rAF loop |
| Amortised texture updates | The active card's canvas texture is redrawn every 3rd frame, and only while hovered |
| Eased targets instead of per-scroll tweens | ScrollTrigger only writes targets; one loop renders |
| `powerPreference: "high-performance"` | Requests the discrete GPU where available |
| Cleanup | `cancelAnimationFrame`, `renderer.dispose()`, `scene.clear()` |

**Gaps:**
- **No disposal of geometries, materials or textures on unmount.** `scene.clear()` detaches objects but does not free their GPU buffers.
- **Theme toggles rebuild the whole scene** through the MutationObserver. Without per-object disposal, each toggle can leave GPU memory allocated.
- **Recommendation:** traverse the scene and call `geometry.dispose()`, `material.dispose()` and `texture.dispose()`.
- Several legacy scenes (VAPT, AICore3D, Iac shader) do dispose fully and are good references.

## 4. Asset weight

| Asset | Notes |
|---|---|
| Hero video | Streams from S3 with `preload="auto"` and **no `poster`**. This likely affects LCP on the homepage. `public/images/hero/poster.jpg` exists but isn't used. |
| `public/videos` | 22 MP4s. The platform hub uses 16 clips of 2–12.7 MB each. `hero-background-optimized.mp4` (4.3 MB) is unused. |
| `public/images` | ~311 files (platform 153, solutions 122). Many are JPEGs served through `next/image`. Homepage sections still use raw `<img>` in places (55 raw `<img>` vs 43 `<Image>` repo-wide). |
| Fonts | 8 additional Google Fonts families load as render-blocking `<link>`s in `<head>`, on top of the `next/font` families. Some are used only on individual platform or solution pages. |
| CSS | `globals.css` is ~3,630 lines and global, so every route downloads every section's rules. It also made Turbopack time out at build. |
| JS | Many large client components (`ExoApeCaseStudy` ~1,080 lines, `TrackRecord3DCylinder` ~1,600, `ServicesReel`, `PlatformHubScene`). Legacy components aren't bundled unless something imports them, but legacy *routes* still compile. |

## 5. Known performance risks

1. **Hero LCP.** The hero is a remote autoplay video with no poster. Add a `poster` and consider a smaller first segment.
2. **Ticker callbacks run while off-screen.** Differentiators, DesignInMotion, InsightsBlog and both `useStripeWipe` users add `gsap.ticker` callbacks that run every frame for as long as the homepage is mounted, even when their section is off-screen. Each does `getBoundingClientRect` reads. Gate them with an `IntersectionObserver`, or drive them from ScrollTrigger `onUpdate`.
3. **Late-layout refreshes.** Timed `ScrollTrigger.refresh()` calls in Differentiators (160, 600, 1400, 2600 ms) each cost a layout pass. They exist because images settle late; give images intrinsic sizes instead.
4. **Render-blocking fonts.** Move the Google Fonts `<link>`s to `next/font`, scoped to the pages that use them.
5. **Global CSS size.** Split section and page CSS into the files that need it, or into CSS Modules.
6. **WebGL disposal** (§3).
7. **Possible double mounts.** `Navbar` and `Footer` are imported again by some page roots (the accreditations page imports both and doesn't render them; `ServicesReel` and `SolutionsShowcase` import `Navbar`). Confirm nothing renders twice.
8. **Grain overlay.** The full-viewport fixed SVG noise is cheap but always composited. It is fine at opacity 0.025; keep it static.

## 6. How to measure (recommended, not yet done)

```powershell
npm run build; npm run start          # production server on :3000
npx lighthouse http://localhost:3000 --preset=desktop --view
npx lighthouse http://localhost:3000 --form-factor=mobile --screenEmulation.mobile --view
```

- **In Chrome DevTools:**
  - Use the **Performance** panel with CPU throttling 4× to see ticker and rAF cost while scrolling the homepage.
  - Use the **Layers** panel to confirm what is composited.
  - Use the **Memory** panel to take a heap snapshot after toggling the theme several times, to check WebGL leaks.
- **Real-user data:** none is collected. Next's `useReportWebVitals` or an analytics provider would supply field values for LCP, INP and CLS.
