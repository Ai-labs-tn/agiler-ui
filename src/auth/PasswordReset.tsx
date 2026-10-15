import { useState, type FormEvent } from 'react';

import { Alert } from '../components/feedback/Alert';
import { Button } from '../components/buttons/Button';
import { Input } from '../components/forms/Input';
import { Stack } from '../components/layout/Stack';

import styles from './auth.module.css';

export interface PasswordResetProps {
  /** Step 1 — send a reset code to the identifier. */
  onRequestCode: (email: string) => Promise<void> | void;
  /** Step 2 — set the new password with the code. */
  onReset: (email: string, code: string, newPassword: string) => Promise<void> | void;
  /** Return to password sign-in. */
  onCancel?: () => void;
  /** Dev echo: the reset code, shown inline while no provider is wired. */
  devCode?: string | null;
  error?: string | null;
  isSubmitting?: boolean;
  defaultEmail?: string;
  /** Minimum password length enforced client-side (the server enforces its own). */
  minPasswordLength?: number;
}

/**
 * Password reset: email → code + new password. Presentational; the app owns the HTTP and policy.
 */
export function PasswordReset({
  onRequestCode,
  onReset,
  onCancel,
  devCode = null,
  error = null,
  isSubmitting = false,
  defaultEmail = '',
  minPasswordLength = 8,
}: PasswordResetProps) {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState(defaultEmail);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const request = async (event: FormEvent) => {
    event.preventDefault();
    await onRequestCode(email);
    setStep('reset');
  };

  const reset = async (event: FormEvent) => {
    event.preventDefault();
    if (password.length < minPasswordLength) {
      setLocalError(`Use at least ${minPasswordLength} characters.`);
      return;
    }
    if (password !== confirm) {
      setLocalError('The two passwords do not match.');
      return;
    }
    setLocalError(null);
    await onReset(email, code, password);
  };

  const shown = localError ?? error;

  if (step === 'request') {
    return (
      <Stack gap={4}>
        {shown && <Alert variant="danger" title="Reset failed">{shown}</Alert>}
        <form className={styles.form} onSubmit={request} noValidate>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            isRequired
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button type="submit" isFullWidth isLoading={isSubmitting}>
            Send reset code
          </Button>
          {onCancel && (
            <div className={styles.metaRow}>
              <button type="button" className={styles.linkButton} onClick={onCancel}>
                Back to sign in
              </button>
            </div>
          )}
        </form>
      </Stack>
    );
  }

  return (
    <Stack gap={4}>
      {shown && <Alert variant="danger" title="Reset failed">{shown}</Alert>}
      {devCode && (
        <Alert variant="info" title="Development mode">
          Reset provider not configured — your code is <strong>{devCode}</strong>.
        </Alert>
      )}
      <form className={styles.form} onSubmit={reset} noValidate>
        <Input
          label="Reset code"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="123456"
          maxLength={6}
          value={code}
          isRequired
          onChange={(event) => setCode(event.target.value)}
        />
        <Input
          label="New password"
          type="password"
          autoComplete="new-password"
          value={password}
          isRequired
          onChange={(event) => setPassword(event.target.value)}
        />
        <Input
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          value={confirm}
          isRequired
          onChange={(event) => setConfirm(event.target.value)}
        />
        <p className={styles.hint}>At least {minPasswordLength} characters.</p>
        <Button type="submit" isFullWidth isLoading={isSubmitting}>
          Set new password
        </Button>
        <div className={styles.metaRow}>
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => {
              setCode('');
              setPassword('');
              setConfirm('');
              setStep('request');
            }}
          >
            Use a different email
          </button>
          <button type="button" className={styles.linkButton} onClick={() => void onRequestCode(email)}>
            Resend code
          </button>
        </div>
      </form>
    </Stack>
  );
}
