"use client";

import React from "react";
import { PhoneCall } from "lucide-react";

interface ContactHeroProps {
  onScrollToForm?: () => void;
}

export const ContactHero: React.FC<ContactHeroProps> = ({ onScrollToForm }) => {
  return (
    <section className="relative w-full flex-1 py-4 sm:py-8 px-6 md:px-12 flex flex-col items-center justify-center text-center select-none overflow-hidden z-10 font-space">
      
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 sm:gap-6 relative z-10">

        {/* H1 Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none text-white uppercase font-space">
          Let <span className="text-neonGreen">Young</span> Do!
        </h1>

        {/* Paragraph Description */}
        <p className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mt-1 font-sans font-medium">
          We build premium websites, web applications, eCommerce platforms, branding, and digital experiences that grow your business.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mt-4 sm:mt-6 w-full sm:w-auto">
          <a
            href="tel:+918590074043"
            className="flex items-center justify-center gap-3 bg-cyberGreen text-black font-bold uppercase tracking-wider text-sm py-4 px-8 rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_35px_rgba(57,255,20,0.6)] transition-all duration-300 group shadow-[0_0_20px_rgba(57,255,20,0.2)] transform hover:-translate-y-0.5"
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
