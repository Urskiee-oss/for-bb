"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart, RotateCcw, Send, Sparkles } from "lucide-react";
import { useState } from "react";

interface Props {
  gift: { title: string; description: string; content: string };
}

const loveNotes = ["you feel like home", "my favorite person", "always choosing you", "you make life softer", "my happy place", "love you, endlessly"];

export default function GiftHeart({ gift }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [beatKey, setBeatKey] = useState(0);
  const reducedMotion = useReducedMotion();

  const openHeart = () => {
    setIsOpen(true);
    setSentCount(0);
    setBeatKey((key) => key + 1);
  };

  const sendLove = () => {
    setSentCount((count) => Math.min(count + 1, loveNotes.length));
    setBeatKey((key) => key + 1);
  };

  return (
    <section className="relative mx-auto flex min-h-[37rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-[2rem] border border-rose-100 bg-[radial-gradient(circle_at_50%_44%,#fff_0%,#fff1f2_38%,#ffe4e6_100%)] px-4 py-10 shadow-inner sm:px-8">
      <div className="pointer-events-none absolute -left-20 top-8 h-64 w-64 rounded-full bg-pink-200/55 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-rose-300/45 blur-3xl" />

      {!isOpen ? (
        <motion.button type="button" onClick={openHeart} initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative z-10 w-full max-w-sm rounded-[2rem] border border-white/90 bg-white/75 px-8 py-10 text-center shadow-[0_24px_60px_rgba(190,24,93,0.16)] backdrop-blur-md">
          <span className="absolute inset-3 rounded-[1.5rem] border border-rose-100" />
          <motion.span animate={reducedMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-rose-400 via-rose-500 to-pink-700 text-white shadow-[0_16px_30px_rgba(225,29,72,0.3)]">
            <span className="absolute inset-2 rounded-[1.35rem] border border-white/30" /><Heart className="h-11 w-11 fill-current" />
          </motion.span>
          <span className="relative mt-7 block"><span className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-rose-500"><Sparkles className="h-3 w-3" /> Just for you</span><span className="mt-3 block font-serif text-3xl font-semibold text-rose-950">A heart with your name on it</span><span className="mt-3 block text-sm leading-6 text-slate-600">Open it, then send a little love back whenever you need one.</span></span>
        </motion.button>
      ) : (
        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
          <div className="relative grid h-[21rem] w-full place-items-center sm:h-[25rem]">
            <div className="absolute h-[17rem] w-[17rem] rounded-full border border-rose-200/80 sm:h-[21rem] sm:w-[21rem]" /><div className="absolute h-[12rem] w-[12rem] rounded-full border border-rose-200/60 sm:h-[15rem] sm:w-[15rem]" />
            {loveNotes.map((note, index) => {
              const angle = (360 / loveNotes.length) * index - 90;
              const isSent = index < sentCount;
              return <motion.span key={note} initial={{ opacity: 0, scale: 0.5, rotate: angle }} animate={{ opacity: isSent ? 1 : 0.28, scale: isSent ? 1 : 0.84, rotate: angle, x: Math.cos((angle * Math.PI) / 180) * 145, y: Math.sin((angle * Math.PI) / 180) * 145 }} transition={{ duration: reducedMotion ? 0.15 : 0.55, delay: reducedMotion ? 0 : index * 0.08, type: "spring", bounce: 0.3 }} className="absolute rounded-full border border-rose-200 bg-white/90 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-rose-600 shadow-sm sm:px-4 sm:text-[0.68rem]">{note}</motion.span>;
            })}
            <motion.div key={beatKey} initial={{ scale: 1 }} animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.12, 0.98, 1] }} transition={{ duration: 0.62, ease: "easeOut" }} className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full bg-gradient-to-br from-rose-400 via-rose-500 to-pink-700 text-white shadow-[0_18px_42px_rgba(190,24,93,0.34)] sm:h-48 sm:w-48"><span className="absolute inset-2 rounded-full border border-white/25" /><Heart className="h-16 w-16 fill-current sm:h-20 sm:w-20" /><span className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.24em] text-white/85">{sentCount}/{loveNotes.length} sent</span></motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.25 }} className="mt-2 max-w-md"><p className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-rose-500"><Sparkles className="h-3 w-3" /> A little loop of love</p><h3 className="mt-3 font-serif text-3xl font-semibold text-rose-950 sm:text-4xl">{gift.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{sentCount === loveNotes.length ? "Every version of my love finds its way back to you." : gift.description}</p></motion.div>
          <div className="mt-6 flex flex-wrap justify-center gap-3"><motion.button type="button" onClick={sendLove} disabled={sentCount === loveNotes.length} whileHover={sentCount < loveNotes.length ? { scale: 1.03 } : undefined} whileTap={sentCount < loveNotes.length ? { scale: 0.97 } : undefined} className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(225,29,72,0.24)] transition disabled:cursor-default disabled:bg-rose-300"><Send className="h-4 w-4" /> {sentCount === loveNotes.length ? "All my love, sent" : "Send a little love"}</motion.button><button type="button" onClick={openHeart} className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/75 px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-white"><RotateCcw className="h-4 w-4" /> Begin again</button></div>
        </div>
      )}
    </section>
  );
}
