# Feature Specification: Vazy Splash Screen

**Feature Branch**: `001-vazy-splash-screen`

**Created**: 2026-10-06

**Status**: Draft

**Input**: User description: "Develop the first screen from the referenced Figma splash design.
The product name is Vazy; the current template name and logo must not be used, and no final logo
exists yet."

## Clarifications

### Session 2026-10-06

- Q: Which phone platforms must the first Vazy splash-screen release support? → A: iOS and Android
  phones.
- Q: What should happen to the passenger-and-taxi illustration from the Figma template? → A: Reuse
  the Figma illustration for the prototype.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recognize the Vazy App at Launch (Priority: P1)

As a passenger opening the app, I see a polished Vazy launch screen that establishes the product
identity while the app prepares to continue.

**Why this priority**: This is the first visible app experience and the only user value requested
for this feature.

**Independent Test**: Launch the app on a supported phone and confirm that the complete splash
composition appears with Vazy branding, without relying on network access or another screen.

**Acceptance Scenarios**:

1. **Given** the app is launched from a closed state, **When** the splash screen appears, **Then**
   the user sees the name "Vazy" as the only product name.
2. **Given** the splash screen is visible, **When** the user views the full display, **Then** the
   layout has a light background, a centered brand area, and a passenger-and-taxi illustration
   anchored along the bottom.
3. **Given** the device has no network connection, **When** the app launches, **Then** the complete
   splash screen still appears without an error or missing visual element.
4. **Given** the splash screen is displayed on supported small and large iOS and Android phones,
   **When** the layout is compared, **Then** the name remains legible and the illustration does not
   overlap the brand area or required system display areas.

### Edge Cases

- On unusually tall or short supported portrait displays, spacing may adjust while the brand area
  remains centered and the lower illustration remains anchored to the bottom.
- System status and home-indicator areas must not obscure the brand name or meaningful parts of the
  illustration.
- Increased text size must not clip, wrap, or hide the Vazy name.
- The screen must render fully when the device is offline or a remote service is unavailable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The app MUST present this splash screen when launched from a closed state.
- **FR-002**: The splash screen MUST display "Vazy" as its only product name.
- **FR-003**: The splash screen MUST NOT display the Qwiker name, Qwiker symbol, or any temporary
  replacement logo.
- **FR-004**: Until a final logo is approved, the Vazy identity MUST be represented by readable
  text rather than a custom logo asset.
- **FR-005**: The screen MUST retain the reference design's visual hierarchy: a light background,
  centered brand area, and lower passenger-and-taxi illustration.
- **FR-006**: The meaningful content MUST remain visible without overlap or unintended cropping on
  supported small and large portrait phone displays on both iOS and Android.
- **FR-007**: The screen MUST respect system status and home-indicator areas.
- **FR-008**: The screen MUST contain no interactive control or action that appears available to
  the user.
- **FR-009**: Assistive technology MUST announce the product name once and MUST treat the lower
  illustration as decorative.
- **FR-010**: The splash screen MUST render without network access and MUST NOT require user, ride,
  or vehicle data.
- **FR-011**: The prototype MUST use the passenger-and-taxi illustration supplied by the referenced
  Figma design.

### Out of Scope

- Designing or approving a Vazy logo or wider brand system.
- Defining how long the splash screen remains visible.
- Navigating to, specifying, or implementing the screen shown after the splash screen.
- Connecting Firebase, the backend, MQTT, or vehicle hardware.
- Supporting tablet, desktop, or landscape layouts in this feature.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In every acceptance test, "Vazy" is visible and no Qwiker name, Qwiker symbol, or
  temporary logo appears.
- **SC-002**: The complete splash composition renders without network access in 100% of test runs.
- **SC-003**: On both iOS and Android, the reference phone size plus at least one smaller and one
  larger supported portrait phone show the brand name and meaningful illustration with no overlap.
- **SC-004**: The first complete visual frame appears within one second of launch on each supported
  test device.
- **SC-005**: All five first-time reviewers identify the screen as the Vazy app launch screen and
  report no apparent interactive control.
- **SC-006**: With a screen reader enabled, the product name is announced once and no decorative
  illustration details are announced.

## Assumptions

- The Figma node `5:647` is the visual reference for composition, not a source of final branding.
- The passenger-and-taxi illustration supplied by the Figma design will be reused for the prototype;
  its usage rights must be confirmed before any public release.
- The initial app experience targets phone-sized portrait displays on iOS and Android.
- The operating system owns the visible status bar and home indicator.
- Splash duration and the destination screen will be specified in a later feature.
