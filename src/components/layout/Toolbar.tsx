import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './layout.module.css';

export interface ToolbarProps {
  children: ReactNode;
  /** Right-aligned actions (primary action, view switch, …). */
  actions?: ReactNode;
  className?: string;
}

/** Horizontal controls bar: filters/search on the left, actions on the right. */
export function Toolbar({ children, actions, className }: ToolbarProps) {
  return (
    <div className={cn(styles.toolbar, className)} role="toolbar">
      <div className={styles.toolbarGroup}>{children}</div>
      {actions && <div className={styles.toolbarGroup}>{actions}</div>}
    </div>
  );
}
