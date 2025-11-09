import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function DoodleMission({ className = "w-24" }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <circle cx="30" cy="30" r="26" fill="rgba(34,197,94,0.1)" />
      <path
        d="M18 40 Q30 18 48 36"
        stroke="rgba(34,197,94,0.8)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M28 70 L48 50 L72 74"
        stroke="rgba(34,197,94,0.7)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DoodleTech({ className = "w-24" }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <rect
        x="12"
        y="20"
        width="96"
        height="70"
        rx="10"
        fill="rgba(34,197,94,0.08)"
      />
      <circle cx="36" cy="50" r="6" fill="rgba(34,197,94,0.8)" />
      <rect
        x="56"
        y="40"
        width="40"
        height="6"
        rx="3"
        fill="rgba(34,197,94,0.6)"
      />
      <rect
        x="56"
        y="54"
        width="30"
        height="6"
        rx="3"
        fill="rgba(34,197,94,0.6)"
      />
    </svg>
  );
}

export default function About() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-emerald-950 text-gray-100">
      {/* Decorative doodles */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-8 left-8">
          <DoodleMission className="w-28" />
        </div>
        <div className="absolute bottom-8 right-8">
          <DoodleTech className="w-32" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-6 py-20 relative z-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles size={20} className="text-emerald-400" />
          <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-lime-300">
            About Financify
          </h1>
        </div>

        <p className="mt-3 text-gray-300 text-base md:text-lg leading-relaxed">
          Financify helps you budget smarter and reach saving goals with clarity.
          Built with{" "}
          <span className="font-semibold text-emerald-400">React</span>,{" "}
          <span className="font-semibold text-emerald-400">Spring Boot</span>, and{" "}
          <span className="font-semibold text-emerald-400">MySQL</span>. It keeps
          your data secure and your insights simple.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl border border-emerald-700 bg-gray-900/60 backdrop-blur-sm shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-emerald-400">
              Our Mission
            </h2>
            <p className="text-gray-300 mt-2">
              Make personal finance simple, visual, and motivating for everyone.
            </p>
            <div className="mt-4">
              <DoodleMission className="w-20" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl border border-emerald-700 bg-gray-900/60 backdrop-blur-sm shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-emerald-400">
              Tech Stack
            </h2>
            <p className="text-gray-300 mt-2">
              React + Vite UI, Spring Boot REST API, JWT auth, MySQL database,
              Chart.js visuals.
            </p>
            <div className="mt-4">
              <DoodleTech className="w-20" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
