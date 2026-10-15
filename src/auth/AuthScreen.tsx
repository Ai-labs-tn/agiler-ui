import type { ReactNode } from 'react';

import { AuthMethods, type AuthMethodsProps } from './AuthMethods';
import { AuthShell } from './AuthShell';

export interface AuthScreenProps extends AuthMethodsProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  brand?: ReactNode;
  footer?: ReactNode;
}

/**
 * The standard auth screen: **passwordless and password in one screen**, with reset.
 *
 * Tabs switch between a one-time code and a password; "Forgot password?" opens the reset flow.
 * Presentational — the app supplies the callbacks (its own HTTP), which is why this template is
 * reusable by AGILER and by every generated order project.
 */
export function AuthScreen({
  title = 'Sign in',
  subtitle = 'Use a one-time code or your password.',
  brand,
  footer,
  ...methods
}: AuthScreenProps) {
  return (
    <AuthShell title={title} subtitle={subtitle} brand={brand} footer={footer}>
      <AuthMethods {...methods} />
    </AuthShell>
  );
}
