import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '../../utils/cn';

import { FieldLabel } from './FieldLabel';
import { FieldMessage } from './FieldMessage';
import { buildDescribedBy, useFieldA11y } from './useFieldA11y';
import field from './field.module.css';
import styles from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  size?: 'sm' | 'md' | 'lg';
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    helperText,
    isRequired,
    size = 'md',
    leftAddon,
    rightAddon,
    id,
    className,
    disabled,
    ...rest
  },
  ref,
) {
  const ids = useFieldA11y(id);
  const hasError = Boolean(error);

  return (
    <div className={field.field}>
      {label && (
        <FieldLabel htmlFor={ids.inputId} isRequired={isRequired}>
          {label}
        </FieldLabel>
      )}
      <div
        className={cn(styles.wrapper, leftAddon && styles.hasLeft, rightAddon && styles.hasRight)}
      >
        {leftAddon && <span className={styles.addon}>{leftAddon}</span>}
        <input
          ref={ref}
          id={ids.inputId}
          className={cn(
            field.control,
            styles.input,
            size !== 'md' && field[size],
            hasError && field.invalid,
            leftAddon && styles.padLeft,
            rightAddon && styles.padRight,
            className,
          )}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-required={isRequired || undefined}
          aria-describedby={buildDescribedBy(ids, { hasError, hasHelp: Boolean(helperText) })}
          {...rest}
        />
        {rightAddon && <span className={styles.addon}>{rightAddon}</span>}
      </div>
      <FieldMessage ids={ids} error={error} helperText={helperText} />
    </div>
  );
});
