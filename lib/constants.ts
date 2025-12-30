import type {
  StoleConfig,
  ColorOption,
  TrimStyle,
  FontOption,
  HostStep,
  StoleColorId,
  TextileColorId,
  TrimStyleId,
} from "./types";

export const STOLE_COLORS: ColorOption[] = [
  { id: "white", name: "White", hex: "#FFFFFF" },
  { id: "ivory", name: "Ivory", hex: "#FFFFF0" },
  { id: "black", name: "Black", hex: "#1A1A1A" },
  { id: "navy", name: "Navy", hex: "#1E3A5F" },
  { id: "burgundy", name: "Burgundy", hex: "#722F37" },
  { id: "forest-green", name: "Forest Green", hex: "#228B22" },
  { id: "royal-blue", name: "Royal Blue", hex: "#4169E1" },
  { id: "red", name: "Red", hex: "#B22222" },
];

export const TEXTILE_COLORS: ColorOption[] = [
  { id: "coral", name: "Coral", hex: "#FF6B6B" },
  { id: "teal", name: "Teal", hex: "#20B2AA" },
  { id: "gold", name: "Gold", hex: "#DAA520" },
  { id: "purple", name: "Purple", hex: "#9370DB" },
  { id: "pink", name: "Pink", hex: "#FF69B4" },
  { id: "emerald", name: "Emerald", hex: "#50C878" },
  { id: "sapphire", name: "Sapphire", hex: "#0F52BA" },
  { id: "crimson", name: "Crimson", hex: "#DC143C" },
];

export const TRIM_STYLES: Record<"gold" | "silver", TrimStyle[]> = {
  gold: [
    { id: "gold-classic", name: "Classic", description: "Simple gold edge band" },
    { id: "gold-ornate", name: "Ornate", description: "Decorative scrollwork" },
    { id: "gold-braided", name: "Braided", description: "Rope/braid texture" },
    { id: "gold-minimal", name: "Minimal", description: "Thin delicate line" },
  ],
  silver: [
    { id: "silver-classic", name: "Classic", description: "Simple silver edge band" },
    { id: "silver-modern", name: "Modern", description: "Geometric pattern" },
  ],
};

export const FONT_OPTIONS: FontOption[] = [
  { id: "times", name: "Times New Roman", style: "Serif, classic" },
  { id: "garamond", name: "Garamond", style: "Serif, elegant" },
  { id: "georgia", name: "Georgia", style: "Serif, readable" },
  { id: "script-mt", name: "Script MT Bold", style: "Script, flowing" },
  { id: "edwardian", name: "Edwardian Script", style: "Script, ornate" },
  { id: "brush-script", name: "Brush Script", style: "Script, casual" },
  { id: "arial", name: "Arial", style: "Sans-serif, clean" },
  { id: "century-gothic", name: "Century Gothic", style: "Sans-serif, geometric" },
  { id: "copperplate", name: "Copperplate", style: "Small caps, engraved" },
  { id: "old-english", name: "Old English", style: "Blackletter, gothic" },
];

export const FONT_PREVIEW_FAMILIES: Record<FontPreferenceId, string> = {
  times: "\"Times New Roman\", Times, serif",
  garamond: "\"Garamond\", \"Times New Roman\", serif",
  georgia: "Georgia, \"Times New Roman\", serif",
  "script-mt": "\"Brush Script MT\", \"Brush Script Std\", cursive",
  edwardian: "\"Edwardian Script ITC\", \"Apple Chancery\", cursive",
  "brush-script": "\"Brush Script MT\", \"Comic Sans MS\", cursive",
  arial: "Arial, Helvetica, sans-serif",
  "century-gothic": "\"Century Gothic\", Futura, \"Trebuchet MS\", sans-serif",
  copperplate: "\"Copperplate\", \"Copperplate Gothic Light\", \"Times New Roman\", serif",
  "old-english": "\"Old English Text MT\", \"Blackletter\", \"Times New Roman\", serif",
};

export const PRICING = {
  basePrice: { 62: 85, 72: 95 } as Record<62 | 72, number>,
  beadsAddon: 15,
  trimModifiers: {
    "gold-classic": 0,
    "gold-ornate": 10,
    "gold-braided": 8,
    "gold-minimal": 0,
    "silver-classic": 0,
    "silver-modern": 5,
  } as Record<TrimStyleId, number>,
  embroideryBase: 10,
} as const;

export const HOST_MESSAGES: Record<HostStep, string> = {
  welcome:
    "Ready to build your stole? Start with the length tool.",
  length:
    "Step 1: Choose your stole length.",
  stoleColor:
    "Step 2: Pick the base stole color.",
  textileColor:
    "Step 3: Choose the sinh (textile) color.",
  accentMetal:
    "Step 4: Select gold or silver accents.",
  trimStyle: "Now pick a trim style you love.",
  beads:
    "Step 5: Add beading if you'd like sparkle.",
  orientation:
    "Step 6: Set the textile orientation—straight or angled.",
  embroidery:
    "Step 7: Add embroidery details (optional).",
  complete:
    "All done! Review your receipt and save your design.",
  changed:
    "Nice choice! Continue when you're ready.",
};

export const DEFAULT_CONFIG: StoleConfig = {
  lengthInches: 62,
  stoleColor: "white" as StoleColorId,
  textileColor: "coral" as TextileColorId,
  accentMetal: "gold",
  trimStyleId: "gold-classic" as TrimStyleId,
  beadsEnabled: false,
  textileOrientation: "straight",
  embroideryText: "",
  embroideryFlags: "",
  embroideryDesignNotes: "",
  fontPreference: "times",
  customFontRequest: "",
};

export const BUSINESS_INFO = {
  name: "Expria LLC",
  website: "https://expria.net",
  tagline: "Custom Cultural Stoles",
};

export function getStoleColorHex(id: StoleColorId): string {
  return STOLE_COLORS.find((c) => c.id === id)?.hex ?? "#FFFFFF";
}

export function getTextileColorHex(id: TextileColorId): string {
  return TEXTILE_COLORS.find((c) => c.id === id)?.hex ?? "#FF6B6B";
}

export function getStoleColorName(id: StoleColorId): string {
  return STOLE_COLORS.find((c) => c.id === id)?.name ?? "White";
}

export function getTextileColorName(id: TextileColorId): string {
  return TEXTILE_COLORS.find((c) => c.id === id)?.name ?? "Coral";
}

export function getTrimStyleName(id: TrimStyleId): string {
  const allTrims = [...TRIM_STYLES.gold, ...TRIM_STYLES.silver];
  return allTrims.find((t) => t.id === id)?.name ?? "Classic";
}

export function getFontName(id: string): string {
  return FONT_OPTIONS.find((f) => f.id === id)?.name ?? "Times New Roman";
}

export function getFontFamily(id: FontPreferenceId): string {
  return FONT_PREVIEW_FAMILIES[id] ?? "\"Times New Roman\", Times, serif";
}
