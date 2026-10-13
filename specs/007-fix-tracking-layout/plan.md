# Implementation Plan: Fix Tracking Layout

**Branch**: `007-fix-tracking-layout` | **Date**: 2026-10-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/007-fix-tracking-layout/spec.md`

## Summary

Correct the second onboarding page's responsive vertical layout so its tracking illustration is
horizontally centered, sits slightly higher, and remains fully contained above the progress
indicator. Make the smallest change in the existing route styles, preserving all content,
accessibility, and navigation behavior.

## Technical Context

**Language/Version**: TypeScript 6.0.3, React 19.2.3, React Native 0.86.3

**Primary Dependencies**: Expo SDK 57, Expo Router 57, React Native core components, react-native-safe-area-context

**Storage**: N/A

**Testing**: `npx tsc --noEmit`, `npx expo lint`, and user-run integrated screen validation

**Target Platform**: Expo-supported Android and iOS portrait phones

**Project Type**: Mobile application

**Performance Goals**: Preserve immediate local rendering with no new runtime work or dependency

**Constraints**: UI-only correction; preserve artwork, copy, progress state, accessibility, button behavior, and route destinations; no screenshots or preview automation by the implementation agent

**Scale/Scope**: One existing route, `app/src/app/onboarding-tracking.tsx`

## Constitution Check

*GATE: Passed before Phase 0 and passed again after Phase 1 design.*

- **I. Safety Boundaries**: Pass. This presentation-only change cannot command or affect vehicle systems.
- **II. Contracts Define Every Boundary**: Pass. No external boundary changes; the screen layout contract is documented in `contracts/tracking-layout.md`.
- **III. UI First**: Pass. The correction improves an existing fixture-backed onboarding screen without adding app logic.
- **IV. Secure and Minimal Data Access**: Pass. No data access, permissions, credentials, or remote services are involved.
- **V. Observable, Testable, and Simple**: Pass. The fix reuses the existing route and native layout system without a new abstraction or dependency; lint and typecheck provide static gates and the user validates the screen.
- **Quality gate**: TypeScript and lint must pass after the route is changed.

## Project Structure

### Documentation (this feature)

```text
specs/007-fix-tracking-layout/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- tracking-layout.md
`-- tasks.md
```

### Source Code (repository root)

```text
app/
|-- src/
|   `-- app/
|       `-- onboarding-tracking.tsx
`-- assets/
    |-- images/
    |   `-- onboarding-tracking.png
    `-- icons/
        |-- onboarding-progress-active.png
        `-- onboarding-progress-dot.png
```

**Structure Decision**: Modify only the existing tracking onboarding route. Keep the illustration
and progress indicator as page-specific content; no shared component, hook, asset, or dependency is
needed for a single-screen spacing correction.

## Complexity Tracking

No constitution violations or justified complexity exceptions.
