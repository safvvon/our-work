"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "design",
    budget: "10-25k",
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
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "design",
        budget: "10-25k",
        message: "",
      });
    }, 1500);
  };

  const contactCards = [
    {
      title: "Direct Calling",
      value: "+1 (213) 456-7890",
      icon: <Phone className="w-5 h-5 text-cyberGreen" />,
      link: "tel:+12134567890",
      label: "Call Now",
    },
    {
      title: "Secure Email",
      value: "hello@intellex.studio",
      icon: <Mail className="w-5 h-5 text-cyberMint" />,
      link: "mailto:hello@intellex.studio",
      label: "Send Email",
    },
    {
      title: "Command Center HQ",
      value: "Los Angeles, California",
      icon: <MapPin className="w-5 h-5 text-cyberAccent" />,
      link: "https://maps.google.com",
      label: "Get Directions",
    },
    {
      title: "Instant Chat",
      value: "WhatsApp Business",
      icon: <MessageSquare className="w-5 h-5 text-cyberGreen" />,
      link: "https://wa.me/12134567890",
      label: "Message Us",
    },
  ];

  return (
    <section id="contact-form-section" className="w-full pb-20 px-6 md:px-12 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Contact Info Cards (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col items-start gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyberGreen font-mono">
              COMMUNICATION PORTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-space uppercase">
              Establish <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyberGreen to-cyberMint">Connection</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-sans max-w-md">
              Initialize a data transfer with our team via secure encryption ports. We process all transmissions within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactCards.map((card, idx) => (
              <a
                key={idx}
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] p-6 rounded-2xl backdrop-blur-md flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyberGreen/30 hover:shadow-[0_0_20px_rgba(57,255,20,0.08)]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  {card.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">
                    {card.title}
                  </span>
                  <span className="text-xs font-bold text-white leading-tight font-space truncate group-hover:text-cyberGreen transition-colors duration-200">
                    {card.value}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyberGreen/60 group-hover:text-cyberGreen transition-colors duration-200 font-mono mt-2 flex items-center gap-1.5">
                  {card.label} &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Contact Form Card (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="border border-white/[0.05] bg-[#050505]/40 backdrop-blur-md p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-[0_0_30px_rgba(57,255,20,0.03)] hover:border-cyberGreen/20 transition-all duration-300">
            
            {submitted ? (
              /* Success Screen */
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4 animate-[fadeIn_0.5s_ease_1]">
                <CheckCircle2 className="w-16 h-16 text-cyberGreen filter drop-shadow-[0_0_15px_#39FF14]" />
                <h3 className="text-xl sm:text-2xl font-bold font-space text-white mt-2">
                  TRANSMISSION SUCCESSFUL
                </h3>
                <p className="text-xs sm:text-sm text-white/50 max-w-sm font-sans leading-relaxed">
                  Thank you for reaching out to INTELLEX. Our engineers have registered your transmission. We will follow up via secure email within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 border border-cyberGreen/40 hover:border-cyberGreen hover:bg-cyberGreen/5 px-8 py-3 rounded-full text-xs font-bold text-cyberGreen uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.05)]"
                >
                  Establish New Port
                </button>
              </div>
            ) : (
              /* Input Form */
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name-input" className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                      Full Name
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/[0.01] border border-white/5 focus:border-cyberGreen focus:shadow-[0_0_15px_rgba(57,255,20,0.15)] focus:outline-none px-4 py-3 rounded-xl text-xs text-white transition-all duration-200"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email-input" className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                      Email Address
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@company.com"
                      className="w-full bg-white/[0.01] border border-white/5 focus:border-cyberGreen focus:shadow-[0_0_15px_rgba(57,255,20,0.15)] focus:outline-none px-4 py-3 rounded-xl text-xs text-white transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone-input" className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                      Phone Number
                    </label>
                    <input
                      id="phone-input"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +1 (213) 456-7890"
                      className="w-full bg-white/[0.01] border border-white/5 focus:border-cyberGreen focus:shadow-[0_0_15px_rgba(57,255,20,0.15)] focus:outline-none px-4 py-3 rounded-xl text-xs text-white transition-all duration-200"
                    />
                  </div>

                  {/* Company field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company-input" className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                      Company Name
                    </label>
                    <input
                      id="company-input"
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Corp"
                      className="w-full bg-white/[0.01] border border-white/5 focus:border-cyberGreen focus:shadow-[0_0_15px_rgba(57,255,20,0.15)] focus:outline-none px-4 py-3 rounded-xl text-xs text-white transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service request dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="service-select" className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                      Requested Service
                    </label>
                    <select
                      id="service-select"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-black border border-white/5 focus:border-cyberGreen focus:shadow-[0_0_15px_rgba(57,255,20,0.15)] focus:outline-none px-4 py-3 rounded-xl text-xs text-white transition-all duration-200 cursor-pointer"
                    >
                      <option value="design">Creative Web Design</option>
                      <option value="development">Custom Next.js App Dev</option>
                      <option value="ecommerce">eCommerce & Storefronts</option>
                      <option value="branding">Branding & Identity Strategy</option>
                    </select>
                  </div>

                  {/* Budget estimate dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="budget-select" className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                      Project Budget
                    </label>
                    <select
                      id="budget-select"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-black border border-white/5 focus:border-cyberGreen focus:shadow-[0_0_15px_rgba(57,255,20,0.15)] focus:outline-none px-4 py-3 rounded-xl text-xs text-white transition-all duration-200 cursor-pointer"
                    >
                      <option value="under-10k">Under $10,000</option>
                      <option value="10-25k">$10,000 – $25,000</option>
                      <option value="25-50k">$25,000 – $50,000</option>
                      <option value="50k-plus">$50,000+</option>
                    </select>
                  </div>
                </div>

                {/* Message / Project details */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message-input" className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                    Project Details
                  </label>
                  <textarea
                    id="message-input"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your system goals, timeline, and layout details..."
                    className="w-full bg-white/[0.01] border border-white/5 focus:border-cyberGreen focus:shadow-[0_0_15px_rgba(57,255,20,0.15)] focus:outline-none px-4 py-3 rounded-xl text-xs text-white transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-cyberGreen text-black font-bold uppercase tracking-widest text-xs py-4.5 rounded-xl hover:bg-white hover:text-black hover:shadow-[0_0_35px_rgba(57,255,20,0.6)] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 select-none shadow-[0_0_20px_rgba(57,255,20,0.15)]"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Start My Project
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
