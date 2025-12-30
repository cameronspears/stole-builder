"use client";

import { useStoleStore } from "@/lib/store";
import { ToolId, TOOL_ORDER, TOOL_TITLES } from "@/lib/types";
import { ToolDrawer } from "./ToolDrawer";
import { PegboardShelf } from "@/components/svg/PegboardShelf";
import { PegboardHook } from "@/components/svg/PegboardHook";

// Tool Item imports
import { LengthToolItem, LengthToolDrawerContent } from "@/components/tools/LengthTool";
import { StoleColorToolItem, StoleColorToolDrawerContent } from "@/components/tools/StoleColorTool";
import { TextileColorToolItem, TextileColorToolDrawerContent } from "@/components/tools/TextileColorTool";
import { AccentToolItem, AccentToolDrawerContent } from "@/components/tools/AccentTool";
import { BeadsToolItem, BeadsToolDrawerContent } from "@/components/tools/BeadsTool";
import { OrientationToolItem, OrientationToolDrawerContent } from "@/components/tools/OrientationTool";
import { EmbroideryFormItem, EmbroideryFormDrawerContent } from "@/components/tools/EmbroideryForm";

// Map tool IDs to their components
const TOOL_ITEMS: Record<ToolId, React.FC<{ onClick: () => void; isActive: boolean }>> = {
  length: LengthToolItem,
  stoleColor: StoleColorToolItem,
  textileColor: TextileColorToolItem,
  accent: AccentToolItem,
  beads: BeadsToolItem,
  orientation: OrientationToolItem,
  embroidery: EmbroideryFormItem,
};

const TOOL_DRAWER_CONTENTS: Record<ToolId, React.FC> = {
  length: LengthToolDrawerContent,
  stoleColor: StoleColorToolDrawerContent,
  textileColor: TextileColorToolDrawerContent,
  accent: AccentToolDrawerContent,
  beads: BeadsToolDrawerContent,
  orientation: OrientationToolDrawerContent,
  embroidery: EmbroideryFormDrawerContent,
};

interface PegboardToolItemWrapperProps {
  toolId: ToolId;
  showHook?: boolean;
  className?: string;
}

function PegboardToolItemWrapper({ toolId, showHook, className }: PegboardToolItemWrapperProps) {
  const { activeTool, suggestedTool, setActiveTool } = useStoleStore();
  
  const ToolComponent = TOOL_ITEMS[toolId];
  const isActive = activeTool === toolId;
  const isSuggested = suggestedTool === toolId;
  const currentIndex = TOOL_ORDER.indexOf(suggestedTool);
  const toolIndex = TOOL_ORDER.indexOf(toolId);
  const isLocked = toolIndex > currentIndex;

  const handleClick = () => {
    if (isLocked) {
      setActiveTool(suggestedTool);
      return;
    }
    setActiveTool(toolId);
  };
  
  return (
    <div className={`flex flex-col items-center ${className || ''}`}>
      {showHook && (
        <div className="mb-[-8px]">
          <PegboardHook />
        </div>
      )}
      <div
        className={`transition-all duration-300 ${isSuggested ? "tool-glow" : ""} ${
          isLocked ? "opacity-50 grayscale" : ""
        }`}
        aria-disabled={isLocked}
        title={isLocked ? "Finish the current step to unlock" : TOOL_TITLES[toolId]}
      >
        <ToolComponent
          onClick={handleClick}
          isActive={isSuggested || isActive}
        />
      </div>
      <span className="mt-1 text-[10px] font-medium text-pegboard-dark/80 text-center">
        {TOOL_TITLES[toolId]}
      </span>
    </div>
  );
}

export function Pegboard() {
  const { activeTool, setActiveTool } = useStoleStore();
  
  const DrawerContent = activeTool ? TOOL_DRAWER_CONTENTS[activeTool] : null;
  
  return (
    <>
      {/* Tool Drawer */}
      <ToolDrawer
        isOpen={!!activeTool}
        onClose={() => setActiveTool(null)}
        title={activeTool ? TOOL_TITLES[activeTool] : ""}
      >
        {DrawerContent && <DrawerContent />}
      </ToolDrawer>

      {/* Pegboard Tools Layout */}
      <div className="flex flex-col gap-4 items-center">
        {/* Row 1: Ruler hanging from peg */}
        <div className="flex justify-center">
          <PegboardToolItemWrapper toolId="length" showHook />
        </div>
        
        {/* Row 2: Shelf with paint tube, crayon box, thread spool */}
        <div className="relative">
          <PegboardShelf width={260} className="w-[260px] h-auto" />
          <div className="absolute top-2 left-0 right-0 flex justify-around items-end px-8">
            <PegboardToolItemWrapper toolId="stoleColor" />
            <PegboardToolItemWrapper toolId="textileColor" />
            <PegboardToolItemWrapper toolId="accent" />
          </div>
        </div>
        
        {/* Row 3: Hanging items - beads jar, compass, embroidery hoop */}
        <div className="flex justify-around mt-8">
          <PegboardToolItemWrapper toolId="beads" showHook />
          <PegboardToolItemWrapper toolId="orientation" showHook />
          <PegboardToolItemWrapper toolId="embroidery" showHook />
        </div>
      </div>
    </>
  );
}
