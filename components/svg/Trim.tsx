"use client";

import { motion } from "framer-motion";
import type { TrimStyleId } from "@/lib/types";

interface TrimProps {
  styleId: TrimStyleId;
  lengthInches: 62 | 72;
  className?: string;
}

const METAL_COLORS = {
  gold: { primary: "#DAA520", secondary: "#FFD700", dark: "#B8860B" },
  silver: { primary: "#C0C0C0", secondary: "#E8E8E8", dark: "#A9A9A9" },
};

export function Trim({ styleId, lengthInches, className }: TrimProps) {
  const lengthScale = lengthInches === 72 ? 1.16 : 1;
  const baseHeight = 280;
  const scaledHeight = baseHeight * lengthScale;

  const metal = styleId.startsWith("gold") ? "gold" : "silver";
  const colors = METAL_COLORS[metal];

  const renderTrimStyle = () => {
    switch (styleId) {
      case "gold-classic":
      case "silver-classic":
        return <ClassicTrim colors={colors} height={scaledHeight} />;
      case "gold-ornate":
        return <OrnateTrim colors={colors} height={scaledHeight} />;
      case "gold-braided":
        return <BraidedTrim colors={colors} height={scaledHeight} />;
      case "gold-minimal":
        return <MinimalTrim colors={colors} height={scaledHeight} />;
      case "silver-modern":
        return <ModernTrim colors={colors} height={scaledHeight} />;
      default:
        return <ClassicTrim colors={colors} height={scaledHeight} />;
    }
  };

  return (
    <motion.svg
      viewBox={`0 0 200 ${scaledHeight}`}
      className={className}
      style={{ overflow: "visible" }}
      aria-label={`${styleId} trim`}
    >
      {renderTrimStyle()}
    </motion.svg>
  );
}

interface TrimStyleProps {
  colors: { primary: string; secondary: string; dark: string };
  height: number;
}

function ClassicTrim({ colors, height }: TrimStyleProps) {
  return (
    <g>
      {/* Left panel trim */}
      <path
        d={`M37 0 L40 0 L42 ${height} L39 ${height} Z`}
        fill={colors.primary}
      />
      <path
        d={`M75 0 L78 0 L80 ${height} L77 ${height} Z`}
        fill={colors.primary}
      />
      {/* Right panel trim */}
      <path
        d={`M122 0 L125 0 L127 ${height} L124 ${height} Z`}
        fill={colors.primary}
      />
      <path
        d={`M160 0 L163 0 L165 ${height} L162 ${height} Z`}
        fill={colors.primary}
      />
      {/* Bottom trim */}
      <rect x="37" y={height - 8} width="43" height="8" fill={colors.primary} />
      <rect x="122" y={height - 8} width="43" height="8" fill={colors.primary} />
    </g>
  );
}

function OrnateTrim({ colors, height }: TrimStyleProps) {
  const scrollCount = Math.floor(height / 30);
  return (
    <g>
      {/* Left panel ornate trim */}
      <path
        d={`M36 0 L41 0 L43 ${height} L38 ${height} Z`}
        fill={colors.primary}
      />
      <path
        d={`M74 0 L79 0 L81 ${height} L76 ${height} Z`}
        fill={colors.primary}
      />
      {/* Decorative scrollwork on left */}
      {Array.from({ length: scrollCount }).map((_, i) => (
        <circle
          key={`left-scroll-${i}`}
          cx="39"
          cy={15 + i * 30}
          r="3"
          fill={colors.secondary}
        />
      ))}
      {/* Right panel ornate trim */}
      <path
        d={`M121 0 L126 0 L128 ${height} L123 ${height} Z`}
        fill={colors.primary}
      />
      <path
        d={`M159 0 L164 0 L166 ${height} L161 ${height} Z`}
        fill={colors.primary}
      />
      {/* Decorative scrollwork on right */}
      {Array.from({ length: scrollCount }).map((_, i) => (
        <circle
          key={`right-scroll-${i}`}
          cx="161"
          cy={15 + i * 30}
          r="3"
          fill={colors.secondary}
        />
      ))}
      {/* Ornate bottom trim */}
      <path
        d={`M37 ${height - 12} L80 ${height - 12} L80 ${height} L37 ${height} Z`}
        fill={colors.primary}
      />
      <path
        d={`M122 ${height - 12} L165 ${height - 12} L165 ${height} L122 ${height} Z`}
        fill={colors.primary}
      />
    </g>
  );
}

