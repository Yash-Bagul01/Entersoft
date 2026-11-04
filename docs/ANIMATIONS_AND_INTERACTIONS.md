# Animations and Interactions

How the motion on the site actually works: the shared scroll clock, each major animation, the libraries behind it, the parameters, how it adapts to screen size and motion preferences, and how it cleans up.

Every claim below comes from tracing imports from live routes.
- **Live** means a user can reach the animation today.
- **Legacy** means the code exists, but it only runs on a redirected route or in a component nothing imports.

Related: [ALGORITHMS_AND_PROGRAMMING_CONCEPTS.md](ALGORITHMS_AND_PROGRAMMING_CONCEPTS.md) · [PERFORMANCE_AND_OPTIMIZATION.md](PERFORMANCE_AND_OPTIMIZATION.md)

---

## 1. Motion architecture at a glance

| Layer | Responsibility | Live files |
|---|---|---|
| Clock | `gsap.ticker` drives Lenis and the custom `drive()` functions | `SmoothScrollProvider.tsx` |
| Scroll smoothing | Lenis (desktop only) | `SmoothScrollProvider.tsx` |
| Scroll-linked state | ScrollTrigger pins, scrubbed timelines, once-only reveals | Hero, TrackRecord, Footer, PlatformOvaPage, EnprobeOvaPage, ExoMotion, solution pages |
| Hand-built pins | Ticker-driven `position: fixed/absolute` switching plus manual progress | Differentiators, DesignInMotion, InsightsBlog, `useStripeWipe` |
| Declarative UI motion | Framer Motion | ServicesShowcase captions, scroll cue, dividers, many platform/solution sections |
| 3D | Three.js render loop, with targets fed by ScrollTrigger | `TrackRecord3DCylinder.tsx` |
| Procedural 2D | Canvas and SVG rAF loops | `LinedWordmark`, `FooterLineLink`, `HeroCursor`, `LandingGradient` |
| Ambient | CSS keyframes | Landing gradient, service-case gradients, marquees |
| Navigation | GSAP overlay transitions | `PlatformPageTransition`, `SolutionExpandOverlay` |
| Accessibility gate | `useReducedMotion()` plus `@media (prefers-reduced-motion)` | Everywhere |

**Two conventions are followed almost everywhere:**
1. GSAP code runs inside `gsap.context(() => {...}, scopeRef)` in a `useEffect`, and cleans up with `ctx.revert()`. This removes every tween and ScrollTrigger the component created, which matters for client-side navigation and for React Strict Mode double-mounting.
2. Per-frame values never go through React state. They are written with `gsap.set`, `style.transform` or CSS variables.

---

## 2. Lenis + GSAP + ScrollTrigger (the single clock)

File: `src/components/layout/SmoothScrollProvider.tsx`. It is mounted once in the root layout.

```43:61:src/components/layout/SmoothScrollProvider.tsx
    // Sync GSAP ScrollTrigger with Lenis scroll updates
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${e.progress ?? 0})`;
      }
    });

    const refreshHandler = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", refreshHandler);

    // Run Lenis tick within GSAP's ticker to prevent desync rubber-banding
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Enable lag smoothing to gracefully compensate for any main-thread frame hitches (500ms max lag, 33ms target)
    gsap.ticker.lagSmoothing(500, 33);
```

| Setting | Value | Why |
|---|---|---|
| `duration` | `1.2`, or `0` on touch-first devices (`TOUCH_FIRST_QUERY` in `src/lib/viewport.ts`) or with reduced motion | Mouse and trackpad input is smoothed at every window width; finger scrolling stays native |
| `easing` | `t => min(1, 1.001 - 2^(-10t))` | Exponential ease-out (expo) |
| `smoothWheel` | `!touchFirst && !reduce` | Re-created when the input mode changes (e.g. DevTools device mode) |
| `touchMultiplier` | 1 | — |
| `syncTouch` | `false` | Native momentum on touch |
| `ScrollTrigger.config` | `{ ignoreMobileResize: true }` | Mobile address-bar show/hide doesn't trigger a full refresh |
| `lagSmoothing` | `(500, 33)` | Prevents a large time jump after a frame stall |

**What the integration does:**
- **One clock.** `lenis.raf` runs inside `gsap.ticker`, so smoothing and GSAP share the same timestamp.
- **Scroll sync.** Each Lenis `scroll` event calls `ScrollTrigger.update()`, so pins and scrubs read the smoothed position in the same frame.
- **Refresh sync.** A ScrollTrigger refresh calls `lenis.resize()`, so Lenis learns the new page height after pins add spacing.
- **Anchor links.** A document click handler sends `#hash` links through `lenis.scrollTo(target, { offset: -80, duration: 1.4 })`.
- **Context.** `useSmoothScroll()` exposes the instance. These components use it:

  | Component | What it does with Lenis |
  |---|---|
  | `PlatformPageTransition` | `stop`/`start` around navigation, `scrollTo(0, {immediate})` |
  | `PlatformOvaPage` / `EnprobeOvaPage` | Wheel-snapped `scrollTo` |
  | `PlatformHubScene` | Stops Lenis while mounted |
  | `DiscussProjectModal` | Stops Lenis while open |
  | `HeroCursor` | Subscribes to `scroll` to keep its position in sync |

