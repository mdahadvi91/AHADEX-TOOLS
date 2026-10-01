import { useReducedMotion } from "@hooks/useReducedMotion";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  emoji: string;
  opacity: number;
}

const EMOJIS = ["🌸", "🌺", "🌷", "💗", "🌹"];

const PETALS: Petal[] = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 15,
  duration: 12 + Math.random() * 10,
  size: 14 + Math.random() * 18,
  emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
  opacity: 0.4 + Math.random() * 0.4,
}));

export function FallingPetals() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-[9] overflow-hidden pointer-events-none"
    >
      {PETALS.map((p) => (
        <span
          key={p.id}
          className="absolute top-[-10vh] select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `petal-fall-slow ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
