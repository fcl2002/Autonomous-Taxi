# Feature Specification: Onboarding Entry Screen

**Feature Branch**: `002-onboarding-entry-screen`

**Created**: 2026-10-06

**Status**: Draft

**Input**: User description: "Build the onboarding page shown in Figma node `5:147`. Tapping the
current Vazy splash screen must open this page. The displayed text is provisional and will be
changed later."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Enter Onboarding from the Splash Screen (Priority: P1)

As a passenger opening Vazy, I can tap the visible splash screen to continue to the first
onboarding page and understand that I have entered the introductory flow.

**Why this priority**: This transition is the requested interaction and makes the existing splash
screen lead somewhere useful.

**Independent Test**: Open the app on the Vazy splash screen, tap once anywhere on its visible
content, and confirm that the first onboarding page replaces it without requiring network access.

**Acceptance Scenarios**:

1. **Given** the Vazy splash screen is visible, **When** the user taps anywhere on the screen,
   **Then** the first onboarding page appears and the splash screen is no longer visible.
2. **Given** the Vazy splash screen is visible, **When** the user taps it several times quickly,
   **Then** only one onboarding page is opened.
3. **Given** assistive technology is active on the splash screen, **When** the user focuses its
   single continue action and activates it, **Then** the first onboarding page appears.
4. **Given** the device is offline, **When** the user taps the splash screen, **Then** the first
   onboarding page still appears with all required content.

---

### User Story 2 - Understand the First Onboarding Step (Priority: P2)

As a passenger viewing the first onboarding page, I see a clear introductory message, a taxi
illustration, progress feedback, and the reference call-to-action treatment.

**Why this priority**: The screen must communicate its role and match the approved visual direction
even though its wording is still provisional.

**Independent Test**: Open the first onboarding page directly and compare its visible structure
with Figma node `5:147` on supported phone sizes.

**Acceptance Scenarios**:

1. **Given** the first onboarding page is visible, **When** the user views the full screen, **Then**
   it shows non-empty heading and supporting copy, the supplied taxi-and-passenger illustration,
   a three-position progress indicator with the first position active, and a lower call-to-action
   labelled with provisional text.
2. **Given** the page is shown on a supported small or large portrait phone, **When** the layout is
   displayed, **Then** no meaningful content overlaps, clips, or enters a protected system area.
3. **Given** a screen reader is enabled, **When** the page is explored, **Then** the meaningful text
   is announced in reading order and decorative artwork and progress shapes are not announced.

### Edge Cases

- Very short or tall supported portrait displays may adjust spacing while preserving the reference
  content order and keeping all meaningful content visible.
- Increased text size may reflow provisional copy, but it must not hide the heading or cause content
  to overlap the illustration or system areas.
- Rapid or repeated taps on the splash screen must not create duplicate onboarding pages or stack
  multiple transitions.
- The screen and transition must remain available when network services are unavailable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The entire visible Vazy splash screen MUST provide one activation target that opens
  the first onboarding page.
- **FR-002**: The transition MUST replace the splash screen with one instance of the onboarding
  page, including when the splash screen receives repeated rapid taps.
- **FR-003**: Assistive technology MUST expose the splash activation target with a clear purpose
  and MUST allow it to be activated.
- **FR-004**: The first onboarding page MUST preserve the visual hierarchy of Figma node `5:147`:
  introductory text near the top, the supplied central taxi-and-passenger illustration, a
  three-position progress indicator below the illustration, and a rounded call-to-action treatment
  near the bottom.
- **FR-005**: The progress indicator MUST show the first of three positions as active.
- **FR-006**: The page MUST contain non-empty heading, supporting, and call-to-action copy. This copy
  is provisional and exact wording MUST NOT be treated as an acceptance requirement.
- **FR-007**: Meaningful content MUST remain visible without overlap or unintended cropping on
  supported small and large portrait phone displays on both iOS and Android.
- **FR-008**: The page MUST respect system status and home-indicator areas.
- **FR-009**: Assistive technology MUST announce meaningful text in visual reading order and MUST
  treat the illustration and progress shapes as decorative.
- **FR-010**: The transition and complete page MUST work without network access and MUST NOT require
  user, ride, vehicle, or remote-service data.
- **FR-011**: The prototype MUST use the illustration supplied by the referenced Figma design.
- **FR-012**: The lower call-to-action treatment MUST be present visually, but its activation and
  destination MUST remain outside this feature until the next onboarding step is specified.

### Out of Scope

- Finalizing or approving the onboarding heading, supporting copy, or call-to-action wording.
- Implementing the second and third onboarding pages or making the progress indicator interactive.
- Defining the action or destination of the lower call-to-action.
- Persisting whether a user has already completed or skipped onboarding.
- Adding onboarding animations or timed transitions.
- Connecting Firebase, the backend, MQTT, or vehicle hardware.
- Supporting tablet, desktop, or landscape layouts in this feature.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In 10 consecutive attempts, one tap on the splash screen opens exactly one first
  onboarding page every time.
- **SC-002**: The first onboarding page becomes fully visible within 300 milliseconds of a tap on
  each supported test phone.
- **SC-003**: On both iOS and Android, the reference phone size plus at least one smaller and one
  larger supported portrait phone show all meaningful content with no overlap or clipping.
- **SC-004**: The transition and full page render successfully in 100% of offline test runs.
- **SC-005**: All five first-time reviewers identify the page as the first step of a multi-step
  introduction without relying on the exact provisional wording.
- **SC-006**: With a screen reader enabled, the splash offers one clearly named continue action,
  meaningful onboarding text is announced in order, and decorative visuals are not announced.

## Assumptions

- Figma node `5:147` is the visual reference for the first onboarding page.
- The Figma heading, supporting text, and call-to-action label are temporary placeholders that may
  be replaced without changing this feature's scope.
- The Figma illustration will be reused for the prototype; its usage rights must be confirmed before
  any public release.
- The initial experience targets phone-sized portrait displays on iOS and Android.
- The operating system owns the visible status bar and home indicator.
- The call-to-action is a visual part of this screen only; its behavior will be defined with the next
  onboarding step.
