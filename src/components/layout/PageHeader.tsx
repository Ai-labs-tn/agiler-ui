import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './layout.module.css';

export interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
  /** Optional slot rendered above the title (e.g. Breadcrumbs). */
  above?: ReactNode;
  className?: string;
}

/**
 * Page title block. Owns the single `<h1>` of a screen, so layouts produced by
 * the Design agent keep one heading hierarchy.
 */
export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  above,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn(styles.pageHeader, className)}>
      <div className={styles.pageHeaderMain}>
        {above}
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.pageTitle}>{title}</h1>
        {description && <p className={styles.pageDescription}>{description}</p>}
      </div>
      {actions && <div className={styles.pageActions}>{actions}</div>}
    </header>
  );
}
