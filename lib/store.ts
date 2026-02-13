import { create } from "zustand";
import type {
  CanvasItem,
  DeepPartial,
  OrderContact,
  PatchItem,
  PatchPresetId,
  StoleConfig,
  TextItem,
  WizardStep,
} from "@/lib/types";
import { DEFAULT_TEXT_COLOR } from "@/lib/presets";
import { clampCanvasPosition, clampRotation, clampScale } from "@/lib/canvas-constraints";

const STEP_ORDER: WizardStep[] = ["palette", "fabric", "text", "patches", "review"];

export const DEFAULT_CONFIG: StoleConfig = {
  tipStyle: "pointed",
  designName: "My Stole Mockup",
  baseColorHex: "#142f67",
  trimMetal: "gold",
  fabricPresetLeft: "dokmai-gold",
  fabricPresetRight: "dokmai-gold",
  fringeEnabled: true,
  canvasItems: [],
  customPatchNotes: "",
};

export const DEFAULT_CONTACT: OrderContact = {
  fullName: "",
  email: "",
  phone: "",
  school: "",
  gradYear: "",
  eventDate: "",
};

interface SetOptions {
  trackHistory?: boolean;
}

interface DraftSnapshot {
  config: StoleConfig;
  contact: OrderContact;
}

interface StoleStoreState {
  config: StoleConfig;
  step: WizardStep;
  selectedItemId: string | null;
  contact: OrderContact;
  reviewAccepted: boolean;
  mockupDisclaimerAccepted: boolean;
  past: StoleConfig[];
  future: StoleConfig[];
  setStep: (step: WizardStep) => void;
  goNextStep: () => void;
  goPrevStep: () => void;
  setSelectedItemId: (id: string | null) => void;
  setConfigPartial: (partial: DeepPartial<StoleConfig>, options?: SetOptions) => void;
  setConfig: (updater: (current: StoleConfig) => StoleConfig, options?: SetOptions) => void;
  addTextItem: (content: string, colorHex?: string) => void;
  addPatchItem: (presetId: Exclude<PatchPresetId, "custom-note">) => void;
  updateCanvasItem: (id: string, updater: (item: CanvasItem) => CanvasItem) => void;
  moveCanvasItem: (id: string, x: number, y: number) => void;
  removeCanvasItem: (id: string) => void;
  setContactPartial: (partial: Partial<OrderContact>) => void;
  setReviewAccepted: (value: boolean) => void;
  setMockupDisclaimerAccepted: (value: boolean) => void;
  applyDraft: (snapshot: DraftSnapshot) => void;
  reset: () => void;
  undo: () => void;
  redo: () => void;
}

function cloneConfig(config: StoleConfig): StoleConfig {
  return JSON.parse(JSON.stringify(config)) as StoleConfig;
}

function createId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T>(target: T, partial: DeepPartial<T>): T {
  const next = { ...(target as Record<string, unknown>) };

  for (const [key, value] of Object.entries(partial as Record<string, unknown>)) {
    if (value === undefined) {
      continue;
    }

    const current = next[key];

    if (isRecord(current) && isRecord(value)) {
      next[key] = deepMerge(current, value);
      continue;
    }

    next[key] = value;
  }

  return next as T;
}

function withHistory(
  state: StoleStoreState,
  nextConfig: StoleConfig,
  options?: SetOptions,
): Pick<StoleStoreState, "config" | "past" | "future"> {
  const shouldTrack = options?.trackHistory !== false;

  if (!shouldTrack) {
    return {
      config: nextConfig,
      past: state.past,
      future: state.future,
    };
  }

  return {
    config: nextConfig,
    past: [...state.past, cloneConfig(state.config)],
    future: [],
  };
}

function patchDefaultPosition(items: CanvasItem[]): { x: number; y: number } {
  const count = items.filter((item) => item.type === "patch").length;
  const x = count % 2 === 0 ? 165 : 356;
  const y = 300 + (count % 3) * 130;
  return clampCanvasPosition(x, y);
}

function textDefaultPosition(items: CanvasItem[]): { x: number; y: number } {
  const count = items.filter((item) => item.type === "text").length;
  const x = count % 2 === 0 ? 160 : 360;
  const y = 250 + (count % 4) * 140;
  return clampCanvasPosition(x, y);
}

