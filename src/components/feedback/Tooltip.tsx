import { useId, useState, type ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './Tooltip.module.css';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({ content, children, position = 'top', className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();

  return (
    <span
      className={cn(styles.wrapper, className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <span aria-describedby={isVisible ? tooltipId : undefined}>{children}</span>
      {isVisible && (
        <span role="tooltip" id={tooltipId} className={cn(styles.tooltip, styles[position])}>
          {content}
        </span>
      )}
    </span>
  );
}
