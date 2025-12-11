"use client";
import { useEffect, useState } from "react";

export default function TypingText() {
  const phrases = [
    "AI powered mock interviews.",
    "Instant feedback and analytics.",
    "Boost your confidence before the real one!",
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0); // Which phrase
  const [subIndex, setSubIndex] = useState(0); // Which letter
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[index];

    // 📝 SPEED CONTROLS
    const speed = deleting ? 40 : 80;

    const handler = setTimeout(() => {
      if (!deleting) {
        // ⏩ TYPING FORWARD
        setText(currentPhrase.substring(0, subIndex + 1));
        setSubIndex(prev => prev + 1);

        // 🛑 Sentence fully typed? Wait then delete
        if (subIndex === currentPhrase.length) {
          setTimeout(() => setDeleting(true), 1000);
        }
      } else {
        // ⏪ DELETING
        setText(currentPhrase.substring(0, subIndex - 1));
        setSubIndex(prev => prev - 1);

        // When sentence fully deleted → next one
        if (subIndex === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(handler);
  }, [subIndex, deleting, index]);

  return (
    <span className="text-xl text-purple-300 font-medium">
      {text}
      <span className="border-r-2 border-purple-300 animate-pulse ml-1" />
    </span>
  );
}
