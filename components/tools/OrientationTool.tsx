"use client";

import { motion } from "framer-motion";
import { Compass } from "@/components/svg/Compass";
import { useStoleStore } from "@/lib/store";
import { getTextileColorHex } from "@/lib/constants";
import type { TextileOrientation } from "@/lib/types";

interface OrientationToolItemProps {
  onClick: () => void;
  isActive: boolean;
}

export function OrientationToolItem({ onClick, isActive }: OrientationToolItemProps) {
  const { config } = useStoleStore();
  
  return (
    <div className="flex flex-col items-center">
      <Compass
        className="w-16 h-16"
        orientation={config.textileOrientation}
        isActive={isActive}
        onClick={onClick}
      />
    </div>
  );
}

export function OrientationToolDrawerContent() {
  const { config, updateConfig, completeStep, setActiveTool } = useStoleStore();
  const textileColorHex = getTextileColorHex(config.textileColor);

  const handleSelect = (orientation: TextileOrientation) => {
    updateConfig({ textileOrientation: orientation });
    completeStep("orientation");
    setActiveTool(null);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-pegboard mb-4">
        Choose how the textile pattern is oriented:
      </p>
      
      <div className="flex justify-center gap-4">
        {/* Straight option */}
        <motion.button
          onClick={() => handleSelect("straight")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-4 rounded-lg transition-all ${
            config.textileOrientation === "straight"
              ? "bg-amber-100 border-2 border-amber-500"
              : "bg-white border border-gray-300 hover:border-gray-400"
          }`}
        >
          <svg viewBox="0 0 50 70" className="w-12 h-16">
            {/* Stole outline */}
            <rect x="10" y="5" width="30" height="60" rx="3" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
            {/* Straight textile */}
            <rect x="14" y="20" width="22" height="35" fill={textileColorHex} />
          </svg>
          <div className="text-xs font-medium text-pegboard-dark mt-2">
            Straight
          </div>
        </motion.button>

        {/* Angled option */}
        <motion.button
          onClick={() => handleSelect("angled")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-4 rounded-lg transition-all ${
            config.textileOrientation === "angled"
              ? "bg-amber-100 border-2 border-amber-500"
              : "bg-white border border-gray-300 hover:border-gray-400"
          }`}
        >
          <svg viewBox="0 0 50 70" className="w-12 h-16">
            {/* Stole outline */}
            <rect x="10" y="5" width="30" height="60" rx="3" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
            {/* Angled textile */}
            <path
              d="M14 30 L36 20 L36 55 L14 50 Z"
              fill={textileColorHex}
            />
          </svg>
          <div className="text-xs font-medium text-pegboard-dark mt-2">
            Angled
          </div>
        </motion.button>
      </div>
    </div>
  );
}

// Legacy export for backwards compatibility
export function OrientationTool() {
  const { config, updateConfig, setStep } = useStoleStore();
  const textileColorHex = getTextileColorHex(config.textileColor);

  const handleSelect = (orientation: TextileOrientation) => {
    updateConfig({ textileOrientation: orientation });
    setStep("changed");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="tool-item bg-craft-cream rounded-lg p-3"
    >
      <h3 className="font-display text-sm font-bold text-pegboard-dark mb-3 text-center">
        Textile Style
      </h3>
      
      <div className="flex justify-center gap-3">
        {/* Straight option */}
        <motion.button
          onClick={() => handleSelect("straight")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-lg transition-all ${
            config.textileOrientation === "straight"
              ? "bg-amber-100 border-2 border-amber-500"
              : "bg-white border border-gray-300 hover:border-gray-400"
          }`}
        >
          <svg viewBox="0 0 40 60" className="w-8 h-12">
            <rect x="5" y="0" width="30" height="60" fill="#E5E7EB" stroke="#9CA3AF" />
            <rect x="8" y="20" width="24" height="30" fill={textileColorHex} />
          </svg>
          <div className="text-[10px] font-medium text-pegboard-dark mt-1">
            Straight
          </div>
        </motion.button>

        {/* Angled option */}
        <motion.button
          onClick={() => handleSelect("angled")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-lg transition-all ${
            config.textileOrientation === "angled"
              ? "bg-amber-100 border-2 border-amber-500"
              : "bg-white border border-gray-300 hover:border-gray-400"
          }`}
        >
          <svg viewBox="0 0 40 60" className="w-8 h-12">
            <rect x="5" y="0" width="30" height="60" fill="#E5E7EB" stroke="#9CA3AF" />
            <path
              d="M8 30 L32 20 L32 50 L8 45 Z"
              fill={textileColorHex}
            />
          </svg>
          <div className="text-[10px] font-medium text-pegboard-dark mt-1">
            Angled
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}
