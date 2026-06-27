import { useState, useRef, useEffect } from 'react';

export default function Heart({ progress, onClick }) {
  const heartContainerRef = useRef(null);
  const particleContainerRef = useRef(null);

  // Determine fill class based on progress
  const getFillClass = () => {
    const step = Math.min(Math.ceil(progress * 5), 5);
    return step === 0 ? 'heart-fill' : `heart-fill progress-${step}`;
  };

  // Create particle effect at click position
  const createParticles = (clientX, clientY) => {
    const rect = particleContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const particleCount = 5 + Math.floor(Math.random() * 4); // 5-8

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'carnation';
      const size = 8 + Math.random() * 8; // 8-16px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x - size / 2}px`;
      particle.style.top = `${y - size / 2}px`;
      particle.style.opacity = 0.6 + Math.random() * 0.4;
      const duration = 3 + Math.random() * 5; // 3-8s
      const delay = Math.random() * 2; // 0-2s
      const drift = (Math.random() - 0.5) * 100; // -50 to 50px
      particle.style.animation = `fall ${duration}s linear ${delay}s`;
      particle.style.setProperty('--drift', `${drift}px`);
      particleContainerRef.current.appendChild(particle);
      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    }
  };

  const handleClick = (e) => {
    let clientX, clientY;
    if (e.type === 'touchstart') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    createParticles(clientX, clientY);
    onClick();
    e.preventDefault(); // prevent scroll on touch
  };

  // Floating carnations for heart view background (optional, but we can add)
  useEffect(() => {
    const interval = setInterval(() => {
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
      particleContainerRef.current.appendChild(carnation);
      carnation.addEventListener('animationend', () => {
        carnation.remove();
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="heart-container" ref={heartContainerRef} onClick={handleClick} onTouchStart={handleClick} >
        <svg className="heart-outline" viewBox="0 0 24 20">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <svg className={getFillClass()} viewBox="0 0 24 20">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <div className="instructions">Click or tap the heart to fill it with love</div>
      <div ref={particleContainerRef} aria-hidden="true" />
    </div>
  );
}