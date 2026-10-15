import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './Badge.module.css';

export type BadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

export function Badge({ children, variant = 'neutral', size = 'md', className }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[variant], styles[size], className)}>{children}</span>
  );
}
