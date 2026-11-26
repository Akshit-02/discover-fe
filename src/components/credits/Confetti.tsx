"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#F36B4A", "#FFAD66", "#FF9533", "#FFD6B0", "#202124", "#34D399", "#FFFFFF"];

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  spin: number;
  shape: "rect" | "circle";
  wobble: number;
}

/** Lightweight canvas confetti: two side cannons plus a top shower. Skipped for reduced motion. */
const Confetti = ({ duration = 4200 }: { duration?: number }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;
    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    const make = (x: number, y: number, angle: number, speed: number): Piece => ({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: rand(6, 11),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: rand(0, Math.PI * 2),
      spin: rand(-0.25, 0.25),
      shape: Math.random() < 0.7 ? "rect" : "circle",
      wobble: rand(0, Math.PI * 2),
    });

    const pieces: Piece[] = [];
    const burst = () => {
      for (let i = 0; i < 90; i++) {
        pieces.push(make(0, h() * 0.75, rand(-Math.PI / 2.4, -Math.PI / 6), rand(9, 17)));
        pieces.push(make(w(), h() * 0.75, rand(-Math.PI + Math.PI / 6, -Math.PI + Math.PI / 2.4), rand(9, 17)));
      }
    };
    const shower = () => {
      for (let i = 0; i < 70; i++) pieces.push(make(rand(0, w()), rand(-60, -10), rand(Math.PI / 3, (2 * Math.PI) / 3), rand(1, 4)));
    };
    burst();
    const t1 = setTimeout(shower, 350);
    const t2 = setTimeout(burst, 900);

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, w(), h());
      const fade = elapsed > duration - 800 ? Math.max(0, (duration - elapsed) / 800) : 1;
      for (const p of pieces) {
        p.vy += 0.28; // gravity
        p.vx *= 0.985; // drag
        p.vy *= 0.985;
        p.wobble += 0.12;
        p.x += p.vx + Math.sin(p.wobble) * 0.6;
        p.y += p.vy;
        p.rotation += p.spin;
        if (p.y > h() + 40) continue;
        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        if (p.shape === "rect") ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      if (elapsed < duration) frame = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, w(), h());
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", resize);
    };
  }, [duration]);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[95] h-full w-full" aria-hidden />;
};

export default Confetti;
