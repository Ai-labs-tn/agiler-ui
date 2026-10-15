import type { ElementType, ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './Card.module.css';

export interface CardProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  isInteractive?: boolean;
  className?: string;
  as?: ElementType;
}

export function Card({
  children,
  header,
  footer,
  padding = 'md',
  isInteractive = false,
  className,
  as: Component = 'div',
}: CardProps) {
  return (
    <Component className={cn(styles.card, isInteractive && styles.interactive, className)}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={cn(styles.content, styles[padding])}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </Component>
  );
}
