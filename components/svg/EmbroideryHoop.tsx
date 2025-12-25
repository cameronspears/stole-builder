"use client";

import { motion } from "framer-motion";

interface EmbroideryHoopProps {
  className?: string;
  hasText?: boolean;
  onClick?: () => void;
  isActive?: boolean;
}

export function EmbroideryHoop({ className, hasText = false, onClick, isActive }: EmbroideryHoopProps) {
  return (
    <motion.svg
      viewBox="0 0 80 90"
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* Glow effect when active */}
      {isActive && (
        <motion.circle
          cx="40"
          cy="50"
          r="45"
          fill="url(#hoopGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      {/* Outer hoop ring */}
      <circle cx="40" cy="50" r="35" fill="none" stroke="#8B4513" strokeWidth="6" />
      <circle cx="40" cy="50" r="35" fill="none" stroke="#A0522D" strokeWidth="4" />
      
      {/* Inner hoop ring */}
      <circle cx="40" cy="50" r="30" fill="none" stroke="#6B3610" strokeWidth="3" />
      
      {/* Fabric inside hoop */}
      <circle cx="40" cy="50" r="28" fill="#FDF6E3" />
      
      {/* Fabric texture - subtle grid */}
      <g opacity="0.1">
        {[...Array(7)].map((_, i) => (
          <line
            key={`h${i}`}
            x1="12"
            y1={30 + i * 7}
            x2="68"
            y2={30 + i * 7}
            stroke="#6B5A45"
            strokeWidth="0.5"
          />
        ))}
        {[...Array(7)].map((_, i) => (
          <line
            key={`v${i}`}
            x1={18 + i * 7}
            y1="22"
            x2={18 + i * 7}
            y2="78"
            stroke="#6B5A45"
            strokeWidth="0.5"
          />
        ))}
      </g>
      
      {/* Embroidery preview - decorative stitches */}
      {hasText ? (
        <g>
          {/* Simulated text stitching */}
          <motion.path
            d="M 25 45 Q 28 40 32 45 T 40 45 T 48 45 T 55 45"
            fill="none"
            stroke="#DC2626"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.path
            d="M 28 55 L 35 55 M 38 52 L 38 58 M 42 55 Q 45 52 48 55 T 54 55"
            fill="none"
            stroke="#1E40AF"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </g>
      ) : (
        <g>
          {/* Decorative flower when no text */}
          <circle cx="40" cy="50" r="3" fill="#F59E0B" />
          {[...Array(6)].map((_, i) => {
            const angle = (i * 60) * (Math.PI / 180);
            const cx = 40 + 8 * Math.cos(angle);
            const cy = 50 + 8 * Math.sin(angle);
            return (
              <circle key={i} cx={cx} cy={cy} r="4" fill="#EC4899" opacity="0.8" />
            );
          })}
          {/* Leaves */}
          <ellipse cx="30" cy="60" rx="3" ry="6" fill="#22C55E" transform="rotate(-30 30 60)" />
          <ellipse cx="50" cy="60" rx="3" ry="6" fill="#22C55E" transform="rotate(30 50 60)" />
        </g>
      )}
      
      {/* Tightening screw at top */}
      <rect x="36" y="12" width="8" height="8" rx="1" fill="#B8860B" />
      <rect x="38" y="14" width="4" height="4" rx="0.5" fill="#DAA520" />
      <line x1="40" y1="15" x2="40" y2="17" stroke="#8B6914" strokeWidth="1" />
      
      {/* Hang loop */}
      <circle cx="40" cy="8" r="5" fill="none" stroke="#8B4513" strokeWidth="2" />
      
      <defs>
        <radialGradient id="hoopGlow">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
}
