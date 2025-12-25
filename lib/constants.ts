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
    "Welcome! I'm here to help you design your perfect graduation stole. Let's start with the length!",
  length:
    'How long would you like your stole? 62" is standard, 72" gives extra drape.',
  stoleColor:
    "Beautiful! Now pick your stole color—squeeze the paint tube to see your options!",
  textileColor:
    "Time for the textile panel! Grab a crayon to pick a color.",
  accentMetal:
    "Gold or silver? This sets the tone for your trim and beads.",
  trimStyle: "Pick a trim style that speaks to you!",
  beads:
    "Would you like beading? It adds a lovely sparkle and movement!",
  orientation:
    "How should the textile sit—straight across or at an angle?",
  embroidery:
    "Almost done! Tell me what you'd like embroidered—your name, graduation year, a special message?",
  complete:
    "Your stole design is ready! Review everything in the receipt, then save or share your creation!",
  changed:
    "Nice choice! Feel free to keep customizing or move on when you're ready.",
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
