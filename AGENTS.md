# Agent Guide: Stole Builder

This document provides context for AI agents working on the Stole Builder project.

## Project Overview

**What is this?** A web-based graduation stole customization tool for Expria LLC, a cultural embroidery business specializing in Lao/Southeast Asian designs.

**Purpose:** Replace back-and-forth customer messaging with a guided, self-serve design flow where customers can visualize their custom stole before ordering.

**Target Users:** Customers ordering custom graduation stoles with cultural embroidery.

**Design Philosophy:** The UI should feel like a cute early-2000s dress-up game—playful, cozy, nostalgic, and handmade—but not overly feminine. Gender-neutral and appropriate for all graduation ceremonies.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16+ | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations and transitions |
| Zustand | State management with undo/redo |
| html-to-image | Export designs as images |

## Architecture

### State Management

All stole configuration lives in a single Zustand store (`lib/store.ts`):

```typescript
// The core data model
interface StoleConfig {
  lengthInches: 62 | 72;
  stoleColor: StoleColorId;
  textileColor: TextileColorId;
  accentMetal: 'gold' | 'silver';
  trimStyleId: TrimStyleId;
  beadsEnabled: boolean;
  textileOrientation: 'straight' | 'angled';
  embroideryText: string;
  embroideryFlags: string;
  embroideryDesignNotes: string;
  fontPreference: FontPreferenceId;
  customFontRequest: string;
}
```

The store includes:
- `config` - Current stole configuration
- `past` / `future` - History arrays for undo/redo
- `hostMessage` - Current guidance text from host character
- Actions: `updateConfig()`, `undo()`, `redo()`, `reset()`, `setStep()`

### Component Hierarchy

```
app/builder/page.tsx
└── BuilderScreen.tsx (layout orchestrator)
    ├── Toolbar.tsx (undo/redo/reset)
    ├── Host.tsx (guide character + speech bubble)
    ├── Tool components (left rail)
    │   ├── LengthTool.tsx
    │   ├── StoleColorTool.tsx
    │   ├── TextileColorTool.tsx
    │   ├── AccentTool.tsx
    │   ├── BeadsTool.tsx
    │   ├── OrientationTool.tsx
    │   └── EmbroideryForm.tsx
    ├── StolePreview.tsx (center - layered SVG)
    │   ├── Hanger.tsx
    │   ├── StoleBase.tsx
    │   ├── TextilePanel.tsx
    │   ├── Trim.tsx
    │   └── Beads.tsx (conditional)
    ├── Receipt.tsx (right rail - pricing)
    └── ExportModal.tsx
        └── ExportCard.tsx (shareable image layout)
```

### Key Files

| File | Purpose |
|------|---------|
| `lib/types.ts` | All TypeScript type definitions |
| `lib/constants.ts` | Colors, fonts, pricing, host messages, business info |
| `lib/store.ts` | Zustand store with undo/redo history |
| `lib/pricing.ts` | `calculateTotal()` function for pricing |
| `lib/export.ts` | Image export utilities (PNG, JPEG, clipboard, share) |
| `app/globals.css` | Tailwind + custom CSS (pegboard, pinned cards, etc.) |

## Design System

### Color Palette

**Pegboard Theme:**
- `pegboard`: #8B7355 (main brown)
- `pegboard-light`: #A08B70
- `pegboard-dark`: #6B5A45
- `craft-cream`: #FDF6E3
- `craft-paper`: #F5E6D3
- `craft-wood`: #DEB887

**Stole Colors (8):** White, Ivory, Black, Navy, Burgundy, Forest Green, Royal Blue, Red

**Textile Colors (8):** Coral, Teal, Gold, Purple, Pink, Emerald, Sapphire, Crimson

### Typography

- **Display font**: Fredoka (playful headings)
- **Body font**: Quicksand (readable text)

### UI Patterns

- **Pinned cards**: Elements appear pinned to pegboard with shadow
- **Tool expansion**: Paint splotches fan out, crayons slide up
- **Speech bubbles**: Host guidance with tail pointing to avatar
- **Toggle switches**: Custom styled for beads on/off

