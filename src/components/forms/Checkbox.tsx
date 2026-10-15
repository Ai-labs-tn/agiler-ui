import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '../../utils/cn';

import { FieldMessage } from './FieldMessage';
import { buildDescribedBy, useFieldA11y } from './useFieldA11y';
import field from './field.module.css';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  error?: string;
  helperText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, helperText, id, className, ...rest },
  ref,
) {
  const ids = useFieldA11y(id);
  const hasError = Boolean(error);

  return (
    <div className={field.field}>
      <label className={styles.row} htmlFor={ids.inputId}>
        <input
          ref={ref}
          id={ids.inputId}
          type="checkbox"
          className={cn(styles.input, hasError && styles.invalid, className)}
          aria-invalid={hasError || undefined}
          aria-describedby={buildDescribedBy(ids, { hasError, hasHelp: Boolean(helperText) })}
          {...rest}
        />
        <span className={styles.label}>{label}</span>
      </label>
      <FieldMessage ids={ids} error={error} helperText={helperText} className={styles.message} />
    </div>
  );
});
