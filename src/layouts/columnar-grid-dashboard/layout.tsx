import type { ReactNode } from 'react';

import { AppShell } from '../../components/layout/AppShell';
import { Grid } from '../../components/layout/Grid';
import { PageHeader } from '../../components/layout/PageHeader';
import { Panel } from '../../components/layout/Panel';
import { StatCard } from '../../components/layout/StatCard';

export interface DashboardStat {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  trend?: { value: ReactNode; direction?: 'up' | 'down' | 'flat' };
}

export interface ColumnarGridDashboardLayoutProps {
  sidebar?: ReactNode;
  topbar?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** `kpis` region — the metric strip. */
  stats?: DashboardStat[];
  /** `grid` region — the columnar analysis grid. */
  children?: ReactNode;
  /** `detail` region — optional side analysis. */
  detail?: ReactNode;
}

/**
 * Strict Columnar Grid + Dashboard — dense metric strip over a rigid analysis grid.
 * Regions: sidebar · topbar · kpis · grid · detail.
 */
export function ColumnarGridDashboardLayout({
  sidebar,
  topbar,
  title = 'Dashboard',
  description,
  stats = [],
  children,
  detail,
}: ColumnarGridDashboardLayoutProps) {
  return (
    <AppShell sidebar={sidebar} topbar={topbar}>
      <PageHeader title={title} description={description} />
      {stats.length > 0 && (
        <div style={{ marginTop: 'var(--space-4)' }}>
          <Grid columns={4} gap={4}>
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </Grid>
        </div>
      )}
      <div style={{ marginTop: 'var(--space-5)' }}>
        <Grid minItemWidth="22rem" gap={4}>
          {children}
          {detail && <Panel title="Detail">{detail}</Panel>}
        </Grid>
      </div>
    </AppShell>
  );
}
