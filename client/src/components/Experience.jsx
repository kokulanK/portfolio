import React from 'react';

const Experience = () => {
  const timelineEntries = [
    {
      date: 'March 2024 — Present',
      title: 'BSc (Hons) IT — Data Science',
      org: 'Sri Lanka Institute of Information Technology (SLIIT)',
      desc: 'Studying Data Science and learning how to solve complex problems. I spend my time exploring machine learning models, algorithms, and full-stack web development. I\'m also active in student communities like AIESEC.',
      active: true,
    },
    {
      date: 'July 2025 — Present',
      title: 'Branch Coordinator & IM Lead',
      org: 'AIESEC in SLIIT · Northern University',
      desc: 'Helping coordinate student initiatives, managing team schedules, and facilitating smooth information flow across local branches.',
      active: true,
    },
    {
      date: 'May 2025',
      title: 'Workshop Facilitator',
      org: 'Yarl IT Hub · Madu Zone',
      desc: 'Ran hands-on sessions for students curious about tech, sharing my learning journey and introducing them to web development and data science.',
      active: true,
    },
    {
      date: '2026 — Target',
      title: 'Data Science Internship',
      org: 'Open to opportunities',
      desc: 'Looking for a chance to join a team as a Data Science or ML intern. I\'m eager to learn from experienced developers and contribute to real-world projects.',
      active: false, // Faded dot
    },
  ];

  return (
    <section 
      id="experience" 
      className="section-hidden bg-bg-section py-24 px-6 md:px-12 w-full transition-all duration-700"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-[11px] font-bold tracking-[0.2em] text-text-muted uppercase mb-3 block">
            My journey so far
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
            Career & <span className="text-accent-cyan">Experience</span>
          </h2>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative border-l border-border-dark pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-12">
          {timelineEntries.map((entry, idx) => (
            <div key={idx} className="relative group">
              
              {/* Dot marker */}
              <div 
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-bg-section transition-all duration-300 ${
                  entry.active 
                    ? 'bg-accent-cyan shadow-[0_0_8px_rgba(0,212,255,0.8)] group-hover:scale-110' 
                    : 'bg-transparent border-accent-cyan/40 scale-90'
                }`}
              />

              {/* Entry Content */}
              <div className={entry.active ? 'opacity-100' : 'opacity-60'}>
                {/* Date */}
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-accent-cyan uppercase block mb-1">
                  {entry.date}
                </span>

                {/* Title */}
                <h3 className="font-display text-base sm:text-lg font-bold text-text-main group-hover:text-accent-cyan transition-colors duration-200">
                  {entry.title}
                </h3>

                {/* Organization */}
                <span className="text-xs sm:text-sm text-text-muted font-medium block mb-3">
                  {entry.org}
                </span>

                {/* Description */}
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-light max-w-2xl">
                  {entry.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
