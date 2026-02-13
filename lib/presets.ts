import type { FabricPresetId, PatchPresetId, WizardStep } from "@/lib/types";

export interface ColorPreset {
  id: string;
  label: string;
  hex: string;
}

export interface FabricPreset {
  id: FabricPresetId;
  label: string;
  colors: [string, string, string];
  motif: "diamond" | "stripe" | "floral" | "naga";
}

export interface PatchPreset {
  id: Exclude<PatchPresetId, "custom-note">;
  label: string;
  color: string;
}

export const WIZARD_STEPS: Array<{ id: WizardStep; label: string; copy: string }> = [
  { id: "palette", label: "Colors & Trim", copy: "Choose satin body color and trim metal." },
  { id: "fabric", label: "Fabric Panels", copy: "Choose representative lower-panel cultural fabrics." },
  { id: "text", label: "Embroidery Text", copy: "Add text, then drag/rotate to place it." },
  { id: "patches", label: "Patches", copy: "Add motif patches and position them." },
  { id: "review", label: "Review & Download", copy: "Capture order details and download mockup + order data." },
];

export const CORE_COLORS: ColorPreset[] = [
  { id: "white", label: "White", hex: "#f8f8f4" },
  { id: "ivory", label: "Ivory", hex: "#f2e8d1" },
  { id: "black", label: "Black", hex: "#1f2025" },
  { id: "red", label: "Ruby Red", hex: "#c50f2b" },
  { id: "navy", label: "Midnight Navy", hex: "#142f67" },
  { id: "emerald", label: "Emerald", hex: "#1f5c4e" },
  { id: "royal", label: "Royal Blue", hex: "#2940b6" },
  { id: "maroon", label: "Maroon", hex: "#65172c" },
];

export const FABRIC_PRESETS: FabricPreset[] = [
  { id: "dokmai-gold", label: "Dokmai Gold", colors: ["#dfb563", "#f0cf8f", "#9c7224"], motif: "floral" },
  { id: "dokmai-rose", label: "Dokmai Rose", colors: ["#b23a5f", "#e4a4b2", "#6f1834"], motif: "floral" },
  { id: "naga-midnight", label: "Naga Midnight", colors: ["#0f1d4a", "#c3a15a", "#29386f"], motif: "naga" },
  { id: "naga-ruby", label: "Naga Ruby", colors: ["#8b1529", "#d7ac57", "#c92b41"], motif: "naga" },
  { id: "khem-indigo", label: "Khem Indigo", colors: ["#1a2752", "#d2a647", "#2f3f75"], motif: "diamond" },
  { id: "khem-emerald", label: "Khem Emerald", colors: ["#11443f", "#dfbd73", "#2f6b63"], motif: "diamond" },
  { id: "siho-red", label: "Siho Red", colors: ["#921f26", "#edca73", "#ca4f4f"], motif: "stripe" },
  { id: "siho-ivory", label: "Siho Ivory", colors: ["#d8c8a1", "#f2e6c6", "#a58852"], motif: "stripe" },
];

export const PATCH_PRESETS: PatchPreset[] = [
  { id: "lotus", label: "Lotus", color: "#d06a9b" },
  { id: "naga", label: "Naga", color: "#b41d2c" },
  { id: "temple", label: "Temple", color: "#d8b25e" },
  { id: "crane", label: "Crane", color: "#8db9d9" },
  { id: "laos-map", label: "Laos Map", color: "#e0b76b" },
  { id: "orchid", label: "Orchid", color: "#e1b476" },
];

export const TEXT_COLORS: ColorPreset[] = [
  { id: "gold-thread", label: "Gold Thread", hex: "#e3c36f" },
  { id: "white-thread", label: "White Thread", hex: "#f4f4f2" },
  { id: "black-thread", label: "Black Thread", hex: "#1d1f24" },
  { id: "navy-thread", label: "Navy Thread", hex: "#132f6e" },
  { id: "red-thread", label: "Red Thread", hex: "#b12235" },
  { id: "silver-thread", label: "Silver Thread", hex: "#d7d9de" },
  { id: "emerald-thread", label: "Emerald Thread", hex: "#2e5f56" },
  { id: "rose-thread", label: "Rose Thread", hex: "#c16484" },
];

export const DEFAULT_TEXT_COLOR = "#e3c36f";

export function getFabricPreset(id: FabricPresetId): FabricPreset {
  return FABRIC_PRESETS.find((preset) => preset.id === id) ?? FABRIC_PRESETS[0];
}

export function getPatchPreset(id: Exclude<PatchPresetId, "custom-note">): PatchPreset {
  return PATCH_PRESETS.find((preset) => preset.id === id) ?? PATCH_PRESETS[0];
}
