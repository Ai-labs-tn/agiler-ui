/**
 * `@agiler/ui` — the AGILER design system public surface.
 *
 * Every export here MUST have a matching `status: "available"` entry in `catalog.json`;
 * `scripts/check-manifest.mjs` enforces the two stay in sync (CI gate).
 */

export {
  Button,
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
} from './components/buttons/Button';
export { Card, type CardProps } from './components/cards/Card';
export {
  Badge,
  type BadgeProps,
  type BadgeSize,
  type BadgeVariant,
} from './components/feedback/Badge';
export { Spinner, type SpinnerProps } from './components/loaders/Spinner';
