"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { StolePreview } from "./StolePreview";
import { Receipt } from "./Receipt";
import { Host } from "./Host";
import { Toolbar } from "./Toolbar";
import { ExportModal } from "./ExportModal";
import { LengthTool } from "@/components/tools/LengthTool";
import { StoleColorTool } from "@/components/tools/StoleColorTool";
import { TextileColorTool } from "@/components/tools/TextileColorTool";
import { AccentTool } from "@/components/tools/AccentTool";
import { BeadsTool } from "@/components/tools/BeadsTool";
import { OrientationTool } from "@/components/tools/OrientationTool";
import { EmbroideryForm } from "@/components/tools/EmbroideryForm";
import Link from "next/link";

export function BuilderScreen() {
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="min-h-screen pegboard-bg">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-pegboard-dark/90 backdrop-blur-sm border-b border-pegboard-light">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
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

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left rail - Tools */}
          <aside className="col-span-12 lg:col-span-3 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-20"
            >
              <h2 className="font-display text-lg font-bold text-craft-cream mb-4 flex items-center gap-2">
                <span className="text-2xl">🛠</span> Tools
              </h2>
              <div className="space-y-3 max-h-[calc(100vh-160px)] overflow-y-auto pr-2 pb-4">
                <LengthTool />
                <StoleColorTool />
                <TextileColorTool />
                <AccentTool />
                <BeadsTool />
                <OrientationTool />
                <EmbroideryForm />
              </div>
            </motion.div>
          </aside>

          {/* Center - Stole Preview */}
          <div className="col-span-12 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="sticky top-20"
            >
              {/* Host - top right of preview area */}
              <div className="flex justify-end mb-4">
                <Host />
              </div>
              
              {/* Stole preview area */}
              <div className="bg-pegboard-light/30 rounded-2xl p-6 min-h-[500px] flex items-start justify-center">
                <StolePreview />
              </div>
            </motion.div>
          </div>

          {/* Right rail - Receipt */}
          <aside className="col-span-12 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-20"
            >
              <Receipt onExport={() => setShowExportModal(true)} />
            </motion.div>
          </aside>
        </div>
      </main>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
}
