"use client";

import React, { useState } from "react";
import { Header } from "../../layouts/Header";
import { HomeHero } from "./components/HomeHero";

export default function HomePage() {
  const [showServices, setShowServices] = useState(false);

  return (
    <div className="relative h-screen h-dvh w-full bg-[#050505] text-white flex flex-col justify-between font-sans overflow-hidden select-none selection:bg-neonGreen selection:text-black">
      {/* Navigation Header */}
      <Header />

      {/* Main Sections */}
      <main className="flex-1 w-full flex flex-col pt-0 relative">
        <HomeHero />
      </main>
    </div>
  );
}
