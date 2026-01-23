import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

type Theme =
  | 'neutral'
  | 'neon'
  | 'lavender'
  | 'rose'
  | 'forest'
  | 'sunset'
  | 'ocean';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: 'neutral', setTheme: () => {} });

export function ThemeProvider({ children }: { children: any }) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'neutral'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
