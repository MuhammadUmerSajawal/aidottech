import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import GraphicOverlay from './GraphicOverlay';

export default function HeroSection() {
  const { theme } = useAppStore();
  const isDark = theme === 'dark';

  const heroStyle = {
    background: isDark 
      ? 'radial-gradient(circle at 75% 50%, #2C354E 0%, #131722 100%)'
      : 'radial-gradient(circle at 75% 50%, #FCFCF9 0%, #E5E4D8 100%)',
  };

  return (
    <section 
      style={heroStyle}
      className="relative overflow-hidden py-24 md:py-32 px-6 md:px-[64px] min-h-[580px] flex items-center transition-all duration-300"
    >
      
      {/* Background Glow Blobs for professional depth (Dark Mode only) */}
      {isDark && (
        <>
          <div className="absolute right-[5%] bottom-[5%] w-[500px] h-[500px] rounded-full bg-[#5D7FC4]/8 blur-[120px] pointer-events-none z-0"></div>
          <div className="absolute left-[5%] top-[5%] w-[400px] h-[400px] rounded-full bg-[#D808CC]/3 blur-[110px] pointer-events-none z-0"></div>
        </>
      )}

      {/* Magenta #D808CC grid of 48x48px (6% opacity) & 8px baseline sub-grid */}
      <div className="absolute inset-0 baseline-grid pointer-events-none z-0"></div>

      {/* Full-width/height interactive concentric arcs overlay */}
      <GraphicOverlay />

      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Headline and Descriptions */}
        <div className="space-y-6 md:space-y-8 max-w-xl text-left">
          <h1 className={`font-sans font-bold text-[44px] sm:text-[54px] md:text-[64px] leading-[1.1] tracking-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-dot-navy'}`}>
            Vertical AI.<br />
            Real Impact.
          </h1>
          <p className={`font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-md transition-colors duration-300 ${isDark ? 'text-white/80' : 'text-dot-navy/80'}`}>
            We build AI platforms that replace fragmented tools with unified intelligence.
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <button className="h-[48px] px-8 rounded-full bg-[#5D7FC4] hover:bg-[#4A6BB2] text-white font-space-mono text-xs uppercase tracking-widest transition-all duration-200 inline-flex items-center space-x-2 focus:outline-none hover:shadow-lg">
                <span>Get Started</span>
                <span className="text-sm font-sans">→</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column: Left empty to allow the background arcs to shine through */}
        <div className="hidden md:block w-full h-[400px] pointer-events-none"></div>

      </div>
    </section>
  );
}
