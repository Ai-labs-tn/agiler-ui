import type { ReactNode } from 'react';

import { cn } from '../utils/cn';

import styles from './auth.module.css';

export interface AuthShellProps {
  /** The screen's single `<h1>`. */
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  /** Footer slot (links, legal, "back to home"). */
  footer?: ReactNode;
  /** Brand slot rendered above the card. */
  brand?: ReactNode;
  className?: string;
}

/**
 * Centered auth shell — the standard surface for sign-in / reset screens.
 * One `<h1>` per screen; everything else composes design-system components.
 */
export function AuthShell({ title, subtitle, children, footer, brand, className }: AuthShellProps) {
  return (
    <div className={cn(styles.shell, className)}>
      {brand && <div className={styles.brand}>{brand}</div>}
      <main className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
        {children}
      </main>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
