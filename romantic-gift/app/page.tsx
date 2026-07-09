"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LandingScreen from "./components/LandingScreen";
import QuestionScreen from "./components/QuestionScreen";
import GiftScreen from "./components/GiftScreen";
import NoScreen from "./components/NoScreen";

export default function Home() {
  const [step, setStep] = useState<'landing' | 'question' | 'gift' | 'no'>(
    'landing'
  );

  const handleContinue = () => {
    setStep('question');
  };

  const handleYes = () => {
    setStep('gift');
  };

  const handleNo = () => {
    setStep('no');
  };

  const handleTryAgain = () => {
    setStep('question');
  };

  return (
    <>
      <AnimatePresence>
        {step === 'landing' && (
          <LandingScreen onContinue={handleContinue} key="landing" />
        )}
        {step === 'question' && (
          <QuestionScreen onYes={handleYes} onNo={handleNo} key="question" />
        )}
        {step === 'gift' && (
          <GiftScreen key="gift" />
        )}
        {step === 'no' && (
          <NoScreen onTryAgain={handleTryAgain} key="no" />
        )}
      </AnimatePresence>
    </>
  );
}
