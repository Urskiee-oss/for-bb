"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Lock, Mail } from "lucide-react";
import GiftNote from "./GiftNote";
import GiftLetter from "./GiftLetter";
import GiftGallery from "./GiftGallery";
import GiftThings from "./GiftThings";
import GiftHeart from "./GiftHeart";

export default function GiftScreen() {
  const [activeGiftId, setActiveGiftId] = useState<number | null>(null);
  const [answeredGiftIds, setAnsweredGiftIds] = useState<number[]>([]);
  const [currentGiftIndex, setCurrentGiftIndex] = useState(0);

  const noteGift = { title: "Note", description: "A cute sticky note with a sweet message", content: "You make my heart smile every day." };
  const letterGift = { title: "Letter", description: "A romantic love letter with typewriter animation", content: "My love for you grows stronger each day. You are my everything." };
  const galleryGift = { title: "Gallery", description: "A collection of our favorite memories together", content: "A scrapbook of us" };
  const thingsGift = { title: "Things I Love About You", description: "A list of all the things I adore about you", content: ["Your smile", "Your kindness", "Your sense of humor", "The way you listen", "Your beautiful heart"] };
  const heartGift = { title: "A Loop of Love", description: "Every I love you keeps coming back to you.", content: "An endless loop of love" };
  const gifts = [
    { id: 1, question: "What is one little thing that always makes you smile?", choices: ["Sweet messages", "Silly moments", "Time together"], ...noteGift },
    { id: 2, question: "What is a memory of us that you love thinking about?", choices: ["Our first date", "Late-night talks", "An adventure together"], ...letterGift },
    { id: 3, question: "What is one moment you would want us to relive together?", choices: ["A cozy evening", "A special trip", "A perfect date"], ...galleryGift },
    { id: 4, question: "What is one thing you appreciate most about our relationship?", choices: ["Our support", "Our laughter", "Our connection"], ...thingsGift },
    { id: 5, question: "In one word, how would you describe us?", choices: ["Home", "Magic", "Forever"], ...heartGift },
  ];
  const currentGift = gifts[currentGiftIndex];
  const currentGiftIsUnlocked = answeredGiftIds.includes(currentGift.id);
  const unlockGift = (giftId: number) => setAnsweredGiftIds((current) => current.includes(giftId) ? current : [...current, giftId]);

  const activeGift = activeGiftId ? gifts.find((gift) => gift.id === activeGiftId) : null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="relative isolate min-h-screen overflow-hidden px-4 py-10 text-slate-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-pink-300/18 blur-3xl" /><div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-violet-300/18 blur-3xl" /><div className="absolute bottom-0 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-rose-200/20 blur-3xl" /></div>
      {activeGift ? (
        <main className="relative mx-auto w-full max-w-6xl">
          <motion.button type="button" onClick={() => setActiveGiftId(null)} whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-white"><ArrowLeft className="h-4 w-4" /> Back to gifts</motion.button>
          <motion.div key={activeGift.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[2rem] p-4 sm:p-7">
            {activeGift.id === 1 && <GiftNote gift={noteGift} />}
            {activeGift.id === 2 && <GiftLetter gift={letterGift} />}
            {activeGift.id === 3 && <GiftGallery gift={galleryGift} />}
            {activeGift.id === 4 && <GiftThings gift={thingsGift} />}
            {activeGift.id === 5 && <GiftHeart gift={heartGift} />}
          </motion.div>
          <p className="mt-8 text-center font-medium text-pink-600">Thank you for accepting my gifts. I love you more than words can say.</p>
        </main>
      ) : (
        <main className="relative flex min-h-[calc(100vh-12rem)] w-full items-center justify-center">
          <motion.section key={currentGift.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative flex min-h-[calc(100vh-12rem)] w-full max-w-5xl flex-col justify-center overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_18px_55px_rgba(76,29,149,0.12)] sm:p-10">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400" /><div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-200/40 blur-3xl" />
            <div className="relative mx-auto w-full max-w-xl text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-white shadow-inner">{!currentGiftIsUnlocked && <Lock className="h-6 w-6 text-pink-500" />}{currentGiftIsUnlocked && currentGift.title === "Note" && <Mail className="h-6 w-6 text-pink-500" />}{currentGiftIsUnlocked && currentGift.title !== "Note" && <Heart className="h-6 w-6 text-pink-500" />}</div>
              {!currentGiftIsUnlocked ? <div className="space-y-5"><p className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-500">Gift {currentGift.id} of {gifts.length}</p><h2 className="text-2xl font-semibold leading-9 text-slate-900 sm:text-3xl">{currentGift.question}</h2><div className="grid gap-3 pt-2">{currentGift.choices.map((choice) => <motion.button key={choice} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => unlockGift(currentGift.id)} className="w-full rounded-2xl border border-pink-200 bg-white/85 px-5 py-4 text-base font-semibold text-slate-800 shadow-sm transition-colors hover:border-pink-400 hover:bg-pink-50">{choice}</motion.button>)}</div></div> : <div className="space-y-5"><p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600">Gift {currentGift.id} unlocked</p><h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{currentGift.title}</h2><p className="text-base leading-8 text-slate-600">{currentGift.description}</p><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setActiveGiftId(currentGift.id)} className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-4 text-base font-semibold text-white shadow-[0_14px_40px_rgba(236,72,153,0.25)]">Open Gift</motion.button>{currentGiftIndex < gifts.length - 1 && <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setCurrentGiftIndex((index) => index + 1)} className="w-full rounded-2xl border border-pink-200 bg-white/85 px-5 py-4 text-base font-semibold text-pink-600">Next gift</motion.button>}</div>}
            </div>
          </motion.section>
        </main>
      )}
    </motion.div>
  );
}