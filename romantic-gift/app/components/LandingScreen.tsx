"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface Props {
  onContinue: () => void;
}

export default function LandingScreen({ onContinue }: Props) {
  const [petals] = useState(() =>
    Array.from({ length: 30 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 20 + 10,
      offsetY: -100 - Math.random() * 200,
      duration: Math.random() * 5 + 5,
    }))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col items-center justify-center p-4"
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 opacity-50"
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
      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold text-pink-800 mb-4">
          For My Special Someone
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Click the heart to continue to a special message.
        </p>

        {/* Heart button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: [0, 10, 0, -10, 0] }}
          whileTap={{ scale: 0.9 }}
          onClick={onContinue}
          className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-pink-300 hover:bg-pink-400 transition-all duration-300 shadow-lg"
        >
          <Heart className="text-4xl text-pink-800" />
          {/* Pulse animation */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: "rgba(255, 192, 203, 0.3)",
              animation: "pulse 2s infinite",
            }}
          />
        </motion.button>

        {/* Instructions */}
        <p className="text-sm text-gray-500">
          (Make sure your sound is on for a surprise!)
        </p>
      </div>
    </motion.div>
  );
}
