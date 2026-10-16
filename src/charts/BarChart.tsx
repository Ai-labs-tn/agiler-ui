import type { ReactNode } from 'react';

import { cn } from '../utils/cn';

import styles from './charts.module.css';
import { chartVariantClass, type ChartVariant } from './variant';

export interface BarChartDatum {
  label: string;
  value: number;
  variant?: ChartVariant;
}

export interface BarChartProps {
  data: BarChartDatum[];
  /** Required: charts are images to assistive tech, so they need an accessible name. */
  ariaLabel: string;
  height?: string;
  formatValue?: (value: number) => string;
  variant?: ChartVariant;
  className?: string;
  emptyLabel?: ReactNode;
}

/** Vertical bar chart built from flex columns — responsive, no fixed viewBox. */
export function BarChart({
  data,
  ariaLabel,
  height = '10rem',
  formatValue,
  variant = 'primary',
  className,
  emptyLabel = 'No data yet.',
}: BarChartProps) {
  if (data.length === 0) {
    return <p className={styles.empty}>{emptyLabel}</p>;
  }
  const max = Math.max(1, ...data.map((point) => point.value));

  return (
    <div className={cn(styles.bars, className)} style={{ height }} role="img" aria-label={ariaLabel}>
      {data.map((point) => (
        <div key={point.label} className={styles.barCol}>
          <div className={styles.barTrack}>
            <span
              className={cn(styles.barFill, chartVariantClass(point.variant ?? variant))}
              style={{ height: `${(point.value / max) * 100}%` }}
            />
          </div>
          <span className={styles.barValue}>
            {formatValue ? formatValue(point.value) : point.value}
          </span>
          <span className={styles.barLabel}>{point.label}</span>
        </div>
      ))}
    </div>
  );
}

export interface HBarChartProps {
  data: BarChartDatum[];
  ariaLabel: string;
  formatValue?: (value: number) => string;
  variant?: ChartVariant;
  className?: string;
  emptyLabel?: ReactNode;
}

/** Horizontal bar chart — better for long category names and side-by-side comparisons. */
export function HBarChart({
  data,
  ariaLabel,
  formatValue,
  variant = 'primary',
  className,
  emptyLabel = 'No data yet.',
}: HBarChartProps) {
  if (data.length === 0) {
    return <p className={styles.empty}>{emptyLabel}</p>;
  }
  const max = Math.max(1, ...data.map((point) => point.value));

  return (
    <div className={cn(styles.hBars, className)} role="img" aria-label={ariaLabel}>
      {data.map((point) => (
        <div key={point.label} className={styles.hRow}>
          <span className={styles.hLabel} title={point.label}>
            {point.label}
          </span>
          <span className={styles.hTrack}>
            <span
              className={cn(styles.hFill, chartVariantClass(point.variant ?? variant))}
              style={{ width: `${(point.value / max) * 100}%` }}
            />
          </span>
          <span className={styles.hValue}>
            {formatValue ? formatValue(point.value) : point.value}
          </span>
        </div>
      ))}
    </div>
  );
}
