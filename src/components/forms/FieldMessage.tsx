import { cn } from '../../utils/cn';

import type { FieldA11yIds } from './useFieldA11y';
import styles from './field.module.css';

export interface FieldMessageProps {
  ids: FieldA11yIds;
  error?: string;
  helperText?: string;
  className?: string;
}

export function FieldMessage({ ids, error, helperText, className }: FieldMessageProps) {
  if (error) {
    return (
      <p id={ids.errorId} className={cn(styles.error, className)} role="alert">
        {error}
      </p>
    );
  }
  if (helperText) {
    return (
      <p id={ids.helpId} className={cn(styles.help, className)}>
        {helperText}
      </p>
    );
  }
  return null;
}
