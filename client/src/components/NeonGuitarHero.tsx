/**
 * NeonGuitarHero: Flickering neon guitar sign animation
 *
 * Visual: Electric guitar outline rendered as neon tubes in green and yellow,
 * flickering like an old bar sign. Canvas 2D for performance.
 */

import { useRef, useEffect } from "react";

// Electric guitar — bold double cutaway. Exaggerated horns for instant recognition.
// The horns are THE visual signature that separates electric from acoustic.
// Normalized 0-1. Center body at 0.50. Horns go UP to ~0.20.
const GUITAR_PATHS: number[][][] = [
  // ── TREBLE HORN (right, taller) ──
  [
    [0.55, 0.55], [0.60, 0.52], [0.63, 0.46], [0.64, 0.38],
    [0.62, 0.30], [0.58, 0.24], [0.55, 0.22],
  ],
  // ── NECK (right side) ──
  [
    [0.55, 0.22], [0.54, 0.17], [0.54, 0.11], [0.54, 0.06],
  ],
  // ── HEADSTOCK ──
  [
    [0.54, 0.06], [0.56, 0.045], [0.58, 0.03], [0.565, 0.015],
    [0.50, 0.005], [0.435, 0.015], [0.42, 0.03],
    [0.44, 0.045], [0.46, 0.06],
  ],
  // ── NECK (left side) ──
  [
    [0.46, 0.06], [0.46, 0.11], [0.46, 0.17], [0.45, 0.22],
  ],
  // ── BASS HORN (left, slightly shorter) ──
  [
    [0.45, 0.22], [0.42, 0.24], [0.38, 0.30], [0.36, 0.38],
    [0.37, 0.46], [0.40, 0.52], [0.45, 0.55],
  ],
  // ── WAIST LEFT — deep cut to lower body ──
  [
    [0.45, 0.55], [0.38, 0.58], [0.30, 0.62], [0.26, 0.68],
  ],
  // ── LOWER BODY LEFT ──
  [
    [0.26, 0.68], [0.25, 0.76], [0.30, 0.84], [0.38, 0.89],
  ],
  // ── BOTTOM ──
  [
    [0.38, 0.89], [0.44, 0.92], [0.50, 0.93], [0.56, 0.92],
    [0.62, 0.89],
  ],
  // ── LOWER BODY RIGHT ──
  [
    [0.62, 0.89], [0.70, 0.84], [0.75, 0.76], [0.74, 0.68],
  ],
  // ── WAIST RIGHT — deep cut back to treble horn ──
  [
    [0.74, 0.68], [0.70, 0.62], [0.62, 0.58], [0.55, 0.55],
  ],
  // ── DETAILS ──
  // Bridge
  [
    [0.38, 0.78], [0.62, 0.78],
  ],
  // Neck pickup
  [
    [0.42, 0.52], [0.58, 0.52],
  ],
  // Bridge pickup
  [
    [0.36, 0.68], [0.64, 0.68],
  ],
];

interface NeonSegment {
  brightness: number;
  targetBrightness: number;
  flickerTimer: number;
  flickerDuration: number;
  nextFlicker: number;
  broken: boolean; // stays dim for extended period
  brokenTimer: number;
  colorIndex: number; // 0 = green, 1 = yellow
}

