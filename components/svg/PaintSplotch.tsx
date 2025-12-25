"use client";

import { motion } from "framer-motion";

interface PaintSplotchProps {
  color: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function PaintSplotch({ color, selected, onClick, className }: PaintSplotchProps) {
  return (
    <motion.svg
      viewBox="0 0 50 50"
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      style={{ cursor: "pointer" }}
      aria-label={`Color option: ${color}`}
    >
      {/* Selection ring */}
      {selected && (
        <circle
          cx="25"
          cy="25"
          r="24"
          fill="none"
          stroke="#333"
          strokeWidth="3"
        />
      )}
      
      {/* Organic splotch shape */}
      <path
        d={`M25 5 
            Q40 8 43 20 
            Q46 32 38 40 
            Q30 48 20 45 
            Q8 42 6 30 
            Q4 18 15 8 
            Q20 4 25 5`}
        fill={color}
        stroke={selected ? "#333" : "rgba(0,0,0,0.2)"}
        strokeWidth={selected ? 2 : 1}
      />
      
      {/* Highlight */}
      <ellipse
        cx="18"
        cy="18"
        rx="6"
        ry="4"
        fill="white"
        opacity="0.4"
        transform="rotate(-30 18 18)"
      />
    </motion.svg>
  );
}
