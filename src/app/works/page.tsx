"use client";

import React, { useState, useCallback } from "react";
import { Header } from "../../layouts/Header";
import { Footer } from "../../layouts/Footer";
import { FilmRoll } from "./components/FilmRoll";
import { LaptopMockup } from "./components/LaptopMockup";
import { ProjectDetails } from "./components/ProjectDetails";
import { PORTFOLIO_PROJECTS } from "../../constants/portfolioData";
import { MousePointerClick } from "lucide-react";

export default function WorksPage() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleActiveIndexChange = useCallback((idx: number) => {
    setActiveIdx(idx);
  }, []);

  const activeProject = PORTFOLIO_PROJECTS[activeIdx];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-x-hidden selection:bg-neonGreen selection:text-black">
      
      {/* Background Ambience and Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Ambient Neon Green Radial Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-neonGreen/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-neonGreen/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[20%] w-[500px] h-[500px] bg-neonGreen/4 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Layout */}
      <Header />

      {/* Viewport Fixed Film Roll Column on Desktop (Attaches to absolute left edge of screen) */}
      <div className="hidden lg:flex fixed left-0 top-0 w-[40vw] h-screen z-20 items-center justify-center pointer-events-none">
        <div className="w-full relative pointer-events-auto">
          <FilmRoll
            projects={PORTFOLIO_PROJECTS}
            activeIdx={activeIdx}
            onActiveIndexChange={handleActiveIndexChange}
          />
          {/* Scroll Indicator Prompt */}
          <div className="absolute bottom-[35px] left-[15%] flex items-center gap-2 text-white/30 text-[10px] tracking-widest font-mono uppercase select-none pointer-events-none">
            <MousePointerClick className="w-3.5 h-3.5 text-neonGreen animate-bounce" />
            <span>Scroll to Rotate Reel</span>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <main className="flex-1 w-full max-w-[92rem] mx-auto pt-28 md:pt-36 px-6 md:px-12 flex flex-col lg:flex-row relative z-10">
        
        {/* Left Section (Visible on Mobile/Tablet only, hidden on Desktop to let fixed panel show) */}
        <section className="w-full lg:hidden h-[50vh] flex items-center justify-center border-b border-white/[0.03] pb-10">
          <div className="w-full relative">
            <FilmRoll
              projects={PORTFOLIO_PROJECTS}
              activeIdx={activeIdx}
              onActiveIndexChange={handleActiveIndexChange}
            />
          </div>
        </section>

        {/* Right Section (60%) - Shifts on desktop to accommodate the viewport-fixed left panel */}
        <section className="w-full lg:w-[60%] lg:ml-[40%] flex flex-col lg:flex-row lg:items-center justify-between py-10 lg:py-4 gap-8 lg:gap-12">
          
          {/* Center inside viewport: 3D Laptop Preview */}
          <div className="w-full lg:w-[54%] flex items-center justify-center">
            <div className="w-full">
              <LaptopMockup activeProject={activeProject} />
            </div>
          </div>

          {/* Right inside viewport: Website Details */}
          <div className="w-full lg:w-[46%] flex items-center justify-center lg:justify-start">
            <div className="w-full">
              <ProjectDetails activeProject={activeProject} />
            </div>
          </div>

        </section>

      </main>

      {/* Trust Badges / Stats Strip */}
      <section className="w-full max-w-[92rem] mx-auto px-6 md:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-white/[0.03] bg-white/[0.005] backdrop-blur-sm z-10 relative">
        {[
          { label: "Websites Completed", val: "120+" },
          { label: "Happy Clients", val: "100+" },
          { label: "Years of Experience", val: "5+" },
          { label: "Client Satisfaction", val: "99%" }
        ].map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
            <span className="text-2xl md:text-3xl font-black font-sans text-neonGreen text-glow-green">
              {stat.val}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
              {stat.label}
            </span>
          </div>
        ))}
      </section>

      {/* Footer Layout */}
      <Footer />
    </div>
  );
}
