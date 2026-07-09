import { motion } from "framer-motion";

interface Props {
  gift: {
    title: string;
    description: string;
    content: string;
  };
}

export default function GiftGallery({ gift }: Props) {
  // Sample images - in a real app, these would be actual photos
  const images = [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1526401276527-43d1e909544e?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=60",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="grid gap-4">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={src}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
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