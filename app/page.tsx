"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen pegboard-bg flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ duration: 0.5 }}
        className="pinned-card max-w-md w-full p-8 text-center"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-display text-5xl font-bold text-pegboard-dark mb-2"
        >
          Stole Builder
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-body text-pegboard text-lg mb-8"
        >
          Design your custom graduation stole
        </motion.p>

        {/* Decorative stole illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <svg
            viewBox="0 0 200 120"
            className="w-48 h-auto mx-auto"
            aria-hidden="true"
          >
            {/* Simple stole silhouette */}
            <path
              d="M60 20 L80 20 L85 100 L75 100 L70 40 L65 100 L55 100 Z"
              fill="#722F37"
              stroke="#DAA520"
              strokeWidth="2"
            />
            <path
              d="M140 20 L120 20 L115 100 L125 100 L130 40 L135 100 L145 100 Z"
              fill="#722F37"
              stroke="#DAA520"
              strokeWidth="2"
            />
            {/* Hanger */}
            <path
              d="M50 15 Q100 0 150 15"
              fill="none"
              stroke="#DEB887"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="100" cy="5" r="4" fill="#DEB887" />
          </svg>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <Link href="/builder" className="block">
            <button className="btn-primary w-full">
              Start Designing
            </button>
          </Link>

          <a
            href="https://expria.net"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <button className="btn-secondary w-full">
              Help & Info
            </button>
          </a>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-sm text-pegboard-light"
        >
          by{" "}
          <a
            href="https://expria.net"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-pegboard-dark"
          >
            Expria LLC
          </a>
        </motion.p>
      </motion.div>
    </main>
  );
}
