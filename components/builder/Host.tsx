"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HostAvatar } from "@/components/svg/HostAvatar";
import { useStoleStore } from "@/lib/store";
import { TOOL_ORDER, TOOL_TITLES } from "@/lib/types";

export function Host() {
  const { hostMessage, suggestedTool, activeTool, currentStep, setActiveTool } = useStoleStore();
  const stepIndex = TOOL_ORDER.indexOf(suggestedTool) + 1;
  const totalSteps = TOOL_ORDER.length;
  const isComplete = currentStep === "complete";

  return (
    <div className="flex items-start gap-3 justify-center">
      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className="flex-shrink-0"
      >
        <HostAvatar className="w-16 h-16 rounded-full shadow-lg" />
      </motion.div>

      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={hostMessage}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="speech-bubble speech-bubble-left max-w-[280px] text-sm text-pegboard-dark"
        >
          {!isComplete && (
            <div className="text-[10px] uppercase tracking-wide text-pegboard-light mb-1">
              Step {stepIndex} of {totalSteps}
            </div>
          )}
          <div>{hostMessage}</div>
          {!isComplete && !activeTool && (
            <motion.button
              onClick={() => setActiveTool(suggestedTool)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500 text-white text-xs font-semibold shadow"
            >
              Open {TOOL_TITLES[suggestedTool]}
              <span aria-hidden="true">→</span>
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
