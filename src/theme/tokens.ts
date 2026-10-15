/**
 * Typed mirrors of the CSS design tokens in `src/styles`.
 * Use these for values that must exist in JavaScript (e.g. media queries,
 * virtualization, charts) — never duplicate raw values in components.
 */

/** Pixel min-widths for each supported breakpoint (mobile-first). */
export const breakpoints = {
  xs: 320,
  sm: 375,
  md: 425,
  tablet: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1440,
  xxxl: 1920,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Build a mobile-first `min-width` media query string for `useMediaQuery`. */
export function mediaQueryFrom(breakpoint: Breakpoint): string {
  return `(min-width: ${breakpoints[breakpoint]}px)`;
}

export const durations = {
  fast: 150,
  base: 200,
  slow: 300,
} as const;

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
  tooltip: 1600,
} as const;

/** Reference a CSS custom property with a typed, non-hardcoded name. */
export function cssVar(name: string): string {
  return `var(--${name})`;
}
