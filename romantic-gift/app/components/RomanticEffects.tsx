import { useEffect } from "react";

export default function RomanticEffects() {
  useEffect(() => {
    // Create cursor heart effect
    const createHeart = (e: MouseEvent) => {
      const heart = document.createElement("div");
      heart.innerHTML = "❤️";
      heart.style.position = "fixed";
      heart.style.left = `${e.pageX}px`;
      heart.style.top = `${e.pageY}px`;
      heart.style.fontSize = "12px";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "9999";
      heart.style.opacity = "0.7";
      heart.style.transform = "translate(-50%, -50%) scale(0)";
      heart.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      document.body.appendChild(heart);

      // Trigger reflow to enable CSS transition
      void heart.offsetWidth;

      // Animate the heart
      heart.style.transform = "translate(-50%, -50%) scale(1.2)";
      heart.style.opacity = "0";

      // Remove after animation
      setTimeout(() => {
        heart.remove();
      }, 300);
    };

    // Create floating sparkles
    const createSparkle = () => {
      const sparkle = document.createElement("div");
      sparkle.innerHTML = "✨";
      sparkle.style.position = "fixed";
      sparkle.style.left = `${Math.random() * 100}vw`;
      sparkle.style.top = `${Math.random() * 100}vh`;
      sparkle.style.fontSize = `${Math.random() * 10 + 10}px`;
      sparkle.style.pointerEvents = "none";
      sparkle.style.zIndex = "9998";
      sparkle.style.opacity = "0.7";
      sparkle.style.animation = "floatUp 3s ease-out forwards";
      document.body.appendChild(sparkle);

      // Remove after animation
      setTimeout(() => {
        sparkle.remove();
      }, 3000);
    };

    // Event listeners
    document.addEventListener("mousemove", createHeart);
    const sparkleInterval = setInterval(createSparkle, 300);

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", createHeart);
      clearInterval(sparkleInterval);
    };
  }, []);

  // Add keyframes for sparkle animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes floatUp {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.7;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  return null;
}