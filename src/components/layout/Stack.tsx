import type { ElementType, ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './layout.module.css';

export interface StackProps {
  children: ReactNode;
  direction?: 'row' | 'column';
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
  as?: ElementType;
  className?: string;
}

/** Flex stack — the default way to arrange content inside a region. */
export function Stack({
  children,
  direction = 'column',
  gap = 3,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  as: Component = 'div',
  className,
}: StackProps) {
  return (
    <Component
      className={cn(
        styles.stack,
        styles[direction],
        styles[`gap-${gap}`],
        styles[`align-${align}`],
        styles[`justify-${justify}`],
        wrap && styles.wrap,
        className,
      )}
    >
      {children}
    </Component>
  );
}
