import React from "react";
import { Header } from "../../layouts/Header";
import { Footer } from "../../layouts/Footer";
import { TeamHero } from "./components/TeamHero";
import { TeamGrid } from "./components/TeamGrid";

export default function TeamPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-x-hidden selection:bg-neonGreen selection:text-black">
      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col pt-20">
        <TeamHero />
        <TeamGrid />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
