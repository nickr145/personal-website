// src/components/InteractiveParticleCanvas.tsx
import React, { useEffect, useRef } from "react";

type Mode = "attract" | "repel";

interface Props {
  width?: number; // canvas pixels
  height?: number; // canvas pixels
  radius?: number; // particle radius (px)
  initialParticles?: number;
  maxParticles?: number;
}

export default function InteractiveParticleCanvas({
  width = 720,
  height = 420,
  radius = 6,
  initialParticles = 24,
  maxParticles = 120,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulation state kept outside React renders
  const stateRef = useRef({
    particles: [] as {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
    }[],
    mouse: {
      x: 0,
      y: 0,
      active: false,
      mode: "attract" as Mode,
      strength: 1400,
      inc: false,
      dec: false,
      tempRepel: false,
    },
    raf: 0,
  });

  // Helpers
  const clamp = (v: number, lo: number, hi: number) =>
    v < lo ? lo : v > hi ? hi : v;
  const rand = (a: number, b: number) => a + Math.random() * (b - a);

  function spawn(n: number, cx?: number, cy?: number) {
    const s = stateRef.current;
    for (let i = 0; i < n; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = rand(0.5, 1.8);
      s.particles.push({
        x: clamp(cx ?? rand(radius, width - radius), radius, width - radius),
        y: clamp(cy ?? rand(radius, height - radius), radius, height - radius),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
      });
    }
    // Cap total
    if (s.particles.length > maxParticles) {
      s.particles.splice(0, s.particles.length - maxParticles);
    }
  }

  // Setup + animation loop
  useEffect(() => {
    const s = stateRef.current;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Initial seed
    s.particles = [];
    spawn(initialParticles);

    // Keyboard
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "a") s.mouse.mode = "attract";
      if (k === "r") s.mouse.mode = "repel";
      if (k === "i") s.mouse.inc = true;
      if (k === "d") s.mouse.dec = true;
      if (k === "c") s.particles = [];
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "i") s.mouse.inc = false;
      if (k === "d") s.mouse.dec = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // Pointer
    const rectFor = () => {
      // account for borders via clientLeft/Top + scrolling
      const r = canvas.getBoundingClientRect();
      return {
        left: r.left + canvas.clientLeft,
        top: r.top + canvas.clientTop,
      };
    };
    const onMove = (e: MouseEvent) => {
      const r = rectFor();
      s.mouse.x = e.clientX - r.left;
      s.mouse.y = e.clientY - r.top;
      s.mouse.active = true;
      s.mouse.tempRepel = e.altKey;
    };
    const onLeave = () => {
      s.mouse.active = false;
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    // Click to burst
    const onClick = (e: MouseEvent) => {
      const r = rectFor();
      const cx = clamp(e.clientX - r.left, radius, width - radius);
      const cy = clamp(e.clientY - r.top, radius, height - radius);
      spawn(14, cx, cy);
    };
    canvas.addEventListener("click", onClick);

    // Animation
    const step = () => {
      // Strength ramp
      if (s.mouse.inc) s.mouse.strength = Math.min(4000, s.mouse.strength + 40);
      if (s.mouse.dec) s.mouse.strength = Math.max(400, s.mouse.strength - 40);

      // Clear (fill the content, border is via CSS)
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      // Physics
      for (const p of s.particles) {
        // Force (use inverse-square falloff)
        if (s.mouse.active) {
          const dx = s.mouse.x - p.x;
          const dy = s.mouse.y - p.y;
          const d2 = dx * dx + dy * dy + 200; // avoid div by zero
          const inv = 1 / Math.sqrt(d2);
          const dirX = dx * inv,
            dirY = dy * inv;
          const sign = s.mouse.tempRepel || s.mouse.mode === "repel" ? -1 : 1;
          const accel = (s.mouse.strength / d2) * sign;
          p.vx += dirX * accel;
          p.vy += dirY * accel;
        }

        // Damping + clamp
        p.vx *= 0.995;
        p.vy *= 0.995;
        const maxV = 3.2;
        p.vx = Math.max(-maxV, Math.min(maxV, p.vx));
        p.vy = Math.max(-maxV, Math.min(maxV, p.vy));

        // Integrate
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on canvas edges (exact to the pixel inside the border)
        if (p.x < radius) {
          p.x = radius;
          p.vx *= -1;
        }
        if (p.x > width - radius) {
          p.x = width - radius;
          p.vx *= -1;
        }
        if (p.y < radius) {
          p.y = radius;
          p.vy *= -1;
        }
        if (p.y > height - radius) {
          p.y = height - radius;
          p.vy *= -1;
        }

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = "rgba(255,255,255,0.35)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      s.raf = requestAnimationFrame(step);
    };
    s.raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, [width, height, radius, initialParticles, maxParticles]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      // Border & rounded corner are purely visual; physics uses canvas size
      style={{
        display: "block",
        margin: "0 auto",
        background: "black",
        border: "2px solid rgba(255,255,255,0.2)",
        borderRadius: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      }}
      aria-label="Interactive particle box"
      title="A: attract · R: repel · hold I/D: strength · Alt: temp repel · C: clear"
    />
  );
}
