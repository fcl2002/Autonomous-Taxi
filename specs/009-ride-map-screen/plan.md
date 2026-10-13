# Implementation Plan: Ride Map Screen

**Branch**: `009-ride-map-screen` | **Date**: 2026-10-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/009-ride-map-screen/spec.md`

## Summary

Add a static `/map` route matching Figma node `5:1446`, composed from locally bundled Figma map,
taxi, location, menu, and sheet-icon assets plus native layout and text. Connect the existing signup
button to the route without creating an account. Keep menu, destination search, location, maps,
vehicle positions, and ride behavior intentionally inert and offline.

## Technical Context

**Language/Version**: TypeScript 6.0.3, React 19.2.3, React Native 0.86.3

**Primary Dependencies**: Expo SDK 57, Expo Router 57, `expo-image` 57, `expo-status-bar`, `react-native-safe-area-context`

**Storage**: N/A; all displayed map information is a bundled fixture

**Testing**: `npx tsc --noEmit`, `npx expo lint`, and user-run integrated entry-flow validation

**Target Platform**: Expo-supported Android and iOS portrait phones

**Project Type**: Mobile application

**Performance Goals**: Bundled preview is fully visible within 300 milliseconds with no network dependency

**Constraints**: UI-only; use exact locally bundled Figma artwork; fixed map/address fixture; no account creation, map SDK, location permission, GPS, Firebase, backend request, vehicle data, new package, `.gitignore` change, or implementation-agent screenshot testing

**Scale/Scope**: One new route, one existing signup action, and the visible static assets from Figma node `5:1446`

## Constitution Check

*GATE: Passed before Phase 0 and passed again after Phase 1 design.*

- **I. Safety Boundaries**: Pass. The static preview sends no ride or vehicle command.
- **II. Contracts Define Every Boundary**: Pass. No external boundary is introduced; `contracts/ui-contract.md` defines only local navigation and fixture presentation.
- **III. UI First**: Pass. The full visible map state is built from fixtures before maps, location, or ride logic.
- **IV. Secure and Minimal Data Access**: Pass. No real identity, location, or vehicle data is collected, sent, or persisted.
- **V. Observable, Testable, and Simple**: Pass. Existing Router and `expo-image` support are reused; no map library or speculative abstraction is added.
- **Quality gate**: TypeScript and lint must pass for both touched routes before handoff.

## Project Structure

### Documentation (this feature)

```text
specs/009-ride-map-screen/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- ui-contract.md
`-- tasks.md
```

### Source Code (repository root)

```text
app/
|-- assets/
|   `-- maps/
|       |-- map-background.png
|       |-- map-overlay.svg
|       |-- taxi-1.svg ... taxi-5.svg
|       |-- passenger-marker.svg
|       |-- passenger-dot.svg
|       |-- menu.svg
|       |-- pickup.svg
|       `-- destination.svg
`-- src/app/
    |-- signup.tsx
    `-- map.tsx
```

**Structure Decision**: Keep the map as one flat Expo Router screen. Render the exact Figma assets
with the already-installed `expo-image`, which supports local image resources and SVG, and use
native views/text for the responsive sheet. Keep percentage-based artwork positioning local to the
screen because the composition is unique and has no demonstrated reuse.

## Complexity Tracking

No constitution violations or justified complexity exceptions.
