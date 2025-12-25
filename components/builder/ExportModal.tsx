"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExportCard } from "./ExportCard";
import { downloadImage, copyImageToClipboard, shareImage } from "@/lib/export";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownloadPng = async () => {
    if (!cardRef.current) return;
    setStatus("loading");
    setStatusMessage("Creating PNG...");
    try {
      await downloadImage(cardRef.current, "my-stole-design", "png");
      setStatus("success");
      setStatusMessage("Downloaded!");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      setStatusMessage("Download failed");
    }
  };

  const handleDownloadJpeg = async () => {
    if (!cardRef.current) return;
    setStatus("loading");
    setStatusMessage("Creating JPEG...");
    try {
      await downloadImage(cardRef.current, "my-stole-design", "jpeg");
      setStatus("success");
      setStatusMessage("Downloaded!");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      setStatusMessage("Download failed");
    }
  };

  const handleCopyToClipboard = async () => {
    if (!cardRef.current) return;
    setStatus("loading");
    setStatusMessage("Copying...");
    try {
      const success = await copyImageToClipboard(cardRef.current);
      if (success) {
        setStatus("success");
        setStatusMessage("Copied to clipboard!");
      } else {
        throw new Error("Copy failed");
      }
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      setStatusMessage("Copy failed - try download instead");
    }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    setStatus("loading");
    setStatusMessage("Preparing...");
    try {
      await shareImage(cardRef.current);
      setStatus("success");
      setStatusMessage("Shared!");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      setStatusMessage("Share failed");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-pegboard rounded-xl p-6 max-w-lg w-full shadow-2xl my-8"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-xl font-bold text-craft-cream">
                Save Your Design
              </h2>
              <button
                onClick={onClose}
                className="text-craft-cream/70 hover:text-craft-cream"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Preview card */}
            <div className="flex justify-center mb-4 overflow-hidden rounded-lg">
              <div className="transform scale-75 origin-top">
                <ExportCard ref={cardRef} />
              </div>
            </div>

            {/* Status message */}
            <AnimatePresence>
              {status !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`text-center py-2 px-4 rounded-lg mb-4 ${
                    status === "loading"
                      ? "bg-blue-100 text-blue-700"
                      : status === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {statusMessage}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadPng}
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-craft-cream rounded-lg text-pegboard-dark font-medium hover:bg-white transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Save PNG
              </button>
              
              <button
                onClick={handleDownloadJpeg}
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-craft-cream rounded-lg text-pegboard-dark font-medium hover:bg-white transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Save JPEG
              </button>
              
              <button
                onClick={handleCopyToClipboard}
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-craft-cream rounded-lg text-pegboard-dark font-medium hover:bg-white transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy
              </button>
              
              <button
                onClick={handleShare}
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 rounded-lg text-white font-medium hover:bg-amber-600 transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
