# Feature Specification: Onboarding Location Consent Screen

**Feature Branch**: `004-onboarding-location-consent`

**Created**: 2026-10-07

**Status**: Draft

**Input**: User description: "Develop the final onboarding screen shown in Figma node `5:2`."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reach the Final Onboarding Step (Priority: P1)

As a passenger viewing the tracking introduction, I can activate its lower call-to-action and move
to the final onboarding page.

**Why this priority**: The third page completes the three-page onboarding sequence and must be
reachable through the same bottom-button interaction as the preceding step.

**Independent Test**: Open the tracking introduction, activate its lower call-to-action, and confirm
that exactly one final location-consent page appears without network access.

**Acceptance Scenarios**:

1. **Given** the tracking introduction is visible, **When** the user activates its lower
   call-to-action, **Then** the final location-consent page appears.
2. **Given** assistive technology is active, **When** the user focuses the tracking page's
   call-to-action, **Then** it is announced as an actionable control with a clear continuation
   purpose and can open the final page.
3. **Given** the user activates the tracking page's call-to-action repeatedly, **When** navigation
   settles, **Then** only one final page is present.
4. **Given** the final page is visible, **When** the user invokes the platform Back action, **Then**
   the tracking introduction reappears without duplicating either page.

---

### User Story 2 - Understand the Location and Privacy Introduction (Priority: P2)

As a passenger viewing the final onboarding page, I see a clear privacy reassurance and a location
permission invitation before the app later asks for or uses location data.

**Why this priority**: Location is sensitive personal data. The user must understand the purpose of
the final step before any permission or consent logic is connected.

**Independent Test**: Follow the onboarding flow through the tracking introduction, activate its
lower call-to-action, and compare the final page's visible hierarchy with Figma node `5:2` on
supported portrait phone sizes.

**Acceptance Scenarios**:

1. **Given** the final page is visible, **When** the user views the screen, **Then** it shows the
   supplied location/privacy illustration, non-empty privacy reassurance, and a rounded lower
   call-to-action treatment with non-empty location-related text.
2. **Given** the page is displayed on a supported small or large portrait phone, **When** the full
   layout is rendered, **Then** meaningful content remains visible without overlap, unintended
   cropping, or entry into protected system areas.
3. **Given** a screen reader is enabled, **When** the page is explored, **Then** the privacy message
   and lower call-to-action text are announced in visual order while the illustration is not
   announced.
4. **Given** the device has no network connection, **When** the final page opens, **Then** its
   complete visual content remains available.

### Edge Cases

- Rapid repeated activation of the tracking page's call-to-action must not create duplicate final
  pages.
- Very short or tall supported portrait displays may adjust spacing while preserving the design's
  content order.
- Increased text size may reflow the privacy and call-to-action copy without hiding or overlapping
  meaningful content.
- The final call-to-action must not falsely report that location permission or LGPD consent has
  been granted while permission logic remains outside this feature.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The tracking introduction's lower call-to-action MUST become one activation target
  that opens the final onboarding page.
- **FR-002**: Assistive technology MUST expose that activation target with a clear continuation
  purpose and MUST allow it to be activated.
- **FR-003**: Repeated activation MUST NOT create duplicate copies of the final page.
- **FR-004**: After the final page is reached from the tracking introduction, the platform Back
  action MUST return to the tracking introduction without duplicating either page.
- **FR-005**: The final page MUST preserve the visual hierarchy of Figma node `5:2`: the supplied
  location/privacy illustration in the upper portion, privacy reassurance below it, and a wide
  rounded call-to-action treatment near the bottom.
- **FR-006**: The final page MUST contain non-empty privacy reassurance and location-related
  call-to-action copy. Exact wording is provisional and MUST NOT be treated as an acceptance
  requirement.
- **FR-007**: Meaningful content MUST remain visible without overlap or unintended cropping on
  supported small and large portrait phone displays on both iOS and Android.
- **FR-008**: The page MUST respect system status and home-indicator areas.
- **FR-009**: Assistive technology MUST announce meaningful text in visual order and MUST treat the
  supplied illustration as decorative.
- **FR-010**: The transition and complete page MUST work without network access and MUST NOT require
  user, ride, vehicle, location, or remote-service data.
- **FR-011**: The prototype MUST use the location/privacy illustration supplied by the referenced
  Figma design.
- **FR-012**: The final page's lower call-to-action treatment MUST remain visual-only until a later
  feature defines the operating-system permission request, consent result states, and next
  destination.
- **FR-013**: Existing project asset inclusion and exclusion rules MUST remain unchanged while the
  supplied illustration is added.

### Out of Scope

- Requesting foreground, background, precise, or approximate device-location permission.
- Recording, persisting, withdrawing, or transmitting LGPD consent.
- Reading, tracking, storing, or sharing the user's location.
- Implementing login or any post-onboarding destination.
- Final legal approval of the privacy reassurance or permission wording.
- Connecting Firebase, the backend, MQTT, or vehicle hardware.
- Adding swipe navigation, onboarding animations, or persisted onboarding completion.
- Changing which project assets are included or excluded by repository configuration.
- Supporting tablet, desktop, or landscape layouts in this feature.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In 10 consecutive attempts, activating the tracking page's call-to-action opens
  exactly one final page every time.
- **SC-002**: The complete final page becomes visible within 300 milliseconds of activation on each
  supported test phone.
- **SC-003**: On both iOS and Android, the reference phone size plus at least one smaller and one
  larger supported portrait phone show all meaningful content with no overlap or clipping.
- **SC-004**: The transition and complete final page render successfully in 100% of offline test
  runs.
- **SC-005**: All five first-time reviewers identify the screen as the final onboarding step and
  understand that it introduces location use without believing permission has already been granted.
- **SC-006**: With a screen reader enabled, the tracking page exposes one clearly named continuation
  action; the final page's meaningful text is announced in order; and its illustration is not
  announced.

## Assumptions

- Figma node `5:2` is the visual reference for the final onboarding page.
- The lower call-to-action on the tracking introduction is the intended way to reach this page.
- The supplied location/privacy illustration will be reused for the prototype; its usage rights
  must be confirmed before public release.
- The Figma privacy and call-to-action copy may be replaced later without changing this feature's
  scope.
- This increment completes the visible three-page onboarding sequence but does not complete the
  location-permission, LGPD-consent, or login flows.
- The initial experience targets phone-sized portrait displays on iOS and Android.
- The operating system owns the visible status bar and home indicator.
- Full physical-device and first-time-reviewer acceptance testing may be recorded when the complete
  onboarding-to-login flow exists; each implementation increment still requires its available
  static quality checks.
