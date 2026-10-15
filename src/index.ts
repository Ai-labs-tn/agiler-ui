/**
 * `@agiler/ui` — the AGILER design system public surface.
 *
 * Every component export here MUST have a matching `status: "available"` entry in
 * `catalog.json`; `scripts/check-manifest.mjs` enforces the two stay in sync (CI gate).
 * Type-only exports are ignored by that check.
 */

// Buttons
export { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from './components/buttons/Button';
export { IconButton, type IconButtonProps } from './components/buttons/IconButton';

// Cards
export { Card, type CardProps } from './components/cards/Card';

// Feedback
export { Alert, type AlertProps, type AlertVariant } from './components/feedback/Alert';
export { Badge, type BadgeProps, type BadgeSize, type BadgeVariant } from './components/feedback/Badge';
export { Toast, type ToastProps } from './components/feedback/Toast';
export { ToastViewport, type ToastViewportProps } from './components/feedback/ToastViewport';
export { Tooltip, type TooltipProps } from './components/feedback/Tooltip';
export type { Toast as ToastModel, ToastVariant } from './components/feedback/toast.types';

// Forms
export { Checkbox, type CheckboxProps } from './components/forms/Checkbox';
export { DatePicker, type DatePickerProps } from './components/forms/DatePicker';
export { FieldLabel, type FieldLabelProps } from './components/forms/FieldLabel';
export { FieldMessage, type FieldMessageProps } from './components/forms/FieldMessage';
export { FileUpload, type FileUploadProps } from './components/forms/FileUpload';
export { Input, type InputProps } from './components/forms/Input';
export { MultiSelect, type MultiSelectProps } from './components/forms/MultiSelect';
export { Radio, type RadioProps } from './components/forms/Radio';
export { RadioGroup, type RadioGroupProps, type RadioOption } from './components/forms/RadioGroup';
export { Select, type SelectOption, type SelectProps } from './components/forms/Select';
export { TextArea, type TextAreaProps } from './components/forms/TextArea';
export { Toggle, type ToggleProps } from './components/forms/Toggle';
export {
  buildDescribedBy,
  useFieldA11y,
  type FieldA11yIds,
} from './components/forms/useFieldA11y';

// Loaders
export { Loader, type LoaderProps } from './components/loaders/Loader';
export { Skeleton, type SkeletonProps } from './components/loaders/Skeleton';
export { Spinner, type SpinnerProps } from './components/loaders/Spinner';

// Modals
export { Drawer, type DrawerProps } from './components/modals/Drawer';
export { Modal, type ModalProps, type ModalSize } from './components/modals/Modal';

// Navigation
export { Breadcrumbs, type BreadcrumbsProps, type Crumb } from './components/navigation/Breadcrumbs';
export { Sidebar, type NavItem, type SidebarProps } from './components/navigation/Sidebar';
export { ThemeToggle } from './components/navigation/ThemeToggle';
export { TopBar, type TopBarProps } from './components/navigation/TopBar';

// Tables
export { DataTable, type Column, type DataTableProps } from './components/tables/DataTable';
export { Pagination, type PaginationProps } from './components/tables/Pagination';

// Composition primitives (layout building blocks)
export {
  AppShell,
  EmptyState,
  Grid,
  PageHeader,
  Panel,
  PublicShell,
  Section,
  Stack,
  StatCard,
  Toolbar,
  TopNavShell,
  type AppShellProps,
  type EmptyStateProps,
  type GridProps,
  type PageHeaderProps,
  type PanelProps,
  type PublicShellProps,
  type SectionProps,
  type StackProps,
  type StatCardProps,
  type ToolbarProps,
  type TopNavShellProps,
} from './components/layout';

// Auth templates (standard sign-in surfaces: passwordless + password + reset)
export {
  AuthMethods,
  AuthScreen,
  AuthShell,
  AuthTabs,
  OtpSignIn,
  PasswordReset,
  PasswordSignIn,
  type AuthMethodsProps,
  type AuthScreenProps,
  type AuthShellProps,
  type AuthTab,
  type AuthTabsProps,
  type OtpSignInProps,
  type PasswordResetProps,
  type PasswordSignInProps,
} from './auth';

// Layout archetypes (page skeletons an order picks — see v3.1 plan §3.2)
export {
  AsymmetricalLayout,
  AsymmetricalPreview,
  AuthCenteredLayout,
  AuthCenteredPreview,
  type AuthCenteredLayoutProps,
  BentoGridLayout,
  BentoGridPreview,
  CardDashboardLayout,
  CardDashboardPreview,
  ColumnarGridDashboardLayout,
  ColumnarGridDashboardPreview,
  DataTableLayout,
  DataTablePreview,
  KanbanBoardLayout,
  KanbanBoardPreview,
  SplitScreenLayout,
  SplitScreenPreview,
  type AsymmetricalLayoutProps,
  type BentoGridLayoutProps,
  type BoardLane,
  type CardDashboardLayoutProps,
  type ColumnarGridDashboardLayoutProps,
  type DashboardStat,
  type DataTableLayoutProps,
  type KanbanBoardLayoutProps,
  type SplitScreenLayoutProps,
} from './layouts';

// Theme + theming contract (non-component API)
export { ThemeProvider, type ThemeProviderProps } from './theme/ThemeProvider';
export { useTheme } from './theme/useTheme';
export { applyTheme, themeStyle } from './theme/theme';
export {
  breakpoints,
  cssVar,
  durations,
  mediaQueryFrom,
  zIndex,
  type Breakpoint,
} from './theme/tokens';
export type {
  ResolvedTheme,
  ThemeContextValue,
  ThemeDefinition,
  ThemePreference,
} from './theme/types';
