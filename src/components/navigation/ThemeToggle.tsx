import { useTheme } from '../../theme/useTheme';
import type { ThemePreference } from '../../theme/types';

import styles from './ThemeToggle.module.css';

const OPTIONS: { value: ThemePreference; label: string; icon: string }[] = [
  { value: 'light', label: 'Light theme', icon: '☀' },
  { value: 'dark', label: 'Dark theme', icon: '☾' },
  { value: 'system', label: 'System theme', icon: '⚙' },
];

export function ThemeToggle() {
  const { preference, setPreference } = useTheme();

  return (
    <div className={styles.group} role="radiogroup" aria-label="Color theme">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={preference === option.value}
          className={styles.option}
          data-active={preference === option.value}
          onClick={() => setPreference(option.value)}
          title={option.label}
        >
          <span aria-hidden="true">{option.icon}</span>
          <span className="visually-hidden">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
