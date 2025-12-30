"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Hanger } from "@/components/svg/Hanger";
import { StoleBase } from "@/components/svg/StoleBase";
import { TextilePanel } from "@/components/svg/TextilePanel";
import { Trim } from "@/components/svg/Trim";
import { Beads } from "@/components/svg/Beads";
import { useStoleStore } from "@/lib/store";
import { getFontFamily, getStoleColorHex, getTextileColorHex } from "@/lib/constants";

interface StolePreviewProps {
  className?: string;
}

export function StolePreview({ className }: StolePreviewProps) {
  const { config } = useStoleStore();

  const stoleColorHex = getStoleColorHex(config.stoleColor);
  const textileColorHex = getTextileColorHex(config.textileColor);
  const fontFamily = getFontFamily(config.fontPreference);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Hanger - fixed position */}
      <Hanger className="w-48 h-auto relative z-10" />
      
      {/* Stole layers container */}
      <motion.div
        className="relative -mt-4"
        style={{ width: "200px" }}
        layout
      >
        {/* Base stole fabric */}
        <StoleBase
          color={stoleColorHex}
          lengthInches={config.lengthInches}
          className="w-full h-auto"
        />
        
        {/* Textile panel overlay */}
        <div className="absolute top-0 left-0 w-full">
          <TextilePanel
            color={textileColorHex}
            orientation={config.textileOrientation}
            lengthInches={config.lengthInches}
            className="w-full h-auto"
          />
        </div>
        
        {/* Trim overlay */}
        <div className="absolute top-0 left-0 w-full">
          <Trim
            styleId={config.trimStyleId}
            lengthInches={config.lengthInches}
            className="w-full h-auto"
          />
        </div>
        
        {/* Beads - conditional */}
        <AnimatePresence>
          {config.beadsEnabled && (
            <div className="absolute top-0 left-0 w-full">
              <Beads
                metal={config.accentMetal}
                lengthInches={config.lengthInches}
                className="w-full h-auto"
              />
            </div>
          )}
        </AnimatePresence>
        
        {/* Embroidery preview text */}
        {config.embroideryText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none"
            style={{
              top: config.lengthInches === 72 ? "35%" : "30%",
            }}
          >
            <div className="flex gap-8">
              {/* Left panel text */}
              <div
                className="text-center text-[10px] font-medium max-w-[36px] break-words"
                style={{
                  color: stoleColorHex === "#FFFFFF" || stoleColorHex === "#FFFFF0" 
                    ? "#333" 
                    : "#FFF",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontFamily,
                }}
              >
                {config.embroideryText}
              </div>
              {/* Right panel text */}
              <div
                className="text-center text-[10px] font-medium max-w-[36px] break-words"
                style={{
                  color: stoleColorHex === "#FFFFFF" || stoleColorHex === "#FFFFF0" 
                    ? "#333" 
                    : "#FFF",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontFamily,
                }}
              >
                {config.embroideryText}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
