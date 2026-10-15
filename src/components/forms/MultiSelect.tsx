import { useEffect, useRef, useState } from 'react';

import { cn } from '../../utils/cn';

import { FieldLabel } from './FieldLabel';
import { FieldMessage } from './FieldMessage';
import type { SelectOption } from './Select';
import { buildDescribedBy, useFieldA11y } from './useFieldA11y';
import field from './field.module.css';
import styles from './MultiSelect.module.css';

export interface MultiSelectProps {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  options: SelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  /** Max chips shown before collapsing into "+N more". */
  maxDisplay?: number;
}

export function MultiSelect({
  label,
  error,
  helperText,
  isRequired,
  options,
  value,
  onChange,
  placeholder = 'Select options',
  disabled,
  id,
  maxDisplay = 3,
}: MultiSelectProps) {
  const ids = useFieldA11y(id);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasError = Boolean(error);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointer = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  const toggleValue = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const selectedLabels = options
    .filter((option) => value.includes(option.value))
    .map((option) => option.label);

  const visible = selectedLabels.slice(0, maxDisplay);
  const hiddenCount = selectedLabels.length - visible.length;

  return (
    <div className={field.field} ref={containerRef}>
      {label && (
        <FieldLabel htmlFor={ids.inputId} isRequired={isRequired}>
          {label}
        </FieldLabel>
      )}
      <div className={styles.controlWrapper}>
        <button
          id={ids.inputId}
          type="button"
          className={cn(
            field.control,
            styles.trigger,
            hasError && field.invalid,
            isOpen && styles.open,
          )}
          onClick={() => setIsOpen((open) => !open)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={hasError || undefined}
          aria-required={isRequired || undefined}
          aria-describedby={buildDescribedBy(ids, { hasError, hasHelp: Boolean(helperText) })}
        >
          <span className={styles.value}>
            {selectedLabels.length === 0 ? (
              <span className={styles.placeholder}>{placeholder}</span>
            ) : (
              <>
                {visible.map((item) => (
                  <span key={item} className={styles.chip}>
                    {item}
                  </span>
                ))}
                {hiddenCount > 0 && <span className={styles.chip}>+{hiddenCount}</span>}
              </>
            )}
          </span>
          <span className={styles.chevron} aria-hidden="true">
            ▾
          </span>
        </button>

        {isOpen && (
          <ul className={styles.listbox} role="listbox" aria-multiselectable="true">
            {options.map((option) => {
              const checked = value.includes(option.value);
              return (
                <li key={option.value} role="option" aria-selected={checked}>
                  <label className={styles.option}>
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={option.disabled}
                      onChange={() => toggleValue(option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <FieldMessage ids={ids} error={error} helperText={helperText} />
    </div>
  );
}
