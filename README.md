# Stole Builder

A minimal, representative stole mockup builder designed for order capture.

## What it does

- Guided 5-step wizard:
  - Colors & Trim
  - Fabric Panels
  - Embroidery Text
  - Patches
  - Review & Download
- Stylized realistic pointed stole preview with:
  - satin body shading
  - ornate metallic trim (`gold`/`silver`)
  - lower cultural fabric panels
  - tip fringe strands
- Free desktop placement for text and patch items (drag, rotate, resize)
- Mobile editing via tap-select + sliders
- Local export on review step:
  - `design-name_YYYY-MM-DD.png`
  - `design-name_YYYY-MM-DD.json`

## Stack

- Next.js App Router + TypeScript
- Zustand (state + undo/redo)
- Vitest + Testing Library
- Playwright (desktop + mobile)

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality gate

```bash
npm run test:strict
```

Runs:

- `npm run lint`
- `npm run build`
- `npm run test:unit`
- `npm run test:e2e`

## Key files

- `app/page.tsx`
- `components/layout/BuilderScreen.tsx`
- `components/steps/*`
- `components/preview/*`
- `components/editor/*`
- `components/summary/DesignSummary.tsx`
- `lib/types.ts`
- `lib/store.ts`
- `lib/presets.ts`
- `lib/canvas-constraints.ts`
- `lib/export-order.ts`
- `lib/geometry.ts`
