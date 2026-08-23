"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Header } from "../../layouts/Header";
import { FilmRoll } from "./components/FilmRoll";
import { LaptopMockup } from "./components/LaptopMockup";
import { ProjectDetails } from "./components/ProjectDetails";
import { PORTFOLIO_PROJECTS } from "../../constants/portfolioData";
import { MousePointerClick, ArrowRight, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function WorksPage() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleActiveIndexChange = useCallback((idx: number) => {
    setActiveIdx(idx);
  }, []);

  const activeProject = PORTFOLIO_PROJECTS[activeIdx];

  // Scroll accumulators for global page mouse wheel control
  const scrollAccumulator = useRef(0);
  const scrollResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Touch drag tracking for mobile
  const touchStartY = useRef(0);
  const touchActive = useRef(false);

  // Global mouse wheel event listener: Rotates reel without scrolling the page
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      e.preventDefault();

      scrollAccumulator.current += e.deltaY;

      if (scrollResetTimer.current) clearTimeout(scrollResetTimer.current);
      scrollResetTimer.current = setTimeout(() => {
        scrollAccumulator.current = 0;
      }, 400);

      const threshold = 90;
      if (scrollAccumulator.current > threshold) {
        setActiveIdx((prev) => (prev < PORTFOLIO_PROJECTS.length - 1 ? prev + 1 : prev));
        scrollAccumulator.current = 0;
      } else if (scrollAccumulator.current < -threshold) {
        setActiveIdx((prev) => (prev > 0 ? prev - 1 : prev));
        scrollAccumulator.current = 0;
      }
    };

    window.addEventListener("wheel", handleGlobalWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleGlobalWheel);
      if (scrollResetTimer.current) clearTimeout(scrollResetTimer.current);
    };
  }, []);

  // Keyboard navigation listener (Up / Down / Left / Right Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIdx((prev) => (prev < PORTFOLIO_PROJECTS.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIdx((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Mobile Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchActive.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchActive.current) return;
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchY;
    const swipeThreshold = 45;

    if (deltaY > swipeThreshold) {
      setActiveIdx((prev) => (prev < PORTFOLIO_PROJECTS.length - 1 ? prev + 1 : prev));
      touchActive.current = false;
    } else if (deltaY < -swipeThreshold) {
      setActiveIdx((prev) => (prev > 0 ? prev - 1 : prev));
      touchActive.current = false;
    }
  };

  const handleTouchEnd = () => {
    touchActive.current = false;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative h-screen h-dvh w-full bg-[#050505] text-white flex flex-col justify-between font-sans overflow-hidden select-none selection:bg-neonGreen selection:text-black"
    >
      {/* Background Ambience and Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Ambient Neon Green Radial Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-neonGreen/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-neonGreen/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[20%] w-[500px] h-[500px] bg-neonGreen/4 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Layout */}
      <Header />

      {/* Desktop Fixed Left Reel Section (Hidden on Mobile) */}
      <div className="hidden lg:flex fixed left-0 top-0 w-[38vw] h-screen z-20 items-center justify-center pointer-events-none">
        <div className="w-full relative pointer-events-auto">
          <FilmRoll
            projects={PORTFOLIO_PROJECTS}
            activeIdx={activeIdx}
            onActiveIndexChange={handleActiveIndexChange}
          />
          {/* Scroll Indicator Prompt */}
          <div className="absolute bottom-[35px] left-[15%] flex items-center gap-2 text-white/30 text-[10px] tracking-widest font-mono uppercase select-none pointer-events-none">
            <MousePointerClick className="w-3.5 h-3.5 text-neonGreen animate-bounce" />
            <span>Scroll anywhere to rotate reel</span>
          </div>
        </div>
      </div>

      {/* Main Viewport Content Area (Strictly non-scrollable) */}
      <main className="flex-1 w-full max-w-[94rem] mx-auto pt-20 lg:pt-24 px-4 md:px-8 flex flex-col lg:flex-row relative z-10 overflow-hidden items-center justify-center">
        
        {/* Mobile/Tablet Compact Reel Header & Controls (Visible on mobile/tablet only) */}
        <div className="w-full lg:hidden flex items-center justify-between py-2 px-2 border-b border-white/5 bg-black/40 backdrop-blur-md rounded-2xl mb-2 z-20">
          <button
            onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
            disabled={activeIdx === 0}
            className="p-1.5 rounded-lg border border-white/10 text-neonGreen disabled:opacity-30 disabled:border-white/5"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center">
            <span className="text-neonGreen text-xs font-bold font-mono text-glow-green">
              {activeProject.number} / {PORTFOLIO_PROJECTS.length.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] text-white/70 font-mono truncate max-w-[150px]">
              {activeProject.name}
            </span>
          </div>

          <button
            onClick={() => setActiveIdx((prev) => Math.min(PORTFOLIO_PROJECTS.length - 1, prev + 1))}
            disabled={activeIdx === PORTFOLIO_PROJECTS.length - 1}
            className="p-1.5 rounded-lg border border-white/10 text-neonGreen disabled:opacity-30 disabled:border-white/5"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Right Section (Shifts on desktop to accommodate the fixed left film reel) */}
        <section className="w-full lg:w-[62%] lg:ml-[38%] flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 h-full py-2 overflow-hidden">
          
          {/* Laptop 3D Preview (Center in viewport) */}
          <div className="w-full lg:w-[54%] flex items-center justify-center">
            <div className="w-full max-w-[540px]">
              <LaptopMockup activeProject={activeProject} />
            </div>
          </div>

          {/* Project Details Panel (Right side in viewport) */}
          <div className="w-full lg:w-[46%] flex items-center justify-center lg:justify-start overflow-y-auto lg:overflow-visible max-h-[40vh] lg:max-h-none custom-scrollbar">
            <div className="w-full">
              <ProjectDetails activeProject={activeProject} />
            </div>
          </div>

        </section>

      </main>

      {/* Non-scrollable Viewport Bottom Bar / Trust Stats & CTA */}
      <footer className="w-full border-t border-white/[0.04] bg-black/70 backdrop-blur-md px-4 md:px-8 py-2.5 flex items-center justify-between z-20 text-[11px] font-mono text-white/40">
        
        {/* Left: Quick Stats Strip */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5">
            <span className="text-neonGreen font-bold font-sans">120+</span>
            <span className="hidden sm:inline text-white/30 text-[10px]">WEBSITES</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-neonGreen font-bold font-sans">100+</span>
            <span className="hidden sm:inline text-white/30 text-[10px]">CLIENTS</span>
          </div>
          <span className="hidden md:inline text-white/20">•</span>
          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-neonGreen font-bold font-sans">99%</span>
            <span className="text-white/30 text-[10px]">SATISFACTION</span>
          </div>
        </div>

        {/* Center: Navigation hint */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-wider">
          <span>Scroll wheel anywhere or use ↑↓ keys to rotate reel</span>
        </div>

        {/* Right: Action CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="flex items-center gap-1.5 text-xs text-neonGreen hover:text-white font-bold tracking-wider transition-colors duration-200"
          >
            <span>GET IN TOUCH</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </footer>
    </div>
  );
}
