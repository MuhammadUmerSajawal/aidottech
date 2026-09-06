import React from 'react';

export default function StyledButton({ children, onClick, variant = 'primary', className = '' }) {
  // Minimal boilerplate shell
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
