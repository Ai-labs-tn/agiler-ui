import { useId, type KeyboardEvent, type ReactNode } from 'react';

import { cn } from '../utils/cn';

import styles from './auth.module.css';

export interface AuthTab {
  id: string;
  label: string;
  content: ReactNode;
}

export interface AuthTabsProps {
  tabs: AuthTab[];
  /** Controlled active tab id. */
  value: string;
  onChange: (id: string) => void;
  ariaLabel?: string;
  className?: string;
}

/**
 * Accessible tab pair/list for auth screens (passwordless vs password).
 * Controlled: the screen owns which method is active.
 */
export function AuthTabs({ tabs, value, onChange, ariaLabel = 'Sign-in method', className }: AuthTabsProps) {
  const base = useId();
  const active = tabs.find((tab) => tab.id === value) ?? tabs[0];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((tab) => tab.id === active?.id);
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const step = event.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(index + step + tabs.length) % tabs.length];
      if (next) onChange(next.id);
    }
  };

  return (
    <div className={className}>
      <div className={styles.tabs} role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown}>
        {tabs.map((tab) => {
          const selected = tab.id === active?.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${base}-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${base}-${tab.id}-panel`}
              tabIndex={selected ? 0 : -1}
              data-active={selected}
              className={cn(styles.tab)}
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {active && (
        <div
          role="tabpanel"
          id={`${base}-${active.id}-panel`}
          aria-labelledby={`${base}-${active.id}`}
          className={styles.panel}
        >
          {active.content}
        </div>
      )}
    </div>
  );
}
