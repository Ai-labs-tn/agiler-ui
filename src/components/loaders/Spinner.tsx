import { cn } from '../../utils/cn';

import styles from './Spinner.module.css';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label announced to screen readers. */
  label?: string;
  className?: string;
}

export function Spinner({ size = 'md', label = 'Loading', className }: SpinnerProps) {
  return (
    <span className={cn(styles.spinner, styles[size], className)} role="status" aria-live="polite">
      <span className="visually-hidden">{label}</span>
    </span>
  );
}
