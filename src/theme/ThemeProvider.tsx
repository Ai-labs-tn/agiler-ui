import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { ThemeContext } from './ThemeContext';
import { applyTheme } from './theme';
import type { ResolvedTheme, ThemeDefinition, ThemePreference } from './types';

const MEDIA_QUERY = '(prefers-color-scheme: dark)';
const DEFAULT_STORAGE_KEY = 'agiler.theme';

function readStoredPreference(storageKey: string): ThemePreference {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    /* localStorage may be unavailable (private mode) — fall back to system. */
  }
  return 'system';
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light';
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Override the initial preference (mainly for tests / Storybook). */
  defaultPreference?: ThemePreference;
  /** localStorage key used to persist the preference. */
  storageKey?: string;
  /**
   * Per-order branding (theme.json). Token overrides are applied to <html> on top of the
   * resolved base theme, so structure stays identical while the brand varies.
   */
  theme?: ThemeDefinition;
}

export function ThemeProvider({
  children,
  defaultPreference,
  storageKey = DEFAULT_STORAGE_KEY,
  theme,
}: ThemeProviderProps) {
  const [preference, setPreferenceState] = useState<ThemePreference>(
    () => defaultPreference ?? readStoredPreference(storageKey),
  );
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  useEffect(() => {
    if (!window.matchMedia) return;
    const media = window.matchMedia(MEDIA_QUERY);
    const listener = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const resolvedTheme: ResolvedTheme = preference === 'system' ? systemTheme : preference;

  useEffect(() => {
    // The toggle always drives the base theme; theme.json supplies token overrides.
    applyTheme({ ...theme, dataTheme: resolvedTheme });
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme, theme]);

  const setPreference = useCallback(
    (next: ThemePreference) => {
      setPreferenceState(next);
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        /* Persisting is best-effort. */
      }
    },
    [storageKey],
  );

  const toggleTheme = useCallback(() => {
    setPreference(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setPreference]);

  const value = useMemo(
    () => ({ preference, resolvedTheme, setPreference, toggleTheme }),
    [preference, resolvedTheme, setPreference, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
