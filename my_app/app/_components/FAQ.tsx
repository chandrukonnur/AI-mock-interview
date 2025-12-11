"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does the AI mock interview work?",
    a: "Our AI analyzes your resume and job description to generate tailored questions and provide real-time feedback.",
  },
  {
    q: "Is the interview experience recorded?",
    a: "Yes, the system records audio responses and evaluates clarity, confidence, and content quality.",
  },
  {
    q: "Can I download my interview results?",
    a: "Absolutely. You can export feedback, transcripts, and improvement suggestions.",
  },
  {
    q: "Is this suitable for beginner candidates?",
    a: "Yes! The AI adjusts difficulty based on your level and career goals.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-4xl mx-auto py-24 px-6">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-white">
        Frequently Asked Questions
      </h2>

      <div className="mt-12 space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="border border-white/20 rounded-2xl p-4 bg-white/5 backdrop-blur-md"
          >
            {/* Header */}
            <button
              className="w-full flex items-center justify-between"
              onClick={() => setOpen(open === index ? null : index)}
            >
              <span className="text-lg font-medium text-white">
                {item.q}
              </span>

              <motion.span
                animate={{ rotate: open === index ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown className="w-6 h-6 text-white/70" />
              </motion.span>
            </button>

            {/* Answer */}
            <motion.div
              initial={false}
              animate={{
                height: open === index ? "auto" : 0,
                opacity: open === index ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="mt-3 text-white/80 leading-relaxed">
                {item.a}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
