import { useState, useEffect } from 'react';
import Heart from '../components/Heart';
import LoveView from '../components/LoveView';

export default function Home() {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('heartProgress');
    return saved ? parseFloat(saved) : 0;
  });
  const [showLoveView, setShowLoveView] = useState(false);

  // Update progress and localStorage
  const handleClick = () => {
    const newProgress = Math.min(progress + 0.2, 1); // 0.2 per click => 5 clicks to fill
    setProgress(newProgress);
    localStorage.setItem('heartProgress', newProgress);
  };

  // Watch for progress completion
  useEffect(() => {
    if (progress >= 1) {
      setShowLoveView(true);
    }
  }, [progress]);

  // If already complete on load, show love view
  useEffect(() => {
    if (progress >= 1) {
      setShowLoveView(true);
    }
  }, []);

  return (
    <div>
      {showLoveView ? <LoveView /> : <Heart progress={progress} onClick={handleClick} />}
    </div>
  );
}