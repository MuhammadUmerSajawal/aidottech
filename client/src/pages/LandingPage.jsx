import React from 'react';
import HeroSection from '../components/hero/HeroSection';

export default function LandingPage() {
  // Minimal boilerplate shell styled with dark mode variables
  return (
    <div className="landing-page-container bg-white dark:bg-dot-navy transition-colors duration-300">
      <HeroSection />
    </div>
  );
}
