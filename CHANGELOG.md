# Changelog

All notable changes to `@agiler/ui` are documented here.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] — 2026-10-15

### Added

- **Design tokens + themes**: `src/styles/tokens.css` (raw scales) and `src/styles/themes.css`
  (`[data-theme]` semantic tokens for light/dark/system), extracted from AGILER.
- **31 components** (catalogued in `catalog.json` and stamped into `manifest.json`):
  - buttons: `Button`, `IconButton`
  - cards: `Card`
  - feedback: `Alert`, `Badge`, `Toast`, `ToastViewport`, `Tooltip`
  - forms: `Input`, `TextArea`, `Select`, `Checkbox`, `Toggle`, `Radio`, `RadioGroup`,
    `MultiSelect`, `DatePicker`, `FileUpload`, `FieldLabel`, `FieldMessage`
  - loaders: `Loader`, `Skeleton`, `Spinner`
  - modals: `Modal`, `Drawer`
  - navigation: `Sidebar`, `TopBar`, `Breadcrumbs`, `ThemeToggle`
  - tables: `DataTable` (sorting, search, paging, export, empty state), `Pagination`
- **Theming contract**: `ThemeProvider`, `useTheme`, `applyTheme`, `themeStyle` and the
  `ThemeDefinition` (`theme.json`) shape — structure is fixed, per-order branding is tokens only.
- **Router-agnostic navigation**: `Sidebar`/`Breadcrumbs` take a `linkComponent` + `activePath`
  instead of depending on `react-router-dom`.
- **Manifest tooling** (`scripts/generate-manifest.mjs`, `scripts/check-manifest.mjs`): turns
  `catalog.json` into the machine-readable vocabulary the Design agent composes screens from, and
  fails CI if the catalog, the public exports and `manifest.json` drift.
