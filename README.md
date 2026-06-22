# DesignEngine

A full-scene online 3D cloud design platform — featuring AI tools, 3D room design, floor plan editing, cloud rendering, and a material library.

## Features

### Landing Page
- Hero with AI prompt entry (Super Entrance)
- AI tools showcase banner
- Feature highlights (workflow, rendering, detail, video, assets)
- Industry solutions tabs (home, commercial, e-commerce, advertising, lighting, education)
- 3-step workflow, testimonials, and CTA sections

### AI Tools
- **AI Smart Design** — Chat-based 3D space generation with style presets and live preview
- **AI 3D Modeling** — Text or image to 3D model generation
- **AI Image Generation** — Photorealistic interior renders from prompts

### Design Tools
- **3D Room Designer** — Real-time 3D studio with furniture placement, materials, orbit controls (Three.js)
- **Floor Plan Editor** — 2D wall/door/window drawing with grid snap
- **Render Studio** — Cloud rendering with quality presets, day/night lighting, panorama & video modes
- **Material Library** — Searchable material and texture catalog

### Other Pages
- Industry solution pages (`/solutions/[slug]`)
- Pricing page with Free / Pro / Enterprise tiers

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## GitHub Pages (static hosting)

The site is configured for static export and deploys automatically to GitHub Pages on every push to `main`.

**Live URL:** [https://cllom.github.io/interior-design-engine/](https://cllom.github.io/interior-design-engine/)

### One-time setup (if not already enabled)

1. Open the repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds and publishes the `out/` folder

### Local static preview (matches GitHub Pages)

```bash
npm run build:pages
npx serve out
```

Then open `http://localhost:3000/interior-design-engine/` (or the URL shown by `serve`).

## Tech Stack

- **Next.js 15** (App Router)
- **React 19** + TypeScript
- **Tailwind CSS 4**
- **Three.js** + React Three Fiber + Drei
- **Framer Motion**

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── pricing/              # Pricing
│   ├── solutions/[slug]/     # Industry pages
│   └── tools/
│       ├── ai-design/        # AI Smart Design
│       ├── ai-modeling/      # AI 3D Modeling
│       ├── ai-image/         # AI Image Generation
│       ├── room-designer/    # 3D Studio
│       ├── floor-plan/       # Floor Plan Editor
│       ├── render/           # Render Studio
│       └── materials/        # Material Library
├── components/
│   ├── layout/               # Header, Footer, ToolLayout
│   └── landing/              # Landing page sections
└── lib/
    ├── data.ts               # Static content & catalogs
    └── utils.ts              # Utilities
```

## Note

AI features use simulated responses for demonstration. Connect real AI APIs (OpenAI, Stable Diffusion, etc.) and a backend rendering service for production use.
