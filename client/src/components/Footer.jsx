import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-bg-section border-t border-border-dark py-10 text-center text-xs text-text-muted">
      <div className="mx-auto max-w-7xl px-6">
        <p className="leading-relaxed">
          Built by{' '}
          <span className="text-accent-cyan font-semibold">Kokulan Kugathasan</span> ·
          BSc (Hons) IT (Data Science) · SLIIT · 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;
