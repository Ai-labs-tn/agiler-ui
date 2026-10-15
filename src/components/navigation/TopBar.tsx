import type { ReactNode } from 'react';

import { IconButton } from '../buttons/IconButton';
import { cn } from '../../utils/cn';

import styles from './TopBar.module.css';

export interface TopBarProps {
  title?: ReactNode;
  onMenuClick?: () => void;
  actions?: ReactNode;
  className?: string;
}

export function TopBar({ title, onMenuClick, actions, className }: TopBarProps) {
  return (
    <header className={cn(styles.topBar, className)}>
      {onMenuClick && (
        <IconButton aria-label="Open navigation menu" onClick={onMenuClick} className={styles.menu}>
          ☰
        </IconButton>
      )}
      {title && <div className={styles.title}>{title}</div>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </header>
  );
}
