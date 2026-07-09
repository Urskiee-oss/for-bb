import { motion } from "framer-motion";

interface Props {
  gift: {
    title: string;
    description: string;
    content: string[]; // Array of strings for the list
  };
}

export default function GiftThings({ gift }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          {gift.content.map((item, index) => (
            <div key={index} className="flex items-start">
              <motion.span
                role="img"
                aria-label="heart"
                className="flex-shrink-0 mt-1 text-pink-400"
              >
                ❤️
              </motion.span>
              <span className="ml-2">{item}</span>
            </div>
          ))}
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