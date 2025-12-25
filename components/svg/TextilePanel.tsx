"use client";

import { motion } from "framer-motion";

interface TextilePanelProps {
  color: string;
  orientation: "straight" | "angled";
  lengthInches: 62 | 72;
  className?: string;
}

export function TextilePanel({
  color,
  orientation,
  lengthInches,
  className,
}: TextilePanelProps) {
  const lengthScale = lengthInches === 72 ? 1.16 : 1;
  const baseHeight = 280;
  const scaledHeight = baseHeight * lengthScale;

  // Textile panel sits in the lower portion of each stole panel
  const panelTop = scaledHeight * 0.4;
  const panelBottom = scaledHeight - 30;

  // Path definitions based on orientation
  const leftPanelPath =
    orientation === "straight"
      ? `M44 ${panelTop} 
         L71 ${panelTop} 
         L73 ${panelBottom} 
         L42 ${panelBottom} Z`
      : `M44 ${panelTop + 30} 
         L71 ${panelTop} 
         L73 ${panelBottom} 
         L42 ${panelBottom - 20} Z`;

  const rightPanelPath =
    orientation === "straight"
      ? `M129 ${panelTop} 
         L156 ${panelTop} 
         L158 ${panelBottom} 
         L127 ${panelBottom} Z`
      : `M129 ${panelTop} 
         L156 ${panelTop + 30} 
         L158 ${panelBottom - 20} 
         L127 ${panelBottom} Z`;

  return (
    <motion.svg
      viewBox={`0 0 200 ${scaledHeight}`}
      className={className}
      style={{ overflow: "visible" }}
      aria-label="Textile panel"
    >
      {/* Left textile panel */}
      <motion.path
        d={leftPanelPath}
        fill={color}
        initial={false}
        animate={{ d: leftPanelPath, fill: color }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* Right textile panel */}
      <motion.path
        d={rightPanelPath}
        fill={color}
        initial={false}
        animate={{ d: rightPanelPath, fill: color }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}
