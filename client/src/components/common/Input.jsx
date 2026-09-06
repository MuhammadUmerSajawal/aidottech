import React from 'react';

export default function Input({ value, onChange, placeholder, label, type = 'text', className = '' }) {
  // Minimal boilerplate shell
  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}
