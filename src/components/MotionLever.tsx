import { useContext } from 'preact/hooks';
import MotionContext from '../contexts/MotionContext';

export default function MotionLever({ style }: { style?: any }) {
  const ctx = useContext(MotionContext as any) as { reduceMotion: boolean; setReduceMotion: (v: boolean) => void } | null;
  if (!ctx) return null;

  const { reduceMotion, setReduceMotion } = ctx;

  return (
    <button
      className={`motion-lever ${reduceMotion ? 'on' : 'off'}`}
      aria-pressed={reduceMotion}
      aria-label="Reduce motion toggle"
      onClick={() => setReduceMotion(!reduceMotion)}
      style={style}
    >
      <span className="lever-track" />
      <span className="lever-knob" />
    </button>
  );
}
