import React from "react";
import { Header } from "../../layouts/Header";
import { Footer } from "../../layouts/Footer";
import { ContactHero } from "./components/ContactHero";
import { ContactForm } from "./components/ContactForm";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col font-sans overflow-x-hidden selection:bg-neonGreen selection:text-black">
      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col pt-20">
        <ContactHero />
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
