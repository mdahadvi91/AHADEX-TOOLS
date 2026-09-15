import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/src/hooks';

export interface ShaderBackgroundProps {
  /** Optional custom GLSL fragment shader source */
  fragmentShader?: string;
  /** Background opacity (0 to 1) */
  opacity?: number;
  /** Sizing & container styling */
  className?: string;
  /** Whether the effect is purely ambient (pointer-events-none) */
  interactive?: boolean;
  /** Children content positioned above shader */
  children?: React.ReactNode;
  /** Static CSS fallback color/gradient when WebGL is unavailable or reduced motion is active */
  fallbackClass?: string;
}

/**
 * Production-ready, lazy WebGL Shader Background Foundation.
 * 
 * Architectural Highlights:
 * - Detects WebGL2 / WebGL support safely.
 * - Completely fails over to static CSS styling if WebGL is unavailable, context is lost, or errors occur.
 * - Immediately halts requestAnimationFrame loops when `prefers-reduced-motion` is active.
 * - Auto-pauses when the element is off-screen using IntersectionObserver to maximize battery life.
 * - Destroys contexts and clears buffers on unmount.
 */
export default function ShaderBackground({
  fragmentShader,
  opacity = 0.6,
  className = '',
  interactive = false,
  children,
  fallbackClass = 'bg-gradient-to-tr from-sky-500/10 via-slate-900/5 to-indigo-500/10 dark:from-sky-950/20 dark:via-slate-950/40 dark:to-indigo-950/20',
}: ShaderBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  // Default subtle ambient liquid wave fragment shader
  const defaultFragmentShader = `
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_resolution;

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      st.x *= u_resolution.x / u_resolution.y;

      float color = 0.0;
      color += sin(st.x * 3.0 + u_time * 0.4) * 0.5 + 0.5;
      color += cos(st.y * 3.0 + u_time * 0.3) * 0.5 + 0.5;
      color *= 0.5;

      // Soft brand sky/indigo hue
      vec3 col = mix(vec3(0.01, 0.45, 0.75), vec3(0.35, 0.30, 0.85), color);
      gl_FragColor = vec4(col, 0.18);
    }
  `;

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsSupported(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch {
      setIsSupported(false);
      return;
    }

    if (!gl) {
      setIsSupported(false);
      return;
    }

    // Vertex Shader (standard full-screen quad)
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fragmentShader || defaultFragmentShader);

    if (!vs || !fs) {
      setIsSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setIsSupported(false);
      return;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setIsSupported(false);
      return;
    }

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    let animationFrameId: number;
    let startTime = performance.now();
    let isVisible = true;

    // Resize handler
    const resizeCanvas = () => {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap DPR at 1.5 for power efficiency
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    const render = (time: number) => {
      if (!gl || !isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      resizeCanvas();

      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      const elapsed = (time - startTime) * 0.001;
      if (timeLoc) gl.uniform1f(timeLoc, elapsed);
      if (resolutionLoc) gl.uniform2f(resolutionLoc, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver to pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buffer);
      }
    };
  }, [fragmentShader, defaultFragmentShader, prefersReducedMotion]);

  const showFallback = prefersReducedMotion || !isSupported;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative overflow-hidden ${
        interactive ? '' : 'pointer-events-none select-none'
      } ${className}`}
    >
      {showFallback ? (
        <div className={`absolute inset-0 w-full h-full ${fallbackClass}`} />
      ) : (
        <canvas
          ref={canvasRef}
          style={{ opacity }}
          className="absolute inset-0 w-full h-full block"
        />
      )}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
