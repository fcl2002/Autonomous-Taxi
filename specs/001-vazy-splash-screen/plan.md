# Implementation Plan: Vazy Splash Screen

**Branch**: `001-vazy-splash-screen` | **Date**: 2026-10-06 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-vazy-splash-screen/spec.md`

## Summary

Replace the starter index route with a responsive, non-interactive Vazy launch screen for iOS and
Android. Render the Vazy name as text and the approved Figma passenger-and-taxi illustration as one
bundled local image. Use React Native's built-in image and layout primitives plus the existing Expo
Router, status-bar, and safe-area packages. Configure the native launch screen as a matching light
background with no temporary logo so the handoff does not flash an unrelated template.

## Technical Context

**Language/Version**: TypeScript ~6.0.3, React 19.2.3, React Native 0.86.3

**Primary Dependencies**: Expo SDK ~57.0.24, Expo Router ~57.0.22, Expo Splash Screen ~57.0.9,
Expo Status Bar ~57.0.1, React Native Safe Area Context ~5.7.0, React Native Image

**Storage**: N/A; the screen has no user, ride, vehicle, or persisted state

**Testing**: TypeScript (`npx tsc --noEmit`), existing Expo lint command (`npm run lint`), and
manual visual/accessibility checks on iOS and Android phones

**Target Platform**: iOS and Android phones in portrait orientation using Expo managed/CNG workflow

**Project Type**: Mobile application

**Performance Goals**: Complete branded screen visible within one second in preview/production
builds; no runtime network request

**Constraints**: Offline-capable; local asset only; system safe areas preserved; no interaction,
navigation timing, Firebase, backend, or vehicle integration; no new dependency

**Scale/Scope**: One existing route, one illustration asset, one layout configuration change, and
one app configuration cleanup

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Gate | Result |
|-----------|------|--------|
| I. Safety Boundaries | No cloud or mobile path may control hardware | Pass: this screen has no commands, data, or integrations |
| II. Contracts | Any crossed boundary must have an explicit contract | Pass: only the local UI contract in `contracts/splash-screen.md` applies |
| III. UI First | Build the visible screen before Firebase or hardware logic | Pass: the feature is an isolated static screen |
| IV. Secure Data Access | Do not expose secrets or unnecessary personal data | Pass: the feature reads and stores no data |
| V. Simple and Testable | Reuse platform features and installed dependencies | Pass: no package or abstraction is added; lint, typecheck, and focused manual checks cover the static layout |
| Delivery gates | Validate accessibility, offline behavior, and touched code | Pass: the quickstart includes iOS/Android, offline, safe-area, and screen-reader checks |

**Post-design re-check**: Pass. The Phase 1 artifacts introduce no service boundary, persistent
model, package, custom navigation flow, or safety-sensitive behavior.

## Project Structure

### Documentation (this feature)

```text
specs/001-vazy-splash-screen/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── splash-screen.md
└── tasks.md                 # Created later by $speckit-tasks
```

### Source Code (repository root)

```text
app/
├── app.json                 # Vazy name, native launch background, and stale asset-reference cleanup
├── assets/
│   └── images/
│       └── vazy-taxi-passenger.png
└── src/
    └── app/
        ├── _layout.tsx      # Safe-area provider and hidden stack header
        └── index.tsx        # Responsive Vazy splash screen
```

**Structure Decision**: Keep the feature in the existing Expo Router index route. The layout is
small and unique, so a separate component, style module, state hook, or test hierarchy would add no
current value. Store the exported Figma illustration beside existing image assets.

## Complexity Tracking

No constitution violations or justified complexity exceptions.
