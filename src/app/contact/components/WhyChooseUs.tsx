"use client";

import React from "react";
import { Palette, Rocket, Zap, ShieldCheck } from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: "Creative Design",
      description: "Bespoke, cinematic layouts tailored specifically to elevate your brand presence and wow your visitors.",
      icon: <Palette className="w-6 h-6 text-cyberGreen" />,
      borderGlow: "group-hover:border-cyberGreen/50 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.1)]",
    },
    {
      title: "SEO Optimized",
      description: "Built-in speed optimization and clean structured HTML hierarchy to achieve maximum organic visibility.",
      icon: <Rocket className="w-6 h-6 text-cyberMint" />,
      borderGlow: "group-hover:border-cyberMint/50 group-hover:shadow-[0_0_20px_rgba(0,255,153,0.1)]",
    },
    {
      title: "Fast Delivery",
      description: "Next.js routing coupled with headless builds ensure your website renders instantly and is ready on time.",
      icon: <Zap className="w-6 h-6 text-cyberAccent" />,
      borderGlow: "group-hover:border-cyberAccent/50 group-hover:shadow-[0_0_20px_rgba(102,255,204,0.1)]",
    },
    {
      title: "Lifetime Support",
      description: "Continuous assistance, updates, and maintenance guarantees that your digital portal stays running smoothly.",
      icon: <ShieldCheck className="w-6 h-6 text-cyberGreen" />,
      borderGlow: "group-hover:border-cyberGreen/50 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.1)]",
    },
  ];

  return (
    <section className="relative py-20 px-6 md:px-12 w-full z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyberGreen font-mono">
            BENEFITS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-space uppercase">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberGreen to-cyberMint">Intellex</span>?
          </h2>
          <p className="text-white/40 text-sm max-w-lg font-sans">
            We deliver state-of-the-art websites using elite technology stacks that perform at the highest levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, index) => (
            <div
              key={index}
              className={`group border border-white/[0.04] bg-white/[0.01] backdrop-blur-md rounded-2xl p-8 flex flex-col gap-5 hover:-translate-y-1.5 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] hover:bg-white/[0.02] ${feat.borderGlow}`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                {feat.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold font-space text-white group-hover:text-cyberGreen transition-colors duration-200">
                  {feat.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
