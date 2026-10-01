import { useEffect, useRef, useState } from "react";
import { cn } from "@lib/cn";

interface LiveTextProps {
  text: string;
  className?: string;
  waveAmplitude?: number;
  waveDuration?: number;
  letterStagger?: number;
  gradient?: "rose" | "warm" | "cool" | "none";
  /** Letters push away from cursor */
  magnetic?: boolean;
  as?: "span" | "h1" | "h2" | "h3";
}

const GRADIENTS: Record<string, string> = {
  rose: "linear-gradient(90deg, #B36878 0%, #D88B9A 25%, #C99667 50%, #8B3A4F 75%, #B36878 100%)",
  warm: "linear-gradient(90deg, #D88B9A 0%, #E8B4B8 25%, #E5C9A4 50%, #C99667 75%, #D88B9A 100%)",
  cool: "linear-gradient(90deg, #8B3A4F 0%, #B36878 33%, #D88B9A 66%, #8B3A4F 100%)",
};

const DARK_GRADIENTS: Record<string, string> = {
  rose: "linear-gradient(90deg, #E8B4B8 0%, #D88B9A 25%, #E5C9A4 50%, #F0DCC4 75%, #E8B4B8 100%)",
  warm: "linear-gradient(90deg, #F0DCC4 0%, #E8B4B8 25%, #E5C9A4 50%, #D88B9A 75%, #F0DCC4 100%)",
  cool: "linear-gradient(90deg, #F0DCC4 0%, #E8B4B8 33%, #D88B9A 66%, #F0DCC4 100%)",
};

export function LiveText({
  text,
  className,
  waveAmplitude = 8,
  waveDuration = 2.5,
  letterStagger = 0.1,
  gradient = "none",
  magnetic = false,
  as: Tag = "span",
}: LiveTextProps) {
  const [ready, setReady] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    setReady(true);
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!magnetic) return;
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [magnetic]);

  // Apply magnetic displacement each frame
  useEffect(() => {
    if (!magnetic || !ready) return;
    let raf = 0;
    const radius = 180;

    const tick = () => {
      const { x: mx, y: my, active } = mouseRef.current;
      letterRefs.current.forEach((el) => {
        if (!el) return;
        if (!active) {
          el.style.setProperty("--mx", "0px");
          el.style.setProperty("--my", "0px");
          return;
        }
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radius && dist > 1) {
          const force = (1 - dist / radius) * 24;
          el.style.setProperty("--mx", `${(dx / dist) * force}px`);
          el.style.setProperty("--my", `${(dy / dist) * force}px`);
        } else {
          el.style.setProperty("--mx", "0px");
          el.style.setProperty("--my", "0px");
        }
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [magnetic, ready]);

  const chars = text.split("");
  const totalChars = Math.max(chars.length - 1, 1);
  const gradientCSS = gradient !== "none"
    ? (isDark ? DARK_GRADIENTS[gradient] : GRADIENTS[gradient])
    : null;

  return (
    <>
      <style>{`
        @keyframes ahadex-live-wave {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(0px, -${waveAmplitude}px); }
        }
      `}</style>

      <Tag
        ref={containerRef as React.RefObject<HTMLSpanElement>}
        className={cn("inline-block", className)}
        aria-label={text}
      >
        {chars.map((char, i) => {
          const style: React.CSSProperties = {
            display: "inline-block",
            animation: ready
              ? `ahadex-live-wave ${waveDuration}s ease-in-out ${i * letterStagger}s infinite`
              : "none",
            willChange: "transform",
            transform: "translate(var(--mx, 0px), var(--my, 0px))",
            transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          };

          if (gradientCSS) {
            const pct = (i / totalChars) * 100;
            style.backgroundImage = gradientCSS;
            style.backgroundSize = `${chars.length * 100}% 100%`;
            style.backgroundPosition = `${pct}% 50%`;
            style.backgroundRepeat = "no-repeat";
            (style as Record<string, unknown>).WebkitBackgroundClip = "text";
            (style as Record<string, unknown>).backgroundClip = "text";
            (style as Record<string, unknown>).WebkitTextFillColor = "transparent";
            (style as Record<string, unknown>).color = "transparent";
          }

          return (
            <span
              key={i}
              ref={(el) => { letterRefs.current[i] = el; }}
              aria-hidden="true"
              style={style}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </Tag>
    </>
  );
}
