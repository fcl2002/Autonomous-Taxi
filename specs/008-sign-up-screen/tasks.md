# Tasks: Sign Up Screen

**Input**: Design documents from `/specs/008-sign-up-screen/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-contract.md

**Tests**: No new automated test framework is required. The implementation agent runs static
checks; the user performs integrated visual and interaction validation from `quickstart.md`.

**Organization**: Tasks follow the three user stories and keep all form behavior local to the new
route.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches a different file
- **[Story]**: Maps the task to a user story from `spec.md`
- Every task includes the affected file or directory

## Phase 1: Setup and Foundation

**Purpose**: Reuse the current route stack and themed components.

No setup or foundational implementation is required. Do not add a package, logo asset, shared form
abstraction, authentication service, persistent store, `.gitignore` change, or asset-rule change.

---

## Phase 2: User Story 1 - Open Sign Up from Login (Priority: P1)

**Goal**: Connect the existing login prompt to one new sign-up route with standard Back behavior.

**Independent Test**: Follow the integrated flow to login, activate **Sign Up**, confirm one signup
page appears, and confirm one Back action returns to login.

### Implementation

- [X] T001 [P] [US1] Create the safe-area-aware, keyboard-avoiding `/signup` route shell with Vazy text identity and Sign Up heading in `app/src/app/signup.tsx`
- [X] T002 [P] [US1] Make the existing nested **Sign Up** text an accessible link that navigates to `/signup` while preserving surrounding copy and layout in `app/src/app/login.tsx`

**Checkpoint**: Login opens exactly one recognizable Vazy signup route and native Back returns to login.

---

## Phase 3: User Story 2 - Complete the Visible Sign-Up Form (Priority: P2)

**Goal**: Present the complete responsive reference hierarchy with three transient editable fields
and an enabled no-op primary action.

**Independent Test**: Reach signup through login, edit each field with the keyboard open, and
confirm the primary action remains reachable and causes no side effect.

### Implementation

- [X] T003 [US2] Complete `app/src/app/signup.tsx` with controlled full-name, email, and phone `TextInput` fields in that order, appropriate native input metadata, reused `ThemedText` and `ThemedButton`, responsive portrait spacing, keyboard avoidance, safe-area handling, accessibility labels and order, and an enabled **Sign Up** button with no handler or side effect

**Checkpoint**: The complete sign-up UI is independently usable with transient local values only.

---

## Phase 4: User Story 3 - Return to Login (Priority: P3)

**Goal**: Let existing users return to login without adding a duplicate route-history loop.

**Independent Test**: Open signup from login, activate **Sign In**, and confirm login replaces
signup and Back does not reopen the replaced signup page.

### Implementation

- [X] T004 [US3] Add the bottom existing-account prompt and accessible **Sign In** link that replaces `/signup` with `/login` in `app/src/app/signup.tsx`

**Checkpoint**: Login and signup are connected in both intended directions with correct history behavior.

---

## Phase 5: Quality Gate

**Purpose**: Validate source correctness and refresh project metadata.

- [X] T005 Run `npx tsc --noEmit` and `npx expo lint` from `app/` to validate `app/src/app/login.tsx` and `app/src/app/signup.tsx`
- [X] T006 Run `graphify update .` from the repository root to refresh `graphify-out/` after the code changes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup and Foundation**: No work required.
- **User Story 1**: T001 and T002 may run in parallel because they touch different files.
- **User Story 2**: T003 depends on T001.
- **User Story 3**: T004 depends on T003 because both modify `signup.tsx`.
- **Quality Gate**: T005 depends on T001-T004; T006 runs last.

### User Story Dependencies

- **User Story 1 (P1)**: Independent connected route shell.
- **User Story 2 (P2)**: Builds on the route shell from User Story 1.
- **User Story 3 (P3)**: Builds on the completed signup page but is independently testable as a return path.

### Parallel Example

```text
T001: Create app/src/app/signup.tsx.
T002: Connect app/src/app/login.tsx to /signup.
```

---

## Implementation Strategy

1. Complete T001 and T002.
2. Complete T003, then T004 in the same route.
3. Complete T005 without starting a preview server or taking screenshots.
4. Complete T006.
5. Hand the integrated flow to the user for validation with `quickstart.md`.

## Notes

- Do not download or ship the Qwiker logo from Figma.
- Do not add validation, submission, persistence, Firebase, or network behavior.
- Do not modify shared themed components unless implementation proves the existing public props cannot express the design.
- Do not commit. Provide only a suggested commit name after implementation.
