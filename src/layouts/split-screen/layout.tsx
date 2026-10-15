import type { ReactNode } from 'react';

import { AppShell } from '../../components/layout/AppShell';
import { PageHeader } from '../../components/layout/PageHeader';
import { Panel } from '../../components/layout/Panel';
import layoutStyles from '../../components/layout/layout.module.css';

export interface SplitScreenLayoutProps {
  /** `sidebar` region — primary navigation. */
  sidebar?: ReactNode;
  /** `topbar` region — page title bar. */
  topbar?: ReactNode;
  /** `main` region — the primary work area. */
  children: ReactNode;
  /** `detail` region — optional right-hand detail column. */
  detail?: ReactNode;
}

/**
 * Split-Screen — sidebar navigation plus a main work area with an optional detail column.
 * Regions: sidebar · topbar · main · detail.
 */
export function SplitScreenLayout({
  sidebar,
  topbar,
  children,
  detail,
}: SplitScreenLayoutProps) {
  return (
    <AppShell sidebar={sidebar} topbar={topbar}>
      {detail ? (
        <div className={layoutStyles.asymRow}>
          <div>{children}</div>
          <Panel title="Details">{detail}</Panel>
        </div>
      ) : (
        <>{children}</>
      )}
    </AppShell>
  );
}
