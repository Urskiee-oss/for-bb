"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

function getReleaseTime() {
  return new Date(2026, 6, 22, 0, 0, 0, 0).getTime();
}

function getUnits(remaining: number) {
  const seconds = Math.max(0, Math.floor(remaining / 1000));
  return [
    ["Days", Math.floor(seconds / 86400)],
    ["Hours", Math.floor((seconds % 86400) / 3600)],
    ["Minutes", Math.floor((seconds % 3600) / 60)],
    ["Seconds", seconds % 60],
  ] as const;
}

export default function CountdownGate({ children }: { children: React.ReactNode }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (now === null) {
    return <section className="min-h-screen bg-[#fff8f8]" aria-label="Preparing your surprise" />;
  }

  const remaining = getReleaseTime() - now;

  if (remaining <= 0) return <>{children}</>;

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#fff8f8] px-5 py-10 text-center">
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-red-300/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-red-400/35 blur-3xl" />
      <div className="relative w-full max-w-2xl rounded-[2rem] border border-white/90 bg-white/75 px-6 py-12 shadow-[0_24px_70px_rgba(159,18,57,0.14)] backdrop-blur-md sm:px-12 sm:py-16">
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-red-500 to-red-900 text-white shadow-[0_14px_32px_rgba(185,28,28,0.28)]"><Heart className="h-10 w-10 fill-current" /></motion.div>
        <p className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-red-600"><Sparkles className="h-3.5 w-3.5" /> A surprise is waiting</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-red-950 sm:text-5xl">Not yet, Honn</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600">Come back on July 22 at midnight, I saved something special for you.</p>
        <div className="mt-10 grid grid-cols-4 gap-2 sm:gap-4" aria-label="Time remaining until July 22 at midnight">
          {getUnits(remaining).map(([label, value]) => <div key={label} className="rounded-2xl border border-red-100 bg-red-50/65 px-2 py-4 sm:px-4"><p className="font-serif text-2xl font-semibold tabular-nums text-red-800 sm:text-4xl">{String(value).padStart(2, "0")}</p><p className="mt-1 text-[0.55rem] font-bold uppercase tracking-[0.14em] text-red-600 sm:text-[0.65rem]">{label}</p></div>)}
        </div>
      </div>
    </motion.section>
  );
}
