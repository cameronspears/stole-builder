"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { StolePreview } from "./StolePreview";
import { Receipt } from "./Receipt";
import { Host } from "./Host";
import { Toolbar } from "./Toolbar";
import { ExportModal } from "./ExportModal";
import { Pegboard } from "./Pegboard";
import Link from "next/link";

export function BuilderScreen() {
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="min-h-screen pegboard-bg relative overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-pegboard-dark/90 backdrop-blur-sm border-b border-pegboard-light">
        <div className="max-w-full px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-display text-xl font-bold text-craft-cream"
            >
              Stole Builder
            </motion.span>
          </Link>
          <Toolbar />
        </div>
      </header>

      {/* Main pegboard canvas - full viewport */}
      <main className="relative h-[calc(100vh-60px)]">
        {/* Pegboard tools on the left */}
        <Pegboard />

        {/* Center - Stole Preview */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Stole preview area */}
            <div className="bg-pegboard-light/20 rounded-2xl p-6 min-h-[450px] flex items-start justify-center backdrop-blur-sm">
              <StolePreview />
            </div>
          </motion.div>
        </div>

        {/* Right side - Receipt (pinned card) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute right-4 top-24"
          style={{ transform: 'rotate(1deg)' }}
        >
          {/* Pin */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-red-500 shadow-md z-10 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-red-700" />
          </div>
          <Receipt onExport={() => setShowExportModal(true)} />
        </motion.div>

        {/* Host - bottom left, near the tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute left-4 bottom-4"
        >
          <Host />
        </motion.div>
      </main>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
}
