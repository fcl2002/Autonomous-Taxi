# Feature Specification: Onboarding Tracking Screen

**Feature Branch**: `003-onboarding-tracking-screen`

**Created**: 2026-10-06

**Status**: Draft

**Input**: User description: "Build the next onboarding screen shown in Figma node `5:387`."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Continue to the Second Onboarding Step (Priority: P1)

As a passenger viewing the first onboarding page, I can activate its lower call-to-action and
continue to the second onboarding page.

**Why this priority**: The new page is useful only when it is connected to the onboarding sequence
that users have already entered.

**Independent Test**: Open the first onboarding page, activate its lower call-to-action, and confirm
that the second onboarding page appears without requiring network access.

**Acceptance Scenarios**:

1. **Given** the first onboarding page is visible, **When** the user activates its lower
   call-to-action, **Then** the second onboarding page appears.
2. **Given** assistive technology is active, **When** the user focuses the first page's
   call-to-action, **Then** it is announced as an actionable control with a clear continuation
   purpose and can open the second page.
3. **Given** the device is offline, **When** the user continues from the first onboarding page,
   **Then** the complete second page still appears.
4. **Given** the user is on the second onboarding page, **When** the user invokes the platform Back
   action, **Then** the first onboarding page reappears without duplicating either page.

---

### User Story 2 - Understand the Tracking Introduction (Priority: P2)

As a passenger viewing the second onboarding page, I see an introductory tracking message, its
supporting illustration, and progress feedback showing that I am on the second step.

**Why this priority**: The screen must communicate its place in the onboarding sequence and match
the approved visual direction even though its wording remains provisional.

**Independent Test**: Open the second onboarding page directly and compare its visible structure
with Figma node `5:387` on supported phone sizes.

**Acceptance Scenarios**:

1. **Given** the second onboarding page is visible, **When** the user views the full screen, **Then**
   it shows non-empty heading and supporting copy, the supplied tracking illustration, a
   three-position progress indicator with the middle position active, and a lower call-to-action
   treatment with provisional text.
2. **Given** the page is shown on a supported small or large portrait phone, **When** the layout is
   displayed, **Then** no meaningful content overlaps, clips, or enters a protected system area.
3. **Given** a screen reader is enabled, **When** the page is explored, **Then** meaningful text is
   announced in reading order while the illustration and progress shapes are not announced.

### Edge Cases

- Repeated activation of the first page's call-to-action must not create duplicate copies of the
  second page.
- Very short or tall supported portrait displays may adjust spacing while preserving content order
  and keeping all meaningful content visible.
- Increased text size may reflow provisional copy, but it must not hide the heading or overlap the
  illustration, progress indicator, call-to-action treatment, or system areas.
- The transition and complete second page must remain available when network services are
  unavailable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The first onboarding page's lower call-to-action MUST become one activation target
  that opens the second onboarding page.
- **FR-002**: Assistive technology MUST expose that activation target with a clear continuation
  purpose and MUST allow it to be activated.
- **FR-003**: Repeated activation MUST NOT create duplicate copies of the second onboarding page.
- **FR-004**: The platform Back action from the second page MUST return to the first onboarding page
  without duplicating either page.
- **FR-005**: The second page MUST preserve the visual hierarchy of Figma node `5:387`:
  introductory text near the top, the supplied central tracking illustration, a three-position
  progress indicator below the illustration, and a rounded call-to-action treatment near the
  bottom.
- **FR-006**: The progress indicator MUST show the middle of three positions as active.
- **FR-007**: The page MUST contain non-empty heading, supporting, and call-to-action copy. Exact
  wording is provisional and MUST NOT be treated as an acceptance requirement.
- **FR-008**: Meaningful content MUST remain visible without overlap or unintended cropping on
  supported small and large portrait phone displays on both iOS and Android.
- **FR-009**: The page MUST respect system status and home-indicator areas.
- **FR-010**: Assistive technology MUST announce meaningful text in visual reading order and MUST
  treat the tracking illustration and progress shapes as decorative.
- **FR-011**: The transition and complete page MUST work without network access and MUST NOT require
  user, ride, vehicle, or remote-service data.
- **FR-012**: The prototype MUST use the tracking illustration supplied by the referenced Figma
  design.
- **FR-013**: The second page's lower call-to-action treatment MUST remain visual-only until its
  destination is specified in a later feature.

### Out of Scope

- Finalizing or approving the onboarding heading, supporting copy, or call-to-action wording.
- Implementing the third onboarding page, login page, or any later onboarding destination.
- Making the progress indicator interactive or adding swipe navigation.
- Persisting the current onboarding step or completion status.
- Adding onboarding animations or timed transitions.
- Connecting Firebase, the backend, MQTT, or vehicle hardware.
- Supporting tablet, desktop, or landscape layouts in this feature.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In 10 consecutive attempts, activating the first page's call-to-action opens exactly
  one second onboarding page every time.
- **SC-002**: The second onboarding page becomes fully visible within 300 milliseconds of activation
  on each supported test phone.
- **SC-003**: On both iOS and Android, the reference phone size plus at least one smaller and one
  larger supported portrait phone show all meaningful content with no overlap or clipping.
- **SC-004**: The transition and complete second page render successfully in 100% of offline test
  runs.
- **SC-005**: All five first-time reviewers identify the page as the second step of a multi-step
  introduction without relying on the exact provisional wording.
- **SC-006**: With a screen reader enabled, the first page exposes one clearly named continuation
  action; the second page's meaningful text is announced in order; and decorative visuals are not
  announced.

## Assumptions

- Figma node `5:387` is the visual reference for the second onboarding page.
- The lower call-to-action on the first onboarding page is the intended way to reach this page.
- The Figma heading, supporting text, and call-to-action label remain temporary placeholders that
  may be replaced without changing this feature's scope.
- The supplied tracking illustration will be reused for the prototype; its usage rights must be
  confirmed before any public release.
- The initial experience targets phone-sized portrait displays on iOS and Android.
- The operating system owns the visible status bar and home indicator.
- The second page's call-to-action has no destination in this feature.
- Full physical-device and first-time-reviewer acceptance testing may be recorded when the complete
  onboarding-to-login flow exists; each implementation increment still requires its available
  static quality checks.
