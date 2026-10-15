import type { Toast as ToastModel } from './toast.types';
import { cn } from '../../utils/cn';

import styles from './Toast.module.css';

export interface ToastProps {
  toast: ToastModel;
  onDismiss: (id: string) => void;
}

const ICONS: Record<ToastModel['variant'], string> = {
  success: '✓',
  error: '⛔',
  warning: '⚠',
  info: 'ℹ',
};

export function Toast({ toast, onDismiss }: ToastProps) {
  const isAlert = toast.variant === 'error' || toast.variant === 'warning';

  return (
    <div
      className={cn(styles.toast, styles[toast.variant])}
      role={isAlert ? 'alert' : 'status'}
      aria-live={isAlert ? 'assertive' : 'polite'}
    >
      <span className={styles.icon} aria-hidden="true">
        {ICONS[toast.variant]}
      </span>
      <div className={styles.content}>
        <p className={styles.title}>{toast.title}</p>
        {toast.description && <p className={styles.description}>{toast.description}</p>}
      </div>
      <button
        type="button"
        className={styles.close}
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}
