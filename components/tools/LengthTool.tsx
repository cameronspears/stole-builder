"use client";

import { motion } from "framer-motion";
import { Ruler } from "@/components/svg/Ruler";
import { useStoleStore } from "@/lib/store";
import type { StoleLength } from "@/lib/types";

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
