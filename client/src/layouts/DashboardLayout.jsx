import React from 'react';
import Header from '../components/shared/Header';

export default function DashboardLayout({ children }) {
  // Minimal boilerplate shell styled with dark mode variables
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dot-navy text-dot-navy dark:text-dot-warmwhite transition-colors duration-300">
      <Header />
      <div className="flex-grow flex p-6">
        <aside className="w-64 pr-6 border-r border-dot-softblue dark:border-white/10">
          <div className="font-space-mono text-sm uppercase text-dot-navy dark:text-dot-warmwhite font-bold">Console</div>
        </aside>
        <main className="flex-grow pl-6">{children}</main>
      </div>
    </div>
  );
}
