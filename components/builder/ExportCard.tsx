"use client";

import { forwardRef } from "react";
import { StolePreview } from "./StolePreview";
import { useStoleStore } from "@/lib/store";
import { calculateTotal } from "@/lib/pricing";
import {
  getStoleColorName,
  getTextileColorName,
  getTrimStyleName,
  getFontName,
  BUSINESS_INFO,
} from "@/lib/constants";

export const ExportCard = forwardRef<HTMLDivElement>(function ExportCard(_, ref) {
  const { config } = useStoleStore();
  const pricing = calculateTotal(config);

  return (
    <div
      ref={ref}
      className="bg-craft-paper p-6 rounded-xl"
      style={{ width: "400px" }}
    >
      {/* Stole preview */}
      <div className="flex justify-center mb-4">
        <StolePreview className="scale-90" />
      </div>

      {/* Divider */}
      <div className="border-t-2 border-dashed border-pegboard-light my-4" />

      {/* Design summary */}
      <div className="space-y-1 text-sm text-pegboard-dark">
        <SummaryItem 
          icon="📏" 
          text={`${config.lengthInches}" ${getStoleColorName(config.stoleColor)} Stole`} 
        />
        <SummaryItem 
          icon="🎨" 
          text={`${getTextileColorName(config.textileColor)} Textile (${config.textileOrientation})`} 
        />
        <SummaryItem 
          icon="✨" 
          text={`${config.accentMetal.charAt(0).toUpperCase() + config.accentMetal.slice(1)} ${getTrimStyleName(config.trimStyleId)} Trim`} 
        />
        {config.beadsEnabled && (
          <SummaryItem icon="💎" text="Beading Added" />
        )}
        {config.embroideryText && (
          <>
            <SummaryItem 
              icon="✒️" 
              text={`"${config.embroideryText}" in ${getFontName(config.fontPreference)}`} 
            />
            {config.embroideryFlags && (
              <SummaryItem icon="🚩" text={config.embroideryFlags} />
            )}
          </>
        )}
      </div>

      {/* Price estimate */}
      <div className="mt-4 p-3 bg-white/50 rounded-lg">
        <div className="text-center">
          <span className="text-sm text-pegboard">Estimated Total: </span>
          <span className="text-xl font-bold text-amber-600">
            ${pricing.total}
          </span>
        </div>
      </div>

      {/* Watermark / Branding */}
      <div className="mt-4 pt-3 border-t border-pegboard-light flex items-center justify-center gap-2">
        <div className="text-center">
          <p className="font-display font-bold text-pegboard-dark">
            {BUSINESS_INFO.name}
          </p>
          <p className="text-xs text-pegboard">
            {BUSINESS_INFO.website.replace("https://", "")}
          </p>
        </div>
      </div>
    </div>
  );
});

function SummaryItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}
