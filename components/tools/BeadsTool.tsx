"use client";

import { motion } from "framer-motion";
import { useStoleStore } from "@/lib/store";
import { PRICING } from "@/lib/constants";

export function BeadsTool() {
  const { config, updateConfig, setStep } = useStoleStore();

  const handleToggle = () => {
    updateConfig({ beadsEnabled: !config.beadsEnabled });
    setStep("changed");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="tool-item bg-craft-cream rounded-lg p-3"
    >
      <h3 className="font-display text-sm font-bold text-pegboard-dark mb-2 text-center">
        Beading
      </h3>
      
      <div className="flex flex-col items-center gap-2">
        {/* Toggle Switch */}
        <motion.button
          onClick={handleToggle}
          className={`toggle-switch ${
            config.beadsEnabled ? "bg-amber-500" : "bg-gray-300"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="toggle-switch-knob"
            animate={{ x: config.beadsEnabled ? 28 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.button>
        
        <span className="text-xs text-pegboard">
          {config.beadsEnabled ? "On" : "Off"}
        </span>
        
        {/* Beads preview */}
        <div className="flex gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: config.beadsEnabled ? 1 : 0.5,
                opacity: config.beadsEnabled ? 1 : 0.3,
              }}
              className={`w-3 h-3 rounded-full ${
                config.accentMetal === "gold"
                  ? "bg-gradient-to-br from-yellow-400 to-amber-500"
                  : "bg-gradient-to-br from-gray-300 to-gray-400"
              }`}
              style={{
                boxShadow: config.beadsEnabled
                  ? "0 2px 4px rgba(0,0,0,0.2)"
                  : "none",
              }}
            />
          ))}
        </div>
        
        {/* Price indicator */}
        <span className="text-[10px] text-pegboard-light">
          {config.beadsEnabled && `+$${PRICING.beadsAddon}`}
        </span>
      </div>
    </motion.div>
  );
}
