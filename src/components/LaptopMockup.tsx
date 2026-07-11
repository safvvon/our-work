"use client";

import React, { useEffect, useState } from "react";
import { Project } from "../types/portfolio";
import { Monitor, Smartphone, Sparkles, ShoppingBag, Landmark, Coffee, Heart, ArrowUpRight, BarChart2 } from "lucide-react";

interface LaptopMockupProps {
  activeProject: Project;
}

export const LaptopMockup: React.FC<LaptopMockupProps> = ({ activeProject }) => {
  const [prevProject, setPrevProject] = useState<Project | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (activeProject && (!prevProject || activeProject.id !== prevProject.id)) {
      setTransitioning(true);
      const timer = setTimeout(() => {
        setPrevProject(activeProject);
        setTransitioning(false);
      }, 300); // Crossfade transition time
      return () => clearTimeout(timer);
    }
  }, [activeProject, prevProject]);

  const displayProject = prevProject || activeProject;

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 select-none">
      {/* 3D Laptop Container with Floating Animation */}
      <div className="relative w-full max-w-[620px] transition-transform duration-500 hover:scale-[1.02] active:scale-[0.98] animate-[float_6s_ease-in-out_infinite]">
        
        {/* Screen Bezel */}
        <div className="relative mx-auto w-[90%] aspect-[16/10] bg-[#0c0c0c] border-[8px] border-[#1d1d1f] rounded-t-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Screen Content Frame */}
          <div className="w-full h-full relative bg-[#121212] overflow-hidden">
            
            {/* Screen Glass Reflection */}
            <div className="absolute inset-0 z-20 laptop-reflection pointer-events-none" />
            
            {/* Webcam */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#1d1d1f] rounded-full z-30 flex items-center justify-center">
              <div className="w-0.5 h-0.5 bg-[#444] rounded-full" />
            </div>

            {/* Active Webpage Rendering */}
            <div className={`w-full h-full transition-opacity duration-300 ${transitioning ? "opacity-30 scale-95" : "opacity-100 scale-100"}`}>
              <MockWebsiteScreen project={displayProject} />
            </div>
            
          </div>
        </div>

        {/* Laptop Base (Keyboard Part) */}
        <div className="relative mx-auto w-[100%] h-[12px] bg-gradient-to-b from-[#e2e2e5] via-[#a1a1a5] to-[#747477] rounded-b-lg shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-10 flex justify-center">
          {/* Base indent / opening notch */}
          <div className="w-[80px] h-[3px] bg-[#3a3a3c] rounded-b-md" />
        </div>
        
        {/* Keyboard bottom shelf */}
        <div className="relative mx-auto w-[98%] h-[3px] bg-[#2d2d30] rounded-b-xl opacity-80" />

        {/* Floating Shadow Beneath Laptop */}
        <div className="absolute -bottom-12 left-[10%] w-[80%] h-8 bg-black/60 rounded-full blur-xl -z-10 scale-90 animate-[shadowPulse_6s_ease-in-out_infinite]" />
      </div>
    </div>
  );
};

