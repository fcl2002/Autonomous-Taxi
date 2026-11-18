# Feature Specification: Signed-Out Onboarding

**Feature Branch**: `010-signed-out-onboarding`

**Created**: 2026-11-18

**Status**: Draft

**Input**: User description: "Show the Get started onboarding (Request a ride, Track your ride in real time, Allow location) only to signed-out users: on first launch after install and after the user logs out. A user who is already signed in skips onboarding and login and opens directly on the map, staying signed in across app restarts."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Returning passenger opens straight on the map (Priority: P1)

As a passenger who has already logged in or signed up, I open Vazy and land directly on the ride map. I don't see the splash prompt, the three onboarding pages or the login page again, even after I close the app or restart the phone.

**Why this priority**: Repeating onboarding and login on every launch is the main friction today. Every later ride flow assumes a signed-in passenger reaches the map quickly.

**Independent Test**: Sign up or log in once, fully close the app, reopen it, and confirm that the map is the first interactive page and that no onboarding or login page appears.

**Acceptance Scenarios**:

1. **Given** the passenger logged in successfully, **When** they fully close and reopen the app, **Then** the map is the first interactive page shown.
2. **Given** the passenger signed up successfully, **When** they fully close and reopen the app, **Then** the map is the first interactive page shown.
3. **Given** the passenger is signed in and on the map, **When** they use the platform Back action, **Then** they do not return to the login, sign-up or onboarding pages.
4. **Given** the passenger is signed in, **When** the app is still working out whether a session exists, **Then** neither onboarding nor login flashes on screen before the map appears.

---

### User Story 2 - New or signed-out visitor sees onboarding (Priority: P1)

As someone who has just installed Vazy, or who has logged out, I see the existing entry flow:
1. the splash page;
2. "Request a ride";
3. "Track your ride in real time";
4. "Allow location";
5. login.

**Why this priority**: Onboarding introduces the service and leads to login, so a visitor without a session must always reach it.

**Independent Test**: Install the app fresh (or clear its data), open it, and confirm that the full entry flow appears in order, ending on login.

**Acceptance Scenarios**:

1. **Given** a fresh install, **When** the user opens the app, **Then** the splash page appears, followed by the three onboarding pages and then login, as today.
2. **Given** a signed-out user, **When** they try to reach the map without logging in, **Then** they are taken to the entry flow instead of the map.
3. **Given** a signed-in user who logs out, **When** the logout completes, **Then** they are taken to the login page. The onboarding pages show again on the next app launch while signed out.

---

### Edge Cases

- **No connection at launch while signed in:** the passenger still opens on the map, because the saved session is used without contacting the account service. Online actions fail later with their own errors.
- **Session no longer valid** (account deleted or disabled in the console): the next time the app checks the session, the user is treated as signed out and sent to the entry flow.
- **App closed during onboarding before login:** no session exists, so the next launch shows the entry flow again from the start.
- **Session found while the user is on onboarding or login** (for example, sign-up completes): the user moves to the map, and the entry pages are no longer reachable with Back.
- **App data cleared or app reinstalled:** treated as a fresh install, so the entry flow is shown.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: On launch, the app MUST decide which page to show from one rule: a valid saved session means the map, and no valid session means the entry flow.
- **FR-002**: A passenger's session MUST survive the app being closed, sent to the background, or the device restarting, until the passenger logs out or the session becomes invalid.
- **FR-003**: While a signed-in passenger has a session, the splash, the three onboarding pages, login and sign-up MUST NOT be reachable, including through Back navigation.
- **FR-004**: While no session exists, the map MUST NOT be reachable. Any attempt to open it MUST lead to the entry flow.
- **FR-005**: Until the session check finishes, the app MUST keep showing the launch screen and MUST NOT briefly display onboarding, login or the map.
- **FR-006**: When a session starts (login or sign-up succeeds), the app MUST show the map. When a session ends (logout or invalidation), it MUST show the login page.
- **FR-007**: The entry flow's content and order MUST stay as they are today: splash, "Request a ride", "Track your ride in real time", "Allow location", then login.

### Key Entities

- **Passenger session**: whether the person using the app is signed in. Its only attributes are signed in or signed out, and it is kept on the device between launches. It belongs to the account service and needs no profile data.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In 10 consecutive relaunches by a signed-in passenger, 10 of 10 open on the map with no onboarding or login page shown.
- **SC-002**: A signed-in passenger reaches an interactive map within 3 seconds of tapping the app icon on the reference emulator, excluding the map's own tile loading.
- **SC-003**: In 5 fresh installs, 5 of 5 show the complete entry flow in the defined order.
- **SC-004**: Zero cases where a signed-out user can view the map, or a signed-in user can navigate back into onboarding or login.

## Assumptions

- **Logout** is delivered by the next feature (sign-out). Until then, acceptance scenario 3 of User Story 2 is verified by clearing app data, or by signing out from a temporary debug action.
- **"Only once"** means once per signed-out period, not once per install. A user who logs out lands on login (owner decision, 2026-11-18); the onboarding pages show again on the next launch while still signed out.
- **No onboarding-completed flag** is stored separately. Whether the passenger is signed in is the only thing that decides what is shown.
- **The "Allow location" page** stays a visual step as today. Requesting the real location permission is out of scope.
- **Sign-up partial-failure recovery** and other auth error handling are tracked separately. They are not part of this feature.
- **Web** is out of scope; Android is the target platform.
