"use client";

import React, { useRef, useEffect } from "react";

export default function HeroTilt() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = imgRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const midX = rect.width / 2;
      const midY = rect.height / 2;

      const rotateX = -(y - midY) / 20; // tilt up/down
      const rotateY = (x - midX) / 20;  // tilt left/right

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const resetTilt = () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 80) resetTilt();
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", resetTilt);
    window.addEventListener("scroll", handleScroll);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", resetTilt);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full flex justify-center mt-12">
      <div
        ref={imgRef}
        className="hero-tilt rounded-2xl shadow-xl transition-transform duration-150"
        style={{
          width: "100px",
          height: "100px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transformStyle: "preserve-3d",
        }}
      />
    </div>
  );
}