export default function NeonGuitarHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const segmentsRef = useRef<NeonSegment[]>([]);
  const timeRef = useRef(0);
  const surgeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize segment flicker states
    segmentsRef.current = GUITAR_PATHS.map((_, i) => ({
      brightness: 0.7 + Math.random() * 0.3,
      targetBrightness: 1,
      flickerTimer: 0,
      flickerDuration: 0,
      nextFlicker: Math.floor(30 + Math.random() * 120),
      broken: false,
      brokenTimer: 0,
      colorIndex: i % 3 === 0 ? 1 : 0, // mix green and yellow
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const NEON_GREEN = [120, 100, 55] as const; // hsl
    const NEON_YELLOW = [58, 100, 55] as const;

    const getColor = (seg: NeonSegment, alpha: number) => {
      const [h, s, l] = seg.colorIndex === 0 ? NEON_GREEN : NEON_YELLOW;
      return `hsla(${h}, ${s}%, ${l}%, ${alpha * seg.brightness})`;
    };

    const drawNeonPath = (
      points: number[][],
      seg: NeonSegment,
      w: number,
      h: number,
      scale: number,
      offsetX: number,
      offsetY: number,
    ) => {
      if (points.length < 2) return;

      const mapX = (x: number) => x * scale + offsetX;
      const mapY = (y: number) => y * scale + offsetY;

      // 3-pass neon glow: outer glow, halo, tube
      const passes = [
        { width: 16, alpha: 0.08 },
        { width: 8, alpha: 0.2 },
        { width: 2.5, alpha: 0.9 },
      ];

      for (const pass of passes) {
        ctx.beginPath();
        ctx.moveTo(mapX(points[0][0]), mapY(points[0][1]));

        // Smooth curve through points using quadratic bezier
        for (let i = 1; i < points.length - 1; i++) {
          const cpx = mapX(points[i][0]);
          const cpy = mapY(points[i][1]);
          const nx = mapX(points[i + 1][0]);
          const ny = mapY(points[i + 1][1]);
          ctx.quadraticCurveTo(cpx, cpy, (cpx + nx) / 2, (cpy + ny) / 2);
        }
        const last = points[points.length - 1];
        ctx.lineTo(mapX(last[0]), mapY(last[1]));

        ctx.strokeStyle = getColor(seg, pass.alpha);
        ctx.lineWidth = pass.width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      timeRef.current += 1;
      const t = timeRef.current;

      // Clear
      ctx.fillStyle = "#0c0a08";
      ctx.fillRect(0, 0, w, h);

      // Scale guitar to fit viewport (guitar is ~0.34 wide in normalized space)
      const guitarAspect = 0.34 / 0.85; // width / height in normalized space
      const maxH = h * 0.75;
      const maxW = w * 0.5;
      let scale: number;
      if (maxW / guitarAspect < maxH) {
        scale = maxW / 0.34;
      } else {
        scale = maxH / 0.85;
      }
      const offsetX = (w - scale * 1) / 2;
      const offsetY = (h - scale * 0.88) / 2 - scale * 0.02;

      // Surge — all bright
      surgeRef.current -= 1;
      const isSurge = surgeRef.current > 0;
      if (t % 180 === 0 && Math.random() > 0.4) {
        surgeRef.current = 4 + Math.floor(Math.random() * 6);
      }

      // Update segment flicker states
      const segments = segmentsRef.current;
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];

        if (isSurge) {
          seg.brightness = 0.95 + Math.random() * 0.05;
          continue;
        }

        // Broken tube logic
        if (seg.broken) {
          seg.brokenTimer -= 1;
          seg.brightness = 0.05 + Math.random() * 0.08;
          if (seg.brokenTimer <= 0) {
            seg.broken = false;
            seg.brightness = 0.9;
          }
          continue;
        }

        // Active flicker
        if (seg.flickerTimer > 0) {
          seg.flickerTimer -= 1;
          seg.brightness = seg.targetBrightness + (Math.random() - 0.5) * 0.1;
          if (seg.flickerTimer <= 0) {
            seg.brightness = 0.8 + Math.random() * 0.2;
          }
        } else {
          // Countdown to next flicker
          seg.nextFlicker -= 1;
          // Gentle ambient variation
          seg.brightness += (0.85 - seg.brightness) * 0.05 + (Math.random() - 0.5) * 0.02;
          seg.brightness = Math.max(0.6, Math.min(1, seg.brightness));

          if (seg.nextFlicker <= 0) {
            // Start a flicker event
            if (Math.random() < 0.08) {
              // Rare: tube goes "broken"
              seg.broken = true;
              seg.brokenTimer = 60 + Math.floor(Math.random() * 200);
            } else {
              seg.targetBrightness = 0.1 + Math.random() * 0.3;
              seg.flickerDuration = 3 + Math.floor(Math.random() * 12);
              seg.flickerTimer = seg.flickerDuration;
            }
            seg.nextFlicker = 30 + Math.floor(Math.random() * 150);
          }
        }
      }

      // Enable compositing for additive glow
      ctx.globalCompositeOperation = "lighter";

      // Draw all segments
      for (let i = 0; i < GUITAR_PATHS.length; i++) {
        drawNeonPath(GUITAR_PATHS[i], segments[i], w, h, scale, offsetX, offsetY);
      }

      // Reset compositing
      ctx.globalCompositeOperation = "source-over";

      // Subtle ambient haze around the guitar center
      const cx = w / 2;
      const cy = h * 0.45;
      const haze = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 0.5);
      haze.addColorStop(0, "rgba(100, 200, 80, 0.03)");
      haze.addColorStop(0.5, "rgba(200, 200, 60, 0.015)");
      haze.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
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
