import type { ReactNode } from 'react';

import { PageHeader } from '../../components/layout/PageHeader';
import { Panel } from '../../components/layout/Panel';
import { PublicShell } from '../../components/layout/PublicShell';
import { Section } from '../../components/layout/Section';
import layoutStyles from '../../components/layout/layout.module.css';

export interface AsymmetricalLayoutProps {
  header?: ReactNode;
  hero?: ReactNode;
  /** `primary` region — the visually dominant column (2/3). */
  primary?: ReactNode;
  /** `secondary` region — the supporting column (1/3). */
  secondary?: ReactNode;
  about?: ReactNode;
  contact?: ReactNode;
  footer?: ReactNode;
}

/**
 * Asymmetrical — an editorial 2/3 + 1/3 split for portfolio sites.
 * Regions: header · hero · primary · secondary · about · contact · footer.
 */
export function AsymmetricalLayout({
  header,
  hero,
  primary,
  secondary,
  about,
  contact,
  footer,
}: AsymmetricalLayoutProps) {
  return (
    <PublicShell header={header} footer={footer}>
      <Section>{hero ?? <PageHeader title="Hero" description="Headline and primary action." />}</Section>

      <Section title="Featured work">
        <div className={layoutStyles.asymRow}>
          <Panel title="Featured project">
            {primary ?? <p>The main case study, taking two-thirds of the row.</p>}
          </Panel>
          <Panel title="More work">
            {secondary ?? <p>Supporting list of smaller pieces.</p>}
          </Panel>
        </div>
      </Section>

      <div className={layoutStyles.asymRow}>
        <Panel title="About">{about ?? <p>About this practice.</p>}</Panel>
        <Panel title="Contact">{contact ?? <p>Get in touch.</p>}</Panel>
      </div>
    </PublicShell>
  );
}
