// src/theme/theme.ts
export type ThemeChoice = 'light' | 'dark' | 'system';
const KEY = 'theme-choice';

export const getChoice = (): ThemeChoice =>
  (localStorage.getItem(KEY) as ThemeChoice) ?? 'system';

export const resolve = (choice: ThemeChoice): 'light' | 'dark' => {
  if (choice === 'system') {
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return choice;
};

export const applyTheme = (choice: ThemeChoice) => {
  const mode = resolve(choice);
  const root = document.documentElement;
  root.setAttribute('data-theme', mode);
  localStorage.setItem(KEY, choice);
};

export const currentMode = (): 'light' | 'dark' =>
  (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light';
