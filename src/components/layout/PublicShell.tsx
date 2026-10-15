import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './layout.module.css';

export interface PublicShellProps {
  children: ReactNode;
  /** Header region — typically a nav bar (not a `Sidebar`). */
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/** Marketing/public shell: full-width header, centred content column, footer. */
export function PublicShell({ children, header, footer, className }: PublicShellProps) {
  return (
    <div className={cn(styles.publicShell, className)}>
      {header && (
        <div className={styles.publicShellHeader}>
          <div className={styles.publicShellInner}>{header}</div>
        </div>
      )}
      <main className={styles.publicShellMain}>{children}</main>
      {footer && (
        <div className={styles.publicShellFooter}>
          <div className={styles.publicShellInner}>{footer}</div>
        </div>
      )}
    </div>
  );
}
