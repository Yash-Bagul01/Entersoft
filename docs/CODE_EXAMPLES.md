# Code Examples and Implementation References

Short excerpts of real code from the repository, each with an explanation. Line numbers match the working tree as of 31 Oct 2026. Longer walkthroughs of the animation examples are in [ANIMATIONS_AND_INTERACTIONS.md](ANIMATIONS_AND_INTERACTIONS.md).

| # | Example | File |
|---|---|---|
| 1 | Next.js page with metadata and JSON-LD | `src/app/services/penetration-testing/page.tsx` |
| 2 | Static generation of a dynamic route | `src/app/solutions/[slug]/page.tsx` |
| 3 | Reusable component with variants | `src/components/ui/Button.tsx` |
| 4 | Data-driven card system | `src/components/sections/ServicesShowcase.tsx` |
| 5 | Custom hooks | `src/hooks/useReducedMotion.ts`, `src/hooks/useMagnetic.ts` |
| 6 | GSAP ScrollTrigger timeline | `src/components/sections/Hero.tsx` |
| 7 | Framer Motion presence | `src/components/sections/ServicesShowcase.tsx` |
| 8 | Lenis integration | `src/components/layout/SmoothScrollProvider.tsx` |
| 9 | Three.js scene | `src/components/sections/TrackRecord3DCylinder.tsx` |
| 10 | Responsive layout | `src/components/sections/ServicesShowcase.tsx` |
| 11 | Touch-aware navigation interaction | `src/components/sections/ServicesShowcase.tsx` |
| 12 | Form handling | `src/components/sections/FinalCTA.tsx` |
| 13 | Shared-singleton DOM sync | `src/components/ui/LandingGradient.tsx` |
| — | API / data fetching | **Not present.** The site has no API routes or runtime fetches. |

---

## 1. A Next.js page: metadata, canonical, JSON-LD, template

```6:30:src/app/services/penetration-testing/page.tsx
const TITLE = "Penetration Testing Services | CREST-Accredited | Entersoft";
const DESCRIPTION =
  "Identify exploitable risk across applications, networks, cloud infrastructure and identity systems with CREST-accredited penetration testing.";
const CANONICAL = getCanonicalUrl(ROUTES.services.vapt);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL,
  },
  // openGraph + twitter ...
};
```

```58:66:src/app/services/penetration-testing/page.tsx
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceCasePage slug="vapt" />
    </>
  );
```

**How it works.** The page is a server component.
- It builds its canonical URL from the central `ROUTES` registry, so URLs live in one place.
- It emits breadcrumb JSON-LD.
- It hands everything else to the shared client template. The slug `"vapt"` selects the data.

`dangerouslySetInnerHTML` is safe here because the object is static and passed through `JSON.stringify`.

## 2. Static generation of a dynamic route

```22:27:src/app/solutions/[slug]/page.tsx
export function generateStaticParams() {
  return SOLUTION_LANDINGS.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;
```

