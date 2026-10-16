import { cn } from '../utils/cn';

import styles from './charts.module.css';
import { chartVariantClass, type ChartVariant } from './variant';

export interface ProgressBarProps {
  /** Current value (0–100). */
  value: number;
  /** Accessible name for the progressbar. */
  label: string;
  /** Append the numeric value after the bar. */
  showValue?: boolean;
  variant?: ChartVariant;
  size?: 'sm' | 'md';
  /** Format the trailing value (defaults to `${value}%`). */
  formatValue?: (value: number) => string;
  className?: string;
}

/** A labelled, accessible progress bar. */
export function ProgressBar({
  value,
  label,
  showValue = true,
  variant = 'primary',
  size = 'sm',
  formatValue,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const formatted = formatValue ? formatValue(clamped) : `${clamped}%`;

  return (
    <div className={cn(styles.progressWrap, className)}>
      <div
        className={cn(styles.progressTrack, size === 'sm' ? styles.progressSm : styles.progressMd)}
        role="progressbar"
        aria-label={label}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span
          className={cn(styles.progressFill, chartVariantClass(variant))}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showValue && <span className={styles.progressLabel}>{formatted}</span>}
    </div>
  );
}
