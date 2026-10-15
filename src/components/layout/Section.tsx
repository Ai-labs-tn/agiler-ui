import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './layout.module.css';

export interface SectionProps {
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  id?: string;
  className?: string;
}

/** Labelled page section — gives every layout a predictable heading structure. */
export function Section({ children, title, description, actions, id, className }: SectionProps) {
  return (
    <section className={cn(styles.section, className)} id={id}>
      {(title || actions) && (
        <header className={styles.sectionHeader}>
          <div>
            {title && <h2 className={styles.sectionTitle}>{title}</h2>}
            {description && <p className={styles.sectionDescription}>{description}</p>}
          </div>
          {actions && <div className={styles.pageActions}>{actions}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
