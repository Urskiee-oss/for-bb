"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  gift: {
    title: string;
    description: string;
    content: string;
  };
}

export default function GiftLetter({ gift }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState("");

  // Simulate typewriter effect when the letter is opened
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let interval: ReturnType<typeof setInterval> | null = null;
    const letters = gift.content.split("");
    let i = 0;

    interval = setInterval(() => {
      setTypedText((prev) => prev + letters[i]);
      i++;
      if (i >= letters.length && interval) {
        clearInterval(interval);
      }
    }, 50); // Adjust typing speed as needed

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isOpen, gift.content]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="relative">
        {/* Envelope - closed */}
        {!isOpen && (
          <div
            className="w-64 h-48 bg-red-500 rounded-lg shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => {
              setTypedText("");
              setIsOpen(true);
            }}
          >
            <motion.div
              className="text-white text-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              ✉️
            </motion.div>
          </div>
        )}
        {/* Letter - open */}
        {isOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl p-6"
          >
            {/* Letter content with typewriter effect */}
            <div className="relative h-64 overflow-hidden">
              <div
                className="absolute inset-0 bg-white"
                style={{
                  // Mask for typewriter effect
                  width: `${(typedText.length / gift.content.length) * 100}%`,
                  transition: "width 0.1s linear",
                }}
              ></div>
              <p className="text-gray-800 leading-relaxed p-2">
                {typedText}
              </p>
            </div>
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsOpen(false);
                setTypedText("");
              }}
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
            >
              Close Letter
            </motion.button>
          </motion.div>
        )}
      </div>

      <div className="text-center">
        <motion.h3
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-xl font-bold text-pink-600"
        >
          {gift.title}
        </motion.h3>
        <p className="text-gray-600">{gift.description}</p>
      </div>
    </motion.div>
  );
}