"use client";

import React from "react";
import { Header } from "../../layouts/Header";
import { Footer } from "../../layouts/Footer";
import { ContactBackground } from "./components/ContactBackground";
import { ContactHero } from "./components/ContactHero";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-between font-sans overflow-x-hidden selection:bg-cyberGreen selection:text-black">
      {/* Dynamic Cyber Background */}
      <ContactBackground />

      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-center pt-20 pb-2 relative z-10">
        <ContactHero />
      </main>

      {/* Footer */}
      <Footer hideCta />
    </div>
  );
}
