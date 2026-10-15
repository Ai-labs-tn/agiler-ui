import { forwardRef, type TextareaHTMLAttributes } from 'react';

import { cn } from '../../utils/cn';

import { FieldLabel } from './FieldLabel';
import { FieldMessage } from './FieldMessage';
import { buildDescribedBy, useFieldA11y } from './useFieldA11y';
import field from './field.module.css';
import styles from './TextArea.module.css';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  /** Show a live character counter. */
  showCount?: boolean;
  maxLength?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    label,
    error,
    helperText,
    isRequired,
    showCount,
    maxLength,
    id,
    className,
    value,
    defaultValue,
    ...rest
  },
  ref,
) {
  const ids = useFieldA11y(id);
  const hasError = Boolean(error);
  const currentLength = typeof value === 'string' ? value.length : undefined;

  return (
    <div className={field.field}>
      {label && (
        <FieldLabel htmlFor={ids.inputId} isRequired={isRequired}>
          {label}
        </FieldLabel>
      )}
      <textarea
        ref={ref}
        id={ids.inputId}
        className={cn(field.control, styles.textarea, hasError && field.invalid, className)}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        aria-invalid={hasError || undefined}
        aria-required={isRequired || undefined}
        aria-describedby={buildDescribedBy(ids, { hasError, hasHelp: Boolean(helperText) })}
        {...rest}
      />
      <div className={styles.footer}>
        <FieldMessage ids={ids} error={error} helperText={helperText} />
        {showCount && maxLength && (
          <span className={styles.count} aria-hidden="true">
            {currentLength ?? 0}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
});
