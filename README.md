# Stole Builder

A web-based graduation stole customization tool for [Expria LLC](https://expria.net), a cultural embroidery business. This app replaces back-and-forth customer messaging with a guided, self-serve design flow.

## Live Demo

Deploy to Vercel and visit your deployment URL.

## Features

- **Interactive Stole Designer** - Real-time preview of customizations
- **Playful UI** - Early-2000s dress-up game aesthetic with pegboard theme
- **Full Customization Options**:
  - Stole length (62" or 72")
  - 8 stole base colors
  - 8 textile panel colors
  - Gold (4 styles) or Silver (2 styles) trim
  - Beading/fringe toggle
  - Straight or angled textile orientation
  - Embroidery text, fonts, flags, and design notes
- **Live Pricing** - Receipt updates instantly as options change
- **Undo/Redo** - Full history tracking for design changes
- **Export & Share** - Save as PNG/JPEG, copy to clipboard, or use Web Share API
- **Guided Experience** - Host character provides step-by-step guidance

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Image Export**: html-to-image

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/cameronspears/stole-builder.git
cd stole-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
stole-builder/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home screen
│   ├── builder/page.tsx   # Main builder screen
│   ├── layout.tsx         # Root layout with fonts
│   └── globals.css        # Global styles + Tailwind
├── components/
│   ├── builder/           # Main builder UI components
│   │   ├── BuilderScreen.tsx   # Main layout orchestrator
│   │   ├── StolePreview.tsx    # Layered SVG stole display
│   │   ├── Receipt.tsx         # Pricing summary panel
│   │   ├── Host.tsx            # Guide character + speech bubble
│   │   ├── Toolbar.tsx         # Undo/Redo/Reset buttons
│   │   ├── ExportModal.tsx     # Save/share dialog
│   │   └── ExportCard.tsx      # Shareable design card layout
│   ├── tools/             # Customization tool components
│   │   ├── LengthTool.tsx
│   │   ├── StoleColorTool.tsx
│   │   ├── TextileColorTool.tsx
│   │   ├── AccentTool.tsx
│   │   ├── BeadsTool.tsx
│   │   ├── OrientationTool.tsx
│   │   └── EmbroideryForm.tsx
│   └── svg/               # SVG graphic components (placeholders)
│       ├── Hanger.tsx
│       ├── StoleBase.tsx
│       ├── TextilePanel.tsx
│       ├── Trim.tsx
│       ├── Beads.tsx
│       ├── HostAvatar.tsx
│       ├── PaintTube.tsx
│       ├── PaintSplotch.tsx
│       ├── CrayonBox.tsx
│       ├── Crayon.tsx
│       └── Ruler.tsx
├── lib/                   # Core logic and utilities
│   ├── types.ts          # TypeScript type definitions
│   ├── constants.ts      # Colors, fonts, pricing, messages
│   ├── store.ts          # Zustand state management
│   ├── pricing.ts        # Price calculation logic
│   └── export.ts         # Image export utilities
├── tailwind.config.ts    # Tailwind configuration
└── package.json
```

## Data Model

The stole configuration is managed as a single `StoleConfig` object:

```typescript
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

## Customization

### Swapping Placeholder Graphics

All SVG components in `components/svg/` are placeholders meant to be replaced with custom ProCreate graphics. Each component:

1. Accepts props for dynamic values (colors, dimensions)
2. Uses Framer Motion for animations
3. Can be replaced with custom SVG markup

**To replace a graphic:**
1. Export your SVG from ProCreate
2. Convert to a React component (or use inline SVG)
3. Wire up the existing props (e.g., `color`, `lengthInches`)
4. Maintain the same component interface

### Modifying Colors

Edit `lib/constants.ts`:
- `STOLE_COLORS` - Base stole fabric colors
- `TEXTILE_COLORS` - Textile panel colors
- Colors use `{ id, name, hex }` format

### Modifying Pricing

Edit `lib/constants.ts` → `PRICING`:
```typescript
export const PRICING = {
  basePrice: { 62: 85, 72: 95 },
  beadsAddon: 15,
  trimModifiers: { /* per trim style */ },
  embroideryBase: 10,
};
```

### Modifying Host Messages

Edit `lib/constants.ts` → `HOST_MESSAGES` to change the guided experience text.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy (zero configuration needed)

### Other Platforms

```bash
npm run build
# Deploy the `.next` folder or use `next start`
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run build` to verify
5. Submit a pull request

## License

Private - Expria LLC

## Contact

- **Business**: [Expria LLC](https://expria.net)
- **Repository**: [github.com/cameronspears/stole-builder](https://github.com/cameronspears/stole-builder)
