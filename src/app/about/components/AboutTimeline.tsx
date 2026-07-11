"use client";

import React from "react";
import { Award, Briefcase, Rocket, Sparkles } from "lucide-react";

export const AboutTimeline: React.FC = () => {
  const milestones = [
    {
      year: "2026",
      title: "Core v3 Cinematic Launch",
      icon: <Rocket className="w-4 h-4 text-neonGreen" />,
      desc: "Released our premium cinematic layouts featuring rotating film strip scrolling elements and fully responsive interactive 3D mockups.",
    },
    {
      year: "2024",
      title: "Next.js & TypeScript Pivot",
      icon: <Sparkles className="w-4 h-4 text-neonGreen" />,
      desc: "Restructured our entire core tech stack to support Next.js App Router and TypeScript, guaranteeing high-performance SSR metrics.",
    },
    {
      year: "2023",
      title: "Enterprise Consulting Expansion",
      icon: <Briefcase className="w-4 h-4 text-neonGreen" />,
      desc: "Acquired over 50 consultancies and luxury store clients globally, establishing our reputation as digital design architects.",
    },
    {
      year: "2022",
      title: "GreenFrame Studio Founded",
      icon: <Award className="w-4 h-4 text-neonGreen" />,
      desc: "Founded in Los Angeles, California with a singular focus: replacing average templates with custom-crafted interactive code interfaces.",
    },
  ];

  return (
    <section className="w-full py-20 px-6 md:px-12 relative overflow-hidden bg-black/25">
      <div className="max-w-5xl mx-auto flex flex-col gap-12 z-10 relative">
        {/* Header Title */}
        <div className="flex flex-col gap-1 max-w-xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-wider text-neonGreen font-mono uppercase">
            OUR STORY
          </span>
          <h2 className="text-2xl md:text-4xl font-black uppercase font-sans">
            Studio <span className="text-neonGreen text-glow-green">Milestones</span>
          </h2>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-white/10 ml-4 md:mx-auto md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-[1px] md:before:bg-white/10 flex flex-col gap-12">
          {milestones.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-start md:justify-between w-full ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Visual marker node */}
                <div className="absolute left-[-21px] md:left-1/2 md:-translate-x-1/2 top-1 w-10 h-10 rounded-full border border-white/10 bg-[#050505] flex items-center justify-center z-20 group hover:border-neonGreen/40 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full border border-dashed border-white/5 flex items-center justify-center bg-white/[0.01]">
                    {item.icon}
                  </div>
                </div>

                {/* Content block */}
                <div className="w-full md:w-[45%] pl-8 md:pl-0 flex flex-col items-start md:items-stretch">
                  <div className="border border-white/[0.04] bg-white/[0.005] hover:border-neonGreen/20 p-6 md:p-8 rounded-3xl backdrop-blur-md transition-all duration-300 w-full hover:bg-white/[0.01]">
                    <span className="text-lg font-black font-mono text-neonGreen text-glow-green mb-1 block">
                      {item.year}
                    </span>
                    <h3 className="text-base font-bold font-sans text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm font-sans text-white/50 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Spacing node for layout balance */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
