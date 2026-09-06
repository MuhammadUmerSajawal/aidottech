import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

const inputBase = (isDark) =>
  `w-full px-4 py-3 font-sans text-sm transition-all duration-200 rounded-sm focus:outline-none ${
    isDark
      ? 'bg-[rgba(20,24,38,0.55)] border border-[rgba(120,140,190,0.18)] text-[#F5F6FA] placeholder:text-[#858EA2] focus:border-[rgba(102,141,216,0.7)] focus:bg-[rgba(20,24,38,0.75)]'
      : 'bg-white/60 border border-dot-navy/15 text-dot-navy placeholder:text-dot-navy/40 focus:border-dot-blue/70 focus:bg-white/80'
  }`;

export default function ContactForm() {
  const { theme } = useAppStore();
  const isDark = theme === 'dark';
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const labelClass = `block font-space-mono text-[10px] uppercase tracking-[0.18em] mb-2 ${
    isDark ? 'text-[#858EA2]' : 'text-dot-navy/50'
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 about-reveal about-reveal-delay-2" noValidate>
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className={inputBase(isDark)}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={inputBase(isDark)}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us what you're building..."
          className={`${inputBase(isDark)} resize-y min-h-[120px]`}
        />
      </div>

      <div className="pt-1">
        {submitted ? (
          <p
            className={`font-sans text-sm ${
              isDark ? 'text-[#668DD8]' : 'text-dot-blue'
            }`}
            role="status"
          >
            Thank you — we'll be in touch shortly.
          </p>
        ) : (
          <button
            type="submit"
            className="btn-interactive h-[48px] px-8 rounded-full bg-[#5D7FC4] hover:bg-[#4A6BB2] text-white font-space-mono text-xs uppercase tracking-widest inline-flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#668DD8]/50"
          >
            <span>Send Message</span>
            <span className="text-sm font-sans">→</span>
          </button>
        )}
      </div>
    </form>
  );
}
