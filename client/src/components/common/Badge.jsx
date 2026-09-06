import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  // Minimal boilerplate shell
  return (
    <span className={className}>
      {children}
    </span>
  );
}
