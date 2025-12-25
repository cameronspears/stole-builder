"use client";

import { motion } from "framer-motion";

interface StoleBaseProps {
  color: string;
  lengthInches: 62 | 72;
  className?: string;
}

export function StoleBase({ color, lengthInches, className }: StoleBaseProps) {
  // Scale factor for length: 72" is ~16% longer than 62"
  const lengthScale = lengthInches === 72 ? 1.16 : 1;
  const baseHeight = 280;
  const scaledHeight = baseHeight * lengthScale;

  return (
    <motion.svg
      viewBox={`0 0 200 ${scaledHeight}`}
      className={className}
      initial={false}
      animate={{ height: scaledHeight }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ overflow: "visible" }}
      aria-label="Stole base"
    >
      {/* Left panel of stole */}
      <motion.path
        d={`M40 0 
            L75 0 
            L78 ${scaledHeight - 20}
            Q79 ${scaledHeight - 5} 75 ${scaledHeight}
            L40 ${scaledHeight}
            Q36 ${scaledHeight - 5} 37 ${scaledHeight - 20}
            Z`}
        fill={color}
        initial={false}
        animate={{ fill: color }}
        transition={{ duration: 0.3 }}
      />

      {/* Right panel of stole */}
      <motion.path
        d={`M125 0 
            L160 0 
            L163 ${scaledHeight - 20}
            Q164 ${scaledHeight - 5} 160 ${scaledHeight}
            L125 ${scaledHeight}
            Q121 ${scaledHeight - 5} 122 ${scaledHeight - 20}
            Z`}
        fill={color}
        initial={false}
        animate={{ fill: color }}
        transition={{ duration: 0.3 }}
      />

      {/* Center drape connection */}
      <motion.path
        d={`M75 0 Q100 20 125 0`}
        fill={color}
        initial={false}
        animate={{ fill: color }}
        transition={{ duration: 0.3 }}
      />
    </motion.svg>
  );
}
