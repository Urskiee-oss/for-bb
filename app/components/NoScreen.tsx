"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CloudRain, Sun, Heart } from "lucide-react";
import { createFloatingDecorations } from "./deterministicDecorations";

export default function NoScreen({ onTryAgain }: { onTryAgain: () => void }) {
  const [rain] = useState(() => createFloatingDecorations(80, 3307));

  const [lightning] = useState(() => createFloatingDecorations(3, 4409));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative isolate min-h-screen overflow-hidden px-4 py-10 text-white"
    >
      {/* Animated rainy background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(122,31,54,0.14),_transparent_35%),linear-gradient(180deg,_#0f172a_0%,_#111827_100%)]" />
        {/* Rain drops */}
        <div className="absolute inset-0 pointer-events-none">
          {rain.map((drop) => (
            <div
              key={drop.id}
              className="absolute w-[2px] h-[20px] bg-blue-500/50"
              style={{
                left: `${drop.left}%`,
                top: `${drop.top * -1}%`,
                animation: `fall ${drop.duration}s linear infinite`,
                animationDelay: `${drop.delay}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>
        {/* Occasional lightning */}
        <div className="absolute inset-0 pointer-events-none" style={{ pointerEvents: "none" }}>
          {lightning.map((bolt) => (
            <div
              key={bolt.id}
              className="absolute w-[2px] h-[20px] bg-yellow-400/50"
              style={{
                left: `${bolt.left}%`,
                top: `${bolt.top * -1}%`,
                animation: `flash ${bolt.duration}s ease-in-out infinite`,
                animationDelay: `${bolt.delay}s`,
                transform: `rotate(${bolt.rotation}deg)`,
                width: `${bolt.size}px`,
                height: `${bolt.size}px`,
                borderRadius: "50%",
                opacity: 0,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-2xl items-center justify-center">
        <div className="glass-panel-dark relative w-full rounded-[2rem] px-6 py-12 text-center sm:px-10 sm:py-14">
          <div className="mb-6 flex items-center justify-center gap-4 text-sky-200">
            <CloudRain className="h-10 w-10 animate-pulse" />
            <Sun className="h-10 w-10 animate-pulse text-amber-300" />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-sky-200/80">
            Wrong turn
          </p>
          <h1 className="mx-auto max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Maybe you clicked the wrong button...
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-8 text-slate-200/90 sm:text-lg">
            The story can still recover itself if you want to try again.
          </p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onTryAgain}
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-700 to-[#7a1f36] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_50px_rgba(122,31,54,0.22)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Heart className="h-5 w-5" /> Yes, try again
          </motion.button>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
        @keyframes flash {
          0%, 90% { opacity: 0; }
          91%, 95% { opacity: 1; }
          96%, 100% { opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}