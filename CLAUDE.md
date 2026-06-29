# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server → localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the build locally
npm run lint      # oxlint
```

## Project

**ליאור הנדימן** — single-page Hebrew RTL landing site for Lior Maimon, Israeli handyman. Brand: "DJ של פרטים קטנים / עד הפרט האחרון". Primary CTA: WhatsApp. Target: mobile-first Israeli homeowners.

**Stack:** React 19 + Vite 8 + Tailwind CSS 3 + GSAP 3 (ScrollTrigger) + lucide-react. No TypeScript, no router, no tests.

## Architecture

Everything lives in **`src/App.jsx`** (~550 lines). All components defined in one file, top-to-bottom. `src/main.jsx` is the Vite entry — never touch it.

### Section render order

`Noise → Ticker → Navbar → Hero → Services → HowItWorks → About → Gallery → Testimonials → Contact → Footer → FloatingWA`

### Module-level constants (above all components)

| Constant | Purpose |
|----------|---------|
| `WA_HREF` | Full `wa.me` URL with pre-filled Hebrew message — use for **every** WA link, never construct inline |
| `WA_NUMBER` | Raw `972XXXXXXXXX` from `VITE_WA_NUMBER` env var (used in `tel:` href) |
| `PHONE_DISPLAY` | Human display string from `VITE_PHONE_DISPLAY` env var |
| `prefersReducedMotion()` | Call at top of every `useEffect` before any `gsap.context()` |
| `SERVICE_CARDS` | Hoisted array — keeps JSX icons out of component render cycle |
| `PAIRS` | Gallery before/after data |

### Environment variables

Stored in `.env` (committed — values are public phone numbers, not secrets). See `.env.example` for required keys. Both are `VITE_`-prefixed.

### GSAP pattern (Hero, About, Gallery, Contact)

```jsx
useEffect(() => {
  if (prefersReducedMotion()) return
  const ctx = gsap.context(() => {
    gsap.from('.cls', { y:40, opacity:0, ..., scrollTrigger:{ trigger:ref.current, start:'top 82%' } })
  }, ref)
  return () => ctx.revert()
}, [])
```

Do not add GSAP to Services or HowItWorks — ScrollTrigger's `opacity:0` initial state gets trapped on HMR.

### Gallery image paths

All images live in `public/` root. `GalleryCard` resolves `PAIRS` filenames:
- Starts with `/` → served from `public/` root (correct for all current images)
- No leading slash → prepended with `/gallery/` (legacy fallback — avoid)

Always use leading `/` for image paths in `PAIRS`.

### Design palette

| Role | Value |
|------|-------|
| Primary | `#7C3AED` / `#A78BFA` (violet) |
| Secondary | `#D97706` (amber — service cards, stars) |
| Dark bg | `#0D0A1A`, `#1E1028`, `#16082E` |
| Light bg | `#FAFAF8` |

Fonts: `font-heebo` for all UI text, `font-mono` (Space Mono) for tags and labels only. `font-serif` (Frank Ruhl Libre) is defined in tailwind.config.js but **not loaded** — do not use it.

Service cards use exactly **two** accent colors: violet for structural/install services (SHUTTERS, TV, DOORS, LIGHTING), amber for utility/repair (CARPENTRY, POOLS, SCREENS, PLUMBING, FAN, SOLAR). Do not add a third color.

### Mobile-specific behaviour

- `FloatingWA` uses `IntersectionObserver` on `#contact` — hides when Contact section is in view to avoid overlapping the CTA.
- Root div has `pb-24 md:pb-0` to clear the fixed FloatingWA on mobile.
- `safe-area-inset-bottom` on FloatingWA handles iPhone notch/home bar.

### Security

Headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, CSP) are configured in both `vite.config.js` (dev) and `vercel.json` (production). Both must stay in sync if headers change.

## Deployment

Vercel. Before deploying: `npm run build` (zero errors), confirm `VITE_WA_NUMBER` and `VITE_PHONE_DISPLAY` are set in Vercel environment variables (the `.env` file is committed but Vercel reads project env vars separately).
