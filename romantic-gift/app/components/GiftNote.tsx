import { motion } from "framer-motion";

interface Props {
  gift: {
    title: string;
    description: string;
    content: string;
  };
}

export default function GiftNote({ gift }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-center">
        <div className="relative w-80 h-96 bg-yellow-100 border-2 border-yellow-300 rounded-lg shadow-xl p-4">
          {/* Sticky note look */}
          <div className="absolute -top-2 left-2 w-10 h-10 bg-yellow-200 rotate-[5deg]" />
          <div className="absolute -top-2 right-2 w-10 h-10 bg-yellow-200 rotate-[-5deg]" />
          
          {/* Note content */}
          <div className="relative h-full">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-800 text-center leading-relaxed"
            >
              {gift.content}
            </motion.p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <motion.h3
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-xl font-bold text-pink-600"
        >
          {gift.title}
        </motion.h3>
        <p className="text-gray-600">{gift.description}</p>
      </div>
    </motion.div>
  );
}
