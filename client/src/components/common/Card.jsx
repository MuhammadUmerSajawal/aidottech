import React from 'react';

/**
 * Standard .dot styling card component.
 * Uses 1px borders, sharp corners, and generous padding.
 */
export default function Card({ children, title, subtitle, className = '', hoverEffect = true }) {
  return (
    <div className={`dot-card ${hoverEffect ? 'dot-card-hover' : ''} ${className}`}>
      {(title || subtitle) && (
        <div class="border-b border-dot-border pb-4 mb-6">
          {title && (
            <h3 class="font-space-mono text-sm uppercase tracking-wider text-dot-dark font-bold">
              {title}
            </h3>
          )}
          {subtitle && (
            <p class="font-accent-italic text-lg text-dot-teal mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
