"use client";

import { motion } from "framer-motion";

interface CrayonProps {
  color: string;
  label?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Crayon({ color, label, selected, onClick, className }: CrayonProps) {
  // Darken color slightly for the wrapper
  const wrapperColor = color;
  
  return (
    <motion.svg
      viewBox="0 0 24 80"
      className={className}
      onClick={onClick}
      whileHover={{ y: -5, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: selected ? -10 : 0 }}
      style={{ cursor: "pointer" }}
      aria-label={`Crayon: ${label || color}`}
    >
      {/* Crayon tip */}
      <path
        d="M4 15 L12 0 L20 15 Z"
        fill={color}
      />
      
      {/* Crayon body */}
      <rect
        x="4"
        y="15"
        width="16"
        height="60"
        rx="1"
        fill={color}
      />
      
      {/* Paper wrapper */}
      <rect
        x="3"
        y="30"
        width="18"
        height="30"
        rx="1"
        fill="#1a1a1a"
        opacity="0.15"
      />
      <rect
        x="4"
        y="32"
        width="16"
        height="26"
        rx="1"
        fill="white"
        opacity="0.9"
      />
      
      {/* Wrapper zigzag edges */}
      <path
        d="M4 32 L6 30 L8 32 L10 30 L12 32 L14 30 L16 32 L18 30 L20 32"
        fill="none"
        stroke={wrapperColor}
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M4 58 L6 60 L8 58 L10 60 L12 58 L14 60 L16 58 L18 60 L20 58"
        fill="none"
        stroke={wrapperColor}
        strokeWidth="1"
        opacity="0.5"
      />
      
      {/* Selection indicator */}
      {selected && (
        <rect
          x="1"
          y="13"
          width="22"
          height="65"
          rx="2"
          fill="none"
          stroke="#333"
          strokeWidth="2"
        />
      )}
      
      {/* Highlight */}
      <rect
        x="6"
        y="17"
        width="3"
        height="40"
        rx="1"
        fill="white"
        opacity="0.3"
      />
    </motion.svg>
  );
}
