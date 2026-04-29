import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

export type Theme =
  | 'broadsheet'
  | 'nightprint'
  | 'sepia'
  | 'telegraph'
  | 'herald'
  | 'noir';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: 'broadsheet', setTheme: () => {} });

export function ThemeProvider({ children }: { children: any }) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'broadsheet'
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