**Touch devices (Nov 2026 fix).** Native scrolling runs on the compositor, so the hand-built pins switched to `position: fixed` from JS landed a frame late and jerked (measured up to 26px on iPad landscape). On touch-first devices they now use `position: sticky` (`canStickyPin()`), their maths uses a stable small-viewport height (`viewportHeight()`) so toolbar show/hide no longer resizes them, and late `ScrollTrigger.refresh()` calls wait until scrolling is idle (`refreshWhenIdle()`), all in `src/lib/viewport.ts`. `globals.css` gives `body` `overflow: clip` on touch and ≤1023px screens because `sticky` breaks when `body` is a scroll container.

**Known gaps:**
- Because `useReducedMotion` starts as `false`, Lenis is created, destroyed and created again for reduced-motion users.

---

## 3. Homepage animations (live)

### 3.1 Hero: pinned statement crossfade
- **What you see:** the hero holds in place for about 300px of scroll. The H1 group fades and lifts away while a second statement fades in.
- **Trigger:** ScrollTrigger with `trigger: container`, `start: "top top"`, `end: "+=300"`, `pin: true`, `pinSpacing: true`, `scrub: 0.4`, `fastScrollEnd: true`.

```66:89:src/components/sections/Hero.tsx
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=300",
          pin: true,
          pinSpacing: true,
          scrub: 0.4,
          fastScrollEnd: true,
        },
      });

      tl.to(h1GroupEl, {
        opacity: 0,
        y: -30,
        ease: "power2.inOut",
        duration: 0.6,
      }, 0.1)
      .to(p2El, {
        opacity: 1,
        y: 0,
        ease: "power2.inOut",
        duration: 0.6,
      }, 0.25);
```

- **Parameters:**
  - `scrub: 0.4` makes the timeline trail the scroll by 0.4 s, which softens it.
  - The tweens start at positions 0.1 and 0.25, so the two texts overlap.
- **Responsive:** below 1024px a `compact` branch changes the statement's start offset.
- **Video:**
  - The source is `entersoft-command-plane.mp4`, served from S3.
  - It has no `poster`.
  - `play()` is forced in JS and retried on the first scroll, click or touch, because some mobile browsers block autoplay.
- **Reduced motion:** the effect is skipped, and the video is replaced with a static radial gradient.
- **Scroll cue:** Framer Motion animates `y: [0,5,0]` on an infinite loop.

### 3.2 HeroCursor: frosted lerp follower
- **What you see:** a frosted circle labelled "Scroll" follows the pointer inside the hero and grows over links and buttons.

```111:121:src/components/sections/HeroCursor.tsx
    const tick = () => {
      if (hasPointer) {
        syncFromPointer();
      }

      current.x = lerp(current.x, target.x, LERP);
      current.y = lerp(current.y, target.y, LERP);
      const half = cursor.offsetWidth / 2;
      cursor.style.transform = `translate3d(${current.x - half}px, ${current.y - half}px, 0)`;
      rafId = window.requestAnimationFrame(tick);
    };
```

- **How it works:**
  - **Motion:** `LERP = 0.1`, so each frame closes 10% of the remaining distance (exponential smoothing).
  - **Hover detection:** `document.elementFromPoint` hit-tests the element under the pointer and toggles `is-hover` over interactive elements.
  - **Rendering:** the element is portalled to `document.body`, so it escapes the pinned hero's transform.
  - **Scroll sync:** it re-syncs on Lenis scroll, because the pointer stays still while the page moves under it.
