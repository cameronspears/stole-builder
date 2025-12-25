"use client";

import { motion } from "framer-motion";

interface ThreadSpoolProps {
  className?: string;
  metal?: "gold" | "silver";
  onClick?: () => void;
  isActive?: boolean;
}

export function ThreadSpool({ className, metal = "gold", onClick, isActive }: ThreadSpoolProps) {
  const threadColor = metal === "gold" ? "#D4AF37" : "#C0C0C0";
  const threadHighlight = metal === "gold" ? "#F4D03F" : "#E8E8E8";
  
  return (
    <motion.svg
      viewBox="0 0 60 80"
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* Glow effect when active */}
      {isActive && (
        <motion.ellipse
          cx="30"
          cy="40"
          rx="35"
          ry="45"
          fill="url(#spoolGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      {/* Top disc */}
      <ellipse cx="30" cy="12" rx="22" ry="8" fill="#8B4513" />
      <ellipse cx="30" cy="10" rx="22" ry="8" fill="#A0522D" />
      <ellipse cx="30" cy="10" rx="16" ry="5" fill="#6B3610" />
      
      {/* Thread body */}
      <rect x="8" y="10" width="44" height="55" rx="2" fill={threadColor} />
      
      {/* Thread wrap lines */}
      {[...Array(8)].map((_, i) => (
        <motion.path
          key={i}
          d={`M 8 ${15 + i * 7} Q 30 ${12 + i * 7} 52 ${15 + i * 7}`}
          stroke={threadHighlight}
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
        />
      ))}
      
      {/* Center hole visible through top */}
      <ellipse cx="30" cy="10" rx="6" ry="2" fill="#4A3520" />
      
      {/* Bottom disc */}
      <ellipse cx="30" cy="65" rx="22" ry="8" fill="#6B3610" />
      <ellipse cx="30" cy="67" rx="22" ry="8" fill="#8B4513" />
      <ellipse cx="30" cy="67" rx="16" ry="5" fill="#A0522D" />
      
      {/* Shine highlight */}
      <ellipse cx="20" cy="35" rx="4" ry="15" fill="white" opacity="0.2" />
      
      <defs>
        <radialGradient id="spoolGlow">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
}
