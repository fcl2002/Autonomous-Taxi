# Research: Ride Map Screen

## Decision 1: Build a static composition, not a map integration

**Decision**: Render the Figma map and marker artwork as an offline visual fixture in one route.

**Rationale**: The branch is focused on screens, and the design needs no panning, live data, route
calculation, or permission behavior yet. A real map provider would add credentials, native setup,
privacy concerns, and behavior outside the requested scope.

**Alternatives considered**:

- Add a map SDK: rejected until live mapping and provider requirements are specified.
- Approximate the map with generic shapes: rejected because exact Figma artwork is available.

## Decision 2: Bundle every visible design asset locally

**Decision**: Download the visible map, five taxi, passenger-location, menu, pickup, and destination
assets from Figma into `app/assets/maps/` during implementation and reference only those local files.

**Rationale**: Figma asset URLs expire. Local assets preserve the approved visual and allow the page
to render offline.

**Alternatives considered**:

- Use Figma URLs at runtime: rejected because they expire and violate offline behavior.
- Use the design screenshot as one flattened asset: rejected because the screenshot is a visual
  target, not an implementation asset, and would prevent responsive sheet text.

## Decision 3: Reuse the installed image renderer

**Decision**: Use the existing `expo-image` package for local PNG and SVG artwork and native
`View`/`ThemedText` elements for the bottom sheet.

**Rationale**: Expo SDK 57's installed image component supports local resources, SVG, content-fit,
and content-position behavior. No dependency is needed.

**Alternatives considered**:

- Add `react-native-svg`: rejected unless a downloaded asset proves incompatible with the installed
  renderer during implementation.
- Convert every SVG to PNG: rejected because it adds unnecessary asset processing and loses vector
  scaling.

## Decision 4: Connect signup without pretending authentication succeeded

**Decision**: Give the existing signup button a handler that navigates to `/map`, while retaining
the Ponytail limitation comment that no validation, account, Firebase, or success state occurs.

**Rationale**: This connects the prototype flow while keeping its functional limitation explicit.

**Alternatives considered**:

- Leave the map unreachable: rejected because each screen in this branch is tested through the
  integrated flow.
- Implement signup logic: rejected because it is a separate future development phase.

## Decision 5: Keep screen testing user-owned

**Decision**: The implementation agent runs TypeScript and lint; the user validates visual fidelity,
accessibility, and the integrated flow.

**Rationale**: The user explicitly owns screen testing, and no screenshot-test infrastructure is
needed for this UI-only slice.

**Alternatives considered**:

- Add automated visual testing: rejected as out of scope and unnecessary infrastructure.
