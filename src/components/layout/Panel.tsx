import type { ElementType, ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './layout.module.css';

export interface PanelProps {
  children: ReactNode;
  title?: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: ElementType;
  className?: string;
}

/**
 * Region container — a bordered surface used to compose layout regions
 * (lighter than `Card`, which carries header/footer chrome).
 */
export function Panel({
  children,
  title,
  padding = 'md',
  as: Component = 'div',
  className,
}: PanelProps) {
  return (
    <Component className={cn(styles.panel, styles[`panel-padding-${padding}`], className)}>
      {title && <p className={styles.panelTitle}>{title}</p>}
      {children}
    </Component>
  );
}
