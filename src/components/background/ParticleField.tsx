import { useEffect, useRef } from "react";
import { useReducedMotion } from "@hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

const COLORS = [
  "216, 139, 154",   // rose
  "201, 150, 103",   // gold
  "232, 180, 184",   // blush
  "139, 58, 79",     // wine
];

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    const isMobile = window.innerWidth < 768;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = isMobile ? 40 : 90;
      particles = Array.from({ length: count }, () => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 1 + Math.random() * 2.5,
          color,
          alpha: 0.3 + Math.random() * 0.5,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.005 + Math.random() * 0.015,
        };
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Mouse repulsion
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist2 = dx * dx + dy * dy;
          const radius = 140;
          if (dist2 < radius * radius && dist2 > 1) {
            const dist = Math.sqrt(dist2);
            const force = (1 - dist / radius) * 0.6;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        const pulsingAlpha = p.alpha + Math.sin(p.pulse) * 0.15;

        // Glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, `rgba(${p.color}, ${pulsingAlpha})`);
        gradient.addColorStop(1, `rgba(${p.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(${p.color}, ${Math.min(1, pulsingAlpha + 0.2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
