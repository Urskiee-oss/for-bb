"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface Props {
  gift: { title: string; description: string; content: string[] };
}

export default function GiftThings({ gift }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-2xl"
    >
      <div className="mb-7 text-center">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-pink-500">
          <Sparkles className="h-4 w-4" /> A love list
        </p>
        <h3 className="mt-3 text-3xl font-semibold text-slate-900">{gift.title}</h3>
        <p className="mt-2 text-slate-600">{gift.description}</p>
      </div>
      <div className="space-y-3">
        {gift.content.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className="flex items-center gap-4 rounded-2xl border border-pink-100 bg-gradient-to-r from-white to-rose-50/80 px-5 py-4 shadow-sm"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-sm font-bold text-rose-600">
              0{index + 1}
            </span>
            <span className="flex-1 text-lg font-medium text-slate-800">{item}</span>
            <Heart className="h-5 w-5 text-pink-400" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