- **Disabled when:** the device has no hover, has a coarse pointer, or reduced motion is on. CSS hides it too.

### 3.3 TrackRecord3DCylinder: scroll-scripted WebGL
- **File:** `src/components/sections/TrackRecord3DCylinder.tsx` (~1,600 lines).
- **What you see:**
  1. A "DEFENSIVE PHILOSOPHY" statement colours in word by word over a top-down ring.
  2. The ring tilts upright into a cylinder of glass cards. The "Defense Measured in Certainty" header and the "ENTERSOFT" watermark fade in.
  3. The cylinder revolves through the cards.
- **Scroll driver:**
  - A ScrollTrigger created after a 120 ms timeout, with `start: "top top"`, `end: () => "+=" + (1200 + innerHeight)`, `pin: true`, `anticipatePin: 1`, `scrub: 0.6` and `invalidateOnRefresh: true`.
  - Its `onUpdate` does **not** tween anything. It writes **targets** (`targetRotation`, `targetTilt`, `targetScale`, opacities), and the Three.js loop eases toward them every frame.
- **Phase maths (by progress `p`):**

  | Progress | Phase | What happens |
  |---|---|---|
  | `p ≤ 0.16` | Philosophy | Per-word reveal through a `useMotionValue`. Each word's opacity, scale and colour come from `useTransform` over an overlapping window `(i+1.25)/total`. |
  | `0.16–0.45` | Unroll | Tilt goes from −π/2 to −0.015 through `gsap.parseEase("power2.out")`. Scale grows. Header and watermark fade in. |
  | `> 0.45` | Rotate | `rotation = −0.15 − t·1.5π`, so the cylinder turns through the cards |

  - **Velocity breathing:** scale also gains `velocity × 0.000015`, using `self.getVelocity()`.
  - The code comment says phase 3 starts at 0.38, but the branch checks 0.45.

- **Three.js setup:**

```895:915:src/components/sections/TrackRecord3DCylinder.tsx
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    const placeCamera = () => {
      if (compactFrame()) {
        camera.fov = 32;
        camera.position.set(0, -0.18, 11.2);
        camera.lookAt(0, -0.22, 0);
      } else {
        camera.fov = 36;
        camera.position.set(0, 0.04, 8.15);
        camera.lookAt(0, 0, 0);
      }
      camera.updateProjectionMatrix();
    };
    placeCamera();
    cameraRef.current = camera;

    // 2. WebGL Renderer with retina supersampling and alpha
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

| Element | Implementation |
|---|---|
| Geometry | One open `CylinderGeometry` arc per card (64 segments, a 90° slice minus a gap) |
| Front face | `MeshBasicMaterial` with a `CanvasTexture` drawn in 2D (gradients, glare, pills), `alphaTest`, anisotropic filtering up to 16× |
| Glass shield | `MeshPhysicalMaterial`: `transmission 0.94`, `ior 1.5`, `clearcoat 1`, `iridescence 0.12` |
| Back face | `BackSide` shell |
| Reflection | Mirrored group with `scale.y = -1` |
| Lights | `AmbientLight`, `DirectionalLight(4,6,8)`, and a mouse-following `PointLight` |
| Loop | rAF that exits early when off-screen. Values ease at 0.12–0.14 per frame. Idle drift. Hover tilt raises iridescence and lowers clearcoat roughness. The active card's texture is redrawn every third frame while hovered. |
| Interaction | Pointer and touch drag (0.0045 / 0.005 rad per pixel); prev/next buttons snap to π/2 steps |
| Visibility | `IntersectionObserver` (threshold 0.02) pauses rendering |
| Theme | A `MutationObserver` on `data-theme` rebuilds the scene, because colours are baked into the canvas textures |
| Responsive | `matchMedia("(max-width:1023px)")` switches camera fov and position and the card scale |
| Cleanup | `cancelAnimationFrame`, `renderer.dispose()`, `scene.clear()`. Individual geometries, materials and textures are **not** disposed (see the performance doc). |
| Reduced motion | ScrollTrigger is skipped and the scene starts upright |

- **Raycasting:** none. Hover is approximated from pointer position, not from mesh picking.

### 3.4 ServicesShowcase: hover-indexed image stack
- **What you see:** hovering a service name slides the image stack to that service's photo and swaps the caption.
- **Image stack:** a plain CSS transition on `transform: translate3d(0, ±108% | 0, 0)`, 0.72 s `cubic-bezier(0.22,1,0.36,1)`. Images above the active one sit at −108%, images below at +108%. The active image also does a slow 8 s `scale-105` "Ken Burns" zoom.
- **Caption swap:** Framer Motion `AnimatePresence mode="wait"`. The caption's direction follows the stack direction.

```135:153:src/components/sections/ServicesShowcase.tsx
                <AnimatePresence mode="wait" initial={false}>
                  {active && (
                    <motion.div
                      key={active.slug}
                      initial={reduce ? false : { opacity: 0, y: stackDown ? 14 : -14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: stackDown ? -10 : 10 }}
                      transition={{ duration: 0.38, ease: captionEase }}
                      className="flex flex-col gap-2"
                    >
                      {/* heading + body */}
                    </motion.div>
                  )}
                </AnimatePresence>
