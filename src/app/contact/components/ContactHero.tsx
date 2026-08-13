"use client";

import React from "react";
import { PhoneCall, FileText } from "lucide-react";

interface ContactHeroProps {
  onScrollToForm: () => void;
}

export const ContactHero: React.FC<ContactHeroProps> = ({ onScrollToForm }) => {
  return (
    <section className="relative pt-24 pb-16 px-6 md:px-12 flex flex-col items-center justify-center text-center select-none overflow-hidden z-10 font-space">
      
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">

        {/* H1 Title */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-none text-white uppercase font-space">
          Let <span className="text-neonGreen">Young</span> Do!
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
