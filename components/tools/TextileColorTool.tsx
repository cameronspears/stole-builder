"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CrayonBox } from "@/components/svg/CrayonBox";
import { Crayon } from "@/components/svg/Crayon";
import { useStoleStore } from "@/lib/store";
import { TEXTILE_COLORS } from "@/lib/constants";
import type { TextileColorId } from "@/lib/types";

export function TextileColorTool() {
  const [isOpen, setIsOpen] = useState(false);
  const { config, updateConfig, setStep } = useStoleStore();

  const handleColorSelect = (colorId: TextileColorId) => {
    updateConfig({ textileColor: colorId });
    setStep("changed");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="tool-item bg-craft-cream rounded-lg p-3"
    >
      <h3 className="font-display text-sm font-bold text-pegboard-dark mb-2 text-center">
        Textile Color
      </h3>
      
      <div className="flex flex-col items-center">
        <CrayonBox
          className="w-20 h-16"
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
              <div className="flex gap-1 justify-center flex-wrap">
                {TEXTILE_COLORS.map((color, index) => (
                  <motion.div
                    key={color.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Crayon
                      color={color.hex}
                      label={color.name}
                      selected={config.textileColor === color.id}
                      onClick={() => handleColorSelect(color.id as TextileColorId)}
                      className="w-6 h-16"
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
