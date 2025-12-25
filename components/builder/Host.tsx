"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HostAvatar } from "@/components/svg/HostAvatar";
import { useStoleStore } from "@/lib/store";

export function Host() {
  const { hostMessage } = useStoleStore();

  return (
    <div className="flex items-start gap-3">
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={hostMessage}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="speech-bubble max-w-[200px] text-sm text-pegboard-dark"
        >
          {hostMessage}
        </motion.div>
      </AnimatePresence>
      
      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className="flex-shrink-0"
      >
        <HostAvatar className="w-16 h-16 rounded-full shadow-lg" />
      </motion.div>
    </div>
  );
}
