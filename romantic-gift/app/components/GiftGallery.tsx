"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  gift: {
    title: string;
    description: string;
    content: string;
  };
}

export default function GiftGallery({ gift }: Props) {
  // Sample images - in a real app, these would be actual photos
  const images = [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1526401276527-43d1e909544e?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=60",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/70 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1"
            >
              <Image
                src={src}
                alt={`Memory ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent p-4 text-left text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                  Memory {index + 1}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <motion.h3
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-xl font-bold text-pink-600"
        >
          {gift.title}
        </motion.h3>
        <p className="mx-auto max-w-xl text-slate-600">{gift.description}</p>
      </div>
    </motion.div>
  );
}