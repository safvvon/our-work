"use client";

import React, { useEffect, useState } from "react";
import { Project } from "../../../types/portfolio";
import { ArrowUpRight, Tag, ExternalLink } from "lucide-react";

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
    }, 250);
    return () => clearTimeout(timer);
  }, [activeProject]);

  return (
    <div className="w-full flex flex-col items-center sm:items-start justify-center gap-3 sm:gap-6 select-none font-mono">
      {/* Details Box with Glassmorphism */}
      <div className="w-full max-w-xl border border-white/[0.06] bg-white/[0.015] hover:border-white/[0.12] hover:bg-white/[0.025] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-8 backdrop-blur-xl transition-all duration-300 relative overflow-hidden shadow-2xl">
        
        {/* Dynamic Glowing Accent corner */}
        <div className="absolute top-0 right-0 w-[60px] sm:w-[100px] h-[60px] sm:h-[100px] bg-neonGreen/10 blur-[30px] rounded-full pointer-events-none" />
        
        <div className={`transition-all duration-300 ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          
          {/* Project Title and Number */}
          <div className="flex items-center justify-between mb-2.5 sm:mb-4 border-b border-white/[0.06] pb-2.5 sm:pb-4 gap-2">
            <h3 className="text-base sm:text-2xl lg:text-3xl font-bold font-sans text-white truncate">
              {displayProject.name}
            </h3>
            <span className="text-[10px] sm:text-xs font-bold text-neonGreen font-mono text-glow-green border border-neonGreen/30 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-neonGreen/5 shrink-0">
              PROJ {displayProject.number}
            </span>
          </div>

          {/* Project Meta Metrics */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
            {/* Industry */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border border-white/10 flex items-center justify-center text-white/50 shrink-0 bg-white/[0.02]">
                <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neonGreen" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest font-mono">Industry</span>
                <span className="text-[11px] sm:text-sm text-white/90 font-sans font-medium truncate">{displayProject.industry}</span>
              </div>
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border border-white/10 flex items-center justify-center text-white/50 shrink-0 bg-white/[0.02]">
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neonGreen" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest font-mono">Category</span>
                <span className="text-[11px] sm:text-sm text-white/90 font-sans font-medium truncate">{displayProject.category}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row">
            <a
              href={displayProject.liveUrl}
              className="w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-neonGreen text-black font-extrabold uppercase tracking-wider text-[10px] sm:text-xs py-2.5 sm:py-3.5 px-3 sm:px-6 rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(92,255,61,0.4)] transition-all duration-300 group"
            >
              Live Demo
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
