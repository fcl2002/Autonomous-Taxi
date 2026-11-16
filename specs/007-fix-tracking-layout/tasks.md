# Tasks: Fix Tracking Layout

**Input**: Design documents from `/specs/007-fix-tracking-layout/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: No new automated test is required for this style-only change. The implementation agent
runs static checks; the user performs visual screen validation from `quickstart.md`.

**Organization**: The feature has one independently testable user story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel
- **[Story]**: Maps the task to its user story
- Every task includes the affected file or directory

## Phase 1: Setup

**Purpose**: Confirm the existing screen and dependencies are sufficient.

No setup work is required: the route, assets, themed components, and validation commands already
exist, and no dependency may be added for this correction.

---

## Phase 2: Foundational

**Purpose**: Confirm shared prerequisites before changing the screen.

No foundational work is required: this feature changes one existing page-specific layout and has
no data, service, contract adapter, or shared-component prerequisite.

---

## Phase 3: User Story 1 - View Separated Artwork and Progress (Priority: P1)

**Goal**: Center and contain the tracking illustration above a separate progress indicator while
preserving all existing screen behavior.

**Independent Test**: Follow `specs/007-fix-tracking-layout/quickstart.md` on supported small,
reference, and large portrait phones; the illustration and progress indicator must never overlap.

### Implementation

- [X] T001 [US1] Update only the responsive artwork and progress layout styles in `app/src/app/onboarding-tracking.tsx` so the illustration is horizontally centered, constrained within its flex region, positioned slightly higher, and visibly separated above the progress indicator while preserving existing JSX order, assets, accessibility properties, text, button behavior, and navigation

**Checkpoint**: The user can validate the corrected second onboarding page independently.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Run required repository checks and refresh codebase metadata.

- [X] T002 Run `npx tsc --noEmit` and `npx expo lint` from `app/` to validate `app/src/app/onboarding-tracking.tsx`
- [X] T003 Run `graphify update .` from the repository root to refresh `graphify-out/` after the code change

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup and Foundational**: No work required.
- **User Story 1**: T001 can start immediately.
- **Polish**: T002 depends on T001; T003 runs last after the final code state.

### User Story Dependencies

- **User Story 1 (P1)**: Independent; it changes one existing route and requires no other story.

### Parallel Opportunities

None. The three tasks are short and intentionally sequential so validation and graph metadata
reflect the final source file.

---

## Implementation Strategy

1. Complete T001 as the smallest source-level correction.
2. Complete T002 without starting a preview server or taking screenshots.
3. Complete T003.
4. Hand the screen to the user for visual validation using `quickstart.md`.

## Notes

- Do not edit either image asset or add a dependency.
- Do not change other onboarding routes or shared themed components.
- The implementation agent does not perform visual testing; the user tests the screen.
- Do not commit. Provide only a suggested commit name after implementation.
