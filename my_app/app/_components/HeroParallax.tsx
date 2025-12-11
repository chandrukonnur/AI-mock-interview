"use client";

import React, { useRef, useEffect } from "react";

export default function HeroParallax() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let mouseX = 0;
    let mouseY = 0;
    let scrollTilt = 0;
    let floatOffset = 0;

    const update = () => {
      floatOffset += 0.015;

      const floatY = Math.sin(floatOffset) * 8;
      const rx = -(mouseY / 20) + scrollTilt;
      const ry = mouseX / 20;

      card.style.transform = `
        perspective(1400px)
        rotateX(${rx}deg)
        rotateY(${ry}deg)
        translate3d(0px, ${floatY}px, 0px)
      `;

      requestAnimationFrame(update);
    };
    update();

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;
    };

    const onScroll = () => {
      scrollTilt = Math.min(window.scrollY / 210, 1) * 12;
    };

    const reset = () => {
      mouseX = 0;
      mouseY = 0;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mouseleave", reset);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div className="mt-16 flex justify-center">
      <div
        ref={cardRef}
        className="rounded-2xl overflow-hidden shadow-xl"
        style={{
          width: "900px",
          height: "480px",
          backgroundImage: "url('/herosecation.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      ></div>
    </div>
  );
}
