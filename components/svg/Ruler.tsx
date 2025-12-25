"use client";

import { motion } from "framer-motion";

interface RulerProps {
  className?: string;
  selectedLength?: 62 | 72;
  onSelect?: (length: 62 | 72) => void;
  isActive?: boolean;
  onClick?: () => void;
}

export function Ruler({ className, selectedLength = 62, onSelect, isActive, onClick }: RulerProps) {
  return (
    <motion.svg
      viewBox="0 0 100 50"
      className={className}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
      aria-label="Length selector"
    >
      {/* Glow effect when active */}
      {isActive && (
        <motion.ellipse
          cx="50"
          cy="25"
          rx="55"
          ry="30"
          fill="url(#rulerGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      <defs>
        <radialGradient id="rulerGlow">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Ruler body */}
      <rect
        x="5"
        y="10"
        width="90"
        height="30"
        rx="2"
        fill="#DEB887"
        stroke="#B8860B"
        strokeWidth="1"
      />
      
      {/* Wood grain lines */}
      <line x1="10" y1="15" x2="90" y2="15" stroke="#C4A574" strokeWidth="0.5" opacity="0.5" />
      <line x1="10" y1="25" x2="90" y2="25" stroke="#C4A574" strokeWidth="0.5" opacity="0.5" />
      <line x1="10" y1="35" x2="90" y2="35" stroke="#C4A574" strokeWidth="0.5" opacity="0.5" />
      
      {/* Measurement marks */}
      {Array.from({ length: 11 }).map((_, i) => (
        <line
          key={i}
          x1={10 + i * 8}
          y1="10"
          x2={10 + i * 8}
          y2={i % 5 === 0 ? 18 : 14}
          stroke="#8B4513"
          strokeWidth="1"
        />
      ))}
      
      {/* Length option buttons */}
      <g
        onClick={() => onSelect?.(62)}
        style={{ cursor: "pointer" }}
      >
        <rect
          x="12"
          y="20"
          width="35"
          height="16"
          rx="3"
          fill={selectedLength === 62 ? "#8B7355" : "#F5E6D3"}
          stroke="#8B4513"
          strokeWidth="1"
        />
        <text
          x="29.5"
          y="31"
          textAnchor="middle"
          fontSize="9"
          fontFamily="sans-serif"
          fontWeight="bold"
          fill={selectedLength === 62 ? "white" : "#8B4513"}
        >
          62&quot;
        </text>
      </g>
      
      <g
        onClick={() => onSelect?.(72)}
        style={{ cursor: "pointer" }}
      >
        <rect
          x="53"
          y="20"
          width="35"
          height="16"
          rx="3"
          fill={selectedLength === 72 ? "#8B7355" : "#F5E6D3"}
          stroke="#8B4513"
          strokeWidth="1"
        />
        <text
          x="70.5"
          y="31"
          textAnchor="middle"
          fontSize="9"
          fontFamily="sans-serif"
          fontWeight="bold"
          fill={selectedLength === 72 ? "white" : "#8B4513"}
        >
          72&quot;
        </text>
      </g>
    </motion.svg>
  );
}
