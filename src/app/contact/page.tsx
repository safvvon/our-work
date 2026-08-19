"use client";

import React from "react";
import { Header } from "../../layouts/Header";
import { Footer } from "../../layouts/Footer";
import { ContactBackground } from "./components/ContactBackground";
import { ContactHero } from "./components/ContactHero";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQSection } from "./components/FAQSection";
import { GoogleMapSection } from "./components/GoogleMapSection";
import { FinalCTA } from "./components/FinalCTA";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-x-hidden selection:bg-cyberGreen selection:text-black">
      {/* Dynamic Cyber Background */}
      <ContactBackground />

      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col pt-20 relative z-10">
        <ContactHero />
        <WhyChooseUs />
        <TestimonialsSection />
        <FAQSection />
        <GoogleMapSection />
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
