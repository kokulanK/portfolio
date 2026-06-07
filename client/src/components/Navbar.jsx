import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'About',      href: '#about' },
    { label: 'What I Do',  href: '#whatido' },
    { label: 'Experience', href: '#experience' },
    { label: 'Works',      href: '#works' },
    { label: 'Stack',      href: '#techstack' },
    { label: 'Contact',    href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    setIsOpen(false);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/download-cv`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Kokulan_Kugathasan_CV.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch(() =>
        alert('Server is not running or CV file is missing from server/assets/')
      );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border-dark bg-bg-primary/90 backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between gap-4 px-5 md:px-10">

        {/* ── Logo ───────────────────────────────── */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="shrink-0 font-display text-xl font-extrabold tracking-tight text-text-main"
        >
          KK<span className="text-accent-cyan">.</span>
        </a>

        {/* ── Desktop nav (hidden below lg) ─────── */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider text-text-muted transition-colors duration-200 hover:text-text-main"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ── Desktop right pills (hidden below lg) */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {/* GitHub */}
          <a
            href="https://github.com/kokulanK"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 items-center gap-1.5 rounded-lg border border-border-dark px-3 text-[11px] font-semibold text-text-muted transition-all duration-200 hover:border-accent-cyan hover:text-accent-cyan"
          >
            {/* GitHub icon */}
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.258.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/kokulan-kugathasan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 items-center gap-1.5 rounded-lg border border-border-dark px-3 text-[11px] font-semibold text-text-muted transition-all duration-200 hover:border-accent-cyan hover:text-accent-cyan"
          >
            {/* LinkedIn icon */}
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>

          {/* Divider */}
          <div className="h-5 w-px bg-border-dark mx-1" />

          {/* Download CV — solid accent button */}
          <button
            onClick={handleDownloadCV}
            className="flex h-8 items-center gap-1.5 rounded-lg bg-accent-cyan px-4 text-[11px] font-bold text-bg-primary transition-all duration-200 hover:brightness-110 active:scale-95"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CV
          </button>
        </div>

        {/* ── Mobile hamburger ─────────────────── */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg border border-border-dark text-text-main hover:border-accent-cyan hover:text-accent-cyan focus:outline-none shrink-0"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

      </div>

      {/* ── Mobile Drawer ─────────────────────── */}
      {isOpen && (
        <div className="absolute left-0 top-[60px] w-full border-b border-border-dark bg-bg-primary/97 px-6 py-5 backdrop-blur-xl lg:hidden shadow-2xl">
          <div className="flex flex-col gap-1">

            {/* Nav links list */}
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center py-2.5 text-sm font-semibold uppercase tracking-wider text-text-muted transition-colors hover:text-accent-cyan"
              >
                {link.label}
              </a>
            ))}

            <div className="my-3 border-t border-border-dark" />

            {/* Social row */}
            <div className="flex gap-2">
              <a
                href="https://github.com/kokulanK"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex h-10 items-center justify-center gap-1.5 rounded-lg border border-border-dark text-xs font-semibold text-text-muted hover:border-accent-cyan hover:text-accent-cyan"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.258.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/kokulan-kugathasan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex h-10 items-center justify-center gap-1.5 rounded-lg border border-border-dark text-xs font-semibold text-text-muted hover:border-accent-cyan hover:text-accent-cyan"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>

            {/* Download CV — full-width solid button */}
            <button
              onClick={handleDownloadCV}
              className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent-cyan text-xs font-bold text-bg-primary transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </button>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
