import styles from './charts.module.css';

/** Chart colour variants — resolved to design tokens (never raw colours). */
export type ChartVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const FILL: Record<ChartVariant, string> = {
  primary: styles.variantPrimary,
  success: styles.variantSuccess,
  warning: styles.variantWarning,
  danger: styles.variantDanger,
  info: styles.variantInfo,
  neutral: styles.variantNeutral,
};

const STROKE: Record<ChartVariant, string> = {
  primary: styles.strokePrimary,
  success: styles.strokeSuccess,
  warning: styles.strokeWarning,
  danger: styles.strokeDanger,
  info: styles.strokeInfo,
  neutral: styles.strokeNeutral,
};

export function chartVariantClass(variant: ChartVariant): string {
  return FILL[variant];
}

export function chartStrokeClass(variant: ChartVariant): string {
  return STROKE[variant];
}

/** The order segments cycle through when a chart does not assign variants. */
export const CHART_VARIANT_CYCLE: ChartVariant[] = ['primary', 'success', 'info', 'warning', 'danger'];
