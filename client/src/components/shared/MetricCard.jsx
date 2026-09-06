import React from 'react';
import Card from '../common/Card';

/**
 * Metric card for showing stats and KPI figures.
 */
export default function MetricCard({ label, value, subtext, icon: Icon }) {
  return (
    <Card hoverEffect={true} className="flex flex-col justify-between min-h-[140px]">
      <div class="flex justify-between items-start">
        <span class="font-space-mono text-xs uppercase tracking-widest text-dot-neutral">
          {label}
        </span>
        {Icon && (
          <span class="p-1.5 border border-dot-border text-dot-teal bg-[#FBFBFA]">
            <Icon className="w-4 h-4" />
          </span>
        )}
      </div>
      <div class="mt-4">
        <h2 class="font-space-mono text-3xl md:text-4xl font-bold text-dot-dark">
          {value}
        </h2>
        {subtext && (
          <p class="font-accent-italic text-sm text-dot-teal mt-1">
            {subtext}
          </p>
        )}
      </div>
    </Card>
  );
}
