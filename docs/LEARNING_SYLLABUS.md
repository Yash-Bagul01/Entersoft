# Learning Syllabus: Engineering the Entersoft Website

A beginner-to-advanced curriculum built from this repository. Every topic is tied to real files, so you can learn the concept, find it in the code, and practise on it.

**Format of each topic:** **Level** · **What it is** · **Why the project needed it** · **Where / files** · **Subtopics** · **Example from the code** · **What to understand** · **Exercise**

Levels: 🟢 Beginner · 🟡 Intermediate · 🔴 Advanced

**Ground rules for the exercises:**
- Use a branch (`git switch -c learn/<topic>`).
- Run `npx tsc --noEmit` after each change.
- Never commit exercise changes to `main`.

**Suggested order:** Modules 1 to 6 as a foundation, then 8 and 11 (the core of this codebase), then the rest.

---

## Module 1: Web Development Fundamentals 🟢

### 1.1 HTML semantics and document structure
- **Level:** 🟢
- **What:** using elements for their meaning: `section`, `nav`, `header`, `blockquote`, `form`, `label`, headings.
- **Why:** accessibility, SEO, and stable hooks for animation (section `id`s).
- **Where:** homepage sections (`id="hero"`, `"services"`, `"capabilities"`, …); `<nav aria-label="Enterprise services">` in `ServicesShowcase.tsx`.
- **Subtopics:** heading outline, landmarks, `aria-label`, `alt`.
- **Example:** `Footer.tsx` animates `#certifications .ov-sheet`. Here an `id` is used as a cross-component contract.
- **Understand:** why two `<h1>`s on the homepage is a problem (see [KNOWN_ISSUES 2.10](KNOWN_ISSUES_AND_FUTURE_WORK.md#2-medium-priority)).
- **Exercise:** list every heading on `/` in DevTools. Propose which TrackRecord heading should become an `<h2>`.

### 1.2 CSS box model, positioning and stacking contexts
- **Level:** 🟢 → 🟡
- **What:** `position` (static, relative, absolute, fixed, sticky), `z-index`, stacking contexts, `overflow`.
- **Why:**
  - Overlapping sections use `md:-mt-[100vh]`.
  - The hand-built pins switch between `fixed` and `absolute`.
  - The landing gradient uses `z-index:-1`.
- **Where:** `Differentiators.tsx` (`placeStage`); `LandingGradient.tsx` plus the `.landing-gradient` CSS.
- **Subtopics:**
  - why a transformed ancestor breaks `position: fixed`;
  - why `overflow-x: hidden` on `html`/`body` breaks `sticky`;
  - `overflow: clip`.
- **Understand:** the comment in `LandingGradient.tsx`: *"Must sit inside a stacking context… so z-index: -1 stays above the host background."*
- **Exercise:** remove `z-index` from a host section in your branch and see where the gradient goes. Explain why.

### 1.3 How the browser renders a frame
- **Level:** 🟡
- **What:** style → layout → paint → composite; the compositor thread; layout thrashing.
- **Why:** every animation in this project is designed around it.
- **Where:** `LandingGradient.sync()` does all reads, then all writes; animations use only `transform` and `opacity`.
- **Understand:** why calling `getBoundingClientRect()` after a style write forces a synchronous layout.
- **Exercise:** record a Performance trace while scrolling the homepage. Find the "Recalculate Style" and "Layout" events.

### 1.4 Responsive fundamentals
- **Level:** 🟢
- **What:** the viewport meta tag, media queries, fluid units (`vw`, `dvh`, `lvh`), `clamp()`.
- **Where:** `layout.tsx` `viewport`; `clamp()` titles; `100dvh` hero; `100lvh` gradient layer.
- **Exercise:** explain why the gradient flow layer uses `lvh` while the hero uses `dvh`.

---

## Module 2: Advanced JavaScript 🟡

### 2.1 Closures and animation-loop state
- **What:** functions that capture variables from their enclosing scope.
- **Where:** each `useEffect` in `HeroCursor.tsx` and `TrackRecord3DCylinder.tsx` keeps `current`, `target` and `rafId` in a closure.
- **Understand:** why this state lives in a closure or ref and not in React state.
- **Exercise:** rewrite `HeroCursor`'s loop as a small class with `start()` and `stop()`, and compare the two.

### 2.2 Event handling, passive listeners, capture phase
- **What:** `addEventListener` options (`passive`, `capture`), `preventDefault`, event delegation.
- **Where:**
  - Passive scroll listeners everywhere.
  - Non-passive wheel listeners for snapping in `PlatformOvaPage.tsx`.
  - A capture-phase link interceptor in `PlatformPageTransition.tsx`.
  - Document-level hash-link delegation in `SmoothScrollProvider.tsx`.
- **Exercise:** explain why the page-transition click listener must run in the capture phase.

### 2.3 Browser observer APIs
- **What:** `IntersectionObserver`, `ResizeObserver`, `MutationObserver`, `matchMedia`.
- **Where:**
  - TrackRecord (IO pause, MO on `data-theme`)
  - Testimonials (IO autoplay)
  - LandingGradient and LinedWordmark (RO)
  - Navbar (MO)
  - `useReducedMotion` (`matchMedia`)
- **Exercise:** add an IntersectionObserver so `useStripeWipe`'s ticker callback only runs while its section is near the viewport.

### 2.4 requestAnimationFrame and timing
- **What:** frame-synchronised callbacks, timestamps, delta time.
- **Where:** `HeroCursor`, `LinedWordmark`, `FooterLineLink`, `LandingGradient` (coalescing), `gsap.ticker`.
- **Exercise:** make `HeroCursor`'s lerp frame-rate independent with `k' = 1 − (1−k)^(dt·60)`.

### 2.5 Modules, async/await, array methods
- **Where:**
  - `await params` in `[slug]` routes
  - `.map`, `.filter`, `.slice` across data rendering
  - `.slice().reverse()` in `useStripeWipe`
- **Exercise:** in `FinalCTA.tsx`, trace how `selectedServices` toggles using `filter` and spread.

---

## Module 3: TypeScript 🟡

### 3.1 Typing content models
- **What:** interfaces and types for data.
- **Where:** `Service` (`services.ts`), `ExoApeCase` (`platform/exoape/types.ts`), `PlatformOvaPageData` (`platformOva.ts`), `SolutionLanding`, `EditorialDoc`.
- **Exercise:** add an optional `status: "GA" | "Preview" | "Planned"` to the platform data type. The SEO master asks for this.

### 3.2 Literal types, `as const`, type guards
- **Where:** `ROUTES` and `SERVICE_SLUGS` (`as const`); `isSolutionLandingSlug(slug)` narrows a slug to the union of keys.
- **Understand:** how `as const` gives each path a literal type.
- **Exercise:** write `isServiceCaseSlug(s): s is ServiceCaseSlug` and use it in a test.

### 3.3 React typing
- **Where:** `React.forwardRef<HTMLButtonElement, ButtonProps>` in `Button.tsx`; `ReactElement` children in `MagneticButton`; `Metadata` from `next`.
- **Exercise:** change `Button` to forward its ref to the `<a>` branch too (polymorphic ref typing). This fixes the magnetic CTA.

### 3.4 Strictness trade-offs
- **Where:** `strict: true` in `tsconfig.json`, but `no-explicit-any` is off in ESLint, and `useMagnetic` uses `useRef<any>`.
- **Exercise:** replace that `any` with a generic `useMagnetic<T extends HTMLElement>()`.

---

## Module 4: React 19 🟡

### 4.1 Components, props, composition
- **Where:** `page.tsx` → template → sections (for example `ServiceCasePage slug="vapt"`).
- **Exercise:** draw the component tree of `/services/penetration-testing`.

### 4.2 Hooks and effect lifecycle
- **What:** `useState`, `useRef`, `useEffect` (setup and cleanup), `useLayoutEffect`, `useMemo`, `useCallback`.
- **Where:** every animated section. Cleanup with `ctx.revert()`.
- **Understand:** Strict Mode mounts components twice in development. Cleanup has to undo everything the setup did.
- **Exercise:** pick one animated section and list every listener, ticker callback and timer its effect adds, then confirm the cleanup removes each one.

### 4.3 Custom hooks
- **Where:** `useReducedMotion`, `useStripeWipe`, `useMagnetic`.
- **Exercise:** reimplement `useReducedMotion` with `useSyncExternalStore` so the first render is already correct.

### 4.4 Context for services
- **Where:** `useSmoothScroll()`, `usePlatformTransition()`, the `SolutionTransitionContext` API.
- **Exercise:** list every consumer of `useSmoothScroll()` and what each one does with Lenis.

### 4.5 Portals, cloneElement, refs to DOM
- **Where:** `DiscussProjectModal`, `HeroCursor` (portals); `MagneticButton` (`cloneElement`).

### 4.6 React Compiler rules
- **What:** purity and immutability during render.
- **Where:** the 3 lint errors (see the [testing doc](TESTING_AND_DEBUGGING.md#2-current-check-results)).
- **Exercise:** fix `ServicesReel.tsx:435` by moving `performance.now()` out of render.

---

## Module 5: Next.js 16 App Router 🟡

### 5.1 File-system routing and layouts
- **Where:** `src/app/**`, the root layout, and section layouts (platform, services, solutions).
- **Exercise:** explain why `services/vapt/layout.tsx` exists. Hint: it is the metadata-only layout for a client page.

### 5.2 Server vs client components
- **Where:** server `page.tsx` files and `"use client"` templates.
- **Understand:** what can and cannot cross the boundary (serialisable props).
- **Exercise:** find a section layout that is a client component and explain why. Hint: `usePathname`.

### 5.3 Static generation of dynamic routes
- **Where:** `generateStaticParams` and `dynamicParams = false` in `solutions/[slug]`, `company/[slug]`, `industries/[slug]`, `resources/[slug]`.
- **Exercise:** add a seventh solution slug to the data and confirm it builds and appears in the sitemap.

### 5.4 Metadata API and SEO routes
- **Where:** `metadata`, `generateMetadata`, `sitemap.ts`, `robots.ts`, `alternates.canonical`.
- **Exercise:** add canonicals to the 12 platform pages that lack them, using `getCanonicalUrl`.

### 5.5 Redirects and navigation APIs
- **Where:** `next.config.ts` `redirects()` (308); `redirect()` in pages (307); `useRouter().push`, `prefetch`, `notFound()`.
- **Exercise:** convert the platform aliases to config-level permanent redirects. Verify the result with `Invoke-WebRequest -MaximumRedirection 0`.

### 5.6 Fonts, images, scripts
- **Where:** `next/font/google`, `next/image` (`sizes`, `priority`, `quality` plus the `images.qualities` allow-list), `next/script` (`beforeInteractive` theme script).
- **Exercise:** move one Google Fonts `<link>` to `next/font` and remove a lint warning.

### 5.7 Bundlers: Webpack vs Turbopack
- **Where:** the `--webpack` flags and commit `dc482ac`.
- **Exercise:** read `node_modules/next/dist/docs/` on bundler options, then write down what would have to change to try Turbopack again.

---

## Module 6: CSS and Design Systems 🟡

### 6.1 Tailwind CSS 4 (CSS-first)
- **Where:** `@import "tailwindcss"` and the `@theme` block in `globals.css`; `postcss.config.mjs`; `cn()` in `src/lib/utils.ts`.
- **Subtopics:** custom breakpoints (note `sm = 375px`), arbitrary values, `@custom-variant`.
- **Exercise:** add `@custom-variant dark` tied to `data-theme` and convert one hard-coded dark override to `dark:`.

### 6.2 Design tokens and theming
- **Where:** `src/styles/tokens.css`; the theme script and `ThemeToggle.tsx`.
- **Exercise:** add a new token `--surface-section` for both themes and use it in one section instead of a hex value.

### 6.3 Flexbox and Grid layouts
- **Where:** the `grid-cols-1 lg:grid-cols-12` patterns; the DesignInMotion grid target.

### 6.4 Gradients, blend modes, seamless loops
- **Where:** `.landing-gradient*`; `solution-case.css` (`sc-galactic`, `sc-prism`).
- **Understand:** why translating by exactly one period of a repeating gradient loops without a seam (see the [algorithms doc §8](ALGORITHMS_AND_PROGRAMMING_CONCEPTS.md#8-seamless-looping-of-repeating-gradients)).
- **Exercise:** change the band period to 1000px and update the keyframe translation to match.

### 6.5 Specificity and `!important`
- **Where:** dark-theme overrides; `.practice-panel` beating GSAP's inline style.
- **Exercise:** list three `!important` rules that could be removed if the component read a token instead.

### 6.6 Typography systems
- **Where:** `next/font` variables, `clamp()` sizes, negative tracking; the undefined `--font-geist-sans` bug.
- **Exercise:** fix the heading and mono font tokens.

---

## Module 7: UI/UX and Information Architecture 🟢 → 🟡

### 7.1 Information architecture
- **What:** Platform, Services and Solutions, plus Company, Industries and Resources.
- **Where:** `navItems` in `Navbar.tsx`, `ExoMenuOverlay` `FLYOUTS`, the Footer columns, and the SEO master's navigation section.
- **Exercise:** sketch the user journey from homepage to booked briefing for a CISO who needs a penetration test. Mark every dead end, for example `/booking`.

### 7.2 Plain-language SEO naming vs brand naming
- **Where:** `plainLanguageTitle` and `displayName` in `services.ts`.
- **Exercise:** pick one live page and check its title and H1 against the master's rules.

### 7.3 Accessibility patterns
- **Where:** the focus trap in `DiscussProjectModal`; the gaps in `Navbar` and `ExoMenuOverlay`.
- **Exercise:** make one desktop mega menu keyboard-operable, with `aria-expanded`, Enter/Space to open and Escape to close.

### 7.4 Motion as UX
- **What:** narrative pins, progressive disclosure, touch parity, reduced motion.
- **Exercise:** turn on "prefers-reduced-motion" in DevTools and write down how each homepage section degrades.

---

## Module 8: Advanced Animation Engineering 🔴

### 8.1 GSAP core
- **What:** tweens, timelines, position parameters, eases, `gsap.set`, `gsap.utils` (`clamp`, `interpolate`), `gsap.context` with `revert`.
- **Where:** `Hero.tsx` (timeline position params 0.1 and 0.25); `Differentiators.tsx` (`utils`).
- **Exercise:** add a third element to the hero timeline at position 0.4 without breaking the crossfade.

### 8.2 ScrollTrigger
- **What:** `start`/`end`, `scrub`, `pin`, `pinSpacing`, `anticipatePin`, `invalidateOnRefresh`, `toggleActions`, `onUpdate`, `getVelocity`, `refresh`.
- **Where:** Hero, TrackRecord, Footer, PlatformOvaPage, InsightsBlog title.
- **Exercise:** add `markers: true` to the hero trigger and explain each marker.

### 8.3 Hand-built pins and progress-driven timelines
- **What:** a paused timeline plus `tl.progress(p)` driven by your own geometry.
- **Where:** `useStripeWipe.ts`, `InsightsBlog.tsx`, `DesignInMotion.tsx`, `Differentiators.tsx`.
- **Understand:** why overlapping sections (`-mt-[100vh]`) made ScrollTrigger pins impractical here.
- **Exercise:** rewrite `useStripeWipe` to use a ScrollTrigger with `scrub: true` and compare the behaviour.

### 8.4 Lenis smooth scrolling
- **Where:** `SmoothScrollProvider.tsx`.
- **Subtopics:** ticker integration, `ScrollTrigger.update`, `lagSmoothing`, touch policy, `scrollTo`, `stop`/`start`.
- **Exercise:** temporarily drive Lenis with its own rAF instead of `gsap.ticker` and observe the pinned sections jitter. Then revert.

### 8.5 Framer Motion
- **What:** `AnimatePresence mode="wait"`, `initial`/`animate`/`exit`, `whileInView`, `useMotionValue`/`useTransform`, `layoutId`.
- **Where:** `ServicesShowcase.tsx` captions; TrackRecord word reveal; `AnimatedDivider`.
- **Exercise:** add a direction-aware image caption swap to another component using the same pattern.

### 8.6 Page transitions
- **Where:** `PlatformPageTransition.tsx`, `SolutionTransitionContext.tsx`, `SolutionExpandOverlay.tsx`.
- **Exercise:** draw the state machine (idle → expanding → covering) and test what happens if `markArrived` is never called (the timeout).

### 8.7 CSS keyframe systems
- **Where:** `globals.css` (14 keyframes) and `solution-case.css` (26).
- **Exercise:** build a reduced-motion-safe marquee using `@keyframes` plus a media query.

---

## Module 9: Three.js and WebGL 🔴

### 9.1 Scene, camera, renderer
- **Where:** `TrackRecord3DCylinder.tsx`: `PerspectiveCamera(36,…)`, `WebGLRenderer({antialias, alpha, powerPreference})`, the DPR cap.
- **Exercise:** add a resize handler log and verify `camera.aspect` and `updateProjectionMatrix()` are called.

### 9.2 Geometry and materials
- **What:** `CylinderGeometry` arcs (thetaStart/thetaLength), `MeshBasicMaterial` vs `MeshPhysicalMaterial` (transmission, ior, clearcoat, iridescence), `BackSide`.
- **Exercise:** change `transmission` and `ior` and describe the visual difference.

### 9.3 Canvas textures
- **Where:** TrackRecord card faces drawn in 2D, turned into `CanvasTexture`, with `needsUpdate` and anisotropy.
- **Exercise:** draw a new badge into a card texture.

### 9.4 Lighting
- **Where:** ambient, directional and a pointer-following point light.

### 9.5 Render loops, visibility and disposal
- **Where:** the rAF loop with early return; the IntersectionObserver; the cleanup.
- **Exercise:** implement full disposal (traverse the scene and dispose geometries, materials and textures), then verify with a heap snapshot after 5 theme toggles.

### 9.6 Shaders (legacy reference)
- **Where:** `platform/iac/Iac_IridescenceBackground.tsx`: vertex and fragment GLSL, uniforms, a full-screen quad.
- **Exercise:** change the iteration count of the flow field and explain the effect.

### 9.7 Raycasting (not used; extension)
- **Exercise:** add a `Raycaster` so hovering a card highlights it precisely instead of relying on pointer-position heuristics.

---

## Module 10: Algorithms and Visual Computing 🔴

Use [ALGORITHMS_AND_PROGRAMMING_CONCEPTS.md](ALGORITHMS_AND_PROGRAMMING_CONCEPTS.md) as the textbook for this module.

| Topic | Files | Exercise |
|---|---|---|
| Lerp and exponential smoothing | `HeroCursor`, TrackRecord | Plot convergence for k = 0.05, 0.1, 0.2 |
| Easing (smoothstep, cubic, expo) | `Differentiators`, `DesignInMotion`, Lenis | Implement `easeOutBack` and try it on the card rise |
| Normalised progress and phases | `drive()` functions, TrackRecord | Add a fourth TrackRecord phase window |
| Polar coordinates and trigonometry | DesignInMotion arc, TrackRecord rotation | Place 8 cards evenly on the arc |
| Vector normalisation and clamping | `useMagnetic` | Make the cap scale with the button size |
| Gaussian falloff and sine waves | `LinedWordmark` | Change σ and the frequency, and describe the result |
| Run-length encoding of a mask | `LinedWordmark` | Change the row step from 5px to 3px; measure the cost |
| Viewport anchoring | `LandingGradient` | Explain why reads and writes are batched |
| Particle systems (legacy) | `cloud-v2/canvas/ParticleCloud.tsx` | Add mouse repulsion |
| Force-directed graphs (legacy) | `cloud-v2/canvas/ForceGraph.tsx` | Tune `forceManyBody` and `forceLink` |
| Frame throttling | legacy `NoiseField`, `ThreatWaveform` | Cap `LinedWordmark` at 30 fps when reduced motion is on |

---

## Module 11: Component and Application Architecture 🟡 → 🔴

### 11.1 Data-driven templates
- **Where:** `ServiceCasePage` with `serviceCases.ts` and `serviceCaseCopy.ts`; `PlatformOvaPage` with `platformOva.ts`; `ExoApeCaseStudy` with `*Case.ts`; `EditorialPage` with `EditorialDoc`.
- **Exercise:** add a new platform module page using `PlatformOvaPage` with only a new data object.

### 11.2 Adapter pattern for content
- **Where:** `serviceCaseCopy.ts` normalises five different source shapes into one.
- **Exercise:** add one field to `ServiceCaseCopy` and fill it from each source.

### 11.3 Central configuration
- **Where:** `src/config/routes.ts` (a single source of URLs) and `seo.ts`.
- **Exercise:** fix the `cloudResilience` route bug and confirm the sitemap updates automatically.

### 11.4 Separation of concerns and dead code
- **Where:** live code vs legacy code (see [KNOWN_ISSUES §3.1](KNOWN_ISSUES_AND_FUTURE_WORK.md#31-legacy-code-inventory)).
- **Exercise:** prove that `ServiceCaseHero.tsx` is unused with `rg`, then delete it on a branch and run `tsc` and `build`.

---

## Module 12: Performance Engineering 🔴

| Topic | Where | Exercise |
|---|---|---|
| Core Web Vitals (LCP, CLS, INP, FCP) | Hero video, fonts, images | Run Lighthouse (commands in the [performance doc](PERFORMANCE_AND_OPTIMIZATION.md#6-how-to-measure-recommended-not-yet-done)); add a hero `poster` and re-measure |
| Code splitting and dynamic import | Per route; legacy `next/dynamic` uses | Lazy-load `TrackRecord3DCylinder` with `next/dynamic` and compare the JS for `/` |
| Compositor-friendly animation | transform and opacity everywhere | Find one animation that changes layout and convert it |
| Main-thread budgeting | Ticker callbacks | Gate the drive functions with an IntersectionObserver; compare Performance traces |
| GPU memory | TrackRecord disposal | See Module 9.5 |
| Asset optimisation | `public/videos`, fonts | Audit unused assets with `rg` |

---

## Module 13: SEO and Web Security 🟡

| Topic | Where | Exercise |
|---|---|---|
| Canonicals and host strategy | `routes.ts` (`PRODUCTION_URL`, `IS_PRODUCTION_HOST`) | Explain what happens if `NEXT_PUBLIC_APP_URL` is unset on a preview build |
| Structured data | `seo.ts`, service pages | Validate the homepage JSON-LD in Google's Rich Results Test |
| Sitemap and robots | `sitemap.ts`, `robots.ts` | Write a script that fetches every sitemap URL and reports non-200 responses |
| Security headers and CSP | Not implemented | Add the proposed headers; fix the CSP violations you find in the console |
| Input validation and sanitisation | Forms (client only) | Design a Route Handler with server-side schema validation and rate limiting |
| Secret hygiene | `.gitignore`, the committed browser profiles | Explain the remediation steps for secrets found in git history |

---

## Module 14: AI-Assisted Software Engineering 🟡

| Topic | Evidence | Exercise |
|---|---|---|
| Plan → implement → verify loop | Antigravity `implementation_plan.md`, `task.md`, `walkthrough.md` | Write a plan in the same format for one known issue |
| Prompt patterns: design-lock, permitted files, audit-only, reference-driven | [AI_ASSISTED_DEVELOPMENT.md §4](AI_ASSISTED_DEVELOPMENT.md#4-prompt-engineering-patterns-used) | Write a design-locked prompt to fix the GDPR credential wording |
| Agent guardrails | `AGENTS.md`; the session constraints | Add a rule to `AGENTS.md` about not committing `.tmp-*` folders |
| Verifying AI output | Spot-checks, `tsc`, screenshots | Pick one claim in these docs and verify it in the source |
| Human oversight | CEO batches, approvals | List three decisions an agent should never make alone on this project |

---

## Module 15: Testing and Debugging 🟡

| Topic | Where | Exercise |
|---|---|---|
| Type checking | `npx tsc --noEmit` | Introduce a type error in a data file and read the message |
| Linting with React Compiler rules | 3 current errors | Fix them all |
| Browser debugging | DevTools Performance, Layers, Rendering | Use ScrollTrigger `markers` to debug the hero pin |
| Visual regression | Headless screenshot scripts (`.tmp-nav-shots/align.mjs`) | Write a Playwright test that screenshots `/` in both themes at 1440 and 390 |
| Route testing | — | Write a link checker for the sitemap; it should find the 5 cloud 404s |
| Reading build failures | The Turbopack timeout story | Reproduce `next build` (Turbopack) on a copy and read the error |

---

## Module 16: Git and Deployment 🟢 → 🟡

| Topic | Where | Exercise |
|---|---|---|
| Commits, history, `--stat` | 74 commits | Find which commit introduced `LinedWordmark` (`git log --diff-filter=A -- src/components/layout/LinedWordmark.tsx`) |
| `.gitignore` and repository hygiene | `.tmp-*` committed | Write the ignore rules that would have prevented it |
| Rewriting history safely | Browser-profile removal | Practise `git filter-repo` on a throwaway clone |
| Environment configuration | `.env.example`, `NEXT_PUBLIC_*` inlining | Explain build-time vs run-time env vars |
| Production build and serve | `npm run build; npm run start` | Build and smoke-test all routes locally |
| CI (to add) | — | Write a GitHub Actions workflow that runs `tsc`, `eslint` and `build` |

---

## Module 17: Cybersecurity Domain Knowledge 🟢 → 🔴

Use [CYBERSECURITY_DOMAIN.md](CYBERSECURITY_DOMAIN.md) as the reference for this module.

| Topic | Pages | What to learn | Exercise |
|---|---|---|---|
| AppSec testing: SAST, DAST, SCA, secrets, IaC, containers | `/platform/*`, `/services/application-security-testing` | Where each tool sits in the SDLC; source → sink taint analysis | Map each platform module to an SDLC stage |
| Software supply chain and SBOM | `/platform/sbom-license-risk`, `/solutions/manage-open-source-risk` | CycloneDX vs SPDX; transitive dependencies; licence risk | Generate an SBOM for this repo with a CycloneDX tool |
| API security | `/platform/api-security`, `/solutions/api-discovery` | OWASP API Top 10; shadow and zombie APIs | Explain BOLA with an example |
| Penetration testing | `/services/penetration-testing` | Rules of engagement, PTES, NIST SP 800-115, CVSS, retest | Write a rules-of-engagement checklist |
| Cloud security | `/services/cloud-security`, cloud sub-pages | CSPM, IAM, CIS Benchmarks, shared responsibility | Classify three misconfigurations by CIS control |
| Exposure management, ASPM, ASM, CTEM | `/platform/enprobe`, `/platform/aspm`, `/platform/attack-surface-management` | Prioritising by exploitability (KEV, EPSS) | Rank 5 CVEs using EPSS and KEV |
| AI security | `/services/ai-security-testing`, `/platform/ai-appsec`, `/solutions/ai-bom` | OWASP LLM Top 10, prompt injection, AI-BOM, NIST AI RMF | Write three prompt-injection test cases |
| Detection and response | `/services/managed-detection-response` | SIEM, MDR, detection engineering, MITRE ATT&CK (not yet on the site) | Map one detection to an ATT&CK technique |
| GRC and privacy | `/services/grc-compliance-privacy` | ISO 27001, SOC 2, PCI DSS, GDPR, DPDP, CERT-In directions | Explain why "GDPR certified" is a wrong claim |
| Web3 | `/services/smart-contract-security` | Reentrancy, oracle manipulation, fuzzing and invariants | Explain reentrancy with pseudocode |

---

## Module 18: Interview Preparation (project-based) 🟡 → 🔴

Practise answering these questions using this codebase as your example:

1. **Architecture:** "Walk me through how a page is rendered in this app, from `page.tsx` to the animated client component." See [PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md).
2. **Scroll engineering:** "How did you keep Lenis and ScrollTrigger in sync, and why does it matter?" (§2 of the animations doc)
3. **Trade-offs:** "Why build pins by hand instead of using ScrollTrigger `pin` in some sections?"
4. **Performance:** "How do you animate many elements without jank?" (transform/opacity, out-of-React writes, rAF batching, visibility gating)
5. **WebGL:** "How would you prevent GPU memory leaks in a React + Three.js component?"
6. **Next.js:** "Static generation of dynamic routes: what do `generateStaticParams` and `dynamicParams=false` do?"
7. **SEO:** "How do you prevent staging from being indexed while keeping canonicals pointed at production?"
8. **Accessibility:** "How does this site handle reduced motion, and where is it still weak?"
9. **Debugging story:** "Tell me about a build failure you diagnosed." (Turbopack timeout → Webpack)
10. **AI-assisted engineering:** "How did you use AI agents responsibly on this project?" (plans, design locks, approvals, verification)
11. **Security mindset:** "What would you fix first on this site from a security perspective?" (committed browser profiles, CSP and headers, form backend validation)
12. **Content integrity:** "How did business rules such as 'no zero-false-positive claims' affect the implementation?"

For each question:
- Prepare a two-minute answer.
- Name a file you can open and show.
- State one thing you would improve.
