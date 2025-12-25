export type StoleLength = 62 | 72;

export type StoleColorId =
  | "white"
  | "ivory"
  | "black"
  | "navy"
  | "burgundy"
  | "forest-green"
  | "royal-blue"
  | "red";

export type TextileColorId =
  | "coral"
  | "teal"
  | "gold"
  | "purple"
  | "pink"
  | "emerald"
  | "sapphire"
  | "crimson";

export type AccentMetal = "gold" | "silver";

export type TrimStyleId =
  | "gold-classic"
  | "gold-ornate"
  | "gold-braided"
  | "gold-minimal"
  | "silver-classic"
  | "silver-modern";

export type TextileOrientation = "straight" | "angled";

export type FontPreferenceId =
  | "times"
  | "garamond"
  | "georgia"
  | "script-mt"
  | "edwardian"
  | "brush-script"
  | "arial"
  | "century-gothic"
  | "copperplate"
  | "old-english";

export interface StoleConfig {
  lengthInches: StoleLength;
  stoleColor: StoleColorId;
  textileColor: TextileColorId;
  accentMetal: AccentMetal;
  trimStyleId: TrimStyleId;
  beadsEnabled: boolean;
  textileOrientation: TextileOrientation;
  embroideryText: string;
  embroideryFlags: string;
  embroideryDesignNotes: string;
  fontPreference: FontPreferenceId;
  customFontRequest: string;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

export interface TrimStyle {
  id: TrimStyleId;
  name: string;
  description: string;
}

export interface FontOption {
  id: FontPreferenceId;
  name: string;
  style: string;
}

export interface LineItem {
  label: string;
  price: number;
}

export interface PricingBreakdown {
  lineItems: LineItem[];
  subtotal: number;
  total: number;
}

export type HostStep =
  | "welcome"
  | "length"
  | "stoleColor"
  | "textileColor"
  | "accentMetal"
  | "trimStyle"
  | "beads"
  | "orientation"
  | "embroidery"
  | "complete"
  | "changed";
