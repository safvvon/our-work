import React from "react";
import { Header } from "../../layouts/Header";
import { Footer } from "../../layouts/Footer";
import { HomeHero } from "./components/HomeHero";
import { HomeServices } from "./components/HomeServices";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-x-hidden selection:bg-neonGreen selection:text-black">
      {/* Navigation Header */}
      <Header />

      {/* Main Sections */}
      <main className="flex-1 w-full flex flex-col pt-20">
        <HomeHero />
        <HomeServices />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
