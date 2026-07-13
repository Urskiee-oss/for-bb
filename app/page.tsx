"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LandingScreen from "./components/LandingScreen";
import QuestionScreen from "./components/QuestionScreen";
import GiftScreen from "./components/GiftScreen";
import NoScreen from "./components/NoScreen";
import CountdownGate from "./components/CountdownGate";

export default function Home() {
  const [step, setStep] = useState<'landing' | 'question' | 'gift' | 'no'>(
    'landing'
  );
  const [hasAvoidedQuestion, setHasAvoidedQuestion] = useState(false);

  const handleContinue = () => {
    setStep('question');
  };

  const handleYes = () => {
    setStep('gift');
  };

  const handleTryAgain = () => {
    setStep('question');
  };

  const handleNo = () => {
    setHasAvoidedQuestion(true);
    setStep('no');
  };

  return (
    <CountdownGate>
      <AnimatePresence>
        {step === 'landing' && (
          <LandingScreen onContinue={handleContinue} key="landing" />
        )}
        {step === 'question' && (
          <QuestionScreen onYes={handleYes} onNo={handleNo} key="question" />
        )}
        {step === 'gift' && (
          <GiftScreen hasAvoidedQuestion={hasAvoidedQuestion} key="gift" />
        )}
        {step === 'no' && (
          <NoScreen onTryAgain={handleTryAgain} key="no" />
        )}
      </AnimatePresence>
    </CountdownGate>
  );
}
