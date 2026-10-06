import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@hooks/useReducedMotion";

/**
 * CSS-based particle background.
 * Replaces previous Three.js WebGL version — saves ~500KB.
 * Uses absolutely-positioned colored dots + Framer Motion animations.
 * Same visual intent: soft floating particles with a rose/gold palette.
 */

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
}

const PALETTE = ["#D88B9A", "#E8B4B8", "#C99667", "#B36878", "#E5C9A4"];

export function GridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (prefersReduced) return;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 40 : 90;
    const next: Particle[] = [];
    for (let i = 0; i < count; i++) {
      next.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 6,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        duration: 12 + Math.random() * 14,
        delay: Math.random() * 6,
        driftX: (Math.random() - 0.5) * 30,
        driftY: (Math.random() - 0.5) * 30,
      });
    }
    setParticles(next);
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
      }}
    >
      {/* Static dot grid */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(216,139,154,0.22) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.6, 0.4, 0.6, 0],
            x: [0, p.driftX, 0, -p.driftX * 0.5, 0],
            y: [0, p.driftY, 0, -p.driftY * 0.5, 0],
            scale: [0.8, 1.2, 1, 1.1, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
