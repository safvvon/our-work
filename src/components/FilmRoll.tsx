"use client";

import React, { useEffect, useRef, useState } from "react";
import { Project } from "../types/portfolio";
import { ArrowUp, ArrowDown } from "lucide-react";

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
  const [rotation, setRotation] = useState(0); // Current visible rotation angle
  const targetRotationRef = useRef(0); // Destination rotation angle for snapping
  const animationFrameRef = useRef<number | null>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Constants for circle geometry
  const radius = 550; // Radius in pixels
  const itemAngle = 14; // Angle spacing between items in degrees

  // Update target rotation when activeIdx changes externally (e.g., arrows, clicks)
  useEffect(() => {
    targetRotationRef.current = -activeIdx * itemAngle;
  }, [activeIdx]);

  // Smooth momentum animation loop
  useEffect(() => {
    const updatePhysics = () => {
      setRotation((prev) => {
        const diff = targetRotationRef.current - prev;
        // Smooth interpolation / easing
        if (Math.abs(diff) < 0.01) {
          return targetRotationRef.current;
        }
        return prev + diff * 0.08;
      });
      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Update the parent active index when rotation changes
  useEffect(() => {
    // Determine which item is closest to 0 degrees rotation (active center)
    const closestIdx = Math.min(
      projects.length - 1,
      Math.max(0, Math.round(-rotation / itemAngle))
    );
    if (closestIdx !== activeIdx) {
      onActiveIndexChange(closestIdx);
    }
  }, [rotation, projects.length, activeIdx, onActiveIndexChange]);

  // Handle scroll/wheel event to rotate
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Increase or decrease target rotation depending on scroll direction
      const sensitivity = 0.08;
      let newTarget = targetRotationRef.current - e.deltaY * sensitivity;

      // Lock bounds
      const minRot = -(projects.length - 1) * itemAngle;
      const maxRot = 0;
      newTarget = Math.max(minRot - 10, Math.min(maxRot + 10, newTarget)); // Allow slight rubber banding

      targetRotationRef.current = newTarget;

      // Smoothly snap to nearest frame after user stops scrolling (debounced-like snapping)
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
      snapTimerRef.current = setTimeout(() => {
        const nearestIdx = Math.min(
          projects.length - 1,
          Math.max(0, Math.round(-targetRotationRef.current / itemAngle))
        );
        targetRotationRef.current = -nearestIdx * itemAngle;
      }, 150);
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
  }, [projects.length]);

  // Mobile Swipe Touch handlers
  const touchStartY = useRef(0);
  const touchStartRot = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartRot.current = targetRotationRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchY;
    const sensitivity = 0.15;
    let newTarget = touchStartRot.current - deltaY * sensitivity;

    const minRot = -(projects.length - 1) * itemAngle;
    const maxRot = 0;
    newTarget = Math.max(minRot, Math.min(maxRot, newTarget));

    targetRotationRef.current = newTarget;
  };

  const handleTouchEnd = () => {
    // Snap to nearest item
    const nearestIdx = Math.min(
      projects.length - 1,
      Math.max(0, Math.round(-targetRotationRef.current / itemAngle))
    );
    targetRotationRef.current = -nearestIdx * itemAngle;
  };

  // Nav Arrow Click Handlers
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
      className="relative w-full h-[85vh] flex items-center overflow-hidden touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Semi-circular guide line (visual luxury enhancement) */}
      <div
        className="absolute border border-neonGreen/10 rounded-full pointer-events-none"
        style={{
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          left: `-${radius * 0.9}px`, // Centered on the left edge
          top: "calc(50% - 550px)",
        }}
      />
      <div
        className="absolute border border-dashed border-neonGreen/5 rounded-full pointer-events-none"
        style={{
          width: `${(radius - 50) * 2}px`,
          height: `${(radius - 50) * 2}px`,
          left: `-${(radius - 50) * 0.9}px`,
          top: "calc(50% - 500px)",
        }}
      />

      {/* Manual Navigation Arrows (Floating beside the active center) */}
      <div className="absolute left-[34%] z-30 flex flex-col gap-3">
        <button
          onClick={handlePrev}
          disabled={activeIdx === 0}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
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
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
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
        className="absolute origin-left transition-transform duration-75"
        style={{
          left: `-${radius * 0.6}px`, // Pull the circle centers further left
          top: "50%",
          transform: `translateY(-50%) rotate(${rotation}deg)`,
          transformOrigin: "left center",
        }}
      >
        {projects.map((proj, idx) => {
          const relativeAngle = idx * itemAngle; // Index spacing angle
          const isActive = idx === activeIdx;

          return (
            <div
              key={proj.id}
              onClick={() => onActiveIndexChange(idx)}
              className="absolute cursor-pointer group"
              style={{
                transform: `rotate(${relativeAngle}deg) translate(${radius}px, -50%)`,
                transformOrigin: "left center",
                top: "0px",
                left: "0px",
                transition: "opacity 0.3s ease",
              }}
            >
              {/* Project numbering and label on top */}
              <div className="absolute -left-20 top-1/2 -translate-y-1/2 flex flex-col items-end text-right font-mono pr-4 group-hover:scale-105 transition-transform duration-300">
                <span
                  className={`text-sm font-black transition-colors ${
                    isActive ? "text-neonGreen text-glow-green" : "text-white/40"
                  }`}
                >
                  {proj.number}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-white/20 truncate max-w-[80px]">
                  {proj.name.split(" ")[0]}
                </span>
              </div>

              {/* Physical Film Frame */}
              <div
                className={`relative w-[130px] aspect-[4/3] rounded bg-zinc-900 border flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 ${
                  isActive
                    ? "border-neonGreen glow-green bg-zinc-950"
                    : "border-white/10 opacity-40 hover:opacity-80"
                }`}
              >
                {/* Sprocket Holes Left Edge */}
                <div className="absolute left-1 top-0 bottom-0 w-2.5 z-10 flex flex-col justify-between py-1 bg-black/40 border-r border-white/5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-2 bg-zinc-950 rounded-[1px] border border-white/5 mx-auto" />
                  ))}
                </div>

                {/* Sprocket Holes Right Edge */}
                <div className="absolute right-1 top-0 bottom-0 w-2.5 z-10 flex flex-col justify-between py-1 bg-black/40 border-l border-white/5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-2 bg-zinc-950 rounded-[1px] border border-white/5 mx-auto" />
                  ))}
                </div>

                {/* Inside Screen Preview representation */}
                <div className="flex-1 mx-4 my-1 bg-zinc-950 rounded border border-white/5 relative overflow-hidden flex flex-col justify-between p-1.5 text-[4px] leading-tight select-none">
                  {/* Mock nav bar */}
                  <div className="flex justify-between items-center opacity-30">
                    <div className="w-1 h-1 bg-white rounded-full" />
                    <div className="flex gap-0.5">
                      <div className="w-1 h-[1px] bg-white" />
                      <div className="w-1 h-[1px] bg-white" />
                    </div>
                  </div>
                  {/* Graphic layout */}
                  <div className="flex-1 flex flex-col justify-center items-center gap-0.5 text-center mt-1">
                    <span className="font-extrabold uppercase scale-90 tracking-tighter text-[3px] text-neonGreen">
                      {proj.name}
                    </span>
                    <span className="scale-75 text-[2px] opacity-40 uppercase truncate max-w-[80px]">
                      {proj.category}
                    </span>
                  </div>
                  {/* Mock footer */}
                  <div className="flex justify-between items-center opacity-20 text-[2px]">
                    <span>© '26</span>
                    <div className="w-1 h-[2px] bg-white" />
                  </div>

                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export {};

