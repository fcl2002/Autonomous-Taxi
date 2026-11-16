# Feature Specification: Phone Login Entry Screen

**Feature Branch**: `005-phone-login-entry`

**Created**: 2026-10-07

**Status**: Draft

**Input**: User description: "Move from the completed onboarding flow to the login page shown in Figma node `5:63`."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Continue from Onboarding to Login (Priority: P1)

As a passenger on the final onboarding page, I can activate its location call-to-action and reach
the phone login page as the next step in the same flow.

**Why this priority**: The login screen is useful only when users can reach it through the
application's real launch and onboarding journey.

**Independent Test**: Start at the launch page, complete the three onboarding pages, activate the
final call-to-action, and confirm that exactly one phone login page appears.

**Acceptance Scenarios**:

1. **Given** the final onboarding page is visible, **When** the user activates its lower
   call-to-action, **Then** the phone login page appears.
2. **Given** assistive technology is active, **When** the user focuses the final onboarding
   call-to-action, **Then** it is announced as an actionable control and can open login.
3. **Given** the login page was reached from final onboarding, **When** the user invokes the
   platform Back action, **Then** the final onboarding page reappears without duplicating a page.

---

### User Story 2 - Enter a Phone Number (Priority: P2)

As a passenger on the login page, I can recognize Vazy's login step and enter my phone number in a
clearly labelled field.

**Why this priority**: A readable, usable phone-number entry screen establishes the visible login
experience before authentication services are connected.

**Independent Test**: Reach the login page through onboarding, compare its hierarchy with Figma
node `5:63`, focus the phone field, enter and edit a phone number, and dismiss the keyboard without
losing access to the primary action.

**Acceptance Scenarios**:

1. **Given** the login page is visible, **When** the user views it, **Then** it shows Vazy identity,
   a Login heading, phone-login guidance, one phone-number field, one Send Code treatment, and a
   sign-up prompt in the same hierarchy as the reference.
2. **Given** the phone field is focused, **When** the user enters or edits digits, **Then** a
   phone-appropriate keyboard is shown and the entered value remains visible.
3. **Given** the keyboard is open on a supported portrait phone, **When** the user reviews the
   screen, **Then** the focused field and Send Code treatment remain visible without overlapping
   protected system areas.
4. **Given** a screen reader is enabled, **When** the user explores the page, **Then** the heading,
   guidance, phone field, Send Code text, and sign-up prompt are announced in visual order with a
   clear label on the field.

### Edge Cases

- Rapid repeated activation of the final onboarding call-to-action must not create duplicate login
  pages.
- Empty, partial, unusually long, or non-local phone input may be entered at this UI-first stage;
  the screen must not claim that a code was sent.
- Increased text size may reflow content while keeping the field and primary action reachable.
- Small and tall supported portrait displays may adjust spacing without changing content order.
- The screen must remain complete without network access because authentication is not connected.
- No unapproved legacy product name or logo may appear when adapting the reference design.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The final onboarding page's lower call-to-action MUST become one activation target
  that opens the phone login page.
- **FR-002**: Repeated activation MUST NOT create duplicate login pages.
- **FR-003**: Platform Back from login MUST return to the final onboarding page without duplicating
  either page.
- **FR-004**: The login page MUST preserve the visible hierarchy of Figma node `5:63`: product
  identity, Login heading, phone-login guidance, rounded phone field, wide rounded Send Code
  treatment, and sign-up prompt.
- **FR-005**: The product identity MUST use the name `Vazy` and MUST NOT display the reference
  template's `Qwiker` name or its unapproved logo.
- **FR-006**: The login page MUST provide exactly one clearly labelled phone-number input that
  accepts and displays user-entered text with phone-appropriate input behavior.
- **FR-007**: The Send Code treatment MUST remain visual-only and MUST NOT expose a false button
  action, send a code, authenticate a user, navigate, or claim success in this UI-first feature.
- **FR-008**: The sign-up prompt MUST be visible and understandable but MUST remain non-navigating
  until its destination screen is specified.
- **FR-009**: Meaningful content and controls MUST remain readable and reachable without overlap or
  unintended cropping on supported small and large portrait phones on iOS and Android, including
  while the keyboard is visible.
- **FR-010**: The page MUST respect status-bar and home-indicator areas and support increased text
  size without hiding the input or primary action.
- **FR-011**: Assistive technology MUST announce meaningful content in visual order and expose the
  field with a clear label while keeping the visual-only Send Code text readable in order.
- **FR-012**: The transition and complete page MUST work offline and MUST NOT require or persist
  phone, user, ride, vehicle, location, consent, or remote-service data beyond the field's current
  in-memory value.
- **FR-013**: Existing dependency files and project asset inclusion or exclusion rules MUST remain
  unchanged.

### Key Entities

- **Phone Login Draft**: The transient phone-number text currently entered by the user; it exists
  only while the login page is mounted and is not submitted or persisted in this feature.

### Out of Scope

- Sending an SMS or one-time code, validating a real phone number, authenticating a user, or
  connecting Firebase Authentication.
- Building the verification-code, sign-up, account-recovery, or post-login screens.
- Requesting location permission or persisting LGPD consent from the preceding onboarding page.
- Persisting onboarding completion or login input.
- Creating or approving a new Vazy logo; the product name is sufficient for this increment.
- Connecting Firebase, backend services, MQTT, or vehicle hardware.
- Supporting tablet, desktop, or landscape layouts.
- Changing `.gitignore` or other asset inclusion/exclusion configuration.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In 10 consecutive launch-to-login runs, the final onboarding action opens exactly
  one login page every time and one Back action returns to final onboarding.
- **SC-002**: The complete login page becomes visible within 300 milliseconds of activating the
  final onboarding action on each supported test phone.
- **SC-003**: On both iOS and Android, the reference phone size plus at least one smaller and one
  larger supported portrait phone show all meaningful content with no overlap or clipping before
  and during phone input.
- **SC-004**: In 10 consecutive attempts, users can focus the phone field, enter and edit text,
  while keeping the Send Code treatment visible.
- **SC-005**: The transition and complete login page render successfully in 100% of offline test
  runs without sending or persisting data.
- **SC-006**: All five first-time reviewers identify the screen as Vazy's phone login entry and
  identify the field, primary action, and sign-up prompt without seeing legacy branding.

## Assumptions

- Figma node `5:63` is the visual reference for the first login page.
- This increment is intentionally UI-first; authentication behavior will be specified after the
  remaining login flow screens are defined.
- The final onboarding action now advances to login without requesting location permission or
  recording consent; those behaviors remain separate future work.
- The Figma copy may be replaced later without changing this feature's layout and interaction
  scope.
- No approved Vazy logo exists, so the existing Vazy text identity is reused and the template's
  Qwiker mark is not shipped.
- The initial experience targets phone-sized portrait displays on iOS and Android.
- The operating system owns the visible status bar and home indicator.
