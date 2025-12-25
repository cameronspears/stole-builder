"use client";

import { motion } from "framer-motion";
import { Ruler } from "@/components/svg/Ruler";
import { useStoleStore } from "@/lib/store";
import type { StoleLength } from "@/lib/types";

interface LengthToolItemProps {
  onClick: () => void;
  isActive: boolean;
}

export function LengthToolItem({ onClick, isActive }: LengthToolItemProps) {
  const { config } = useStoleStore();
  
  return (
    <div className="flex flex-col items-center">
      <Ruler
        className="w-24 h-12"
        selectedLength={config.lengthInches}
        isActive={isActive}
        onClick={onClick}
      />
    </div>
  );
}

export function LengthToolDrawerContent() {
  const { config, updateConfig, setStep, advanceSuggestedTool } = useStoleStore();

  const handleSelect = (length: StoleLength) => {
    updateConfig({ lengthInches: length });
    setStep("changed");
    advanceSuggestedTool();
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-pegboard mb-4">
        Choose the length of your graduation stole:
      </p>
      
      <div className="space-y-3">
        <motion.button
          onClick={() => handleSelect(62)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
            config.lengthInches === 62
              ? "bg-amber-100 border-amber-500"
              : "bg-white border-gray-300 hover:border-gray-400"
          }`}
        >
          <div className="text-left">
            <div className="font-display font-bold text-pegboard-dark">62 inches</div>
            <div className="text-xs text-pegboard">Standard length</div>
          </div>
          {config.lengthInches === 62 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>
          )}
        </motion.button>

        <motion.button
          onClick={() => handleSelect(72)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
            config.lengthInches === 72
              ? "bg-amber-100 border-amber-500"
              : "bg-white border-gray-300 hover:border-gray-400"
          }`}
        >
          <div className="text-left">
            <div className="font-display font-bold text-pegboard-dark">72 inches</div>
            <div className="text-xs text-pegboard">Extended length (+$10)</div>
          </div>
          {config.lengthInches === 72 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>
          )}
        </motion.button>
      </div>
    </div>
  );
}

// Legacy export for backwards compatibility
export function LengthTool() {
  const { config, updateConfig, setStep } = useStoleStore();

  const handleSelect = (length: StoleLength) => {
    updateConfig({ lengthInches: length });
    setStep("changed");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="tool-item bg-craft-cream rounded-lg p-3"
    >
      <h3 className="font-display text-sm font-bold text-pegboard-dark mb-2 text-center">
        Stole Length
      </h3>
      <Ruler
        className="w-full h-auto"
        selectedLength={config.lengthInches}
        onSelect={handleSelect}
      />
    </motion.div>
  );
}
