/**
 * GrainDripHero: Animated wood-grain drip lines inspired by the painted guitar body
 *
 * Visual: Thin vertical lines that slowly flow downward like paint drips or
 * exposed wood grain through black — antique gold on void black.
 * Uses Canvas 2D for performance (no Three.js needed for 2D effect).
 */

import { useRef, useEffect } from "react";

interface GrainLine {
  x: number;
  baseX: number;
  y: number;
  speed: number;
  length: number;
  maxLength: number;
  opacity: number;
  width: number;
  wobbleAmp: number;
  wobbleFreq: number;
  phase: number;
  hue: number; // gold range variation
}

export default function GrainDripHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const linesRef = useRef<GrainLine[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initLines();
    };

    const initLines = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const count = Math.floor(w / 8); // ~1 line per 8px
      const lines: GrainLine[] = [];

      for (let i = 0; i < count; i++) {
        lines.push(createLine(w, h, false));
      }
      linesRef.current = lines;
    };

    const createLine = (w: number, h: number, fromTop: boolean): GrainLine => {
      const x = Math.random() * w;
      return {
        x,
        baseX: x,
        y: fromTop ? -Math.random() * h * 0.3 : Math.random() * h,
        speed: 0.15 + Math.random() * 0.4,
        length: 0,
        maxLength: 40 + Math.random() * 160,
        opacity: 0.03 + Math.random() * 0.18,
        width: 0.5 + Math.random() * 1.5,
        wobbleAmp: 1 + Math.random() * 4,
        wobbleFreq: 0.003 + Math.random() * 0.008,
        phase: Math.random() * Math.PI * 2,
        hue: 42 + Math.random() * 16, // gold range: 42-58
      };
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      timeRef.current += 1;
      const t = timeRef.current;

      // Fade trail effect — slow fade for ghostly persistence
      ctx.fillStyle = "rgba(12, 10, 8, 0.06)";
      ctx.fillRect(0, 0, w, h);

      const lines = linesRef.current;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Grow length to max
        if (line.length < line.maxLength) {
          line.length += line.speed * 0.8;
        }

        // Move downward
        line.y += line.speed;

        // Wobble horizontally — organic wave
        const wobble = Math.sin(line.y * line.wobbleFreq + line.phase + t * 0.005) * line.wobbleAmp;
        line.x = line.baseX + wobble;

        // Draw the grain line
        const gradient = ctx.createLinearGradient(line.x, line.y - line.length, line.x, line.y);
        gradient.addColorStop(0, `hsla(${line.hue}, 55%, 55%, 0)`);
        gradient.addColorStop(0.3, `hsla(${line.hue}, 55%, 55%, ${line.opacity * 0.6})`);
        gradient.addColorStop(0.7, `hsla(${line.hue}, 60%, 50%, ${line.opacity})`);
        gradient.addColorStop(1, `hsla(${line.hue}, 50%, 45%, ${line.opacity * 0.3})`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = line.width;
        ctx.lineCap = "round";

        // Draw as a slightly curved path for organic feel
        const segments = 6;
        const segLen = line.length / segments;
        ctx.moveTo(line.x, line.y - line.length);
        for (let s = 1; s <= segments; s++) {
          const sy = line.y - line.length + segLen * s;
          const sx = line.baseX + Math.sin(sy * line.wobbleFreq + line.phase + t * 0.005) * line.wobbleAmp;
          ctx.lineTo(sx, sy);
        }
        ctx.stroke();

        // Recycle lines that go off screen
        if (line.y - line.length > h) {
          lines[i] = createLine(w, h, true);
        }
      }

      // Occasional bright shimmer flash on random lines
      if (t % 120 === 0) {
        const idx = Math.floor(Math.random() * lines.length);
        if (lines[idx]) {
          lines[idx].opacity = Math.min(lines[idx].opacity + 0.1, 0.35);
        }
      }

      // Slow decay of shimmer
      for (const line of lines) {
        if (line.opacity > 0.2) {
          line.opacity -= 0.001;
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    // Initial fill to black
    ctx.fillStyle = "#0c0a08";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
