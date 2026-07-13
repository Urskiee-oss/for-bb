"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpen, Heart, RotateCcw, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  gift: { title: string; description: string; content: string };
}

const loveNotes = ["you feel like home", "my favorite person", "always choosing you", "you make life softer", "my happy place", "love you, endlessly"];
const compliments = [
  "Your smile lights up every room",
  "You are breathtaking",
  "Your heart is so kind",
  "You make ordinary days magical",
  "You are my favorite view",
  "Your laugh is my favorite sound",
  "You are beautifully you",
  "You make me feel lucky",
  "You are stronger than you know",
  "You are endlessly lovable",
  "You make the world softer",
  "Your eyes hold galaxies",
  "You are pure sunshine",
  "You are my sweetest thought",
  "You are one of a kind",
  "You make life more beautiful",
  "You are everything lovely",
  "I am so proud of you",
];

export default function GiftHeart({ gift }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [beatKey, setBeatKey] = useState(0);
  const reducedMotion = useReducedMotion();
  const isComplete = sentCount === loveNotes.length;

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
    <section className="relative mx-auto flex min-h-[37rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-[2rem] border border-red-100 bg-[radial-gradient(circle_at_50%_44%,#fff_0%,#fef2f2_38%,#fee2e2_100%)] px-4 py-10 shadow-inner sm:px-8">
      <div className="pointer-events-none absolute -left-20 top-8 h-64 w-64 rounded-full bg-red-200/55 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-red-400/45 blur-3xl" />

      {!isOpen ? (
        <motion.button type="button" onClick={openHeart} initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative z-10 w-full max-w-sm rounded-[2rem] border border-white/90 bg-white/75 px-8 py-10 text-center shadow-[0_24px_60px_rgba(190,24,93,0.16)] backdrop-blur-md">
          <span className="absolute inset-3 rounded-[1.5rem] border border-red-100" />
          <motion.span animate={reducedMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-red-500 via-red-600 to-red-900 text-white shadow-[0_16px_30px_rgba(220,38,38,0.3)]">
            <span className="absolute inset-2 rounded-[1.35rem] border border-white/30" /><Heart className="h-11 w-11 fill-current" />
          </motion.span>
          <span className="relative mt-7 block"><span className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-red-600"><Sparkles className="h-3 w-3" /> Just for you</span><span className="mt-3 block font-serif text-3xl font-semibold text-red-950">A heart with your name on it</span><span className="mt-3 block text-sm leading-6 text-slate-600">Open it, then send a little love back whenever you need one.</span></span>
        </motion.button>
      ) : (
        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
          <div className="relative grid h-[21rem] w-full place-items-center sm:h-[25rem]">
            <div className="absolute h-[17rem] w-[17rem] rounded-full border border-red-200/80 sm:h-[21rem] sm:w-[21rem]" /><div className="absolute h-[12rem] w-[12rem] rounded-full border border-red-200/60 sm:h-[15rem] sm:w-[15rem]" />
            {!isComplete && loveNotes.map((note, index) => {
              const angle = (360 / loveNotes.length) * index - 90;
              const isSent = index < sentCount;
              return <motion.span key={note} initial={{ opacity: 0, scale: 0.5, rotate: angle }} animate={{ opacity: isSent ? 1 : 0.28, scale: isSent ? 1 : 0.84, rotate: angle, x: Math.cos((angle * Math.PI) / 180) * 145, y: Math.sin((angle * Math.PI) / 180) * 145 }} transition={{ duration: reducedMotion ? 0.15 : 0.55, delay: reducedMotion ? 0 : index * 0.08, type: "spring", bounce: 0.3 }} className="absolute rounded-full border border-red-200 bg-white/90 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-red-700 shadow-sm sm:px-4 sm:text-[0.68rem]">{note}</motion.span>;
            })}
            <AnimatePresence mode="wait">
              {isComplete ? (
                <motion.div key="compliments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0.1 : 0.35, delay: reducedMotion ? 0 : 0.45 }} className="absolute inset-0 grid grid-cols-3 content-center gap-2 px-1 sm:gap-3">
                  {compliments.map((compliment, index) => (
                    <motion.span key={compliment} initial={{ opacity: 0, scale: 0.3, x: "50%", y: "50%" }} animate={{ opacity: 1, scale: 1, x: 0, y: 0 }} transition={{ duration: reducedMotion ? 0.1 : 0.45, delay: reducedMotion ? 0 : 0.5 + index * 0.045, type: "spring", bounce: 0.45 }} className="rounded-2xl border border-red-200 bg-white/90 px-1.5 py-1.5 font-serif text-[0.62rem] font-semibold leading-3 text-red-800 shadow-sm sm:px-3 sm:py-2 sm:text-sm sm:leading-4">
                      {compliment}
                    </motion.span>
                  ))}
                </motion.div>
              ) : (
                <motion.div key={beatKey} initial={{ scale: 1 }} animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.12, 0.98, 1] }} exit={reducedMotion ? { opacity: 0 } : { scale: [1, 1.55, 0.15], opacity: [1, 1, 0], rotate: [0, -8, 10] }} transition={{ duration: reducedMotion ? 0.1 : 0.62, ease: "easeOut" }} className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-900 text-white shadow-[0_18px_42px_rgba(185,28,28,0.34)] sm:h-48 sm:w-48"><span className="absolute inset-2 rounded-full border border-white/25" /><Heart className="h-16 w-16 fill-current sm:h-20 sm:w-20" /><span className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.24em] text-white/85">{sentCount}/{loveNotes.length} sent</span></motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.25 }} className="mt-2 max-w-md"><p className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-red-600"><Sparkles className="h-3 w-3" /> A little loop of love</p><h3 className="mt-3 font-serif text-3xl font-semibold text-red-950 sm:text-4xl">{gift.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{isComplete ? "My heart burst into all the reasons you are so incredible." : gift.description}</p></motion.div>
          <div className="mt-6 flex flex-wrap justify-center gap-3"><motion.button type="button" onClick={sendLove} disabled={isComplete} whileHover={!isComplete ? { scale: 1.03 } : undefined} whileTap={!isComplete ? { scale: 0.97 } : undefined} className="inline-flex items-center gap-2 rounded-full bg-red-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(185,28,28,0.24)] transition disabled:cursor-default disabled:bg-red-300"><Send className="h-4 w-4" /> {isComplete ? "All my love, sent" : "Send a little love"}</motion.button><button type="button" onClick={openHeart} className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/75 px-5 py-3 text-sm font-semibold text-red-800 transition hover:bg-white"><RotateCcw className="h-4 w-4" /> Begin again</button></div>
          {isComplete && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 1.3 }} className="mt-7 w-full max-w-lg rounded-2xl border border-red-200 bg-white/70 p-4"><p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-700"><BookOpen className="h-3.5 w-3.5" /> Revisit your gifts</p><Link href="/gifts" className="mt-3 inline-flex items-center gap-2 rounded-xl border border-red-100 bg-white px-4 py-2.5 text-sm font-semibold text-red-800 shadow-sm transition hover:border-red-300 hover:bg-red-50"><BookOpen className="h-4 w-4" /> See all gifts</Link></motion.div>}
        </div>
      )}
    </section>
  );
}
