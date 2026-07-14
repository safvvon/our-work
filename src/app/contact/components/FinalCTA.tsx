"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

interface FinalCTAProps {
  onScrollToForm: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onScrollToForm }) => {
  return (
    <section className="relative py-24 px-6 md:px-12 w-full overflow-hidden border-t border-white/[0.03] bg-gradient-to-b from-transparent to-cyberGreen/[0.02]">
      {/* Background neon elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[150px] bg-cyberGreen/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 relative z-10">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-space uppercase tracking-tight leading-tight filter drop-shadow-[0_0_15px_rgba(57,255,20,0.2)]">
          Ready to Build Your<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberGreen to-cyberMint font-black">
            Dream Website?
          </span>
        </h2>
        
        <p className="text-sm sm:text-base text-white/50 max-w-lg leading-relaxed font-sans">
          Connect with our design engineers now to discuss your system integrations, performance layouts, and cinematic user interfaces.
        </p>

        <button
          onClick={onScrollToForm}
          className="mt-6 flex items-center justify-center gap-3 bg-cyberGreen text-black font-bold uppercase tracking-wider text-xs py-4.5 px-10 rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_35px_rgba(57,255,20,0.6)] transition-all duration-300 group shadow-[0_0_20px_rgba(57,255,20,0.15)]"
        >
          Contact Our Team
          <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
