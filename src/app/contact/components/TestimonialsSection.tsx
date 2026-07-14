"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const testimonials = [
    {
      name: "Marcus Aurelius",
      role: "CTO, TechVanguard Corp",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      text: "The web portal built by Intellex exceeded all our benchmarks. The 3D animations are incredibly smooth, and the headless loading speed resulted in a 40% increase in conversions.",
    },
    {
      name: "Elena Rostova",
      role: "Creative Director, Vogue Digital",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      text: "We wanted a website that looked like an award-winning digital piece. The team delivered exactly that. Their attention to aesthetic micro-interactions and dark-mode gradients is unmatched.",
    },
    {
      name: "Darian Vance",
      role: "Founder, Zenith Fitness",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      text: "Instantly loads, feels premium, and runs beautifully on mobile devices. Working with Intellex was seamless and our customers have constantly praised the website design.",
    },
  ];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const active = testimonials[activeIdx];

  return (
    <section className="relative py-20 px-6 md:px-12 w-full z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        
        {/* Glow ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyberMint/5 rounded-full blur-[90px] pointer-events-none -z-10" />

        <div className="text-center flex flex-col items-center gap-4 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyberMint font-mono">
            REVIEWS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-space uppercase">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberMint to-cyberAccent">Testimonials</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="border border-white/[0.05] bg-white/[0.01] rounded-3xl p-8 md:p-12 relative backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] flex flex-col items-center gap-6">
          <Quote className="w-10 h-10 text-cyberGreen/20 absolute top-8 left-8" />
          
          <div className="flex gap-1">
            {Array.from({ length: active.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-cyberGreen text-cyberGreen shadow-[0_0_10px_#39FF14]" />
            ))}
          </div>

          <p className="text-sm sm:text-lg text-white/80 leading-relaxed text-center font-medium font-sans">
            &ldquo;{active.text}&rdquo;
          </p>

          <div className="flex items-center gap-4 mt-4">
            <img
              src={active.avatar}
              alt={active.name}
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              className="w-14 h-14 rounded-full border-2 border-cyberGreen/40 object-cover shadow-[0_0_15px_rgba(57,255,20,0.15)]"
            />
            <div className="flex flex-col items-start">
              <h4 className="font-bold text-white font-space text-base">{active.name}</h4>
              <span className="text-xs text-white/40 font-mono">{active.role}</span>
            </div>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-cyberGreen hover:border-cyberGreen/40 hover:bg-cyberGreen/5 transition-all duration-300"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIdx ? "bg-cyberGreen w-4" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-cyberGreen hover:border-cyberGreen/40 hover:bg-cyberGreen/5 transition-all duration-300"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