function BraidedTrim({ colors, height }: TrimStyleProps) {
  const braidCount = Math.floor(height / 20);
  return (
    <g>
      {/* Braided pattern left outer */}
      {Array.from({ length: braidCount }).map((_, i) => (
        <g key={`left-braid-${i}`}>
          <ellipse
            cx="38"
            cy={10 + i * 20}
            rx="3"
            ry="8"
            fill={i % 2 === 0 ? colors.primary : colors.secondary}
          />
        </g>
      ))}
      {/* Braided pattern left inner */}
      {Array.from({ length: braidCount }).map((_, i) => (
        <g key={`left-braid-inner-${i}`}>
          <ellipse
            cx="77"
            cy={10 + i * 20}
            rx="3"
            ry="8"
            fill={i % 2 === 0 ? colors.secondary : colors.primary}
          />
        </g>
      ))}
      {/* Braided pattern right outer */}
      {Array.from({ length: braidCount }).map((_, i) => (
        <g key={`right-braid-${i}`}>
          <ellipse
            cx="162"
            cy={10 + i * 20}
            rx="3"
            ry="8"
            fill={i % 2 === 0 ? colors.primary : colors.secondary}
          />
        </g>
      ))}
      {/* Braided pattern right inner */}
      {Array.from({ length: braidCount }).map((_, i) => (
        <g key={`right-braid-inner-${i}`}>
          <ellipse
            cx="123"
            cy={10 + i * 20}
            rx="3"
            ry="8"
            fill={i % 2 === 0 ? colors.secondary : colors.primary}
          />
        </g>
      ))}
      {/* Bottom trim */}
      <rect x="37" y={height - 10} width="43" height="10" fill={colors.primary} />
      <rect x="122" y={height - 10} width="43" height="10" fill={colors.primary} />
    </g>
  );
}

function MinimalTrim({ colors, height }: TrimStyleProps) {
  return (
    <g>
      {/* Thin line trim left */}
      <line
        x1="38"
        y1="0"
        x2="39"
        y2={height}
        stroke={colors.primary}
        strokeWidth="1.5"
      />
      <line
        x1="77"
        y1="0"
        x2="78"
        y2={height}
        stroke={colors.primary}
        strokeWidth="1.5"
      />
      {/* Thin line trim right */}
      <line
        x1="123"
        y1="0"
        x2="124"
        y2={height}
        stroke={colors.primary}
        strokeWidth="1.5"
      />
      <line
        x1="162"
        y1="0"
        x2="163"
        y2={height}
        stroke={colors.primary}
        strokeWidth="1.5"
      />
      {/* Minimal bottom line */}
      <line
        x1="38"
        y1={height - 3}
        x2="78"
        y2={height - 3}
        stroke={colors.primary}
        strokeWidth="1.5"
      />
      <line
        x1="123"
        y1={height - 3}
        x2="163"
        y2={height - 3}
        stroke={colors.primary}
        strokeWidth="1.5"
      />
    </g>
  );
}

function ModernTrim({ colors, height }: TrimStyleProps) {
  const segmentCount = Math.floor(height / 40);
  return (
    <g>
      {/* Geometric segments left */}
      {Array.from({ length: segmentCount }).map((_, i) => (
        <g key={`left-geo-${i}`}>
          <rect
            x="36"
            y={5 + i * 40}
            width="6"
            height="30"
            fill={i % 2 === 0 ? colors.primary : colors.dark}
          />
          <rect
            x="74"
            y={5 + i * 40}
            width="6"
            height="30"
            fill={i % 2 === 0 ? colors.dark : colors.primary}
          />
        </g>
      ))}
      {/* Geometric segments right */}
      {Array.from({ length: segmentCount }).map((_, i) => (
        <g key={`right-geo-${i}`}>
          <rect
            x="120"
            y={5 + i * 40}
            width="6"
            height="30"
            fill={i % 2 === 0 ? colors.dark : colors.primary}
          />
          <rect
            x="158"
            y={5 + i * 40}
            width="6"
            height="30"
            fill={i % 2 === 0 ? colors.primary : colors.dark}
          />
        </g>
      ))}
      {/* Modern bottom bar */}
      <rect x="36" y={height - 8} width="44" height="8" fill={colors.primary} />
      <rect x="120" y={height - 8} width="44" height="8" fill={colors.primary} />
    </g>
  );
}
