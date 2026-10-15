import type { ReactNode } from 'react';

import { AppShell } from '../../components/layout/AppShell';
import { EmptyState } from '../../components/layout/EmptyState';
import { PageHeader } from '../../components/layout/PageHeader';
import { Panel } from '../../components/layout/Panel';
import { Toolbar } from '../../components/layout/Toolbar';
import layoutStyles from '../../components/layout/layout.module.css';

export interface BoardLane {
  id: string;
  title: ReactNode;
  children?: ReactNode;
}

export interface KanbanBoardLayoutProps {
  sidebar?: ReactNode;
  topbar?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** `toolbar` region — filters, view switch, primary action. */
  toolbar?: ReactNode;
  /** `board` region — the lanes. */
  lanes?: BoardLane[];
  /** `detail` region — optional selection detail. */
  detail?: ReactNode;
}

/**
 * Kanban Board — horizontally scrolling lanes for pipeline/workflow work.
 * Regions: sidebar · topbar · toolbar · board · detail.
 */
export function KanbanBoardLayout({
  sidebar,
  topbar,
  title = 'Board',
  description,
  toolbar,
  lanes = [],
  detail,
}: KanbanBoardLayoutProps) {
  return (
    <AppShell sidebar={sidebar} topbar={topbar}>
      <PageHeader title={title} description={description} />
      {toolbar && (
        <div style={{ marginTop: 'var(--space-4)' }}>
          <Toolbar>{toolbar}</Toolbar>
        </div>
      )}
      <div style={{ marginTop: 'var(--space-4)' }}>
        {lanes.length === 0 ? (
          <Panel>
            <EmptyState title="No lanes yet" description="Board lanes appear here." />
          </Panel>
        ) : (
          <div className={layoutStyles.lanes}>
            {lanes.map((lane) => (
              <Panel key={lane.id} title={lane.title}>
                {lane.children}
              </Panel>
            ))}
          </div>
        )}
      </div>
      {detail && (
        <div style={{ marginTop: 'var(--space-4)' }}>
          <Panel title="Details">{detail}</Panel>
        </div>
      )}
    </AppShell>
  );
}
