"use client";

import { useStoleStore } from "@/lib/store";
import { ToolId, TOOL_TITLES } from "@/lib/types";
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
  const isSuggested = suggestedTool === toolId && !activeTool;
  
  return (
    <div className={`flex flex-col items-center ${className || ''}`}>
      {showHook && (
        <div className="mb-[-8px]">
          <PegboardHook />
        </div>
      )}
      <div className={`transition-all duration-300 ${isSuggested ? 'animate-pulse' : ''}`}>
        <ToolComponent
          onClick={() => setActiveTool(toolId)}
          isActive={isSuggested || isActive}
        />
      </div>
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

      {/* Pegboard Tools Layout - Left side */}
      <div className="absolute left-4 top-20 w-72 flex flex-col gap-4">
        {/* Row 1: Ruler hanging from peg */}
        <div className="flex justify-center">
          <PegboardToolItemWrapper toolId="length" showHook />
        </div>
        
        {/* Row 2: Shelf with paint tube, crayon box, thread spool */}
        <div className="relative">
          <PegboardShelf width={280} />
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
