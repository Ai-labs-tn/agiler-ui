import type { ReactNode } from 'react';

import { AppShell } from '../../components/layout/AppShell';
import { PageHeader } from '../../components/layout/PageHeader';
import { Panel } from '../../components/layout/Panel';
import { Toolbar } from '../../components/layout/Toolbar';
import { Section } from '../../components/layout/Section';

export interface DataTableLayoutProps {
  sidebar?: ReactNode;
  topbar?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** `toolbar` region — search, filters, export. */
  toolbar?: ReactNode;
  /** `summary` region — optional KPI strip above the table. */
  summary?: ReactNode;
  /** `table` region — the DataTable (+ selection). */
  children: ReactNode;
  /** `pagination` region. */
  pagination?: ReactNode;
}

/**
 * Data Table — list-first layout for records-heavy back offices (dense, filterable).
 * Regions: sidebar · topbar · toolbar · summary · table · pagination.
 */
export function DataTableLayout({
  sidebar,
  topbar,
  title = 'Records',
  description,
  toolbar,
  summary,
  children,
  pagination,
}: DataTableLayoutProps) {
  return (
    <AppShell sidebar={sidebar} topbar={topbar}>
      <PageHeader title={title} description={description} />
      {summary && (
        <div style={{ marginTop: 'var(--space-4)' }}>
          <Section>{summary}</Section>
        </div>
      )}
      {toolbar && (
        <div style={{ marginTop: 'var(--space-4)' }}>
          <Toolbar>{toolbar}</Toolbar>
        </div>
      )}
      <div style={{ marginTop: 'var(--space-4)' }}>
        <Panel padding="none">{children}</Panel>
      </div>
      {pagination && (
        <div style={{ marginTop: 'var(--space-3)' }}>
          <Toolbar>{pagination}</Toolbar>
        </div>
      )}
    </AppShell>
  );
}
