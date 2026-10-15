import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './layout.module.css';

export interface StatCardProps {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  trend?: { value: ReactNode; direction?: 'up' | 'down' | 'flat' };
  icon?: ReactNode;
  className?: string;
}

/** KPI tile for dashboards (card / columnar layouts). */
export function StatCard({ label, value, hint, trend, icon, className }: StatCardProps) {
  return (
    <div className={cn(styles.statCard, className)}>
      <div className={styles.toolbar}>
        <p className={styles.statLabel}>{label}</p>
        {icon && <span aria-hidden="true">{icon}</span>}
      </div>
      <p className={styles.statValue}>{value}</p>
      {hint && <p className={styles.statHint}>{hint}</p>}
      {trend && (
        <p className={cn(styles.statTrend, styles[`trend-${trend.direction ?? 'flat'}`])}>
          {trend.value}
        </p>
      )}
    </div>
  );
}
