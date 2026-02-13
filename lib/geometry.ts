import type { Metal } from "@/lib/types";

export interface Point {
  x: number;
  y: number;
}

export const PREVIEW_VIEWBOX = {
  width: 520,
  height: 980,
};

export const STOLE_POINTS = {
  neckApex: { x: 260, y: 70 },
  leftOuterTop: { x: 92, y: 138 },
  rightOuterTop: { x: 428, y: 138 },
  leftInnerTop: { x: 238, y: 138 },
  rightInnerTop: { x: 282, y: 138 },
  leftOuterBottom: { x: 98, y: 842 },
  rightOuterBottom: { x: 422, y: 842 },
  leftInnerBottom: { x: 236, y: 842 },
  rightInnerBottom: { x: 284, y: 842 },
  leftTipApex: { x: 172, y: 940 },
  rightTipApex: { x: 348, y: 940 },
  centerSeamTop: { x: 260, y: 70 },
  centerSeamBottom: { x: 260, y: 836 },
};

export function getLeftPanelPath(): string {
  const p = STOLE_POINTS;
  return [
    `M ${p.neckApex.x} ${p.neckApex.y}`,
    `L ${p.leftOuterTop.x} ${p.leftOuterTop.y}`,
    `L ${p.leftOuterBottom.x} ${p.leftOuterBottom.y}`,
    `L ${p.leftTipApex.x} ${p.leftTipApex.y}`,
    `L ${p.leftInnerBottom.x} ${p.leftInnerBottom.y}`,
    `L ${p.leftInnerTop.x} ${p.leftInnerTop.y}`,
    "Z",
  ].join(" ");
}

export function getRightPanelPath(): string {
  const p = STOLE_POINTS;
  return [
    `M ${p.neckApex.x} ${p.neckApex.y}`,
    `L ${p.rightOuterTop.x} ${p.rightOuterTop.y}`,
    `L ${p.rightOuterBottom.x} ${p.rightOuterBottom.y}`,
    `L ${p.rightTipApex.x} ${p.rightTipApex.y}`,
    `L ${p.rightInnerBottom.x} ${p.rightInnerBottom.y}`,
    `L ${p.rightInnerTop.x} ${p.rightInnerTop.y}`,
    "Z",
  ].join(" ");
}

export function getFabricPanelPath(side: "left" | "right"): string {
  const p = STOLE_POINTS;

  if (side === "left") {
    return [
      `M ${p.leftOuterBottom.x + 10} ${p.leftOuterBottom.y - 190}`,
      `L ${p.leftInnerBottom.x - 8} ${p.leftInnerBottom.y - 162}`,
      `L ${p.leftInnerBottom.x - 4} ${p.leftInnerBottom.y - 16}`,
      `L ${p.leftTipApex.x} ${p.leftTipApex.y - 30}`,
      `L ${p.leftOuterBottom.x + 4} ${p.leftOuterBottom.y - 20}`,
      "Z",
    ].join(" ");
  }

  return [
    `M ${p.rightInnerBottom.x + 8} ${p.rightInnerBottom.y - 162}`,
    `L ${p.rightOuterBottom.x - 10} ${p.rightOuterBottom.y - 190}`,
    `L ${p.rightOuterBottom.x - 4} ${p.rightOuterBottom.y - 20}`,
    `L ${p.rightTipApex.x} ${p.rightTipApex.y - 30}`,
    `L ${p.rightInnerBottom.x + 4} ${p.rightInnerBottom.y - 16}`,
    "Z",
  ].join(" ");
}

function leftTrimPolyline(): Point[] {
  const p = STOLE_POINTS;
  return [p.leftOuterTop, p.leftOuterBottom, p.leftTipApex, p.leftInnerBottom, p.leftInnerTop];
}

function rightTrimPolyline(): Point[] {
  const p = STOLE_POINTS;
  return [p.rightOuterTop, p.rightOuterBottom, p.rightTipApex, p.rightInnerBottom, p.rightInnerTop];
}

export function getTrimPolyline(side: "left" | "right"): Point[] {
  return side === "left" ? leftTrimPolyline() : rightTrimPolyline();
}

export function samplePolyline(points: Point[], spacing: number): Point[] {
  if (points.length < 2 || spacing <= 0) {
    return [];
  }

  const samples: Point[] = [];
  let distanceUntilNext = 0;

  for (let index = 0; index < points.length - 1; index += 1) {
    const start = points[index];
    const end = points[index + 1];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const segmentLength = Math.hypot(dx, dy);

    if (segmentLength === 0) {
      continue;
    }

    let progress = distanceUntilNext;

    while (progress <= segmentLength) {
      const ratio = progress / segmentLength;
      samples.push({
        x: start.x + dx * ratio,
        y: start.y + dy * ratio,
      });
      progress += spacing;
    }

    distanceUntilNext = progress - segmentLength;
  }

  return samples;
}

export function getTrimDecorPoints(side: "left" | "right", spacing = 16): Point[] {
  return samplePolyline(getTrimPolyline(side), spacing);
}

function getFringePolyline(side: "left" | "right"): Point[] {
  const p = STOLE_POINTS;

  if (side === "left") {
    return [
      { x: p.leftOuterBottom.x + 6, y: p.leftOuterBottom.y - 8 },
      p.leftTipApex,
      { x: p.leftInnerBottom.x - 6, y: p.leftInnerBottom.y - 8 },
    ];
  }

  return [
    { x: p.rightInnerBottom.x + 6, y: p.rightInnerBottom.y - 8 },
    p.rightTipApex,
    { x: p.rightOuterBottom.x - 6, y: p.rightOuterBottom.y - 8 },
  ];
}

export function getFringeAnchors(side: "left" | "right", spacing = 16): Point[] {
  const anchors = samplePolyline(getFringePolyline(side), spacing);
  return anchors.slice(1, Math.max(anchors.length - 1, 1));
}

export function getMetalPalette(metal: Metal): {
  fill: string;
  stroke: string;
  shine: string;
  rope: string;
} {
  if (metal === "gold") {
    return {
      fill: "#d9b55b",
      stroke: "#876726",
      shine: "#f4e3ad",
      rope: "#b58c36",
    };
  }

  return {
    fill: "#c7cdd6",
    stroke: "#6d7480",
    shine: "#f2f4f7",
    rope: "#8f98a5",
  };
}
