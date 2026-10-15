import type { ReactNode } from 'react';

import { AuthShell } from '../../auth/AuthShell';

export interface AuthCenteredLayoutProps {
  /** The screen's `<h1>`. */
  title?: ReactNode;
  subtitle?: ReactNode;
  brand?: ReactNode;
  footer?: ReactNode;
  /** `main` region — the auth templates (sign-in / reset). */
  children: ReactNode;
}

/**
 * Auth-Centered — a standalone, centered card for sign-in and password-reset screens
 * (no navigation chrome). Regions: main · footer.
 */
export function AuthCenteredLayout({
  title = 'Sign in',
  subtitle,
  brand,
  footer,
  children,
}: AuthCenteredLayoutProps) {
  return (
    <AuthShell title={title} subtitle={subtitle} brand={brand} footer={footer}>
      {children}
    </AuthShell>
  );
}
