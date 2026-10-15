import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './field.module.css';

export interface FieldLabelProps {
  htmlFor: string;
  children: ReactNode;
  isRequired?: boolean;
  className?: string;
}

export function FieldLabel({ htmlFor, children, isRequired, className }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className={cn(styles.label, className)}>
      {children}
      {isRequired && (
        <span className={styles.required} aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
