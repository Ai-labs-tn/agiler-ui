export type ThemePreference = 'light' | 'dark' | 'system';

export type ResolvedTheme = 'light' | 'dark';

export interface ThemeContextValue {
  /** The user's chosen preference, including `'system'`. */
  preference: ThemePreference;
  /** The concrete theme currently applied to the document. */
  resolvedTheme: ResolvedTheme;
  /** Update the preference (persisted to localStorage). */
  setPreference: (preference: ThemePreference) => void;
  /** Cycle light → dark → system. */
  toggleTheme: () => void;
}

/**
 * Per-order branding. Structure never changes — only tokens do, so every generated
 * app is recognisably the same system with a different brand (v3.1 plan §3.1).
 */
export interface ThemeDefinition {
  /** Which base semantic theme to start from (defaults to `light`). */
  dataTheme?: ResolvedTheme;
  /** Token overrides: CSS custom property name (with or without `--`) → value. */
  tokens?: Record<string, string>;
}
