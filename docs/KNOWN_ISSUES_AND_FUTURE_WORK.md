# Known Issues, Technical Debt and Future Work

This is an evidence-based backlog. **Nothing here has been fixed as part of the documentation task.** Each item gives the evidence, the impact, a suggested next step, and a priority from P1 (do first) to P4.

Related: every other document links here.

---

## 1. High priority

| # | Issue | Evidence | Impact | Next step | P |
|---|---|---|---|---|---|
| 1.1 | **Browser profiles committed to the public repo** | Commit `1f0c3bf` added `.tmp-nav-shots/edge-profile*`, 1,820 files. `.gitignore` excludes only `.tmp-services-edge/`. | Cookies, session tokens or history may be exposed on GitHub | Treat any accounts used in those profiles as exposed and sign them out or rotate them. Remove the folders from history (`git filter-repo`), force-push after coordinating, and add `.tmp-*/` to `.gitignore`. | P1 |
| 1.2 | **Cloud sub-page links return 404** | `ROUTES.services.cloudResilience.*` builds `/services/cloud-security/<sub>` (`src/config/routes.ts` 73–80). The pages actually exist at `/services/cloud-resilience/<sub>`. Used by the sitemap and by the "Where it fits" section on the live cloud page. | Broken user journeys and 5 invalid sitemap URLs | Pick one path. Either move the pages to `/services/cloud-security/*`, or point `ROUTES` at `cloud-resilience`. Then fix the breadcrumb parents. | P1 |
| 1.3 | **Forms don't send data** | `FinalCTA.tsx` and `DiscussProjectModal.tsx` only run `setTimeout`, then show success. The modal copy promises a reply. | Leads are silently lost, and users see a false confirmation | Add a Route Handler or Server Action with server-side validation, rate limiting and spam protection, and connect it to email or a CRM. Until then, consider showing the `mailto:` fallback more prominently. | P1 |
| 1.4 | **Credential and claim wording conflicts with the SEO master** | "GDPR Compliant" (EU Data Protection Board) in `certifications.ts`; "CERT-In Accredited"; "zero false positives" in platform metadata; 13 vs 14 years. See §4. | Legal and credibility risk for a security vendor | Get business approval for corrected wording, then update the data files | P1 |
| 1.5 | **No security headers or CSP** | `next.config.ts` has no `headers()`, and there is no middleware | A weak security posture on a security company's own site | Add the headers proposed in [SEO_SECURITY_AND_DEPLOYMENT.md](SEO_SECURITY_AND_DEPLOYMENT.md#recommended-security-headers) | P1 |

## 2. Medium priority

