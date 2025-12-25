"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PaintTube } from "@/components/svg/PaintTube";
import { PaintSplotch } from "@/components/svg/PaintSplotch";
import { useStoleStore } from "@/lib/store";
import { STOLE_COLORS } from "@/lib/constants";
import type { StoleColorId } from "@/lib/types";

interface StoleColorToolItemProps {
  onClick: () => void;
  isActive: boolean;
}

export function StoleColorToolItem({ onClick, isActive }: StoleColorToolItemProps) {
  return (
    <div className="flex flex-col items-center">
      <PaintTube
        className="w-14 h-24"
        isActive={isActive}
        onClick={onClick}
      />
    </div>
  );
}

export function StoleColorToolDrawerContent() {
  const { config, updateConfig, setStep, advanceSuggestedTool } = useStoleStore();

  const handleColorSelect = (colorId: StoleColorId) => {
    updateConfig({ stoleColor: colorId });
    setStep("changed");
    advanceSuggestedTool();
  };

  const selectedColor = STOLE_COLORS.find(c => c.id === config.stoleColor);

  return (
    <div className="space-y-4">
      <p className="text-sm text-pegboard mb-2">
        Select the base color for your stole:
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
      
      <div className="grid grid-cols-4 gap-3">
        {STOLE_COLORS.map((color, index) => (
          <motion.div
            key={color.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            className="flex flex-col items-center gap-1"
          >
            <PaintSplotch
              color={color.hex}
              selected={config.stoleColor === color.id}
              onClick={() => handleColorSelect(color.id as StoleColorId)}
              className="w-12 h-12"
            />
            <span className="text-[10px] text-pegboard text-center leading-tight">
              {color.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Legacy export for backwards compatibility
export function StoleColorTool() {
  const { config, updateConfig, setStep } = useStoleStore();
  const [isOpen, setIsOpen] = useState(false);

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
      </div>
    </motion.div>
  );
}


