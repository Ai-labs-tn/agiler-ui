import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './layout.module.css';

export interface AppShellProps {
  children: ReactNode;
  /** Sidebar region — typically a `Sidebar`. Hidden below `lg` (render a Drawer instead). */
  sidebar?: ReactNode;
  /** Topbar region — typically a `TopBar`. */
  topbar?: ReactNode;
  className?: string;
}

/**
 * Application shell: persistent sidebar + topbar + main content (grid areas).
 * Below `lg` the sidebar collapses and the consumer surfaces it as a `Drawer`.
 */
export function AppShell({ children, sidebar, topbar, className }: AppShellProps) {
  return (
    <div className={cn(styles.appShell, className)}>
      {sidebar && <div className={styles.appShellSidebar}>{sidebar}</div>}
      {topbar && <div className={styles.appShellTopbar}>{topbar}</div>}
      <main className={styles.appShellMain}>{children}</main>
    </div>
  );
}
