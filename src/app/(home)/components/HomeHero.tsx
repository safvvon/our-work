"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Activity } from "lucide-react";

export const HomeHero: React.FC = () => {
  const words = ["CONVERT", "INSPIRE", "PERFORM", "SCALE"];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentWordIdx((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 md:px-12 py-20 overflow-hidden select-none font-sans z-10">
      
      {/* Decorative floating orbit grid */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/[0.02] rounded-full pointer-events-none z-0 flex items-center justify-center animate-[spin_60s_linear_infinite]">
        <div className="w-[500px] h-[500px] border border-dashed border-white/[0.02] rounded-full flex items-center justify-center">
          <div className="w-[300px] h-[300px] border border-white/[0.015] rounded-full flex items-center justify-center">
            {/* Small glowing orbit node */}
            <div className="w-2 h-2 bg-neonGreen rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_15px_#5CFF3D]" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neonGreen/20 bg-neonGreen/5 text-neonGreen text-xs font-semibold tracking-wider font-mono uppercase shadow-[0_0_15px_rgba(92,255,61,0.05)]">
          <Sparkles className="w-3.5 h-3.5" />
          Modern Web Design & Dev Agency
        </div>

        {/* H1 Title */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none text-white uppercase font-sans">
          WE BUILD WEBSITES<br />
          THAT{" "}
          <span className="relative inline-block min-w-[200px] sm:min-w-[400px]">
            <span className={`text-neonGreen text-glow-green transition-all duration-300 inline-block ${fade ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}>
              {words[currentWordIdx]}
            </span>
          </span>
        </h1>

        {/* Paragraph Description */}
        <p className="text-sm sm:text-lg text-white/50 leading-relaxed max-w-xl mx-auto mt-2 font-mono">
          We combine cutting-edge technology, premium aesthetic designs, and lightning-fast optimization to build digital experiences that drive massive business growth.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link
            href="/works"
            className="flex items-center justify-center gap-3 bg-neonGreen text-black font-bold uppercase tracking-wider text-xs py-4 px-8 rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 group"
          >
            Explore Our Works
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/team"
            className="flex items-center justify-center gap-3 border border-white/20 hover:border-neonGreen hover:text-neonGreen px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-all duration-300"
          >
            Meet Team Intellex
          </Link>
        </div>

      </div>

      {/* Side stats preview ribbon */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[10px] text-white/30 uppercase tracking-widest font-mono select-none pointer-events-none">
        <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-neonGreen animate-pulse" /> 100% Custom Layouts</span>
        <span>•</span>
        <span>SEO Core Built</span>
        <span>•</span>
        <span>React 19 Native</span>
      </div>

    </section>
  );
};

export default HomeHero;
