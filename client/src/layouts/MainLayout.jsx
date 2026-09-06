import React from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

export default function MainLayout({ children }) {
  // Minimal boilerplate shell
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
