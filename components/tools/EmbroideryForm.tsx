"use client";

import { motion } from "framer-motion";
import { useStoleStore } from "@/lib/store";
import { FONT_OPTIONS } from "@/lib/constants";
import type { FontPreferenceId } from "@/lib/types";

export function EmbroideryForm() {
  const { config, updateConfig, setStep } = useStoleStore();

  const handleChange = (field: string, value: string) => {
    updateConfig({ [field]: value });
    setStep("changed");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="tool-item bg-craft-cream rounded-lg p-3"
    >
      <h3 className="font-display text-sm font-bold text-pegboard-dark mb-3 text-center">
        Embroidery
      </h3>
      
      <div className="space-y-3">
        {/* Main text */}
        <div>
          <label className="block text-xs font-medium text-pegboard-dark mb-1">
            Text to embroider
          </label>
          <input
            type="text"
            value={config.embroideryText}
            onChange={(e) => handleChange("embroideryText", e.target.value)}
            placeholder="e.g., Class of 2025"
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
          />
        </div>

        {/* Font selection */}
        <div>
          <label className="block text-xs font-medium text-pegboard-dark mb-1">
            Font style
          </label>
          <select
            value={config.fontPreference}
            onChange={(e) => handleChange("fontPreference", e.target.value as FontPreferenceId)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none bg-white"
          >
            {FONT_OPTIONS.map((font) => (
              <option key={font.id} value={font.id}>
                {font.name} ({font.style})
              </option>
            ))}
          </select>
        </div>

        {/* Custom font request */}
        <div>
          <label className="block text-xs font-medium text-pegboard-dark mb-1">
            Specific font in mind?
          </label>
          <input
            type="text"
            value={config.customFontRequest}
            onChange={(e) => handleChange("customFontRequest", e.target.value)}
            placeholder="e.g., I'd love something like..."
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
          />
        </div>

        {/* Flags */}
        <div>
          <label className="block text-xs font-medium text-pegboard-dark mb-1">
            Flags or symbols
          </label>
          <input
            type="text"
            value={config.embroideryFlags}
            onChange={(e) => handleChange("embroideryFlags", e.target.value)}
            placeholder="e.g., Laos flag, US flag"
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
          />
        </div>

        {/* Design notes */}
        <div>
          <label className="block text-xs font-medium text-pegboard-dark mb-1">
            Design notes
          </label>
          <textarea
            value={config.embroideryDesignNotes}
            onChange={(e) => handleChange("embroideryDesignNotes", e.target.value)}
            placeholder="Any other design ideas or requests..."
            rows={2}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none resize-none"
          />
        </div>
      </div>
    </motion.div>
  );
}
