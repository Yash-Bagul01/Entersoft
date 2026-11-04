# Responsive Web Development

How the site adapts from large desktops down to phones in landscape, without losing its visual identity.

Related: [UI_UX_DESIGN_SYSTEM.md](UI_UX_DESIGN_SYSTEM.md) · [ANIMATIONS_AND_INTERACTIONS.md](ANIMATIONS_AND_INTERACTIONS.md)

---

## 1. Breakpoint system

| Name | Tailwind token (`@theme`) | Approx. usage in `.tsx` | JS / CSS equivalents |
|---|---|---|---|
| `xs` | 320px | 0 | — |
| `sm` | **375px** (not Tailwind's default 640) | ~460 | CSS `max-width:639px` / `min-width:640px` queries also exist |
| `md` | 768px | ~1,100 | `matchMedia("(min-width:768px)")` in InsightsBlog and DesignInMotion |
| `lg` | 1024px | ~490 | "compact" = `max-width:1023px` in Hero, TrackRecord, DesignInMotion and Lenis |
| `xl` | 1280px | ~5 | — |
| `2xl` / `3xl` | 1440 / 1920px | 0 | Layout tops out at `--max-width: 1400px` |

Other stylesheets add their own breakpoints: 480, 720, 800, 860, 900, 980 and 1080px. Those files are page-scoped (solutions, platform OVA, API security).

Two meanings to keep in mind:
- **768px** is where layout changes structure, for example showing the mobile list instead of the desktop stack.
- **1024px** is where motion strategy changes: smooth scrolling, camera framing and pin behaviour.

## 2. Techniques in use

| Technique | Examples |
|---|---|
| **Fluid typography** | `text-[clamp(2.75rem,5.94vw,5.344rem)]` (Enterprise Services), `clamp(1.05rem,1.6vw,1.35rem)`, `--section-padding: clamp(80px,10vw,160px)` |
| **Grid transformation** | `grid-cols-1 lg:grid-cols-12` with `lg:col-span-7/5`. DesignInMotion goes from a 3-column grid to 2 columns on compact screens. |
| **Viewport units** | `100dvh` hero, `100lvh` gradient flow layer, `md:-mt-[100vh]` overlaps, `w-[78vw] md:w-[36.25vw]` outcome cards |
| **Container width** | `--max-width: 1400px`; padding `px-5 sm:px-8 lg:px-12` |
| **Responsive images** | `next/image` with `sizes`, `fill` and `priority` for the first images. Raw `<img>` with CSS `object-fit` elsewhere. |
| **Input-mode detection** | `(hover: hover) and (pointer: fine)` vs `(pointer: coarse)` decides hover or tap behaviour |
| **Overflow prevention** | `html, body { overflow-x: hidden }` globally. The platform layout switches to `overflow-x: clip`, because `hidden` breaks `position: sticky` and adds a scroll container. |
| **iOS input zoom** | Inputs are forced to 16px |
| **Short landscape phones** | `@media (max-width:1023px) and (max-height:520px)` puts the hero copy back into normal flow |

## 3. Per-section behaviour (homepage)

| Section | Desktop (≥1024) | Tablet (768–1023) | Mobile (<768) |
|---|---|---|---|
| Hero | Pinned crossfade. Custom cursor. Absolute-positioned copy. | Compact pin offsets. No cursor on touch. | Restyled `.landing-hero`/`.hero-copy` (globals.css ~3132–3183). Landscape fallback. |
| TrackRecord cylinder | fov 36, camera z 8.15 | Compact: fov 32, z 11.2, smaller scale | Same compact framing; touch-drag rotate (0.005 rad/px) |
| ServicesShowcase | Hover selects; 12-column layout | Same, with tap behaviour on touch | Single column. First tap selects, second navigates. |
| Differentiators | Horizontal pinned travel; cards `36.25vw` | Same | Still horizontal; cards `78vw` (no separate mobile branch) |
| Testimonials / Certifications | Stripe wipe and sheet overlap | Stripe wipe (`md:flex`) | No stripes (`hidden md:flex`), normal flow (`md:-mt` only applies from md up) |
| DesignInMotion | 3×2 grid, 340vh pin | 2 columns | Different arc radius; 2 columns |
| InsightsBlog | Stacking pinned cards | Same (≥768) | Separate static `.insights-list` |
| Navbar | Mega menus for Platform, Services, Solutions; glass pill | Menu button → full-screen overlay | Full-screen overlay; first tap opens a flyout (≤767px) |
| Footer | 6-column directory, canvas wordmark | Fewer columns | Stacked; wordmark resizes through a ResizeObserver |

## 4. Motion adaptation

The aim is to keep the same **identity** on every device (typography, colour, imagery, section order) while making the **mechanics** lighter on touch and small screens:

- **Lenis.** Smooths mouse and trackpad scrolling at every window width. `duration: 0` on touch-first devices or with reduced motion, so finger scrolling keeps native momentum. `syncTouch: false`. `ScrollTrigger.config({ ignoreMobileResize: true })` stops address-bar resizes from re-laying-out the pins.
- **Touch pinning.** Differentiators, DesignInMotion and InsightsBlog pin with `position: sticky` on touch devices, and size themselves from a stable small-viewport height (`src/lib/viewport.ts`), so toolbar show/hide no longer shifts content. On phones the outcomes section's end hold is 0.4 screens instead of 1.42, and the stripe-wipe sheets don't slide.
- **Pointer-only effects off on touch.** The hero cursor, magnetic pull and hover tilt are disabled.
- **Desktop-only choreography.** The stripe wipe and the InsightsBlog stack become static on mobile.
- **3D.** The camera and scale are reframed rather than the scene removed. The DPR cap of 2 limits GPU cost on high-density phones.

## 5. Testing methods and coverage

**Methods used:**
- **Headless-browser screenshots** at set viewports, driven through the DevTools Protocol (for example `.tmp-nav-shots/align.mjs` at 1440×900). The Cursor sessions also used 1440 desktop captures in both themes. Typical audit widths were 1440, 1024, 768 and 390.
- **Antigravity responsive audits.**
  - "Full Responsive Audit & Surgical Fix" (21 Jul) set out these work items:
    - breakpoint tokens
    - render fixes
    - layout
    - per-section repairs
    - service pages
    - touch and performance
  - The verification plan was build + lint + manual viewport checks.
- **Cursor responsive audit batches** (Oct): "Batch 2: Platform Pages" and "Batch 4: Company Pages + Solutions QA".
- **Mobile commits:**
  - `0b27d7c` Cloud mobile
  - `39aee03` and `f916061` mobile versions
  - `c1e5f15` mobile ratio changes

**Not verified (no record found):**
- A systematic matrix of every route × every viewport × both themes.
- Real-device testing. Only emulated or headless captures are recorded.
- 2xl/3xl (1440+/1920+) behaviour beyond `--max-width`.
- Landscape tablets and foldables.
- The homepage dark-theme landing-gradient changes at mobile widths (Oct 31 verification was at 1440px).

## 6. Known responsive issues

- **`sm` breakpoint mismatch.** The `sm` token is 375px, but several CSS queries use 639/640px. Use one or the other consistently.
- **Differentiators on narrow phones.** The section has no mobile-specific branch, so the horizontal pin runs on phones too. Check its usability on narrow devices.
- **Dead mobile menu code.** `Navbar.tsx` still contains a mobile takeover menu that nothing opens.
