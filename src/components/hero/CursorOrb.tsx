import { useEffect, useRef } from "react";
import { useReducedMotion } from "@hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export function CursorOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Orb state (spring follow)
    let orbX = 0;
    let orbY = 0;
    let targetX = 0;
    let targetY = 0;
    let orbVX = 0;
    let orbVY = 0;
    let initialized = false;

    const particles: Particle[] = [];
    const isMobile = window.innerWidth < 768;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!initialized) {
        orbX = targetX;
        orbY = targetY;
        initialized = true;
      }
      // Emit particles
      if (!isMobile) {
        const count = 2;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: targetX + (Math.random() - 0.5) * 10,
            y: targetY + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2 - 0.3,
            life: 0,
            maxLife: 40 + Math.random() * 30,
            size: 1 + Math.random() * 2.5,
          });
        }
      }
      if (particles.length > 120) particles.splice(0, particles.length - 120);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Spring physics for orb
      const stiffness = 0.12;
      const damping = 0.78;
      orbVX += (targetX - orbX) * stiffness;
      orbVY += (targetY - orbY) * stiffness;
      orbVX *= damping;
      orbVY *= damping;
      orbX += orbVX;
      orbY += orbVY;

      // Draw orb — layered glow
      const orbR = isMobile ? 40 : 60;
      const outer = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbR * 2.5);
      outer.addColorStop(0, "rgba(216, 139, 154, 0.25)");
      outer.addColorStop(0.5, "rgba(201, 150, 103, 0.12)");
      outer.addColorStop(1, "rgba(216, 139, 154, 0)");
      ctx.fillStyle = outer;
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbR * 2.5, 0, Math.PI * 2);
      ctx.fill();

      const mid = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbR);
      mid.addColorStop(0, "rgba(232, 180, 184, 0.55)");
      mid.addColorStop(0.6, "rgba(216, 139, 154, 0.25)");
      mid.addColorStop(1, "rgba(139, 58, 79, 0)");
      ctx.fillStyle = mid;
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbR, 0, Math.PI * 2);
      ctx.fill();

      const core = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbR * 0.28);
      core.addColorStop(0, "rgba(255, 251, 247, 0.9)");
      core.addColorStop(1, "rgba(255, 251, 247, 0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbR * 0.28, 0, Math.PI * 2);
      ctx.fill();

      // Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02;
        p.life++;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        const alpha = 1 - p.life / p.maxLife;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        grad.addColorStop(0, `rgba(216, 139, 154, ${alpha * 0.9})`);
        grad.addColorStop(1, `rgba(216, 139, 154, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-[5] pointer-events-none mix-blend-screen"
    />
  );
}
