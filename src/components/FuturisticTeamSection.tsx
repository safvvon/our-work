"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TEAM_MEMBERS, TeamMember } from "../data/teamData";
import { soundManager } from "../utils/audio";

export const FuturisticTeamSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isCircleHovered, setIsCircleHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number>(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const filteredMembers = TEAM_MEMBERS;
  const memberCount = filteredMembers.length;

  // Navigate helper with infinite loop wrapping
  const navigate = useCallback(
    (direction: "next" | "prev" | number) => {
      soundManager.playNavClick();
      setActiveIndex((prev) => {
        if (typeof direction === "number") {
          return (direction + memberCount) % memberCount;
        }
        if (direction === "next") {
          return (prev + 1) % memberCount;
        } else {
          return (prev - 1 + memberCount) % memberCount;
        }
      });
    },
    [memberCount]
  );

  // Autoplay handler (5 seconds timer)
  const resetAutoplayTimer = useCallback(() => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    if (isHovered || isDragging || prefersReducedMotion || memberCount <= 1) return;

    autoplayTimerRef.current = setInterval(() => {
      navigate("next");
    }, 5000);
  }, [isHovered, isDragging, prefersReducedMotion, memberCount, navigate]);

  useEffect(() => {
    resetAutoplayTimer();
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [resetAutoplayTimer]);

  // Keyboard Navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        navigate("prev");
      } else if (e.key === "ArrowRight") {
        navigate("next");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  // Drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) navigate("next");
      else navigate("prev");
    }
  };

  const currentMember = filteredMembers[activeIndex] || filteredMembers[0];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Helper to compute visible position index offset (-4 to +4 for 9 members)
  const getOffset = (index: number) => {
    if (memberCount === 0) return 0;
    let diff = index - activeIndex;
    const half = Math.floor(memberCount / 2);
    if (diff > half) diff -= memberCount;
    if (diff < -half) diff += memberCount;
    return diff;
  };

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsCircleHovered(false);
      }}
      className="relative w-full min-h-[920px] bg-[#09090B] text-white py-16 px-4 overflow-hidden select-none flex flex-col justify-between items-center"
    >
      {/* Background Animated Gradient Grid & Soft Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090B] via-[#111116] to-[#09090B] opacity-80" />
        
        {/* Fine futuristic grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Dynamic radial glow matching active employee's neon color */}
        {currentMember && (
          <motion.div
            key={currentMember.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.22, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none"
            style={{ backgroundColor: currentMember.neonColor }}
          />
        )}

        {/* Soft floating ambient particles */}
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/20"
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 29) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-5xl px-4 flex flex-col items-center"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4 drop-shadow-[0_0_30px_rgba(92,255,61,0.25)] font-sans leading-none">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#5CFF3D] to-white">Intellex Innovators</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto font-mono">
            Our dedicated team drives every innovation through creativity and expertise.
          </p>
        </motion.div>

        {/* 3D REVOLVING SPHERE CAROUSEL AREA */}
        <div
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="relative w-full h-[400px] sm:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-x"
          style={{ perspective: "1200px" }}
        >
          {/* 3D Sci-Fi Globe Holographic Orbital Ring Background Elements */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-[320px] h-[320px] sm:w-[580px] sm:h-[580px] rounded-full border border-dashed border-[#5CFF3D]/15 animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] rounded-full border border-white/5 animate-[spin_40s_linear_infinite_reverse]" />
          </div>

          <div 
            className="relative w-full max-w-5xl h-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {filteredMembers.map((member, index) => {
              const offset = getOffset(index);
              const isCenter = offset === 0;

              // Angular calculation on the 3D Sphere:
              const angle = (offset / memberCount) * (2 * Math.PI);
              
              // Spherical Radii:
              const rx = isMobile ? 150 : 330; // Horizontal orbit radius
              const rz = isMobile ? 140 : 260; // Depth orbit radius (positive = front, negative = back)
              const ry = isMobile ? 25 : 45;   // Vertical sphere curve tilt radius

              const translateX = Math.sin(angle) * rx;
              const translateZ = Math.cos(angle) * rz; // cos(0) = max front position
              const translateY = -Math.cos(angle) * ry + Math.abs(offset) * (isMobile ? 5 : 9);

              // Depth normalization factor: 1 at front-center, 0 at back-far
              const zFactor = Math.max(0, Math.min(1, (translateZ + rz) / (2 * rz)));

              // 3D Overlapping visual parameters
              const scale = isCenter 
                ? (isCircleHovered ? 1.15 : 1.05) 
                : 0.42 + zFactor * 0.45;
              
              const opacity = isCenter 
                ? 1 
                : 0.25 + zFactor * 0.55;
              
              const zIndex = Math.round(zFactor * 100);
              const blurPx = isCenter ? 0 : (1 - zFactor) * 5;

              return (
                <motion.div
                  key={member.id}
                  onClick={() => {
                    soundManager.playNavClick();
                    setActiveIndex(index);
                  }}
                  onMouseEnter={() => {
                    if (isCenter) setIsCircleHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (isCenter) setIsCircleHovered(false);
                  }}
                  animate={{
                    x: translateX,
                    y: translateY,
                    scale,
                    opacity,
                    zIndex,
                    filter: `blur(${blurPx.toFixed(1)}px)`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 24,
                    mass: 0.8,
                  }}
                  style={{ 
                    willChange: "transform, opacity, filter",
                    transformStyle: "preserve-3d"
                  }}
                  className={`absolute flex flex-col items-center justify-center ${
                    isCenter ? "cursor-pointer" : "cursor-pointer hover:opacity-90 transition-opacity"
                  }`}
                >
                  <div className="relative flex items-center justify-center p-4">
                    {/* Active Employee Multi-Layer Animated Thin Neon Ring */}
                    {isCenter && (
                      <>
                        {/* Layer 2: Continuous Rotating Thin Gradient Ring */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute w-[190px] h-[190px] sm:w-[230px] sm:h-[230px] rounded-full p-[1.5px] bg-gradient-to-r from-[#00F0FF] via-[#A855F7] via-[#EC4899] via-[#EAB308] via-[#3B82F6] to-[#00F0FF] pointer-events-none"
                          style={{
                            boxShadow: `0 0 25px ${member.neonColor}90, 0 0 50px ${member.neonColor}40`,
                          }}
                        />

                        {/* Layer 3: Infinite Pulsing Radial Glow */}
                        <motion.div
                          animate={{
                            scale: [0.95, 1, 0.95],
                            opacity: [0.85, 1, 0.85],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full pointer-events-none"
                          style={{
                            boxShadow: `0 0 14px ${member.neonColor}, 0 0 40px ${member.neonColor}AA, 0 0 70px ${member.neonColor}55`,
                          }}
                        />
                      </>
                    )}

                    {/* Layer 1: Solid Circle Base & Photo Container with Overlapping Shadow */}
                    <div
                      className={`relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full overflow-hidden border transition-all duration-300 ${
                        isCenter
                          ? "border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                          : "border-white/15 shadow-2xl hover:border-white/40"
                      }`}
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        loading="lazy"
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* TEXT AREA FOR ACTIVE EMPLOYEE */}
        <div className="w-full max-w-xl text-center min-h-[160px] flex flex-col items-center justify-start px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMember ? currentMember.id : "empty"}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center gap-2"
            >
              <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-wide">
                {currentMember.name}
              </h3>
              <p
                className="text-xs sm:text-sm font-semibold tracking-widest uppercase"
                style={{ color: currentMember.neonColor }}
              >
                {currentMember.role}
              </p>
              <p className="text-xs sm:text-sm text-white/70 font-light max-w-lg leading-relaxed line-clamp-2 mt-1">
                {currentMember.bio}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ARROW BUTTONS */}
        <div className="flex items-center gap-6 mt-2 z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("prev")}
            className="p-4 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#5CFF3D]/40 text-white hover:border-[#5CFF3D] hover:shadow-[0_0_20px_rgba(92,255,61,0.5)] transition-all duration-300"
            aria-label="Previous Team Member"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Indicator dots */}
          <div className="flex items-center gap-2">
            {filteredMembers.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => {
                  soundManager.playNavClick();
                  setActiveIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? "w-6 h-2 bg-[#5CFF3D] shadow-[0_0_10px_#5CFF3D]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("next")}
            className="p-4 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#5CFF3D]/40 text-white hover:border-[#5CFF3D] hover:shadow-[0_0_20px_rgba(92,255,61,0.5)] transition-all duration-300"
            aria-label="Next Team Member"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
