"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CloudRain, Sun, Heart } from "lucide-react";

export default function NoScreen({ onTryAgain }: { onTryAgain: () => void }) {
  const [rain] = useState(() =>
    Array.from({ length: 80 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      top: -Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
  );

  const [lightning] = useState(() =>
    Array.from({ length: 3 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      top: -Math.random() * 100,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
      rotation: Math.random() * 360,
      size: Math.random() * 10 + 5,
    }))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 text-white"
    >
      {/* Animated rainy background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Rain drops */}
        <div className="absolute inset-0 pointer-events-none">
          {rain.map((drop) => (
            <div
              key={drop.id}
              className="absolute w-[2px] h-[20px] bg-blue-500/50"
              style={{
                left: `${drop.left}%`,
                top: `${drop.top}%`,
                animation: `fall ${drop.duration}s linear infinite`,
                animationDelay: `${drop.delay}s`,
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
                top: `${bolt.top}%`,
                animation: `flash ${bolt.duration}s ease-in-out infinite`,
                animationDelay: `${bolt.delay}s`,
                transform: `rotate(${bolt.rotation}deg)`,
                width: `${bolt.size}px`,
                height: `${bolt.size}px`,
                borderRadius: "50%",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <CloudRain className="h-10 w-10 text-blue-400 animate-pulse" />
          <h1 className="text-3xl font-bold">
            Maybe you clicked the wrong button... 🥺
          </h1>
          <Sun className="h-10 w-10 text-yellow-400 animate-pulse" />
        </div>
        <p className="text-lg max-w-md">
          Would you like to try again?
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onTryAgain}
          className="px-6 py-3 bg-pink-500 text-white rounded-xl shadow-md transform transition-all duration-200 hover:scale-105"
        >
          <Heart className="mr-2" /> Yes, Try Again
        </motion.button>
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