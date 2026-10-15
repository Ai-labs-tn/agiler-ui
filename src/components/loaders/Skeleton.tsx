import { cn } from '../../utils/cn';

import styles from './Skeleton.module.css';

export interface SkeletonProps {
  /** Any valid CSS size value, e.g. `'100%'`, `'12rem'`. */
  width?: string;
  height?: string;
  radius?: 'sm' | 'md' | 'lg' | 'full';
  /** Render multiple stacked lines for text placeholders. */
  lines?: number;
  className?: string;
}

export function Skeleton({ width, height, radius = 'md', lines = 1, className }: SkeletonProps) {
  if (lines > 1) {
    return (
      <div className={cn(styles.stack, className)} role="status" aria-label="Loading content">
        {Array.from({ length: lines }).map((_, index) => (
          <span
            key={index}
            className={cn(styles.skeleton, styles[radius])}
            style={{ width: index === lines - 1 ? '70%' : width, height }}
          />
        ))}
      </div>
    );
  }

  return (
    <span
      className={cn(styles.skeleton, styles[radius], className)}
      style={{ width, height }}
      role="status"
      aria-label="Loading content"
    />
  );
}
