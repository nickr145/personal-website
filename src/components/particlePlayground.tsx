import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Interactive Particle Playground + Gravity Well (A/R + continuous I/D)
 * - Fullscreen playground with bouncing particles
 * - Cursor acts as a gravity well (attract or repel)
 * - Click to spawn bursts; hold ⌥/Alt to repel temporarily
 * - Keys: A = attract, R = repel, hold I = increase strength continuously, hold D = decrease continuously
 *
 * Type-safe for React and Preact (via compat).
 */
export default function InteractiveParticlePlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialX = typeof window !== 'undefined' ? window.innerWidth / 2 : 512;
  const initialY = typeof window !== 'undefined' ? window.innerHeight / 2 : 384;
  const mouse = useRef<{ x: number; y: number; active: boolean; repel: boolean; strength: number }>({
    x: initialX,
    y: initialY,
    active: false,
    repel: false,
    strength: 1400,
  });

  const keys = useRef({ inc: false, dec: false });
  const lastTime = useRef<number | null>(null);

  const [particles, setParticles] = useState(() => Array.from({ length: 60 }, (_, i) => makeParticle(i)));
  const [hovered, setHovered] = useState(false);
  const [mode, setMode] = useState<'attract' | 'repel'>('attract');

  // Keyboard controls: A/R mode toggle; I/D continuous strength adjust while held
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'r') setMode('repel');
      if (k === 'a') setMode('attract');
      if (k === 'i') keys.current.inc = true;
      if (k === 'd') keys.current.dec = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'i') keys.current.inc = false;
      if (k === 'd') keys.current.dec = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // RAF loop to continuously adjust strength while I/D are held
  useEffect(() => {
    let raf: number;
    const tick = (t: number) => {
      const ratePerSecond = 900; // units per second
      if (lastTime.current === null) lastTime.current = t;
      const dt = Math.min(0.05, (t - lastTime.current) / 1000); // clamp dt to avoid jumps
      lastTime.current = t;
      const m = mouse.current;
      if (keys.current.inc) m.strength = Math.min(4000, m.strength + ratePerSecond * dt);
      if (keys.current.dec) m.strength = Math.max(200, m.strength - ratePerSecond * dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function makeParticle(id: number) {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const h = typeof window !== 'undefined' ? window.innerHeight : 768;
    return {
      id,
      x: Math.random() * w,
      y: Math.random() * h,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    } as ParticleState;
  }

  // --- Handlers (typed to work in React AND Preact compat) ---
  const onClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const burst = Array.from({ length: 14 }, (_, i) => ({ ...makeParticle(Date.now() + i), x: cx, y: cy }));
    setParticles((p) => [...p, ...burst]);
  };

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
    mouse.current.active = true;
    mouse.current.repel = e.altKey;
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => { setHovered(true); mouse.current.active = true; }}
      onMouseLeave={() => { setHovered(false); mouse.current.active = false; }}
      onMouseMove={onMove}
      onClick={onClick}
      className="relative w-full h-screen overflow-hidden bg-white"
      tabIndex={0}
    >
      {/* Background flow + cursor darkening */}
      <CursorVignette mouse={mouse} />

      {particles.map((p) => (
        <Particle key={p.id} data={p} hovered={hovered} mouse={mouse} mode={mode} />
      ))}

      {/* UI hint */}
      <div className="absolute bottom-4 left-4 text-white/80 text-xs px-3 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur">
        <span className="mr-3">Mode: <strong>{mode}</strong></span>
        <span className="mr-3">I = stronger (hold)</span>
        <span className="mr-3">D = weaker (hold)</span>
        <span className="mr-3">A = attract, R = repel</span>
        <span>Alt = repel (hold)</span>
      </div>
    </div>
  );
}

// --- Types ---
interface ParticleState {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
}

function Particle({ data, hovered, mouse, mode }: { data: ParticleState; hovered: boolean; mouse: React.MutableRefObject<{ x: number; y: number; active: boolean; repel: boolean; strength: number }>; mode: 'attract' | 'repel' }) {
  const x = useMotionValue(data.x);
  const y = useMotionValue(data.y);
  const springX = useSpring(x, { stiffness: 40, damping: 15 });
  const springY = useSpring(y, { stiffness: 40, damping: 15 });

  useEffect(() => {
    let frame: number;
    const animate = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
      const h = typeof window !== 'undefined' ? window.innerHeight : 768;

      // Gravity toward/away from cursor
      if (mouse.current.active) {
        const cx = mouse.current.x;
        const cy = mouse.current.y;
        const dx = cx - x.get();
        const dy = cy - y.get();
        const dist2 = dx * dx + dy * dy + 200; // avoid division by zero
        const invDist = 1 / Math.sqrt(dist2);
        const dirX = dx * invDist;
        const dirY = dy * invDist;
        const strength = mouse.current.strength / dist2; // inverse square falloff
        const sgn = (mouse.current.repel || mode === 'repel') ? -1 : 1;
        data.dx += dirX * strength * sgn;
        data.dy += dirY * strength * sgn;
      }

      // Velocity limits & damping
      const maxV = 3.2;
      data.dx = Math.max(-maxV, Math.min(maxV, data.dx * 0.995));
      data.dy = Math.max(-maxV, Math.min(maxV, data.dy * 0.995));

      let nx = x.get() + data.dx;
      let ny = y.get() + data.dy;

      if (nx < 0 || nx > w) { data.dx *= -1; nx = Math.max(0, Math.min(nx, w)); }
      if (ny < 0 || ny > h) { data.dy *= -1; ny = Math.max(0, Math.min(ny, h)); }

      x.set(nx);
      y.set(ny);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [x, y, data, mouse, mode]);

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 12,
        height: 12,
        background: data.color,
        opacity: hovered ? 0.95 : 0.7,
        boxShadow: '0 0 16px rgba(255,255,255,0.35)',
        left: springX,
        top: springY,
      }}
    />
  );
}

function CursorVignette({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number; active: boolean; repel: boolean; strength: number }> }) {
  // Darken around cursor similar to the screenshot vibe
  const [pos, setPos] = useState({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 512, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 384 });
  useEffect(() => {
    let raf: number;
    const tick = () => { setPos({ x: mouse.current.x, y: mouse.current.y }); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mouse]);
  const style: React.CSSProperties = {
    background: `radial-gradient(320px 320px at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.05), rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.85))`,
  };
  return <div aria-hidden className="absolute inset-0 pointer-events-none" style={style} />;
}
