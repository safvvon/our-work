import React from "react";
import { Header } from "../../layouts/Header";
import { FuturisticTeamSection } from "../../components/FuturisticTeamSection";

export const metadata = {
  title: "Our Team | Intellex",
  description:
    "Meet the Intellex Innovators — our dedicated team of architects, engineers, designers, and growth leaders.",
};

export default function TeamPage() {
  return (
    <div className="relative min-h-screen bg-[#09090B] text-white flex flex-col justify-between font-sans overflow-x-hidden selection:bg-[#5CFF3D] selection:text-black">
      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col pt-24 md:pt-28 justify-center">
        {/* Futuristic Meet the Team Section */}
        <FuturisticTeamSection />
      </main>
    </div>
  );
}
