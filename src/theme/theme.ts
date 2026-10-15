import type { CSSProperties } from 'react';

import type { ThemeDefinition } from './types';

/** Normalise `tokens` keys to `--kebab-case` CSS custom properties. */
function toCustomProperty(name: string): string {
  const trimmed = name.trim();
  return trimmed.startsWith('--') ? trimmed : `--${trimmed}`;
}

/** Property names applied by the last `applyTheme` call, so overrides can be replaced cleanly. */
const appliedProperties = new Set<string>();

/**
 * The `theme.json` contract for a generated order project.
 *
 * Structure comes from `@agiler/ui`; **only tokens vary per client** — so every app is
 * recognisably the same system with a different brand, and the Design agent never needs
 * to invent styling.
 *
 * ```jsonc
 * // theme.json
 * {
 *   "dataTheme": "light",
 *   "tokens": {
 *     "--color-primary": "#0f766e",
 *     "--color-primary-hover": "#115e59",
 *     "--radius-md": "0.375rem",
 *     "--font-family-base": "'Inter', system-ui, sans-serif"
 *   }
 * }
 * ```
 */

/** The inline style object for a theme (use when you cannot touch <html>). */
export function themeStyle(theme: ThemeDefinition | undefined): CSSProperties | undefined {
  if (!theme?.tokens) return undefined;
  const style: Record<string, string> = {};
  for (const [name, value] of Object.entries(theme.tokens)) {
    style[toCustomProperty(name)] = value;
  }
  return style as CSSProperties;
}

/**
 * Apply a theme to a target element (default: `<html>`), setting `data-theme` and every
 * token override as a CSS custom property.
 */
export function applyTheme(theme: ThemeDefinition | undefined, target?: HTMLElement): void {
  if (typeof document === 'undefined') return;
  const root = target ?? document.documentElement;

  if (theme?.dataTheme) root.setAttribute('data-theme', theme.dataTheme);

  // Replace (don't accumulate) previous overrides so switching themes is clean.
  for (const property of appliedProperties) root.style.removeProperty(property);
  appliedProperties.clear();

  for (const [name, value] of Object.entries(theme?.tokens ?? {})) {
    const property = toCustomProperty(name);
    root.style.setProperty(property, value);
    appliedProperties.add(property);
  }
}
