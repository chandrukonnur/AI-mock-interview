"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Shekhar konnur",
    role: "Software Engineer",
    text: "The AI mock interviews helped me eliminate nervousness. I landed my dream job!",
    image: "/user1.jpg",
  },
  {
    name: "Rashid",
    role: "Data Analyst",
    text: "Recruiters finally started responding! Amazing resume analyzer!",
    image: "/user2.jpg",
  },
  {
    name: "Ahmed Kazia",
    role: "Marketing Manager",
    text: "The feedback after each interview is insanely helpful. Improved so quickly!",
    image: "/user3.jpg",
  },
  {
    name: "Vishesh Kumar",
    role: "DevOps Engineer",
    text: "Best interview simulator. Feels like a real panel!",
    image: "/user4.jpg",
  },
];

export default function TestimonialsMarquee() {
  return (
    <section className="py-28 relative">
      <h2 className="text-center font-bold text-4xl mb-16">
        Loved by Job Seekers Worldwide
      </h2>

      {/* ⭐ FIXED WRAPPER */}
      <div className="overflow-hidden max-w-[1400px] mx-auto px-10">

        <motion.div
          className="flex gap-8"
          animate={{ x: ["10%", "-50%"] }} // ⬅️ Only half, not full left
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
        >
          {[...testimonials, ...testimonials].map((item, i) => (
            <div
              key={i}
              className="w-[380px] shrink-0 p-6 rounded-2xl border border-white/10 
              bg-white/5 backdrop-blur-xl shadow-xl"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={item.image}
                  width={48}
                  height={48}
                  className="rounded-full"
                  alt={item.name}
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-white/60 text-sm">{item.role}</p>
                </div>
              </div>

              <p className="text-[17px] leading-snug opacity-90">
                “{item.text}”
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
