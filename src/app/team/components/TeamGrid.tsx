"use client";

import React from "react";
import { Github, Linkedin, Mail, Cpu, Award, Zap, Sparkles } from "lucide-react";

export const TeamGrid: React.FC = () => {
  const members = [
    {
      name: "Jasir",
      role: "Founder & Principal Architect",
      badge: <Cpu className="w-3.5 h-3.5 text-neonGreen" />,
      tagline: "Oversees core systems design, routing paradigms, and framework scalability solutions.",
      github: "#",
      linkedin: "#",
      avatarColor: "from-neonGreen/20 to-zinc-950",
    },
    {
      name: "Sarah Chen",
      role: "Lead UI/UX Product Designer",
      badge: <Sparkles className="w-3.5 h-3.5 text-neonGreen" />,
      tagline: "Specializes in luxury layout visual languages, micro-interactions, and visual guidelines.",
      github: "#",
      linkedin: "#",
      avatarColor: "from-emerald-600/20 to-zinc-950",
    },
    {
      name: "David K.",
      role: "Senior Frontend Systems Engineer",
      badge: <Zap className="w-3.5 h-3.5 text-neonGreen" />,
      tagline: "Builds responsive component configurations, optimized caching, and fast server rendering.",
      github: "#",
      linkedin: "#",
      avatarColor: "from-green-600/20 to-zinc-950",
    },
    {
      name: "Emma Vance",
      role: "Creative Motion Director",
      badge: <Award className="w-3.5 h-3.5 text-neonGreen" />,
      tagline: "Designs Apple-grade layout transitions, GSAP inertia hooks, and physics scroll models.",
      github: "#",
      linkedin: "#",
      avatarColor: "from-lime-600/20 to-zinc-950",
    },
  ];

  return (
    <section className="w-full py-20 px-6 md:px-12 bg-black/40 border-t border-white/[0.02] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 z-10 relative">
        
        {/* Header Title */}
        <div className="flex flex-col gap-1 max-w-xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-wider text-neonGreen font-mono uppercase">
            WHO WE ARE
          </span>
          <h2 className="text-2xl md:text-4xl font-black uppercase font-sans">
            Meet <span className="text-neonGreen text-glow-green">Team Intellex</span>
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, idx) => (
            <div
              key={idx}
              className="border border-white/[0.04] bg-white/[0.005] hover:border-neonGreen/30 hover:bg-white/[0.015] rounded-3xl p-6 relative overflow-hidden transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between select-none"
            >
              <div>
                {/* Silhouette / Avatar representation with glowing radial gradient */}
                <div className={`w-full aspect-square rounded-2xl bg-gradient-to-b ${member.avatarColor} border border-white/5 flex items-center justify-center relative overflow-hidden mb-6 group-hover:border-neonGreen/20 transition-colors duration-300`}>
                  <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050505]/40 opacity-60" />
                  
                  {/* Styled abstract silhouette graphic inside the card */}
                  <svg
                    className="w-1/2 h-1/2 text-white/10 group-hover:text-neonGreen/20 group-hover:scale-105 transition-all duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>

                {/* Role Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-neonGreen/20 bg-neonGreen/5 text-[9px] font-semibold tracking-wider font-mono uppercase text-neonGreen mb-3">
                  {member.badge}
                  {member.role}
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold font-sans text-white mb-2 group-hover:text-neonGreen transition-colors duration-300">
                  {member.name}
                </h3>

                {/* Tagline description */}
                <p className="text-xs font-sans text-white/40 leading-relaxed mb-6">
                  {member.tagline}
                </p>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-3 border-t border-white/[0.03] pt-4 mt-2">
                <a
                  href={member.github}
                  className="text-white/40 hover:text-neonGreen hover:scale-105 transition-all duration-200"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={member.linkedin}
                  className="text-white/40 hover:text-neonGreen hover:scale-105 transition-all duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${member.name.toLowerCase()}@greenframe.studio`}
                  className="text-white/40 hover:text-neonGreen hover:scale-105 transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamGrid;
