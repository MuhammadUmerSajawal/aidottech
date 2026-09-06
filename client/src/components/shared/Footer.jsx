import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Sun, Moon } from 'lucide-react';

export default function Footer() {
  const { theme, toggleTheme } = useAppStore();
  const isDark = theme === 'dark';

  return (
    <footer className={`p-6 border-t text-xs font-space-mono transition-colors duration-300 flex justify-between items-center ${
      isDark
        ? 'bg-dot-navy text-white/50 border-white/5'
        : 'bg-dot-warmwhite text-dot-navy/60 border-dot-navy/10'
    }`}>
      {/* Empty block to balance layout */}
      <div className="w-8"></div>
      
      <div>
        <span aria-label="Copyright">&copy;</span> {new Date().getFullYear()} | .dot | Vertical AI solutions
      </div>

      {/* Hidden theme option that appears on hover when cursor gets close */}
      <div className="group w-8 h-8 flex items-center justify-center relative">
        <button
          onClick={toggleTheme}
          aria-label="Theme toggle trigger"
          className={`opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 p-1.5 rounded-full focus:outline-none ${
            isDark ? 'hover:bg-white/5 text-white/70' : 'hover:bg-dot-navy/5 text-dot-navy/70'
          }`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
      </div>
    </footer>
  );
}