export const useStoleStore = create<StoleStoreState>((set, get) => ({
  config: DEFAULT_CONFIG,
  step: "palette",
  selectedItemId: null,
  contact: DEFAULT_CONTACT,
  reviewAccepted: false,
  mockupDisclaimerAccepted: false,
  past: [],
  future: [],
  setStep: (step) => set({ step }),
  goNextStep: () => {
    const current = get().step;
    const index = STEP_ORDER.indexOf(current);
    if (index >= 0 && index < STEP_ORDER.length - 1) {
      set({ step: STEP_ORDER[index + 1] });
    }
  },
  goPrevStep: () => {
    const current = get().step;
    const index = STEP_ORDER.indexOf(current);
    if (index > 0) {
      set({ step: STEP_ORDER[index - 1] });
    }
  },
  setSelectedItemId: (id) => set({ selectedItemId: id }),
  setConfigPartial: (partial, options) => {
    const current = get().config;
    const nextConfig = deepMerge(current, partial);

    if (JSON.stringify(nextConfig) === JSON.stringify(current)) {
      return;
    }

    set((state) => withHistory(state, nextConfig, options));
  },
  setConfig: (updater, options) => {
    const current = get().config;
    const nextConfig = updater(current);

    if (JSON.stringify(nextConfig) === JSON.stringify(current)) {
      return;
    }

    set((state) => withHistory(state, nextConfig, options));
  },
  addTextItem: (content, colorHex = DEFAULT_TEXT_COLOR) => {
    const { config } = get();
    const position = textDefaultPosition(config.canvasItems);
    const item: TextItem = {
      id: createId("text"),
      type: "text",
      content: content.trim() || "New Text",
      x: position.x,
      y: position.y,
      rotationDeg: 0,
      fontScale: 1,
      colorHex,
    };

    get().setConfig(
      (current) => ({
        ...current,
        canvasItems: [...current.canvasItems, item],
      }),
      { trackHistory: true },
    );

    set({ selectedItemId: item.id });
  },
  addPatchItem: (presetId) => {
    const { config } = get();
    const position = patchDefaultPosition(config.canvasItems);
    const item: PatchItem = {
      id: createId("patch"),
      type: "patch",
      presetId,
      x: position.x,
      y: position.y,
      rotationDeg: 0,
      scale: 1,
    };

    get().setConfig(
      (current) => ({
        ...current,
        canvasItems: [...current.canvasItems, item],
      }),
      { trackHistory: true },
    );

    set({ selectedItemId: item.id });
  },
  updateCanvasItem: (id, updater) => {
    get().setConfig(
      (current) => ({
        ...current,
        canvasItems: current.canvasItems.map((item) => {
          if (item.id !== id) {
            return item;
          }

          const updated = updater(item);

          const clampedPosition = clampCanvasPosition(updated.x, updated.y);
          const base = {
            ...updated,
            x: clampedPosition.x,
            y: clampedPosition.y,
            rotationDeg: clampRotation(updated.rotationDeg),
          };

          if (base.type === "text") {
            return {
              ...base,
              fontScale: clampScale(base, base.fontScale),
            };
          }

          return {
            ...base,
            scale: clampScale(base, base.scale),
          };
        }),
      }),
      { trackHistory: true },
    );
  },
  moveCanvasItem: (id, x, y) => {
    get().setConfig(
      (current) => ({
        ...current,
        canvasItems: current.canvasItems.map((item) => {
          if (item.id !== id) {
            return item;
          }

          const nextPosition = clampCanvasPosition(x, y);
          return {
            ...item,
            x: nextPosition.x,
            y: nextPosition.y,
          };
        }),
      }),
      { trackHistory: false },
    );
  },
  removeCanvasItem: (id) => {
    get().setConfig(
      (current) => ({
        ...current,
        canvasItems: current.canvasItems.filter((item) => item.id !== id),
      }),
      { trackHistory: true },
    );

    if (get().selectedItemId === id) {
      set({ selectedItemId: null });
    }
  },
  setContactPartial: (partial) => {
    set((state) => ({
      contact: {
        ...state.contact,
        ...partial,
      },
    }));
  },
  setReviewAccepted: (value) => set({ reviewAccepted: value }),
  setMockupDisclaimerAccepted: (value) => set({ mockupDisclaimerAccepted: value }),
  applyDraft: (snapshot) => {
    set({
      config: snapshot.config,
      contact: snapshot.contact,
      past: [],
      future: [],
      selectedItemId: null,
      reviewAccepted: false,
      mockupDisclaimerAccepted: false,
    });
  },
  reset: () => {
    set((state) => ({
      config: DEFAULT_CONFIG,
      contact: DEFAULT_CONTACT,
      step: "palette",
      selectedItemId: null,
      reviewAccepted: false,
      mockupDisclaimerAccepted: false,
      past: [...state.past, cloneConfig(state.config)],
      future: [],
    }));
  },
  undo: () => {
    const { past, config, future } = get();

    if (past.length === 0) {
      return;
    }

    const previous = past[past.length - 1];

    set({
      config: cloneConfig(previous),
      past: past.slice(0, -1),
      future: [cloneConfig(config), ...future],
      selectedItemId: null,
    });
  },
  redo: () => {
    const { past, config, future } = get();

    if (future.length === 0) {
      return;
    }

    const next = future[0];

    set({
      config: cloneConfig(next),
      past: [...past, cloneConfig(config)],
      future: future.slice(1),
      selectedItemId: null,
    });
  },
}));

export function resetStoreForTests(): void {
  useStoleStore.setState({
    config: DEFAULT_CONFIG,
    step: "palette",
    selectedItemId: null,
    contact: DEFAULT_CONTACT,
    reviewAccepted: false,
    mockupDisclaimerAccepted: false,
    past: [],
    future: [],
  });
}
