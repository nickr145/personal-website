import { useEffect, useRef } from 'preact/hooks';
import * as THREE from 'three';

const HEADLINES = [
  'BREAKING', 'FEATURE', 'ANALYSIS', 'WORLD',
  'TECHNOLOGY', 'SCIENCE', 'ARTS', 'OPINION',
];

function isDarkTheme(): boolean {
  return document.documentElement.getAttribute('data-theme') === 'nightprint';
}

function makePageTexture(headline: string, dark: boolean): THREE.CanvasTexture {
  const W = 512, H = 384;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  const bg  = dark ? '#1a1a18' : '#f0ebe0';
  const fg  = dark ? '#e8e0d0' : '#1a1a18';
  const acc = '#c8a84b';

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 4500; i++) {
    ctx.fillStyle = dark
      ? `rgba(255,255,255,${Math.random() * 0.018})`
      : `rgba(0,0,0,${Math.random() * 0.022})`;
    ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
  }

  ctx.strokeStyle = fg;
  ctx.lineWidth = 2;
  ctx.strokeRect(5, 5, W - 10, H - 10);

  ctx.fillStyle = fg;
  ctx.fillRect(5, 5, W - 10, 40);
  ctx.fillStyle = bg;
  ctx.font = 'bold 13px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('NICHOLAS J REBELLO', W / 2, 30);

  ctx.fillStyle = acc;
  ctx.fillRect(10, 46, W - 20, 2);

  ctx.fillStyle = fg;
  ctx.font = `bold ${headline.length > 8 ? 26 : 30}px Georgia, serif`;
  ctx.textAlign = 'left';
  ctx.fillText(headline, 14, 82);

  ctx.fillStyle = fg;
  ctx.fillRect(14, 90, W - 28, 1);

  ctx.fillStyle = `rgba(${dark ? '232,224,208' : '26,26,24'},0.22)`;
  ctx.fillRect(W / 2, 98, 1, H - 115);

  ctx.fillStyle = fg;
  const cols: [number, number][] = [[14, W / 2 - 20], [W / 2 + 8, W - 18]];
  cols.forEach(([sx, ex]) => {
    const maxW = ex - sx;
    for (let i = 0; i < 10; i++) {
      ctx.globalAlpha = 0.5 + Math.random() * 0.3;
      ctx.fillRect(sx, 102 + i * 22, maxW * (0.65 + Math.random() * 0.35), 8);
    }
  });
  ctx.globalAlpha = 1;

  const px = W / 2 + 8, py = 268, pw = W / 2 - 22, ph = 88;
  ctx.fillStyle = `rgba(${dark ? '232,224,208' : '26,26,24'},0.07)`;
  ctx.fillRect(px, py, pw, ph);
  ctx.strokeStyle = `rgba(${dark ? '232,224,208' : '26,26,24'},0.18)`;
  ctx.lineWidth = 1;
  ctx.strokeRect(px, py, pw, ph);

  return new THREE.CanvasTexture(canvas);
}

interface PageData {
  mesh: THREE.Mesh;
  baseY: number;
  baseRotZ: number;
  phase: number;
  speed: number;
}

/** Pure Three.js canvas — no wrapper, no overlay. Mount inside any positioned container. */
export function NewspaperHeroCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const dark = isDarkTheme();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55, container.clientWidth / container.clientHeight, 0.1, 100
    );
    camera.position.z = 9;

    scene.add(new THREE.AmbientLight(0xffeedd, 0.65));
    const sun = new THREE.DirectionalLight(0xfff5e0, 0.85);
    sun.position.set(5, 7, 8);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xe0e8ff, 0.22);
    fill.position.set(-6, -2, 4);
    scene.add(fill);

    const pages: PageData[] = HEADLINES.map((headline, i) => {
      const texture = makePageTexture(headline, dark);
      const geo = new THREE.BoxGeometry(3.8, 2.85, 0.025);
      const mat = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.88, metalness: 0 });
      const mesh = new THREE.Mesh(geo, mat);

      const angle = (i / HEADLINES.length) * Math.PI * 2;
      const r = 4.5 + Math.random() * 2.5;
      mesh.position.set(
        Math.cos(angle) * r * 1.55 + (Math.random() - 0.5) * 1.8,
        Math.sin(angle) * r * 0.62 + (Math.random() - 0.5) * 1.4,
        -2.5 - Math.random() * 3.0
      );
      const baseRotZ = (Math.random() - 0.5) * 0.38;
      mesh.rotation.set((Math.random() - 0.5) * 0.14, (Math.random() - 0.5) * 0.42, baseRotZ);
      scene.add(mesh);

      return {
        mesh,
        baseY: mesh.position.y,
        baseRotZ,
        phase: i * ((Math.PI * 2) / HEADLINES.length),
        speed: 0.17 + Math.random() * 0.13,
      };
    });

    let mx = 0, my = 0, tmx = 0, tmy = 0;
    const onMouseMove = (e: MouseEvent) => {
      tmx = (e.clientX / window.innerWidth  - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let raf: number;
    const clock = new THREE.Clock();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      mx += (tmx - mx) * 0.04;
      my += (tmy - my) * 0.04;

      pages.forEach(({ mesh, baseY, baseRotZ, phase, speed }) => {
        mesh.position.y = baseY + Math.sin(t * speed + phase) * 0.20;
        mesh.rotation.z = baseRotZ + Math.sin(t * speed * 0.7 + phase) * 0.018;
        mesh.rotation.y += (mx * 0.09 - mesh.rotation.y) * 0.024;
        mesh.rotation.x += (-my * 0.055 - mesh.rotation.x) * 0.024;
      });

      camera.position.x += (mx * 0.65 - camera.position.x) * 0.024;
      camera.position.y += (-my * 0.42 - camera.position.y) * 0.024;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      pages.forEach(({ mesh }) => {
        (mesh.material as THREE.MeshStandardMaterial).map?.dispose();
        (mesh.material as THREE.MeshStandardMaterial).dispose();
        mesh.geometry.dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={canvasRef} className="front-canvas" />;
}
