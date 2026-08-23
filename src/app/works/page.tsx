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

      {/* Viewport Fixed Film Roll Panel (Fixed on Left Side Vertically Centered on Mobile & Desktop) */}
      <div className="fixed left-0 top-0 w-[90px] sm:w-[150px] md:w-[200px] lg:w-[260px] xl:w-[300px] h-screen z-20 flex items-center justify-center pointer-events-none">
        <div className="w-full relative pointer-events-auto">
          <FilmRoll
            projects={PORTFOLIO_PROJECTS}
            activeIdx={activeIdx}
            onActiveIndexChange={handleActiveIndexChange}
          />
          {/* Scroll Indicator Prompt */}
          <div className="hidden lg:flex absolute bottom-[35px] left-[15%] items-center gap-2 text-white/30 text-[10px] tracking-widest font-mono uppercase select-none pointer-events-none">
            <MousePointerClick className="w-3.5 h-3.5 text-neonGreen animate-bounce" />
            <span>Scroll anywhere to rotate reel</span>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <main className="flex-1 w-full max-w-[100rem] mx-auto pl-[95px] sm:pl-[160px] md:pl-[210px] lg:pl-[320px] xl:pl-[360px] pr-4 sm:pr-6 md:pr-8 xl:pr-12 pt-24 md:pt-28 flex flex-col relative z-10">
        
        {/* Main Section (Laptop Mockup + Project Details on Right) */}
        <section className="w-full flex flex-col lg:flex-row items-center justify-center py-6 lg:py-10 gap-8 xl:gap-12 min-h-[calc(100vh-140px)]">
          
          {/* 3D Laptop Preview (Shifted slightly right for optimal balance) */}
          <div className="flex-1 w-full flex items-center justify-center min-w-0">
            <div className="w-full max-w-[620px] xl:max-w-[680px] lg:translate-x-6 xl:translate-x-10">
              <LaptopMockup activeProject={activeProject} />
            </div>
          </div>

          {/* Website Details (Right side of Laptop) */}
          <div className="w-full lg:w-[420px] xl:w-[460px] shrink-0 flex items-center justify-center lg:justify-start">
            <div className="w-full max-w-[460px]">
              <ProjectDetails activeProject={activeProject} />
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}
