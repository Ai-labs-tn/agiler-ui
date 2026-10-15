# Changelog

All notable changes to `@agiler/ui` are documented here.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] — 2026-10-15

### Added

- **Auth templates** (6) — the standard sign-in surfaces, presentational and controlled so both
  AGILER and every generated order project can reuse them (the app owns the HTTP):
  - `AuthScreen` — **the standard auth screen**: passwordless (one-time code) and password sign-in
    in one screen as tabs, plus the reset flow; the piece an order's `sign-in` screen composes.
  - `AuthShell` — centered card shell (single `<h1>`, brand/footer slots, no app chrome).
  - `AuthTabs` — accessible `role=tablist` method switcher with arrow-key navigation.
  - `OtpSignIn` — email → one-time code, with resend and dev-echo support.
  - `PasswordSignIn` — email + password, with an optional “Forgot password?” action.
  - `PasswordReset` — email → reset code + new password + confirmation.
- **`auth-centered` layout archetype** — a standalone centered card (shell `auth-shell`, regions
  main · footer) for sign-in and reset screens; not feature-gated, so any app with accounts can ship
  it alongside its primary layout.

## [0.2.2] — 2026-10-15

### Added

- **Native pass-through attributes** are now declared in the catalog for the form components, so
  screen specs (and therefore the Design agent) may use them: `Input` (type, placeholder,
  autoComplete, inputMode, maxLength, name, id, disabled, readOnly), `TextArea` (placeholder, rows,
  resize, name, id, disabled, readOnly), `Select`/`DatePicker` (name, id, disabled, min/max),
  `Checkbox`/`Toggle` (name, id, disabled).
  The spec validator only accepts catalogued props, so anything not declared here is rejected — this
  closes the gap that made `type="email"` / `placeholder="…"` impossible to compose.

## [0.2.1] — 2026-10-15

### Changed

- Portfolio layouts (`bento-grid`, `asymmetrical`) now require only the `gallery` feature — it is the
  region their structure depends on. `landing`/`about`/`contact` remain **optional** regions with
  defaults, so the layouts map cleanly onto both portfolio audiences (and any recipe that has a
  gallery).

## [0.2.0] — 2026-10-15

### Added

- **Composition primitives** (11): `AppShell`, `PublicShell`, `TopNavShell`, `Grid`, `Stack`,
  `Panel`, `Section`, `PageHeader`, `StatCard`, `Toolbar`, `EmptyState` — the building blocks layout
  archetypes are assembled from.
- **Layout archetypes** (7) — the page skeletons an order picks: each is a React component with a
  declarative `layout.json` contract (shell, regions, required components, required features,
  breakpoints, a11y invariants) plus an inline-SVG preview for the order form:
  - portfolio → `bento-grid`, `asymmetrical`
  - crm → `split-screen`, `kanban-board`
  - erp → `data-table`, `columnar-grid-dashboard`
  - healthcare → `card-dashboard`
- `manifest.json` now carries a validated **`layouts`** section: required components must exist in the
  catalog, every layout must declare a required region, and each layout must export its component and
  preview (drift-checked in CI).

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
