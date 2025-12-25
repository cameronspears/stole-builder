"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaintTube } from "@/components/svg/PaintTube";
import { PaintSplotch } from "@/components/svg/PaintSplotch";
import { useStoleStore } from "@/lib/store";
import { STOLE_COLORS } from "@/lib/constants";
import type { StoleColorId } from "@/lib/types";

export function StoleColorTool() {
  const [isOpen, setIsOpen] = useState(false);
  const { config, updateConfig, setStep } = useStoleStore();

  const handleColorSelect = (colorId: StoleColorId) => {
    updateConfig({ stoleColor: colorId });
    setStep("changed");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="tool-item bg-craft-cream rounded-lg p-3"
    >
      <h3 className="font-display text-sm font-bold text-pegboard-dark mb-2 text-center">
        Stole Color
      </h3>
      
      <div className="flex flex-col items-center">
        <PaintTube
          className="w-12 h-20"
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 overflow-hidden"
            >
              <div className="grid grid-cols-4 gap-2">
                {STOLE_COLORS.map((color, index) => (
                  <motion.div
                    key={color.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <PaintSplotch
                      color={color.hex}
                      selected={config.stoleColor === color.id}
                      onClick={() => handleColorSelect(color.id as StoleColorId)}
                      className="w-10 h-10"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