```

- **Touch:** on a non-fine pointer, the first tap selects and the second navigates. Navigation goes through `usePlatformTransition().to()`, the column wipe described in §8.

### 3.5 Differentiators: hand-built horizontal pin
- **What you see:**
  - Vertical scrolling moves a track of six outcome cards sideways. Each card rises into place as it enters.
  - The "Our practice" panel's background warms as it slides in. This happens in the light theme; in the dark theme it is solid navy.
- **Why it isn't a ScrollTrigger pin:**
  - The stage switches between `absolute top`, `fixed` and `absolute bottom` by hand.
  - The next section (`#operational-validation`) slides **over** this stage with `md:-mt-[100vh]`.
  - A ScrollTrigger pin-spacer would fight that overlap.

```88:112:src/components/sections/Differentiators.tsx
    const drive = () => {
      const range = Math.max(1, pin.offsetHeight - window.innerHeight);
      const raw = gsap.utils.clamp(0, 1, -pin.getBoundingClientRect().top / range);
      const travelPx = travel();
      const holdPx = hold();
      const moveUntil = travelPx / Math.max(1, travelPx + holdPx);
      const p = gsap.utils.clamp(0, 1, raw / moveUntil);

      const next = nextSec();
      const nextTop = next ? next.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
      const covered = nextTop <= 0;

      placeStage(raw, covered);
      gsap.set(track, { x: -travelPx * p, force3D: true });

      const vw = window.innerWidth;
      const rise = Math.round(Math.min(240, vw * 0.14));
      const restX = vw * 0.3;
      const enterX = vw * 1.02;
      cards.forEach((el) => {
        const left = el.getBoundingClientRect().left;
        const t = gsap.utils.clamp(0, 1, (enterX - left) / Math.max(1, enterX - restX));
        const eased = t * t * (3 - 2 * t);
        gsap.set(el, { y: (1 - eased) * rise, force3D: true });
      });
```

- **Pin height:** `innerHeight + travel + 1.42·innerHeight`. The `1.42·innerHeight` "hold" keeps the end state visible before the next section covers it.
- **Drivers:**
  - `drive()` runs on `gsap.ticker`, on `scroll`, and in a ScrollTrigger's `onUpdate`/`onRefresh`.
  - Refreshes run on image load and at 160, 600, 1400 and 2600 ms, because layout settles late.
- **Panel colour:** `gsap.utils.interpolate("#2a2a28", "#6a6760", vis²)`. A dark-theme CSS rule overrides it with `!important`.
- **Reduced motion:** all props are cleared and the content renders statically.

### 3.6 Stripe wipe: `useStripeWipe` (Testimonials, Certifications)
- **What you see (desktop):**
  - Six horizontal bars sweep across the screen.
  - At the same time, the incoming section's sheet slides up over the pinned previous section.

```36:47:src/hooks/useStripeWipe.ts
    const wipe = gsap.timeline({ paused: true });
    bars
      .slice()
      .reverse()
      .forEach((bar, i) => {
        wipe.fromTo(
          bar,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.42, ease: "none", transformOrigin: "50% 50%", force3D: true },
          i * 0.048
        );
      });
```

