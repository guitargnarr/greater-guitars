/**
 * GrainDripBg: Faint grain-drip accent for individual sections
 *
 * Contained version — renders as position:absolute inside its parent section.
 * Uses ResizeObserver to match parent dimensions. Much subtler than the hero version.
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
  hue: number;
}

export default function GrainDripBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const linesRef = useRef<GrainLine[]>([]);
  const timeRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const createLine = (w: number, h: number, fromTop: boolean): GrainLine => {
      const x = Math.random() * w;
      return {
        x,
        baseX: x,
        y: fromTop ? -Math.random() * h * 0.3 : Math.random() * h,
        speed: 0.06 + Math.random() * 0.15,
        length: 0,
        maxLength: 20 + Math.random() * 80,
        opacity: 0.02 + Math.random() * 0.07,
        width: 0.3 + Math.random() * 0.8,
        wobbleAmp: 1 + Math.random() * 3,
        wobbleFreq: 0.002 + Math.random() * 0.006,
        phase: Math.random() * Math.PI * 2,
        hue: 42 + Math.random() * 16,
      };
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };

      // Initialize lines
      const count = Math.floor(w / 18);
      const lines: GrainLine[] = [];
      for (let i = 0; i < count; i++) {
        lines.push(createLine(w, h, false));
      }
      linesRef.current = lines;
    };

    const draw = () => {
      const { w, h } = sizeRef.current;
      if (w === 0 || h === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      timeRef.current += 1;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      const lines = linesRef.current;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.length < line.maxLength) {
          line.length += line.speed * 0.4;
        }

        line.y += line.speed;

        const wobble = Math.sin(line.y * line.wobbleFreq + line.phase + t * 0.003) * line.wobbleAmp;
        line.x = line.baseX + wobble;

        const gradient = ctx.createLinearGradient(line.x, line.y - line.length, line.x, line.y);
        gradient.addColorStop(0, `hsla(${line.hue}, 55%, 55%, 0)`);
        gradient.addColorStop(0.3, `hsla(${line.hue}, 55%, 55%, ${line.opacity * 0.5})`);
        gradient.addColorStop(0.7, `hsla(${line.hue}, 60%, 50%, ${line.opacity})`);
        gradient.addColorStop(1, `hsla(${line.hue}, 50%, 45%, ${line.opacity * 0.2})`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = line.width;
        ctx.lineCap = "round";

        const segments = 5;
        const segLen = line.length / segments;
        ctx.moveTo(line.x, line.y - line.length);
        for (let s = 1; s <= segments; s++) {
          const sy = line.y - line.length + segLen * s;
          const sx = line.baseX + Math.sin(sy * line.wobbleFreq + line.phase + t * 0.003) * line.wobbleAmp;
          ctx.lineTo(sx, sy);
        }
        ctx.stroke();

        if (line.y - line.length > h) {
          lines[i] = createLine(w, h, true);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    animRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    return () => {
      ro.disconnect();
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
