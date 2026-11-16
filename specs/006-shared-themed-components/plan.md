# Implementation Plan: Shared Themed Entry-Flow Components

**Branch**: `vazy-ui` | **Date**: 2026-10-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/006-shared-themed-components/spec.md`

## Summary

Replace repeated entry-flow typography and primary-button styling with two small reusable React Native components. Complete the existing `themed-button.tsx`, add `themed-text.tsx`, centralize only shared visual tokens in `theme.ts`, and migrate launch, the three onboarding routes, and login without changing their copy, images, form behavior, layout, accessibility, or navigation.

## Technical Context

**Language/Version**: TypeScript 6.0.3, React 19.2.3, React Native 0.86.3

**Primary Dependencies**: Expo SDK 57, Expo Router 57, React Native core components, react-native-safe-area-context

**Storage**: N/A

**Testing**: `npx tsc --noEmit`, `npx expo lint`, and manual integrated entry-flow validation

**Target Platform**: Expo-supported Android, iOS, and web targets

**Project Type**: Mobile application

**Performance Goals**: Preserve responsive rendering and interaction behavior; add no asynchronous work or new runtime dependency

**Constraints**: Fixed-light UI-only refactor; existing fonts are already registered; preserve current dirty user changes; retain accessibility and Expo Router destinations; keep **Send Code** enabled but intentionally no-op; no permission, authentication, or Firebase logic

**Scale/Scope**: Two shared components, one theme constants file, and five entry-flow routes

## Constitution Check

*GATE: Passed before Phase 0 and passed again after Phase 1 design.*

- **I. Safety Boundaries**: Pass. This is presentation-only and does not touch vehicle control.
- **II. Contracts Define Every Boundary**: Pass. No external boundary changes; the local component contract is documented in `contracts/themed-components.md`.
- **III. UI First**: Pass. The work refactors completed visible screens and validates the integrated launch-to-login flow.
- **IV. Secure and Minimal Data Access**: Pass. No data access, credentials, location collection, or Firebase logic is added.
- **V. Observable, Testable, and Simple**: Pass. Existing repository patterns and dependencies are reused; two components cover demonstrated duplication, with lint, typecheck, and one integrated manual flow check.
- **Quality gate**: TypeScript and lint must pass for touched files before completion.

## Project Structure

### Documentation (this feature)

```text
specs/006-shared-themed-components/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- themed-components.md
`-- tasks.md
```

### Source Code (repository root)

```text
app/
|-- src/
|   |-- app/
|   |   |-- index.tsx
|   |   |-- onboarding.tsx
|   |   |-- onboarding-tracking.tsx
|   |   |-- onboarding-location.tsx
|   |   `-- login.tsx
|   |-- components/
|   |   |-- themed-button.tsx
|   |   `-- themed-text.tsx
|   `-- constants/
|       `-- theme.ts
`-- assets/
    `-- images/
        `-- onboarding-tracking.png
```

**Structure Decision**: Keep Expo Router screens in `app/src/app/` and reusable non-route UI in the existing `app/src/components/` directory. Artwork and form controls remain unchanged. No new hook or dependency is required for the clarified fixed-light presentation; runtime color-scheme support can be added only when requested.

## Complexity Tracking

No constitution violations or justified complexity exceptions.
