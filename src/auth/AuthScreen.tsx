import { useState, type ReactNode } from 'react';

import { AuthShell } from './AuthShell';
import { AuthTabs } from './AuthTabs';
import { OtpSignIn } from './OtpSignIn';
import { PasswordSignIn } from './PasswordSignIn';
import { PasswordReset } from './PasswordReset';

export interface AuthScreenProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  brand?: ReactNode;
  footer?: ReactNode;
  /** Which method is shown first. */
  initialTab?: 'otp' | 'password';
  defaultEmail?: string;
  /** Dev echo codes (OTP and reset) while no provider is wired. */
  devCode?: string | null;
  resetDevCode?: string | null;
  error?: string | null;
  isSubmitting?: boolean;
  onRequestCode: (email: string) => Promise<void> | void;
  onVerifyCode: (code: string) => Promise<void> | void;
  onPasswordSignIn: (email: string, password: string) => Promise<void> | void;
  onResetPassword: (email: string, code: string, newPassword: string) => Promise<void> | void;
  /** Send the *reset* code (a different endpoint than the sign-in code). Falls back to onRequestCode. */
  onRequestResetCode?: (email: string) => Promise<void> | void;
  onCancelReset?: () => void;
  minPasswordLength?: number;
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
  initialTab = 'otp',
  defaultEmail = '',
  devCode = null,
  resetDevCode = null,
  error = null,
  isSubmitting = false,
  onRequestCode,
  onVerifyCode,
  onPasswordSignIn,
  onResetPassword,
  onRequestResetCode,
  onCancelReset,
  minPasswordLength,
}: AuthScreenProps) {
  const [view, setView] = useState<'sign-in' | 'reset'>('sign-in');
  const [tab, setTab] = useState<'otp' | 'password'>(initialTab);

  if (view === 'reset') {
    return (
      <AuthShell title="Reset password" subtitle="We will send a reset code." brand={brand} footer={footer}>
        <PasswordReset
          onRequestCode={onRequestResetCode ?? onRequestCode}
          onReset={onResetPassword}
          onCancel={() => {
            onCancelReset?.();
            setView('sign-in');
          }}
          devCode={resetDevCode}
          error={error}
          isSubmitting={isSubmitting}
          defaultEmail={defaultEmail}
          minPasswordLength={minPasswordLength}
        />
      </AuthShell>
    );
  }

  return (
    <AuthShell title={title} subtitle={subtitle} brand={brand} footer={footer}>
      <AuthTabs
        value={tab}
        onChange={(id) => setTab(id === 'password' ? 'password' : 'otp')}
        tabs={[
          {
            id: 'otp',
            label: 'One-time code',
            content: (
              <OtpSignIn
                onRequestCode={onRequestCode}
                onVerifyCode={onVerifyCode}
                devCode={devCode}
                error={error}
                isSubmitting={isSubmitting}
                defaultEmail={defaultEmail}
              />
            ),
          },
          {
            id: 'password',
            label: 'Password',
            content: (
              <PasswordSignIn
                onSubmit={onPasswordSignIn}
                onForgotPassword={() => setView('reset')}
                error={error}
                isSubmitting={isSubmitting}
                defaultEmail={defaultEmail}
              />
            ),
          },
        ]}
      />
    </AuthShell>
  );
}
