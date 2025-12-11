"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "95%", label: "Users Improved Interview Scores" },
  { value: "12k+", label: "Mock Interviews Completed" },
  { value: "4.9/5", label: "User Satisfaction Rating" },
];

export default function Stats() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-10">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <h3 className="text-5xl font-extrabold">{stat.value}</h3>
            <p className="mt-2 text-gray-300">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
