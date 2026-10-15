import { useState } from 'react';

import { AuthTabs } from './AuthTabs';
import { OtpSignIn } from './OtpSignIn';
import { PasswordSignIn } from './PasswordSignIn';
import { PasswordReset } from './PasswordReset';

export interface AuthMethodsProps {
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
 * The auth **methods** without a shell: a tabbed switcher between a one-time code and a password,
 * plus the reset flow. `AuthScreen` wraps this in `AuthShell`; an `auth-centered` layout wraps it in
 * the layout's own `main` region. Presentational — the app supplies the callbacks.
 */
export function AuthMethods({
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
}: AuthMethodsProps) {
  const [view, setView] = useState<'sign-in' | 'reset'>('sign-in');
  const [tab, setTab] = useState<'otp' | 'password'>(initialTab);

  if (view === 'reset') {
    return (
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
    );
  }

  return (
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
  );
}
