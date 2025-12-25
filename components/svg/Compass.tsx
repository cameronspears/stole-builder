"use client";

import { motion } from "framer-motion";

interface CompassProps {
  className?: string;
  orientation?: "straight" | "angled";
  onClick?: () => void;
  isActive?: boolean;
}

export function Compass({ className, orientation = "straight", onClick, isActive }: CompassProps) {
  const needleRotation = orientation === "angled" ? 45 : 0;
  
  return (
    <motion.svg
      viewBox="0 0 70 70"
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* Glow effect when active */}
      {isActive && (
        <motion.circle
          cx="35"
          cy="35"
          r="40"
          fill="url(#compassGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      {/* Outer ring - brass */}
      <circle cx="35" cy="35" r="32" fill="#B8860B" />
      <circle cx="35" cy="35" r="30" fill="#DAA520" />
      <circle cx="35" cy="35" r="28" fill="#B8860B" stroke="#8B6914" strokeWidth="1" />
      
      {/* Inner face - cream/white */}
      <circle cx="35" cy="35" r="26" fill="#FDF6E3" />
      
      {/* Compass markings */}
      <text x="35" y="14" textAnchor="middle" fontSize="7" fill="#6B5A45" fontWeight="bold">N</text>
      <text x="35" y="62" textAnchor="middle" fontSize="7" fill="#6B5A45" fontWeight="bold">S</text>
      <text x="10" y="38" textAnchor="middle" fontSize="7" fill="#6B5A45" fontWeight="bold">W</text>
      <text x="60" y="38" textAnchor="middle" fontSize="7" fill="#6B5A45" fontWeight="bold">E</text>
      
      {/* Tick marks */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30) * (Math.PI / 180);
        const x1 = 35 + 22 * Math.sin(angle);
        const y1 = 35 - 22 * Math.cos(angle);
        const x2 = 35 + 25 * Math.sin(angle);
        const y2 = 35 - 25 * Math.cos(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#6B5A45"
            strokeWidth={i % 3 === 0 ? 2 : 1}
          />
        );
      })}
      
      {/* Compass needle */}
      <motion.g
        animate={{ rotate: needleRotation }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformOrigin: "35px 35px" }}
      >
        {/* North (red) half */}
        <polygon
          points="35,12 32,35 38,35"
          fill="#DC2626"
        />
        {/* South (white) half */}
        <polygon
          points="35,58 32,35 38,35"
          fill="#E5E7EB"
          stroke="#9CA3AF"
          strokeWidth="0.5"
        />
      </motion.g>
      
      {/* Center pin */}
      <circle cx="35" cy="35" r="4" fill="#B8860B" />
      <circle cx="35" cy="35" r="2" fill="#DAA520" />
      
      {/* Glass dome effect */}
      <circle
        cx="35"
        cy="35"
        r="26"
        fill="none"
        stroke="white"
        strokeWidth="2"
        opacity="0.3"
        strokeDasharray="20 50"
        transform="rotate(-45 35 35)"
      />
      
      {/* Hang loop */}
      <path
        d="M 30 2 Q 35 -3 40 2"
        fill="none"
        stroke="#B8860B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      <defs>
        <radialGradient id="compassGlow">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
}
