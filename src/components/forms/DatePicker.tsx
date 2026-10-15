import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '../../utils/cn';

import { FieldLabel } from './FieldLabel';
import { FieldMessage } from './FieldMessage';
import { buildDescribedBy, useFieldA11y } from './useFieldA11y';
import field from './field.module.css';
import styles from './DatePicker.module.css';

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  /** `date` (default), `datetime-local`, `time`, or `month`. */
  mode?: 'date' | 'datetime-local' | 'time' | 'month';
}

/**
 * Native-backed date/time picker. Using the platform control keeps keyboard and
 * screen-reader behavior correct and avoids a heavy calendar dependency.
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  { label, error, helperText, isRequired, mode = 'date', id, className, ...rest },
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
      <input
        ref={ref}
        id={ids.inputId}
        type={mode}
        className={cn(field.control, styles.input, hasError && field.invalid, className)}
        aria-invalid={hasError || undefined}
        aria-required={isRequired || undefined}
        aria-describedby={buildDescribedBy(ids, { hasError, hasHelp: Boolean(helperText) })}
        {...rest}
      />
      <FieldMessage ids={ids} error={error} helperText={helperText} />
    </div>
  );
});
