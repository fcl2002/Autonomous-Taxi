# Feature Specification: Sign Up Screen

**Feature Branch**: `008-sign-up-screen`

**Created**: 2026-10-07

**Status**: Draft

**Input**: User description: "Build the Vazy sign-up page shown in Figma node `5:102` as the next page after login."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Open Sign Up from Login (Priority: P1)

As a new passenger on the login page, I can activate the sign-up link and reach the Vazy sign-up
page.

**Why this priority**: The new page must be part of the real entry flow rather than an isolated
screen.

**Independent Test**: Follow the launch and onboarding flow to login, activate **Sign Up**, and
confirm that exactly one sign-up page appears and one Back action returns to login.

**Acceptance Scenarios**:

1. **Given** the login page is visible, **When** the user activates **Sign Up**, **Then** the sign-up
   page appears.
2. **Given** assistive technology is enabled, **When** the user focuses **Sign Up** on login,
   **Then** it is announced as an actionable control with a clear destination.
3. **Given** the sign-up page was opened from login, **When** the user invokes the platform Back
   action, **Then** login reappears without duplicating either page.

---

### User Story 2 - Complete the Visible Sign-Up Form (Priority: P2)

As a new passenger, I can recognize Vazy's sign-up page and enter my full name, email address, and
phone number in clearly labelled fields.

**Why this priority**: The complete visible form establishes the approved account-creation UI
before validation and account services are connected.

**Independent Test**: Reach sign up through login, enter and edit text in all three fields, and
confirm that the form, primary action, and bottom prompt remain visible and usable with the
keyboard open.

**Acceptance Scenarios**:

1. **Given** the sign-up page is visible, **When** the user reviews it, **Then** it shows Vazy
   identity, a Sign Up heading, full-name, email, and phone fields, a primary Sign Up action, and an
   existing-account prompt in the hierarchy of Figma node `5:102`.
2. **Given** any field is focused, **When** the user enters or edits text, **Then** the entered value
   remains visible and the keyboard behavior is appropriate to that field.
3. **Given** the keyboard is open on a supported portrait phone, **When** the user reviews the
   screen, **Then** the focused field and primary action remain reachable without overlap.
4. **Given** a screen reader is enabled, **When** the user explores the page, **Then** meaningful
   content and all three fields are announced in visual order with clear labels.

---

### User Story 3 - Return to Login (Priority: P3)

As an existing passenger on the sign-up page, I can activate **Sign In** and return to login.

**Why this priority**: Users who entered the wrong account flow need an explicit route back without
submitting the form.

**Independent Test**: Open sign up from login, activate **Sign In**, and confirm that login replaces
the sign-up page without creating an extra login page in the history.

**Acceptance Scenarios**:

1. **Given** the sign-up page is visible, **When** the user activates **Sign In**, **Then** the login
   page replaces sign up.
2. **Given** assistive technology is enabled, **When** the user focuses **Sign In**, **Then** it is
   announced as an actionable control with a clear login destination.

### Edge Cases

- Empty, partial, unusually long, or invalid-looking field values may be entered during this
  UI-only phase; the page must not claim that an account was created.
- Opening and leaving the page repeatedly must not duplicate login or sign-up routes.
- Small and tall supported portrait displays may adjust spacing without changing content order.
- Increased text size and an open keyboard must not make the focused field or primary action
  unreachable.
- The complete page and navigation must work without network access.
- No Qwiker name or unapproved logo from the reference design may appear.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The login page's **Sign Up** text MUST become one accessible activation target that
  opens the sign-up page.
- **FR-002**: Repeated activation MUST NOT create duplicate sign-up pages.
- **FR-003**: Platform Back from sign up MUST return to login without duplicating either page.
- **FR-004**: The sign-up page MUST preserve the visible hierarchy of Figma node `5:102`: product
  identity, Sign Up heading, three rounded fields, wide rounded Sign Up action, and bottom
  existing-account prompt.
- **FR-005**: Product identity MUST use `Vazy` and MUST NOT display the reference template's Qwiker
  name or logo.
- **FR-006**: The page MUST provide exactly three clearly labelled editable fields in this order:
  full name, email address, and phone number.
- **FR-007**: The email and phone fields MUST use input behavior appropriate to their content, and
  all values MUST remain only in page memory.
- **FR-008**: The primary **Sign Up** action MUST remain enabled but perform no submission,
  validation, account creation, navigation, or success indication in this UI-only feature.
- **FR-009**: The **Sign In** link MUST replace the sign-up page with the existing login page.
- **FR-010**: Meaningful content and controls MUST remain readable and reachable without overlap or
  unintended cropping on supported small, reference, and large portrait phones on iOS and Android,
  including while the keyboard is visible.
- **FR-011**: The page MUST respect protected system areas and support increased text size without
  hiding the focused field or primary action.
- **FR-012**: Assistive technology MUST announce the heading, fields, primary action, and login
  prompt in visual order with clear labels and roles.
- **FR-013**: The page and both route transitions MUST work offline without sending or persisting
  personal data.
- **FR-014**: Existing dependencies, approved assets, and asset inclusion rules MUST remain
  unchanged.

### Key Entities

- **Sign-Up Draft**: Transient full-name, email, and phone text entered while the page is mounted;
  it is not validated, submitted, or persisted in this feature.

### Out of Scope

- Validating field values, displaying validation errors, or defining eligibility rules.
- Creating an account or connecting Firebase Authentication, Firestore, backend services, or SMS.
- Defining loading, success, failure, verification-code, or post-sign-up states.
- Persisting, logging, or transmitting sign-up values.
- Creating or approving a Vazy logo; the existing Vazy text identity is reused.
- Changing `.gitignore`, dependencies, or asset inclusion rules.
- Supporting tablet, desktop, or landscape layouts.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In 10 consecutive integrated entry-flow attempts, the login link opens exactly one
  sign-up page and one Back action returns to login every time.
- **SC-002**: The complete sign-up page becomes visible within 300 milliseconds of activating the
  login link on each supported test phone.
- **SC-003**: On iOS and Android, the reference phone plus at least one smaller and one larger
  supported portrait phone show all meaningful content without overlap or clipping before and
  during text entry.
- **SC-004**: In 10 consecutive attempts per field, users can focus, enter, and edit full-name,
  email, and phone text while keeping the primary action reachable.
- **SC-005**: The page and both route transitions work in 100% of offline test runs without sending
  or persisting data.
- **SC-006**: All five first-time reviewers identify the page as Vazy's sign-up form and identify
  all three fields, the primary action, and the return-to-login link without seeing legacy branding.

## Assumptions

- Figma node `5:102` is the visual reference for the sign-up page.
- The template's Qwiker logo is not approved for Vazy and is replaced by the existing Vazy text
  identity used on login.
- This branch remains UI-only; signup logic, validation, Firebase, and error states will be handled
  in later development.
- The primary action remains an enabled no-op so the screen reflects its intended visual state.
- Activating **Sign In** replaces sign up with login, preventing an unnecessary login-signup-login
  history loop.
- The initial experience targets phone-sized portrait displays on iOS and Android.
- The operating system owns the visible status bar and home indicator.
