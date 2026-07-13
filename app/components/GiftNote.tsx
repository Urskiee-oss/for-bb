"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface Props {
  gift: {
    title: string;
    description: string;
    content: string;
  };
}

export default function GiftNote({ gift }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 py-2"
    >
      <div className="relative mx-auto w-full max-w-lg px-3 sm:px-6">
        <div className="absolute -left-1 top-12 h-32 w-32 rounded-full bg-rose-200/50 blur-3xl" />
        <div className="absolute -right-1 bottom-8 h-32 w-32 rounded-full bg-pink-200/50 blur-3xl" />

        <motion.article
          initial={{ rotate: -2, scale: 0.94 }}
          animate={{ rotate: -1, scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 16 }}
          className="relative overflow-hidden rounded-sm border border-rose-200/80 bg-[#fffaf7] px-7 py-10 shadow-[0_24px_50px_rgba(136,54,77,0.22)] sm:px-10"
        >
          <div className="absolute -left-6 -top-5 h-12 w-28 rotate-[-14deg] bg-rose-200/75 shadow-sm" />
          <div className="absolute -right-6 -top-5 h-12 w-28 rotate-[14deg] bg-pink-200/75 shadow-sm" />
          <div className="absolute inset-x-0 top-24 h-px bg-rose-100" />
          <div className="absolute inset-x-0 top-36 h-px bg-rose-100" />
          <div className="absolute inset-x-0 top-48 h-px bg-rose-100" />

          <div className="relative">
            <div className="flex items-center justify-between text-rose-500">
              <span className="text-xs font-semibold uppercase tracking-[0.28em]">
                A little note
              </span>
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
            <p className="font-serif text-lg leading-8 text-[#5f2b3d] sm:text-xl sm:leading-9">
              {gift.content}
            </p>
            <p className="mt-5 font-serif text-lg leading-8 text-[#5f2b3d] sm:text-xl sm:leading-9">
              My love, being with you makes even the simplest days feel like
              something worth keeping. Your laughter turns ordinary moments
              into my favorite memories, and your love feels like home to me.
              I am grateful for every little part of us, and I will keep
              choosing you—today, tomorrow, and in every beautiful day that
              comes after.
            </p>
            <div className="mt-8 flex items-center justify-end gap-2 text-rose-500">
              <span className="font-serif text-base italic">With all my love</span>
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                <Heart className="h-5 w-5 fill-current" />
              </motion.div>
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}
