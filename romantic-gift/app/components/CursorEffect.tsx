import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CursorEffect() {
  const pathname = usePathname();

  useEffect(() => {
    // Create cursor effect
    const createHeart = (e: MouseEvent) => {
      const heart = document.createElement("div");
      heart.innerHTML = "❤️";
      heart.style.position = "fixed";
      heart.style.left = `${e.pageX}px`;
      heart.style.top = `${e.pageY}px`;
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "9999";
      heart.style.fontSize = "12px";
      heart.style.opacity = "0.7";
      heart.style.transform = "translate(-50%, -50%) scale(0)";
      heart.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      document.body.appendChild(heart);

      // Animate the heart
      requestAnimationFrame(() => {
        heart.style.transform = "translate(-50%, -50%) scale(1)";
        heart.style.opacity = "0";
      });

      // Remove after animation
      setTimeout(() => {
        if (heart.parentElement) {
          heart.parentElement.removeChild(heart);
        }
      }, 300);
    };

    // Only add the effect on certain pages if needed
    // For now, we'll add it everywhere
    document.addEventListener("mousedown", createHeart);
    document.addEventListener("touchstart", (e: TouchEvent) => {
      // For touch devices
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      document.dispatchEvent(mouseEvent);
    });

    return () => {
      document.removeEventListener("mousedown", createHeart);
      document.removeEventListener("touchstart", (e: any) => {});
    };
  }, [pathname]);

  return null;
}