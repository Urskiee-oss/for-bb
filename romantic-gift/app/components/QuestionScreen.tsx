import { motion } from "framer-motion";
import { Heart, HeartBreak } from "lucide-react";

interface Props {
  onYes: () => void;
  onNo: () => void;
}

export default function QuestionScreen({ onYes, onNo }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col items-center justify-center p-4 text-center"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-[rem(24px)] text-pink-400/50"
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                fontSize: Math.random() * 20 + 10 + "px",
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: -100 - Math.random() * 200,
                opacity: [0, 0.5, 0],
                transition: {
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              ❤️
            </motion.span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-pink-800 mb-4">
          Do you love me? ❤️
        </h1>
        <p className="text-lg text-gray-600">
          Choose your answer carefully.
        </p>

        <div className="flex flex-col space-y-4 md:flex-row md:space-x-6">
          <motion.button
            whileHover={{ scale: 1.05, rotate: [0, 5, 0, -5, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={onYes}
            className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-xl shadow-md transform transition-all duration-200 hover:scale-105"
          >
            <Heart className="mr-2" /> Yes, I do
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, rotate: [0, -5, 0, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={onNo}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl shadow-md transform transition-all duration-200 hover:scale-105"
          >
            <HeartBreak className="mr-2" /> No
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
