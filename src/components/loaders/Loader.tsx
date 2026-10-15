import { cn } from '../../utils/cn';

import { Spinner } from './Spinner';
import styles from './Loader.module.css';

export interface LoaderProps {
  /** Label displayed beneath the spinner. */
  label?: string;
  /** Fill the parent container and center the loader. */
  fullScreen?: boolean;
  className?: string;
}

/** Full-area loading state for routes, panels, and async sections. */
export function Loader({ label = 'Loading…', fullScreen = false, className }: LoaderProps) {
  return (
    <div className={cn(styles.loader, fullScreen && styles.fullScreen, className)} role="status">
      <Spinner size="lg" label={label} />
      <p className={styles.label}>{label}</p>
    </div>
  );
}
