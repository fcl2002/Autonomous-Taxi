# Implementation Plan: Onboarding Entry Screen

**Branch**: `002-onboarding-entry-screen` | **Date**: 2026-10-06 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/002-onboarding-entry-screen/spec.md`

## Summary

Turn the existing Vazy splash composition into one accessible full-screen activation target and
replace it with a new `/onboarding` route. Build the first onboarding page from responsive native
layout primitives and exact local exports of Figma nodes `5:206` and `5:384`; retain provisional
copy, a static first-step indicator, and a visual-only call-to-action. The flow has no remote data,
persistence, carousel state, or new runtime dependency.

## Technical Context

**Language/Version**: TypeScript 6.0.3, React 19.2.3, React Native 0.86.3

**Primary Dependencies**: Expo SDK 57, Expo Router 57, Expo StatusBar, React Native Safe Area
Context; existing dependencies only

**Storage**: N/A; the feature has no persisted state or remote data

**Testing**: Expo ESLint, TypeScript compiler, Expo Doctor, Expo multi-platform export, and manual
iOS/Android accessibility, responsiveness, rapid-tap, timing, and offline acceptance checks

**Target Platform**: iOS and Android phones in portrait orientation

**Project Type**: Expo/React Native mobile application

**Performance Goals**: The complete onboarding page is visible within 300 ms of splash activation
on each supported test phone

**Constraints**: Offline-capable; safe-area aware; exactly one accessible splash action; replacement
navigation must not stack under rapid taps; exact local Figma artwork; provisional copy; no active
onboarding CTA

**Scale/Scope**: Two routes, one route replacement, two new local decorative assets, and one static
onboarding page

## Constitution Check

*GATE: Passed before research and re-checked after design.*

- **I. Safety Boundaries**: Pass. This UI-only flow sends no vehicle, Firebase, backend, MQTT, or
  hardware command.
- **II. Contracts**: Pass. No system boundary is crossed. The user-facing route, interaction,
  accessibility, and offline behavior are captured in `contracts/ui-contract.md`.
- **III. UI First**: Pass. The feature is a complete local screen slice with its visible state and
  validation scenarios; no integration is introduced.
- **IV. Secure and Minimal Data Access**: Pass. The feature reads, writes, and retains no user or
  vehicle data and contains no credentials.
- **V. Observable, Testable, and Simple**: Pass. It reuses the existing router, safe-area provider,
  native components, and local asset pattern. No new abstraction, package, or speculative carousel
  state is introduced.
- **Quality gates**: The plan requires lint, type checking, Expo Doctor, export validation, and the
  manual acceptance matrix. No exception is required.

## Project Structure

### Documentation (this feature)

```text
specs/002-onboarding-entry-screen/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- ui-contract.md
|-- checklists/
|   `-- requirements.md
`-- tasks.md                 # Created later by $speckit-tasks
```

### Source Code (repository root)

```text
app/
|-- assets/images/
|   |-- vazy-taxi-passenger.png          # Existing splash artwork
|   |-- onboarding-taxi-passenger.png    # New export of Figma node 5:206
|   `-- onboarding-status-badge.png      # New export of Figma node 5:384
`-- src/app/
    |-- _layout.tsx                      # Existing headerless Stack and safe-area provider
    |-- index.tsx                        # Add one full-screen splash activation
    `-- onboarding.tsx                   # New first onboarding route
```

**Structure Decision**: Keep Expo Router's current file-based route layout. Modify the existing
index route and add one sibling route; keep one-use layout and styling inside those route files
instead of creating premature shared components.

## Post-Design Constitution Check

The Phase 1 artifacts retain the pre-research result: all constitution gates pass. The data model
contains only transient presentation states, the UI contract crosses no system boundary, and the
quickstart validates the required quality gates and offline behavior. No complexity exception is
needed.