- **Timeline:** paused, never played on its own. The bars run in reverse order with `stagger 0.048`. `ease: "none"` keeps progress linear with scroll.
- **Sheet:** animates `yPercent` from 42 to 0.
- **Driver:** a ticker function sets `wipe.progress(clamp(0,1, 1 - root.top / innerHeight))`. It is purely geometric, with no ScrollTrigger.
- **Mobile:** the stripes container is `hidden md:flex`, so there is no wipe.
- **Bar colours:**

  | Theme | Bar colour |
  |---|---|
  | Light | `#eceffc` |
  | Dark | `#0c1a5c` |

- **Testimonials autoplay:** every 5 s, but only while the section is at least 35% visible (`IntersectionObserver`) and not hovered.

### 3.7 DesignInMotion: wheel → grid
- **What you see:**
  1. Six service cards sit on a dashed circular arc.
  2. On scroll the wheel rises.
  3. The cards then unfold into a 3×2 grid (2 columns on compact screens).
  4. A card that has landed flips on click (CSS `rotateY`) to show its back copy.
- **Phase maths:**
  - `rise = clamp(p / 0.58)`.
  - `unfold = clamp((p − 0.56) / 0.3)`.
  - Both are eased with a custom `easeInOutCubic`.
- **Card motion:**
  - **Start:** each card begins at an angle on the arc (`x = cx + R·sinθ`, `y = cy − R·cosθ`).
  - **Interpolation:** x, y, width, height, rotateX/Y/Z, scale and borderRadius are blended toward the grid cell.
  - **Stagger:** 0.04 per card.
  - **SVG arcs:** recomputed every frame, but written to React state only when the path string changes.
- **Pin:** hand-built, `3.4 × innerHeight` tall (`lg:h-[340vh]`).
- **Breakpoints:** mobile below 768px (different radius), compact below 1024px.
- **Reduced motion:** a static grid.

### 3.8 InsightsBlog: stacked briefs
- **Title:** the lines enter from `yPercent: 120, rotate: 8` with `stagger 0.08`, `power3.out`, 1.05 s. ScrollTrigger `start: "top 85%"`, `toggleActions: "play none none none"` (plays once).
- **Cards (desktop, ≥768px):**
  - **Timeline:** a paused GSAP timeline driven by `tl.progress(animP)` from a hand-built pin (`2.8 × innerHeight + hold`).
  - **Sequence:** three portrait cards slide up 0.2 apart, stack, then shrink into a 3-up row. Function-based values (`destFromCenter`) compute each card's final offset from the centre.
- **Mobile:** a separate static `.insights-list`.

### 3.9 CertificationsMarquee and Footer reveal
- **Certifications** uses the same stripe wipe as Testimonials. Despite the name, it is a static grid, not a marquee.
- **Footer reveal** (`Footer.tsx`):
  - **Trigger:** ScrollTrigger `start: "top 95%"`, `end: "top 20%"`, `scrub: 0.85`.
  - **Motion:**
    - `#certifications .ov-sheet` scales to `0.9` with `borderRadius: 40`.
    - The footer sheet goes from `yPercent` 14 to 0, and its top corners go from 56px to 0.
  - **Dark theme:** the certifications sheet has an `::after` fade into `#0b0b0b`, so the shrinking card meets the footer without a colour jump.
  - **Variants:** `flushCloser` routes use shorter offsets. Reduced motion zeroes the offsets.

### 3.10 LandingGradient (ambient, CSS + one rAF)
This effect is pure CSS motion. The only JS is a shared, rAF-batched scroll and resize handler that writes `--lg-y`:

```12:24:src/components/ui/LandingGradient.tsx
function sync() {
  frame = 0;
  const tops: number[] = [];
  tracked.forEach((el) => tops.push(el.getBoundingClientRect().top));
  let i = 0;
  tracked.forEach((el) => {
    el.style.setProperty("--lg-y", `${-tops[i++]}px`);
  });
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(sync);
}
```

- **Reads before writes:** all `getBoundingClientRect()` calls happen in one pass, then all writes in a second pass. Interleaving them would force a layout per element (layout thrashing).
- **One set of listeners:** a module-level `Set` holds every instance, so seven instances share one scroll listener, one resize listener and one `ResizeObserver`. They are attached when the first instance mounts and removed when the last unmounts.
- **Animation:**

  | Layer | Keyframes | Loop |
  |---|---|---|
  | `::before` | `landing-gradient-flow-a` | 64 s, linear |
  | `::after` | `landing-gradient-flow-b` | 28 s, reverse |
  | Flow layer | `landing-gradient-breathe` | 12 s |

  Each flow loop translates exactly one gradient period, so it loops without a seam.

