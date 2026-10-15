import { useEffect } from 'react';

/** Prevents background scroll while `active` (modals, drawers, mobile nav). */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [active]);
}
