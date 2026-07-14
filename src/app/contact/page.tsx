"use client";

import React, { useRef } from "react";
import { Header } from "../../layouts/Header";
import { Footer } from "../../layouts/Footer";
import { ContactBackground } from "./components/ContactBackground";
import { ContactHero } from "./components/ContactHero";
import { ContactForm } from "./components/ContactForm";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQSection } from "./components/FAQSection";
import { GoogleMapSection } from "./components/GoogleMapSection";
import { FinalCTA } from "./components/FinalCTA";

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement | null>(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-x-hidden selection:bg-cyberGreen selection:text-black">
      {/* Dynamic Cyber Background */}
      <ContactBackground />

      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col pt-20 relative z-10">
        <ContactHero onScrollToForm={scrollToForm} />
        
        {/* Scroll anchor target wrapper */}
        <div ref={formRef} className="scroll-mt-24">
          <ContactForm />
        </div>

        <WhyChooseUs />
        <TestimonialsSection />
        <FAQSection />
        <GoogleMapSection />
        <FinalCTA onScrollToForm={scrollToForm} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
