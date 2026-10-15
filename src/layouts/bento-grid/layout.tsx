import type { ReactNode } from 'react';

import { Grid } from '../../components/layout/Grid';
import { PageHeader } from '../../components/layout/PageHeader';
import { Panel } from '../../components/layout/Panel';
import { PublicShell } from '../../components/layout/PublicShell';
import { Section } from '../../components/layout/Section';

export interface BentoGridLayoutProps {
  /** `header` region — site navigation. */
  header?: ReactNode;
  /** `hero` region — headline + primary call to action. */
  hero?: ReactNode;
  /** `gallery` region — the bento cells (one tile per item). */
  gallery?: ReactNode;
  /** `about` region. */
  about?: ReactNode;
  /** `contact` region. */
  contact?: ReactNode;
  /** `footer` region. */
  footer?: ReactNode;
}

/**
 * Bento Grid — a modular tile grid for portfolio/marketing sites.
 * Regions: header · hero · gallery · about · contact · footer.
 */
export function BentoGridLayout({
  header,
  hero,
  gallery,
  about,
  contact,
  footer,
}: BentoGridLayoutProps) {
  return (
    <PublicShell header={header} footer={footer}>
      <Section>{hero ?? <PageHeader title="Hero" description="Headline and primary action." />}</Section>

      <Section title="Highlights" description="One tile per project or highlight.">
        {gallery ?? (
          <Grid minItemWidth="16rem">
            {[0, 1, 2, 3, 4, 5].map((cell) => (
              <Panel key={cell} title={`Tile ${cell + 1}`}>
                <p>Tile content.</p>
              </Panel>
            ))}
          </Grid>
        )}
      </Section>

      <Grid minItemWidth="20rem">
        <Panel title="About">{about ?? <p>About this portfolio.</p>}</Panel>
        <Panel title="Contact">{contact ?? <p>Get in touch.</p>}</Panel>
      </Grid>
    </PublicShell>
  );
}
