"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What is your typical project timeline?",
      answer: "A standard custom design and development project takes between 4 to 8 weeks. This covers thorough strategy, wireframing, client reviews, interactive WebGL/development builds, and SEO launch parameters.",
    },
    {
      question: "What technologies do you use for development?",
      answer: "We primarily utilize React, Next.js, and Tailwind CSS for frontend structures. For interactions, we build with GSAP and WebGL, backed by headless architectures like sanity.io or Shopify Engine to ensure lightning-fast loading speeds.",
    },
    {
      question: "Do you offer post-launch website support?",
      answer: "Yes! Every website launch comes with 30 days of complimentary support. We also offer continuous monthly check-up and security packages covering version updates, server maintenance, and layout iterations.",
    },
    {
      question: "Can you optimize our existing search engine indexing?",
      answer: "Absolutely. We build all platforms on search-ready semantics, clean metadata mapping, structured JSON schemas, and highly optimized loading speeds to guarantee indexation and organic search ranking boosts.",
    },
  ];

  const handleToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="relative py-20 px-6 md:px-12 w-full z-10">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyberGreen font-mono">
            QUESTIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-space uppercase">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberGreen to-cyberMint">Questions</span>
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? "border-cyberGreen/40 bg-white/[0.015] shadow-[0_0_15px_rgba(57,255,20,0.05)]"
                    : "border-white/[0.04] bg-white/[0.005] hover:border-white/[0.1]"
                }`}
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                >
                  <span className="font-space font-bold text-sm sm:text-base text-white hover:text-cyberGreen transition-colors duration-200">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 bg-white/[0.02]">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-cyberGreen" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 text-xs sm:text-sm text-white/50 leading-relaxed font-sans border-t border-white/[0.03] pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
