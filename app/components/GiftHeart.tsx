"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface Props {
  gift: {
    title: string;
    description: string;
    content: string;
  };
}

export default function GiftHeart({ gift }: Props) {
  const isReducedMotion = useReducedMotion();
  const loveText = "I Love You ";

  const textRows = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        offset: index % 2 === 0 ? 0 : 12,
      })),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative w-full min-h-[28rem] flex items-center justify-center overflow-hidden"
      style={{ overflow: "hidden" }}
    >
      <div className="relative flex flex-col items-center justify-center gap-6">
        <motion.svg
          viewBox="0 0 400 360"
          className="w-[22rem] max-w-[92vw] drop-shadow-2xl"
          aria-hidden="true"
          animate={isReducedMotion ? undefined : { scale: [1, 1.03, 1] }}
          transition={isReducedMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <path
              id="heartPath"
              d="M200 330 C 170 300, 80 245, 80 160 C 80 110, 115 75, 162 75 C 185 75, 205 85, 220 105 C 235 85, 255 75, 278 75 C 325 75, 360 110, 360 160 C 360 245, 270 300, 200 330 Z"
            />
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#991b2b" />
              <stop offset="100%" stopColor="#7a1f36" />
            </linearGradient>
          </defs>

          <motion.path
            d="M200 330 C 170 300, 80 245, 80 160 C 80 110, 115 75, 162 75 C 185 75, 205 85, 220 105 C 235 85, 255 75, 278 75 C 325 75, 360 110, 360 160 C 360 245, 270 300, 200 330 Z"
            fill="url(#heartGradient)"
            animate={isReducedMotion ? undefined : { opacity: [0.9, 1, 0.9] }}
            transition={isReducedMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />

          <g clipPath="url(#heartClip)">
            {textRows.map((row) => (
              <text
                key={row.id}
                x="200"
                y={60 + row.id * 17}
                textAnchor="middle"
                fill="rgba(255,255,255,0.9)"
                fontSize="16"
                fontWeight="700"
                letterSpacing="1"
                transform={`translate(${row.offset}, 0)`}
              >
                {loveText.repeat(10)}
              </text>
            ))}
          </g>

          <clipPath id="heartClip">
            <use href="#heartPath" />
          </clipPath>
        </motion.svg>

        <div className="text-center">
          <motion.h3
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-xl font-bold text-red-700"
          >
            {gift.title}
          </motion.h3>
          <p className="text-gray-600">{gift.description}</p>
        </div>
      </div>
    </motion.div>
  );
}