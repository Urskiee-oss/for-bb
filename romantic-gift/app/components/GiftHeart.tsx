import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
  gift: {
    title: string;
    description: string;
    content: string;
  };
}

export default function GiftHeart({ gift }: Props) {
  const isReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Create an array of "I Love You" strings to fill the heart
  const loveText = "I Love You ";
  const repeatedText = loveText.repeat(100); // Adjust as needed

  useEffect(() => {
    // Optional: add interactive effects on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (isReducedMotion) return;
      const { clientX, clientY } = e;
      // We could create a ripple effect or move particles
      // For simplicity, we'll just log
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isReducedMotion]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative w-full h-96 flex items-center justify-center"
      style={{ overflow: "hidden" }}
    >
      {/* Heart shape using CSS clip-path or border-radius */}
      <div
        className="relative w-64 h-64 bg-pink-100/20 rounded-lg flex items-center justify-center overflow-hidden"
        style={{
          // Create a heart shape using two circles and a triangle (via pseudo-elements)
          // We'll use a simple approach: rotate a square
          transform: "rotate(45deg)",
          // We'll use a background of repeating text
          // Since we can't easily repeat text in CSS, we'll use a large text-shadow or multiple spans
          // For simplicity, we'll just show the text in a loop
        }}
      >
        {/* We'll fill the heart with the text by using a pseudo-element or multiple spans */}
        <div className="absolute inset-0 flex items-center justify-center text-pink-500 text-[12px] leading-none">
          {/* Repeat the text many times to fill the space */}
          {Array.from({ length: 200 }).map((_, i) => (
            <span key={i} className="block w-full text-center">
              {loveText}
            </span>
          ))}
        </div>

        {/* Heartbeat animation */}
        <div className="absolute inset-0 rounded-full heartbeat"
          style={{
            backgroundColor: "rgba(255, 192, 203, 0.3)",
          }}
        />
      </div>

      <div className="text-center mt-4">
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