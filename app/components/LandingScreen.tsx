"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { createFloatingDecorations } from "./deterministicDecorations";

interface Props {
  onContinue: () => void;
}

const FLORIDA_TIME_ZONE = "America/New_York";

function getTargetDate() {
  const now = new Date();
  const targetDate = new Date(Date.UTC(now.getFullYear(), 6, 22, 4, 0, 0, 0));

  if (now > targetDate) {
    targetDate.setUTCFullYear(targetDate.getUTCFullYear() + 1);
  }

  return targetDate;
}

function getFloridaTimeLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: FLORIDA_TIME_ZONE,
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

function getBrowserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "unknown";
}

function getTimeRemaining(targetDate: Date) {
  const diff = targetDate.getTime() - Date.now();

  if (diff <= 0) {
    return {
      isUnlocked: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    isUnlocked: false,
    days,
    hours,
    minutes,
    seconds,
  };
}

export default function LandingScreen({ onContinue }: Props) {
  const [petals] = useState(() => createFloatingDecorations(30, 1201));
  const [browserTimeZone] = useState(() => getBrowserTimeZone());
  const [timeRemaining, setTimeRemaining] = useState(() =>
    getTimeRemaining(getTargetDate())
  );

  useEffect(() => {
    const updateTimer = () => {
      setTimeRemaining(getTimeRemaining(getTargetDate()));
    };

    updateTimer();
    const intervalId = window.setInterval(updateTimer, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const timerParts = useMemo(
    () => [
      { label: "Days", value: timeRemaining.days },
      { label: "Hours", value: timeRemaining.hours },
      { label: "Mins", value: timeRemaining.minutes },
      { label: "Secs", value: timeRemaining.seconds },
    ],
    [timeRemaining]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative isolate min-h-screen overflow-hidden px-4 py-10 text-slate-900"
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-violet-300/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-rose-200/30 blur-3xl" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(255,255,255,0.55)_45%,_rgba(255,255,255,0.15)_100%)]"
        />
        <div className="absolute inset-0 pointer-events-none">
          {petals.map((petal) => (
            <motion.span
              key={petal.id}
              className="absolute text-pink-400/50"
              style={{
                left: `${petal.left}%`,
                top: `${petal.top}%`,
                fontSize: `${petal.size}px`,
                opacity: 0,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: petal.offsetY,
                opacity: [0, 0.5, 0],
                transition: {
                  duration: petal.duration,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              🌸
            </motion.span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl items-center justify-center">
        <div className="glass-panel relative w-full rounded-[2rem] px-6 py-12 text-center sm:px-10 sm:py-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-pink-500/80">
            A little surprise
          </p>
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
            Happy Birthday, my love!
          </h1>

          <div className="mt-10 flex items-center justify-center">
            {timeRemaining.isUnlocked ? (
              <motion.button
                whileHover={{ scale: 1.06, rotate: [0, 10, 0, -10, 0] }}
                whileTap={{ scale: 0.96 }}
                onClick={onContinue}
                className="group relative inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-500 shadow-[0_20px_60px_rgba(236,72,153,0.35)] ring-8 ring-white/60 transition-shadow duration-300 hover:shadow-[0_26px_70px_rgba(236,72,153,0.42)]"
              >
                <Heart className="relative z-10 h-10 w-10 text-white transition-transform duration-300 group-hover:scale-110" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/25"
                  style={{ animation: "pulse 2.2s infinite" }}
                />
              </motion.button>
            ) : (
              <div className="w-full max-w-2xl rounded-[1.75rem] border border-white/60 bg-white/60 px-5 py-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-500/80">
                  Opens {getFloridaTimeLabel(getTargetDate())}
                </p>
                <div className="mt-5 grid grid-cols-4 gap-3 sm:gap-4">
                  {timerParts.map((part) => (
                    <div
                      key={part.label}
                      className="rounded-2xl bg-slate-950/5 px-3 py-4 text-center"
                    >
                      <div className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                        {String(part.value).padStart(2, "0")}
                      </div>
                      <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500 sm:text-xs">
                        {part.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <p className="mt-8 text-sm text-slate-500">
            Make sure your sound is on for a small surprise.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
