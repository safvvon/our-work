"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export const Header: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Meet Team", path: "/team" },
    { name: "Our Works", path: "/works" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/[0.03] bg-[#050505]/70 backdrop-blur-md px-6 md:px-12 py-5 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 cursor-pointer group">
        <div className="w-6 h-6 border-2 border-neonGreen flex items-center justify-center relative overflow-hidden">
          <div className="w-2.5 h-2.5 bg-neonGreen transition-transform duration-300 group-hover:scale-125" />
        </div>
        <span className="font-mono text-lg font-black tracking-wider uppercase select-none">
          GREEN<span className="text-neonGreen">FRAME</span>
        </span>
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 relative py-1 ${
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
      </nav>

      {/* Let's Talk CTA */}
      <Link
        href="/contact"
        className="flex items-center gap-2 border border-neonGreen px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-neonGreen hover:bg-neonGreen hover:text-black transition-all duration-300 group shadow-[0_0_10px_rgba(92,255,61,0.1)] hover:shadow-[0_0_20px_rgba(92,255,61,0.3)]"
      >
        Let's Talk
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </header>
  );
};

