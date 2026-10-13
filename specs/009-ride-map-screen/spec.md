# Feature Specification: Ride Map Screen

**Feature Branch**: `009-ride-map-screen`

**Created**: 2026-10-07

**Status**: Draft

**Input**: User description: "Build the next page shown in Figma node `5:1446`, a map with nearby taxis and a destination sheet."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Continue from Sign Up to the Map (Priority: P1)

As a passenger completing the UI-only sign-up form, I can activate the primary action and reach the
ride map preview.

**Why this priority**: The map page must extend the real entry flow rather than exist as an
isolated route.

**Independent Test**: Follow the complete launch-to-signup flow, activate **Sign Up**, and confirm
that exactly one map page appears without creating an account or requiring network access.

**Acceptance Scenarios**:

1. **Given** the sign-up page is visible, **When** the user activates its primary action, **Then**
   the ride map page appears.
2. **Given** the signup fields contain text, **When** the primary action opens the map, **Then** no
   account, request, validation result, or persisted signup data is created.
3. **Given** the map was opened from sign up, **When** the user invokes platform Back, **Then** sign
   up reappears without duplicating either page.

---

### User Story 2 - Understand the Static Ride Area (Priority: P2)

As a passenger on the map page, I can see my represented position, nearby taxi markers, and the map
area in which a ride would be requested.

**Why this priority**: The page's primary purpose is to establish the visible ride-request context
before real maps and live location are connected.

**Independent Test**: Reach the map through the integrated flow and compare the map, location
marker, nearby taxis, and menu control with Figma node `5:1446` on supported portrait sizes.

**Acceptance Scenarios**:

1. **Given** the map page is visible, **When** the user reviews the upper area, **Then** it shows a
   map backdrop, five nearby taxi markers, one highlighted passenger location, and one menu control
   in the reference hierarchy.
2. **Given** the device is offline or location access is unavailable, **When** the page opens,
   **Then** the complete static preview remains visible and does not claim to show live positions.
3. **Given** a screen reader is enabled, **When** the page is explored, **Then** decorative map and
   vehicle artwork is excluded from the reading order while the map area has a concise descriptive
   label.

---

### User Story 3 - View Pickup and Destination Prompt (Priority: P3)

As a passenger on the map page, I can recognize the bottom ride-request sheet, its example pickup
location, and the destination-search prompt.

**Why this priority**: The sheet establishes the next ride-booking interaction without prematurely
adding search or map logic.

**Independent Test**: Reach the map through the integrated flow and confirm the bottom sheet shows
its heading, pickup row, divider, and destination row in the expected order without accepting an
interaction.

**Acceptance Scenarios**:

1. **Given** the map page is visible, **When** the user reviews the bottom area, **Then** a white
   rounded sheet overlays the map with a destination question, example pickup address, divider,
   and Search Destination prompt.
2. **Given** the user activates the menu control or destination prompt, **When** this UI-only page
   is in use, **Then** no drawer, search, route calculation, location request, or network action
   occurs.
3. **Given** a supported small or large portrait phone, **When** the page is displayed, **Then** the
   sheet remains readable and does not cover the represented passenger location.

### Edge Cases

- Repeated primary-action activation must not create duplicate map pages.
- The page must remain complete without maps, location, Firebase, or network services.
- Small and tall portrait screens may scale and reposition decorative imagery while preserving the
  map-to-sheet hierarchy.
- Increased text size may reflow sheet labels without clipping or hiding a complete row.
- Decorative taxi markers near screen edges must not create horizontal scrolling.
- No design-time asset may be fetched from an expiring URL at runtime.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The sign-up page's primary action MUST become one accessible activation target that
  opens the ride map page.
- **FR-002**: Opening the map MUST NOT validate signup values, create an account, send data, request
  location, or imply that signup succeeded.
- **FR-003**: Repeated activation MUST NOT create duplicate map pages, and platform Back MUST return
  to sign up without duplicating either page.
- **FR-004**: The page MUST preserve the visible hierarchy of Figma node `5:1446`: full-screen map,
  menu control, nearby taxis, highlighted passenger position, and bottom destination sheet.
- **FR-005**: The static map area MUST show exactly five nearby taxi markers and one highlighted
  passenger position.
- **FR-006**: The bottom sheet MUST show a destination question, one example pickup-address row,
  one divider, and one Search Destination row.
- **FR-007**: The sheet MUST overlay the lower map area with rounded upper corners while leaving the
  represented passenger position visible.
- **FR-008**: The menu control and Search Destination row MUST remain visual-only and MUST NOT open
  another view or start a side effect in this feature.
- **FR-009**: Meaningful content MUST remain readable without overlap, unintended cropping, or
  horizontal scrolling on supported small, reference, and large portrait phones on iOS and Android.
- **FR-010**: The page MUST respect protected system areas and support increased text size without
  hiding a complete sheet row.
- **FR-011**: Assistive technology MUST receive a concise map description and the sheet text in
  visual order while decorative map, taxi, and marker artwork remains excluded.
- **FR-012**: The transition and complete map preview MUST work offline without maps, location,
  permission, Firebase, backend, MQTT, or vehicle data.
- **FR-013**: All visible design artwork MUST be bundled with the application and MUST NOT depend on
  expiring design-time URLs at runtime.
- **FR-014**: Existing dependencies and asset inclusion rules MUST remain unchanged.

### Key Entities

- **Static Map Preview**: A fixed visual composition containing the reference map, five taxi
  markers, one represented passenger position, and one example pickup address; it contains no live
  location or vehicle data.

### Out of Scope

- Creating or authenticating an account when leaving sign up.
- Integrating a map provider, geocoding, GPS, foreground or background location permission.
- Tracking real taxis or passengers, refreshing positions, or using Firebase/backend data.
- Opening the menu, accepting destination input, searching addresses, calculating routes, pricing,
  or requesting a ride.
- Adding loading, search-result, permission-denied, or network-error states before related logic is
  specified.
- Adding packages or changing `.gitignore` and asset inclusion rules.
- Supporting tablet, desktop, or landscape layouts.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In 10 consecutive integrated entry-flow attempts, the signup action opens exactly one
  ride map page and one Back action returns to sign up every time.
- **SC-002**: The complete static map preview becomes visible within 300 milliseconds of activation
  on each supported test phone.
- **SC-003**: On iOS and Android, the reference phone plus at least one smaller and one larger
  supported portrait phone show the complete sheet and required map landmarks without overlap or
  horizontal scrolling.
- **SC-004**: In 100% of offline test runs, the page shows five taxi markers, one passenger
  position, and the complete destination sheet without requesting external data or permission.
- **SC-005**: With a screen reader enabled, decorative visuals are skipped and all meaningful map
  and sheet information is announced in the intended order.
- **SC-006**: All five first-time reviewers identify the screen as a ride map with nearby taxis,
  current pickup context, and destination prompt without being told that the data is static.

## Assumptions

- Figma node `5:1446` is the visual reference for this first ride map page.
- The current signup action advances to the map only to connect the UI flow; it does not represent
  successful registration.
- The map, taxi positions, passenger position, and address are fixed presentation fixtures.
- The visible menu and destination prompt will become interactive only in later specified features.
- The operating system owns the visible status bar.
- The initial experience targets phone-sized portrait displays on iOS and Android.
