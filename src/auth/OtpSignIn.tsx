import { useState, type FormEvent } from 'react';

import { Alert } from '../components/feedback/Alert';
import { Button } from '../components/buttons/Button';
import { Input } from '../components/forms/Input';
import { Stack } from '../components/layout/Stack';

import styles from './auth.module.css';

export interface OtpSignInProps {
  /** Step 1 — send a one-time code to the identifier. */
  onRequestCode: (email: string) => Promise<void> | void;
  /** Step 2 — verify the code. */
  onVerifyCode: (code: string) => Promise<void> | void;
  /** Dev echo: the code, shown inline while no provider is wired. */
  devCode?: string | null;
  error?: string | null;
  isSubmitting?: boolean;
  defaultEmail?: string;
  /** Label for the step-2 submit button (the app decides the copy). */
  verifyLabel?: string;
}

/**
 * Passwordless sign-in: email → 6-digit code. Presentational — the app owns the HTTP.
 */
export function OtpSignIn({
  onRequestCode,
  onVerifyCode,
  devCode = null,
  error = null,
  isSubmitting = false,
  defaultEmail = '',
  verifyLabel = 'Verify and sign in',
}: OtpSignInProps) {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState(defaultEmail);
  const [code, setCode] = useState('');

  const request = async (event: FormEvent) => {
    event.preventDefault();
    await onRequestCode(email);
    setStep('code');
  };

  const verify = async (event: FormEvent) => {
    event.preventDefault();
    await onVerifyCode(code);
  };

  if (step === 'email') {
    return (
      <Stack gap={4}>
        {error && <Alert variant="danger" title="Sign-in failed">{error}</Alert>}
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
            Send code
          </Button>
        </form>
      </Stack>
    );
  }

  return (
    <Stack gap={4}>
      {error && <Alert variant="danger" title="Sign-in failed">{error}</Alert>}
      {devCode && (
        <Alert variant="info" title="Development mode">
          OTP provider not configured — your code is <strong>{devCode}</strong>.
        </Alert>
      )}
      <form className={styles.form} onSubmit={verify} noValidate>
        <Input
          label="One-time code"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="123456"
          maxLength={6}
          value={code}
          isRequired
          onChange={(event) => setCode(event.target.value)}
        />
        <Button type="submit" isFullWidth isLoading={isSubmitting}>
          {verifyLabel}
        </Button>
        <div className={styles.metaRow}>
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => {
              setCode('');
              setStep('email');
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
