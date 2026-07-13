"use client";

import { motion } from "framer-motion";
import { Camera, Heart } from "lucide-react";
import Image from "next/image";

interface Props { gift: { title: string; description: string; content: string } }

const photos = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg"];
const captions = ["Our little moments", "Favorite smiles", "Worth remembering", "Just us", "A happy day", "Side by side", "A sweet memory", "My favorite view", "Always laughing", "A special place", "Together", "The little things", "A beautiful day", "More memories", "My happy place", "Us forever", "A moment to keep", "Love you", "Another sweet memory", "Forever us"];
const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export default function GiftGallery({ gift }: Props) {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-6xl py-2">
      <div className="mb-8 text-center"><p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-red-600"><Camera className="h-4 w-4" /> Our scrapbook</p><h3 className="mt-3 text-3xl font-semibold text-slate-900">{gift.title}</h3><p className="mt-2 text-slate-600">{gift.description}</p></div>
      <div className="relative grid grid-cols-2 gap-3 rounded-[2rem] border border-red-100 bg-red-50/70 p-4 sm:grid-cols-3 sm:gap-5 sm:p-7 lg:grid-cols-4">
        {photos.map((photo, index) => { const label = captions[index]; return <motion.figure key={photo} initial={{ opacity: 0, y: 16, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: index * 0.035 }} whileHover={{ y: -6, rotate: index % 2 ? 1 : -1, zIndex: 10 }} className={`relative overflow-hidden bg-white p-1.5 pb-8 shadow-[0_10px_22px_rgba(122,31,54,0.14)] sm:p-2 sm:pb-9 ${rotations[index % rotations.length]}`}><div className="relative aspect-square overflow-hidden"><Image src={`/pics/${photo}`} alt={label} fill unoptimized sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover" /></div><figcaption className="absolute inset-x-0 bottom-0 flex h-8 items-center justify-center gap-1 px-1 text-center font-serif text-xs italic text-red-700"><Heart className="h-3 w-3 shrink-0 fill-current" /> {label}</figcaption></motion.figure>; })}
      </div>
    </motion.section>
  );
}
