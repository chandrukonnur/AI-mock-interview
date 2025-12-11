"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroParallax from "./HeroParallax";
import TypingText from "./TypingText";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center -mt-16 overflow-hidden">


      {/* GRID OVERLAY */}
      <div
        className="absolute inset-0 -z-10 opacity-10"
        style={{
          backgroundImage: "url('/grid.svg')",
          backgroundSize: "45px 45px",
        }}
      />

      {/* PURPLE GRADIENT */}
      <div className="absolute inset-0 -z-15 bg-gradient-to-b from-purple-600/20 via-black/40 to-black" />

      <div className="relative z-15 max-w-6xl px-6 text-center">

        {/* HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-5xl md:text-7xl font-bold text-white"
        >
          Nervous About Interviews?
          <span className="block bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mt-4">
            Practice With AI — Anytime.
          </span>
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 mx-auto max-w-2xl text-xl text-neutral-300"
        >
          Practice real interview questions with AI, receive instant feedback,
          and build your confidence with professional mock scenarios.
        </motion.p>

        {/* 🔥 FIXED TYPING TEXT (NO MORE GLITCH) */}
      <div className="text-center text-neutral-300 min-h-[32px]">
  <TypingText />
</div>


        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Link href="/dashboard">
            <Button className="px-10 py-4 text-lg rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl">
              Start Practicing
            </Button>
          </Link>

          <Button
            variant="outline"
            className="px-10 py-4 text-lg rounded-full border-white/30 text-white bg-white/10 backdrop-blur-md"
          >
            Contact Support
          </Button>
        </motion.div>

        {/* IMAGE BELOW HERO */}
        <HeroParallax />

      </div>
    </section>
  );
}
