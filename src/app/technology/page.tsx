import React from "react";
import { Header } from "../../layouts/Header";
import { Footer } from "../../layouts/Footer";
import { FuturisticTeamSection } from "../../components/FuturisticTeamSection";

export const metadata = {
  title: "Technology & Innovators | Intellex",
  description:
    "Explore Intellex's cutting-edge technology stack and meet our team of dedicated engineers, AI architects, designers, and innovators.",
};

export default function TechnologyPage() {
  return (
    <div className="relative min-h-screen bg-[#09090B] text-white flex flex-col font-sans overflow-x-hidden selection:bg-[#5CFF3D] selection:text-black">
      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col pt-24 md:pt-28">
        {/* Futuristic Meet the Team Section */}
        <FuturisticTeamSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