**How it works.**
- `generateStaticParams` tells the build which slugs to pre-render.
- `dynamicParams = false` makes every other slug return 404 automatically.
- In Next 16, `params` is a Promise. That is why the route and `generateMetadata` both call `await params` (see [PROJECT_ARCHITECTURE.md §5](PROJECT_ARCHITECTURE.md#5-template-architecture-data--template--route)).

## 3. Reusable component with variants

```13:31:src/components/ui/Button.tsx
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asLink, href, target, rel, children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center font-mono uppercase tracking-wider text-[11px] font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary cursor-pointer active:scale-[0.98]";

    const variantClasses = {
      primary: "btn-sweep btn-sweep-primary",
      secondary: "btn-sweep btn-sweep-secondary",
      ghost: "bg-transparent text-[var(--text-secondary)] hover:text-[#F6F5F0] hover:bg-white/[0.02]"
    };
    // sizeClasses ...
    const combinedClasses = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
```

**How it works.**
- Variant and size maps are merged with `cn()` (`clsx` plus `tailwind-merge`). Merging means a `className` passed in by a caller can override a default class without conflicts.
- Keyboard focus shows a ring (`focus:ring-accent`).

**Caveat.** When `asLink` is set, the component renders `<a>` without the forwarded `ref`, so wrappers that need a ref (such as `MagneticButton`) don't work on link buttons.

## 4. Data-driven card system (image stack)

```99:113:src/components/sections/ServicesShowcase.tsx
                {services.map((service, index) => {
                  const isOn = index === activeIndex;
                  const y = isOn ? "0%" : index < activeIndex ? "-108%" : "108%";
                  return (
                    <div
                      key={service.slug}
                      className="absolute inset-0 will-change-transform"
                      style={{
                        transform: `translate3d(0, ${y}, 0)`,
                        transition: reduce
                          ? "none"
                          : "transform 0.72s cubic-bezier(0.22, 1, 0.36, 1)",
                        zIndex: isOn ? 2 : 1,
                      }}
                    >
```

**How it works.**
- **Data source:** the seven `services` objects from `src/data/services.ts`.
- **Positioning:** every card is rendered at once and placed with transforms. Cards above the active one sit at −108%, cards below at +108%. The active card's position is computed from `activeIndex`, so the stack slides in the correct direction.
- **Performance:** only the transform animates, so the browser can composite it without layout work.
- **Reduced motion:** turns the transition off.

## 5. Custom hooks

### `useReducedMotion`

```5:16:src/hooks/useReducedMotion.ts
export function useReducedMotion(): boolean {
  const [shouldReduceMotion, setShouldReduceMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = setTimeout(() => {
      setShouldReduceMotion(mediaQuery.matches);
    }, 0);
```

**How it works.**
- About 100 components import this hook.
- It subscribes to `prefers-reduced-motion` changes, with a Safari fallback.

**Caveat.** It returns `false` on the first render and only updates after a `setTimeout(0)`.

### `useMagnetic`

See [ANIMATIONS_AND_INTERACTIONS.md §5.1](ANIMATIONS_AND_INTERACTIONS.md#51-magnetic-buttons-usemagnetic--magneticbutton). It uses a vector clamp plus `gsap.to`, and is disabled on coarse pointers and with reduced motion.

## 6. GSAP ScrollTrigger timeline (Hero)

The full excerpt is in [ANIMATIONS_AND_INTERACTIONS.md §3.1](ANIMATIONS_AND_INTERACTIONS.md#31-hero-pinned-statement-crossfade).

**Key properties:**
- `pin: true`, `end: "+=300"`: the hero is held for 300px of scroll.
- `scrub: 0.4`: progress trails the scroll by 0.4s, which smooths it.
- Timeline positions `0.1` and `0.25`: the two text animations overlap.

The code runs inside `gsap.context()`, and `ctx.revert()` cleans it up.

## 7. Framer Motion presence (caption swap)

The full excerpt is in [ANIMATIONS_AND_INTERACTIONS.md §3.4](ANIMATIONS_AND_INTERACTIONS.md#34-servicesshowcase-hover-indexed-image-stack).

**How it works.**
- `AnimatePresence mode="wait"` waits for the outgoing caption to finish exiting before the next one enters.
- `key={active.slug}` makes React treat each service's caption as a new element, which is what triggers the exit and enter animations.
- The direction (`stackDown`) matches the image stack, so the caption and image move the same way.

## 8. Lenis integration

The full excerpt is in [ANIMATIONS_AND_INTERACTIONS.md §2](ANIMATIONS_AND_INTERACTIONS.md#2-lenis--gsap--scrolltrigger-the-single-clock).

**Key properties:**
- `gsap.ticker` drives `lenis.raf`, and every scroll calls `ScrollTrigger.update()`. This gives the whole site one clock.
- On touch-first devices (`(hover: none) and (pointer: coarse)`) and with reduced motion, `duration: 0` keeps native scrolling.

## 9. Three.js scene setup

The full excerpt is in [ANIMATIONS_AND_INTERACTIONS.md §3.3](ANIMATIONS_AND_INTERACTIONS.md#33-trackrecord3dcylinder-scroll-scripted-webgl).

**How it works.**
- `PerspectiveCamera` framing changes between compact and desktop screens.
- The renderer's pixel ratio is capped at 2.
- Physical glass materials sit over canvas textures.
- An `IntersectionObserver` pauses the render loop while the scene is off-screen.
- ScrollTrigger sets target values, and the render loop eases toward them each frame.

## 10. Responsive layout (fluid type and 12-column grid)

```76:81:src/components/sections/ServicesShowcase.tsx
      <div className="relative w-full flex flex-col justify-start px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
          <header className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <h2 className="font-normal text-[clamp(2.75rem,5.94vw,5.344rem)] leading-[0.95] tracking-[-0.06em] text-[#060606]">
                Enterprise Services
              </h2>
```

**How it works.**
- **Layout:** a single column below `lg` (1024px), and a 7/5 split on a 12-column grid above it.
- **Padding:** steps up at `sm` (375px in this project) and `lg`.
- **Headline size:** `clamp()` scales the heading with the viewport between a minimum and a maximum, so no extra breakpoints are needed.

## 11. Touch-aware navigation interaction

```59:65:src/components/sections/ServicesShowcase.tsx
  const onNameClick = (service: Service, index: number) => {
    if (!isFinePointer && activeIndex !== index) {
      setActive(index);
      return;
    }
    goToService(service);
  };
```

```51:57:src/components/sections/ServicesShowcase.tsx
  const goToService = (service: Service) => {
    if (transition) {
      transition.to(service.route, service.displayName);
      return;
    }
    router.push(service.route);
  };
```

**How it works.**
- **Touch devices:** the first tap selects a service, showing its image and caption the way hover does on desktop. The second tap navigates.
- **Navigation:** goes through the global page-transition context when it is available, and falls back to `router.push`.

## 12. Form handling (simulated submit)

The excerpt is in [PAGES_AND_FEATURES.md §8](PAGES_AND_FEATURES.md#8-forms-and-interactions).

**How it works.** The form uses controlled inputs, a presence guard, a double-submit lock (`isSubmitting`) and a timed success state.

**To make it real:**
1. Replace the `setTimeout` with a `fetch` to a Route Handler.
2. Validate on the server with a schema.
3. Rate-limit the endpoint.
4. Show error states.

## 13. Shared-singleton DOM synchronisation

```26:35:src/components/ui/LandingGradient.tsx
function track(el: HTMLElement) {
  if (tracked.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);
  }
  tracked.add(el);
  schedule();
}
```

**How it works.**
- **Shared listeners:** module-level state attaches one set of listeners when the first instance mounts and removes them when the last one unmounts. The `Set` acts as a reference count.
- **Batched updates:** `schedule()` combines all events within a frame into a single requestAnimationFrame callback.

This pattern suits any component used many times on a page that needs global events.
