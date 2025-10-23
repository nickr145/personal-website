import { createContext } from 'preact';
import { useState } from 'preact/hooks';

type MotionContextValue = {
  reduceMotion: boolean;
  setReduceMotion: (v: boolean) => void;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: preact.ComponentChildren }) {
  const [reduceMotion, setReduceMotion] = useState<boolean>(typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false);
  return (
    <MotionContext.Provider value={{ reduceMotion, setReduceMotion }}>{children}</MotionContext.Provider>
  );
}

export default MotionContext;
