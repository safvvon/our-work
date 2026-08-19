import React from "react";
import { Header } from "../../layouts/Header";
import { HomeHero } from "./components/HomeHero";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-x-hidden selection:bg-neonGreen selection:text-black">
      {/* Navigation Header */}
      <Header />

      {/* Main Sections */}
      <main className="flex-1 w-full flex flex-col pt-20">
        <HomeHero />
      </main>
    </div>
  );
}
