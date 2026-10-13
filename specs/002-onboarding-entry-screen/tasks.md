# Tasks: Onboarding Entry Screen

**Input**: Design documents from `/specs/002-onboarding-entry-screen/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui-contract.md`

**Tests**: No test framework is added for this static flow. Existing automated quality gates and
the manual acceptance matrix in `quickstart.md` are required.

**Organization**: Tasks are grouped by user story so each increment can be implemented and checked
at its own checkpoint.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it targets a different file and has no incomplete dependency
- **[Story]**: Maps the task to a user story from `spec.md`
- Every task names its target file or validation path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure the exact local onboarding artwork will be tracked without exposing unrelated
ignored assets.

- [X] T001 Extend the selective image allow-list for `onboarding-taxi-passenger.png` and `onboarding-status-badge.png` in `app/.gitignore`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm the existing application foundation is sufficient.

No foundational code is required. Expo Router, the headerless Stack, the safe-area provider, native
status-bar handling, and the local image pattern already exist.

**Checkpoint**: Setup complete; user-story work may begin.

---

## Phase 3: User Story 1 - Enter Onboarding from the Splash Screen (Priority: P1)

**Goal**: A tap anywhere on the Vazy splash replaces it with one accessible first-onboarding route,
including under repeated rapid taps and without network access.

**Independent Test**: Launch on the splash, activate its single screen-wide action, confirm the
onboarding route replaces it, and confirm Back and rapid taps do not reveal or create duplicate
splash/onboarding entries.

- [X] T002 [US1] Create the safe-area onboarding route shell in `app/src/app/onboarding.tsx` and convert `app/src/app/index.tsx` into one accessibility-labelled full-screen press target that calls same-destination replacement navigation without custom state

**Checkpoint**: The splash-to-onboarding route is functional, but full US1 acceptance waits for the
complete destination delivered by T003-T005.

---

## Phase 4: User Story 2 - Understand the First Onboarding Step (Priority: P2) MVP Completion

**Goal**: The first onboarding page matches the Figma hierarchy with exact local artwork,
responsive safe-area layout, first-step progress, and a non-interactive CTA treatment.

**Independent Test**: Open `/onboarding` directly and compare it with Figma node `5:147` on small,
reference, and large supported portrait phones while checking reading order and decorative semantics.

- [X] T003 [P] [US2] Export Figma node `5:206` as a non-empty transparent PNG at `app/assets/images/onboarding-taxi-passenger.png`
- [X] T004 [P] [US2] Export Figma node `5:384` as a non-empty transparent PNG at `app/assets/images/onboarding-status-badge.png`
- [ ] T005 [US2] Complete the responsive Figma hierarchy, provisional heading/supporting/CTA copy, exact artwork overlay, first-active three-position indicator, dark status bar, and accessibility reading order in `app/src/app/onboarding.tsx`

**Checkpoint**: Both user stories are complete; `/onboarding` works directly and from the splash.

---

## Phase 5: Polish & Cross-Cutting Validation

**Purpose**: Verify both stories together without expanding feature scope.

- [ ] T006 Verify every onboarding asset file, Figma layer, callsite, rendered geometry, and absence of temporary Figma URLs, then run `npm run lint`, `npx tsc --noEmit`, `npx expo-doctor`, and `npx expo export --platform all` from `app/` and fix in-scope failures in `app/.gitignore`, `app/src/app/index.tsx`, or `app/src/app/onboarding.tsx`
- [ ] T007 Execute the complete rapid-tap, Back, 300 ms, offline, responsive, VoiceOver/TalkBack, provisional-copy, and five-reviewer acceptance matrix and record dated results in `specs/002-onboarding-entry-screen/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Starts immediately.
- **Foundational (Phase 2)**: Requires no code after Setup confirms the existing foundation.
- **User Story 1 (Phase 3)**: Starts after T001 and creates the functional route shell.
- **User Story 2 (Phase 4)**: T003 and T004 may run together after T001; T005 requires T002, T003,
  and T004.
- **Polish (Phase 5)**: T006 requires T005; T007 requires T006 and supported physical devices.

### User Story Dependencies

- **US1 (P1)**: T002 delivers the transition shell; full acceptance requires the completed
  destination from T003-T005.
- **US2 (P2)**: Builds on the route shell from US1 and requires both Figma asset exports.
- **Combined flow / MVP**: T001-T005 are all required before the requested experience is complete.

### Dependency Graph

```text
T001 -> T002 ---------------------> T005 -> T006 -> T007
   `-> T003 -----------.             ^
   `-> T004 -----------+-------------'
```

### Parallel Opportunities

- T003 and T004 target independent Figma nodes and files and may run in parallel.
- After T001, T002 may be implemented while T003 and T004 are exported.
- Static checks inside T006 may be launched together, but all must finish before T007.

---

## Parallel Example: User Story 2

```text
Task: "T003 export Figma node 5:206 to app/assets/images/onboarding-taxi-passenger.png"
Task: "T004 export Figma node 5:384 to app/assets/images/onboarding-status-badge.png"
```

After both exports and T002 finish, execute T005.

---

## Implementation Strategy

### MVP First

1. Complete T001.
2. Complete T002.
3. Complete T003 and T004 in parallel.
4. Complete T005.
5. Stop and validate the complete splash-to-onboarding experience.

### Incremental Delivery

1. T001 establishes tracked local asset paths.
2. T002 delivers the P1 navigation shell.
3. T003-T005 deliver the P2 visual and accessibility slice and complete the MVP.
4. T006 proves automated project integrity and asset correctness.
5. T007 records physical-device acceptance results.

## Notes

- `[P]` tasks write different files and have no incomplete dependency.
- Exact copy is provisional; do not add a localization or configuration layer for it.
- The CTA remains visual-only until a later feature specifies its destination.
- Do not add a carousel, persistence, Firebase, backend calls, timers, custom fonts, or runtime
  dependencies.

## Phase 6: Convergence

- [ ] T008 CRITICAL: Record the deferred full-flow testing exception, risk, owner, and removal condition in `specs/002-onboarding-entry-screen/quickstart.md` per Constitution Delivery Workflow and Quality Gates (partial)
- [ ] T009 When the onboarding-to-login flow is complete, execute and record the physical-device, rapid-tap, Back, 300 ms, offline, responsive, VoiceOver/TalkBack, and five-reviewer matrix in `specs/002-onboarding-entry-screen/quickstart.md` per SC-001-SC-006 and T007 (missing)
- [ ] T010 Run the remaining Expo Doctor, multi-platform export, and rendered Figma asset geometry checks from `app/`, recording outcomes in `specs/002-onboarding-entry-screen/quickstart.md` per plan testing and T006 (partial)
- [ ] T011 Review `app/assets/images/onboarding-progress-active.png` and `app/assets/images/onboarding-progress-dot.png` against the two-new-asset scope in `specs/002-onboarding-entry-screen/plan.md`, then justify their necessity or replace them with native shapes and remove them per plan Scale/Scope (unrequested)
