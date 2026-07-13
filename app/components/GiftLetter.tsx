"use client";

import { motion } from "framer-motion";
import { Heart, Mail, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  gift: { title: string; description: string; content: string };
}

export default function GiftLetter({ gift }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setTypedText("");
    let characterIndex = 0;
    const interval = setInterval(() => {
      characterIndex += 1;
      setTypedText(gift.content.slice(0, characterIndex));
      if (characterIndex >= gift.content.length) clearInterval(interval);
    }, 28);

    return () => clearInterval(interval);
  }, [isOpen, gift.content]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-xl">
      {!isOpen ? (
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          whileHover={{ y: -6, rotate: -1 }}
          whileTap={{ scale: 0.98 }}
          className="relative mx-auto block w-full max-w-md overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#a5163d] via-[#8d1737] to-[#58142b] p-2 text-left shadow-[0_24px_55px_rgba(122,31,54,0.35)]"
        >
          <div className="relative flex aspect-[1.55/1] items-center justify-center overflow-hidden rounded-[1.1rem] border border-white/15 bg-[#a51e44]">
            <div className="absolute inset-x-0 top-0 h-[58%] origin-top border-x-[10rem] border-t-[7.5rem] border-x-transparent border-t-[#c04a68]" />
            <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#8a1838] to-[#ad2d50]" />
            <div className="absolute left-0 top-[45%] h-0 w-0 border-b-[5.5rem] border-l-[10rem] border-b-transparent border-l-[#ba3a5b]" />
            <div className="absolute right-0 top-[45%] h-0 w-0 border-b-[5.5rem] border-r-[10rem] border-b-transparent border-r-[#ba3a5b]" />
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.35, type: "spring" }} className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-red-200 bg-red-600 text-white shadow-lg">
              <Heart className="h-7 w-7 fill-current" />
            </motion.div>
            <div className="absolute bottom-5 flex items-center gap-2 text-sm font-semibold tracking-wide text-white/90"><Mail className="h-4 w-4" /> Tap to open</div>
          </div>
        </motion.button>
      ) : (
        <motion.article initial={{ opacity: 0, rotateX: -14, y: 16 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} className="relative overflow-hidden rounded-sm border border-red-200 bg-[#fffdf9] px-7 py-9 shadow-[0_24px_55px_rgba(113,44,64,0.2)] sm:px-10">
          <div className="absolute left-0 top-0 h-full w-1.5 bg-red-400" />
          <div className="absolute right-5 top-5 h-10 w-10 rounded-full border border-red-200 bg-red-50" />
          <button type="button" aria-label="Close letter" onClick={() => setIsOpen(false)} className="absolute right-6 top-6 text-red-400 transition hover:text-red-700"><X className="h-5 w-5" /></button>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-red-600">A letter for you</p>
          <div className="my-5 h-px bg-gradient-to-r from-red-300 via-red-100 to-transparent" />
          <p className="min-h-28 font-serif text-lg leading-9 text-[#542435] sm:text-xl">{typedText}<span className="ml-0.5 inline-block h-5 w-px animate-pulse bg-red-500 align-middle" /></p>
          <p className="mt-8 text-right font-serif text-lg italic text-red-700">Always yours</p>
        </motion.article>
      )}
    </motion.div>
  );
}
