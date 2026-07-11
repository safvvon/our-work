"use client";

import React from "react";
import { Monitor, Cpu, Compass, Search, Shield, Zap } from "lucide-react";

export const HomeServices: React.FC = () => {
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
    <section className="w-full py-24 px-6 md:px-12 bg-black/40 border-t border-white/[0.02] relative overflow-hidden">
      
      {/* Background ambient radial glow */}
      <div className="absolute top-[30%] left-[80%] w-[400px] h-[400px] bg-neonGreen/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 z-10 relative">
        
        {/* Header Title */}
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="text-xs font-semibold tracking-wider text-neonGreen font-mono uppercase">
            WHAT WE DO
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight uppercase font-sans">
            Our Core <span className="text-neonGreen text-glow-green">Services</span>
          </h2>
          <p className="text-sm text-white/50 leading-relaxed font-mono mt-1">
            We provide comprehensive web development services following modern frontend standards, scaling your product from design to launch.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => (
            <div
              key={idx}
              className="border border-white/[0.04] bg-white/[0.005] hover:border-neonGreen/30 hover:bg-white/[0.015] p-8 rounded-3xl backdrop-blur-md transition-all duration-300 group hover:-translate-y-1 select-none relative overflow-hidden"
            >
              {/* Top active lighting guide */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neonGreen/0 to-transparent group-hover:via-neonGreen/40 transition-all duration-500" />

              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl border border-white/5 flex items-center justify-center bg-white/[0.01] mb-6 group-hover:scale-105 group-hover:border-neonGreen/20 transition-all duration-300">
                {svc.icon}
              </div>

              {/* Text elements */}
              <h3 className="text-lg font-bold font-sans mb-3 text-white group-hover:text-neonGreen transition-colors duration-300">
                {svc.title}
              </h3>
              <p className="text-xs font-sans text-white/40 leading-relaxed">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeServices;
