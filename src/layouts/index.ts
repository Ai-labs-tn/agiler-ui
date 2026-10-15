/**
 * Layout archetypes — the page skeletons an order picks (v3.1 plan §3.2).
 *
 * Each layout is a React component with declared regions (`layout.json`), plus an inline-SVG
 * wireframe preview for the order form. `scripts/generate-manifest.mjs` stamps the contracts into
 * `manifest.json` under `layouts`.
 */

export type { DashboardStat } from './columnar-grid-dashboard/layout';
export type { BoardLane } from './kanban-board/layout';

export { AuthCenteredLayout, type AuthCenteredLayoutProps } from './auth-centered/layout';
export { AuthCenteredPreview } from './auth-centered/layout.preview';
export { AsymmetricalLayout, type AsymmetricalLayoutProps } from './asymmetrical/layout';
export { AsymmetricalPreview } from './asymmetrical/layout.preview';
export { BentoGridLayout, type BentoGridLayoutProps } from './bento-grid/layout';
export { BentoGridPreview } from './bento-grid/layout.preview';
export {
  CardDashboardLayout,
  type CardDashboardLayoutProps,
} from './card-dashboard/layout';
export { CardDashboardPreview } from './card-dashboard/layout.preview';
export {
  ColumnarGridDashboardLayout,
  type ColumnarGridDashboardLayoutProps,
} from './columnar-grid-dashboard/layout';
export { ColumnarGridDashboardPreview } from './columnar-grid-dashboard/layout.preview';
export { DataTableLayout, type DataTableLayoutProps } from './data-table/layout';
export { DataTablePreview } from './data-table/layout.preview';
export { KanbanBoardLayout, type KanbanBoardLayoutProps } from './kanban-board/layout';
export { KanbanBoardPreview } from './kanban-board/layout.preview';
export { SplitScreenLayout, type SplitScreenLayoutProps } from './split-screen/layout';
export { SplitScreenPreview } from './split-screen/layout.preview';
