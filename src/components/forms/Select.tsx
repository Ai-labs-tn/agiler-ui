import { forwardRef, type SelectHTMLAttributes } from 'react';

import { cn } from '../../utils/cn';

import { FieldLabel } from './FieldLabel';
import { FieldMessage } from './FieldMessage';
import { buildDescribedBy, useFieldA11y } from './useFieldA11y';
import field from './field.module.css';
import styles from './Select.module.css';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  size?: 'sm' | 'md' | 'lg';
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    error,
    helperText,
    isRequired,
    size = 'md',
    options,
    placeholder,
    id,
    className,
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
      <div className={styles.wrapper}>
        <select
          ref={ref}
          id={ids.inputId}
          className={cn(
            field.control,
            styles.select,
            size !== 'md' && field[size],
            hasError && field.invalid,
            className,
          )}
          aria-invalid={hasError || undefined}
          aria-required={isRequired || undefined}
          aria-describedby={buildDescribedBy(ids, { hasError, hasHelp: Boolean(helperText) })}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.chevron} aria-hidden="true">
          ▾
        </span>
      </div>
      <FieldMessage ids={ids} error={error} helperText={helperText} />
    </div>
  );
});
