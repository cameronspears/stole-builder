import type { CanvasItem } from "@/lib/types";

interface Rect {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export const LEFT_SAFE_ZONE: Rect = {
  minX: 98,
  maxX: 198,
  minY: 152,
  maxY: 910,
};

export const RIGHT_SAFE_ZONE: Rect = {
  minX: 322,
  maxX: 422,
  minY: 152,
  maxY: 910,
};

export const TEXT_SCALE_RANGE = {
  min: 0.7,
  max: 2,
};

export const PATCH_SCALE_RANGE = {
  min: 0.65,
  max: 1.9,
};

export const ROTATION_RANGE = {
  min: -180,
  max: 180,
};

export function clampRotation(deg: number): number {
  if (Number.isNaN(deg)) {
    return 0;
  }

  return Math.max(ROTATION_RANGE.min, Math.min(ROTATION_RANGE.max, deg));
}

export function clampScale(item: CanvasItem, value: number): number {
  if (Number.isNaN(value)) {
    return item.type === "text" ? 1 : 1;
  }

  if (item.type === "text") {
    return Math.max(TEXT_SCALE_RANGE.min, Math.min(TEXT_SCALE_RANGE.max, value));
  }

  return Math.max(PATCH_SCALE_RANGE.min, Math.min(PATCH_SCALE_RANGE.max, value));
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function clampCanvasPosition(x: number, y: number): { x: number; y: number } {
  const zone = x < 260 ? LEFT_SAFE_ZONE : RIGHT_SAFE_ZONE;

  return {
    x: clamp(x, zone.minX, zone.maxX),
    y: clamp(y, zone.minY, zone.maxY),
  };
}