## SVG Component Pattern

All SVG graphics in `components/svg/` follow this pattern:

```typescript
interface ComponentProps {
  color?: string;           // Dynamic fill color
  lengthInches?: 62 | 72;   // For length-dependent scaling
  selected?: boolean;       // Selection state
  onClick?: () => void;     // Interaction handler
  className?: string;       // Tailwind classes
}

export function Component({ color, lengthInches, className }: ComponentProps) {
  // Calculate dimensions based on length
  const scale = lengthInches === 72 ? 1.16 : 1;
  
  return (
    <motion.svg viewBox="..." className={className}>
      {/* SVG content with dynamic fills */}
      <path fill={color} ... />
    </motion.svg>
  );
}
```

**Important:** These are placeholder graphics. The business owner will provide ProCreate SVGs to replace them. Maintain the same props interface when swapping.

## Pricing Logic

Located in `lib/pricing.ts`:

```typescript
function calculateTotal(config: StoleConfig): PricingBreakdown {
  // Base price by length
  const base = PRICING.basePrice[config.lengthInches]; // 62" = $85, 72" = $95
  
  // Add-ons
  const beads = config.beadsEnabled ? PRICING.beadsAddon : 0; // $15
  const trim = PRICING.trimModifiers[config.trimStyleId];     // $0-10
  const embroidery = config.embroideryText ? PRICING.embroideryBase : 0; // $10
  
  return { lineItems: [...], subtotal, total };
}
```

## Common Tasks

### Adding a New Stole Color

1. Add to `STOLE_COLORS` in `lib/constants.ts`:
   ```typescript
   { id: 'new-color', name: 'New Color', hex: '#HEXCODE' }
   ```
2. Add type to `StoleColorId` in `lib/types.ts`

### Adding a New Trim Style

1. Add to `TRIM_STYLES.gold` or `TRIM_STYLES.silver` in `lib/constants.ts`
2. Add type to `TrimStyleId` in `lib/types.ts`
3. Add rendering logic in `components/svg/Trim.tsx`
4. Add price modifier in `PRICING.trimModifiers`

### Modifying the Export Card

Edit `components/builder/ExportCard.tsx`. The card renders:
1. Stole preview (scaled down)
2. Design summary with emoji bullets
3. Price estimate
4. Business branding (Expria LLC)

### Adding a New Tool

1. Create component in `components/tools/NewTool.tsx`
2. Use `useStoleStore()` to access/update config
3. Call `setStep('changed')` after updates for host feedback
4. Add to `BuilderScreen.tsx` in the tools section
5. Add any new config fields to `StoleConfig` type and `DEFAULT_CONFIG`

## Testing Checklist

When making changes, verify:

- [ ] All tool interactions update the stole preview immediately
- [ ] Receipt pricing updates correctly
- [ ] Undo/redo works for all changes
- [ ] Reset returns to default config
- [ ] Export modal generates correct images
- [ ] Animations are smooth (Framer Motion)
- [ ] No TypeScript errors (`npm run build`)

## Business Context

- **Company:** Expria LLC
- **Website:** https://expria.net
- **Product:** Custom graduation stoles with cultural (Lao/Southeast Asian) embroidery
- **"Textile":** Refers to the "sinh" pattern - a traditional Lao textile. In MVP it's a solid color overlay, not patterned.
- **Target market:** Graduating students wanting to honor their cultural heritage

## Known Limitations (MVP)

1. **No backend** - Config is client-side only, not persisted
2. **Placeholder graphics** - SVGs are simplified placeholders
3. **No pattern support** - Textile is solid color, not actual sinh patterns
4. **Desktop-first** - Mobile responsive but optimized for desktop
5. **Embroidery preview** - Text shown as simple overlay, not accurate rendering
6. **No cart/checkout** - Export for sharing only, no e-commerce integration

## Future Enhancements

Potential features for future iterations:
- Actual sinh pattern textures/images
- Backend to save designs and generate order forms
- E-commerce integration (Stripe, etc.)
- More accurate embroidery font previews
- Mobile-optimized UI
- Social sharing with OG images
- Design gallery/templates
