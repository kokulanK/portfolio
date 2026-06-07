import React, { useEffect, useRef } from 'react';

const TechStack = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ballsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  const techNames = [
    'Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'NumPy',
    'Pandas', 'React', 'Node.js', 'MongoDB', 'Docker', 'Flask',
    'Django', 'Java', 'Spring Boot', 'Git', 'Hugging Face',
    'OpenCV', 'MySQL', 'PostgreSQL', 'JWT', 'TypeScript', 'Angular'
  ];

  const colors = [
    '#00d4ff', // Cyan
    '#7c3aed', // Purple
    '#10b981', // Green
    '#f59e0b', // Amber/Orange
    '#ef4444', // Red
    '#8b5cf6', // Violet
    '#06b6d4', // Cyan 2
    '#84cc16'  // Lime
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // 3D Perspective settings
    const focalLength = 320; // Distance from viewport
    const depthRange = 180;  // Z goes from -depthRange to depthRange

    // Initialize/Update Canvas dimensions
    const updateSize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = 420;
      }
    };
    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Initialize 3D Balls
    if (ballsRef.current.length === 0) {
      ballsRef.current = techNames.map((name, index) => {
        const r = Math.max(30, name.length * 5.0);
        
        // Coordinates in 3D centered box:
        // x: [-width/2, width/2]
        // y: [-height/2, height/2]
        // z: [-depthRange, depthRange]
        const x = (Math.random() - 0.5) * (canvas.width * 0.7);
        const y = (Math.random() - 0.5) * (canvas.height * 0.7);
        const z = (Math.random() - 0.5) * (depthRange * 1.5);
        
        const vx = (Math.random() - 0.5) * 2.0;
        const vy = (Math.random() - 0.5) * 2.0;
        const vz = (Math.random() - 0.5) * 2.0;

        return {
          label: name,
          r,
          x,
          y,
          z,
          vx,
          vy,
          vz,
          color: colors[index % colors.length]
        };
      });
    }

    // Get cursor position relative to canvas top-left
    const getMouseCoords = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const handleMouseMove = (e) => {
      const coords = getMouseCoords(e.clientX, e.clientY);
      mouseRef.current = { x: coords.x, y: coords.y, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const coords = getMouseCoords(touch.clientX, touch.clientY);
        mouseRef.current = { x: coords.x, y: coords.y, active: true };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    // Physics Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const balls = ballsRef.current;
      const mouse = mouseRef.current;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 1. 3D Elastic Collisions & Overlap Separation
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const b1 = balls[i];
          const b2 = balls[j];

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dz = b2.z - b1.z;
          const dist = Math.hypot(dx, dy, dz);
          const minDist = b1.r + b2.r;

          if (dist < minDist && dist > 0) {
            const overlap = minDist - dist;
            
            // Normalize distance components
            const nx = dx / dist;
            const ny = dy / dist;
            const nz = dz / dist;

            // Separate the overlapping spheres in 3D
            b1.x -= nx * overlap * 0.5;
            b1.y -= ny * overlap * 0.5;
            b1.z -= nz * overlap * 0.5;
            b2.x += nx * overlap * 0.5;
            b2.y += ny * overlap * 0.5;
            b2.z += nz * overlap * 0.5;

            // Relative velocity vector
            const rvx = b2.vx - b1.vx;
            const rvy = b2.vy - b1.vy;
            const rvz = b2.vz - b1.vz;
            const velAlongNormal = rvx * nx + rvy * ny + rvz * nz;

            if (velAlongNormal < 0) {
              const m1 = b1.r; // Mass relative to radius size
              const m2 = b2.r;
              const impulse = (2 * velAlongNormal) / (m1 + m2);

              b1.vx += impulse * m2 * nx;
              b1.vy += impulse * m2 * ny;
              b1.vz += impulse * m2 * nz;
              b2.vx -= impulse * m1 * nx;
              b2.vy -= impulse * m1 * ny;
              b2.vz -= impulse * m1 * nz;
            }
          }
        }
      }

      // 2. Cursor repulsion, Position changes, Damping, and Wall bounce boundary updates
      balls.forEach(ball => {
        // Perspective Scaling factor
        // Z is back (-depthRange) to front (depthRange). Shift Z to positive axis to avoid division by zero
        const scale = focalLength / (focalLength + ball.z);
        const projectedX = centerX + ball.x * scale;
        const projectedY = centerY + ball.y * scale;

        // Interaction: 2D Screen Cursor Repulsion mapped to 3D Velocities
        if (mouse.active) {
          const dx = projectedX - mouse.x;
          const dy = projectedY - mouse.y;
          const dist2d = Math.hypot(dx, dy);

          if (dist2d < 120 && dist2d > 0) {
            const force = (120 - dist2d) / 120; // 0 to 1
            // Push outwards in 3D
            ball.vx += (dx / dist2d) * force * 0.6;
            ball.vy += (dy / dist2d) * force * 0.6;
            // Push deeper (along Z axis) for 3D repulsion depth movement
            ball.vz += force * 0.9;
          }
        }

        // Apply 3D friction/damping
        ball.vx *= 0.975;
        ball.vy *= 0.975;
        ball.vz *= 0.975;

        // Update positions
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.z += ball.vz;

        // Boundary bounding limits (elastic wall bounces in 3D coordinates)
        const boundX = (canvas.width / 2) - ball.r;
        const boundY = (canvas.height / 2) - ball.r;
        const boundZ = depthRange - ball.r;

        if (ball.x < -boundX) {
          ball.x = -boundX;
          ball.vx = Math.abs(ball.vx);
        } else if (ball.x > boundX) {
          ball.x = boundX;
          ball.vx = -Math.abs(ball.vx);
        }

        if (ball.y < -boundY) {
          ball.y = -boundY;
          ball.vy = Math.abs(ball.vy);
        } else if (ball.y > boundY) {
          ball.y = boundY;
          ball.vy = -Math.abs(ball.vy);
        }

        if (ball.z < -boundZ) {
          ball.z = -boundZ;
          ball.vz = Math.abs(ball.vz);
        } else if (ball.z > boundZ) {
          ball.z = boundZ;
          ball.vz = -Math.abs(ball.vz);
        }
      });

      // 3. Depth Sorting (Painters Algorithm)
      // Sort balls by depth (Z coordinate) descending. Furthest (lowest Z) first, closest (highest Z) last.
      balls.sort((a, b) => a.z - b.z);

      // 4. Render 3D Shadows & Bouncing Spheres
      balls.forEach(ball => {
        const scale = focalLength / (focalLength + ball.z);
        const projectedX = centerX + ball.x * scale;
        const projectedY = centerY + ball.y * scale;
        const projectedR = ball.r * scale;

        // Floor Shadow Effect (gives real 3D illusion of depth/height)
        const shadowY = canvas.height - 30;
        const distToFloor = shadowY - projectedY;
        const shadowScale = scale * Math.max(0.2, (1 - distToFloor / canvas.height));
        const shadowOpacity = Math.max(0, 0.25 * (1 - distToFloor / 180));

        ctx.beginPath();
        ctx.ellipse(projectedX, shadowY, ball.r * shadowScale, ball.r * 0.25 * shadowScale, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(5, 8, 16, ${shadowOpacity})`;
        ctx.fill();

        // 3D Sphere Shading (Radial Gradient with light highlight offset)
        const highlightX = projectedX - projectedR * 0.28;
        const highlightY = projectedY - projectedR * 0.28;

        const sphereGrad = ctx.createRadialGradient(
          highlightX, highlightY, projectedR * 0.05, // highlight point
          projectedX, projectedY, projectedR           // outer sphere rim
        );
        sphereGrad.addColorStop(0, '#ffffff'); // bright light source dot reflection
        sphereGrad.addColorStop(0.18, ball.color + 'e6'); // core light color (90% opacity)
        sphereGrad.addColorStop(0.85, ball.color + 'aa'); // mid-ambient shade (66% opacity)
        sphereGrad.addColorStop(1, '#050810'); // blends sphere edge shadow with core flat dark canvas

        // Fill sphere
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, projectedR, 0, Math.PI * 2);
        ctx.fillStyle = sphereGrad;
        ctx.fill();

        // Sphere outline
        ctx.strokeStyle = ball.color + '8c'; // 55% opacity rim
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Center Label Text
        ctx.fillStyle = '#ffffff'; // White text overlays on shaded balls
        ctx.font = `bold ${Math.min(11.5 * scale, projectedR * 0.38)}px "DM Sans", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ball.label, projectedX, projectedY);
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return (
    <section 
      id="techstack" 
      className="section-hidden bg-bg-section py-24 px-6 md:px-12 w-full transition-all duration-700"
    >
      <div ref={containerRef} className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-[11px] font-bold tracking-[0.2em] text-text-muted uppercase mb-3 block">
            Tools & technologies
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main mb-3">
            Technical <span className="text-accent-cyan">Skill Stack</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            Move your cursor over the canvas — the 3D balls follow
          </p>
        </div>

        {/* Bouncing 3D Balls Canvas */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-border-dark bg-[#0f1628]">
          <canvas 
            ref={canvasRef} 
            className="block cursor-crosshair w-full h-[420px]"
          />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
