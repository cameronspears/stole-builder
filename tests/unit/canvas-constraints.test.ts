import { clampCanvasPosition, clampRotation, clampScale } from "@/lib/canvas-constraints";
import type { PatchItem, TextItem } from "@/lib/types";

describe("canvas constraints", () => {
  const textItem: TextItem = {
    id: "t-1",
    type: "text",
    content: "Text",
    x: 120,
    y: 220,
    rotationDeg: 0,
    fontScale: 1,
    colorHex: "#ffffff",
  };

  const patchItem: PatchItem = {
    id: "p-1",
    type: "patch",
    presetId: "lotus",
    x: 360,
    y: 320,
    rotationDeg: 0,
    scale: 1,
  };

  it("keeps placements inside safe zones", () => {
    const left = clampCanvasPosition(10, 20);
    const right = clampCanvasPosition(999, 999);

    expect(left.x).toBeGreaterThanOrEqual(98);
    expect(left.y).toBeGreaterThanOrEqual(152);
    expect(right.x).toBeLessThanOrEqual(422);
    expect(right.y).toBeLessThanOrEqual(910);
  });

  it("clamps rotation to range", () => {
    expect(clampRotation(220)).toBe(180);
    expect(clampRotation(-250)).toBe(-180);
  });

  it("clamps text and patch scale with different ranges", () => {
    expect(clampScale(textItem, 5)).toBeLessThanOrEqual(2);
    expect(clampScale(textItem, 0.1)).toBeGreaterThanOrEqual(0.7);
    expect(clampScale(patchItem, 5)).toBeLessThanOrEqual(1.9);
    expect(clampScale(patchItem, 0.2)).toBeGreaterThanOrEqual(0.65);
  });
});
