import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas sizes
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Configuration
    const particleCount = 60;
    const particles = [];
    const connectionDist = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce boundaries
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.4)';
        ctx.fill();
      }
    }

    // Populate particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = 0.08 * (1 - dist / connectionDist);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleDownloadCV = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/download-cv`)
      .then(res => {
        if (!res.ok) throw new Error('CV not found on server');
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
      .catch(err => {
        console.error('Download error:', err);
        alert('Unable to download CV. Please verify that the server is running and the CV file exists at server/assets/Kokulan_Kugathasan_CV.pdf');
      });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative flex min-h-[calc(100vh-60px)] w-full overflow-hidden bg-bg-primary px-6 py-12 md:px-12 flex-col justify-center"
    >
      {/* Particle Network Canvas */}
      <canvas 
        ref={canvasRef} 
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      {/* Hero Content Wrapper */}
      <div className="mx-auto relative z-10 w-full max-w-7xl">
        <div className="max-w-3xl">
          {/* Greeting */}
          <span className="text-xs font-semibold tracking-[0.25em] text-accent-cyan uppercase block mb-4">
            Hello, I'm
          </span>

          {/* Name */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-text-main leading-[1.05] mb-6">
            Kokulan <br />
            <span className="text-accent-cyan">Kugathasan</span>
          </h1>

          {/* Role */}
          <p className="text-base sm:text-lg md:text-xl text-text-muted font-light leading-relaxed mb-10">
            I'm a Data Science student at SLIIT with a deep curiosity for Machine Learning. I love taking complex datasets, finding the patterns inside them, and building web apps that bring models to life.
          </p>

          {/* Actions Button Row */}
          <div className="flex flex-wrap gap-4 mb-20">
            <button
              onClick={() => scrollToSection('works')}
              className="px-8 py-3.5 bg-accent-cyan text-bg-primary font-display font-bold text-xs uppercase tracking-wider rounded-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              View my work
            </button>
            
            <button
              onClick={handleDownloadCV}
              className="px-8 py-3.5 border border-border-dark text-text-main bg-transparent font-display font-bold text-xs uppercase tracking-wider rounded-lg transition-colors duration-200 hover:border-accent-cyan hover:text-accent-cyan hover:bg-accent-cyan/5 active:scale-[0.98]"
            >
              Download CV
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3.5 border border-border-dark text-text-main bg-transparent font-display font-bold text-xs uppercase tracking-wider rounded-lg transition-colors duration-200 hover:border-accent-cyan hover:text-accent-cyan hover:bg-accent-cyan/5 active:scale-[0.98]"
            >
              Get in touch
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="w-full border-t border-border-dark pt-10 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-text-main">
                0.982<span className="text-accent-cyan">+</span>
              </div>
              <div className="text-[11px] font-semibold text-text-muted tracking-wider uppercase mt-1">
                Macro-AUC (Skin Model)
              </div>
            </div>
            
            <div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-text-main">
                7<span className="text-accent-cyan">+</span>
              </div>
              <div className="text-[11px] font-semibold text-text-muted tracking-wider uppercase mt-1">
                Projects Completed
              </div>
            </div>

            <div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-text-main">
                88<span className="text-accent-cyan">%</span>
              </div>
              <div className="text-[11px] font-semibold text-text-muted tracking-wider uppercase mt-1">
                Model Accuracy
              </div>
            </div>

            <div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-text-main">
                2<span className="text-accent-cyan">+</span>
              </div>
              <div className="text-[11px] font-semibold text-text-muted tracking-wider uppercase mt-1">
                Years Building
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
