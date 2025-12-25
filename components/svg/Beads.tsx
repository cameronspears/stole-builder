"use client";

import { motion } from "framer-motion";
import type { AccentMetal } from "@/lib/types";

interface BeadsProps {
  metal: AccentMetal;
  lengthInches: 62 | 72;
  className?: string;
}

const METAL_COLORS = {
  gold: { primary: "#DAA520", secondary: "#FFD700", dark: "#B8860B" },
  silver: { primary: "#C0C0C0", secondary: "#E8E8E8", dark: "#A9A9A9" },
};

export function Beads({ metal, lengthInches, className }: BeadsProps) {
  const lengthScale = lengthInches === 72 ? 1.16 : 1;
  const baseHeight = 280;
  const scaledHeight = baseHeight * lengthScale;
  const colors = METAL_COLORS[metal];

  // Fringe/beading at the bottom of each panel
  const fringeStartY = scaledHeight - 5;
  const fringeLength = 25;
  const beadCount = 8;

  return (
    <motion.svg
      viewBox={`0 0 200 ${scaledHeight + fringeLength + 10}`}
      className={className}
      style={{ overflow: "visible" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Beading fringe"
    >
      {/* Left panel fringe */}
      {Array.from({ length: beadCount }).map((_, i) => {
        const x = 42 + i * 5;
        return (
          <g key={`left-fringe-${i}`}>
            {/* Thread */}
            <line
              x1={x}
              y1={fringeStartY}
              x2={x}
              y2={fringeStartY + fringeLength}
              stroke={colors.dark}
              strokeWidth="1"
            />
            {/* Beads */}
            <circle
              cx={x}
              cy={fringeStartY + 8}
              r="2.5"
              fill={colors.primary}
            />
            <circle
              cx={x}
              cy={fringeStartY + 16}
              r="2.5"
              fill={colors.secondary}
            />
            <circle
              cx={x}
              cy={fringeStartY + 24}
              r="3"
              fill={colors.primary}
            />
          </g>
        );
      })}

      {/* Right panel fringe */}
      {Array.from({ length: beadCount }).map((_, i) => {
        const x = 127 + i * 5;
        return (
          <g key={`right-fringe-${i}`}>
            {/* Thread */}
            <line
              x1={x}
              y1={fringeStartY}
              x2={x}
              y2={fringeStartY + fringeLength}
              stroke={colors.dark}
              strokeWidth="1"
            />
            {/* Beads */}
            <circle
              cx={x}
              cy={fringeStartY + 8}
              r="2.5"
              fill={colors.primary}
            />
            <circle
              cx={x}
              cy={fringeStartY + 16}
              r="2.5"
              fill={colors.secondary}
            />
            <circle
              cx={x}
              cy={fringeStartY + 24}
              r="3"
              fill={colors.primary}
            />
          </g>
        );
      })}
    </motion.svg>
  );
}