---

## 4. Framer Motion usage

About 160 files import `framer-motion`.

| API | Count / examples |
|---|---|
| `motion.*` | Everywhere |
| `AnimatePresence` | 46 files (caption swaps, menus, modals, tab panels) |
| `whileInView` (+ `viewport={{ once: true }}`) | 64 files: section reveals |
| `whileHover` / `whileTap` | 8 / 4 |
| `variants` | 13 files |
| `useInView` | 15 files, mostly to pause canvas loops |
| `layoutId` | 3: shared-layout tab underline indicators |
| `useMotionValue` + `useTransform` | TrackRecord's per-word reveal, with a motion value driven from ScrollTrigger |
| `useScroll` | Only in the legacy VAPT page |
| Not used | `useSpring`, `useAnimate`, `LayoutGroup`, `Reorder`, `LazyMotion`, Framer's own `useReducedMotion` (the project's hook is used instead) |

`src/lib/animations.ts` defines shared tokens:
- `EASE` (smooth, weighted, snap)
- `DURATION` (0.3, 0.6, 0.9, 1.4)
- `STAGGER` (0.04, 0.08, 0.14)
- `PALANTIR_EASE = [0.22, 1, 0.36, 1]`
- variants: `fadeInUp`, `staggerContainer`, `clipPathReveal`, `fadeIn`, `scrollReveal`

In practice only `fadeInUpVariants` is imported. Most components inline the same values; `[0.22,1,0.36,1]` is the most common ease in the codebase.

**Division of labour:**
- **GSAP** owns anything tied to scroll position or needing timeline control.
- **Framer Motion** owns component-state transitions: mount and unmount, hover, and "on first view" reveals.

The two never animate the same property on the same element.

---

## 5. Interaction effects

### 5.1 Magnetic buttons (`useMagnetic` + `MagneticButton`)

```30:49:src/hooks/useMagnetic.ts
      if (distance < radius) {
        // Calculate displacement and cap it at 10px
        const rawX = deltaX * strength;
        const rawY = deltaY * strength;
        const pullDistance = Math.hypot(rawX, rawY);
        const maxDisplacement = 10;
        let pullX = rawX;
        let pullY = rawY;
        if (pullDistance > maxDisplacement) {
          pullX = (rawX / pullDistance) * maxDisplacement;
          pullY = (rawY / pullDistance) * maxDisplacement;
        }

        // Move element slightly towards cursor
        gsap.to(element, {
          x: pullX,
          y: pullY,
          duration: 0.3,
          ease: "power2.out",
        });
```

- **Pull:** inside the radius, the element moves by `delta × strength`. The pull vector is clamped to 10 px by normalising it, so the button never runs away from the cursor.
- **Return:** 0.5 s `power3.out`, with no overshoot.
- **Disabled when:** the pointer is coarse or reduced motion is on.
- **Caveat:** `MagneticButton` clones its child with a ref. `<Button asLink>` never attaches that ref to its `<a>`, so the hero CTA is probably not magnetic.

### 5.2 FooterLineLink: bending underline
- **What you see:** an SVG quadratic Bézier underline whose control point follows the pointer's x position.
- **Easing:** the curve's amplitude eases toward its target at 0.16 per frame, in a rAF loop.

### 5.3 LinedWordmark: canvas ripple
1. **Mask:** "ENTERSOFT" is drawn to an offscreen canvas.
2. **Line runs:** every 5 px row of the mask is scanned to find where the letters are, and each row becomes a set of horizontal segments.
3. **Ripple:** each frame, points near the pointer are displaced:

   `y += sin(0.045x + 7t + 0.08y) · 16 · exp(−d² / 14000)`

   This is a sine wave whose strength falls off with distance as a Gaussian.

- **Device pixel ratio:** capped at 2.
- **Resize:** a `ResizeObserver` rebuilds the mask.
- **Reduced motion:** the ripple is disabled, but the loop keeps running.

### 5.4 Not in use
- **`CustomCursor`:** returns `null`.
- **`useCursor`:** unused.
- **`CursorImageTrail`:** chips spawn every 55 px of mouse travel. It lives in a legacy cyber-defense hero.
- **`CapabilityCard`:** contains the repo's only `gsap.quickTo`, in an unused component.

