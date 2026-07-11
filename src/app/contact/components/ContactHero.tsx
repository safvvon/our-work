"use client";

import React from "react";
import { MessageSquare } from "lucide-react";

export const ContactHero: React.FC = () => {
  return (
    <section className="relative py-20 px-6 md:px-12 flex flex-col items-center justify-center text-center select-none z-10 font-sans">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neonGreen/20 bg-neonGreen/5 text-neonGreen text-xs font-semibold tracking-wider font-mono uppercase shadow-[0_0_15px_rgba(92,255,61,0.05)]">
          <MessageSquare className="w-3.5 h-3.5" />
          GET IN TOUCH
        </div>

        {/* H1 Title */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none text-white uppercase font-sans">
          START YOUR <span className="text-neonGreen text-glow-green">UPGRADE</span>
        </h1>

        {/* Paragraph Description */}
        <p className="text-sm sm:text-lg text-white/50 leading-relaxed max-w-2xl mx-auto mt-2 font-mono">
          Have an enterprise consultation need or want a luxury lookbook developed? Send us a message and we'll reply within 24 hours.
        </p>

      </div>
    </section>
  );
};

export default ContactHero;
