import { getFringeAnchors, getMetalPalette } from "@/lib/geometry";
import type { Metal } from "@/lib/types";

interface StoleBeadsProps {
  enabled: boolean;
  metal: Metal;
}

function strandLength(index: number): number {
  const rhythm = index % 5;
  if (rhythm === 0) {
    return 56;
  }
  if (rhythm === 1) {
    return 44;
  }
  if (rhythm === 2) {
    return 64;
  }
  if (rhythm === 3) {
    return 38;
  }
  return 52;
}

export function StoleBeads({ enabled, metal }: StoleBeadsProps) {
  if (!enabled) {
    return null;
  }

  const palette = getMetalPalette(metal);
  const leftAnchors = getFringeAnchors("left");
  const rightAnchors = getFringeAnchors("right");

  return (
    <g data-testid="fringe-layer">
      {[...leftAnchors, ...rightAnchors].map((anchor, index) => {
        const drop = strandLength(index);

        return (
          <g key={`fringe-${index}`}>
            <line
              x1={anchor.x}
              y1={anchor.y}
              x2={anchor.x}
              y2={anchor.y + drop}
              stroke={palette.rope}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.88"
            />
            <circle cx={anchor.x} cy={anchor.y + drop} r="4" fill={palette.fill} stroke={palette.stroke} strokeWidth="1" />
            <circle cx={anchor.x - 0.8} cy={anchor.y + drop - 0.8} r="1.25" fill={palette.shine} opacity="0.9" />
          </g>
        );
      })}
    </g>
  );
}