| # | Issue | Evidence | Impact | Next step | P |
|---|---|---|---|---|---|
| 2.1 | 12 platform pages have no canonical; `/platform` and `/platform/enprobe` are missing from the sitemap | Route audit | SEO duplicate-content risk | Add `alternates.canonical` via `getCanonicalUrl`, and add both URLs to `sitemap.ts` | P2 |
| 2.2 | 307 alias redirects and a two-hop chain | 8 platform aliases plus `managed-cloud-security` use `redirect()` | Weaker link equity, an extra hop | Move them into `next.config.ts` with `permanent: true` and a direct target | P2 |
| 2.3 | `/booking` is a placeholder but is linked from the footer and the modal | `src/app/booking/page.tsx` | Dead-end conversion path | Embed the real booking tool, or link to the Google Calendar URL already used in `FinalCTA` | P2 |
| 2.4 | No custom 404 or error pages | No `not-found.tsx` / `error.tsx` | Off-brand failure states; the SEO checklist item stays open | Add both, styled with the design system | P2 |
| 2.5 | 3 ESLint errors (React Compiler rules) | `PlatformHubScene.tsx:182`, `TrackRecord3DCylinder.tsx:97`, `ServicesReel.tsx:435` | Possible stale-closure or impure-render bugs | Fix them: declare `startTurn` before use, move the `index` mutation into a ref, and read `performance.now()` in effects or handlers | P2 |
| 2.6 | 11 ESLint rules disabled | `eslint.config.mjs` | Hides real defects | Re-enable gradually, starting with `exhaustive-deps`, `no-unused-vars` and `no-img-element` | P3 |
| 2.7 | Undefined font variables | `--font-geist-sans`, `--font-jetbrains-mono` (`tokens.css` 20–22); self-referencing `--font-mono` / `--font-serif` in `@theme` | `font-display`, `font-mono` and the global heading font fall back to the inherited font | Point the tokens at the `next/font` variables that are actually loaded | P2 |
| 2.8 | Render-blocking Google Fonts `<link>`s for 8 families | `layout.tsx` 88–97 | Slower first render; lint warnings | Move them to `next/font`, scoped to the pages that use them | P2 |
| 2.9 | Hero video has no poster | `Hero.tsx`; `public/images/hero/poster.jpg` is unused | LCP and a blank first paint | Add `poster`, and consider `preload="metadata"` | P2 |
| 2.10 | Keyboard and ARIA gaps in navigation | Desktop mega menus are hover-only with no `aria-expanded`; `ExoMenuOverlay` has no focus trap; no skip link; two homepage H1s | Accessibility (WCAG 2.1 AA: 2.1.1, 2.4.1, 2.4.3) | Add focus and keyboard handling, a skip link, and a single H1 | P2 |
| 2.11 | WebGL resources not disposed; the scene is rebuilt on every theme toggle | `TrackRecord3DCylinder.tsx` cleanup only calls `renderer.dispose()` and `scene.clear()` | GPU memory growth | Traverse the scene and dispose geometries, materials and textures | P2 |
| 2.12 | Ticker callbacks run while their section is off-screen | Differentiators, DesignInMotion, InsightsBlog, `useStripeWipe` | Constant main-thread work on the homepage | Gate them with `IntersectionObserver`, or drive them from ScrollTrigger | P3 |
| 2.13 | Preview builds can be indexed if `NEXT_PUBLIC_APP_URL` is unset | `METADATA_BASE` falls back to production | Staging pages could appear in search | Set the variable in every environment; optionally fail the build when it is missing on non-production builds | P2 |
| 2.14 | Platform layout clears the saved theme | `src/app/platform/layout.tsx` cleanup removes `data-theme` | The user's theme choice is lost after leaving a platform page | Restore from `localStorage` instead | P3 |

## 3. Technical debt and cleanup (low risk, large payoff)

### 3.1 Legacy code inventory
These files are either only reachable on redirected URLs or not imported at all. Removing them, or moving them to an `archive/` branch, would shrink the codebase a lot and make searches accurate.

| Area | Legacy items |
|---|---|
| Service routes | `src/app/services/{appsec, vapt, cloud-resilience (page only), compliance-management, siem, smart-contract-audits, ai-ast}`. These can't render because of the 308 redirects. Keep only the redirects. |
| Service components | `AppSecPlatformPage`, `VAPTHero`, `RubiksCube3D`, `compliance-v2/`, `cyber-defense/`, `smart-contract-v2/`, `ai-zkpass/`, `ai-systems/`, `ai-systems-v2/`, `ai-systems-v3/`, `cloud/`, `cloud-v2/`, `visuals/`, `CloudSecurityPlatformPage`, `ServiceHero`, `ServiceProcess`, `ServiceCTA`, `ServiceFAQ`, `ServiceDeliverables`, `ServiceBreadcrumb`, `ServiceCaseHero`, `SIEMProofBand`, `CloudResilienceHubRoot` |
| Platform components | 11 of the 12 `roots/*` (all except `ExposureDecisioningRoot`), `sast/`, `sca/`, `sbom/`, `iac/Iac_*`, three secrets families (`NovaSecrets_*`, `Secrets_*`, `ThayonSecrets_*`), `api/Api{Hero,Proof,Showcase,Story}`, `asm/Asm{Hero,Fits,Gallery,Manifesto,Preloader}`, `common/PlatformFAQ`, `dast/ExoMotion.tsx` + `dast-exoape.css` (duplicates), most of `visuals/`, `IacExoapePage`, `EnprobeExoapePage`, `enprobeCase.ts`, `iacCase.ts` |
| Solutions | `SolutionLandingPage` (unreachable fallback), `SolutionDemoForm`, `SolutionCasePage`, `SolutionsShowcase`, `AiBomIncreasePage`, `solution-landing.css`, `solutions-work.css`, `solutionCases.ts` |
| Homepage and layout | `ValueProposition`, `CaseStudies`, `CustomCursor` (returns `null`), `FluidPreloader`, `LightFooter`, the unreachable mobile takeover inside `Navbar.tsx` |
| UI, hooks, lib | `CapabilityCard`, `ServiceHoverCard`, `BackgroundRippleEffect`, `RevealText`, `AnimatedCounter`, `useCursor`, `useScrollReveal`, `performanceTier.ts`, `stackTransition.ts`, `scrollTriggerHelpers.ts`, most of the exports in `animations.ts` |
| Data | `stats.ts`, `caseStudies.ts`, `aiSystems.ts`, `aiSystemsV2.ts`, `aiSystemsV3.ts`, `cloudSecurity.ts`, `cloudV2.ts`; the duplicate `managed-cloud-security` entry in `servicePagesData` |
| Dependencies | `@splinetool/react-spline` (never imported); `animejs` and `d3-force` (legacy only); `@types/animejs` (v3 types for v4) |
| Assets | `public/videos/hero-background-optimized.mp4`, `public/images/hero/poster.jpg` (use it instead, see 2.9). Audit `public/images` against the code references. |
| Root artifacts | The `.tmp-*` folders (screenshots and profiles), `.tmp-classify-unused.mjs`, `.tmp-eslint.txt`, `_dl-hub-cards.mjs`, `_extract_shapes.py`, the empty `scripts/` folder. Archive or ignore them. |

