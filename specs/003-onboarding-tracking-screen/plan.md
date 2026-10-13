# Implementation Plan: Onboarding Tracking Screen

**Branch**: `003-onboarding-tracking-screen` | **Date**: 2026-10-06 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-onboarding-tracking-screen/spec.md`

## Summary

Connect the existing first onboarding screen to a new local-only tracking introduction that matches
Figma node `5:387`. Use Expo Router's existing stack with `router.navigate`, one accessible
`Pressable` on the first page, one flat route for the second page, one new local illustration, and
the existing progress assets. The second page's lower call-to-action remains static until its
destination is specified.

## Technical Context

**Language/Version**: TypeScript 6.0.3, React 19.2.3, React Native 0.86.3  
**Primary Dependencies**: Expo SDK 57, Expo Router 57, `expo-status-bar`, `react-native-safe-area-context`  
**Storage**: N/A; the step is transient and no onboarding state is persisted  
**Testing**: Expo lint, `tsc --noEmit`, Expo Doctor, Expo export, then the manual checks in `quickstart.md`  
**Target Platform**: iOS and Android portrait phones supported by Expo SDK 57  
**Project Type**: React Native mobile application  
**Performance Goals**: The complete second page is visible within 300 ms of activation  
**Constraints**: Offline-capable; respects safe areas and increased text size; accessible first CTA;
decorative art is silent; one Back action returns to the first page; no duplicate second page;
second CTA is visual-only; no Firebase, backend, MQTT, or hardware access  
**Scale/Scope**: Modify one route, add one route and one unique local asset, and reuse two existing
progress assets

## Constitution Check

*GATE: Passed before Phase 0 research and re-checked after Phase 1 design.*

| Principle or gate | Plan evidence | Result |
|---|---|---|
| I. Safety boundaries | This UI-only feature sends no command and touches no vehicle boundary. | Pass |
| II. Contracts | `contracts/ui-contract.md` defines the two local routes and transition behavior; no external contract changes. | Pass |
| III. UI-first slices | The screen uses local copy and bundled artwork; integration is explicitly out of scope. | Pass |
| IV. Secure/minimal data | No user, ride, credential, or remote-service data is read or stored. | Pass |
| V. Observable/testable/simple | Existing Expo Router, `Pressable`, safe-area, and image patterns are reused; no package or abstraction is added. | Pass |
| Touched-component checks | Lint, TypeScript, Expo Doctor, and export are required before handoff. | Pass |
| Deferred acceptance | Device, screen-reader, timing, offline installed-build, and reviewer matrices are deferred only until the onboarding-to-login flow exists; the exception is recorded in `quickstart.md`. | Pass with tracked exception |

The post-design re-check found no additional boundary, storage, dependency, or non-trivial custom
state logic. No constitution violation requires complexity justification.

## Project Structure

### Documentation (this feature)

```text
specs/003-onboarding-tracking-screen/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- ui-contract.md
`-- tasks.md                 # Generated later by speckit-tasks
```

### Source Code (repository root)

```text
app/
|-- assets/images/
|   |-- onboarding-progress-active.png   # reuse
|   |-- onboarding-progress-dot.png      # reuse
|   `-- onboarding-tracking.png          # add from Figma node 5:443
`-- src/app/
    |-- _layout.tsx                      # existing root Stack; unchanged
    |-- onboarding.tsx                   # make the existing CTA actionable
    `-- onboarding-tracking.tsx          # add the second onboarding page
```

**Structure Decision**: Keep Expo Router's existing flat file-based routes. Two screens do not
justify a carousel, shared screen abstraction, navigation store, or new component directory.

## Complexity Tracking

No constitution violations.
