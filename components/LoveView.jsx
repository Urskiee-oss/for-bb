import { useEffect, useRef } from 'react';

const loveTexts = [
  'I love you',
  'Te amo',
  'Je t’aime',
  '愛してる',
  'أحبك',
  'मैं तुमसे प्यार करता/करती हूँ',
  'Я тебя люблю',
  'Eu te amo',
];

export default function LoveView() {
  const textContainerRef = useRef(null);
  const carnationContainerRef = useRef(null);
  const noteRef = useRef(null);

  // Create falling text elements
  useEffect(() => {
    const container = textContainerRef.current;
    if (!container) return;

    // Create a set of spans for each language
    loveTexts.forEach((text, index) => {
      const span = document.createElement('span');
      span.textContent = text;
      // Random horizontal position
      span.style.left = `${Math.random() * 100}vw`;
      // Random animation delay
      span.style.animationDelay = `${Math.random() * 10}s`;
      // Random duration
      const duration = 10 + Math.random() * 15; // 10-25s
      span.style.animationDuration = `${duration}s`;
      // Optional: slight rotation variation
      span.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
      container.appendChild(span);
    });

    // Cleanup on unmount
    return () => {
      container.innerHTML = '';
    };
  }, []);

  // Create floating carnations continuously
  useEffect(() => {
    const container = carnationContainerRef.current;
    if (!container) return;

    const createCarnation = () => {
      const carnation = document.createElement('div');
      carnation.className = 'carnation';
      const size = 8 + Math.random() * 12; // 8-20px
      carnation.style.width = `${size}px`;
      carnation.style.height = `${size}px`;
      carnation.style.left = `${Math.random() * 100}vw`;
      carnation.style.top = `-${size}px`;
      const duration = 5 + Math.random() * 10; // 5-15s
      const delay = Math.random() * 5; // 0-5s
      const drift = (Math.random() - 0.5) * 200; // -100 to 100px
      carnation.style.animation = `fall ${duration}s linear ${delay}s`;
      carnation.style.setProperty('--drift', `${drift}px`);
      carnation.style.opacity = 0.6 + Math.random() * 0.4;
      container.appendChild(carnation);
      carnation.addEventListener('animationend', () => {
        carnation.remove();
      });
    };

    const interval = setInterval(createCarnation, 300); // every 300ms
    // Optionally create an initial batch
    for (let i = 0; i < 20; i++) {
      setTimeout(createCarnation, i * 30);
    }

    return () => {
      clearInterval(interval);
      // Optionally clear remaining carnations
      container.innerHTML = '';
    };
  }, []);

  // Handle input to limit length to 150 characters
  const handleInput = (e) => {
    const content = e.target.innerText;
    if (content.length > 150) {
      // Trim to 150 chars and restore cursor position
      const selectionStart = e.target.selectionStart;
      e.target.innerText = content.slice(0, 150);
      // Set cursor to end of text (or preserve position if within limit)
      const newPos = Math.min(selectionStart, 150);
      // Move cursor to newPos
      const range = document.createRange();
      const sel = window.getSelection();
      range.setNodeContents(e.target.firstChild);
      range.collapse(false);
      // Actually easier: set selection via setBaseAndExtent
      // Simplify: set selection to start of text + newPos using a temporary span approach?
      // For simplicity, we just set cursor at end.
      e.target.focus();
      // document.execCommand('selectAll', false, null); // not good
      // We'll just set selection to end.
    }
  };

  return (
    <>
      <div className="background-container" aria-hidden="true">
        <div className="falling-text" ref={textContainerRef} />
        <div className="falling-carnations" ref={carnationContainerRef} />
      </div>
      <div className="love-note-container">
        <div
          className="love-note-box"
          contentEditable
          ref={noteRef}
          onInput={handleInput}
          placeholder="My dear Hon, ..."
          aria-label="Love note"
        >
          My dear Hon,
          You make my heart bloom like a carnation in spring. Every click reminds me of how my love for you grows deeper and brighter. I love you in every language, in every moment, forever.
        </div>
        <div className="decorative-corner top-left" aria-hidden="true" />
        <div className="decorative-corner top-right" aria-hidden="true" />
        <div className="decorative-corner bottom-left" aria-hidden="true" />
        <div className="decorative-corner bottom-right" aria-hidden="true" />
      </div>
    </>
  );
}