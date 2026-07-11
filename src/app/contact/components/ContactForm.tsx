"use client";

import React, { useState } from "react";
import { ArrowRight, Send, CheckCircle2 } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "design",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", service: "design", message: "" });
    }, 1200);
  };

  return (
    <section className="w-full pb-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-start z-10 relative">
        
        {/* Left Side info cards (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6 font-mono">
          <div className="border border-white/[0.04] bg-white/[0.005] p-8 rounded-3xl backdrop-blur-md flex flex-col gap-4">
            <h3 className="text-sm font-bold text-neonGreen uppercase tracking-widest">
              Direct Contact
            </h3>
            <div className="flex flex-col gap-3 text-xs leading-relaxed text-white/50">
              <p>
                <span className="text-white font-semibold">Email:</span> hello@greenframe.studio
              </p>
              <p>
                <span className="text-white font-semibold">Phone:</span> +1 (213) 456-7890
              </p>
              <p>
                <span className="text-white font-semibold">HQ Address:</span> Los Angeles, California
              </p>
            </div>
          </div>

          <div className="border border-white/[0.04] bg-white/[0.005] p-8 rounded-3xl backdrop-blur-md flex flex-col gap-4">
            <h3 className="text-sm font-bold text-neonGreen uppercase tracking-widest">
              Working Hours
            </h3>
            <div className="flex flex-col gap-3 text-xs leading-relaxed text-white/50">
              <p>Monday - Friday: 9am - 6pm PST</p>
              <p>Saturday: 10am - 2pm PST</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Right Side Glass Form (3 cols) */}
        <div className="lg:col-span-3">
          <div className="border border-white/[0.04] bg-white/[0.005] p-8 md:p-10 rounded-3xl backdrop-blur-md relative overflow-hidden">
            {submitted ? (
              /* Success Screen */
              <div className="flex flex-col items-center justify-center text-center py-10 gap-4 animate-[fadeIn_0.5s_ease_1]">
                <CheckCircle2 className="w-16 h-16 text-neonGreen shadow-[0_0_20px_#5CFF3D]" />
                <h3 className="text-xl font-bold font-sans text-white mt-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-white/40 max-w-sm font-sans">
                  Thank you for reaching out to GREENFRAME. Our team will review your project requirements and follow up via email within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 border border-neonGreen/40 hover:border-neonGreen hover:bg-neonGreen/5 px-6 py-2.5 rounded-full text-xs font-bold text-neonGreen uppercase tracking-wider transition-all duration-300"
                >
                  Send another message
                </button>
              </div>
            ) : (
              /* Standard Input Form */
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-white/[0.02] border border-white/5 focus:border-neonGreen focus:outline-none px-4 py-3 rounded-xl text-xs text-white transition-colors duration-200"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-white/[0.02] border border-white/5 focus:border-neonGreen focus:outline-none px-4 py-3 rounded-xl text-xs text-white transition-colors duration-200"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                    Requested Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-zinc-950 border border-white/5 focus:border-neonGreen focus:outline-none px-4 py-3 rounded-xl text-xs text-white transition-colors duration-200 cursor-pointer"
                  >
                    <option value="design">Creative Web Design</option>
                    <option value="development">Full Scale Next.js Dev</option>
                    <option value="uiux">UI/UX Interface Strategy</option>
                    <option value="seo">SEO Audit & Marketing</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                    Tell us about your project
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your design aesthetics, timelines, and scope here..."
                    className="w-full bg-white/[0.02] border border-white/5 focus:border-neonGreen focus:outline-none px-4 py-3 rounded-xl text-xs text-white resize-none transition-colors duration-200"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-3 bg-neonGreen text-black font-bold uppercase tracking-wider text-xs py-4 px-6 rounded-xl hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Project Request</span>
                      <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactForm;
