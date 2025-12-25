"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStoleStore } from "@/lib/store";

export function Toolbar() {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const { undo, redo, reset, canUndo, canRedo } = useStoleStore();

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    reset();
    setShowResetConfirm(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Undo */}
        <motion.button
          onClick={undo}
          disabled={!canUndo()}
          whileHover={{ scale: canUndo() ? 1.1 : 1 }}
          whileTap={{ scale: canUndo() ? 0.9 : 1 }}
          className={`p-2 rounded-lg transition-all ${
            canUndo()
              ? "bg-craft-cream text-pegboard-dark hover:bg-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          title="Undo"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </motion.button>

        {/* Redo */}
        <motion.button
          onClick={redo}
          disabled={!canRedo()}
          whileHover={{ scale: canRedo() ? 1.1 : 1 }}
          whileTap={{ scale: canRedo() ? 0.9 : 1 }}
          className={`p-2 rounded-lg transition-all ${
            canRedo()
              ? "bg-craft-cream text-pegboard-dark hover:bg-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          title="Redo"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
          </svg>
        </motion.button>

        {/* Reset */}
        <motion.button
          onClick={handleReset}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-lg bg-craft-cream text-pegboard-dark hover:bg-red-100 hover:text-red-600 transition-all"
          title="Reset Design"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </motion.button>
      </div>

      {/* Reset confirmation modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-craft-cream rounded-xl p-6 max-w-sm mx-4 shadow-xl"
            >
              <h3 className="font-display text-xl font-bold text-pegboard-dark mb-2">
                Reset Design?
              </h3>
              <p className="text-pegboard mb-4">
                Are you sure you want to start over? Your current design will be cleared.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-pegboard-dark hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReset}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                >
                  Reset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
