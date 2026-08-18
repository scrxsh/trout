
export type Theme = 'light' | 'dark' | 'system';

export type ResolvedTheme = 'light' | 'dark';


export interface ThemConfig {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
}
