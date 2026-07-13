"use client";

import { motion } from "framer-motion";
import { Camera, Heart } from "lucide-react";
import Image from "next/image";

interface Props { gift: { title: string; description: string; content: string } }

const memories = [
  { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=60", label: "Our little moments", rotate: "-rotate-2" },
  { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=60", label: "Favorite smiles", rotate: "rotate-2" },
  { src: "https://images.unsplash.com/photo-1526401276527-43d1e909544e?auto=format&fit=crop&w=800&q=60", label: "Worth remembering", rotate: "rotate-1" },
  { src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=60", label: "Just us", rotate: "-rotate-1" },
];

export default function GiftGallery({ gift }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-3xl">
      <div className="mb-7 text-center">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-rose-500"><Camera className="h-4 w-4" /> Our scrapbook</p>
        <h3 className="mt-3 text-3xl font-semibold text-slate-900">{gift.title}</h3>
        <p className="mt-2 text-slate-600">{gift.description}</p>
      </div>
      <div className="relative grid gap-5 rounded-[2rem] border border-rose-100 bg-rose-50/70 p-5 sm:grid-cols-2 sm:p-8">
        <div className="absolute -left-3 top-10 h-16 w-16 rounded-full bg-pink-200/70 blur-2xl" />
        {memories.map((memory, index) => (
          <motion.figure key={memory.label} initial={{ opacity: 0, scale: 0.85, rotate: 0 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: index * 0.12 }} whileHover={{ y: -7, rotate: index % 2 ? 1 : -1 }} className={`relative overflow-hidden bg-white p-2 pb-10 shadow-[0_14px_30px_rgba(122,31,54,0.16)] ${memory.rotate}`}>
            <div className="relative aspect-[4/3] overflow-hidden"><Image src={memory.src} alt={memory.label} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" /></div>
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 pt-2 font-serif text-sm italic text-rose-700"><Heart className="h-3.5 w-3.5 fill-current" /> {memory.label}</figcaption>
          </motion.figure>
        ))}
      </div>
    </motion.div>
  );
}
