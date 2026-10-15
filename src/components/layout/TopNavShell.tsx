import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './layout.module.css';

export interface TopNavShellProps {
  children: ReactNode;
  /** Topbar region — horizontal navigation without a sidebar. */
  topbar?: ReactNode;
  className?: string;
}

/** Shell for apps that use horizontal navigation (no sidebar). */
export function TopNavShell({ children, topbar, className }: TopNavShellProps) {
  return (
    <div className={cn(styles.topNavShell, className)}>
      {topbar}
      <main className={styles.topNavShellMain}>{children}</main>
    </div>
  );
}
