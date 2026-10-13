# Tasks: Vazy Splash Screen

**Input**: Design documents from `specs/001-vazy-splash-screen/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`,
`quickstart.md`

**Tests**: No automated test task is added because this static screen contains no non-trivial
logic and the repository has no test framework. Validation uses the existing static checks and the
cross-platform acceptance matrix.

**Organization**: Tasks are grouped around the single P1 user story and remain independently
verifiable without navigation, Firebase, backend, or hardware work.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because the task touches a different file and has no incomplete
  dependency.
- **[US1]**: User Story 1, Recognize the Vazy App at Launch.

## Phase 1: Setup

**Purpose**: Prepare the approved local visual asset and valid app configuration.

- [X] T001 [P] Export Figma node `5:678` as a non-empty transparent PNG at `app/assets/images/vazy-taxi-passenger.png`
- [X] T002 [P] Set the display name and native splash background for Vazy, remove the missing splash image and only launcher-icon fields that reference nonexistent files, and do not create a replacement logo in `app/app.json`

**Checkpoint**: The approved illustration is local and the app configuration contains no missing
template asset reference.

---

## Phase 2: Foundational

**Purpose**: Establish the full-screen, safe-area-aware route shell required by the user story.

**Critical**: User Story 1 implementation begins only after this phase.

- [X] T003 Wrap the router with `SafeAreaProvider` and hide the stack header for the index route in `app/src/app/_layout.tsx`

**Checkpoint**: The index route can render inside native safe areas without a navigation header.

---

## Phase 3: User Story 1 - Recognize the Vazy App at Launch (Priority: P1) MVP

**Goal**: Show the complete offline Vazy launch composition on portrait iOS and Android phones.

**Independent Test**: Cold-launch the app with airplane mode enabled and verify that `Vazy` is the
only announced product name, the passenger-and-taxi illustration is visible and decorative, no
control appears, and neither element overlaps system areas on small, reference-sized, or large
portrait phones.

### Implementation

- [X] T004 [US1] Replace the starter route with the light full-screen layout, exact static text `Vazy`, dark native status-bar content, and bottom-anchored local illustration with aspect-preserving responsive sizing and `accessible={false}` in `app/src/app/index.tsx`

**Checkpoint**: User Story 1 is complete and can be demonstrated without network access or another
route.

---

## Phase 4: Polish & Cross-Cutting Validation

**Purpose**: Prove the screen and native handoff satisfy the contract on both platforms.

- [X] T005 Run `npm run lint`, `npx tsc --noEmit`, `npx expo-doctor`, and `npx expo export --platform all` from `app/`, then fix any failure in `app/app.json`, `app/src/app/_layout.tsx`, or `app/src/app/index.tsx`
- [ ] T006 Execute every iOS and Android offline, responsive, accessibility, branding, native-handoff, and one-second launch check, then record dated results in `specs/001-vazy-splash-screen/quickstart.md`

**Checkpoint**: All static checks pass and the complete acceptance matrix is recorded.

---

## Dependencies & Execution Order

### Phase dependencies

1. **Setup (Phase 1)** starts immediately; T001 and T002 can run in parallel.
2. **Foundational (Phase 2)** follows Setup and blocks the user story.
3. **User Story 1 (Phase 3)** follows Foundational and delivers the MVP.
4. **Polish (Phase 4)** follows User Story 1 and completes release validation.

### User story dependency

- **User Story 1 (P1)** depends only on Setup and Foundational work; there are no other stories or
  cross-story dependencies.

### Within User Story 1

- T004 requires the local asset from T001 and route shell from T003.
- T005 runs after T004 so static failures are corrected before device acceptance.
- T006 runs after T005 and uses a preview or production build for authoritative native splash and
  launch-time validation.

## Parallel Example

```text
Task T001: Export the Figma illustration to app/assets/images/vazy-taxi-passenger.png
Task T002: Clean and update Vazy configuration in app/app.json
```

These tasks touch different files and may be completed together before T003.

## Implementation Strategy

### MVP first

1. Complete T001 and T002 in parallel.
2. Complete T003.
3. Complete T004 to deliver User Story 1.
4. Stop and inspect the screen independently before validation cleanup.
5. Complete T005 and T006 before declaring the feature done.

### Scope discipline

- Do not add a logo, custom font, screen timer, destination route, animation system, Firebase
  connection, component abstraction, or dependency.
- Keep the illustration local; do not leave a temporary Figma URL in application code.
- Do not edit generated `ios/` or `android/` directories.
