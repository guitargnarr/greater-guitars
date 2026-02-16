/**
 * GrainDripHero: Ink-drip animation — dark ink lines bleeding down on newsprint
 *
 * Reframed for the Zine Shop aesthetic: think cheap paper, bleeding ink,
 * xerox artifacts. Some lines tinted safety orange.
 */

import { useRef, useEffect } from "react";

interface InkLine {
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
  isOrange: boolean;
}

export default function GrainDripHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const linesRef = useRef<InkLine[]>([]);
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
      const count = Math.floor(w / 10);
      const lines: InkLine[] = [];

      for (let i = 0; i < count; i++) {
        lines.push(createLine(w, h, false));
      }
      linesRef.current = lines;
    };

    const createLine = (w: number, h: number, fromTop: boolean): InkLine => {
      const x = Math.random() * w;
      return {
        x,
        baseX: x,
        y: fromTop ? -Math.random() * h * 0.3 : Math.random() * h,
        speed: 0.12 + Math.random() * 0.35,
        length: 0,
        maxLength: 30 + Math.random() * 140,
        opacity: 0.04 + Math.random() * 0.14,
        width: 0.5 + Math.random() * 1.8,
        wobbleAmp: 0.5 + Math.random() * 3,
        wobbleFreq: 0.003 + Math.random() * 0.008,
        phase: Math.random() * Math.PI * 2,
        isOrange: Math.random() < 0.15, // 15% of lines are orange
      };
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      timeRef.current += 1;
      const t = timeRef.current;

      // Fade trail — ink persistence on newsprint
      ctx.fillStyle = "rgba(26, 26, 24, 0.05)";
      ctx.fillRect(0, 0, w, h);

      const lines = linesRef.current;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.length < line.maxLength) {
          line.length += line.speed * 0.8;
        }

        line.y += line.speed;

        const wobble = Math.sin(line.y * line.wobbleFreq + line.phase + t * 0.005) * line.wobbleAmp;
        line.x = line.baseX + wobble;

        const gradient = ctx.createLinearGradient(line.x, line.y - line.length, line.x, line.y);

        if (line.isOrange) {
          gradient.addColorStop(0, `rgba(255, 94, 26, 0)`);
          gradient.addColorStop(0.3, `rgba(255, 94, 26, ${line.opacity * 0.6})`);
          gradient.addColorStop(0.7, `rgba(255, 94, 26, ${line.opacity})`);
          gradient.addColorStop(1, `rgba(255, 94, 26, ${line.opacity * 0.3})`);
        } else {
          gradient.addColorStop(0, `rgba(242, 239, 232, 0)`);
          gradient.addColorStop(0.3, `rgba(242, 239, 232, ${line.opacity * 0.5})`);
          gradient.addColorStop(0.7, `rgba(220, 216, 208, ${line.opacity})`);
          gradient.addColorStop(1, `rgba(200, 196, 188, ${line.opacity * 0.3})`);
        }

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = line.width;
        ctx.lineCap = "round";

        const segments = 6;
        const segLen = line.length / segments;
        ctx.moveTo(line.x, line.y - line.length);
        for (let s = 1; s <= segments; s++) {
          const sy = line.y - line.length + segLen * s;
          const sx = line.baseX + Math.sin(sy * line.wobbleFreq + line.phase + t * 0.005) * line.wobbleAmp;
          ctx.lineTo(sx, sy);
        }
        ctx.stroke();

        if (line.y - line.length > h) {
          lines[i] = createLine(w, h, true);
        }
      }

      // Occasional bright flash
      if (t % 90 === 0) {
        const idx = Math.floor(Math.random() * lines.length);
        if (lines[idx]) {
          lines[idx].opacity = Math.min(lines[idx].opacity + 0.08, 0.3);
        }
      }

      for (const line of lines) {
        if (line.opacity > 0.18) {
          line.opacity -= 0.001;
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    ctx.fillStyle = "#1a1a18";
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
