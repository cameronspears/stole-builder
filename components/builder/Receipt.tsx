"use client";

import { motion } from "framer-motion";
import { useStoleStore } from "@/lib/store";
import { calculateTotal } from "@/lib/pricing";
import {
  getStoleColorName,
  getTextileColorName,
  getTrimStyleName,
  getFontName,
} from "@/lib/constants";

interface ReceiptProps {
  onExport: () => void;
}

export function Receipt({ onExport }: ReceiptProps) {
  const { config } = useStoleStore();
  const pricing = calculateTotal(config);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-craft-cream rounded-lg shadow-pinned p-4 w-full max-w-xs"
    >
      {/* Receipt header */}
      <div className="border-b-2 border-dashed border-pegboard-light pb-2 mb-3">
        <h2 className="font-display text-lg font-bold text-pegboard-dark text-center">
          Your Stole
        </h2>
        <p className="text-xs text-pegboard text-center">Design Summary</p>
      </div>

      {/* Design details */}
      <div className="space-y-2 text-sm mb-4">
        <ReceiptLine 
          label="Length" 
          value={`${config.lengthInches}"`} 
        />
        <ReceiptLine 
          label="Stole Color" 
          value={getStoleColorName(config.stoleColor)} 
        />
        <ReceiptLine 
          label="Textile" 
          value={`${getTextileColorName(config.textileColor)} (${config.textileOrientation})`} 
        />
        <ReceiptLine 
          label="Accent" 
          value={`${config.accentMetal.charAt(0).toUpperCase() + config.accentMetal.slice(1)} - ${getTrimStyleName(config.trimStyleId)}`} 
        />
        <ReceiptLine 
          label="Beading" 
          value={config.beadsEnabled ? "Yes" : "No"} 
        />
        
        {config.embroideryText && (
          <>
            <div className="border-t border-dashed border-pegboard-light my-2" />
            <ReceiptLine 
              label="Embroidery" 
              value={config.embroideryText} 
            />
            <ReceiptLine 
              label="Font" 
              value={getFontName(config.fontPreference)} 
            />
            {config.embroideryFlags && (
              <ReceiptLine 
                label="Flags" 
                value={config.embroideryFlags} 
              />
            )}
            {config.embroideryDesignNotes && (
              <div className="text-xs text-pegboard-light">
                <span className="font-medium">Notes:</span> {config.embroideryDesignNotes}
              </div>
            )}
          </>
        )}
      </div>

      {/* Pricing */}
      <div className="border-t-2 border-dashed border-pegboard-light pt-3 mb-4">
        <h3 className="font-display text-sm font-bold text-pegboard-dark mb-2">
          Estimate
        </h3>
        {pricing.lineItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between text-sm"
          >
            <span className="text-pegboard">{item.label}</span>
            <span className="text-pegboard-dark font-medium">
              ${item.price}
            </span>
          </motion.div>
        ))}
        <div className="flex justify-between text-base font-bold mt-2 pt-2 border-t border-pegboard-light">
          <span className="text-pegboard-dark">Total</span>
          <span className="text-amber-600">${pricing.total}</span>
        </div>
      </div>

      {/* Export button */}
      <motion.button
        onClick={onExport}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-primary text-sm py-2"
      >
        Save & Share
      </motion.button>
    </motion.div>
  );
}

function ReceiptLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-pegboard font-medium">{label}:</span>
      <span className="text-pegboard-dark text-right truncate max-w-[140px]">
        {value}
      </span>
    </div>
  );
}
