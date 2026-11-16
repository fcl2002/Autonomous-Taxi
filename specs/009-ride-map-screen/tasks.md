# Tasks: Ride Map Screen

**Input**: Design documents from `/specs/009-ride-map-screen/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-contract.md

**Tests**: No new automated framework is required. The implementation agent runs static checks;
the user performs integrated visual and accessibility validation from `quickstart.md`.

**Organization**: Tasks follow the three user stories and keep the unique map composition inside
one route.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches a different file
- **[Story]**: Maps the task to a user story from `spec.md`
- Every task includes the affected file or directory

## Phase 1: Setup

**Purpose**: Bundle the exact visible Figma artwork without changing dependencies or ignore rules.

- [X] T001 Download the map background, map overlay, five taxi markers, passenger marker and dot, menu icon, pickup icon, and destination icon from Figma node `5:1446` into `app/assets/maps/`, using stable descriptive filenames and no runtime Figma URLs

---

## Phase 2: User Story 1 - Continue from Sign Up to the Map (Priority: P1)

**Goal**: Connect the current UI-only signup action to one offline map route with native Back
behavior and no account side effect.

**Independent Test**: Follow the integrated flow to signup, activate **Sign Up**, confirm exactly
one map page appears without validation or account creation, and confirm Back returns to signup.

### Implementation

- [X] T002 [P] [US1] Add the safe-area-aware `/map` route shell and concise static-map accessibility description in `app/src/app/map.tsx`
- [X] T003 [P] [US1] Give the existing enabled **Sign Up** button a `router.navigate("/map")` handler while retaining an explicit no-validation/no-account limitation comment in `app/src/app/signup.tsx`

**Checkpoint**: The full entry flow reaches one offline map shell and Back restores signup.

---

## Phase 3: User Story 2 - Understand the Static Ride Area (Priority: P2)

**Goal**: Reproduce the reference map area with five taxis, one passenger position, and the menu
treatment using only bundled assets.

**Independent Test**: Reach `/map` through signup and confirm the required map landmarks remain
visible on small, reference, and large portrait phones while offline.

### Implementation

- [X] T004 [US2] Compose the bundled map background, map overlay, five taxi assets, passenger marker and dot, and visual-only menu asset with responsive percentage positioning in `app/src/app/map.tsx`, hiding decorative layers from assistive technology and adding no map or location logic

**Checkpoint**: The static map composition is complete, offline, and contains exactly the required markers.

---

## Phase 4: User Story 3 - View Pickup and Destination Prompt (Priority: P3)

**Goal**: Add the lower ride-request sheet without adding search or navigation behavior.

**Independent Test**: Confirm the sheet shows its heading, pickup address, divider, and destination
prompt in order and remains static when its menu and destination treatments are activated.

### Implementation

- [X] T005 [US3] Add the responsive rounded bottom sheet, themed heading and row text, divider, bundled pickup/destination icons, and visual-only destination treatment to `app/src/app/map.tsx`, preserving the visible passenger marker above the sheet

**Checkpoint**: The complete Figma hierarchy is visible with no menu, search, permission, network, or ride side effect.

---

## Phase 5: Quality Gate

**Purpose**: Validate source correctness, local assets, and project metadata.

- [X] T006 Run `npx tsc --noEmit` and `npx expo lint` from `app/`, verify every required file in `app/assets/maps/` is non-empty, and confirm `app/src/app/map.tsx` contains no Figma HTTP URL
- [X] T007 Run `graphify update .` from the repository root to refresh `graphify-out/` after the code changes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup**: T001 starts immediately and blocks the visual composition.
- **User Story 1**: T002 and T003 may run in parallel after the route name is fixed.
- **User Story 2**: T004 depends on T001 and T002.
- **User Story 3**: T005 depends on T004 because both modify `map.tsx`.
- **Quality Gate**: T006 depends on T001-T005; T007 runs last.

### Parallel Example

```text
T002: Create app/src/app/map.tsx.
T003: Connect app/src/app/signup.tsx to /map.
```

---

## Implementation Strategy

1. Complete T001 once; do not add a package or alter asset ignore rules.
2. Complete T002 and T003.
3. Complete T004, then T005 in the same route.
4. Complete T006 without starting a preview server or taking screenshots.
5. Complete T007 and hand the integrated screen to the user for validation.

## Notes

- Do not use the Figma screenshot as an implementation asset.
- Do not add a map SDK, SVG library, GPS, permission, Firebase, backend, or ride logic.
- Do not create a reusable map abstraction for this single static composition.
- Do not commit. Provide only a suggested commit name after implementation.
