"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    step: "1",
    title: "Upload Resume",
    desc: "AI extracts key skills, experience, and role alignment.",
  },
  {
    step: "2",
    title: "Run Mock Interview",
    desc: "Practice with AI and get instant structured feedback.",
  },
  {
    step: "3",
    title: "Improve",
    desc: "Track improvement and follow personalized guidance.",
  },
];

export default function HowItWorks() {
  return (
    <section id="howitworks" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        How It Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STEPS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 rounded-2xl text-center text-white"
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold">
              {s.step}
            </div>
            <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-gray-300">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
