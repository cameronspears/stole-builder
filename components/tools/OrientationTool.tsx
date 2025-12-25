"use client";

import { motion } from "framer-motion";
import { useStoleStore } from "@/lib/store";
import type { TextileOrientation } from "@/lib/types";

export function OrientationTool() {
  const { config, updateConfig, setStep } = useStoleStore();

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
            {/* Straight textile preview */}
            <rect x="5" y="0" width="30" height="60" fill="#E5E7EB" stroke="#9CA3AF" />
            <rect x="8" y="20" width="24" height="30" fill={config.textileColor === "coral" ? "#FF6B6B" : "#20B2AA"} />
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
            {/* Angled textile preview */}
            <rect x="5" y="0" width="30" height="60" fill="#E5E7EB" stroke="#9CA3AF" />
            <path
              d="M8 30 L32 20 L32 50 L8 45 Z"
              fill={config.textileColor === "coral" ? "#FF6B6B" : "#20B2AA"}
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
