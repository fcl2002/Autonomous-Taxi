# Feature Specification: Passenger Profile

**Feature Branch**: `011-passenger-profile`

**Created**: 2026-11-18

**Status**: Draft

**Input**: User description: "Passenger profile in Firestore: when a passenger signs up, create their profile record (full name and email) so the name is stored in one place and later edits just update it. Sign-up must not be blocked or lost by a dropped connection right after the account is created: the profile write retries on its own while the app is open, and if the profile is still missing later, the app recreates it (asking for the name once). Each passenger can read and change only their own profile. Firestore database lives in Paris (europe-west9). The name is no longer stored on the Auth account."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sign-up creates the passenger profile (Priority: P1)

As a new passenger, I enter my full name, email and password once. Vazy creates my account and a profile holding my full name and email, and I land on the map.

**Why this priority**: Every later feature that shows or uses the passenger's name (ride requests, ride history, support) reads it from this one profile. Without it, the name typed at sign-up is lost.

**Independent Test**: Sign up a new account, then confirm in the cloud data console that exactly one profile exists for that account, with the typed name and the sign-up email.

**Acceptance Scenarios**:

1. **Given** a visitor on the sign-up page with a working connection, **When** they submit a valid name, email and password, **Then** an account and a profile with that full name and email both exist, and the map is shown.
2. **Given** the name has spaces around it, **When** the passenger signs up, **Then** the profile stores the name without the surrounding spaces.
3. **Given** a profile already exists, **When** it is written again (for example after a retry), **Then** there is still exactly one profile for the account, holding the latest name.

---

### User Story 2 - A dropped connection does not lose the profile (Priority: P1)

As a new passenger whose connection drops right after my account is created, I still land on the map. My profile is saved when the connection comes back. If it never was, the app asks me for my name once and saves it.

**Why this priority**: Account creation and profile creation are two separate steps. A failure between them must not leave a passenger permanently without a name, and must not block them from using the app.

**Independent Test**: Sign up with the connection cut right after the account is created. Restore the connection with the app still open and confirm the profile appears. Repeat, but close the app before restoring the connection; reopen it and confirm the app asks for the name once and then saves the profile.

**Acceptance Scenarios**:

1. **Given** the account was created but the connection drops before the profile is saved, **When** the passenger keeps the app open and the connection returns, **Then** the profile is saved without any action from the passenger.
2. **Given** the profile was never saved (app closed while offline), **When** the signed-in passenger next opens the app with a connection, **Then** they are asked for their full name once, and after they submit it the profile is saved and the map is shown.
3. **Given** the passenger already has a profile, **When** they open the app, **Then** they are never asked for their name.
4. **Given** the name prompt is shown, **When** the passenger submits an empty name, **Then** the prompt explains that the name is required and saves nothing.

---

### User Story 3 - Profiles are private (Priority: P1)

As a passenger, only I can read or change my profile. Other passengers, and visitors who are not signed in, cannot see or change it.

**Why this priority**: The profile holds personal data (name and email). Least-privilege access is a non-negotiable project rule.

**Independent Test**: In the access-rules test environment, try every read and write on a profile as its owner, as another passenger and as a signed-out visitor, and confirm that only the owner's allowed actions succeed.

**Acceptance Scenarios**:

1. **Given** a signed-in passenger, **When** they read or update their own profile, **Then** it succeeds.
2. **Given** a signed-in passenger, **When** they try to read, create, update or delete another passenger's profile, **Then** it is refused.
3. **Given** a signed-out visitor, **When** they try any read or write on any profile, **Then** it is refused.
4. **Given** a signed-in passenger, **When** they try to save a profile whose email differs from their account email, that contains fields other than full name and email, or whose name is empty or too long, **Then** it is refused.
5. **Given** a signed-in passenger, **When** they try to list all profiles, **Then** it is refused.

---

### Edge Cases

- **Account created before this feature** (test accounts with no profile): handled like User Story 2, scenario 2. The passenger is asked for their name once on the next launch.
- **No connection when the name prompt is submitted:** the name is kept on the device and the map is shown, exactly like sign-up. The profile is saved once the connection returns while the app is open; if the app is killed first, the prompt appears again on the next online launch.
- **Profile save refused by the access rules** (should not happen for a valid passenger, since the app enforces the same rules): the save is undone and the passenger is returned to the name prompt to retry. No message is shown (accepted, 2026-11-18). The account is not deleted.
- **App opened offline by a signed-in passenger whose profile state is unknown:** the map is shown. The profile check waits for a connection instead of blocking the app.
- **Sign-up fails before the account is created** (email in use, weak password, no connection): no profile is written, and the existing sign-up error messages are shown.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Successful sign-up MUST create a profile for the new account, holding the passenger's full name (trimmed) and their account email.
- **FR-002**: There MUST be at most one profile per account. Saving the profile again MUST update it, never create a second one.
- **FR-003**: Sign-up MUST NOT wait for the profile to be saved before showing the map. While the app stays open, an unsaved profile MUST keep being retried until it is saved.
- **FR-004**: When a signed-in passenger opens the app with a connection and has no profile, the app MUST ask for their full name once, save the profile, and then continue to the map.
- **FR-005**: The full name MUST be required and 1 to 100 characters long after trimming. The app and the access rules MUST both enforce this.
- **FR-006**: The profile's email MUST equal the email of the signed-in account that owns it.
- **FR-007**: A passenger MUST be able to read and update only their own profile. Nobody MAY list profiles, read or write another passenger's profile, or delete a profile from the app.
- **FR-008**: The profile MUST contain only the fields this feature defines: full name and email. Any other field MUST be refused.
- **FR-009**: The full name MUST be stored only in the profile. The account record MUST NOT keep its own copy of the name.
- **FR-010**: The access rules MUST have automated checks covering every allowed and denied case in User Story 3.

### Key Entities

- **Passenger profile**: one per passenger account, identified by the account's id.
  - Attributes: full name (required, 1–100 characters) and email (equal to the account email).
  - Created at sign-up or through the name prompt; updated later by profile edits.
- **Passenger account** (existing): the email-and-password login. It owns zero or one profile.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In 10 sign-ups with a working connection, all 10 accounts have a profile with the typed name within 5 seconds of the map appearing.
- **SC-002**: In 3 sign-ups where the connection drops right after the account is created and returns while the app is open, all 3 profiles are saved with no action from the passenger.
- **SC-003**: Every signed-in passenger without a profile is asked for their name at most once per missing profile. Passengers who have a profile are never asked.
- **SC-004**: 100% of the allowed and denied access cases in User Story 3 pass in the automated access-rules checks.
- **SC-005**: Sign-up takes no more than 1 second longer to reach the map than before this feature.

## Assumptions

- **Data location:** profile data is stored in a single data centre in Paris, France (owner decision, 2026-11-18). This choice can't be changed later.
- **The owner creates the cloud database** in the console, on the free plan. Server-side code that runs automatically when an account is created needs a paid plan and is out of scope. So sign-up stays two steps, with the recovery described above.
- **Editing the profile** (a profile screen) is a later feature. This feature only creates the profile and recovers a missing one. FR-002 guarantees that later edits update the same profile.
- **Changing the email** is out of scope. If it's added later, the profile email must change with it.
- **Phone number** is no longer collected, so the profile has no phone field. The backend README is updated to match.
- **Existing test accounts** have their name on the account record. After this feature that copy is ignored, and they go through the name prompt once.
- **Account deletion** and removing the matching profile are out of scope.
- **Web** is out of scope; Android is the target platform.
