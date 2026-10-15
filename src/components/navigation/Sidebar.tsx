import { Fragment, type ElementType, type ReactNode } from 'react';

import { cn } from '../../utils/cn';

import styles from './Sidebar.module.css';

export interface NavItem {
  label: string;
  to: string;
  icon?: ReactNode;
  /** Optional group heading rendered above the first item of a new group. */
  group?: string;
}

export interface SidebarProps {
  brand: ReactNode;
  items: NavItem[];
  collapsed?: boolean;
  footer?: ReactNode;
  /** Called after a link is activated (used to close the mobile drawer). */
  onNavigate?: () => void;
  className?: string;
  /** Current path — used to highlight the active item. */
  activePath?: string;
  /**
   * Router link component (e.g. React Router's `NavLink`). It receives `to`, `className`,
   * `title` and `onClick` instead of `href`, so this package stays router-agnostic.
   */
  linkComponent?: ElementType;
}

export function Sidebar({
  brand,
  items,
  collapsed = false,
  footer,
  onNavigate,
  className,
  activePath,
  linkComponent: LinkComponent = 'a',
}: SidebarProps) {
  const isAnchor = LinkComponent === 'a';
  const isActive = (to: string) => activePath === to || Boolean(activePath?.startsWith(`${to}/`));

  return (
    <nav
      className={cn(styles.sidebar, collapsed && styles.collapsed, className)}
      aria-label="Primary"
    >
      <div className={styles.brand}>{brand}</div>

      <ul className={styles.items}>
        {items.map((item, index) => (
          <Fragment key={item.to}>
            {item.group && item.group !== items[index - 1]?.group && (
              <li className={styles.groupLabel} aria-hidden="true">
                {collapsed ? '' : item.group}
              </li>
            )}
            <li>
              <LinkComponent
                {...(isAnchor ? { href: item.to } : { to: item.to })}
                onClick={onNavigate}
                className={cn(styles.item, isActive(item.to) && styles.active)}
                title={collapsed ? item.label : undefined}
              >
                {item.icon && <span className={styles.icon}>{item.icon}</span>}
                <span className={styles.label}>{item.label}</span>
              </LinkComponent>
            </li>
          </Fragment>
        ))}
      </ul>

      {footer && <div className={styles.footer}>{footer}</div>}
    </nav>
  );
}
