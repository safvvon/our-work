import React from "react";
import { Header } from "../../layouts/Header";
import { Footer } from "../../layouts/Footer";
import { AboutHero } from "./components/AboutHero";
import { AboutTimeline } from "./components/AboutTimeline";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-x-hidden selection:bg-neonGreen selection:text-black">
      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col pt-20">
        <AboutHero />
        <AboutTimeline />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
