"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStoleStore } from "@/lib/store";
import { TRIM_STYLES } from "@/lib/constants";
import type { AccentMetal, TrimStyleId } from "@/lib/types";

export function AccentTool() {
  const { config, updateConfig, setStep } = useStoleStore();

  const handleMetalChange = (metal: AccentMetal) => {
    // When switching metals, select the first trim style of that metal
    const firstTrimOfMetal = TRIM_STYLES[metal][0].id;
    updateConfig({ accentMetal: metal, trimStyleId: firstTrimOfMetal });
    setStep("changed");
  };

  const handleTrimSelect = (trimId: TrimStyleId) => {
    updateConfig({ trimStyleId: trimId });
    setStep("changed");
  };

  const currentTrims = TRIM_STYLES[config.accentMetal];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="tool-item bg-craft-cream rounded-lg p-3"
    >
      <h3 className="font-display text-sm font-bold text-pegboard-dark mb-3 text-center">
        Accent & Trim
      </h3>
      
      {/* Metal Toggle */}
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => handleMetalChange("gold")}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            config.accentMetal === "gold"
              ? "bg-gradient-to-r from-yellow-500 to-amber-400 text-white shadow-md"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          Gold
        </button>
        <button
          onClick={() => handleMetalChange("silver")}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            config.accentMetal === "silver"
              ? "bg-gradient-to-r from-gray-400 to-gray-300 text-white shadow-md"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          Silver
        </button>
      </div>

      {/* Trim Style Selection */}
      <AnimatePresence mode="wait">
        <motion.div
          key={config.accentMetal}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-2"
        >
          <p className="text-xs text-pegboard text-center mb-2">
            Choose trim style:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {currentTrims.map((trim) => (
              <motion.button
                key={trim.id}
                onClick={() => handleTrimSelect(trim.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg text-xs font-medium transition-all ${
                  config.trimStyleId === trim.id
                    ? config.accentMetal === "gold"
                      ? "bg-amber-100 border-2 border-amber-500 text-amber-800"
                      : "bg-gray-100 border-2 border-gray-500 text-gray-800"
                    : "bg-white border border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                <div className="font-bold">{trim.name}</div>
                <div className="text-[10px] opacity-75">{trim.description}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
