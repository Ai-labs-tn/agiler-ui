import type { Toast as ToastModel } from './toast.types';

import { Toast } from './Toast';
import styles from './ToastViewport.module.css';

export interface ToastViewportProps {
  toasts: ToastModel[];
  onDismiss: (id: string) => void;
}

/** Stacked, screen-reader-announced notification region. */
export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  if (toasts.length === 0) return null;

  return (
    <div className={styles.viewport} aria-label="Notifications">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
