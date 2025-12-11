"use client";

import { motion } from "framer-motion";

const FEATURE_LIST = [
  {
    title: "AI Mock Interviews",
    desc: "Real interview simulations with real-time scoring.",
    icon: "🎤",
  },
  {
    title: "Resume Analyzer",
    desc: "ATS optimization and instant skill-gap detection.",
    icon: "📄",
  },
  {
    title: "Job Match Insights",
    desc: "Understand how well your resume matches each role.",
    icon: "⚡",
  },
];

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 ">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        Powerful Tools To Boost Your Career
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURE_LIST.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="glass-card p-8 rounded-2xl text-white"
          >
            <div className="text-4xl">{f.icon}</div>
            <h3 className="mt-4 text-2xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-gray-300">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
