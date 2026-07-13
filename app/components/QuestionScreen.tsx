"use client";

import { motion } from "framer-motion";
import { Heart, HeartCrack } from "lucide-react";
import { useEffect, useState } from "react";
import { createFloatingDecorations } from "./deterministicDecorations";

interface Props {
  onYes: () => void;
  onNo: () => void;
}

const noPhrases = [
  "No, kinsa kamn?",
  "okay sige haha",
  "luhh tinood gyud diay",
  "gelangg kinsa ramn ko",
  "dinako nimo lab?",
  "haha okay2 lagi2",
];

function getRandomNoPosition() {
  if (typeof window === "undefined") {
    return { x: 70, y: 72 };
  }

  const horizontalPadding = 96;
  const verticalPadding = 52;
  const maxX = Math.max(window.innerWidth - horizontalPadding, horizontalPadding);
  const maxY = Math.max(window.innerHeight - verticalPadding, verticalPadding);

  return {
    x: Math.floor(Math.random() * (maxX - horizontalPadding)) + horizontalPadding,
    y: Math.floor(Math.random() * (maxY - verticalPadding)) + verticalPadding,
  };
}

function getInitialNoPosition() {
  if (typeof window === "undefined") {
    return { x: 70, y: 72 };
  }

  const buttonWidth = 220;
  const buttonHeight = 56;
  const x = Math.min(window.innerWidth * 0.68, window.innerWidth - buttonWidth - 24);
  const y = Math.min(window.innerHeight * 0.58, window.innerHeight - buttonHeight - 24);

  return {
    x: Math.max(24, Math.round(x)),
    y: Math.max(24, Math.round(y)),
  };
}

export default function QuestionScreen({ onYes }: Props) {
  const [hearts] = useState(() => createFloatingDecorations(20, 2203));
  const [hasMovedNo, setHasMovedNo] = useState(false);
  const [noPosition, setNoPosition] = useState(() => getInitialNoPosition());
  const [noPhraseIndex, setNoPhraseIndex] = useState(0);

  useEffect(() => {
    setNoPosition(getInitialNoPosition());
  }, []);

  const moveNoButton = () => {
    setNoPhraseIndex((currentIndex) => (currentIndex + 1) % noPhrases.length);
    setHasMovedNo(true);
    setNoPosition(getRandomNoPosition());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative isolate min-h-screen overflow-hidden px-4 py-10 text-center text-slate-900"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-red-400/18 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#6f1d2f]/18 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[#8b1e3f]/20 blur-3xl" />
        <div className="absolute inset-0 pointer-events-none">
          {hearts.map((heart) => (
            <motion.span
              key={heart.id}
              className="absolute text-red-400/45"
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
          <h1 className="mx-auto max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Do you love me?
          </h1>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <motion.button
              whileHover={{ scale: 1.03, rotate: [0, 4, 0, -4, 0] }}
              whileTap={{ scale: 0.97 }}
              onClick={onYes}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-700 to-[#7a1f36] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_50px_rgba(122,31,54,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Heart className="h-5 w-5" /> Yes, ofcc babbyy
            </motion.button>

            {!hasMovedNo ? (
              <motion.button
                whileHover={{ scale: 1.03, rotate: [0, -4, 0, 4, 0] }}
                whileTap={{ scale: 0.97 }}
                onClick={moveNoButton}
                className="flex items-center justify-center gap-2 rounded-2xl border border-[#7a1f36]/35 bg-white/95 px-6 py-4 text-base font-semibold text-[#7a1f36] shadow-[0_18px_50px_rgba(122,31,54,0.18)] ring-1 ring-[#7a1f36]/10 transition-colors hover:bg-white"
              >
                <HeartCrack className="h-5 w-5 text-red-700" /> {noPhrases[noPhraseIndex]}
              </motion.button>
            ) : null}
          </div>
        </div>
      </div>

      {hasMovedNo ? (
        <motion.button
          key={`${noPosition.x}-${noPosition.y}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={moveNoButton}
          className="fixed z-50 inline-flex items-center justify-center gap-2 rounded-2xl border border-[#7a1f36]/35 bg-white/95 px-6 py-4 text-base font-semibold text-[#7a1f36] shadow-[0_18px_50px_rgba(122,31,54,0.18)] ring-1 ring-[#7a1f36]/10 transition-colors hover:bg-white"
          style={{
            left: `${noPosition.x}px`,
            top: `${noPosition.y}px`,
          }}
        >
          <HeartCrack className="h-5 w-5 text-red-700" /> {noPhrases[noPhraseIndex]}
        </motion.button>
      ) : null}
    </motion.div>
  );
}
