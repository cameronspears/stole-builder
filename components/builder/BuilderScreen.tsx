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
    <div className="min-h-screen pegboard-bg relative">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-pegboard-dark/90 backdrop-blur-sm border-b border-pegboard-light">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-3 flex items-center justify-between">
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
      <main className="mx-auto w-full max-w-[1440px] px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[280px,1fr,280px] lg:items-start">
          {/* Left - Tools */}
          <section className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <Pegboard />
          </section>

          {/* Center - Stole Preview + Host */}
          <section className="order-1 lg:order-2 flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full flex justify-center"
            >
              <div className="w-full max-w-[520px] min-h-[420px] flex items-start justify-center py-4">
                <div className="drop-shadow-[0_14px_24px_rgba(0,0,0,0.25)]">
                  <StolePreview />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="w-full flex justify-center"
            >
              <Host />
            </motion.div>
          </section>

          {/* Right - Receipt */}
          <aside className="order-3 lg:order-3 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
              style={{ transform: "rotate(1deg)" }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-500 shadow-md z-10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-red-700" />
              </div>
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
