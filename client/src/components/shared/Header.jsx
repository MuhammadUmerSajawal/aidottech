import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import Logo from '../common/Logo';

const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const { theme } = useAppStore();
  const isDark = theme === 'dark';
  const location = useLocation();

  const linkClass = (path) => {
    const isActive = location.pathname === path;
    const base = 'nav-link relative py-1 transition-colors duration-200';
    if (isDark) {
      return `${base} ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`;
    }
    return `${base} ${isActive ? 'text-dot-navy' : 'text-dot-navy/60 hover:text-dot-navy'}`;
  };

  return (
    <header className={`w-full py-5 px-6 md:px-[64px] border-b transition-colors duration-300 relative z-50 ${
      isDark
        ? 'bg-dot-navy text-dot-warmwhite border-white/5'
        : 'bg-dot-warmwhite text-dot-navy border-dot-navy/10'
    }`}>
      <div className="max-w-[1440px] mx-auto flex justify-between items-center">
        <Link to="/" className="transition-opacity duration-200 hover:opacity-80">
          <Logo variant={isDark ? 'dark' : 'light'} />
        </Link>

        <div className="flex items-center gap-5 md:gap-8">
          <nav className={`flex items-center gap-5 md:gap-8 font-space-mono text-[10px] md:text-xs uppercase tracking-wider ${
            isDark ? 'text-white/70' : 'text-dot-navy/60'
          }`}>
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={to} to={to} className={linkClass(to)}>
                {label}
              </Link>
            ))}
          </nav>

          <Link to="/contact">
            <button className="btn-interactive h-[38px] px-5 rounded-full bg-[#5D7FC4] hover:bg-[#4A6BB2] text-white text-[10px] md:text-xs font-space-mono uppercase tracking-wider shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#668DD8]/50">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
