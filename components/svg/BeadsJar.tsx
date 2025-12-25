"use client";

import { motion } from "framer-motion";

interface BeadsJarProps {
  className?: string;
  metal?: "gold" | "silver";
  beadsEnabled?: boolean;
  onClick?: () => void;
  isActive?: boolean;
}

export function BeadsJar({ className, metal = "gold", beadsEnabled = false, onClick, isActive }: BeadsJarProps) {
  const beadColor = metal === "gold" ? "#D4AF37" : "#C0C0C0";
  const beadHighlight = metal === "gold" ? "#F4D03F" : "#E8E8E8";
  
  // Generate random bead positions
  const beads = [
    { cx: 20, cy: 55, r: 4 },
    { cx: 30, cy: 58, r: 5 },
    { cx: 40, cy: 54, r: 4 },
    { cx: 25, cy: 48, r: 4 },
    { cx: 35, cy: 50, r: 5 },
    { cx: 45, cy: 48, r: 4 },
    { cx: 22, cy: 42, r: 4 },
    { cx: 32, cy: 44, r: 5 },
    { cx: 42, cy: 42, r: 4 },
    { cx: 27, cy: 36, r: 4 },
    { cx: 37, cy: 38, r: 4 },
  ];

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
          cy="45"
          rx="35"
          ry="45"
          fill="url(#jarGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      {/* Jar body - glass effect */}
      <path
        d="M 15 25 Q 10 30 10 45 L 10 60 Q 10 70 20 70 L 40 70 Q 50 70 50 60 L 50 45 Q 50 30 45 25 Z"
        fill="rgba(200, 220, 255, 0.3)"
        stroke="#A0C0D0"
        strokeWidth="2"
      />
      
      {/* Glass shine */}
      <path
        d="M 18 30 Q 15 35 15 50 L 15 58"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
        fill="none"
      />
      
      {/* Beads inside */}
      {beads.map((bead, i) => (
        <motion.g key={i}>
          <circle
            cx={bead.cx}
            cy={bead.cy}
            r={bead.r}
            fill={beadColor}
          />
          <circle
            cx={bead.cx - 1}
            cy={bead.cy - 1}
            r={bead.r * 0.4}
            fill={beadHighlight}
            opacity="0.6"
          />
        </motion.g>
      ))}
      
      {/* Cork lid */}
      <rect x="18" y="15" width="24" height="12" rx="2" fill="#C4A574" />
      <rect x="20" y="17" width="20" height="8" rx="1" fill="#DEB887" />
      {/* Cork texture lines */}
      <line x1="24" y1="18" x2="24" y2="24" stroke="#B8956E" strokeWidth="1" />
      <line x1="30" y1="18" x2="30" y2="24" stroke="#B8956E" strokeWidth="1" />
      <line x1="36" y1="18" x2="36" y2="24" stroke="#B8956E" strokeWidth="1" />
      
      {/* Jar neck */}
      <rect x="18" y="22" width="24" height="5" fill="rgba(200, 220, 255, 0.4)" stroke="#A0C0D0" strokeWidth="1" />
      
      {/* Label */}
      <rect x="20" y="32" width="20" height="8" rx="1" fill="#FDF6E3" />
      <text x="30" y="38" textAnchor="middle" fontSize="5" fill="#6B5A45" fontFamily="sans-serif">
        BEADS
      </text>
      
      {/* Toggle indicator */}
      {beadsEnabled && (
        <motion.circle
          cx="48"
          cy="15"
          r="6"
          fill="#22C55E"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        />
      )}
      
      <defs>
        <radialGradient id="jarGlow">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
}
