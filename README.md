# @agiler/ui — AGILER design system

**Write once, ship to many.** Every project generated from an AGILER order consumes this package
instead of letting the models invent colours, spacing and components. Design becomes a *deterministic*
input to delivery, so the agent team can spend its effort on the client's business problem.

> Extracted from AGILER's own design system (`agiler/src/components/*` + `styles/tokens.css`), which
> also consumes it. One codebase, two consumers, no drift.

---

## Why it exists

Without this, every generated app looks different and every model re-solves design from scratch.
With it, the Design agent **composes screens from a bounded vocabulary** and a deterministic
validator rejects anything outside it:

```
recipe (designSystem + screens)
   → manifest.json          (the vocabulary the model may use)
   → LLM screen spec        (JSON component tree — never CSS)
   → spec validator         (unknown component/prop/variant ⇒ rework/fail)
   → repo assembler         (JSX importing @agiler/ui + theme.json)
```

A `design-lint` gate in generated repos (Phase 15) additionally forbids raw hex / inline styles /
imports from anywhere but `@agiler/ui`.

## What's inside

| Area | Contents |
| --- | --- |
| Tokens | `src/styles/tokens.css` (raw scales) · `src/styles/themes.css` (`[data-theme]` semantic tokens) |
| Primitives | buttons · cards · feedback (badge/alert/toast/tooltip) · forms · modals · navigation · tables · loaders |
| Catalog | `catalog.json` (authored) → `manifest.json` (generated, machine-readable) |
| Theming | `theme.json` per order — **tokens only** overrides (primary colour, radius, font, logo) |

Status is tracked per component in `catalog.json` (`available` | `planned`). The Design agent may
only use `available` components.

## Consume it

Current shape (**v0.x, source-shipped**) — pick one while the registry build lands:

```jsonc
// a) exact git tag (private, deterministic, zero registry infra)
"@agiler/ui": "github:Ai-labs-tn/agiler-ui#v0.1.0"

// b) local workspace/link during development
"@agiler/ui": "file:../agiler-ui"
```

Then, in the app entry:

```tsx
import '@agiler/ui/tokens.css';
import '@agiler/ui/themes.css';
import { Button, Card, Badge } from '@agiler/ui';
```

`theme.json` per order overrides tokens only:

```jsonc
{ "data-theme": "light", "tokens": { "--color-primary": "#0f766e", "--radius-md": "0.25rem" } }
```

## Manifest

```bash
npm run manifest        # catalog.json → manifest.json (validates against src/index.ts exports)
npm run manifest:check  # CI gate: manifest is committed and in sync
```

`src/index.ts` and `manifest.json` are locked together: exporting a component without cataloguing it
(or cataloguing one you don't ship) fails the check.

## Versioning

- Semver the package; **orders pin an exact version** (recorded as `designSystemVersion` on the order).
- Breaking changes ship as a new **recipe** version, never by silently bumping.
- Minor/patch may be auto-adopted by a recipe; majors require a recipe change + review.

## Publish (Phase 12a.6)

```bash
npm install
npm run build          # tsup → dist/ (+ d.ts)
npm publish            # GitHub Packages (@agiler scope; see .npmrc.example)
git tag v0.1.0 && git push --tags
```

⚠️ **Private package + Render builds:** order repos deployed on Render must resolve this package, so
the generated `render.yaml` carries an `NPM_TOKEN` **build secret** (or the package is made public).
Decided in the v3.1 plan §3.1.

## Roadmap

- [x] Package skeleton, tokens + themes, manifest tooling, first primitives (Button/Card/Badge/Spinner)
- [ ] Extract the remaining primitives (forms, modals, navigation, tables, loaders, feedback) — 12a.3
- [ ] Theming contract hook (`theme.json` → CSS variables) — 12a.5
- [ ] Publish pipeline + first tagged release — 12a.6
- [ ] AGILER itself consumes `@agiler/ui` — 12a.7
- [ ] Screen-spec schema + validator in the AAOS backend — Phase 13.2
