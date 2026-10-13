# Research: Shared Themed Entry-Flow Components

## Decision 1: Share only repeated text and button presentation

**Decision**: Introduce `ThemedText` and complete `ThemedButton`; use them across launch, onboarding, and login while leaving responsive layout, artwork composition, progress indicators, form controls, and page-specific spacing in each route.

**Rationale**: Brand, heading, body, link, and primary-action treatments recur across the five entry-flow screens. Image geometry, form controls, and layout differ by page, so abstracting them would create configuration without demonstrated reuse.

**Alternatives considered**:

- A full onboarding-page component: rejected because each page has materially different artwork and vertical proportions.
- A broad design-system package: rejected because the current app needs only two local primitives and already has the necessary dependencies.

## Decision 2: Reuse React Native props directly

**Decision**: Extend native text and pressable properties and merge caller styles after component defaults.

**Rationale**: Native props preserve accessibility and interaction behavior without inventing wrapper APIs. Applying caller styles last permits the page-specific width and spacing required by the current screens.

**Alternatives considered**:

- Custom prop mirrors for every native property: rejected as duplicate API surface.
- Fixed components with no style override: rejected because button width differs between onboarding pages.

## Decision 3: Keep the current theme synchronous and local

**Decision**: Read the already configured fixed-light font and color constants directly inside the shared styles. Do not add a theme provider or hook in this feature.

**Rationale**: The user explicitly chose a fixed-light appearance. A runtime color-scheme layer would contradict that decision and add unused behavior.

**Alternatives considered**:

- Copy the example theme hook and color-scheme files: deferred until dark mode or runtime theme switching is an actual requirement.
- Add a third-party styling library: rejected because React Native styles and the existing constants already solve the problem.

## Decision 4: Validate the real flow

**Decision**: Validate launch -> onboarding -> tracking -> location -> login, including the intentionally no-op **Send Code** control, plus lint and typecheck.

**Rationale**: The refactor affects shared UI within an existing navigation flow. Integrated validation catches prop, layout, accessibility, and routing regressions that isolated rendering would miss.

**Alternatives considered**:

- Snapshot tests for styling: rejected because no test runner is configured and snapshots would provide weak value for a small visual refactor.
