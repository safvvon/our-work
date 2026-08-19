"use client";

import React from "react";
import { SmokeBackground } from "./SmokeBackground";
import { TextPressure } from "../../../components/TextPressure";

export const HomeHero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 pt-28 sm:pt-36 pb-16 overflow-hidden select-none font-sans z-10">
      
      {/* Interactive Fluid Dynamics Background */}
      <SmokeBackground />

      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center relative z-10 w-full">
        {/* H1 Title with Dynamic Text Pressure */}
        <div className="relative w-full h-[80px] sm:h-[130px] md:h-[200px] flex items-center justify-center py-4 overflow-visible">
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
            textColor="#ffffff"
            minFontSize={48}
            className="filter drop-shadow-[0_0_20px_rgba(255,255,255,0.55)] font-bold tracking-widest"
          />
        </div>
        

      </div>

    </section>
  );
};

export default HomeHero;