---

## 6. Platform and solution page motion (live)

| Effect | File | Mechanics |
|---|---|---|
| ExoMotion `Reveal` / `Fade` | `src/components/platform/exoape/ExoMotion.tsx` | `Reveal`: `yPercent 110 → 0`, `power4.out`, 1.15 s, start `top 88%`, once. `Fade`: opacity plus y 22 → 0, 1.05 s, start `top 90%`. Used in all six ExoApe pages. |
| ExoApe collage | `ExoApeCaseStudy.tsx` | A `320vh` scrubbed section where collage images fly apart (parallax) |
| OVA recede | `src/components/platform/ova/PlatformOvaPage.tsx` | For each section, `scale 0.92`, `yPercent −7`, `filter: brightness(0.52)`, scrubbed from `top bottom` to `top top` (`scrub 0.5`) |
| OVA sector pin | same | `pin` with `endTrigger`, `pinSpacing:false`, `scrub 0.55`. `onUpdate` sets the active sector index. |
| OVA wheel snap | same | A non-passive `wheel` listener moves one step per gesture with `lenis.scrollTo(y, { duration: 0.62 })` |
| OVA "Since" | same | `pin`, `scrub 0.55`, `end: +=1.25·innerHeight` |
| Platform hub cube | `PlatformHubScene.tsx` | rAF-driven CSS-3D cube rotation between faces, while Lenis is stopped |
| Services reel | `ServicesReel.tsx` | rAF deck → arc → infinite reel. One card per wheel gesture. Arrow keys. |
| Solutions spiral | `SolutionsWorksGallery.tsx` | Cards posed on a spiral (`TWIST 0.96 rad`) with a rAF drift |
| Open-source flow | `OpenSourceFlowPage.tsx` | `gsap.matchMedia()` desktop pin plus `scrub 0.35` hero scale. `gsap.timeline({repeat:-1})` clip-path slideshow using `inset()` wipes. Both `mm.revert()` and `ctx.revert()` on cleanup. |
| Service case gradients | `src/components/solutions/solution-case.css` | CSS families such as `sc-galactic` (streaks 14 s/26 s, breathe 7 s) and `sc-prism` (flow 42 s period 1100, 18 s streaks, breathe 9 s) |

---

## 7. CSS motion inventory

- **`globals.css`** has 14 keyframes:
  - `cell-ripple`
  - `marquee`, `ed-marquee`, `ed-scan`
  - `site-footer-smoke` (14 s alternate)
  - `stories-quote-in`
  - `asm-phone-in`, `asm-sun`
  - `ticker-scroll-left`, `ticker-scroll-right`
  - `spin-slow`
  - `landing-gradient-flow-a`, `landing-gradient-flow-b`, `landing-gradient-breathe`
- **Other stylesheets** have 44 more: 26 in `solution-case.css`, 7 in `api-discovery-portal.css`, and the rest in the track-kpis, solutions-works and api-security stylesheets.
- **Transitions:**
  - button sweeps (`.btn-sweep`)
  - image hover zooms
  - the DesignInMotion card flip (`rotateY`, `preserve-3d`)
  - ServicesShowcase stack translation

---

## 8. Page transitions

### 8.1 PlatformPageTransition: column wipe and media expand
- **File:** `src/components/layout/PlatformPageTransition.tsx`.
- **Mounting:** mounted globally.
- **Trigger:** a **capture-phase** click listener intercepts internal links to `/platform/*` and `/services/*`. Components can also call `usePlatformTransition().to(href, label, expand?)` directly.

```mermaid
sequenceDiagram
  participant U as Click
  participant T as Transition provider
  participant L as Lenis
  participant R as Router
  U->>T: intercept link (capture phase)
  T->>L: stop()
  alt wipe mode
    T->>T: 5 columns scaleY 0→1 (0.72s, stagger 0.07, power4.inOut), label fades in
  else expand mode
    T->>T: media layer grows from clicked card rect to full screen (1.12s power4.inOut)
  end
  T->>R: router.push(href)
  R-->>T: pathname changes
  T->>L: scrollTo(0, {immediate:true}); start()
  T->>T: columns collapse from top / media fades out (1.45s)
  T->>T: requestAnimationFrame → ScrollTrigger.refresh()
```

