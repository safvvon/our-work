import React from "react";
import { Key, Archive, ThumbsUp, Lock, Globe } from "lucide-react";
import { ScratchCard } from "../../../components/ScratchCard";

export const AboutJourney: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen py-20 flex flex-col items-center justify-center bg-[#050505] overflow-hidden z-10">
      {/* Background glowing effects to emulate the wavy green lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neonGreen/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-neonGreen/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neonGreen/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl w-full px-6 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-sans font-bold text-neonGreen tracking-wider mb-16 drop-shadow-[0_0_15px_rgba(92,255,61,0.6)] uppercase">
          About Our Journey
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          
          {/* Card 1: Launched */}
          <div className="relative group p-[2px] rounded-2xl overflow-hidden bg-gradient-to-br from-neonGreen/60 via-neonGreen/20 to-transparent shadow-[0_0_20px_rgba(92,255,61,0.1)] hover:shadow-[0_0_30px_rgba(92,255,61,0.25)] transition-all duration-500">
            <ScratchCard coverColor="#151515" className="h-full rounded-2xl">
              <div className="bg-[#0f1510] h-full rounded-2xl p-8 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] z-0 pointer-events-none mix-blend-overlay"></div>
                
                <div className="relative z-10 text-center flex flex-col items-center w-full">
                  <span className="text-neonGreen text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Unlocked</span>
                  
                  {/* Paint stroke text background simulation */}
                  <div className="relative inline-flex items-center justify-center my-3 py-2 px-6 w-full max-w-[280px]">
                    <div className="absolute inset-0 bg-white/10 -skew-x-12 rounded-sm transform scale-110"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 blur-[1px]"></div>
                    <h3 className="relative text-2xl font-black text-gray-200 tracking-wide uppercase italic mix-blend-screen drop-shadow-md">
                      LAUNCHED: 2021
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4 text-neonGreen">
                    <Key className="w-7 h-7 drop-shadow-[0_0_8px_rgba(92,255,61,0.8)]" />
                    <Archive className="w-7 h-7 drop-shadow-[0_0_8px_rgba(92,255,61,0.8)]" />
                  </div>
                </div>
              </div>
            </ScratchCard>
          </div>

          {/* Card 2: Users */}
          <div className="relative group p-[2px] rounded-2xl overflow-hidden bg-gradient-to-br from-neonGreen/60 via-neonGreen/20 to-transparent shadow-[0_0_20px_rgba(92,255,61,0.1)] hover:shadow-[0_0_30px_rgba(92,255,61,0.25)] transition-all duration-500">
            <ScratchCard coverColor="#151515" className="h-full rounded-2xl">
              <div className="bg-[#0f1510] h-full rounded-2xl p-8 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] z-0 pointer-events-none mix-blend-overlay"></div>
                
                <div className="relative z-10 text-center flex flex-col items-center w-full">
                  <span className="text-neonGreen text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Unlocked</span>
                  
                  <div className="relative inline-flex items-center justify-center my-3 py-2 px-6 w-full max-w-[280px]">
                    <div className="absolute inset-0 bg-white/10 -skew-x-12 rounded-sm transform scale-110"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 blur-[1px]"></div>
                    <h3 className="relative text-2xl font-black text-gray-200 tracking-wide uppercase italic mix-blend-screen drop-shadow-md">
                      OVER 1000 USERS
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4 text-neonGreen">
                    <ThumbsUp className="w-7 h-7 drop-shadow-[0_0_8px_rgba(92,255,61,0.8)]" />
                  </div>
                </div>
              </div>
            </ScratchCard>
          </div>

          {/* Card 3: Locked Goal */}
          <div className="relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700/60 via-gray-800/40 to-transparent">
            <div className="bg-gradient-to-b from-[#151515] to-[#0a0a0a] h-full rounded-2xl p-8 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none"></div>
              
              <div className="relative z-10 text-center flex flex-col items-center gap-4">
                <Lock className="w-12 h-12 text-gray-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-[0.1em] uppercase">LOCKED</h3>
                  <span className="text-[11px] text-gray-500 font-medium">(Goal not achieved yet)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Global Expansion */}
          <div className="relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700/60 via-gray-800/40 to-transparent">
            <div className="bg-gradient-to-b from-[#151515] to-[#0a0a0a] h-full rounded-2xl p-8 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none"></div>
              
              <div className="relative z-10 text-center flex flex-col items-center gap-4">
                <div className="relative">
                  <Globe className="w-14 h-14 text-gray-500/70" />
                  <div className="absolute bottom-0 right-0 bg-[#0a0a0a] rounded p-1 border border-gray-700/80 shadow-lg">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-[0.1em] uppercase">GLOBAL EXPANSION</h3>
              </div>
            </div>
          </div>

        </div>


      </div>
    </section>
  );
};
