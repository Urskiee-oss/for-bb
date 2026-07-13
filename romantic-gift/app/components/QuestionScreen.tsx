"use client";

import { motion } from "framer-motion";
import { Heart, HeartCrack } from "lucide-react";
import { useState } from "react";
import { createFloatingDecorations } from "./deterministicDecorations";

interface Props {
  onYes: () => void;
  onNo: () => void;
}

export default function QuestionScreen({ onYes, onNo }: Props) {
  const [hearts] = useState(() => createFloatingDecorations(20, 2203));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative isolate min-h-screen overflow-hidden px-4 py-10 text-center text-slate-900"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-rose-200/25 blur-3xl" />
        <div className="absolute inset-0 pointer-events-none">
          {hearts.map((heart) => (
            <motion.span
              key={heart.id}
              className="absolute text-pink-400/50"
              style={{
                left: `${heart.left}%`,
                top: `${heart.top}%`,
                fontSize: `${heart.size}px`,
                opacity: 0,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: heart.offsetY,
                opacity: [0, 0.5, 0],
                transition: {
                  duration: heart.duration,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              ❤️
            </motion.span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-2xl items-center justify-center">
        <div className="glass-panel relative w-full rounded-[2rem] px-6 py-12 sm:px-10 sm:py-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-pink-500/80">
            One question
          </p>
          <h1 className="mx-auto max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Do you love me?
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
            Choose carefully. There&apos;s a better ending if you say yes.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <motion.button
              whileHover={{ scale: 1.03, rotate: [0, 4, 0, -4, 0] }}
              whileTap={{ scale: 0.97 }}
              onClick={onYes}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4 text-base font-semibold text-white shadow-[0_18px_50px_rgba(236,72,153,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Heart className="h-5 w-5" /> Yes, I do
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, rotate: [0, -4, 0, 4, 0] }}
              whileTap={{ scale: 0.97 }}
              onClick={onNo}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-6 py-4 text-base font-semibold text-slate-700 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white"
            >
              <HeartCrack className="h-5 w-5 text-pink-500" /> No, not yet
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
