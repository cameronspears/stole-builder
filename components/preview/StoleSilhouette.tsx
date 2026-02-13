import { getFabricPreset } from "@/lib/presets";
import { getFabricPanelPath, getLeftPanelPath, getMetalPalette, getRightPanelPath, getTrimDecorPoints, getTrimPolyline, STOLE_POINTS } from "@/lib/geometry";
import type { FabricPresetId, Metal } from "@/lib/types";

interface StoleSilhouetteProps {
  baseColorHex: string;
  trimMetal: Metal;
  fabricPresetLeft: FabricPresetId;
  fabricPresetRight: FabricPresetId;
}

function toPath(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) {
    return "";
  }

  return `M ${points.map((point) => `${point.x} ${point.y}`).join(" L ")}`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace("#", "");
  const full = normalized.length === 3 ? normalized.split("").map((ch) => `${ch}${ch}`).join("") : normalized;
  const int = Number.parseInt(full, 16);

  if (Number.isNaN(int)) {
    return { r: 44, g: 62, b: 80 };
  }

  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const safe = [r, g, b].map((value) => Math.max(0, Math.min(255, Math.round(value))));
  return `#${safe.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function shade(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const factor = amount / 100;

  return rgbToHex(
    factor >= 0 ? r + (255 - r) * factor : r * (1 + factor),
    factor >= 0 ? g + (255 - g) * factor : g * (1 + factor),
    factor >= 0 ? b + (255 - b) * factor : b * (1 + factor),
  );
}

function FabricPattern({
  id,
  side,
  colors,
  motif,
}: {
  id: string;
  side: "left" | "right";
  colors: [string, string, string];
  motif: "diamond" | "stripe" | "floral" | "naga";
}) {
  const patternId = `${id}-${side}`;

  return (
    <pattern id={patternId} patternUnits="userSpaceOnUse" width="42" height="42">
      <rect width="42" height="42" fill={colors[0]} />

      {motif === "stripe" ? (
        <>
          <rect y="0" width="42" height="8" fill={colors[1]} opacity="0.9" />
          <rect y="16" width="42" height="8" fill={colors[1]} opacity="0.85" />
          <rect y="32" width="42" height="8" fill={colors[1]} opacity="0.8" />
          <path d="M0 12 H42 M0 28 H42" stroke={colors[2]} strokeWidth="1.2" opacity="0.8" />
        </>
      ) : null}

      {motif === "diamond" ? (
        <>
          <path d="M21 4 L36 21 L21 38 L6 21 Z" fill="none" stroke={colors[1]} strokeWidth="2" opacity="0.82" />
          <path d="M21 12 L30 21 L21 30 L12 21 Z" fill="none" stroke={colors[2]} strokeWidth="1.5" opacity="0.82" />
        </>
      ) : null}

      {motif === "floral" ? (
        <>
          <circle cx="21" cy="21" r="4.2" fill={colors[2]} opacity="0.88" />
          <ellipse cx="21" cy="11" rx="4" ry="8" fill={colors[1]} opacity="0.75" />
          <ellipse cx="21" cy="31" rx="4" ry="8" fill={colors[1]} opacity="0.75" />
          <ellipse cx="11" cy="21" rx="8" ry="4" fill={colors[1]} opacity="0.75" />
          <ellipse cx="31" cy="21" rx="8" ry="4" fill={colors[1]} opacity="0.75" />
        </>
      ) : null}

      {motif === "naga" ? (
        <>
          <path d="M0 35 C8 18 15 18 24 35 C30 46 38 46 42 35" fill="none" stroke={colors[1]} strokeWidth="2.2" opacity="0.85" />
          <path d="M0 22 C7 5 16 5 24 22 C31 37 37 37 42 22" fill="none" stroke={colors[2]} strokeWidth="1.5" opacity="0.9" />
        </>
      ) : null}
    </pattern>
  );
}

export function StoleSilhouette({ baseColorHex, trimMetal, fabricPresetLeft, fabricPresetRight }: StoleSilhouetteProps) {
  const leftPath = getLeftPanelPath();
  const rightPath = getRightPanelPath();
  const leftFabricPath = getFabricPanelPath("left");
  const rightFabricPath = getFabricPanelPath("right");
  const trim = getMetalPalette(trimMetal);
  const leftFabric = getFabricPreset(fabricPresetLeft);
  const rightFabric = getFabricPreset(fabricPresetRight);

  const leftTrimPath = toPath(getTrimPolyline("left"));
  const rightTrimPath = toPath(getTrimPolyline("right"));
  const leftDecor = getTrimDecorPoints("left");
  const rightDecor = getTrimDecorPoints("right");

  return (
    <g data-testid="stole-silhouette">
      <defs>
        <clipPath id="left-panel-clip">
          <path d={leftPath} />
        </clipPath>
        <clipPath id="right-panel-clip">
          <path d={rightPath} />
        </clipPath>

        <linearGradient id="left-satin-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={shade(baseColorHex, 22)} />
          <stop offset="40%" stopColor={baseColorHex} />
          <stop offset="68%" stopColor={shade(baseColorHex, -10)} />
          <stop offset="100%" stopColor={shade(baseColorHex, 14)} />
        </linearGradient>

        <linearGradient id="right-satin-fill" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={shade(baseColorHex, 22)} />
          <stop offset="40%" stopColor={baseColorHex} />
          <stop offset="68%" stopColor={shade(baseColorHex, -10)} />
          <stop offset="100%" stopColor={shade(baseColorHex, 14)} />
        </linearGradient>

        <FabricPattern id="fabric" side="left" colors={leftFabric.colors} motif={leftFabric.motif} />
        <FabricPattern id="fabric" side="right" colors={rightFabric.colors} motif={rightFabric.motif} />
      </defs>

      <path d={leftPath} fill="url(#left-satin-fill)" />
      <path d={rightPath} fill="url(#right-satin-fill)" />

      <path d={leftFabricPath} fill="url(#fabric-left)" clipPath="url(#left-panel-clip)" opacity="0.98" />
      <path d={rightFabricPath} fill="url(#fabric-right)" clipPath="url(#right-panel-clip)" opacity="0.98" />

      <path d={leftTrimPath} stroke={trim.rope} strokeWidth="7.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={rightTrimPath} stroke={trim.rope} strokeWidth="7.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {leftDecor.map((point, index) => (
        <g key={`left-trim-${index}`}>
          <circle cx={point.x} cy={point.y} r="4.1" fill={trim.fill} stroke={trim.stroke} strokeWidth="1" />
          <circle cx={point.x - 0.7} cy={point.y - 0.7} r="1.35" fill={trim.shine} opacity="0.85" />
        </g>
      ))}

      {rightDecor.map((point, index) => (
        <g key={`right-trim-${index}`}>
          <circle cx={point.x} cy={point.y} r="4.1" fill={trim.fill} stroke={trim.stroke} strokeWidth="1" />
          <circle cx={point.x - 0.7} cy={point.y - 0.7} r="1.35" fill={trim.shine} opacity="0.85" />
        </g>
      ))}

      <path
        d={`M ${STOLE_POINTS.centerSeamTop.x} ${STOLE_POINTS.centerSeamTop.y + 6} V ${STOLE_POINTS.centerSeamBottom.y}`}
        stroke={trim.rope}
        strokeWidth="4.6"
        opacity="0.7"
      />

      <path
        d={`M ${STOLE_POINTS.leftInnerTop.x - 14} ${STOLE_POINTS.leftInnerTop.y + 24} V ${STOLE_POINTS.leftInnerBottom.y - 36}`}
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d={`M ${STOLE_POINTS.rightInnerTop.x + 14} ${STOLE_POINTS.rightInnerTop.y + 24} V ${STOLE_POINTS.rightInnerBottom.y - 36}`}
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  );
}
