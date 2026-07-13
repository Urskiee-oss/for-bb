"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { createFloatingDecorations } from "./deterministicDecorations";

interface Props {
  onContinue: () => void;
}

export default function LandingScreen({ onContinue }: Props) {
  const [petals] = useState(() => createFloatingDecorations(30, 1201));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative isolate min-h-screen overflow-hidden px-4 py-10 text-slate-900"
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-violet-300/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-rose-200/30 blur-3xl" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(255,255,255,0.55)_45%,_rgba(255,255,255,0.15)_100%)]"
        />
        <div className="absolute inset-0 pointer-events-none">
          {petals.map((petal) => (
            <motion.span
              key={petal.id}
              className="absolute text-pink-400/50"
              style={{
                left: `${petal.left}%`,
                top: `${petal.top}%`,
                fontSize: `${petal.size}px`,
                opacity: 0,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: petal.offsetY,
                opacity: [0, 0.5, 0],
                transition: {
                  duration: petal.duration,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              🌸
            </motion.span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl items-center justify-center">
        <div className="glass-panel relative w-full rounded-[2rem] px-6 py-12 text-center sm:px-10 sm:py-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-pink-500/80">
            A little surprise
          </p>
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
            Happy Birthday, Honn!
          </h1>

          <div className="mt-10 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.06, rotate: [0, 10, 0, -10, 0] }}
              whileTap={{ scale: 0.96 }}
              onClick={onContinue}
              className="group relative inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-500 shadow-[0_20px_60px_rgba(236,72,153,0.35)] ring-8 ring-white/60 transition-shadow duration-300 hover:shadow-[0_26px_70px_rgba(236,72,153,0.42)]"
            >
              <Heart className="relative z-10 h-10 w-10 text-white transition-transform duration-300 group-hover:scale-110" />
              <motion.div
                className="absolute inset-0 rounded-full bg-white/25"
                style={{ animation: "pulse 2.2s infinite" }}
              />
            </motion.button>
          </div>

          {/* Instructions */}
          <p className="mt-8 text-sm text-slate-500">
            Make sure your sound is on for a small surprise.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
