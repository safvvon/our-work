"use client";

import React from "react";
import { SmokeBackground } from "./SmokeBackground";
import Link from "next/link";
import { ArrowRight, Sparkles, Layers } from "lucide-react";
import { TextPressure } from "../../../components/TextPressure";

interface HomeHeroProps {
  onOpenServices?: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onOpenServices }) => {
  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 md:px-8 py-4 overflow-hidden select-none font-sans z-10">
      
      {/* Glowing Ambient Green Aura */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-neonGreen/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Interactive Fluid/Smoke Background */}
      <SmokeBackground />

      {/* Decorative floating orbit grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[700px] h-[600px] sm:h-[700px] border border-white/[0.02] rounded-full pointer-events-none z-0 flex items-center justify-center animate-[spin_60s_linear_infinite]">
        <div className="w-[420px] sm:w-[500px] h-[420px] sm:h-[500px] border border-dashed border-white/[0.02] rounded-full flex items-center justify-center">
          <div className="w-[260px] sm:w-[300px] h-[260px] sm:h-[300px] border border-white/[0.015] rounded-full flex items-center justify-center">
            {/* Small glowing orbit node */}
            <div className="w-2 h-2 bg-neonGreen rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_15px_#5CFF3D]" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 sm:gap-6 relative z-10 w-full">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neonGreen/20 bg-neonGreen/5 text-neonGreen text-[11px] sm:text-xs font-semibold tracking-wider font-mono uppercase shadow-[0_0_15px_rgba(92,255,61,0.05)]">
          <Sparkles className="w-3.5 h-3.5" />
          Modern Web Design & Dev Agency
        </div>

        {/* H1 Title with Dynamic Text Pressure */}
        <div className="relative w-full h-[70px] sm:h-[110px] md:h-[150px] flex items-center justify-center py-2 overflow-visible">
          <TextPressure
            text="INTELLEX"
            fontFamily="Roboto Flex"
            fontUrl="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#5CFF3D"
            minFontSize={42}
            className="filter drop-shadow-[0_0_20px_rgba(92,255,61,0.55)] font-bold tracking-widest"
          />
        </div>

        {/* Paragraph Description */}
        <p className="text-xs sm:text-base text-white/50 leading-relaxed max-w-xl mx-auto font-mono">
          We combine cutting-edge technology, premium aesthetic designs, and lightning-fast optimization to build digital experiences that drive massive business growth.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-3">
          <Link
            href="/works"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-neonGreen text-black font-bold uppercase tracking-wider text-xs py-3.5 px-7 rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 group"
          >
            Explore Our Works
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          
          {onOpenServices && (
            <button
              onClick={onOpenServices}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 border border-neonGreen/40 bg-neonGreen/10 hover:bg-neonGreen/20 text-neonGreen px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300"
            >
              <Layers className="w-4 h-4" />
              Our Services
            </button>
          )}

          <Link
            href="/team"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 border border-white/20 hover:border-white text-white/80 hover:text-white px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300"
          >
            Meet Team
          </Link>
        </div>

      </div>

    </section>
  );
};

export default HomeHero;
