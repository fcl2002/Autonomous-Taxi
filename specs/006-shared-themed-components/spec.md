# Feature Specification: Shared Themed Entry-Flow Components

**Feature Branch**: `vazy-ui`

**Created**: 2026-10-07

**Status**: Draft

**Input**: User description: "Replace duplicated hardcoded onboarding text and button presentation with reusable themed text and button components based on the example folder. Fonts are already configured."

## Clarifications

### Session 2026-10-07

- Q: Should these themed components preserve the current fixed-light Vazy design, or automatically switch with the device's light/dark setting? -> A: Preserve the current fixed-light Vazy design.
- Q: Should this refactor migrate only the three onboarding screens, or also replace matching text and button styles on the launch and login screens? -> A: Include onboarding, login, and launch screens.
- Q: Until login logic is implemented, how should the "Send Code" control behave after it is migrated to the shared button component? -> A: Display an enabled themed button whose activation performs no action.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consistent entry-flow presentation (Priority: P1)

As a passenger moving from launch through onboarding to login, I see consistent typography and primary actions across the complete entry flow while the existing content, artwork, accessibility, input behavior, and navigation remain unchanged.

**Why this priority**: The shared presentation must preserve the completed entry flow while making its visible design consistent and maintainable.

**Independent Test**: Start at launch, advance through all three onboarding pages to login, and confirm that every screen retains its intended layout and destination while matching text roles and primary actions share the same visual treatment.

**Acceptance Scenarios**:

1. **Given** the passenger is on the launch, onboarding, or login screen, **When** the screen is displayed, **Then** matching headings, body copy, brand text, links, and primary actions use the shared Vazy theme consistently.
2. **Given** the passenger advances through onboarding, **When** each primary action is activated, **Then** the existing next page opens with no navigation change.
3. **Given** assistive technology is enabled, **When** the passenger reads or activates a themed element, **Then** the existing semantic role, label, and readable content remain available.
4. **Given** a supported screen size, **When** an entry-flow screen is displayed, **Then** its existing responsive artwork, form, and layout remain visually intact.
5. **Given** login logic has not yet been implemented, **When** the passenger activates **Send Code**, **Then** the control remains enabled and the application performs no action, sends no data, and stays on the login screen.

### Edge Cases

- Long text must continue to wrap or shrink according to the screen's existing behavior without being clipped by the shared presentation.
- A caller-provided style must be able to adjust page-specific spacing or sizing without disabling the shared typography or button defaults.
- Decorative launch and onboarding images remain excluded from the accessibility tree.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The entry flow MUST provide one shared presentation for repeated text roles across launch, onboarding, and login.
- **FR-002**: The shared text presentation MUST cover the brand, heading, body, link, and action-label roles currently used across the entry-flow screens.
- **FR-003**: The entry flow MUST provide one shared presentation for its primary action buttons.
- **FR-004**: The launch, three onboarding, and login screens MUST use shared text and primary-action presentations where those roles occur instead of independently defining the same colors, fonts, and typography.
- **FR-005**: Shared presentations MUST use the already configured fixed-light Vazy colors and fonts without reacting to the device color scheme.
- **FR-006**: Shared presentations MUST accept page-specific styling and standard interaction or text properties needed by their callers.
- **FR-007**: The refactor MUST preserve all existing entry-flow copy, images, responsive layout, progress indicators, login input behavior, accessibility behavior, and navigation destinations.
- **FR-008**: The feature MUST NOT add application logic, permission handling, data collection, new navigation behavior, or new third-party dependencies.
- **FR-009**: The login **Send Code** control MUST use the shared primary-action presentation and remain enabled while performing no action until login logic is implemented later.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The launch, three onboarding, and login screens complete the existing launch-to-login flow with the same destinations and input behavior as before the refactor.
- **SC-002**: One shared definition controls each repeated entry-flow text role and primary action appearance across all five screens.
- **SC-003**: No entry-flow screen independently defines shared font families, shared text colors, primary action color, or primary action label typography after the refactor.
- **SC-004**: All touched application files pass the project's type and lint validation with no new errors.
- **SC-005**: A manual check on narrow and reference-size viewports finds no clipped text, broken artwork or form placement, or inaccessible primary actions on any entry-flow screen.
- **SC-006**: Activating **Send Code** causes no navigation, network request, authentication attempt, or other state change during this UI-only phase.

## Assumptions

- The configured Poppins and Medel font registrations and existing theme constants are the source of truth and do not need to be recreated.
- Runtime theme switching and dark-mode presentation are outside this feature's scope.
- The existing launch, onboarding, and login copy and navigation order are approved and remain unchanged.
- Only repeated text and primary-action presentation are shared in this feature; artwork composition, progress indicators, form controls, screen layout, and one-off spacing remain local to their screens.
- The example folder is a reference pattern, not production code to copy wholesale.