- **Reduced motion:** navigates immediately.
- **Refresh:** `ScrollTrigger.refresh()` runs on the next frame so the new page's pins measure the final layout.

### 8.2 Solution expand overlay
- **Files:** `SolutionTransitionContext.tsx` and `SolutionExpandOverlay.tsx`.
- **State machine:** `idle → expanding → covering → idle`.
  1. **Start:** `startFromCard(rect, image, href)` measures the clicked card.
  2. **Expand:** the overlay animates `top`/`left`/`width`/`height` to the viewport (1.08 s `power3.inOut`).
  3. **Navigate:** `notifyExpanded()` calls `router.push`.
  4. **Arrive:** the destination page's `SolutionArrivalMarker` calls `markArrived()`, and the overlay fades out (`autoAlpha 0`, 0.88 s, delay 0.36).
- **Safety timeout:** after 3.2 s the overlay is released even if `markArrived()` never fires.
- **Shared:** used by the Solutions gallery, ServicesReel and ServiceCasePage.

---

## 9. Legacy motion (not reachable in production)

This code is kept for reference and learning. None of it runs on a live route.

| Technique | File | Notes |
|---|---|---|
| GLSL iridescence shader | `platform/iac/Iac_IridescenceBackground.tsx` | Full-screen quad, `OrthographicCamera(-1,1,1,-1,0,1)`. Fragment shader runs an 8-step iterated `cos`/`sin` flow field with a `smoothstep` mask and vignette. Uniforms `uTime`, `uMouse` (eased 0.05), `uResolution`. DPR ≤ 1.5. `try/catch` CSS fallback. Full dispose. |
| d3-force network | `services/cloud-v2/canvas/ForceGraph.tsx` | 42 nodes and ~78 links. `forceManyBody(-22)`, `forceLink(38)`, `alphaDecay 0.024`. Draws on `tick`. Stops at 2.8 s, then GSAP prunes the "excess" links and the graph re-settles. |
| Particle cloud | `cloud-v2/canvas/ParticleCloud.tsx` | 1,200 particles in three phases: chaos (bounce), formation (lerp 0.075 to cluster targets), idle wander |
| anime.js timelines | `CloudTopologyMap`, `IAMTree`, `AnimeTelemetryVisual`, `AppSecPlatformPage`, `RubiksCube3D` | `strokeDashoffset` line drawing, staggered scale-ins. `RubiksCube3D` passes the v3 option `easing` to the v4 API, which ignores it. |
| Three.js scenes | VAPT page, `HandsScene`, `RadarScene`, `Narrative3DVisual`, `AIGraphScene`, `Scroll3DCanvas`, `AICore3DVisual`, `CyberOntologyHero3DCanvas`, `ComplianceBackgroundCanvas` | Several use `IntersectionObserver` pausing, DPR 1 on mobile, and full disposal |
| Canvas visuals | `NoiseField` (24 fps cap), `ThreatWaveform` (30/60 fps), `GlitchGrid`, `TokenStream`, `FuzzingSimulator`, `SBOM_Hero`, `NovaSecrets_Hero` (Gaussian ridge terrain), `AppSecPlatformPage` (particle graph, links within 130 px) | Frame-interval throttling patterns |
| Stack transition helper | `lib/stackTransition.ts` | Pinned outgoing section plus `clipPath: inset((1−p)·100% 0 0 0)` reveal |

---

## 10. Reduced-motion matrix (live features)

| Feature | Reduced-motion behaviour |
|---|---|
| Lenis | `duration 0` (native scroll) |
| Stripe wipe on phones (<768px) | Always static: no stripes, sheet not slid (avoids an empty band, since phones have no section overlap) |
| Hero | No pin; static gradient replaces the video |
| HeroCursor | Disabled |
| TrackRecord | No scroll script; static upright cylinder |
| Differentiators / DesignInMotion / InsightsBlog | Static layouts |
| Stripe wipe | Stripes hidden |
| Testimonials autoplay | Off |
| Magnetic | Off |
| Page transitions | Immediate navigation |
| Landing gradient and other CSS keyframes | Stopped by media queries and the global `0.01ms` clamp |
| LinedWordmark | Ripple off (loop still runs) |

**Caveat:** `useReducedMotion` returns `false` on the first client render and updates in a `setTimeout(0)`. For one frame, motion code may initialise before it is torn down.
