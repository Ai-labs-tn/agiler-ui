import type { ReactNode } from 'react';

import { IconButton } from '../buttons/IconButton';
import { cn } from '../../utils/cn';

import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
  onClose?: () => void;
  className?: string;
}

const ICONS: Record<AlertVariant, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  danger: '⛔',
};

const ROLE: Record<AlertVariant, 'status' | 'alert'> = {
  info: 'status',
  success: 'status',
  warning: 'alert',
  danger: 'alert',
};

export function Alert({ variant = 'info', title, children, onClose, className }: AlertProps) {
  return (
    <div
      className={cn(styles.alert, styles[variant], className)}
      role={ROLE[variant]}
      aria-live={ROLE[variant] === 'alert' ? 'assertive' : 'polite'}
    >
      <span className={styles.icon} aria-hidden="true">
        {ICONS[variant]}
      </span>
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        {children && <div className={styles.body}>{children}</div>}
      </div>
      {onClose && (
        <IconButton aria-label="Dismiss alert" size="sm" onClick={onClose} className={styles.close}>
          ✕
        </IconButton>
      )}
    </div>
  );
}
