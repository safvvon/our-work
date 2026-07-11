"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Facebook, Instagram, Linkedin, Globe } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/[0.03] bg-[#050505] pt-20 pb-10 px-6 md:px-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-neonGreen/5 blur-[120px] pointer-events-none" />

      {/* Call to Action Grid */}
      <div className="max-w-7xl mx-auto border border-white/[0.05] bg-white/[0.01] rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden backdrop-blur-sm">
        <div className="flex flex-col items-start gap-2">
          <span className="text-xs font-semibold tracking-wider text-neonGreen uppercase font-mono">
            Have a project in mind?
          </span>
          <h3 className="text-2xl md:text-4xl font-bold font-mono tracking-tight leading-tight">
            Let's Build Something<br />
            <span className="text-neonGreen text-glow-green">Amazing Together</span>
          </h3>
        </div>
        <Link
          href="/contact"
          className="flex items-center gap-3 border border-white/20 hover:border-neonGreen px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white hover:text-black hover:bg-neonGreen transition-all duration-300 group shadow-md hover:shadow-[0_0_25px_rgba(92,255,61,0.2)]"
        >
          Get in touch
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="w-5 h-5 border-2 border-neonGreen flex items-center justify-center">
              <div className="w-2 h-2 bg-neonGreen group-hover:scale-125 transition-transform duration-300" />
            </div>
            <span className="font-mono text-base font-black tracking-wider uppercase text-white">
              GREEN<span className="text-neonGreen">FRAME</span>
            </span>
          </Link>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            We create high-performance websites that help brands grow digitally with cinematic user experiences.
          </p>
          <div className="flex items-center gap-3 mt-2">
            {[
              { icon: <Facebook className="w-4 h-4" />, url: "#" },
              { icon: <Instagram className="w-4 h-4" />, url: "#" },
              { icon: <Globe className="w-4 h-4" />, url: "#" },
              { icon: <Linkedin className="w-4 h-4" />, url: "#" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-neonGreen hover:border-neonGreen/50 hover:bg-neonGreen/5 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/80 font-mono">
            Quick Links
          </h4>
          <div className="flex flex-col gap-2.5">
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
                className="text-sm text-white/40 hover:text-neonGreen transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/80 font-mono">
            Services
          </h4>
          <div className="flex flex-col gap-2.5">
            {[
              "Web Design",
              "Web Development",
              "UI/UX Design",
              "SEO Optimization",
              "Maintenance",
            ].map((item) => (
              <span key={item} className="text-sm text-white/40 cursor-default">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/80 font-mono">
            Contact Us
          </h4>
          <div className="flex flex-col gap-3 text-sm text-white/40">
            <Link
              href="/contact"
              className="hover:text-neonGreen transition-colors duration-200 cursor-pointer"
            >
              hello@greenframe.studio
            </Link>
            <span>+1 (213) 456-7890</span>
            <span>www.greenframe.studio</span>
            <span>Los Angeles, CA</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30 font-mono">
        <span>© {new Date().getFullYear()} GreenFrame Studio. All rights reserved.</span>
        <div className="flex items-center gap-6">
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
