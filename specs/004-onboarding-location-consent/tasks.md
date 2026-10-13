---

description: "Implementation tasks for the final onboarding location-consent screen"
---

# Tasks: Onboarding Location Consent Screen

**Input**: Design documents from `specs/004-onboarding-location-consent/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui-contract.md`, `quickstart.md`

**Tests**: No new automated test suite is required. Run the existing static gates and the focused manual checks in `quickstart.md`.

**Organization**: Tasks are grouped by user story so navigation and final-screen presentation can be validated separately.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files and has no incomplete dependency
- **[Story]**: Maps the task to a user story from `spec.md`

## Phase 1: Setup

**Purpose**: Add only the supplied local design assets; do not change dependencies or asset inclusion/exclusion rules.

- [X] T001 [P] Export Figma nodes `5:4`, `5:36`, `5:49`, `5:52`, and `5:59` unchanged to `app/assets/images/onboarding-location-background.png`, `app/assets/images/onboarding-location-person.png`, `app/assets/images/onboarding-location-globe-ring.png`, `app/assets/images/onboarding-location-globe.png`, and `app/assets/images/onboarding-location-pin.png`

---

## Phase 2: Foundational

**Purpose**: Reuse the existing Expo Router stack, safe-area provider, status bar, and native React Native components.

No foundational implementation is required. Do not add a package, navigation store, shared onboarding abstraction, permission configuration, or `.gitignore` change.

---

## Phase 3: User Story 1 - Reach the Final Onboarding Step (Priority: P1)

**Goal**: Make the tracking CTA open exactly one final onboarding route and preserve platform Back behavior.

**Independent Test**: Open `/onboarding-tracking`, activate its lower CTA 10 consecutive times, confirm one `/onboarding-location` page appears each time, then press Back once and confirm the tracking page returns.

### Implementation for User Story 1

- [X] T002 [P] [US1] Add the safe-area-aware `/onboarding-location` route shell with local non-empty provisional privacy and location text in `app/src/app/onboarding-location.tsx`
- [X] T003 [US1] Convert the complete lower CTA into one accessible `Pressable` that calls `router.navigate("/onboarding-location")` in `app/src/app/onboarding-tracking.tsx`
- [ ] T004 [US1] Verify 10 consecutive tracking CTA activations and one-step platform Back behavior against `specs/004-onboarding-location-consent/contracts/ui-contract.md` using `app/src/app/onboarding-tracking.tsx` and `app/src/app/onboarding-location.tsx`

**Checkpoint**: User Story 1 is complete when navigation works offline, exposes one clearly labelled button, creates no duplicate final page, and returns with one Back action.

---

## Phase 4: User Story 2 - Understand the Location and Privacy Introduction (Priority: P2)

**Goal**: Match Figma node `5:2` with a responsive, offline, accessible final onboarding presentation.

**Independent Test**: Reach `/onboarding-location` through the tracking CTA and confirm the illustration, privacy message, and visual-only lower treatment render in order on small and large portrait phone sizes.

### Implementation for User Story 2

- [X] T005 [US2] Compose the five local PNG layers in Figma order and relative geometry, then place the privacy message and wide rounded lower treatment in `app/src/app/onboarding-location.tsx`
- [X] T006 [US2] Hide the decorative illustration from assistive technology, keep meaningful text readable in visual order, preserve safe areas and text reflow, and leave the lower treatment without a press handler or button role in `app/src/app/onboarding-location.tsx`

**Checkpoint**: User Story 2 is complete when the full screen matches the referenced hierarchy, remains usable across supported portrait sizes and increased text scale, and performs no permission, consent, data, or navigation action.

---

## Phase 5: Polish & Cross-Cutting Validation

**Purpose**: Prove the increment builds and stays within its agreed scope.

- [X] T007 Run `npm run lint`, `npx tsc --noEmit`, `npx expo-doctor`, and `npx expo export` from `app/`, resolving failures in `app/src/app/onboarding-tracking.tsx` and `app/src/app/onboarding-location.tsx`
- [X] T008 Execute the available increment checks in `specs/004-onboarding-location-consent/quickstart.md` and confirm the repository diff leaves dependency files, permission configuration, and asset inclusion/exclusion rules unchanged

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: No work is required; the existing application foundation is reused.
- **User Story 1 (Phase 3)**: Can start immediately; T003 depends on T002, and T004 depends on T002-T003.
- **User Story 2 (Phase 4)**: T005 depends on T001-T002; T006 depends on T005.
- **Polish (Phase 5)**: T007-T008 depend on both user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Independently delivers the forward and Back navigation contract.
- **User Story 2 (P2)**: Uses the route shell from User Story 1 and the assets from Setup; test it through the integrated onboarding flow.

### Parallel Opportunities

- T001 and T002 touch different files and can run in parallel.
- After T002, T003 can proceed while the Figma asset exports in T001 are completed.
- T007 validation commands may be run independently, but all must pass before T008 is closed.

## Parallel Example: User Story 1 and Asset Setup

```text
Task T001: Export the five exact Figma illustration layers to app/assets/images/.
Task T002: Add the final route shell in app/src/app/onboarding-location.tsx.
```

## Implementation Strategy

### First Increment: Navigation

1. Complete T002-T004.
2. Validate User Story 1 independently.

### Complete Screen

1. Complete T001, T005, and T006.
2. Run T007-T008.
3. Stop before adding operating-system permission, LGPD persistence, or login navigation; those require later specifications.

## Notes

- The visible copy is provisional; preserve non-empty privacy and location meaning without treating exact wording as acceptance criteria.
- Do not modify `app/src/app/_layout.tsx`; the current file-based stack already discovers the new route.
- Do not change `.gitignore` or any asset inclusion/exclusion configuration.
- The deferred physical-device and reviewer matrix remains tracked in `quickstart.md` until the onboarding-to-login flow exists.
