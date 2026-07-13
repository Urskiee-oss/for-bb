"use client";

import { motion } from "framer-motion";
import { Camera, Heart } from "lucide-react";
import Image from "next/image";

interface Props { gift: { title: string; description: string; content: string } }

const imageIds = ["1529626455594-4ff0802cfb7e", "1517841905240-472988babdf9", "1526401276527-43d1e909544e", "1519125323398-675f0ddb6308", "1516589178581-6cd7833ae3b2", "1506869640319-fe1a24fd76dc", "1516589178581-6cd7833ae3b2", "1520857014576-2c4f4c972b57", "1512316609839-ce289d3eba0a", "1524504388940-b1c1722653e1", "1512316609839-ce289d3eba0a", "1529156069898-49953e39b3ac", "1519741497674-611481863552", "1508214751196-bcfd4ca60f91", "1523438885200-e635ba2c371e", "1522673607200-164d1b6ce486", "1500648767791-00dcc994a43e", "1469571486292-0ba58a3f068b"];
const captions = ["Our little moments", "Favorite smiles", "Worth remembering", "Just us", "A happy day", "Side by side", "A sweet memory", "My favorite view", "Always laughing", "A special place", "Together", "The little things", "A beautiful day", "More memories", "My happy place", "Us forever", "A moment to keep", "Love you"];
const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export default function GiftGallery({ gift }: Props) {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-6xl py-2">
      <div className="mb-8 text-center"><p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-rose-500"><Camera className="h-4 w-4" /> Our scrapbook</p><h3 className="mt-3 text-3xl font-semibold text-slate-900">{gift.title}</h3><p className="mt-2 text-slate-600">{gift.description}</p></div>
      <div className="relative grid grid-cols-2 gap-3 rounded-[2rem] border border-rose-100 bg-rose-50/70 p-4 sm:grid-cols-3 sm:gap-5 sm:p-7 lg:grid-cols-4">
        {imageIds.map((imageId, index) => { const label = captions[index]; return <motion.figure key={`${imageId}-${index}`} initial={{ opacity: 0, y: 16, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: index * 0.035 }} whileHover={{ y: -6, rotate: index % 2 ? 1 : -1, zIndex: 10 }} className={`relative overflow-hidden bg-white p-1.5 pb-8 shadow-[0_10px_22px_rgba(122,31,54,0.14)] sm:p-2 sm:pb-9 ${rotations[index % rotations.length]}`}><div className="relative aspect-square overflow-hidden"><Image src={`https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&w=600&q=70`} alt={label} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover" /></div><figcaption className="absolute inset-x-0 bottom-0 flex h-8 items-center justify-center gap-1 px-1 text-center font-serif text-xs italic text-rose-700"><Heart className="h-3 w-3 shrink-0 fill-current" /> {label}</figcaption></motion.figure>; })}
      </div>
    </motion.section>
  );
}