// Sub-component to render custom mock page structures
const MockWebsiteScreen: React.FC<{ project: Project }> = ({ project }) => {
  // Select color palettes based on template type
  const getThemeColors = () => {
    switch (project.mockLayoutType) {
      case "dashboard":
      case "ai":
        return { bg: "bg-[#0b0f19]", text: "text-white", primary: "bg-blue-500", primaryText: "text-blue-400", border: "border-blue-500/20" };
      case "fashion":
      case "interior":
        return { bg: "bg-[#f9f8f6]", text: "text-gray-900", primary: "bg-gray-900", primaryText: "text-gray-900", border: "border-gray-200" };
      case "coffee":
      case "restaurant":
        return { bg: "bg-[#18110b]", text: "text-[#f5ebd9]", primary: "bg-[#c68b59]", primaryText: "text-[#c68b59]", border: "border-[#312519]" };
      case "gym":
        return { bg: "bg-[#0a0a0a]", text: "text-white", primary: "bg-[#ff2a2a]", primaryText: "text-[#ff2a2a]", border: "border-red-950" };
      case "healthcare":
      case "dental":
        return { bg: "bg-[#ffffff]", text: "text-[#1e293b]", primary: "bg-[#0ea5e9]", primaryText: "text-[#0ea5e9]", border: "border-slate-100" };
      default:
        return { bg: "bg-[#0a0a0a]", text: "text-white", primary: "bg-[#5CFF3D]", primaryText: "text-[#5CFF3D]", border: "border-white/10" };
    }
  };

  const colors = getThemeColors();
  const isLight = colors.bg.includes("ffffff") || colors.bg.includes("f9f8f6");

  return (
    <div className={`w-full h-full ${colors.bg} ${colors.text} p-3 flex flex-col justify-between text-[6px] select-none font-sans overflow-hidden`}>
      
      {/* Mock Header */}
      <div className={`flex items-center justify-between pb-2 border-b ${colors.border}`}>
        <div className="flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full ${colors.primary}`} />
          <span className="font-bold tracking-tight text-[5px] uppercase">
            {project.name.split(" ")[0]}
          </span>
        </div>
        <div className="flex gap-2 opacity-60 text-[4px]">
          <span>Services</span>
          <span>Cases</span>
          <span>Careers</span>
          <span>Contact</span>
        </div>
        <div className={`px-1.5 py-0.5 rounded-sm text-[4px] font-bold ${colors.primary} ${isLight ? "text-white" : "text-black"}`}>
          Launch App
        </div>
      </div>

      {/* Mock Page Content Layouts based on industry */}
      <div className="flex-1 py-2 flex flex-col justify-center gap-2 overflow-hidden">
        
        {project.mockLayoutType === "dashboard" ? (
          /* DASHBOARD LAYOUT */
          <div className="grid grid-cols-3 gap-1.5 h-full items-center">
            <div className={`col-span-2 border ${colors.border} rounded p-1.5 flex flex-col gap-1.5 h-full justify-between bg-black/20`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[5px]">Cloud Operations Overview</span>
                <span className="text-blue-400 font-bold">Live Status</span>
              </div>
              {/* Fake Chart Graphic */}
              <div className="flex-1 flex items-end gap-1 pb-1 pt-1 h-full min-h-[30px]">
                <div className="w-full bg-blue-500/20 h-[30%] rounded-sm" />
                <div className="w-full bg-blue-500/40 h-[60%] rounded-sm" />
                <div className="w-full bg-blue-500/60 h-[45%] rounded-sm animate-pulse" />
                <div className="w-full bg-blue-500/30 h-[80%] rounded-sm" />
                <div className="w-full bg-blue-500 h-[75%] rounded-sm" />
                <div className="w-full bg-blue-400 h-[95%] rounded-sm" />
              </div>
            </div>
            <div className="flex flex-col gap-1 h-full justify-between">
              <div className={`border ${colors.border} rounded p-1 flex items-center justify-between bg-black/20`}>
                <div>
                  <div className="opacity-50 text-[4px]">Load Factor</div>
                  <div className="font-bold text-[6px]">1.82 Gbps</div>
                </div>
                <BarChart2 className="w-2 h-2 text-blue-400" />
              </div>
              <div className={`border ${colors.border} rounded p-1 flex items-center justify-between bg-black/20`}>
                <div>
                  <div className="opacity-50 text-[4px]">CPU Usage</div>
                  <div className="font-bold text-[6px] text-green-400">22.4%</div>
                </div>
                <Sparkles className="w-2 h-2 text-green-400" />
              </div>
              <div className={`border ${colors.border} rounded p-1 flex items-center justify-between bg-black/20`}>
                <div>
                  <div className="opacity-50 text-[4px]">Database Nodes</div>
                  <div className="font-bold text-[6px] text-yellow-400">99.9%</div>
                </div>
                <Landmark className="w-2 h-2 text-yellow-400" />
              </div>
            </div>
          </div>
        ) : project.mockLayoutType === "ai" ? (
          /* AI STARTUP LAYOUT */
          <div className="flex flex-col items-center justify-center text-center gap-1.5 h-full">
            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[4px] font-semibold animate-pulse">
              <Sparkles className="w-1.5 h-1.5" />
              Next Gen Core v3 Active
            </div>
            <h4 className="font-black text-[9px] tracking-tight leading-tight max-w-[200px] font-mono">
              COGNITIVE BRAIN<br />
              <span className="text-purple-400">FOR APPLICATIONS</span>
            </h4>
            <p className="text-[4.5px] opacity-60 max-w-[150px]">
              Compile data structures, query models, and build integrations in microseconds.
            </p>
            <div className="flex gap-1.5 mt-1">
              <div className="bg-purple-500 text-white px-2 py-0.5 rounded-sm font-bold shadow-[0_0_8px_rgba(168,85,247,0.4)]">Get API Key</div>
              <div className="border border-white/20 px-2 py-0.5 rounded-sm font-bold">Docs</div>
            </div>
          </div>
        ) : project.mockLayoutType === "fashion" ? (
          /* FASHION LOOKBOOK */
          <div className="grid grid-cols-2 gap-2 h-full items-center">
            <div className="flex flex-col justify-center gap-1.5 p-1">
              <span className="text-[4px] uppercase tracking-widest opacity-60">Spring Summer '26</span>
              <h4 className="font-bold text-[10px] tracking-tight leading-tight uppercase font-mono">
                THE MINIMALIST<br />LOOKBOOK
              </h4>
              <p className="text-[4.5px] text-gray-500 leading-relaxed">
                Clean lines, organic canvas, and curated aesthetic structures tailored for utility.
              </p>
              <div className="flex items-center gap-1 text-gray-900 font-bold border-b border-gray-900 w-fit pb-0.5 text-[4px] uppercase cursor-pointer">
                Discover items <ArrowUpRight className="w-1 h-1" />
              </div>
            </div>
            {/* Fake Fashion Image (Styled grid of shapes) */}
            <div className="h-full bg-gray-200 rounded relative overflow-hidden flex items-center justify-center p-2">
              <div className="w-[80%] h-[90%] bg-gray-300 rounded shadow-md relative overflow-hidden">
                <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-gray-400/50" />
                <div className="absolute bottom-0 right-0 w-[80%] h-12 bg-gray-400 rounded-tl-xl" />
              </div>
            </div>
          </div>
        ) : project.mockLayoutType === "gym" ? (
          /* GYM / SPORT LAYOUT */
          <div className="flex h-full items-center justify-between gap-2 p-1">
            <div className="flex flex-col justify-center gap-1">
              <span className="text-[#ff2a2a] text-[4px] font-bold tracking-widest uppercase">No Limits</span>
              <h4 className="font-black text-[10px] tracking-tighter leading-none font-mono">
                PUNCH HARDER<br />SWEAT MORE
              </h4>
              <p className="text-[4.5px] text-white/50 max-w-[130px]">
                High intensity training systems and nutrition plans designed by professional coaches.
              </p>
              <div className="bg-[#ff2a2a] hover:bg-red-700 text-white font-bold px-2 py-0.5 rounded-sm w-fit mt-1">
                Start Trial
              </div>
            </div>
            {/* Athletic graphics */}
            <div className="w-[80px] h-full bg-[#151515] border border-red-950/40 rounded flex flex-col justify-between p-1.5 relative overflow-hidden">
              <div className="w-6 h-6 rounded-full border border-red-500/20 absolute -right-2 -top-2 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-red-500/10" />
              </div>
              <div className="text-[#ff2a2a] font-bold text-[8px] mt-2">120+</div>
              <div className="text-[3.5px] opacity-40 leading-none">Completed Sessions</div>
              <div className="w-full bg-[#ff2a2a]/20 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#ff2a2a] w-[70%] h-full" />
              </div>
            </div>
          </div>
        ) : project.mockLayoutType === "ecommerce" ? (
          /* ECOMMERCE STORE */
          <div className="flex flex-col gap-1.5 h-full justify-between py-1">
            <div className="flex justify-between items-center px-1">
              <span className="font-bold text-[5.5px]">Trending Products</span>
              <span className="text-[4px] opacity-60 flex items-center gap-0.5">
                <ShoppingBag className="w-1 h-1" /> View Cart (2)
              </span>
            </div>
            {/* Products grid */}
            <div className="grid grid-cols-4 gap-1 flex-1">
              {[
                { name: "Urban Pack", price: "$85", label: "New" },
                { name: "Apex Cap", price: "$24", label: "Sale" },
                { name: "Knit Tee", price: "$42", label: "" },
                { name: "Trail Shoe", price: "$120", label: "Hot" }
              ].map((prod, idx) => (
                <div key={idx} className="bg-white/5 border border-white/5 rounded p-1 flex flex-col justify-between">
                  <div className="aspect-square bg-white/[0.03] rounded relative flex items-center justify-center overflow-hidden mb-1">
                    {prod.label && (
                      <span className="absolute top-0.5 left-0.5 px-0.5 bg-neonGreen text-black text-[3px] font-bold rounded">
                        {prod.label}
                      </span>
                    )}
                    <ShoppingBag className="w-3 h-3 opacity-20 text-neonGreen" />
                  </div>
                  <div className="truncate text-[4.5px] font-bold">{prod.name}</div>
                  <div className="text-[4px] text-neonGreen font-semibold">{prod.price}</div>
                </div>
              ))}
            </div>
          </div>
        ) : project.mockLayoutType === "restaurant" || project.mockLayoutType === "coffee" ? (
          /* CAFE & FOOD */
          <div className="grid grid-cols-5 gap-2 h-full items-center">
            <div className="col-span-3 flex flex-col justify-center gap-1">
              <div className="text-[#c68b59] font-bold text-[4px] tracking-wider uppercase flex items-center gap-0.5">
                <Coffee className="w-1 h-1" /> Premium Beans
              </div>
              <h4 className="font-bold text-[9px] tracking-tight text-[#f5ebd9] leading-tight font-mono">
                A CUP OF WARMTH<br />
                TO START YOUR DAY
              </h4>
              <p className="text-[4.5px] text-[#f5ebd9]/60 leading-relaxed max-w-[120px]">
                Artisanal beans sourced globally, roasted locally, and brewed with precision.
              </p>
            </div>
            {/* Cafe Menu list */}
            <div className="col-span-2 flex flex-col justify-center gap-1.5 p-1 bg-[#120c08] border border-[#312519] rounded">
              <span className="font-bold text-[4.5px] text-[#c68b59] border-b border-[#312519] pb-0.5 mb-0.5">Menu Highlights</span>
              <div className="flex justify-between items-center text-[3.5px]">
                <span>Espresso Romano</span>
                <span className="text-[#c68b59] font-bold">$3.50</span>
              </div>
              <div className="flex justify-between items-center text-[3.5px]">
                <span>Nitro Cold Brew</span>
                <span className="text-[#c68b59] font-bold">$4.50</span>
              </div>
              <div className="flex justify-between items-center text-[3.5px]">
                <span>Caramel Cortado</span>
                <span className="text-[#c68b59] font-bold">$4.20</span>
              </div>
            </div>
          </div>
        ) : (
          /* CORPORATE / DEFAULT LANDING PAGE */
          <div className="flex flex-col items-start justify-center gap-1.5 p-1.5 h-full">
            <div className="flex items-center gap-0.5 text-neonGreen font-semibold tracking-wider text-[4px] uppercase">
              <Sparkles className="w-1 h-1" /> Custom Agency Solution
            </div>
            <h4 className="font-black text-[11px] leading-tight tracking-tight max-w-[180px] uppercase font-mono">
              NEXT GEN DIGITAL<br />
              <span className="text-neonGreen text-glow-green">CONSULTING SOLUTIONS</span>
            </h4>
            <p className="text-[5px] text-white/50 max-w-[160px] leading-normal">
              High-performance technology grids, optimized web metrics, and customized UX layouts designed to maximize your conversions.
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <button className="bg-neonGreen text-black font-bold px-2 py-0.5 rounded-sm">Get Started</button>
              <button className="border border-white/20 px-2 py-0.5 rounded-sm font-bold flex items-center gap-0.5">
                Our Work <ArrowUpRight className="w-1 h-1" />
              </button>
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
