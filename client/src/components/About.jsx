import React from 'react';

const About = () => {
  return (
    <section 
      id="about" 
      className="section-hidden bg-bg-section py-24 px-6 md:px-12 w-full transition-all duration-700"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Avatar & Socials */}
          <div className="lg:col-span-4 flex flex-col items-center">
            {/* Avatar Circle */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-bg-surface border border-border-dark flex items-center justify-center select-none overflow-hidden group shadow-xl">
              {/* Subtle Radial Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.06)_0%,transparent_70%)] pointer-events-none" />
              
              <span className="font-display text-7xl font-extrabold text-accent-cyan tracking-tight transition-transform duration-300 group-hover:scale-105">
                KK<span className="text-text-main">.</span>
              </span>
            </div>

            {/* Social Pills */}
            <div className="flex gap-3 mt-8 w-full max-w-[288px]">
              <a
                href="https://github.com/kokulanK"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex h-11 items-center justify-center rounded-lg border border-border-dark bg-bg-card/40 text-xs font-semibold text-text-muted transition-all duration-200 hover:border-accent-cyan hover:text-accent-cyan hover:bg-bg-card/60"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/kokulan-kugathasan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex h-11 items-center justify-center rounded-lg border border-border-dark bg-bg-card/40 text-xs font-semibold text-text-muted transition-all duration-200 hover:border-accent-cyan hover:text-accent-cyan hover:bg-bg-card/60"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Right Column: Bio details */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            {/* Label */}
            <span className="text-[11px] font-bold tracking-[0.2em] text-text-muted uppercase mb-3 block">
              About me
            </span>

            {/* Heading */}
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main leading-tight mb-8">
              Here is a little <br />
              <span className="text-accent-cyan">about me</span>
            </h2>

            {/* Paragraphs */}
            <div className="text-sm sm:text-base text-text-muted font-normal leading-relaxed space-y-6 mb-10">
              <p>
                I am currently studying Data Science at the Sri Lanka Institute of Information Technology (SLIIT). I've always been fascinated by how we can teach computers to learn from patterns, and that curiosity led me straight into the world of Machine Learning and Full-Stack development. I love the entire journey—from diving into messy data and training models to building the actual websites that let people interact with them.
              </p>
              <p>
                Lately, I've been working on a skin disease detection system that uses deep learning (EfficientNet-B0) to classify seven types of skin conditions. I also built Medi Connect, a platform that connects clinical workflows directly with AI tools to help doctors work more efficiently. For me, coding is about writing clean, reliable code and wrapping it in simple, intuitive designs that feel natural to use.
              </p>
            </div>

            {/* Info rows */}
            <div className="border-t border-border-dark pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-lg">📧</span>
                  <span className="text-text-muted">
                    Email: <a href="mailto:kokulankugathasan2003@gmail.com" className="text-text-main hover:text-accent-cyan font-medium transition-colors">kokulankugathasan2003@gmail.com</a>
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-lg">📞</span>
                  <span className="text-text-muted">
                    Phone: <span className="text-text-main font-medium">+94 76 752 0033</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-lg">🎓</span>
                  <span className="text-text-muted">
                    University: <span className="text-text-main font-medium">SLIIT, Sri Lanka</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Pulsing Status indicator */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-text-muted">
                    Status: <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">Available for internships</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
