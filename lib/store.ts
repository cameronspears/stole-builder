"use client";

import { create } from "zustand";
import { DEFAULT_CONFIG, HOST_MESSAGES } from "./constants";
import type { StoleConfig, HostStep, ToolId } from "./types";
import { TOOL_ORDER } from "./types";

interface StoleStore {
  // Current config
  config: StoleConfig;

  // History for undo/redo
  past: StoleConfig[];
  future: StoleConfig[];

  // Host guidance
  currentStep: HostStep;
  hostMessage: string;

  // Pegboard tool state
  activeTool: ToolId | null;
  suggestedTool: ToolId;

  // Actions
  updateConfig: (partial: Partial<StoleConfig>) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
  setStep: (step: HostStep) => void;
  setActiveTool: (tool: ToolId | null) => void;
  advanceSuggestedTool: () => void;

  // Computed helpers
  canUndo: () => boolean;
  canRedo: () => boolean;
}

export const useStoleStore = create<StoleStore>((set, get) => ({
  config: DEFAULT_CONFIG,
  past: [],
  future: [],
  currentStep: "welcome",
  hostMessage: HOST_MESSAGES.welcome,
  activeTool: null,
  suggestedTool: TOOL_ORDER[0],

  updateConfig: (partial) => {
    const { config, past } = get();
    set({
      past: [...past, config],
      future: [],
      config: { ...config, ...partial },
    });
  },

  undo: () => {
    const { past, config, future } = get();
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    set({
      past: past.slice(0, -1),
      config: previous,
      future: [config, ...future],
    });
  },

  redo: () => {
    const { past, config, future } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({
      past: [...past, config],
      config: next,
      future: future.slice(1),
    });
  },

  reset: () => {
    const { config, past } = get();
    // Only add to history if config is different from default
    const isDifferent = JSON.stringify(config) !== JSON.stringify(DEFAULT_CONFIG);
    set({
      past: isDifferent ? [...past, config] : past,
      future: [],
      config: DEFAULT_CONFIG,
      currentStep: "welcome",
      hostMessage: HOST_MESSAGES.welcome,
      activeTool: null,
      suggestedTool: TOOL_ORDER[0],
    });
  },

  setStep: (step) => {
    set({
      currentStep: step,
      hostMessage: HOST_MESSAGES[step],
    });
  },

  setActiveTool: (tool) => {
    set({ activeTool: tool });
  },

  advanceSuggestedTool: () => {
    const { suggestedTool } = get();
    const currentIndex = TOOL_ORDER.indexOf(suggestedTool);
    const nextIndex = Math.min(currentIndex + 1, TOOL_ORDER.length - 1);
    set({ suggestedTool: TOOL_ORDER[nextIndex] });
  },

  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,
}));
