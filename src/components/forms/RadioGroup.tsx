import { useId, type ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './Radio.module.css';

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  legend: string;
  value?: string;
  defaultValue?: string;
  options: RadioOption[];
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
  children?: ReactNode;
}

/** Accessible radio group; wraps native inputs in a fieldset/legend. */
export function RadioGroup({
  name,
  legend,
  value,
  defaultValue,
  options,
  onChange,
  error,
  helperText,
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  const groupId = useId();
  const errorId = `${groupId}-error`;
  const helpId = `${groupId}-help`;

  return (
    <fieldset className={cn(styles.fieldset, className)} aria-invalid={Boolean(error) || undefined}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={cn(styles.group, orientation === 'horizontal' && styles.horizontal)}>
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          return (
            <label key={option.value} className={styles.row} htmlFor={optionId}>
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={value !== undefined ? value === option.value : undefined}
                defaultChecked={value === undefined ? defaultValue === option.value : undefined}
                disabled={option.disabled}
                onChange={(event) => onChange?.(event.target.value)}
                aria-describedby={error ? errorId : helperText ? helpId : undefined}
                className={styles.input}
              />
              <span className={styles.label}>{option.label}</span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p id={helpId} className={styles.help}>
          {helperText}
        </p>
      ) : null}
    </fieldset>
  );
}
