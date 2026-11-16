---

description: "Implementation tasks for the Vazy phone-login entry screen"

---

# Tasks: Phone Login Entry Screen

**Input**: Design documents from `specs/005-phone-login-entry/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui-contract.md`, `quickstart.md`

**Tests**: No new automated framework is required. Run the existing static gates and the complete integrated launch-to-login checks in `quickstart.md`.

**Organization**: Tasks are grouped by user story so the route transition and login presentation remain traceable, while final acceptance exercises them together.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches a different file and has no incomplete dependency
- **[Story]**: Maps the task to a user story from `spec.md`

## Phase 1: Setup and Foundation

**Purpose**: Reuse the current Expo Router stack and native components without adding infrastructure.

No setup implementation is required. Do not add a package, asset, shared form abstraction,
authentication service, route group, navigation store, `.gitignore` change, or asset-rule change.

---

## Phase 2: User Story 1 - Continue from Onboarding to Login (Priority: P1)

**Goal**: Connect the real final onboarding action to exactly one login route and preserve one-step Back behavior.

**Independent Test**: Start on the launch page, traverse all three onboarding pages, activate the final CTA 10 consecutive times, and confirm exactly one `/login` page appears each time and one Back action returns to `/onboarding-location`.

### Implementation for User Story 1

- [X] T001 [P] [US1] Add the safe-area-aware, keyboard-avoiding `/login` route shell with Vazy identity and no Qwiker asset or text in `app/src/app/login.tsx`
- [X] T002 [P] [US1] Convert the complete lower treatment into one accessible `Pressable` that calls `router.navigate("/login")` in `app/src/app/onboarding-location.tsx`
- [ ] T003 [US1] Run the 10-cycle launch-to-login and one-step Back checks from `specs/005-phone-login-entry/quickstart.md` against `app/src/app/index.tsx`, `app/src/app/onboarding.tsx`, `app/src/app/onboarding-tracking.tsx`, `app/src/app/onboarding-location.tsx`, and `app/src/app/login.tsx`

**Checkpoint**: User Story 1 is complete when the existing full flow reaches one login route offline and Back restores final onboarding.

---

## Phase 3: User Story 2 - Enter a Phone Number (Priority: P2)

**Goal**: Match Figma node `5:63` with a responsive Vazy-branded phone-input presentation and no authentication side effect.

**Independent Test**: Reach `/login` through the complete flow, enter and edit phone text with the keyboard visible, and confirm the design hierarchy remains readable while Send Code and Sign Up perform no action.

### Implementation for User Story 2

- [X] T004 [US2] Build the node `5:63` hierarchy in `app/src/app/login.tsx` using Vazy text identity, Login heading, guidance, one controlled phone `TextInput`, visual-only Send Code treatment, and static sign-up prompt
- [X] T005 [US2] Add phone input metadata, accessible reading order, responsive portrait spacing, keyboard avoidance, safe-area handling, and increased-text support in `app/src/app/login.tsx`
- [ ] T006 [US2] Validate phone entry, keyboard visibility, static Send Code and Sign Up behavior, Vazy-only branding, VoiceOver/TalkBack order, and small/reference/large portrait layouts through the integrated flow in `specs/005-phone-login-entry/quickstart.md`

**Checkpoint**: User Story 2 is complete when the Vazy login entry matches the reference hierarchy, accepts transient phone text, and creates no network, permission, navigation, or persistence side effect.

---

## Phase 4: Complete-Flow Quality Gate

**Purpose**: Accept the first full launch-to-login flow rather than an isolated screen.

- [X] T007 Run `npm run lint`, `npx tsc --noEmit`, `npx expo-doctor`, and `npx expo export` from `app/`, resolving in-scope failures in `app/src/app/onboarding-location.tsx` and `app/src/app/login.tsx`
- [ ] T008 Complete and record the iOS/Android, small/reference/large portrait, increased-text, VoiceOver/TalkBack, airplane-mode installed-build, transition-timing, and five-reviewer matrix in `specs/005-phone-login-entry/quickstart.md`, then confirm the diff leaves dependencies, `.gitignore`, permission configuration, and asset rules unchanged

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup and Foundation (Phase 1)**: No work is required; the existing application foundation is reused.
- **User Story 1 (Phase 2)**: T001 and T002 can start immediately; T003 depends on both.
- **User Story 2 (Phase 3)**: T004 depends on T001; T005 depends on T004; T006 depends on T002-T005 so it can exercise the integrated flow.
- **Quality Gate (Phase 4)**: T007-T008 depend on both user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Delivers the navigation contract independently with a visible Vazy login shell.
- **User Story 2 (P2)**: Completes the login shell from User Story 1 and is accepted only through the connected flow.

### Parallel Opportunities

- T001 and T002 touch different route files and can run in parallel.
- After T004, layout and accessibility work stays together in T005 because both affect the same small route.
- Static commands inside T007 may run in parallel after implementation, but all must pass before T008 closes.

## Parallel Example: Route Connection

```text
Task T001: Add the /login route shell in app/src/app/login.tsx.
Task T002: Connect onboarding-location to /login in app/src/app/onboarding-location.tsx.
```

## Implementation Strategy

### Flow Connection

1. Complete T001-T003.
2. Confirm the real launch-to-login route history before styling the full form.

### Complete Login Entry

1. Complete T004-T006.
2. Run T007 and complete the non-deferred full-flow matrix in T008.
3. Stop before OTP, Firebase Authentication, phone validation, Sign Up navigation, location permission, or consent persistence; each requires its own specified behavior.

## Notes

- Figma node `5:63` is a layout reference; its Qwiker identity is intentionally replaced with Vazy text because no logo is approved.
- Do not render or test `/login` alone as acceptance evidence; every manual acceptance run starts at the launch page.
- Exact visible copy remains easy to replace later, but current labels must stay non-empty and accessible.
