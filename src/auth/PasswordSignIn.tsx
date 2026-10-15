import { useState, type FormEvent } from 'react';

import { Alert } from '../components/feedback/Alert';
import { Button } from '../components/buttons/Button';
import { Input } from '../components/forms/Input';
import { Stack } from '../components/layout/Stack';

import styles from './auth.module.css';

export interface PasswordSignInProps {
  onSubmit: (email: string, password: string) => Promise<void> | void;
  /** Opens the reset flow (renders a "Forgot password?" action when provided). */
  onForgotPassword?: () => void;
  error?: string | null;
  isSubmitting?: boolean;
  defaultEmail?: string;
}

/** Password sign-in: email + password, with an optional reset link. Presentational. */
export function PasswordSignIn({
  onSubmit,
  onForgotPassword,
  error = null,
  isSubmitting = false,
  defaultEmail = '',
}: PasswordSignInProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <Stack gap={4}>
      {error && <Alert variant="danger" title="Sign-in failed">{error}</Alert>}
      <form className={styles.form} onSubmit={submit} noValidate>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          isRequired
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          isRequired
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" isFullWidth isLoading={isSubmitting}>
          Sign in
        </Button>
        {onForgotPassword && (
          <div className={styles.metaRow}>
            <span className={styles.hint}>Trouble signing in?</span>
            <button type="button" className={styles.linkButton} onClick={onForgotPassword}>
              Forgot password?
            </button>
          </div>
        )}
      </form>
    </Stack>
  );
}
