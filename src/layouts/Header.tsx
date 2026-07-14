"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const leftNavItems = [
    { name: "Our Work", path: "/works" },
    { name: "Technology", path: "/#services" },
  ];

  const rightNavItems = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const allNavItems = [
    { name: "Our Work", path: "/works" },
    { name: "Technology", path: "/#services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl font-sans select-none pointer-events-auto">
        {/* Main Glass Capsule Wrapper */}
        <div className="glass-capsule rounded-full py-3.5 px-6 md:px-8 flex items-center justify-between relative overflow-visible">
          
          {/* Backlight glow behind the center logo (only on desktop where center is middle) */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 nav-backlight" />

          {/* Mobile Layout & Logo */}
          <div className="flex md:hidden w-full items-center justify-between relative z-50">
            <Link href="/" className="relative z-10 flex items-center cursor-pointer group">
              <span className="font-neuropol text-base font-bold tracking-widest text-neonGreen text-glow-green uppercase select-none">
                INTELLEX
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-neonGreen transition-colors duration-200 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Left Nav Items */}
          <div className="hidden md:flex items-center gap-8 w-1/3 justify-end pr-4">
            {leftNavItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative py-1 ${
                    isActive
                      ? "text-neonGreen text-glow-green"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neonGreen shadow-[0_0_8px_#5CFF3D]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Center Logo */}
          <div className="hidden md:flex w-1/3 justify-center">
            <Link href="/" className="relative z-10 flex items-center cursor-pointer group">
              <span className="font-neuropol text-base font-bold tracking-[0.25em] text-neonGreen text-glow-green uppercase transition-all duration-300 group-hover:scale-105">
                INTELLEX
              </span>
            </Link>
          </div>

          {/* Desktop Right Nav Items */}
          <div className="hidden md:flex items-center gap-8 w-1/3 justify-start pl-4">
            {rightNavItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative py-1 ${
                    isActive
                      ? "text-neonGreen text-glow-green"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neonGreen shadow-[0_0_8px_#5CFF3D]" />
                  )}
                </Link>
              );
            })}
          </div>

        </div>
      </header>

      {/* Mobile Menu Slide-over Panel */}
      <div
        className={`fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl transition-all duration-500 md:hidden flex flex-col justify-center items-center gap-8 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {allNavItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-bold uppercase tracking-widest transition-all duration-300 py-2 ${
                  isActive
                    ? "text-neonGreen text-glow-green"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};
