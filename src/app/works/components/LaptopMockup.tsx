"use client";

import React, { useEffect, useState } from "react";
import { Project } from "../../../types/portfolio";
import { Monitor, Smartphone, Sparkles, ShoppingBag, Landmark, Coffee, Heart, ArrowUpRight, BarChart2, Dumbbell, Shield, Truck, Film, Plane, Anchor, Car, Layers, Compass, Play, Calendar, User, Eye, Box } from "lucide-react";

interface LaptopMockupProps {
  activeProject: Project;
}

export const LaptopMockup: React.FC<LaptopMockupProps> = ({ activeProject }) => {
  const [prevProject, setPrevProject] = useState<Project | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [rotationY, setRotationY] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (activeProject) {
      // Trigger a 360-degree spin on Y axis when project changes
      if (!prevProject || activeProject.id !== prevProject.id) {
        setRotationY((prev) => prev + 360);
      }

      setTransitioning(true);
      const timer = setTimeout(() => {
        setPrevProject(activeProject);
        setTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [activeProject, prevProject]);

  const displayProject = prevProject || activeProject;

  // Calculate parallax 3D tilt coordinates based on mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Limits rotation to +/- 12 degrees
    const maxTilt = 12;
    const tiltX = (y / (box.height / 2)) * maxTilt;
    const tiltY = -(x / (box.width / 2)) * maxTilt;

    setTilt({ x: tiltX, y: tiltY });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };

  // Get project ambient glow color based on theme
  const getGlowColor = () => {
    switch (displayProject.mockLayoutType) {
      case "dashboard":
        return "rgba(59, 130, 246, 0.25)"; // Techflow Blue
      case "creative":
        return "rgba(168, 85, 247, 0.25)"; // Vogue Purple
      case "artisanal":
        return "rgba(245, 158, 11, 0.25)"; // Taste Haven Amber
      case "fitness":
        return "rgba(239, 68, 68, 0.25)"; // PowerFit Crimson
      default:
        return "rgba(92, 255, 61, 0.2)"; // Neon Green fallback
    }
  };

  return (
    <div 
      className="w-full flex flex-col items-center justify-center py-10 select-none min-h-[440px]" 
      style={{ perspective: "1500px" }}
    >
      {/* 3D Interactive Laptop Wrapper (Absolute container to prevent gaps or layout shift) */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (displayProject.liveUrl && displayProject.liveUrl !== "#") {
            window.open(displayProject.liveUrl, "_blank");
          }
        }}
        className="relative w-full max-w-[580px] h-[340px] cursor-pointer"
        style={{
          transform: `rotateY(${rotationY + tilt.y}deg) rotateX(${tilt.x}deg)`,
          transformStyle: "preserve-3d",
          // Smoother transition during manual hover; bouncy elastic transition for project spin swaps
          transition: isHovering 
            ? "transform 0.15s ease-out" 
            : "transform 1.4s cubic-bezier(0.34, 1.3, 0.64, 1)"
        }}
      >
        {/* Dynamic Project Ambient Backdrop Backlight */}
        <div 
          className="absolute -inset-10 rounded-full blur-[100px] opacity-75 -z-20 transition-all duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${getGlowColor()} 0%, transparent 70%)`
          }}
        />

        {/* 3D Screen Lid (tilted slightly back, matte black bezel casing) */}
        <div 
          className="relative mx-auto w-[92%] aspect-[16/10] bg-[#0c0c0e] rounded-t-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
          style={{
            transform: "rotateX(-12deg)",
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Front Bezel & Screen (Visible from front only) */}
          <div 
            className="absolute inset-0 bg-[#0c0c0e] border-[8px] border-[#1c1c1f] ring-1 ring-white/10 rounded-t-2xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden"
            }}
          >
            {/* Screen Content Frame */}
            <div className="w-full h-full relative bg-[#060608] overflow-hidden">
              {/* Screen Glass Reflection */}
              <div className="absolute inset-0 z-20 laptop-reflection pointer-events-none" />
              
              {/* Webcam Lens & Ambient Indicator */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#1c1c1f] rounded-full z-30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#0e171e] rounded-full flex items-center justify-center">
                  <div className="w-[3px] h-[3px] bg-blue-500/80 rounded-full" />
                </div>
              </div>

              {/* Glowing Acer Green Bezel Logo */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-30 flex items-center opacity-85 select-none pointer-events-none">
                <span className="text-[#5CFF3D] text-[9px] font-black uppercase tracking-[0.2em] text-glow-green font-sans">acer</span>
              </div>

              {/* Active Webpage Rendering */}
              <div className={`w-full h-full transition-opacity duration-300 ${transitioning ? "opacity-30 scale-95" : "opacity-100 scale-100"}`}>
                <MockWebsiteScreen project={displayProject} />
              </div>
            </div>
          </div>

          {/* Solid Back Cover (Visible from back only) */}
          <div 
            className="absolute inset-0 bg-[#161619] border-[8px] border-[#1c1c1f] rounded-t-2xl flex items-center justify-center shadow-inner"
            style={{ 
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden"
            }}
          >
            {/* Acer Chrome Logo on outer lid */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[#5CFF3D] text-[18px] font-black uppercase tracking-[0.25em] text-glow-green font-sans">acer</span>
              <span className="text-white/20 text-[5px] uppercase tracking-widest font-mono">NITRO GAMING</span>
            </div>
          </div>
        </div>

        {/* Realistic Laptop Hinge Joint (Dark Anodized Metal) */}
        <div 
          className="relative mx-auto w-[88%] h-[12px] bg-gradient-to-r from-[#0b0b0d] via-[#1c1c1f] to-[#0b0b0d] border-x border-white/5 shadow-inner z-20 -mt-[6px]"
          style={{
            transform: "translateZ(3px)"
          }}
        />

        {/* 3D Laptop Keyboard Deck & Base (Matte Obsidian/Charcoal Aluminum) */}
        <div 
          className="relative mx-auto w-[100%] h-[330px] -mt-[6px]"
          style={{
            transform: "rotateX(72deg) translateY(-2px) translateZ(2px)",
            transformOrigin: "top center",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Top Key deck (Visible from front only) */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#242428] via-[#1c1c1f] to-[#121214] rounded-b-xl shadow-[0_25px_50px_rgba(0,0,0,0.85)] border-t border-zinc-700/30 flex flex-col justify-between p-3 overflow-hidden"
            style={{
              backfaceVisibility: "hidden"
            }}
          >
            {/* Metal edge chamfer highlights */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-white/10" />

            {/* Keyboard Recessed Area with Mock Keys */}
            <div className="w-[92%] h-[180px] bg-[#0c0c0e] border border-black/60 rounded-xl mx-auto mt-2 p-3 flex flex-col gap-2 shadow-inner relative">
              {/* Key Row 1 (Function keys) */}
              <div className="flex gap-1 h-3">
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
              </div>
              {/* Key Row 2 (Number / QWERTY keys) */}
              <div className="flex gap-1 h-3.5 pl-1">
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
              </div>
              {/* Key Row 3 (ASDF keys) */}
              <div className="flex gap-1 h-3.5 pl-2">
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
              </div>
              {/* Key Row 4 (Spacebar / Control keys) */}
              <div className="flex gap-1 h-3.5 px-6">
                <div className="w-10 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="w-8 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="flex-1 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="w-8 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
                <div className="w-10 bg-[#1a1a1c] rounded-sm shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] border-b border-black" />
              </div>
            </div>

            {/* Palm Rest Stickers (AMD Ryzen + NVIDIA RTX side-by-side on left of trackpad) */}
            <div className="absolute bottom-6 left-6 flex gap-2 z-20 scale-[1.0] origin-bottom-left">
              {/* AMD RYZEN STICKER */}
              <div className="w-11 h-8 bg-gradient-to-br from-zinc-850 to-zinc-950 border border-zinc-700/60 rounded-[1.5px] p-0.5 flex flex-col justify-between font-sans relative overflow-hidden shadow-md">
                {/* Ryzen Orange side tag */}
                <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-gradient-to-b from-orange-500 via-red-500 to-orange-600" />
                <div className="flex flex-col items-start leading-none z-10">
                  <span className="text-[2.5px] text-zinc-400 font-bold tracking-tight">AMD</span>
                  <span className="text-[4px] text-white font-black tracking-tighter mt-[1px]">RYZEN</span>
                </div>
                <span className="text-[3px] text-white font-extrabold z-10 self-end pr-1 mt-1">7</span>
              </div>

              {/* NVIDIA GEFORCE RTX STICKER */}
              <div className="w-11 h-8 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-700/60 rounded-[1.5px] p-0.5 flex flex-col justify-between font-sans relative overflow-hidden shadow-md">
                {/* RTX green skew strip */}
                <div className="absolute -top-1 -right-2 w-4 h-10 bg-[#5CFF3D] transform rotate-12 opacity-90 shadow-[0_0_8px_rgba(92,255,61,0.5)]" />
                <div className="flex flex-col items-start leading-none z-10 text-white">
                  <span className="text-[2px] text-zinc-300 font-extrabold tracking-tight">GEFORCE</span>
                  <span className="text-[3.8px] font-black tracking-tighter mt-[1px]">RTX</span>
                </div>
                <span className="text-[1.8px] text-black font-black z-10 self-end pr-1.5 mt-2 select-none">NVIDIA</span>
              </div>
            </div>

            {/* Trackpad */}
            <div className="w-[32%] h-[60px] border border-zinc-800/80 bg-zinc-900/10 rounded-lg mx-auto mb-2 shadow-inner relative flex justify-center">
              {/* Left/Right click divider */}
              <div className="absolute bottom-0 w-[0.5px] h-[10px] bg-[#1c1c1f]/40" />
            </div>

            {/* Opening Notch shadow at bottom edge */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90px] h-[4px] bg-[#0c0c0e] rounded-t-md border-x border-zinc-800" />
          </div>

          {/* Bottom Cover (Visible from back only) */}
          <div 
            className="absolute inset-0 bg-[#0d0d0f] rounded-b-xl border-x border-b border-zinc-800/40 flex flex-col justify-start p-4"
            style={{ 
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden"
            }}
          >
            {/* Ventilation vents and rubber pads */}
            <div className="w-[85%] h-2.5 bg-black/60 mx-auto rounded mt-4 border border-zinc-950" />
            <div className="w-[85%] h-2.5 bg-black/60 mx-auto rounded mt-1 border border-zinc-950" />
            <div className="flex justify-between px-8 mt-12">
              <div className="w-4 h-2 bg-zinc-900 rounded-full" />
              <div className="w-4 h-2 bg-zinc-900 rounded-full" />
            </div>
          </div>

          {/* Front Lip / Edge Thickness Wall (Adds real 3D depth to keyboard deck thickness) */}
          <div 
            className="absolute bottom-0 left-0 w-full h-[12px] bg-[#121214] border-b border-zinc-900"
            style={{
              transform: "rotateX(-90deg)",
              transformOrigin: "bottom center"
            }}
          />
        </div>

        {/* Floating Dynamic Shadow Beneath Laptop */}
        <div 
          className="absolute bottom-[-20px] left-[5%] w-[90%] h-8 bg-black/85 rounded-full blur-2xl -z-10" 
          style={{
            transform: "rotateX(90deg) translateZ(-40px)",
            transformOrigin: "center center"
          }}
        />
      </div>
    </div>
  );
};

// Sub-component to render custom mock page structures
export const MockWebsiteScreen: React.FC<{ project: Project }> = ({ project }) => {
  const screenshot = {
    "meachery-furniture": "/meachery-furniture.png",
    "the-consultant-7": "/the-consultant-7.png",
    "shq-life": "/shq-life.png",
    "safeguard-homeshifters": "/safeguard-homeshifters.png",
    "flawless-era": "/flawless-era.png",
    "mars-media": "/mars-media.png",
    "nightingale-holidays": "/nightingale-holidays.png",
    "verglas-trading": "/verglas-trading.png",
    "smart-wheels": "/smart-wheels.png",
    "idia-interiors": "/idia-interiors.png",
    "eastern-hemlock": "/eastern-hemlock.png",
    "eat-superhuman": "/eat-superhuman.png"
  }[project.id];

  if (screenshot) {
    return (
      <div className="w-full h-full relative bg-zinc-950 overflow-hidden">
        <img
          src={screenshot}
          alt={project.name}
          className="w-full h-full object-cover object-top animate-fade-in"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  const getThemeColors = () => {
    switch (project.id) {
      case "meachery-furniture":
        return { bg: "bg-[#14110f]", text: "text-[#f2ece4]", primary: "bg-[#d4a373]", primaryText: "text-[#d4a373]", border: "border-[#2b2520]" };
      case "the-consultant-7":
        return { bg: "bg-[#0b101d]", text: "text-white", primary: "bg-blue-500", primaryText: "text-blue-400", border: "border-blue-500/20" };
      case "shq-life":
        return { bg: "bg-[#0a0a0a]", text: "text-white", primary: "bg-[#ff2a2a]", primaryText: "text-[#ff2a2a]", border: "border-red-950" };
      case "safeguard-homeshifters":
        return { bg: "bg-[#090b0e]", text: "text-white", primary: "bg-amber-500", primaryText: "text-amber-400", border: "border-amber-500/20" };
      case "flawless-era":
        return { bg: "bg-[#0a0a0a]", text: "text-[#f3f4f6]", primary: "bg-[#e5e7eb]", primaryText: "text-white", border: "border-zinc-800" };
      case "mars-media":
        return { bg: "bg-[#070707]", text: "text-white", primary: "bg-red-600", primaryText: "text-red-500", border: "border-red-600/20" };
      case "nightingale-holidays":
        return { bg: "bg-[#071c1d]", text: "text-[#e0f2f1]", primary: "bg-[#00a896]", primaryText: "text-[#00a896]", border: "border-[#143e3d]" };
      case "verglas-trading":
        return { bg: "bg-[#080b11]", text: "text-[#e2e8f0]", primary: "bg-cyan-500", primaryText: "text-cyan-400", border: "border-cyan-500/10" };
      case "smart-wheels":
        return { bg: "bg-[#050505]", text: "text-white", primary: "bg-[#5CFF3D]", primaryText: "text-[#5CFF3D]", border: "border-white/10" };
      case "idia-interiors":
        return { bg: "bg-[#f5f4f0]", text: "text-[#1c1917]", primary: "bg-[#292524]", primaryText: "text-[#292524]", border: "border-[#e7e5e4]" };
      case "eastern-hemlock":
        return { bg: "bg-[#16100b]", text: "text-[#f5ebd9]", primary: "bg-[#d48c46]", primaryText: "text-[#d48c46]", border: "border-[#312519]" };
      case "eat-superhuman":
        return { bg: "bg-[#070c08]", text: "text-[#e8f5e9]", primary: "bg-[#4caf50]", primaryText: "text-[#4caf50]", border: "border-[#1b3022]" };
      default:
        return { bg: "bg-[#0a0a0a]", text: "text-white", primary: "bg-[#5CFF3D]", primaryText: "text-[#5CFF3D]", border: "border-white/10" };
    }
  };

  const colors = getThemeColors();
  const isLight = colors.bg.includes("ffffff") || colors.bg.includes("f5f4f0");

  return (
    <div className={`w-full h-full ${colors.bg} ${colors.text} p-3 flex flex-col justify-between text-[6px] select-none font-sans overflow-hidden`}>
      
      {/* Mock Header */}
      <div className={`flex items-center justify-between pb-2 border-b ${colors.border}`}>
        <div className="flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full ${colors.primary}`} />
          <span className="font-bold tracking-tight text-[5px] uppercase">
            {project.name}
          </span>
        </div>
        <div className="flex gap-2 opacity-60 text-[4px]">
          <span>Home</span>
          <span>Gallery</span>
          <span>Pricing</span>
          <span>Contact</span>
        </div>
        <div className={`px-1.5 py-0.5 rounded-sm text-[4px] font-bold ${colors.primary} ${isLight ? "text-white font-black" : "text-black font-black"}`}>
          Launch
        </div>
      </div>

      {/* Mock Page Content Layouts */}
      <div className="flex-1 py-2 flex flex-col justify-center gap-2 overflow-hidden">
        
        {project.id === "meachery-furniture" && (
          <div className="grid grid-cols-2 gap-2 h-full items-center">
            <div className="flex flex-col justify-center gap-1">
              <span className="text-[4px] text-[#d4a373] tracking-wider uppercase font-semibold">Premium Collection</span>
              <h4 className="font-bold text-[9px] tracking-tight leading-tight uppercase font-mono">
                HANDCRAFTED<br />TEAKWOOD CHAIR
              </h4>
              <p className="text-[4.5px] opacity-60 leading-relaxed">
                Exquisite grain patterns meets modern ergonomic design. Built to last.
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="font-bold text-[7px] text-[#d4a373]">$340</span>
                <span className="px-1.5 py-0.5 bg-[#d4a373] text-black font-extrabold rounded-sm scale-90">Add to Cart</span>
              </div>
            </div>
            <div className="h-full bg-white/[0.02] border border-[#2b2520] rounded p-1 flex items-center justify-center relative overflow-hidden">
              <div className="w-[85%] h-[85%] bg-gradient-to-tr from-[#2b2520] to-[#14110f] rounded flex items-center justify-center border border-white/5 relative">
                <ShoppingBag className="w-4 h-4 text-[#d4a373] opacity-35" />
                <span className="absolute bottom-1 right-1 text-[3px] text-zinc-500">Solid Oak</span>
              </div>
            </div>
          </div>
        )}

        {project.id === "the-consultant-7" && (
          <div className="grid grid-cols-4 gap-1.5 h-full items-center">
            <div className={`col-span-3 border ${colors.border} rounded p-1 flex flex-col justify-between h-full bg-black/20`}>
              <div className="flex items-center justify-between text-[4.5px] border-b border-blue-500/10 pb-0.5">
                <span className="font-bold">Advisory Operations Overview</span>
                <span className="text-blue-400 font-bold flex items-center gap-0.5"><div className="w-1 h-1 bg-green-500 rounded-full animate-ping" /> 7 Active</span>
              </div>
              <div className="flex-1 flex items-end gap-1 pb-1 pt-1 h-full min-h-[30px]">
                <div className="w-full bg-blue-500/20 h-[30%] rounded-sm" />
                <div className="w-full bg-blue-500/40 h-[60%] rounded-sm" />
                <div className="w-full bg-blue-500/60 h-[45%] rounded-sm" />
                <div className="w-full bg-blue-500 h-[80%] rounded-sm" />
                <div className="w-full bg-blue-400 h-[95%] rounded-sm" />
              </div>
            </div>
            <div className="flex flex-col gap-1 h-full justify-between col-span-1">
              <div className={`border ${colors.border} rounded p-1 flex flex-col justify-center bg-black/20`}>
                <div className="opacity-50 text-[3.5px]">Active Clients</div>
                <div className="font-bold text-[6px]">124</div>
              </div>
              <div className={`border ${colors.border} rounded p-1 flex flex-col justify-center bg-black/20`}>
                <div className="opacity-50 text-[3.5px]">Success Rate</div>
                <div className="font-bold text-[6px] text-green-400">98.4%</div>
              </div>
            </div>
          </div>
        )}

        {project.id === "shq-life" && (
          <div className="flex h-full items-center justify-between gap-2">
            <div className="flex flex-col justify-center gap-1.5">
              <span className="text-[#ff2a2a] text-[4.5px] font-bold tracking-widest uppercase flex items-center gap-1"><Dumbbell className="w-1.5 h-1.5" /> SHIELD PERFORMANCE</span>
              <h4 className="font-black text-[10px] tracking-tighter leading-none font-mono">
                TRAIN LIKE A<br />SUPERHUMAN
              </h4>
              <p className="text-[4.5px] text-white/50 max-w-[130px]">
                Dynamic coaching calendars and custom performance analytics templates.
              </p>
              <div className="bg-[#ff2a2a] text-white font-bold px-2 py-0.5 rounded-sm w-fit scale-90">
                Book Trainer
              </div>
            </div>
            <div className="w-[85px] h-full bg-[#151515] border border-red-950/40 rounded flex flex-col justify-between p-1 relative overflow-hidden">
              <div className="text-[#ff2a2a] font-bold text-[7px] mt-1">Weekly Plan</div>
              <div className="text-[3.5px] opacity-60 leading-none">Mon: Hypertrophy Chest</div>
              <div className="text-[3.5px] opacity-60 leading-none">Wed: Posterior Chain</div>
              <div className="text-[3.5px] opacity-60 leading-none">Fri: Aerobic Threshold</div>
              <div className="w-full bg-[#ff2a2a]/20 h-1 mt-1.5 overflow-hidden">
                <div className="bg-[#ff2a2a] w-[75%] h-full" />
              </div>
            </div>
          </div>
        )}

        {project.id === "safeguard-homeshifters" && (
          <div className="grid grid-cols-2 gap-2 h-full items-center">
            <div className="flex flex-col justify-center gap-1">
              <span className="text-amber-500 text-[4px] font-semibold uppercase tracking-wider flex items-center gap-0.5"><Truck className="w-1.5 h-1.5" /> Packers & Movers</span>
              <h4 className="font-black text-[9px] leading-tight uppercase font-mono">
                SECURE SHIPPING<br />& LOGISTICS
              </h4>
              <div className="border border-white/5 bg-white/[0.02] p-1 rounded-sm mt-0.5">
                <span className="text-[3.5px] block text-zinc-500">Live Tracker ID:</span>
                <span className="text-[4.5px] font-bold text-amber-400">SG-TRACK-8902</span>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-1 p-1.5 bg-[#141722] border border-zinc-800 rounded h-full">
              <span className="font-bold text-[4.5px] text-amber-400 border-b border-zinc-800 pb-0.5">Route Timeline</span>
              <div className="flex items-center gap-1 text-[3.5px] opacity-80">
                <div className="w-1 h-1 bg-green-500 rounded-full" />
                <span>Cargo Dispatched</span>
              </div>
              <div className="flex items-center gap-1 text-[3.5px] text-amber-400 font-bold">
                <div className="w-1 h-1 bg-amber-400 rounded-full animate-ping" />
                <span>Customs Clearance</span>
              </div>
              <div className="flex items-center gap-1 text-[3.5px] opacity-40">
                <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                <span>Final Destination Delivery</span>
              </div>
            </div>
          </div>
        )}

        {project.id === "flawless-era" && (
          <div className="grid grid-cols-2 gap-2 h-full items-center">
            <div className="flex flex-col justify-center gap-1.5">
              <span className="text-[4px] uppercase tracking-widest opacity-60">Spring Collection</span>
              <h4 className="font-bold text-[9px] tracking-tight leading-tight uppercase font-mono">
                THE IMMERSIVE<br />FASHION LOOKBOOK
              </h4>
              <p className="text-[4px] text-gray-400">
                Bold, premium textures designed with dynamic GSAP scroll layers.
              </p>
              <div className="flex items-center gap-1 text-white border-b border-white w-fit pb-0.5 text-[4px] uppercase">
                Explore garments <ArrowUpRight className="w-1 h-1" />
              </div>
            </div>
            <div className="h-full bg-zinc-900/60 rounded border border-zinc-800/80 flex items-center justify-center p-1.5 relative overflow-hidden">
              <div className="w-full h-full bg-gradient-to-b from-zinc-800 to-zinc-950 rounded flex flex-col justify-between p-1">
                <div className="w-full h-1/2 bg-black/40 rounded flex items-center justify-center text-[3.5px] text-zinc-500 font-mono">MODEL PREVIEW</div>
                <div className="text-[3.5px] text-zinc-400 text-center font-bold">COAT V1 // CHARCOAL</div>
              </div>
            </div>
          </div>
        )}

        {project.id === "mars-media" && (
          <div className="flex flex-col h-full justify-between py-0.5">
            <div className="flex items-center justify-between border-b border-white/5 pb-0.5">
              <span className="text-[4.5px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-0.5"><Film className="w-1.5 h-1.5" /> Mars Production</span>
              <span className="text-[3.5px] opacity-40">24FPS RED RAW</span>
            </div>
            <div className="flex-1 my-1 rounded border border-red-500/20 bg-black flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent z-0" />
              <div className="z-10 flex flex-col items-center gap-0.5">
                <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                  <Play className="w-2.5 h-2.5 text-white fill-white translate-x-[0.5px]" />
                </div>
                <span className="text-[3.5px] font-bold tracking-widest font-mono">WATCH REEL</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[3.5px] opacity-60 font-mono">
              <span>Clients: Porsche, Nike, Emirates</span>
              <span>Dubai, UAE</span>
            </div>
          </div>
        )}

        {project.id === "nightingale-holidays" && (
          <div className="grid grid-cols-5 gap-2 h-full items-center">
            <div className="col-span-3 flex flex-col justify-center gap-1">
              <div className="text-[#00a896] font-bold text-[4px] tracking-wider uppercase flex items-center gap-0.5">
                <Plane className="w-1.5 h-1.5" /> Luxury Escape
              </div>
              <h4 className="font-bold text-[9px] tracking-tight leading-tight font-mono">
                DISCOVER UNCHARTED<br />
                ISLAND RESORTS
              </h4>
              <p className="text-[4.5px] opacity-70 leading-relaxed max-w-[120px]">
                Tailored bookings, scenic villas, and luxury spa escapes.
              </p>
            </div>
            <div className="col-span-2 flex flex-col justify-center gap-1.5 p-1.5 bg-[#0a2729] border border-[#143e3d] rounded">
              <span className="font-bold text-[4px] text-[#00a896] border-b border-[#143e3d] pb-0.5 mb-0.5 font-mono">MALDIVES RETREAT</span>
              <div className="text-[3.5px] opacity-80">Overwater Pool Villa</div>
              <div className="text-[3.5px] text-[#00a896] font-bold">$490/Night</div>
              <div className="px-1.5 py-0.5 bg-[#00a896] text-black font-extrabold text-center rounded-sm scale-90">Book Escape</div>
            </div>
          </div>
        )}

        {project.id === "verglas-trading" && (
          <div className="grid grid-cols-3 gap-1.5 h-full items-center">
            <div className={`col-span-2 border ${colors.border} rounded p-1.5 flex flex-col justify-between h-full bg-black/30`}>
              <div className="flex items-center justify-between text-[4.5px] border-b border-cyan-500/10 pb-0.5">
                <span className="font-bold flex items-center gap-0.5"><Anchor className="w-1.5 h-1.5 text-cyan-400" /> Active Supply Channels</span>
              </div>
              <div className="flex flex-col gap-1 py-1">
                <div>
                  <div className="flex justify-between text-[3.5px] opacity-60"><span>Steel Shipments</span><span>80%</span></div>
                  <div className="w-full bg-cyan-950 h-0.5 rounded-full overflow-hidden"><div className="bg-cyan-500 w-[80%] h-full" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-[3.5px] opacity-60"><span>Copper Logistics</span><span>45%</span></div>
                  <div className="w-full bg-cyan-950 h-0.5 rounded-full overflow-hidden"><div className="bg-cyan-500 w-[45%] h-full" /></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 h-full justify-between col-span-1">
              <div className={`border ${colors.border} rounded p-1 flex flex-col justify-center bg-black/30`}>
                <div className="opacity-50 text-[3.5px]">Imports MTD</div>
                <div className="font-bold text-[6px]">14.2k Tons</div>
              </div>
              <div className={`border ${colors.border} rounded p-1 flex flex-col justify-center bg-[#073030]/20`}>
                <div className="opacity-50 text-[3.5px] text-green-400">Customs status</div>
                <div className="font-bold text-[5.5px] text-green-400">APPROVED</div>
              </div>
            </div>
          </div>
        )}

        {project.id === "smart-wheels" && (
          <div className="grid grid-cols-2 gap-2 h-full items-center">
            <div className="flex flex-col justify-center gap-1">
              <span className="text-[#5CFF3D] text-[4.5px] font-bold tracking-widest uppercase flex items-center gap-0.5"><Car className="w-1.5 h-1.5" /> Hypercar Showroom</span>
              <h4 className="font-black text-[9px] tracking-tighter leading-none font-mono">
                SPECIFICATIONS SHEET
              </h4>
              <div className="text-[3.5px] opacity-60 mt-1 font-mono">
                Engine: 4.0L Twin-Turbo V8<br />
                Power: 620 HP @ 7,500 RPM<br />
                0-100 km/h: 2.9 Seconds
              </div>
            </div>
            <div className="w-full h-full bg-zinc-950 border border-zinc-800 rounded p-1.5 flex flex-col justify-between">
              <div className="h-1/2 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center text-zinc-600 text-[3px] font-mono">CAR 3D INTERACTIVE WIREFRAME</div>
              <div className="flex gap-1 justify-center scale-95 mt-1">
                <span className="px-1.5 py-0.5 bg-[#5CFF3D] text-black font-extrabold rounded-sm text-[3.5px]">Book Drive</span>
                <span className="px-1.5 py-0.5 border border-white/20 text-white rounded-sm text-[3.5px]">Configure</span>
              </div>
            </div>
          </div>
        )}

        {project.id === "idia-interiors" && (
          <div className="grid grid-cols-2 gap-2 h-full items-center text-[#292524]">
            <div className="flex flex-col justify-center gap-1.5">
              <span className="text-[4px] tracking-widest opacity-60 uppercase font-semibold">Interior Design Studio</span>
              <h4 className="font-bold text-[9px] tracking-tight leading-none uppercase font-mono">
                MINIMALIST RESIDENTIAL<br />ARCHITECTURE
              </h4>
              <p className="text-[4px] text-stone-500 leading-normal font-sans">
                Curating stone, concrete, and organic textures with precise spatial lighting layout.
              </p>
            </div>
            <div className="h-full bg-[#eae9e4] border border-[#e7e5e4] rounded p-1 flex flex-col justify-between">
              <span className="text-[3.5px] font-bold border-b border-[#e7e5e4] pb-0.5 font-mono">MOOD BOARD SWATCHES</span>
              <div className="grid grid-cols-3 gap-1 flex-1 py-1">
                <div className="bg-[#dfded9] border border-[#d6d4cd] rounded flex items-center justify-center text-[2.5px] text-stone-500">STONE</div>
                <div className="bg-[#cfccc4] border border-[#c5c1b9] rounded flex items-center justify-center text-[2.5px] text-stone-500">CONCRETE</div>
                <div className="bg-[#b3afaa] border border-[#a8a49f] rounded flex items-center justify-center text-[2.5px] text-stone-500">BRASS</div>
              </div>
            </div>
          </div>
        )}

        {project.id === "eastern-hemlock" && (
          <div className="grid grid-cols-5 gap-2 h-full items-center">
            <div className="col-span-3 flex flex-col justify-center gap-1">
              <div className="text-[#d48c46] font-bold text-[4px] tracking-wider uppercase flex items-center gap-0.5">
                <Coffee className="w-1.5 h-1.5" /> Hardwood Imports
              </div>
              <h4 className="font-bold text-[9px] tracking-tight text-[#f5ebd9] leading-tight font-mono">
                PREMIUM TIMBER &<br />
                LOG SUPPLIES UAE
              </h4>
              <p className="text-[4.5px] text-[#f5ebd9]/60 leading-relaxed max-w-[120px]">
                European Beechwood, African Mahogany, and Redwood trade lines.
              </p>
            </div>
            <div className="col-span-2 flex flex-col justify-center gap-1.5 p-1 bg-[#1c130d] border border-[#312519] rounded">
              <span className="font-bold text-[4px] text-[#d48c46] border-b border-[#312519] pb-0.5 mb-0.5 font-mono">REQUEST RFQ</span>
              <div className="text-[3px] text-zinc-500">Select Species:</div>
              <div className="bg-black/40 border border-[#312519] p-0.5 rounded-sm text-[3.5px] text-zinc-300">European Beechwood</div>
              <div className="px-1.5 py-0.5 bg-[#d48c46] text-black font-extrabold text-center rounded-sm scale-90">Send Inquiry</div>
            </div>
          </div>
        )}

        {project.id === "eat-superhuman" && (
          <div className="grid grid-cols-5 gap-2 h-full items-center">
            <div className="col-span-3 flex flex-col justify-center gap-1">
              <div className="text-[#4caf50] font-bold text-[4px] tracking-wider uppercase flex items-center gap-0.5">
                <Sparkles className="w-1.5 h-1.5" /> Nutrition Bistro
              </div>
              <h4 className="font-bold text-[9px] tracking-tight text-[#e8f5e9] leading-tight font-mono">
                KETO MEALS &<br />
                ORGANIC MEAL PREPS
              </h4>
              <p className="text-[4.5px] text-[#e8f5e9]/65 leading-relaxed max-w-[120px]">
                Calorie calculated diet plans made by organic nutrition experts.
              </p>
            </div>
            <div className="col-span-2 flex flex-col justify-center gap-1 p-1 bg-[#0f1911] border border-[#1b3022] rounded">
              <span className="font-bold text-[4px] text-[#4caf50] border-b border-[#1b3022] pb-0.5 mb-0.5 font-mono">Weekly Special</span>
              <div className="flex justify-between items-center text-[3.5px] opacity-90">
                <span>Avocado Salmon</span>
                <span className="text-[#4caf50] font-bold">$18</span>
              </div>
              <div className="flex justify-between items-center text-[3.5px] opacity-90">
                <span>Keto Ribeye Salad</span>
                <span className="text-[#4caf50] font-bold">$22</span>
              </div>
              <div className="px-1.5 py-0.5 bg-[#4caf50] text-black font-extrabold text-center rounded-sm scale-90 mt-1">Order Now</div>
            </div>
          </div>
        )}

      </div>

      {/* Mock Footer */}
      <div className={`flex items-center justify-between pt-1 border-t ${colors.border} text-white/30 text-[3.5px]`}>
        <span>© {new Date().getFullYear()} {project.name}.</span>
        <div className="flex gap-2">
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
      
    </div>
  );
};
export default LaptopMockup;
