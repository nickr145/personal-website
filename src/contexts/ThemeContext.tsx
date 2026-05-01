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
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'broadsheet'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (t: Theme) => {
    document.documentElement.classList.add('theme-transitioning');
    setTimeout(() => {
      setThemeState(t);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }));
    }, 220);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
