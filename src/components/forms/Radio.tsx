import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '../../utils/cn';

import styles from './Radio.module.css';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, id, className, ...rest },
  ref,
) {
  return (
    <label className={styles.row} htmlFor={id}>
      <input ref={ref} id={id} type="radio" className={cn(styles.input, className)} {...rest} />
      <span className={styles.label}>{label}</span>
    </label>
  );
});
