"use client";

import React, { useEffect, useState } from "react";
import { Project } from "../types/portfolio";
import { ArrowUpRight, Code, Tag, ExternalLink } from "lucide-react";

interface ProjectDetailsProps {
  activeProject: Project;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ activeProject }) => {
  const [displayProject, setDisplayProject] = useState<Project>(activeProject);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(false);
    const timer = setTimeout(() => {
      setDisplayProject(activeProject);
      setFade(true);
    }, 250); // Match half of the transition duration
    return () => clearTimeout(timer);
  }, [activeProject]);

  return (
    <div className="w-full flex flex-col items-start justify-center gap-6 select-none font-mono">
      {/* Title Header Section */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-neonGreen font-mono">
          OUR WORK
        </span>
        <h2 className="text-4xl md:text-5xl font-black font-sans tracking-tight leading-none text-white">
          Websites We've <br />
          <span className="text-neonGreen text-glow-green">Built</span>
        </h2>
      </div>

      <p className="text-sm text-white/50 leading-relaxed font-sans max-w-lg mb-2">
        Explore a curated collection of websites designed and developed for our clients, optimized for high conversion rates and immersive brand storytelling.
      </p>

      {/* Details Box with Glassmorphism */}
      <div className="w-full max-w-lg border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08] hover:bg-white/[0.02] rounded-3xl p-6 md:p-8 backdrop-blur-md transition-all duration-300 relative overflow-hidden">
        
        {/* Dynamic Glowing Accent corner */}
        <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-neonGreen/10 blur-[30px] rounded-full pointer-events-none" />
        
        <div className={`transition-all duration-300 ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          
          {/* Project Title and Number */}
          <div className="flex items-baseline justify-between mb-4 border-b border-white/[0.05] pb-4">
            <h3 className="text-xl md:text-2xl font-bold font-sans text-white">
              {displayProject.name}
            </h3>
            <span className="text-xs font-bold text-neonGreen font-mono text-glow-green border border-neonGreen/30 px-2.5 py-0.5 rounded-full bg-neonGreen/5">
              PROJ {displayProject.number}
            </span>
          </div>



          {/* Project Meta Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Industry */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-white/5 flex items-center justify-center text-white/40">
                <Tag className="w-4 h-4 text-neonGreen/80" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Industry</span>
                <span className="text-xs text-white/80 font-sans font-medium">{displayProject.industry}</span>
              </div>
            </div>

            {/* Category */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-white/5 flex items-center justify-center text-white/40">
                <ExternalLink className="w-4 h-4 text-neonGreen/80" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Category</span>
                <span className="text-xs text-white/80 font-sans font-medium">{displayProject.category}</span>
              </div>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="flex flex-col gap-2 mb-8">
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <Code className="w-3 h-3 text-neonGreen/60" /> Tech Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {displayProject.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-sans px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.04] text-white/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={displayProject.liveUrl}
              className="flex-1 flex items-center justify-center gap-2 bg-neonGreen text-black font-bold uppercase tracking-wider text-xs py-3.5 px-6 rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group"
            >
              Live Demo
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={displayProject.caseStudyUrl}
              className="flex-1 flex items-center justify-center gap-2 border border-white/20 hover:border-white/80 text-white font-bold uppercase tracking-wider text-xs py-3.5 px-6 rounded-full hover:bg-white/5 transition-all duration-300"
            >
              View Case Study
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
