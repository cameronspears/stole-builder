"use client";

import { motion } from "framer-motion";

interface PaintTubeProps {
  className?: string;
  isOpen?: boolean;
  onClick?: () => void;
}

export function PaintTube({ className, isOpen, onClick }: PaintTubeProps) {
  return (
    <motion.svg
      viewBox="0 0 60 100"
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ cursor: "pointer" }}
      aria-label="Paint tube - click to select stole color"
    >
      {/* Tube cap */}
      <rect x="20" y="5" width="20" height="15" rx="3" fill="#333" />
      <rect x="23" y="0" width="14" height="8" rx="2" fill="#444" />
      
      {/* Paint squeeze coming out when open */}
      {isOpen && (
        <motion.ellipse
          cx="30"
          cy="3"
          rx="6"
          ry="4"
          fill="#FF6B6B"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {/* Tube body */}
      <path
        d="M15 20 L45 20 L50 90 Q50 95 45 95 L15 95 Q10 95 10 90 Z"
        fill="url(#tubeGradient)"
        stroke="#CCC"
        strokeWidth="1"
      />
      
      {/* Tube label area */}
      <rect x="15" y="35" width="30" height="45" rx="2" fill="white" opacity="0.9" />
      
      {/* Label text */}
      <text
        x="30"
        y="52"
        textAnchor="middle"
        fontSize="7"
        fontFamily="sans-serif"
        fontWeight="bold"
        fill="#333"
      >
        STOLE
      </text>
      <text
        x="30"
        y="62"
        textAnchor="middle"
        fontSize="7"
        fontFamily="sans-serif"
        fontWeight="bold"
        fill="#333"
      >
        COLOR
      </text>
      
      {/* Tube crimp lines */}
      <line x1="12" y1="88" x2="48" y2="88" stroke="#999" strokeWidth="1" />
      <line x1="13" y1="91" x2="47" y2="91" stroke="#999" strokeWidth="1" />
      
      <defs>
        <linearGradient id="tubeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="50%" stopColor="#F5F5F5" />
          <stop offset="100%" stopColor="#D8D8D8" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}
