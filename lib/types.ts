export type WizardStep = "palette" | "fabric" | "text" | "patches" | "review";

export type Metal = "gold" | "silver";

export type FabricPresetId =
  | "dokmai-gold"
  | "dokmai-rose"
  | "naga-midnight"
  | "naga-ruby"
  | "khem-indigo"
  | "khem-emerald"
  | "siho-red"
  | "siho-ivory";

export type PatchPresetId =
  | "lotus"
  | "naga"
  | "temple"
  | "crane"
  | "laos-map"
  | "orchid"
  | "custom-note";

export type CanvasItemType = "text" | "patch";

export interface CanvasItemBase {
  id: string;
  x: number;
  y: number;
  rotationDeg: number;
}

export interface TextItem extends CanvasItemBase {
  type: "text";
  content: string;
  fontScale: number;
  colorHex: string;
}

export interface PatchItem extends CanvasItemBase {
  type: "patch";
  presetId: PatchPresetId;
  scale: number;
}

export type CanvasItem = TextItem | PatchItem;

export interface StoleConfig {
  tipStyle: "pointed";
  designName: string;
  baseColorHex: string;
  trimMetal: Metal;
  fabricPresetLeft: FabricPresetId;
  fabricPresetRight: FabricPresetId;
  fringeEnabled: boolean;
  canvasItems: CanvasItem[];
  customPatchNotes: string;
}

export interface OrderContact {
  fullName: string;
  email: string;
  phone: string;
  school: string;
  gradYear: string;
  eventDate: string;
}

export interface OrderPayload {
  version: "v1";
  createdAtIso: string;
  contact: OrderContact;
  config: StoleConfig;
  reviewAccepted: boolean;
  mockupDisclaimerAccepted: boolean;
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