**Before deleting:** recheck importers with `rg`, run `tsc` and a build, and keep any visual or algorithm code you want for study (see the [Learning Syllabus](LEARNING_SYLLABUS.md)).

### 3.2 Other debt
| Item | Evidence | Next step | P |
|---|---|---|---|
| `globals.css` ≈ 3,630 lines, with many `!important` section and theme overrides that target utility class names | It caused the Turbopack timeout and slow recompiles | Move section CSS next to its components, or into CSS Modules. Theme with tokens rather than class-name selectors. | P3 |
| Tailwind `dark:` is not tied to `data-theme` | No `@custom-variant dark` | Add `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));` | P3 |
| `Familjen_Grotesk` is instantiated in about 10 files | Separate `next/font` calls | Define it once (e.g. `src/lib/fonts.ts`) and import it | P4 |
| `Button asLink` ignores the forwarded ref, so the hero CTA isn't magnetic | `Button.tsx` lines 40–45 | Forward the ref to the `<a>`, or use `next/link` | P3 |
| `Button asLink` renders a raw `<a>` and the mega-menu CTA uses `<a href>` | Full page reloads for internal links | Use `next/link` | P3 |
| Agency-portfolio labels on service pages | "Art Direction", "Creative Process", "See more projects" in `serviceCaseCopy.ts` / `ServiceCasePage.tsx` | Replace with security-practice labels (needs a business decision) | P2 |
| TrackRecord `CARDS_DATA` has 5 cards on 90° steps | Card 5 overlaps card 1 | Use 72° steps or 4 cards | P3 |
| TrackRecord comment says phase 3 starts at 0.38, but the code uses 0.45 | — | Align the comment with the code | P4 |
| `useReducedMotion` initial value is `false` | `setTimeout(0)` | Initialise from `matchMedia` lazily on the client, or use `useSyncExternalStore` | P3 |
| Service JSON-LD hard-codes the host and has a thinner schema than the legacy pages | Current service `page.tsx` files | Use the `seo.ts` helpers and add the `Service` type | P3 |
| No automated tests or CI | `package.json` | Add the Playwright smoke and link tests and a CI workflow (see the [testing doc](TESTING_AND_DEBUGGING.md#4-verification-workflow-recommended-standard)) | P2 |
| Copy inconsistencies | Accreditations JSON-LD typo "Empannelled"; "CRESTEmpanelled"; uTrade contact is CEO in one file and CISO in another | Correct after approval | P3 |
| ASPM page title and H1 disagree | "Vulnerability Management (ASPM)" vs "Exposure Decisioning" | Align with the SEO master | P3 |

## 4. Business content requiring approval

These claims are on **live** pages, unless noted. Under the SEO master's rules they must be reconciled with CRM, project or certificate records before they are published. They are listed as found; none has been verified or rejected.

| Claim | Source | Concern |
|---|---|---|
| "GDPR Compliant", authority "EU Data Protection Board" | `src/data/certifications.ts`. Shown in every ServiceCasePage footer and in the homepage certifications grid. | GDPR is not a certification. The master forbids "GDPR compliant" without evidence. |
| "CERT-In Accredited" | `testimonials.ts` | CERT-In *empanels* auditors |
| CREST wording varies: Registered, Approved, Empanelled, "CRESTEmpanelled" | `certifications.ts`, `enprobeCase.ts`, `testimonials.ts`, `services.ts` | The master uses "CREST-accredited". Each credential also needs scope, certificate number and a verification link (the current links go to the bodies' home pages). |
| "zero false positives" / "0.0% false positives" | `/platform/dast` and `/platform/agentic-pentesting` metadata; `dastCase.ts` | Forbidden by the master ("human-validated findings") |
| "100% Verified Exploits", "0% Production Impact", "100% Surface Coverage", "0% Production Downtime" | `dastCase.ts`, `agenticCase.ts` | Absolute guarantees |
| "without human bottlenecks" (agentic) | `agenticCase.ts` | Conflicts with "every finding is human-validated" |
| 13 vs 14 years; "Since 2013" | `companyPages.ts` (13 yrs), `aiZkpass.ts`/`services.ts`/TrackRecord ("14 years"), `industries.ts` ("thirteen years") | The master says to use "Since 2013" |
| 600+ clients, 12,000+ bugs proven, 100,000+ checks, 0.01% recurrence, 0 breaches | `companyPages.ts` (`/company/about`) | Need source records. `stats.ts` (legacy) has different meanings for the same numbers. |
| 300+ enterprises, 100+ fintech, 50+ blockchain customers, "1B+ USD raised", 15+ countries, 50+ orgs / 10k+ USD bounties | `companyPages.ts`, `industries.ts` | Need source records |
| "100% Findings Proven", "12k+ Vulnerabilities Found", "15 min" integration, "70+ Assurance Checks" | `services.ts` | Need source records |
| "70%+ false urgency", "top 12% critical flaws", "cutting noise by up to 70%" | `ExposureDecisioningRoot.tsx` (`/platform/aspm`) | Need a methodology or source |
| Homepage testimonial metrics ("$2.4B Assets Secured", "65% Faster Fix Rate", "100% HIPAA/GDPR Pass") for named organisations | `testimonials.ts` | Need client approval and verification. They may be placeholders. |
| Named quotes (e.g. a HIL / CK Birla Group executive; uTrade, Biogenex, Oakridge) | `dastCase.ts`, `companyPages.ts` | Need written consent |
| "15 industries, 30 countries, 450-plus companies"; an AT&T "93%" statistic | `resources/[slug]/page.tsx` | Need sources |
| Platform recognition lists show company credentials (CREST, CERT-In) on product pages | `*Case.ts` recognition arrays | Implies the product itself is accredited |
| EnProbe feature availability | Platform pages | The master requires GA / Private Preview / Planned labels. None are shown. |

## 5. Future improvements

| Theme | Improvement |
|---|---|
| Conversion | Real form backend; booking integration; service preselected on contact (master rule); analytics and conversion events |
| Content | Article pages with named author and reviewer (master rule); case studies to the 12-field standard; MITRE ATT&CK mapping for MDR and AI red-teaming; EnProbe status legend |
| SEO | Default OG image and per-page OG images; consistent canonicals; a complete sitemap; Service schema on current pages |
| Platform | Consolidate the three platform templates' shared motion into hooks; decide the fate of the `container`, `compliance-reporting` and `threat-intelligence` pages (they are not in the nav) |
| Engineering | Split `globals.css`; return to Turbopack once CSS is modular; add Playwright and CI; remove legacy code; restore lint rules |
| Performance | Hero poster; font consolidation; ticker gating; WebGL disposal; measure CWV with Lighthouse and RUM |
| Accessibility | Keyboard-operable menus, a skip link, a focus trap in the menu overlay, a single H1, a visible scrollbar option |
| Documentation | Keep this `docs/` set current: update the route table and known issues in the same PR as each change |
