"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Heart, Mail, Lock } from "lucide-react";

// We'll import the gift components
import GiftNote from "./GiftNote";
import GiftLetter from "./GiftLetter";
import GiftGallery from "./GiftGallery";
import GiftThings from "./GiftThings";
import GiftHeart from "./GiftHeart";

export default function GiftScreen() {
  const [openGiftId, setOpenGiftId] = useState<number | null>(null);
  const [firstGiftUnlocked, setFirstGiftUnlocked] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [challengeError, setChallengeError] = useState("");

  const noteGift = {
    title: "Note",
    description: "A cute sticky note with a sweet message",
    content: "You make my heart smile every day. 💖",
  };

  const letterGift = {
    title: "Letter",
    description: "A romantic love letter with typewriter animation",
    content: "My love for you grows stronger each day. You are my everything.",
  };

  const galleryGift = {
    title: "Gallery",
    description: "A collection of our favorite memories together",
    content: "Placeholder for photos - you can add your own images here",
  };

  const thingsGift = {
    title: "Things I Love About You",
    description: "A list of all the things I adore about you",
    content: [
      "Your smile",
      "Your kindness",
      "Your sense of humor",
      "The way you listen",
      "Your beautiful heart",
    ],
  };

  const heartGift = {
    title: "Heart of Love",
    description: "An animated heart made of 'I Love You' text",
    content: "This will be rendered as a special canvas element",
  };

  // Sample data - in a real app, this would come from a data file or props
  const gifts = [
    { id: 1, ...noteGift },
    { id: 2, ...letterGift },
    { id: 3, ...galleryGift },
    { id: 4, ...thingsGift },
    { id: 5, ...heartGift },
  ];

  const openGift = (giftId: number) => {
    if (giftId === 1 && !firstGiftUnlocked) {
      setChallengeError("");
      setChallengeAnswer("");
      setShowChallenge(true);
      return;
    }

    setOpenGiftId(giftId);
  };

  const closeGift = () => {
    setOpenGiftId(null);
  };

  const handleChallengeSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (challengeAnswer.trim() === "7") {
      setFirstGiftUnlocked(true);
      setShowChallenge(false);
      setChallengeError("");
      setOpenGiftId(1);
      return;
    }

    setChallengeError("Not quite. Try again.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative isolate min-h-screen overflow-hidden px-4 py-10 text-slate-900"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-pink-300/18 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-violet-300/18 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-rose-200/20 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 mx-auto mb-8 flex w-full max-w-5xl items-center justify-between gap-4 rounded-[1.75rem] px-2 py-2 sm:px-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-pink-500/80">
            Curated collection
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Your gifts
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Small pieces of the story, each wrapped in its own little mood.
          </p>
        </div>

      </header>

      {showChallenge && !firstGiftUnlocked ? (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-panel relative w-full max-w-md rounded-[2rem] p-6 text-center sm:p-8"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
              <Lock className="h-6 w-6" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-pink-500/80">
              Gift lock
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
              Solve the challenge first
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Answer this to open the first gift: what is 3 + 4?
            </p>

            <form onSubmit={handleChallengeSubmit} className="mt-6 space-y-4">
              <input
                value={challengeAnswer}
                onChange={(event) => setChallengeAnswer(event.target.value)}
                placeholder="Your answer"
                className="w-full rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-center text-base text-slate-900 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-200/60"
              />
              {challengeError && (
                <p className="text-sm font-medium text-rose-600">{challengeError}</p>
              )}
              <div className="flex flex-col gap-3 sm:flex-row">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(236,72,153,0.25)]"
                >
                  <CheckCircle2 className="h-4 w-4" /> Unlock Gift 1
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowChallenge(false)}
                  className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : openGiftId ? (
        // Show the selected gift in a modal
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="glass-panel relative w-full max-w-4xl rounded-[2rem] p-4 sm:p-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeGift}
              className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </motion.button>

            {/* Gift content */}
            <div className="max-h-[80vh] overflow-y-auto p-2 sm:p-4">
              {gifts.find((g) => g.id === openGiftId) && (
                <>
                  {openGiftId === 1 && <GiftNote gift={noteGift} />}
                  {openGiftId === 2 && <GiftLetter gift={letterGift} />}
                  {openGiftId === 3 && <GiftGallery gift={galleryGift} />}
                  {openGiftId === 4 && <GiftThings gift={thingsGift} />}
                  {openGiftId === 5 && <GiftHeart gift={heartGift} />}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : (
        // Show the gift grid
        <main className="flex-1 w-full">
          {/* Gift Grid */}
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gifts.map((gift) => (
              <motion.div
                key={gift.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: (gift.id - 1) * 0.1 }}
                className="group relative cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/75 p-6 shadow-[0_18px_55px_rgba(76,29,149,0.12)] transition-transform duration-300 hover:-translate-y-1"
                onClick={() => setOpenGiftId(gift.id)}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400" />
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-pink-200/40 blur-2xl transition-transform duration-300 group-hover:scale-125" />
                <div className="flex items-center justify-center mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-white shadow-inner">
                    {gift.title === "Note" && (
                      <Mail className="h-5 w-5 text-pink-500" />
                    )}
                    {gift.title === "Letter" && (
                      <Envelope className="h-5 w-5 text-pink-500" />
                    )}
                    {gift.title === "Gallery" && (
                      <GalleryIcon className="h-5 w-5 text-pink-500" />
                    )}
                    {gift.title === "Things I Love About You" && (
                      <Heart className="h-5 w-5 text-pink-500" />
                    )}
                    {gift.title === "Heart of Love" && (
                      <Heart className="h-5 w-5 text-pink-500" />
                    )}
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  {gift.title}
                </h2>
                <p className="mb-4 text-sm leading-7 text-slate-600">{gift.description}</p>
                {gift.title === "Things I Love About You" && (
                  <ul className="space-y-2 text-left text-sm text-slate-700">
                    {thingsGift.content
                      .slice(0, 3)
                      .map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Heart className="mt-1 h-4 w-4 flex-shrink-0 text-pink-400" />
                          <span className="ml-2">{item}</span>
                        </li>
                      ))}
                  </ul>
                )}
                <div className="mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openGift(gift.id)}
                    className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(236,72,153,0.25)] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    {gift.id === 1 && !firstGiftUnlocked ? "Unlock Gift" : "Open Gift"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      )}

      {/* Final message - only show when viewing a gift */}
      {openGiftId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center font-medium text-pink-600"
        >
          Thank you for accepting my gifts. I love you more than words can say.
        </motion.div>
      )}
    </motion.div>
  );
}

// Envelope icon component (since lucide-react doesn't have an envelope by default in some versions)
function Envelope({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="16" rx="2" ry="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
}

// Image icon component (since lucide-react doesn't have an image by default in some versions)
function GalleryIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="2" />
      <path d="M21 15v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />
    </svg>
  );
}