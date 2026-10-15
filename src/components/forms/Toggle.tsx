import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { cn } from '../../utils/cn';

import styles from './Toggle.module.css';

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md';
}

/** Accessible switch built on a native button with `role="switch"`. */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { checked, onCheckedChange, label, size = 'md', id, className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={cn(styles.toggle, styles[size], checked && styles.checked, className)}
      onClick={() => onCheckedChange(!checked)}
      {...rest}
    >
      <span className={styles.thumb} aria-hidden="true" />
    </button>
  );
});
