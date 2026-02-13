import {
  STOLE_POINTS,
  getFringeAnchors,
  getLeftPanelPath,
  getMetalPalette,
  getRightPanelPath,
  getTrimDecorPoints,
  samplePolyline,
} from "@/lib/geometry";

describe("geometry", () => {
  it("builds panel paths with pointed tips", () => {
    const leftPath = getLeftPanelPath();
    const rightPath = getRightPanelPath();

    expect(leftPath).toContain(`${STOLE_POINTS.leftTipApex.x} ${STOLE_POINTS.leftTipApex.y}`);
    expect(rightPath).toContain(`${STOLE_POINTS.rightTipApex.x} ${STOLE_POINTS.rightTipApex.y}`);
  });

  it("samples polyline points at fixed spacing", () => {
    const points = samplePolyline(
      [
        { x: 0, y: 0 },
        { x: 0, y: 120 },
      ],
      30,
    );

    expect(points.length).toBeGreaterThanOrEqual(4);
    expect(points[0]).toEqual({ x: 0, y: 0 });
  });

  it("creates trim decoration points for both sides", () => {
    const left = getTrimDecorPoints("left", 20);
    const right = getTrimDecorPoints("right", 20);

    expect(left.length).toBeGreaterThan(20);
    expect(right.length).toBeGreaterThan(20);
  });

  it("creates fringe anchors toward both tip ends", () => {
    const left = getFringeAnchors("left", 16);
    const right = getFringeAnchors("right", 16);

    expect(left.length).toBeGreaterThan(8);
    expect(right.length).toBeGreaterThan(8);

    const leftClosest = left.reduce((best, point) =>
      Math.abs(point.x - STOLE_POINTS.leftTipApex.x) < Math.abs(best.x - STOLE_POINTS.leftTipApex.x) ? point : best,
    );

    const rightClosest = right.reduce((best, point) =>
      Math.abs(point.x - STOLE_POINTS.rightTipApex.x) < Math.abs(best.x - STOLE_POINTS.rightTipApex.x) ? point : best,
    );

    expect(Math.abs(leftClosest.x - STOLE_POINTS.leftTipApex.x)).toBeLessThan(10);
    expect(Math.abs(rightClosest.x - STOLE_POINTS.rightTipApex.x)).toBeLessThan(10);
  });

  it("returns distinct palettes for gold and silver trim", () => {
    const gold = getMetalPalette("gold");
    const silver = getMetalPalette("silver");

    expect(gold.fill).not.toBe(silver.fill);
    expect(gold.rope).not.toBe(silver.rope);
  });
});
