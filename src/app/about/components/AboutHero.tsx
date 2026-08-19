"use client";

import React from "react";

export const AboutHero: React.FC = () => {
  return (
    <section className="relative min-h-[82vh] sm:min-h-[88vh] py-24 sm:py-32 px-6 md:px-12 flex flex-col items-center justify-center text-center select-none z-10 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 relative z-10">

        {/* H1 Title */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none text-white uppercase font-sans">
          CREATIVE MINDS<br />
          BEHIND THE <span className="text-neonGreen text-glow-green">PIXELS</span>
        </h1>

        {/* Paragraph Description */}
        <p className="text-base sm:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto mt-2 font-mono">
          INTELLEX is a premium creative design and development studio. We don't just build websites; we design interactive digital portals that feel premium, look stunning, and load instantly.
        </p>

      </div>
    </section>
  );
};

export default AboutHero;
