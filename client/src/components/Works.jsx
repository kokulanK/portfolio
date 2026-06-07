import React from 'react';

const Works = () => {
  const projects = [
    {
      type: 'ML',
      title: 'Skin Disease Detection System',
      metric: 'AUC 0.982 · 88% accuracy',
      desc: 'A deep learning model trained to classify seven different skin conditions. I used transfer learning with an EfficientNet-B0 base, optimized the training splits, and deployed it as a live web application so users can try it out.',
      tech: ['TensorFlow', 'Keras', 'HuggingFace'],
      linkText: 'Live Space ↗',
      link: 'https://huggingface.co/spaces/kokulan123/skin-lesion-api',
    },
    {
      type: 'Full-Stack',
      title: 'Medi Connect',
      metric: '6 user roles · React Native + Web',
      desc: 'A health portal linking web dashboards and mobile apps. It connects patient records directly to a diagnostic scanner powered by my skin detection model, aiming to make clinical work a little easier.',
      tech: ['MERN', 'React Native', 'Flask'],
      linkText: 'Live App ↗',
      link: 'https://hospital-management-system-three-ebon.vercel.app/',
    },
    {
      type: 'Full-Stack',
      title: 'Task Management App',
      metric: 'Dockerized · JWT Auth',
      desc: 'A task manager built to handle roles and secure user access. It features structured databases, secure tokens, and clean layouts, all packaged neatly using Docker containers.',
      tech: ['Spring Boot', 'Angular', 'Docker'],
      linkText: 'GitHub Repo ↗',
      link: 'https://github.com/kokulanK/task-manager-app',
    },
    {
      type: 'IoT',
      title: 'Home Automation & Solar Tracker',
      metric: 'Arduino · Sensor Integration',
      desc: 'A physical hardware project using sensors and servos to track the sun, mimicking a sunflower. It also includes automated controls for home appliances.',
      tech: ['Arduino', 'C++', 'IoT'],
      linkText: null, // No link
      link: '#',
    },
  ];

  return (
    <section 
      id="works" 
      className="section-hidden bg-bg-primary py-24 px-6 md:px-12 w-full transition-all duration-700"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-[11px] font-bold tracking-[0.2em] text-text-muted uppercase mb-3 block">
            Projects I've built
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
            Works & <span className="text-accent-cyan">Applications</span>
          </h2>
        </div>

        {/* 2-Column responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((proj, idx) => {
            // Determine type color mappings
            let badgeStyle = '';
            if (proj.type === 'ML') {
              badgeStyle = 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20';
            } else if (proj.type === 'Full-Stack') {
              badgeStyle = 'bg-accent-purple/10 text-purple-400 border-accent-purple/20';
            } else {
              badgeStyle = 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
            }

            return (
              <div
                key={idx}
                className="group flex flex-col justify-between bg-bg-card border border-border-dark rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/40 hover:shadow-[0_4px_24px_rgba(0,212,255,0.03)]"
              >
                {/* Upper Content */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    {/* Badge */}
                    <span className={`text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded border ${badgeStyle}`}>
                      {proj.type}
                    </span>

                    {/* Metric pill */}
                    <span className="text-[10px] font-bold tracking-wider text-accent-cyan px-2.5 py-1 rounded-full bg-accent-cyan/5 border border-accent-cyan/15">
                      {proj.metric}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg sm:text-xl font-bold text-text-main group-hover:text-accent-cyan transition-colors duration-200 mb-4">
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-light mb-6">
                    {proj.desc}
                  </p>
                </div>

                {/* Footer Section: Tech Tags & Links */}
                <div className="flex items-center justify-between border-t border-border-dark pt-5 mt-2">
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map((t, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="text-[10px] text-text-muted bg-bg-primary border border-border-dark px-2.5 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {proj.linkText ? (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-accent-cyan hover:underline transition-all"
                    >
                      {proj.linkText}
                    </a>
                  ) : (
                    <span className="text-xs text-text-muted select-none">
                      Physical Build
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Works;
