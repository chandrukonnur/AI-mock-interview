"use client";

import React from "react";
import { SignIn, SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Navbar from "@/app/_components/Header";  // ← adjust path if needed
import { CheckCircle, ShieldCheck, Sparkles } from "lucide-react";

export default function AuthPage({ type }: { type: "sign-in" | "sign-up" }) {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      <Navbar />
      {/* 🌌 MAIN BACKGROUND (unchanged logic) */}
      <div className="fixed inset-0 -z-30 h-screen w-screen 
      [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />

      <div className="fixed inset-0 -z-20 opacity-25 
      bg-[url('/grid.svg')] bg-[length:45px_45px]" />

      {/* 🌈 PURPLE GLOW BEHIND CARD */}
      <div className="absolute -z-10 w-[550px] h-[550px] bg-purple-600/30 blur-[180px] rounded-full top-40 left-52" />

      {/* ---- AUTH CARD ---- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="
          w-full max-w-6xl 
          px-14 py-14 
          rounded-3xl 
          bg-black/30 
          backdrop-blur-2xl 
          shadow-[0_8px_60px_rgba(0,0,0,0.55)]
          border border-white/15
          flex items-center justify-between
          gap-14
        "
      >

        {/* LEFT SIDE  */}
        <div className="w-[50%]">

          {/* 🔥 Better Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-4xl font-bold text-white mb-6 tracking-tight"
          >
            {type === "sign-in" ? "Welcome Back 👋" : "Create an Account 🚀"}
          </motion.h2>

          {/* 🎯 Improved Clerk Style */}
          <div className="bg-transparent">
            {type === "sign-in" ? (
              <SignIn
  path="/sign-in"
  routing="path"
  signUpUrl="/sign-up"
 appearance={{
  layout: {
    socialButtonsPlacement: "top",
    socialButtonsVariant: "iconButton",
  },
  variables: {
    colorBackground: "transparent",
    colorPrimary: "#A855F7",      // Purple
    colorText: "white",
    colorTextSecondary: "rgba(255,255,255,.7)",
    colorDanger: "#FF6B6B",
  },
  elements: {
    card:
      "bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl backdrop-blur-xl",

    headerTitle: "text-white text-3xl font-bold",
    headerSubtitle: "text-white/80",

    formFieldLabel: "text-white",
    formFieldInput:
      "bg-white/10 border border-white/20 text-white rounded-xl",

    formButtonPrimary:
      "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg hover:opacity-90",

    footer:
      "bg-transparent border-t border-white/10 text-white/70 backdrop-blur-xl rounded-b-2xl",
    footerActionLink: "text-purple-300 hover:text-purple-200",

    socialButtonsIconButton:
      "bg-white/10 border border-white/10 hover:bg-white/20 text-white rounded-xl",

    dividerLine: "bg-white/20",
    dividerText: "text-white/60",
  },
}}
/>

            ) : (
             <SignUp
  path="/sign-up"
  routing="path"
  signInUrl="/sign-in"
  appearance={{
  layout: {
    socialButtonsPlacement: "top",
    socialButtonsVariant: "iconButton",
  },
  variables: {
    colorBackground: "transparent",
    colorPrimary: "#A855F7",      // Purple
    colorText: "white",
    colorTextSecondary: "rgba(255,255,255,.7)",
    colorDanger: "#FF6B6B",
  },
  elements: {
    card:
      "bg-white/10 backdrop-blur-2xlborder border-white/10 shadow-2xl rounded-2xl backdrop-blur-xl",

    headerTitle: "text-white text-3xl font-bold",
    headerSubtitle: "text-white/80",

    formFieldLabel: "text-white",
    formFieldInput:
      "bg-white/10 border border-white/20 text-white rounded-xl",

    formButtonPrimary:
      "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg hover:opacity-90",

    footer:
      "bg-transparent border-t border-white/10 text-white/70 backdrop-blur-xl rounded-b-2xl",
    footerActionLink: "text-purple-300 hover:text-purple-200",

    socialButtonsIconButton:
      "bg-white/10 border border-white/10 hover:bg-white/20 text-white rounded-xl",

    dividerLine: "bg-white/20",
    dividerText: "text-white/60",
  },
}}
/>

            )}
          </div>

          {/* ⭐ TRUST BADGES */}
          <div className="mt-6 flex items-center gap-4 text-sm text-purple-200/90">
            <ShieldCheck size={18} /> 100% Secure Login
            <Sparkles size={18} /> No credit card required
          </div>
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          className="w-[45%] text-white"
        >
          <h1 className="text-6xl font-black leading-tight mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Level Up <br /> Your Career
          </h1>

          <p className="text-lg text-purple-100/90 leading-relaxed">
            Practice real interviews with AI and get instant feedback — all designed
            to help you build confidence and stand out in real job interviews.
          </p>

          {/* 🌟 Feature List */}
          <div className="mt-8 space-y-3 text-purple-100/90">

            <span className="flex items-center gap-3">
              <CheckCircle size={20} className="text-purple-400" />
              Real-time AI feedback
            </span>

            <span className="flex items-center gap-3">
              <CheckCircle size={20} className="text-purple-400" />
              Tailored interview questions
            </span>

            <span className="flex items-center gap-3">
              <CheckCircle size={20} className="text-purple-400" />
              Resume-based question generation
            </span>

            <span className="flex items-center gap-3">
              <CheckCircle size={20} className="text-purple-400" />
              Improve confidence & communication
            </span>

          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
