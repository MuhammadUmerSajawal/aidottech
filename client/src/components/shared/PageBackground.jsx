import React from 'react';

/**
 * Shared page background matching the homepage hero treatment.
 */
export default function PageBackground({ isDark, children, className = '' }) {
  const bgStyle = {
    background: isDark
      ? 'radial-gradient(circle at 75% 50%, #2C354E 0%, #131722 100%)'
      : 'radial-gradient(circle at 75% 50%, #FCFCF9 0%, #E5E4D8 100%)',
  };

  return (
    <div
      style={bgStyle}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {isDark && (
        <>
          <div className="absolute right-[5%] bottom-[5%] w-[500px] h-[500px] rounded-full bg-[#5D7FC4]/8 blur-[120px] pointer-events-none z-0" />
          <div className="absolute left-[5%] top-[5%] w-[400px] h-[400px] rounded-full bg-[#D808CC]/3 blur-[110px] pointer-events-none z-0" />
        </>
      )}
      <div className="absolute inset-0 baseline-grid pointer-events-none z-0" />
      {children}
    </div>
  );
}
