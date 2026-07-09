"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Mail } from "lucide-react";

// We'll import the gift components
import GiftNote from "./GiftNote";
import GiftLetter from "./GiftLetter";
import GiftGallery from "./GiftGallery";
import GiftThings from "./GiftThings";
import GiftHeart from "./GiftHeart";

export default function GiftScreen() {
  const [openGiftId, setOpenGiftId] = useState<number | null>(null);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col items-center justify-center p-4"
    >
      {/* Header */}
      <header className="mb-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpenGiftId(null)} // Go back to gift grid
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </motion.button>
        <h1 className="text-3xl font-bold text-pink-800 text-center">
          Your Gifts
        </h1>
      </header>

      {openGiftId ? (
        // Show the selected gift in a modal
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="relative w-full max-w-4xl h-full p-6"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpenGiftId(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>

            {/* Gift content */}
            <div className="h-full overflow-y-auto">
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
          <div className="grid gap-6 w-full max-w-4xl mx-auto">
            {/* Grid layout: 1 column on mobile, 2 columns on tablet, 3 columns on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gifts.map((gift) => (
                <motion.div
                  key={gift.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: (gift.id - 1) * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl cursor-pointer transform hover:scale-105 transition-transform duration-300"
                  onClick={() => setOpenGiftId(gift.id)}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      {gift.title === "Note" && (
                        <Mail className="text-pink-500" />
                      )}
                      {gift.title === "Letter" && (
                        <Envelope className="text-pink-500" />
                      )}
                      {gift.title === "Gallery" && (
                        <Image className="text-pink-500" />
                      )}
                      {gift.title === "Things I Love About You" && (
                        <Heart className="text-pink-500" />
                      )}
                      {gift.title === "Heart of Love" && (
                        <Heart className="text-pink-500" />
                      )}
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-pink-800 mb-2">
                    {gift.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{gift.description}</p>
                  {gift.title === "Things I Love About You" && (
                    <ul className="space-y-2 text-left text-sm">
                      {thingsGift.content
                        .slice(0, 3)
                        .map((item: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <Heart className="flex-shrink-0 mt-1 text-pink-400" />
                            <span className="ml-2">{item}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                  <div className="mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setOpenGiftId(gift.id)}
                      className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                    >
                      Open Gift
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Final message - only show when viewing a gift */}
      {openGiftId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-pink-600 font-medium"
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
function Image({ className }: { className?: string }) {
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