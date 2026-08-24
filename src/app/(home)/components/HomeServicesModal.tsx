"use client";

import React, { useEffect } from "react";
import { Monitor, Cpu, Compass, Search, Shield, Zap, X } from "lucide-react";

interface HomeServicesModalProps {
  onClose: () => void;
}

export const HomeServicesModal: React.FC<HomeServicesModalProps> = ({ onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const services = [
    {
      icon: <Monitor className="w-6 h-6 text-neonGreen" />,
      title: "Creative Web Design",
      desc: "Bespoke interface designs with cinematic layouts, premium typography, and smooth micro-animations tailored for luxury brands.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-neonGreen" />,
      title: "Next.js Development",
      desc: "Robust full-stack applications leveraging Next.js App Router, React 19, TypeScript, and optimized CSS structures for premium stability.",
    },
    {
      icon: <Compass className="w-6 h-6 text-neonGreen" />,
      title: "UI/UX Strategy",
      desc: "Deep user-journey maps, wireframes, and interface audits designed to streamline visual logic and maximize consumer conversion rates.",
    },
    {
      icon: <Search className="w-6 h-6 text-neonGreen" />,
      title: "SEO Optimization",
      desc: "Pristine meta structures, server-rendered components, and speed index refinements guaranteeing high rankings in search engines.",
    },
    {
      icon: <Shield className="w-6 h-6 text-neonGreen" />,
      title: "Maintenance & Support",
      desc: "Regular dependencies upgrades, code refactoring, database backups, and security monitoring to ensure continuous 24/7 server uptime.",
    },
    {
      icon: <Zap className="w-6 h-6 text-neonGreen" />,
      title: "Speed Optimization",
      desc: "Image compression, lazy loading, script deferment, and bundle minimization to deliver near-instant loading metrics globally.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Glass Modal Window */}
      <div className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto bg-[#0a0a0c]/90 border border-neonGreen/30 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(92,255,61,0.15)] z-10 custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/10 text-white/60 hover:text-neonGreen hover:border-neonGreen/40 hover:bg-neonGreen/10 transition-all duration-200"
          aria-label="Close Services Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col gap-2 mb-8">
          <span className="text-xs font-semibold tracking-widest text-neonGreen font-mono uppercase">
            WHAT WE DO
          </span>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight uppercase font-sans">
            Our Core <span className="text-neonGreen text-glow-green">Services</span>
          </h2>
          <p className="text-xs md:text-sm text-white/50 leading-relaxed font-mono mt-1 max-w-2xl">
            We provide comprehensive web development services following modern frontend standards, scaling your product from initial design to global launch.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, idx) => (
            <div
              key={idx}
              className="border border-white/[0.06] bg-white/[0.015] hover:border-neonGreen/40 hover:bg-white/[0.03] p-6 rounded-2xl backdrop-blur-md transition-all duration-300 group select-none relative overflow-hidden flex flex-col justify-between"
            >
              {/* Top active lighting guide */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neonGreen/0 to-transparent group-hover:via-neonGreen/50 transition-all duration-500" />

              <div>
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center bg-white/[0.02] mb-4 group-hover:scale-105 group-hover:border-neonGreen/30 transition-all duration-300">
                  {svc.icon}
                </div>

                {/* Text elements */}
                <h3 className="text-base font-bold font-sans mb-2 text-white group-hover:text-neonGreen transition-colors duration-300">
                  {svc.title}
                </h3>
                <p className="text-xs font-sans text-white/50 leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeServicesModal;
