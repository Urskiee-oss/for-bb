"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Lock, Mail } from "lucide-react";
import GiftNote from "./GiftNote";
import GiftLetter from "./GiftLetter";
import GiftGallery from "./GiftGallery";
import GiftThings from "./GiftThings";
import GiftHeart from "./GiftHeart";

interface Props {
  allGifts?: boolean;
  hasAvoidedQuestion?: boolean;
}

export default function GiftScreen({ allGifts = false }: Props) {
  const [activeGiftId, setActiveGiftId] = useState<number | null>(null);
  const [answeredGiftIds, setAnsweredGiftIds] = useState<number[]>([]);
  const [currentGiftIndex, setCurrentGiftIndex] = useState(0);

  const noteGift = { title: "Little Note For You", description: "A cute sticky note with a sweet message", content: "You make my heart smile every day." };
  const letterGift = { title: "Letter For You", description: "A romantic love letter with typewriter animation", content: "Hi Honn, Babyy, Labblabb, Sophh, My Lovee. I just want to say first of all I'm sorry sa tanan away nato and I know akoy hinungdan permi nganu mag sige tag away, I'm sorryy that I haven't changed, I'm sorry that I still chat other girls sauna, I'm sorry sige pakog threat na I would kms or sh, I'm sorry sige kog pangaway, I'm sorry saimo nakita sa ako account, I'm sorry nga sa ako mga nabuhat, I'm sorry sige kog duda, I'm sorry sige kog overthink, I'm sorry nga wakoy salig nimo and I'm really sorry for everything that I haven't mentioned and I have done nga nalain ka, I'm really glad that you came into my life, from the day that you've added me I wa really happy because on the orientation I was really eyeing you because you are beautiful and glowing, and then thats where it all started from the notes and pabati2 hangtud mi chat ko nimo which nauwaw gyud ko ato may gwapa kayka and bati rakaykog nawng but still mi chat ko ato nimo cause I don't want to lose the chance, I'm really thankful na you we're friendly and open to me on how you've like me and I really appreciate that because I really like you and look at us now we're together na, we've built something that couldn't be broken anymore, from those sweet moments to the away every night and everyday but still I came running back to you because you are so hard to unlove and I want to treat you better, I really love you and I really want to marry you and sit by yourside forever honn and I hope nothing will change and I know sige tag on and off sa ato rs but still I can't leave you because I really love you to the point that I love you more than anything and more than myself, I really appreciate you being patient with me, loving me through ups and downs, comforting me through the times na dina nako makaya, staying by my side sag mag duda nako permi, sag sige nakog overthink and question my worth, I really love everything about you and I hope nothing will change about that. I know this isn't much ra, this isn't the hand written letters that you've wanted but this is all that I could give for now honn, I promise mobawi ko sa tanan soon and I'll spoil you as much as you want just please don't leave me. Honn just please tell me if you're uncomfortable with something or someone, tell me if naglagot ka nako, tell me if nalain ka nako, that's all that I really want ragyud to be open with me I cant spot something na you're lying and I'm still unsure about everything you'll say about na, okay baka or somethings bothering you but dika mo ingon cause dika ganahn ug away, I promise you I'll explain everything ragyud bb and reassure you, I know we nagaway ta bagohay lang and I'm really sorry about the things that I've done I promise I'll change na so please change with me babyy. And lastly honn, I'm proud of everything that you do small or big achievements mn, I'll be here rooting for you, I'll be here for you through ups and downs, I'll be here loving you everyday, I'll be here if you need someone to talk to, I'll be here if you need me alwayss and nothings gonna change about that, I lovee youu soo muchhh myy lovee, honnn, babyyy, labbblabbb." };
  const galleryGift = { title: "Our Memories", description: "A collection of our favorite memories together", content: "A scrapbook of us" };
  const thingsGift = {
    title: "Things I Love About You",
    description: "100 little reasons you mean everything to me.",
    content: [
      "Your eyes", "Your smile", "Your hair", "Your laugh", "Your beauty", "Your lips", "Your skin", "Your style", "Your humor", "Your voice",
      "Your body", "Your smell", "Your face", "Your goofy side", "Your personality", "You are gentle", "You are trustworthy", "You are understanding", "You are caring", "You are amazing",
      "Your promises", "Your cuddles", "Your perfect teeth", "Our jokes", "The way you carry yourself", "Your confidence", "Gorgeous", "Smart", "Our talks", "Your honesty",
      "Your loyalty", "Your ability to cheer me up", "Your love for me", "You are loving", "Your love for family", "You make me a better girl", "How you remember the little things", "How we communicate so well", "You try new things for me", "Your aura",
      "Your essence", "The way you talk to me", "My family loves you", "My mom loves you", "My dad loves you", "Your family loves me", "You give me confidence", "You bring out the best in me", "You respect me", "You respect others",
      "You celebrate my victories", "You make me feel wanted", "You make time for me", "You give me attention", "The way you hold my hand", "You make me happy", "Your hugs", "Your kisses", "Your touch is comforting", "Our eye contact",
      "We have meaningful talks", "We create memories together", "You support my dreams", "You stand by me", "You make me better", "I see you with no imperfections", "You’re one of a kind", "You are my favorite person", "You are my greatest blessing", "I can laugh all day with you",
      "I can see a future with you", "I can be myself around you", "You make me laugh", "You’re kind", "You’re always there for me", "You make me feel safe", "You make me feel important", "You never judged me", "You let me cry in your arms", "The way you look at me",
      "How hard you try", "You always have my back", "You show that you love me", "You know when something is wrong", "You help me", "You make my life brighter", "You don’t use me", "Your jealous side", "You are a good influence", "The way you don’t want to hurt my feelings",
      "Your nicknames for me", "You are always comforting to be around", "You are special", "You are the reason why I want to wake up every morning", "I love our calls", "When you say you want a future with me", "You believe in me", "You always listen to me", "You are yourself with me", "YOU ❤️",
    ],
  };
  const heartGift = { title: "A Every bits of Love", description: "Every I love you keeps coming back to you.", content: "An endless loop of loving you" };
  const gifts = [
    { id: 1, question: "What is one little thing that always makes you smile?", choices: ["Sweet messages", "Silly moments", "Time together"], ...noteGift },
    { id: 2, question: "What is a memory of us that you love thinking about?", choices: ["Our first date", "Late-night talks", "An adventure together"], ...letterGift },
    { id: 3, question: "What is one moment you would want us to relive together?", choices: ["A cozy evening", "A special trip", "A perfect date"], ...galleryGift },
    { id: 4, question: "What is one thing you appreciate most about our relationship?", choices: ["Our support", "Our laughter", "Our connection"], ...thingsGift },
    { id: 5, question: "In one word, how would you describe us?", choices: ["Home", "Magic", "Forever"], ...heartGift },
  ];
  const currentGift = gifts[currentGiftIndex];
  const currentGiftIsUnlocked = answeredGiftIds.includes(currentGift.id);
  const unlockGift = (giftId: number) => setAnsweredGiftIds((current) => current.includes(giftId) ? current : [...current, giftId]);

  const activeGift = activeGiftId ? gifts.find((gift) => gift.id === activeGiftId) : null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="relative isolate min-h-screen overflow-hidden px-4 py-10 text-slate-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-red-300/18 blur-3xl" /><div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-red-500/18 blur-3xl" /><div className="absolute bottom-0 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-red-200/20 blur-3xl" /></div>
      {activeGift ? (
        <main className="relative mx-auto w-full max-w-6xl">
          <motion.button type="button" onClick={() => setActiveGiftId(null)} whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-white"><ArrowLeft className="h-4 w-4" /> Back to gifts</motion.button>
          <motion.div key={activeGift.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[2rem] p-4 sm:p-7">
            {activeGift.id === 1 && <GiftNote gift={noteGift} />}
            {activeGift.id === 2 && <GiftLetter gift={letterGift} />}
            {activeGift.id === 3 && <GiftGallery gift={galleryGift} />}
            {activeGift.id === 4 && <GiftThings gift={thingsGift} />}
            {activeGift.id === 5 && <GiftHeart gift={heartGift} />}
          </motion.div>
          <p className="mt-8 text-center font-medium text-red-600">Thank you for accepting my gifts. I love you more than words can say.</p>
        </main>
      ) : allGifts ? (
        <main className="relative mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-6xl items-center justify-center">
          <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_18px_55px_rgba(127,29,29,0.14)] sm:p-10">
            <div className="mx-auto max-w-2xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-600">Always yours</p><h1 className="mt-3 font-serif text-4xl font-semibold text-red-950 sm:text-5xl">All my gifts for you</h1><p className="mt-4 text-slate-600">Every little reminder of how much you are loved.</p></div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{gifts.map((gift) => <motion.button key={gift.id} type="button" onClick={() => setActiveGiftId(gift.id)} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} className="group rounded-2xl border border-red-100 bg-gradient-to-br from-white to-red-50 p-6 text-left shadow-sm transition hover:border-red-300 hover:shadow-md"><p className="text-xs font-bold uppercase tracking-[0.24em] text-red-600">Gift {gift.id}</p><h2 className="mt-3 text-2xl font-semibold text-red-950">{gift.title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{gift.description}</p><span className="mt-5 inline-block text-sm font-semibold text-red-700 group-hover:text-red-900">Open gift →</span></motion.button>)}</div>
          </motion.section>
        </main>
      ) : (
        <main className="relative flex min-h-[calc(100vh-12rem)] w-full items-center justify-center">
          <motion.section key={currentGift.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative flex min-h-[calc(100vh-12rem)] w-full max-w-5xl flex-col justify-center overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_18px_55px_rgba(76,29,149,0.12)] sm:p-10">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-800" /><div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-200/40 blur-3xl" />
            <div className="relative mx-auto w-full max-w-xl text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-100 to-white shadow-inner">{!currentGiftIsUnlocked && <Lock className="h-6 w-6 text-red-500" />}{currentGiftIsUnlocked && currentGift.title === "Note" && <Mail className="h-6 w-6 text-red-500" />}{currentGiftIsUnlocked && currentGift.title !== "Note" && <Heart className="h-6 w-6 text-red-500" />}</div>
              {!currentGiftIsUnlocked ? <div className="space-y-5"><p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-600">Gift {currentGift.id} of {gifts.length}</p><h2 className="text-2xl font-semibold leading-9 text-slate-900 sm:text-3xl">{currentGift.question}</h2><div className="grid gap-3 pt-2">{currentGift.choices.map((choice) => <motion.button key={choice} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => unlockGift(currentGift.id)} className="w-full rounded-2xl border border-red-200 bg-white/85 px-5 py-4 text-base font-semibold text-slate-800 shadow-sm transition-colors hover:border-red-400 hover:bg-red-50">{choice}</motion.button>)}</div></div> : <div className="space-y-5"><p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-600">Gift {currentGift.id} unlocked</p><h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{currentGift.title}</h2><p className="text-base leading-8 text-slate-600">{currentGift.description}</p><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setActiveGiftId(currentGift.id)} className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-red-800 px-5 py-4 text-base font-semibold text-white shadow-[0_14px_40px_rgba(220,38,38,0.25)]">Open Gift</motion.button>{currentGiftIndex < gifts.length - 1 && <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setCurrentGiftIndex((index) => index + 1)} className="w-full rounded-2xl border border-red-200 bg-white/85 px-5 py-4 text-base font-semibold text-red-700">Next gift</motion.button>}</div>}
            </div>
          </motion.section>
        </main>
      )}
    </motion.div>
  );
}
