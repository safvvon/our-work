"use client";

import React from "react";
import { Sparkles, PhoneCall, FileText } from "lucide-react";

interface ContactHeroProps {
  onScrollToForm: () => void;
}

export const ContactHero: React.FC<ContactHeroProps> = ({ onScrollToForm }) => {
  return (
    <section className="relative pt-24 pb-16 px-6 md:px-12 flex flex-col items-center justify-center text-center select-none overflow-hidden z-10 font-space">
      
      {/* Plasma Light Ring Glow Behind Heading */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[150px] sm:h-[220px] bg-gradient-to-r from-cyberGreen/20 via-cyberMint/30 to-cyberAccent/20 rounded-full blur-[80px] pointer-events-none animate-[pulse_4s_ease-in-out_infinite] z-0" />
      
      {/* Flowing plasma aura */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] border border-cyberGreen/20 rounded-full blur-[60px] pointer-events-none z-0 animate-[ping_8s_linear_infinite]" />

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
        
        {/* Cyber Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyberGreen/20 bg-cyberGreen/5 text-cyberGreen text-xs font-semibold tracking-widest font-mono uppercase shadow-[0_0_15px_rgba(57,255,20,0.1)]">
          <Sparkles className="w-4 h-4 animate-spin-slow text-cyberGreen" />
          Neural Link Activated
        </div>

        {/* H1 Title */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-none text-white uppercase font-space filter drop-shadow-[0_0_15px_rgba(57,255,20,0.4)]">
          Let&apos;s Create Something<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberGreen via-cyberMint to-cyberAccent font-black">
            Incredible
          </span>
        </h1>

        {/* Paragraph Description */}
        <p className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mt-2 font-sans font-medium">
          We build premium websites, web applications, eCommerce platforms, branding, and digital experiences that grow your business.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mt-8 w-full sm:w-auto">
          <button
            onClick={onScrollToForm}
            className="flex items-center justify-center gap-3 bg-cyberGreen text-black font-bold uppercase tracking-wider text-xs py-4 px-8 rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_35px_rgba(57,255,20,0.6)] transition-all duration-300 group shadow-[0_0_20px_rgba(57,255,20,0.2)] transform hover:-translate-y-0.5"
          >
            <FileText className="w-4 h-4" />
            Get Free Quote
          </button>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-cyberMint hover:text-cyberMint px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 group shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,255,153,0.15)]"
          >
            <PhoneCall className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
            Schedule a Call
          </a>
        </div>

      </div>
    </section>
  );
};

export default ContactHero;
