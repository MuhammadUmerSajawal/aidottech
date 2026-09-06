import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import PageBackground from '../shared/PageBackground';

const PILLARS = [
  {
    index: '01',
    title: 'Own Products',
    description: 'Vertical AI products we build and operate.',
  },
  {
    index: '02',
    title: 'Custom Solutions',
    description: 'AI systems shaped around industry workflows.',
  },
];

export default function AboutSection() {
  const { theme } = useAppStore();
  const isDark = theme === 'dark';

  return (
    <PageBackground
      isDark={isDark}
      className="min-h-[calc(100vh-140px)] py-20 md:py-32 px-6 md:px-[64px] flex items-center"
    >
      <div className="max-w-[720px] mx-auto w-full relative z-10">
        <div className="space-y-10 md:space-y-14 text-center md:text-left">
          <div className="space-y-6">
            <h1
              className={`about-reveal font-sans font-bold text-[40px] sm:text-[48px] md:text-[56px] lg:text-[60px] leading-[1.05] tracking-tight transition-colors duration-300 ${
                isDark ? 'text-[#F5F6FA]' : 'text-dot-navy'
              }`}
            >
              Built for Vertical Depth
            </h1>

            <p
              className={`about-reveal about-reveal-delay-1 font-sans text-base sm:text-lg leading-relaxed max-w-[540px] mx-auto md:mx-0 transition-colors duration-300 ${
                isDark ? 'text-[#B8BFCE]' : 'text-dot-navy/80'
              }`}
            >
              .dot builds focused AI for industries where precision matters — domain-first products with measurable outcomes, not generic copilots.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 about-reveal about-reveal-delay-2">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className={`pillar-card group p-5 md:p-6 text-left transition-all duration-300 ${
                  isDark
                    ? 'border border-[rgba(120,140,190,0.15)] hover:border-[rgba(102,141,216,0.45)]'
                    : 'border border-dot-navy/10 hover:border-dot-blue/40'
                }`}
              >
                <p
                  className={`font-space-mono text-[10px] uppercase tracking-[0.18em] mb-2 transition-colors duration-300 ${
                    isDark
                      ? 'text-[#858EA2] group-hover:text-[#668DD8]'
                      : 'text-dot-navy/45 group-hover:text-dot-blue'
                  }`}
                >
                  {pillar.index} / {pillar.title}
                </p>
                <p
                  className={`font-sans text-sm leading-relaxed transition-colors duration-300 ${
                    isDark ? 'text-[#B8BFCE]' : 'text-dot-navy/70'
                  }`}
                >
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          <div className="about-reveal about-reveal-delay-3 pt-2 flex justify-center md:justify-start">
            <Link to="/contact">
              <button className="btn-interactive h-[48px] px-8 rounded-full bg-[#5D7FC4] hover:bg-[#4A6BB2] text-white font-space-mono text-xs uppercase tracking-widest inline-flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#668DD8]/50">
                <span>Get in Touch</span>
                <span className="text-sm font-sans transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </PageBackground>
  );
}
