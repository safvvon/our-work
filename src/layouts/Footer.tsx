"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Facebook, Instagram, Linkedin, Globe } from "lucide-react";

interface FooterProps {
  minimal?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ minimal = false }) => {
  if (minimal) {
    return (
      <footer className="w-full border-t border-white/[0.03] bg-[#050505] py-10 px-6 md:px-12 relative overflow-hidden">
        {/* Background radial glow */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-neonGreen/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Intellex Logo */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-neonGreen flex items-center justify-center">
              <div className="w-2 h-2 bg-neonGreen" />
            </div>
            <span className="font-neuropol text-base font-bold tracking-widest uppercase text-white">
              INTELLEX
            </span>
          </div>

          {/* Copyright */}
          <span className="text-xs text-white/30 font-mono">
            © {new Date().getFullYear()} Intellex. All rights reserved.
          </span>
        </div>
      </footer>
    );
  }

  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  return (
    <footer className={`w-full border-t border-white/[0.03] bg-[#050505] pt-10 md:pt-16 pb-8 md:pb-10 px-4 sm:px-6 md:px-12 relative overflow-hidden z-10 ${className}`}>
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-neonGreen/5 blur-[100px] sm:blur-[120px] pointer-events-none" />

      {/* Call to Action Grid */}
      <div className="max-w-7xl mx-auto border border-white/[0.06] bg-white/[0.015] rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-10 mb-8 md:mb-14 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-8 relative overflow-hidden backdrop-blur-md">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5 sm:gap-2">
          <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-neonGreen uppercase font-mono">
            Have a project in mind?
          </span>
          <h3 className="text-2xl md:text-4xl font-bold font-mono tracking-tight leading-tight">
            Let <span className="text-neonGreen" style={{ textShadow: '0 0 8px rgba(92, 255, 61, 0.4), 0 0 20px rgba(92, 255, 61, 0.2)' }}>Young</span> do
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-sans tracking-tight leading-tight">
            Let's Build Something<br className="hidden sm:inline" />{" "}
            <span className="text-neonGreen text-glow-green">Amazing Together</span>
          </h3>
        </div>
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2.5 sm:gap-3 border border-white/20 hover:border-neonGreen px-6 py-3 sm:px-8 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-black hover:bg-neonGreen transition-all duration-300 group shadow-md hover:shadow-[0_0_25px_rgba(92,255,61,0.3)] w-full sm:w-auto shrink-0"
        >
          Get in touch
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-8 md:mb-14 text-left">
        {/* Brand Column */}
        <div className="flex flex-col items-start gap-3 col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="w-5 h-5 border-2 border-neonGreen flex items-center justify-center">
              <div className="w-2 h-2 bg-neonGreen group-hover:scale-125 transition-transform duration-300" />
            </div>
            <span className="font-mono text-base font-extrabold tracking-widest uppercase text-white">
              INTELLEX
            </span>
          </Link>
          <p className="text-white/40 text-xs leading-relaxed max-w-xs">
            We create high-performance websites that help brands grow digitally with cinematic user experiences.
          </p>
          <div className="flex items-center gap-2.5 mt-1">
            {[
              { icon: <Facebook className="w-3.5 h-3.5" />, url: "#" },
              { icon: <Instagram className="w-3.5 h-3.5" />, url: "#" },
              { icon: <Globe className="w-3.5 h-3.5" />, url: "#" },
              { icon: <Linkedin className="w-3.5 h-3.5" />, url: "#" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-neonGreen hover:border-neonGreen/50 hover:bg-neonGreen/5 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-start gap-2.5">
          <h4 className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/80 font-mono">
            Quick Links
          </h4>
          <div className="flex flex-col items-start gap-1.5 sm:gap-2">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Meet Team", path: "/team" },
              { name: "Our Works", path: "/works" },
              { name: "Contact Us", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-xs text-white/40 hover:text-neonGreen transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-col items-start gap-2.5">
          <h4 className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/80 font-mono">
            Services
          </h4>
          <div className="flex flex-col items-start gap-1.5 sm:gap-2">
            {[
              "Web Design",
              "Web Development",
              "UI/UX Design",
              "SEO Optimization",
              "Maintenance",
            ].map((item) => (
              <span key={item} className="text-xs text-white/40 cursor-default">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div className="flex flex-col items-start gap-2.5 col-span-2 md:col-span-1">
          <h4 className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/80 font-mono">
            Contact Us
          </h4>
          <div className="flex flex-col items-start gap-2 text-xs text-white/40">
            <a
              href="mailto:web.intellex@gmail.com"
              className="hover:text-neonGreen transition-colors duration-200 cursor-pointer"
            >
              web.intellex@gmail.com
            </a>
            <a
              href="tel:+918590074043"
              className="hover:text-neonGreen transition-colors duration-200 cursor-pointer"
            >
              +91 85900 74043
            </a>
            <span>www.intellex.studio</span>
            <span>Moodabidri, Mangalore, India</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto border-t border-white/[0.04] pt-5 md:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] sm:text-xs text-white/30 font-mono">
        <span>© {new Date().getFullYear()} Intellex. All rights reserved.</span>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#" className="hover:text-neonGreen transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-neonGreen transition-colors">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};
