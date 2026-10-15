import type { ReactNode } from 'react';

import { AppShell } from '../../components/layout/AppShell';
import { Card } from '../../components/cards/Card';
import { Grid } from '../../components/layout/Grid';
import { PageHeader } from '../../components/layout/PageHeader';
import { Panel } from '../../components/layout/Panel';
import { StatCard } from '../../components/layout/StatCard';
import type { DashboardStat } from '../columnar-grid-dashboard/layout';

export interface CardDashboardLayoutProps {
  sidebar?: ReactNode;
  topbar?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** `kpis` region — at-a-glance counts (patients, appointments, …). */
  stats?: DashboardStat[];
  /** `cards` region — one card per entity. */
  children?: ReactNode;
  /** `schedule` region — optional agenda/queue panel. */
  schedule?: ReactNode;
}

/**
 * Card-Based Dashboard — friendly, card-first dashboard for people-facing portals.
 * Regions: sidebar · topbar · kpis · cards · schedule.
 */
export function CardDashboardLayout({
  sidebar,
  topbar,
  title = 'Dashboard',
  description,
  stats = [],
  children,
  schedule,
}: CardDashboardLayoutProps) {
  return (
    <AppShell sidebar={sidebar} topbar={topbar}>
      <PageHeader title={title} description={description} />
      {stats.length > 0 && (
        <div style={{ marginTop: 'var(--space-4)' }}>
          <Grid columns={3} gap={4}>
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </Grid>
        </div>
      )}
      <div style={{ marginTop: 'var(--space-5)' }}>
        <Grid minItemWidth="20rem" gap={4}>
          {children ?? (
            <>
              <Card padding="md" isInteractive>
                <p>Entity card</p>
              </Card>
              <Card padding="md" isInteractive>
                <p>Entity card</p>
              </Card>
              <Card padding="md" isInteractive>
                <p>Entity card</p>
              </Card>
            </>
          )}
          {schedule && <Panel title="Today">{schedule}</Panel>}
        </Grid>
      </div>
    </AppShell>
  );
}
