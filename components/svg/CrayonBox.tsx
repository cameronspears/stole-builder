"use client";

import { motion } from "framer-motion";

interface CrayonBoxProps {
  className?: string;
  isOpen?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export function CrayonBox({ className, isOpen, isActive, onClick }: CrayonBoxProps) {
  return (
    <motion.svg
      viewBox="0 0 80 60"
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ cursor: "pointer" }}
      aria-label="Crayon box - click to select textile color"
    >
      {/* Glow effect when active */}
      {isActive && (
        <motion.ellipse
          cx="40"
          cy="35"
          rx="50"
          ry="40"
          fill="url(#crayonBoxGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      <defs>
        <radialGradient id="crayonBoxGlow">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Box back */}
      <rect x="5" y="10" width="70" height="45" rx="3" fill="#FFD93D" stroke="#E6C235" strokeWidth="2" />
      
      {/* Box front flap */}
      <motion.path
        d="M5 25 L75 25 L75 55 Q75 58 72 58 L8 58 Q5 58 5 55 Z"
        fill="#FFEC85"
        stroke="#E6C235"
        strokeWidth="2"
        initial={false}
        animate={{ 
          d: isOpen 
            ? "M5 10 L75 10 L75 20 Q75 23 72 23 L8 23 Q5 23 5 20 Z"
            : "M5 25 L75 25 L75 55 Q75 58 72 58 L8 58 Q5 58 5 55 Z"
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Label */}
      <text
        x="40"
        y="45"
        textAnchor="middle"
        fontSize="10"
        fontFamily="sans-serif"
        fontWeight="bold"
        fill="#8B4513"
      >
        TEXTILE
      </text>
      <text
        x="40"
        y="54"
        textAnchor="middle"
        fontSize="8"
        fontFamily="sans-serif"
        fill="#8B4513"
      >
        colors
      </text>
      
      {/* Decorative crayons peeking out when open */}
      {isOpen && (
        <g>
          <rect x="15" y="2" width="6" height="12" rx="1" fill="#FF6B6B" />
          <rect x="25" y="4" width="6" height="10" rx="1" fill="#20B2AA" />
          <rect x="35" y="1" width="6" height="13" rx="1" fill="#DAA520" />
          <rect x="45" y="3" width="6" height="11" rx="1" fill="#9370DB" />
          <rect x="55" y="2" width="6" height="12" rx="1" fill="#50C878" />
        </g>
      )}
    </motion.svg>
  );
}
