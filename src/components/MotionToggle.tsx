import { useContext } from 'preact/hooks';
import MotionContext from '../contexts/MotionContext';

export default function MotionToggle() {
  const ctx = useContext(MotionContext as any) as { reduceMotion: boolean; setReduceMotion: (v: boolean) => void } | null;
  if (!ctx) return null;

  const { reduceMotion, setReduceMotion } = ctx;

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <input
        type="checkbox"
        checked={reduceMotion}
        onChange={(e: any) => setReduceMotion(e.currentTarget.checked)}
        aria-label="Reduce motion"
      />
      <span style={{ fontSize: '0.9rem', color: '#333' }}>Reduce motion</span>
    </label>
  );
}
