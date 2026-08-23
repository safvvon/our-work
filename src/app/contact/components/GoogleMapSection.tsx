"use client";

import React from "react";

export const GoogleMapSection: React.FC = () => {
  return (
    <section className="relative py-20 px-6 md:px-12 w-full z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyberMint font-mono">
            HQ LOCATOR
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-space uppercase">
            Our Studio <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberMint to-cyberAccent">Command Center</span>
          </h2>
        </div>

        {/* Map Frame Container */}
        <div className="relative border border-cyberGreen/20 rounded-3xl p-2 bg-[#050505]/40 backdrop-blur-md shadow-[0_0_30px_rgba(57,255,20,0.06)] hover:border-cyberGreen/40 transition-all duration-300 overflow-hidden">
          <div className="w-full h-[400px] rounded-2xl overflow-hidden relative border border-white/[0.04]">
            {/* Google Map Iframe with CSS Dark Mode Filter */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124456.01045!2d74.8!3d12.9141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4c37bf488f%3A0x827bbc7a74fcfe64!2sMangalore%2C+Karnataka!5e0!3m2!1sen!2sin!4v1690000000000"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "grayscale(100%) invert(92%) contrast(83%) brightness(95%)",
              }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Intellex Command Center Location Map"
            />
            {/* Cyber Overlay Overlay Grid */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapSection;
