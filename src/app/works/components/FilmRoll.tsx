"use client";

import React, { useEffect, useRef, useState } from "react";
import { Project } from "../../../types/portfolio";
import { ArrowUp, ArrowDown } from "lucide-react";
import { MockWebsiteScreen } from "./LaptopMockup";

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
  
  // rotation is purely a visual state for the animation loop
  const [rotation, setRotation] = useState(-activeIdx * 15);
  const animationFrameRef = useRef<number | null>(null);

  // Accumulate scroll deltas to snap projects safely
  const scrollAccumulator = useRef(0);
  const scrollResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchTickCountRef = useRef(0); // Tracks ticks triggered during swipe drag

  // Constants for circle geometry
  const radius = 750;
  const itemAngle = 15;

  // Synthesize a crisp projector slide lock click (louder, resonant)
  const playClickSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(700, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.04, ctx.currentTime); 
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch (err) {
      console.log("Audio play blocked by interaction policy", err);
    }
  };

  // Synthesize a micro mechanical ratchet tick (softer, rapid) for scroll feedback
  const playScrollTickSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.015);

      gain.gain.setValueAtTime(0.015, ctx.currentTime); // Very quiet, subtle tick
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.02);
    } catch (err) {
      // Catch browser permission issues
    }
  };

  // Single-source animation effect: Animates visual rotation whenever activeIdx changes
  useEffect(() => {
    // Play the mechanical click sound whenever the active index changes
    playClickSound();

    const target = -activeIdx * itemAngle;
    let active = true;

    const animate = () => {
      if (!active) return;

      setRotation((prev) => {
        const diff = target - prev;
        // Stop loop if we are close enough to the target angle
        if (Math.abs(diff) < 0.05) {
          return target;
        }
        // Schedule next physics update frame
        animationFrameRef.current = requestAnimationFrame(animate);
        return prev + diff * 0.05;
      });
    };

    // Only run the animation loop if we aren't already at the target
    if (rotation !== target) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      active = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeIdx]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (scrollResetTimer.current) clearTimeout(scrollResetTimer.current);
    };
  }, []);

  // Handle scroll/wheel event: Updates parent active index based on notches scrolled
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const oldAccumulator = scrollAccumulator.current;
      scrollAccumulator.current += e.deltaY;

      // Play soft scrolling tick sound for every 30px of scroll delta accumulated
      const scrollTickSize = 30;
      const prevTicks = Math.floor(Math.abs(oldAccumulator) / scrollTickSize);
      const currentTicks = Math.floor(Math.abs(scrollAccumulator.current) / scrollTickSize);
      
      if (currentTicks > prevTicks) {
        playScrollTickSound();
      }

      // Reset accumulator if user stops scrolling for 500ms
      if (scrollResetTimer.current) clearTimeout(scrollResetTimer.current);
      scrollResetTimer.current = setTimeout(() => {
        scrollAccumulator.current = 0;
      }, 500);

      const threshold = 120; // Scroll notch sensitivity threshold
      if (scrollAccumulator.current > threshold) {
        if (activeIdx < projects.length - 1) {
          onActiveIndexChange(activeIdx + 1);
        }
        scrollAccumulator.current = 0;
      } else if (scrollAccumulator.current < -threshold) {
        if (activeIdx > 0) {
          onActiveIndexChange(activeIdx - 1);
        }
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

  // Mobile Touch Swipe Handlers: Directly triggers index updates
  const touchStartY = useRef(0);
  const touchActive = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchActive.current = true;
    touchTickCountRef.current = 0; // Reset swipe tick counter
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchActive.current) return;
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchY;

    // Play micro tick sound as the user drags on touch screens (every 15px of offset)
    const touchTickSize = 15;
    const currentTicks = Math.floor(Math.abs(deltaY) / touchTickSize);
    if (currentTicks > touchTickCountRef.current) {
      playScrollTickSound();
      touchTickCountRef.current = currentTicks;
    }

    const swipeThreshold = 50;
    if (deltaY > swipeThreshold) {
      // Swiped up -> next item
      if (activeIdx < projects.length - 1) {
        onActiveIndexChange(activeIdx + 1);
      }
      touchActive.current = false; // Trigger once per swipe
    } else if (deltaY < -swipeThreshold) {
      // Swiped down -> previous item
      if (activeIdx > 0) {
        onActiveIndexChange(activeIdx - 1);
      }
      touchActive.current = false; // Trigger once per swipe
    }
  };

  const handleTouchEnd = () => {
    touchActive.current = false;
  };

  const handlePrev = () => {
    if (activeIdx > 0) {
      onActiveIndexChange(activeIdx - 1);
    }
  };

  const handleNext = () => {
    if (activeIdx < projects.length - 1) {
      onActiveIndexChange(activeIdx + 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[85vh] flex items-center overflow-visible touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Up/Down buttons placed on the left side */}
      <div className="absolute left-[6%] z-30 flex flex-col gap-3">
        <button
          onClick={handlePrev}
          disabled={activeIdx === 0}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 bg-black/85 ${
            activeIdx === 0
              ? "border-white/10 text-white/20 cursor-not-allowed"
              : "border-neonGreen/40 text-neonGreen hover:bg-neonGreen/10 hover:border-neonGreen hover:scale-105"
          }`}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          disabled={activeIdx === projects.length - 1}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 bg-black/85 ${
            activeIdx === projects.length - 1
              ? "border-white/10 text-white/20 cursor-not-allowed"
              : "border-neonGreen/40 text-neonGreen hover:bg-neonGreen/10 hover:border-neonGreen hover:scale-105"
          }`}
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>

      {/* Rotating Film Strip Container */}
      <div
        className="absolute origin-left"
        style={{
          left: `-${radius * 0.64}px`, // Shifts rotation center to attach reel to absolute viewport edge
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
          {/* Continuous dark film backing layer (strokeWidth 260px to contain horizontal 200px frames) */}
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

        {/* Portfolio website frames placed along the track */}
        {projects.map((proj, idx) => {
          const relativeAngle = idx * itemAngle;
          const isActive = idx === activeIdx;

          // Asymmetric Text Placement (Item 02 on the right, others on the left)
          const isRightText = idx === 1;
          
          // pr-12 / pl-12 margins push the labels cleanly past the widened borders
          const textAlign = isRightText ? "items-start text-left pl-12" : "items-end text-right pr-12";

          return (
            <div
              key={proj.id}
              onClick={() => onActiveIndexChange(idx)}
              className="absolute cursor-pointer"
              style={{
                // Standard mathematical transform for placing and centering elements on a circle:
                // 1. rotate(relativeAngle) rotates local coordinate system about parent origin (0, 0)
                // 2. translate(radius, 0px) positions origin on the circle
                // 3. translate(-50%, -50%) shifts the element to center it exactly at (radius, 0)
                transform: `rotate(${relativeAngle}deg) translate(${radius}px, 0px) translate(-50%, -50%)`,
                transformOrigin: "0 0",
                top: "0px",
                left: "0px",
              }}
            >
              {/* Project numbering and industry label outside the film roll */}
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

              {/* Physical Film Frame (Massive size: 200px width, 150px height) */}
              <div
                className={`relative w-[200px] aspect-[4/3] rounded-lg bg-zinc-950 border overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 ${
                  isActive
                    ? "border-neonGreen glow-green bg-zinc-950/40"
                    : "border-white/10 opacity-30 hover:opacity-80"
                }`}
              >
                {/* High Fidelity Website screen loaded inside the film strip frame */}
                <div className="w-full h-full pointer-events-none select-none relative overflow-hidden">
                  <MockWebsiteScreen project={proj} />
                  
                  {/* Glass overlay reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-10" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilmRoll;
