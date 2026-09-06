import React from 'react';

export default function Cards({ children, title, subtitle, className = '' }) {
  // Minimal boilerplate shell
  return (
    <div className={className}>
      {title && <h3>{title}</h3>}
      {subtitle && <p>{subtitle}</p>}
      {children}
    </div>
  );
}
