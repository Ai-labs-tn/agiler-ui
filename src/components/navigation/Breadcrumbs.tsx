import type { ElementType } from 'react';

import styles from './Breadcrumbs.module.css';

export interface Crumb {
  label: string;
  to?: string;
}

export interface BreadcrumbsProps {
  items: Crumb[];
  /** Router link component (e.g. React Router's `Link`); defaults to a plain anchor. */
  linkComponent?: ElementType;
}

export function Breadcrumbs({ items, linkComponent: LinkComponent = 'a' }: BreadcrumbsProps) {
  const isAnchor = LinkComponent === 'a';

  return (
    <nav aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {item.to && !isLast ? (
                <LinkComponent
                  {...(isAnchor ? { href: item.to } : { to: item.to })}
                  className={styles.link}
                >
                  {item.label}
                </LinkComponent>
              ) : (
                <span className={styles.current} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
