# Tasks: Onboarding Tracking Screen

**Input**: Design documents from `/specs/003-onboarding-tracking-screen/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui-contract.md`, `quickstart.md`

**Tests**: No new automated test suite is requested. The implementation uses Expo Router's native
navigation behavior without custom state logic; required static and manual validation is listed in
the final phase.

**Organization**: Tasks are grouped by user story so navigation and screen presentation remain
independently reviewable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches a different file and has no dependency on an
  incomplete task in the same phase.
- **[Story]**: Maps the task to a user story from `spec.md`.

## Phase 1: Setup

**Purpose**: Add the only new design asset without adding dependencies.

- [X] T001 Export Figma node `5:443` as `app/assets/images/onboarding-tracking.png` and add that exact file to the asset allow-list in `app/.gitignore`

---

## Phase 2: Foundational

**Purpose**: Confirm the existing project foundation is sufficient.

No foundational implementation is required. The existing root Expo Router `Stack`, safe-area
provider, status bar, and local progress assets are reused unchanged.

**Checkpoint**: T001 is complete and the bundled tracking illustration is available to both story
phases.

---

## Phase 3: User Story 1 - Continue to the Second Onboarding Step (Priority: P1)

**Goal**: Activating the first onboarding CTA opens exactly one complete local tracking page, and
one platform Back action returns to the first page.

**Independent Test**: Open `/onboarding`, activate its lower CTA repeatedly, confirm
`/onboarding-tracking` appears offline without duplicate pages, then invoke Back once and confirm
`/onboarding` reappears.

### Implementation for User Story 1

- [X] T002 [P] [US1] Create the `/onboarding-tracking` destination with non-empty provisional heading, supporting copy, bundled illustration, three progress positions, and a static lower CTA in `app/src/app/onboarding-tracking.tsx`
- [X] T003 [P] [US1] Replace the first page's lower CTA wrapper with one accessible `Pressable` labeled `Continue to tracking introduction` that calls `router.navigate("/onboarding-tracking")` in `app/src/app/onboarding.tsx`

**Checkpoint**: User Story 1 is functional offline and independently testable; this is a development
checkpoint, not the final onboarding-flow acceptance point.

---

## Phase 4: User Story 2 - Understand the Tracking Introduction (Priority: P2)

**Goal**: The tracking page matches Figma node `5:387`, communicates step two, remains usable on
supported portrait phones, and exposes correct reading order without announcing decorative art.

**Independent Test**: Open `/onboarding-tracking` directly, compare it with Figma node `5:387` on
small, reference, and large portrait sizes, then verify text order and decorative-element silence
with accessibility inspection.

### Implementation for User Story 2

- [X] T004 [US2] Finish the responsive safe-area layout, supplied illustration sizing, inactive-active-inactive progress order, heading semantics, decorative image hiding, and visual-only CTA behavior in `app/src/app/onboarding-tracking.tsx`

**Checkpoint**: Both user stories are implemented; the second screen is independently reviewable
through its direct route.

---

## Phase 5: Validation and Cross-Cutting Checks

**Purpose**: Apply the repository quality gates now and retain the agreed full-flow test deferral.

- [X] T005 Run `npm run lint` and `npx tsc --noEmit` from `app/`, resolving any failures in `app/src/app/onboarding.tsx` and `app/src/app/onboarding-tracking.tsx`
- [X] T006 Run `npx expo-doctor` and `npx expo export` from `app/`, confirming the route and local asset referenced by `app/src/app/onboarding-tracking.tsx` resolve successfully
- [X] T007 Execute the locally available increment checks and preserve the documented exception, risk, owner, and removal condition for the deferred full device/reviewer matrix in `specs/003-onboarding-tracking-screen/quickstart.md`

---

## Dependencies and Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Starts immediately.
- **Foundational (Phase 2)**: Requires T001; no additional code is needed.
- **User Story 1 (Phase 3)**: Starts after T001. T002 and T003 can run in parallel.
- **User Story 2 (Phase 4)**: T004 depends on T002 because both edit the tracking route. It does not
  depend on T003 for direct-route review.
- **Validation (Phase 5)**: T005-T007 depend on T003 and T004.

### User Story Dependency Graph

```text
T001 -> T002 -> T004
     `-> T003

T003 + T004 -> T005 -> T006 -> T007
```

- **User Story 1 (P1)**: Requires only asset setup and delivers the working forward/back transition.
- **User Story 2 (P2)**: Builds on the destination created for US1 but remains independently
  testable by opening its route directly.

### Parallel Opportunities

- T002 and T003 touch different route files and can run in parallel after T001.
- No additional parallel task is useful: T004 refines T002's file, and validation should run against
  the completed integrated result.

---

## Parallel Example: User Story 1

After T001:

```text
Task T002: Create app/src/app/onboarding-tracking.tsx
Task T003: Update app/src/app/onboarding.tsx
```

User Story 2 has one minimal implementation task, so splitting it would create conflicting edits to
the same file without improving delivery speed.

---

## Implementation Strategy

### First Independently Testable Slice

1. Complete T001.
2. Complete T002 and T003 in parallel.
3. Verify User Story 1's forward, repeated-activation, offline, and Back behavior.
4. Continue directly to User Story 2; do not treat the checkpoint as final flow acceptance.

### Complete This Screen Increment

1. Complete T004 against Figma node `5:387`.
2. Run T005 and T006.
3. Complete the available T007 checks and keep the full device/reviewer matrix tracked until the
   onboarding-to-login flow exists.

## Notes

- Reuse `onboarding-progress-active.png` and `onboarding-progress-dot.png`; do not duplicate them.
- Do not add a carousel, navigation store, custom press guard, Firebase access, or new dependency.
- The second page CTA stays non-interactive until a later feature specifies its destination.
