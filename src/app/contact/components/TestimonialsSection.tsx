"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const testimonials = [
    {
      name: "Arjun Menon",
      role: "Founder, Freshbite Foods",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      text: "Intellex built us a website that truly reflects our brand. The design is clean, fast, and our customers love it. We saw a noticeable jump in online orders within the first month.",
    },
    {
      name: "Priya Sharma",
      role: "Marketing Lead, Coastal Stays",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      text: "Working with the Intellex team was a great experience. They understood our vision and delivered a polished website that performs beautifully on every device.",
    },
    {
      name: "Rohan D'Souza",
      role: "Owner, Elevate Fitness",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      text: "Our new website loads fast, looks premium, and we get compliments on it all the time. The team was responsive and delivered everything on schedule.",
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
              <Star key={i} className="w-5 h-5 fill-cyberGreen text-cyberGreen" />
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
              className="w-14 h-14 rounded-full border-2 border-cyberGreen/40 object-cover"
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
