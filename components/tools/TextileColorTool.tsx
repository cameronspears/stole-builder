"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CrayonBox } from "@/components/svg/CrayonBox";
import { Crayon } from "@/components/svg/Crayon";
import { useStoleStore } from "@/lib/store";
import { TEXTILE_COLORS } from "@/lib/constants";
import type { TextileColorId } from "@/lib/types";

interface TextileColorToolItemProps {
  onClick: () => void;
  isActive: boolean;
}

export function TextileColorToolItem({ onClick, isActive }: TextileColorToolItemProps) {
  return (
    <div className="flex flex-col items-center">
      <CrayonBox
        className="w-20 h-14"
        isActive={isActive}
        onClick={onClick}
      />
    </div>
  );
}

export function TextileColorToolDrawerContent() {
  const { config, updateConfig, setStep, advanceSuggestedTool } = useStoleStore();

  const handleColorSelect = (colorId: TextileColorId) => {
    updateConfig({ textileColor: colorId });
    setStep("changed");
    advanceSuggestedTool();
  };

  const selectedColor = TEXTILE_COLORS.find(c => c.id === config.textileColor);

  return (
    <div className="space-y-4">
      <p className="text-sm text-pegboard mb-2">
        Choose the textile (sinh) color:
      </p>
      
      {selectedColor && (
        <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg mb-4">
          <div 
            className="w-6 h-6 rounded-full border-2 border-gray-300"
            style={{ backgroundColor: selectedColor.hex }}
          />
          <span className="text-sm font-medium text-pegboard-dark">
            {selectedColor.name}
          </span>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 justify-center">
        {TEXTILE_COLORS.map((color, index) => (
          <motion.div
            key={color.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Crayon
              color={color.hex}
              label={color.name}
              selected={config.textileColor === color.id}
              onClick={() => handleColorSelect(color.id as TextileColorId)}
              className="w-8 h-20"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Legacy export for backwards compatibility
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
      </div>
    </motion.div>
  );
}
