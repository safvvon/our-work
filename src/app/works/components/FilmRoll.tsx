"use client";

import React, { useEffect, useRef, useState } from "react";
import { Project } from "../../../types/portfolio";
import { ArrowUp, ArrowDown } from "lucide-react";
import { MockWebsiteScreen } from "./LaptopMockup";
import { soundManager } from "../../../utils/audio";

interface FilmRollProps {
  projects: Project[];
  activeIdx: number;
  onActiveIndexChange: (idx: number) => void;
}

export const FilmRoll: React.FC<FilmRollProps> = ({
  projects,
  activeIdx,
  onActiveIndexChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track continuous cumulative index to allow seamless infinite rotation in any direction
  const cumulativeIdxRef = useRef(activeIdx);
  const [rotation, setRotation] = useState(-activeIdx * 15);
  const animationFrameRef = useRef<number | null>(null);

  // Accumulate scroll deltas to snap projects safely
  const scrollAccumulator = useRef(0);
  const scrollResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchTickCountRef = useRef(0);

  // Constants for circle geometry (24 slots total around 360 degrees, 15 degrees per item)
  const radius = 750;
  const itemAngle = 15;
  const totalSlots = 24;

  // Synthesize custom projector metallic slide lock sound effect for Our Work page
  const playClickSound = () => {
    try {
      soundManager.playWorkSlideSound();
    } catch (err) {}
  };

  // Synthesize scroll feedback sound
  const playScrollTickSound = () => {
    try {
      soundManager.playWorkSlideSound();
    } catch (err) {}
  };

  // Sync cumulative target index when activeIdx changes externally
  useEffect(() => {
    playClickSound();

    if (projects.length === 0) return;

    // Compute shortest rotational distance around modulo loop
    const currentWrapped = ((cumulativeIdxRef.current % projects.length) + projects.length) % projects.length;
    let diff = activeIdx - currentWrapped;

    if (diff > projects.length / 2) diff -= projects.length;
    if (diff < -projects.length / 2) diff += projects.length;

    cumulativeIdxRef.current += diff;

    const target = -cumulativeIdxRef.current * itemAngle;
    let active = true;

    const animate = () => {
      if (!active) return;

      setRotation((prev) => {
        const d = target - prev;
        if (Math.abs(d) < 0.05) {
          return target;
        }
        animationFrameRef.current = requestAnimationFrame(animate);
        return prev + d * 0.05;
      });
    };

    if (rotation !== target) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      active = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [activeIdx, projects.length]);

  useEffect(() => {
    return () => {
      if (scrollResetTimer.current) clearTimeout(scrollResetTimer.current);
    };
  }, []);

  // Wheel event for continuous scrolling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const oldAccumulator = scrollAccumulator.current;
      scrollAccumulator.current += e.deltaY;

      const scrollTickSize = 30;
      const prevTicks = Math.floor(Math.abs(oldAccumulator) / scrollTickSize);
      const currentTicks = Math.floor(Math.abs(scrollAccumulator.current) / scrollTickSize);
      
      if (currentTicks > prevTicks) {
        playScrollTickSound();
      }

      if (scrollResetTimer.current) clearTimeout(scrollResetTimer.current);
      scrollResetTimer.current = setTimeout(() => {
        scrollAccumulator.current = 0;
      }, 500);

      const threshold = 120;
      if (scrollAccumulator.current > threshold) {
        onActiveIndexChange((activeIdx + 1) % projects.length);
        scrollAccumulator.current = 0;
      } else if (scrollAccumulator.current < -threshold) {
        onActiveIndexChange((activeIdx - 1 + projects.length) % projects.length);
        scrollAccumulator.current = 0;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [activeIdx, projects.length, onActiveIndexChange]);

  // Touch handlers for continuous touch swiping
  const touchStartY = useRef(0);
  const touchActive = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchActive.current = true;
    touchTickCountRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchActive.current) return;
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchY;

    const touchTickSize = 15;
    const currentTicks = Math.floor(Math.abs(deltaY) / touchTickSize);
    if (currentTicks > touchTickCountRef.current) {
      playScrollTickSound();
      touchTickCountRef.current = currentTicks;
    }

    const swipeThreshold = 40;
    if (deltaY > swipeThreshold) {
      onActiveIndexChange((activeIdx + 1) % projects.length);
      touchActive.current = false;
    } else if (deltaY < -swipeThreshold) {
      onActiveIndexChange((activeIdx - 1 + projects.length) % projects.length);
      touchActive.current = false;
    }
  };

  const handleTouchEnd = () => {
    touchActive.current = false;
  };

  const handlePrev = () => {
    onActiveIndexChange((activeIdx - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    onActiveIndexChange((activeIdx + 1) % projects.length);
  };

  // Compute which slot around the 360-degree reel corresponds to the active target
  const activeSlotIndex = ((cumulativeIdxRef.current % totalSlots) + totalSlots) % totalSlots;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[450px] lg:h-[85vh] flex items-center overflow-visible touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Up/Down buttons placed on the left side */}
      <div className="absolute left-2 sm:left-4 lg:left-[6%] z-30 flex flex-col gap-2.5 sm:gap-3">
        <button
          onClick={handlePrev}
          className="w-7 h-7 sm:w-10 sm:h-10 rounded-full border border-neonGreen/40 text-neonGreen hover:bg-neonGreen/10 hover:border-neonGreen hover:scale-105 flex items-center justify-center transition-all duration-300 bg-black/85"
        >
          <ArrowUp className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={handleNext}
          className="w-7 h-7 sm:w-10 sm:h-10 rounded-full border border-neonGreen/40 text-neonGreen hover:bg-neonGreen/10 hover:border-neonGreen hover:scale-105 flex items-center justify-center transition-all duration-300 bg-black/85"
        >
          <ArrowDown className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Scaled Film Roll Wrapper */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full flex items-center origin-left scale-[0.40] sm:scale-[0.58] md:scale-[0.78] lg:scale-100 -translate-x-10 sm:-translate-x-6 lg:translate-x-0 transition-transform duration-300">
        {/* Rotating Film Strip Container */}
        <div
          className="absolute origin-left"
          style={{
            left: `-${radius * 0.64}px`,
            top: "50%",
            transform: `translateY(-50%) rotate(${rotation}deg)`,
            transformOrigin: "left center",
          }}
        >
          {/* Continuous Curved Film Track */}
          <svg
            className="absolute overflow-visible pointer-events-none z-0"
            style={{
              left: 0,
              top: 0,
              transform: "translate(-1000px, -1000px)",
              width: "2000px",
              height: "2000px",
            }}
            viewBox="-1000 -1000 2000 2000"
          >
            {/* Continuous dark film backing layer */}
            <circle
              cx="0"
              cy="0"
              r="750"
              stroke="rgba(10, 15, 10, 0.92)"
              strokeWidth="260"
              fill="none"
            />

            {/* Outer Border Lines */}
            <circle cx="0" cy="0" r="880" stroke="#5CFF3D" strokeWidth="1.5" fill="none" opacity="0.6" />
            <circle
              cx="0"
              cy="0"
              r="868"
              stroke="#5CFF3D"
              strokeWidth="8"
              strokeDasharray="6, 12"
              fill="none"
              opacity="0.5"
            />
            <circle cx="0" cy="0" r="856" stroke="#5CFF3D" strokeWidth="1.5" fill="none" opacity="0.3" />

            {/* Inner Border Lines */}
            <circle cx="0" cy="0" r="644" stroke="#5CFF3D" strokeWidth="1.5" fill="none" opacity="0.3" />
            <circle
              cx="0"
              cy="0"
              r="632"
              stroke="#5CFF3D"
              strokeWidth="8"
              strokeDasharray="6, 12"
              fill="none"
              opacity="0.5"
            />
            <circle cx="0" cy="0" r="620" stroke="#5CFF3D" strokeWidth="1.5" fill="none" opacity="0.6" />
          </svg>

          {/* Continuous 360-degree slots around the circle */}
          {Array.from({ length: totalSlots }).map((_, slotIdx) => {
            const projIdx = ((slotIdx % projects.length) + projects.length) % projects.length;
            const proj = projects[projIdx];
            const relativeAngle = slotIdx * itemAngle;
            const isActive = slotIdx === activeSlotIndex;

            const isRightText = slotIdx % 2 === 1;
            const textAlign = isRightText ? "items-start text-left pl-12" : "items-end text-right pr-12";

            return (
              <div
                key={`${proj.id}-slot-${slotIdx}`}
                onClick={() => onActiveIndexChange(projIdx)}
                className="absolute cursor-pointer"
                style={{
                  transform: `rotate(${relativeAngle}deg) translate(${radius}px, 0px) translate(-50%, -50%)`,
                  transformOrigin: "0 0",
                  top: "0px",
                  left: "0px",
                }}
              >
                {/* Project numbering and label */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 flex flex-col font-mono pointer-events-none transition-all duration-300 ${textAlign}`}
                  style={{
                    transform: `translate(${isRightText ? "0" : "-100%"})`,
                    left: isRightText ? "100%" : "0px",
                    width: "160px",
                  }}
                >
                  <span
                    className={`text-lg font-black transition-colors ${
                      isActive ? "text-neonGreen text-glow-green" : "text-white/40"
                    }`}
                  >
                    {proj.number}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-white/70 truncate max-w-[140px]">
                    {proj.name.split(" ")[0]}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-white/30 truncate max-w-[140px]">
                    {proj.category.split(" ")[0]}
                  </span>
                </div>

                {/* Physical Film Frame */}
                <div
                  className={`relative w-[200px] aspect-[4/3] rounded-lg bg-zinc-950 border overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 ${
                    isActive
                      ? "border-neonGreen glow-green bg-zinc-950/40"
                      : "border-white/10 opacity-30 hover:opacity-80"
                  }`}
                >
                  <div className="w-full h-full pointer-events-none select-none relative overflow-hidden">
                    <MockWebsiteScreen project={proj} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-10" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilmRoll;

