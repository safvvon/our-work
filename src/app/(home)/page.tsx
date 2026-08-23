"use client";

import React, { useState } from "react";
import { Header } from "../../layouts/Header";
import { HomeHero } from "./components/HomeHero";
import { HomeServicesModal } from "./components/HomeServicesModal";
import { Activity, Layers } from "lucide-react";

export default function HomePage() {
  const [showServices, setShowServices] = useState(false);

  return (
    <div className="relative h-screen h-dvh w-full bg-[#050505] text-white flex flex-col justify-between font-sans overflow-hidden select-none selection:bg-neonGreen selection:text-black">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Viewport Area */}
      <main className="flex-1 w-full flex flex-col items-center justify-center relative z-10 pt-16 md:pt-20 pb-2 px-4 overflow-hidden">
        <HomeHero onOpenServices={() => setShowServices(true)} />
      </main>

      {/* Non-scrollable Viewport Bottom Bar */}
      <footer className="w-full border-t border-white/[0.04] bg-black/60 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between z-20 text-[11px] font-mono text-white/40">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-neonGreen">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">SYSTEM:</span> ONLINE
          </span>
          <span className="hidden md:inline text-white/20">•</span>
          <span className="hidden md:inline text-white/50">100% Custom Layouts</span>
          <span className="hidden lg:inline text-white/20">•</span>
          <span className="hidden lg:inline text-white/50">React 19 Native</span>
        </div>

        <button
          onClick={() => setShowServices(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neonGreen/30 bg-neonGreen/10 text-neonGreen hover:bg-neonGreen hover:text-black transition-all duration-300 font-bold uppercase text-[10px] tracking-wider"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Core Services</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-white/30">SEO Core Built</span>
          <span>© INTELLEX</span>
        </div>
      </footer>

      {/* Services Modal Overlay */}
      {showServices && (
        <HomeServicesModal onClose={() => setShowServices(false)} />
      )}
    </div>
  );
}
