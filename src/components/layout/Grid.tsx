import type { CSSProperties, ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './layout.module.css';

export interface GridProps {
  children: ReactNode;
  /**
   * Auto-fit columns by minimum item width (responsive, no media queries), e.g. `'18rem'`.
   * When omitted, `columns` fixed tracks are used.
   */
  minItemWidth?: string;
  /** Fixed column count (1–12). Ignored when `minItemWidth` is set. */
  columns?: number;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
  className?: string;
  style?: CSSProperties;
}

/** Responsive content grid — the backbone of bento/columnar/card layouts. */
export function Grid({
  children,
  minItemWidth,
  columns,
  gap = 4,
  className,
  style,
}: GridProps) {
  const template = minItemWidth
    ? `repeat(auto-fit, minmax(min(100%, ${minItemWidth}), 1fr))`
    : columns
      ? `repeat(${columns}, minmax(0, 1fr))`
      : undefined;

  return (
    <div
      className={cn(styles.grid, !template && styles['grid-auto'], styles[`gap-${gap}`], className)}
      style={{ gridTemplateColumns: template, ...style }}
    >
      {children}
    </div>
  );
}
