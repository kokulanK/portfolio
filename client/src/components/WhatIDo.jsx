import React from 'react';

const WhatIDo = () => {
  const cards = [
    {
      emoji: '🧠',
      title: 'Machine Learning',
      desc: 'I love teaching computers to see and understand images. From training neural networks to fine-tuning vision models, I enjoy building tools that solve real-world problems.',
    },
    {
      emoji: '📊',
      title: 'Data Science',
      desc: 'I enjoy finding the stories hidden in messy datasets. Whether it\'s cleaning data, analyzing trends, or validating ideas, I focus on making insights clear and reliable.',
    },
    {
      emoji: '🚀',
      title: 'ML Deployment',
      desc: 'A model is most helpful when anyone can play with it. I set up live APIs and web endpoints so people can interact with my machine learning systems in real-time.',
    },
    {
      emoji: '⚙️',
      title: 'Full-Stack Development',
      desc: 'I bridge the gap between back-end data and user experience. By writing clean code and building smooth layouts, I turn complex systems into friendly interfaces.',
    },
  ];

  return (
    <section 
      id="whatido" 
      className="section-hidden bg-bg-primary py-24 px-6 md:px-12 w-full transition-all duration-700"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-[11px] font-bold tracking-[0.2em] text-text-muted uppercase mb-3 block">
            My areas of expertise
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
            What I love <span className="text-accent-cyan">doing</span>
          </h2>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group relative bg-bg-card border border-border-dark rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/30 hover:shadow-[0_4px_24px_rgba(0,212,255,0.03)]"
            >
              {/* Animated Top Border Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-cyan to-accent-purple origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              
              {/* Emoji Icon Container */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-cyan/5 border border-accent-cyan/15 text-2xl mb-6">
                {card.emoji}
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-bold text-text-main mb-4 group-hover:text-accent-cyan transition-colors duration-200">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-light">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
