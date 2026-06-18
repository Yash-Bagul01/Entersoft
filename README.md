# Entersoft Security Website

An interactive, high-end cybersecurity flagship platform portal and landing page built with **Next.js (App Router)**, **TypeScript**, **TailwindCSS**, **Framer Motion**, and **GSAP**.

---

## 🛠 Features & Design Architecture

- **Interactive Services Showcase:** Responsive design adapting to three distinct layouts:
  - **Desktop (>=1024px):** Vertically stacked display rows. Hovering reveals a floating preview card (with abstract SVG designs and descriptions) following the pointer via GSAP `quickTo` coordinates.
  - **Tablet (768px - 1023px):** Split-pane panel displaying row elements on the left and a stationary preview card on the right that transitions on hover.
  - **Mobile (<768px):** Tap-to-reveal accordion rows expanding inline, ensuring search engines can fully crawl text indices for SEO.
- **Vibrant Neon Hover Colors:** Individual services highlight rows, SVGs, and card borders in distinct neon colors (appsec: Blue, vapt: Purple, cloud: Emerald, compliance: Gold, siem: Red, smart-contract: Pink, ai-ast: Cyan).
- **Glassmorphic Track Record Section:** Cards in the validated stats section are rendered as individual glass panels with backdrop blurs, floating shadows, background grid lines, and interactive lift animations.
- **Fail-safe Custom Cursor:** A dual-element white pointer (high-LERP inner dot + slower trailing outer ring) with body active class syncing. If the custom cursor script is not loaded or touch events disable it, the standard browser cursor automatically falls back to view.

---

## 🔑 Environment Variables Reference

A template file `.env.example` is provided in the root directory. To run this project locally, copy the template and configure your values:

```bash
cp .env.example .env.local
```

| Variable Name | Required | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | No (fallback provided) | `https://entersoftsecurity.com` | The canonical URL of the application. Used for metadataBase SEO mapping. |

---

## 🚀 Getting Started

### 1. Installation
Install project dependencies using your preferred package manager (NPM is recommended):

```bash
npm install
```

### 2. Run Local Development Server
Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the page.

### 3. Production Build & Execution
To compile a production bundle and run the static page optimization:

```bash
# Build the production bundle
npm run build

# Start the built application locally
npm run start
```

---

## 🏗 Directory Structure

```text
entersoft-web/
├── public/                 # Static assets (images, fonts, videos)
├── src/
│   ├── app/                # Next.js App Router root layout and globals.css
│   ├── components/
│   │   ├── layout/         # Header/Footer, SmoothScrollProvider, CustomCursor
│   │   ├── sections/       # Hero, Services, Stats, Differentiators, Case Studies
│   │   └── ui/             # Reusable UI button, reveal, and counter widgets
│   ├── data/               # Static mock data objects (blog, services, stats)
│   ├── hooks/              # Custom React hooks (useCursor, useReducedMotion)
│   ├── lib/                # Framer-motion animation configurations
│   └── styles/             # Shared styling token values
├── .env.example            # Environment template configuration
├── .gitignore              # Structured version control exclusions
├── next.config.ts          # Next.js bundler and compiler configs
└── tsconfig.json           # TypeScript compilation presets
```
